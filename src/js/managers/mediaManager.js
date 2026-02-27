import { Config } from "@Config";
import { EventBusMixin } from "@EventBus";

import { Helpers } from "../utils/helpers.js";
import { Maths } from "../utils/maths.js";
import { Files } from "../utils/files.js";
import { loadPlaylists } from '../utils/loaders.js';
import { logger } from '../utils/logger.js';
import { Strings } from '../utils/strings.js';

import iPlaylist from "../../other/iPlaylist.json";
import vPlaylist from "../../other/vPlaylist.json";
import { MediaEvents } from "./mediaEvents.js";

const DEFAULT_1080P = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSJ1cmwoI2dhcmRpZW50XzEwODBwKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJnYXJkaWVudF8xMDgwcCIgeDE9IjAiIHkxPSIwIiB4Mj0iMTkyMCIgeTI9IjEwODAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzFhMWYyNSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNDRhNWUiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4=";

export class MediaManager extends EventBusMixin() {

	constructor() {
		super();

		this.events = new MediaEvents(this);

		const extraCfg = {
			webPath: Config.get('webPath'),
			videoPath: Config.get('videoPath'),
			imagePath: Config.get('imagePath'),
		};
		this.config = { ...Config.get('mediaManager'), ...extraCfg };

		// Validate conditionMode
		if (!['description', 'main'].includes(this.config.conditionMode)) {
			logger.warn('"conditionMode" must be "description" or "main". Defaulting to "description".');
			this.config.conditionMode = 'description';
		}

		this._hass = null;
		this.fullPlaylist = {};

		// Current state
		this.currentCondition = null;
		this.dayNightMode = 'day';
		this.currentPlaylist = [];
		this.currentIndex = 0;

		// Element pools
		this.videoElements = [];
		this.imageElements = [];
		this.activeElement = null;
		this.nextElement = null;

		// Playback tracking
		this.startTime = null;
		this.runCount = 0;
		this.canTransition = false;
		this.transitionTimer = null;
		this.minRuns = 1;

		// Image pause/resume tracking
		this.imageRemainingTime = 0;
		this.lastStartTime = null;
		this.currentImageDuration = 0;

		// Media state
		this.mediaState = {
			isLoading: false, isPlaying: false, isPaused: false, isBuffering: false,
			hasError: false, errorMessage: null,
			volume: 0, readyState: 0, networkState: 0, bufferedRanges: [],
			remainingTime: 0, loadProgress: 0, currentTime: 0, duration: 0,
		};

		// Single promise that guards ALL operations requiring the playlist data.
		// Nothing plays until this resolves.
		this.ready = this._setup();

		this._initListeners();
	}

	static initMediaManager() {
		return new MediaManager();
	}

	// ─── Initialisation ───────────────────────────────────────────────────────

	/**
	 *
	 * @returns {Promise<void>}
	 * @private
	 */
	async _setup() {
		try {
			const data = await loadPlaylists({ vData: vPlaylist, iData: iPlaylist }),
				combined = Helpers.deepMerge(data.vData, data.iData),
				defaults = this._parsePlaylist(combined),
				userList = this.config.playlist ? this._parsePlaylist(this.config.playlist) : {};

			this.fullPlaylist = Helpers.deepMerge(defaults, userList);
			logger.debug('MediaManager ready — playlist data loaded.');
		} catch (e) {
			logger.error('Failed to initialise MediaManager', e);
			this.fullPlaylist = {};
		}
	}

	/**
	 *
	 * @private
	 */
	_initListeners() {
		this.on('FIRST_UPDATED', async ({ detail: { container } }) => {
			await this.ready;
			await this._init(container);
		});

		this.on('WEATHER_CONDITION_CHANGED', async (
			{
	      detail: {
	        current_weather,
	        isNight
	      }
	    }
		) => {
			await this.ready;
			this._applyCondition(current_weather, isNight);
		});
	}

	/**
	 * Create DOM elements, then start playback.
	 * Works regardless of whether WEATHER_CONDITION_CHANGED fired before or after FIRST_UPDATED.
	 * @param container
	 * @returns {Promise<void>}
	 * @private
	 */
	async _init(container) {
		this._createMediaElements(container);
		this._loadPlaylist();
		this._playNext();
	}

	// ─── Hass ─────────────────────────────────────────────────────────────────

	/**
	 *
	 * @param hass
	 */
	setHass(hass) {
		if (this._hass !== hass) this._hass = hass;
	}

	// ─── Condition ────────────────────────────────────────────────────────────

	/**
	 *
	 * @param current_weather
	 * @param isNight
	 * @private
	 */
	_applyCondition(current_weather, isNight = false) {
		const condition = current_weather.weather[0].description,
			dayNight = isNight ? 'night' : 'day',
			_condition = Strings.tokenize(condition);

		if (this.currentCondition === _condition && this.dayNightMode === dayNight) return;

		this.currentCondition = _condition;
		this.dayNightMode = dayNight;

		// Always reload the playlist when the condition / mode changes.
		this._loadPlaylist();

		if (typeof this.config.onPlaylistChange === 'function') {
			this.config.onPlaylistChange(_condition, dayNight, this.currentPlaylist.length);
		}

		// If media elements don't exist yet, _init will call _playNext once they're created.
		if (!this.videoElements.length) return;

		this._forceNext();
	}

	// ─── DOM / Elements ───────────────────────────────────────────────────────

	/**
	 *
	 * @param container
	 * @private
	 */
	_createMediaElements(container) {
		const fragment = document.createDocumentFragment(),
			transition = `opacity ${this.config.fadeDuration}ms ease-in-out`;

		for (let i = 0; i < 2; i++) {
			const video = document.createElement('video');
			video.className = 'media-layer video-layer';
			video.dataset.index = i;
			video.dataset.type = 'video';
			video.autoplay = false;
			video.setAttribute('muted', '');
			video.muted = true;
			video.playsInline = true;
			video.setAttribute('playsinline', '');
			video.preload = 'auto';
			video.style.transition = transition;
			this.events.attachVideoListeners(video);
			this.videoElements.push(video);
			fragment.appendChild(video);

			const img = document.createElement('img');
			img.className = 'media-layer image-layer';
			img.dataset.index = i;
			img.dataset.type = 'image';
			img.style.transition = transition;
			this.events.attachImageListeners(img);
			this.imageElements.push(img);
			fragment.appendChild(img);
		}

		// All elements start hidden; _crossfadeTo will promote one to 'active'.
		[...this.videoElements, ...this.imageElements].forEach(el => el.classList.add('inactive'));

		container.appendChild(fragment);
		logger.debug('Media elements created (2 video, 2 image).');
	}

	// ─── Playlist ─────────────────────────────────────────────────────────────

	/**
	 *
	 * @private
	 */
	_loadPlaylist() {
		let list = [];

		// Only attempt a real playlist if we have a confirmed condition.
		if (this.currentCondition) {
			const conditionData = this.fullPlaylist[this.currentCondition];
			if (conditionData) {
				const opposite = this.dayNightMode === 'night' ? 'day' : 'night';
				list = conditionData[this.dayNightMode] ?? [];
				if (!list.length) list = conditionData[opposite] ?? [];
			}
			if (!list.length) {
				logger.warn(`No playlist found for condition "${this.currentCondition}" — using emergency fallback.`);
			}
		} else {
			logger.debug('Condition not yet known — using emergency fallback until weather loads.');
		}

		// Emergency fallback: no condition yet, or condition not in the playlist.
		if (!list.length) {
			list = this._emergencyFallback();
		}

		this.currentPlaylist = list;

		if (list.length > 1) {

			let newIndex;
			do {
				newIndex = Maths.randomIntFromInterval(0, list.length-1);
			} while (newIndex === this.currentIndex);
			this.currentIndex = newIndex;

		} else {
			// If only 1 item exists, index is always 0
			this.currentIndex = 0;
		}
		// this.currentIndex = Maths.randomIntFromInterval(0, list.length);

		logger.debug(`Playlist loaded: ${list.length} items, condition="${this.currentCondition}", mode="${this.dayNightMode}", start index ${this.currentIndex}.`);
	}

	/**
	 * @todo: fix this function in the future to load images if are present if not to load the default SVG image
	 * @returns {[{type: string, url: string}]|[{type: string, url: string}]}
	 * @private
	 */
	_emergencyFallback() {
		const fallback = Config.get('mediaManager.fallBackImages') || [];
		if (fallback.length) {
			const filename = fallback[Maths.randomIntFromInterval(0, fallback.length - 1)];
			const imgPath = `${this.config.imagePath}${filename}`;
			if (Files.imageExists(imgPath)) {
				return [{ type: 'images', url: imgPath }];
			}
		}
		return [{ type: 'images', url: DEFAULT_1080P }];
	}

	/**
	 *
	 * @param config
	 * @returns {{}}
	 * @private
	 */
	_parsePlaylist(config) {
		if (!config) return {};
		const parsed = {};
		for (const [condition, data] of Object.entries(config)) {
			parsed[condition] = {
				day: this._parseMediaList(data.day || [], condition),
				night: this._parseMediaList(data.night || [], condition),
			};
		}
		return parsed;
	}

	/**
	 *
	 * @param list
	 * @param condition
	 * @returns {*|*[]}
	 * @private
	 */
	_parseMediaList(list, condition) {
		if (!Array.isArray(list)) {
			return [];
		}

		const typeFilter = String(this.config.renderType || 'both').trim().toLowerCase();
		if (typeFilter === 'none') {
			return [];
		}

		const conditionKey = String(condition).trim().toLowerCase();

		return list.reduce((acc, item) => {
			const isString = typeof item === 'string';
			const itemType = isString ?
				(/\.(mp4|webm|mov|avi|mkv)$/i.test(item) ? 'video' : 'images') :
				(item?.type || 'video');

			if (typeFilter !== 'both' && itemType !== typeFilter) return acc;

			if (isString) {
				const basePath = itemType === 'video' ? this.config.videoPath : this.config.imagePath;
				acc.push({ type: itemType, url: `${basePath}${conditionKey}/${item}` });
			} else if (item && typeof item === 'object') {
				acc.push({
					type: itemType,
					url: item.url,
					minTime: item.minTime || item.min_time,
					minRuns: item.minRuns || item.min_runs,
					duration: item.duration,
				});
			}
			return acc;
		}, []);
	}

	// ─── Playback ─────────────────────────────────────────────────────────────

	/**
	 * Play the next item in the playlist.
	 * @private
	 */
	_playNext() {
		if (!this.currentPlaylist.length) {
			// Last-resort: try to load once more before giving up.
			this._loadPlaylist();
		}

		if (!this.currentPlaylist.length) {
			logger.error('Playlist is still empty after reload — DOM or data not ready yet.');
			return;
		}

		// Ensure we always have an active element to crossfade from
		if (!this.activeElement) {
			this.activeElement = this.videoElements[0] ?? this.imageElements[0];
		}

		const item = this.currentPlaylist[this.currentIndex];
		if (!item) {
			logger.error(`Invalid item at index ${this.currentIndex}.`);
			return;
		}

		logger.debug(`Playing [${this.currentIndex + 1}/${this.currentPlaylist.length}] ${item.type}: ${item.url}`);

		this.startTime = Date.now();
		this.runCount = 0;
		this.canTransition = false;

		this._setState({
			isLoading: true,
			isPlaying: false,
			isPaused: false,
			isBuffering: false,
			hasError: false,
			errorMessage: null,
			loadProgress: 0,
			currentTime: 0,
			duration: 0,
		});

		if (item.type === 'video') {
			this._playVideo(item);
		} else {
			this._playImage(item);
		}
	}

	/**
	 *
	 * @param item
	 * @private
	 */
	_playVideo(item) {
		const el = this.videoElements.find(v => v !== this.activeElement) ?? this.videoElements[0];
		this.nextElement = el;

		// Update source cleanly
		let source = el.querySelector('source');
		if (!source) {
			source = document.createElement('source');
			el.appendChild(source);
		}
		if (source.src !== item.url) {
			source.src = item.url;
			source.type = 'video/mp4';
			el.load();
		}

		const minTime = item.minTime ?? this.config.minPlayTime;
		this.minRuns = item.minRuns ?? this.config.minRuns ?? 1;
		this._setupTransitionTimer(minTime, 'video');

		const start = () => {
			this._crossfadeTo(el);
			el.play().catch(err => {
				logger.error(`Video play failed: ${err.message}`);
				this._handleMediaError(el, err);
			});
		};

		if (el.readyState >= 4) {
			start();
		} else {
			el.addEventListener('canplaythrough', start, { once: true });
			el.preload = 'auto';
			el.load();
		}
	}

	/**
	 *
	 * @param item
	 * @private
	 */
	_playImage(item) {
		const el = this.imageElements.find(i => i !== this.activeElement) ?? this.imageElements[0];
		this.nextElement = el;
		el.src = item.url;

		const duration = item.duration ?? this.config.imageDuration;
		this.currentImageDuration = duration;
		this.minRuns = 1;
		this.lastStartTime = Date.now();

		this._setupTransitionTimer(duration, 'images');

		const show = () => this._crossfadeTo(el);
		if (el.complete && el.naturalWidth > 0) {
			show();
		} else {
			el.addEventListener('load', show, { once: true });
		}
	}

	// ─── Transition ───────────────────────────────────────────────────────────

	/**
	 *
	 * @param minTime
	 * @param mediaType
	 * @private
	 */
	_setupTransitionTimer(minTime, mediaType) {
		clearTimeout(this.transitionTimer);
		this.transitionTimer = null;

		// With a single-item playlist there's nothing to transition to
		if (this.currentPlaylist.length <= 1) {
			return;
		}

		this.transitionTimer = setTimeout(() => {
			this.canTransition = true;
			logger.debug(`Min time reached (${minTime}ms).`);
			if (mediaType === 'images' || this.runCount >= this.minRuns) {
				this._transition();
			}
		}, minTime);
	}

	/**
	 *
	 * @param newEl
	 * @private
	 */
	_crossfadeTo(newEl) {
		const oldEl = this.activeElement;

		newEl.classList.remove('inactive');
		newEl.classList.add('active');

		if (oldEl && oldEl !== newEl) {
			oldEl.classList.remove('active');
			oldEl.classList.add('inactive');

			// Stop and reset the old video only after the CSS transition completes.
			setTimeout(() => {
				if (oldEl.tagName === 'VIDEO') {
					oldEl.pause();
					oldEl.currentTime = 0;
				}
			}, this.config.fadeDuration);
		}

		this.activeElement = newEl;
		this.nextElement = null;
	}

	/**
	 *
	 * @private
	 */
	_transition() {
		// Re-evaluate the playlist in case condition/mode changed since the last play.
		this._loadPlaylist();

		if (this.activeElement?.tagName === 'VIDEO') {
			this.activeElement.preload = 'metadata';
		}

		const prev = this.currentIndex;
		const length = this.currentPlaylist.length;

		if (length > 1) {
			let newIndex;
			do {
				newIndex = Maths.randomIntFromInterval(0, length-1);
			} while (newIndex === this.currentIndex);

			this.currentIndex = newIndex;
		} else {
			// If only 1 item exists, the index is always 0
			this.currentIndex = 0;
		}

		this.config.onTransition?.(prev, this.currentIndex, this.runCount, this.currentPlaylist[prev]);
		this._playNext();
	}

	/**
	 *
	 * @private
	 */
	_forceNext() {
		clearTimeout(this.transitionTimer);
		this.transitionTimer = null;
		this.canTransition = true;
		this.runCount = this.minRuns;
		this._transition();
	}

	// ─── Media event handlers (called by MediaEvents) ─────────────────────────

	/**
	 *
	 * @param element
	 */
	handleMediaEnd(element) {
		if (element !== this.activeElement) {
			return;
		}

		this.runCount++;
		logger.debug(`Run ${this.runCount}/${this.minRuns} complete.`);

		if (this.canTransition && this.runCount > this.minRuns) {
			this._transition();
		} else {
			element.currentTime = 0;
			element.play().catch(err => logger.error(`Video loop failed: ${err.message}`));
		}
	}

	_handleMediaError(element, error) {
		const url = element.tagName === 'VIDEO' ?
			element.querySelector('source')?.src :
			element.src;

		logger.error(`Media failed to load: ${url}`);
		this.config.onError?.(url, error);
		setTimeout(() => this._transition(), 1000);
	}

	// ─── Pause / Resume ───────────────────────────────────────────────────────

	/**
	 *
	 */
	pause() {
		if (this.mediaState.isPaused) {
			return;
		}

		if (this.activeElement?.tagName === 'VIDEO') {
			this.activeElement.pause();
		} else if (this.activeElement?.tagName === 'IMG') {
			const elapsed = Date.now() - this.lastStartTime;

			this.imageRemainingTime = Math.max(0, this.currentImageDuration - elapsed);
			clearTimeout(this.transitionTimer);
			this.transitionTimer = null;

			logger.debug(`Image paused. Remaining: ${this.imageRemainingTime}ms.`);
		}

		this._setState({ isPaused: true, isPlaying: false });
	}

	/**
	 *
	 */
	resume() {
		if (!this.mediaState.isPaused) {
			return;
		}

		if (this.activeElement?.tagName === 'VIDEO') {
			this.activeElement.play().catch(err => logger.error(`Resume failed: ${err.message}`));
		} else if (this.activeElement?.tagName === 'IMG' && this.imageRemainingTime > 0) {

			this.currentImageDuration = this.imageRemainingTime;
			this.lastStartTime = Date.now();
			this._setupTransitionTimer(this.imageRemainingTime, 'images');
		}

		this._setState({ isPaused: false, isPlaying: true });
	}

	// ─── Public API ───────────────────────────────────────────────────────────

	/**
	 *
	 * @param index
	 */
	selectItem(index) {
		if (index < 0 || index >= this.currentPlaylist.length) {
			logger.error(`Invalid index: ${index}`);
			return;
		}
		clearTimeout(this.transitionTimer);
		this.currentIndex = index;
		this._playNext();
	}

	/**
	 *
	 * @returns {{condition: null, mode: string, playlistLength: number, currentIndex: number, currentItem: *, runCount: number, minRuns: number, canTransition: boolean, elapsedTime: number|number, activeType, activeIndex, mediaState: *}}
	 */
	getMediaInfo() {
		const item = this.currentPlaylist[this.currentIndex];
		const element = this.activeElement;
		const info = {
			condition: this.currentCondition,
			mode: this.dayNightMode,
			playlistLength: this.currentPlaylist.length,
			currentIndex: this.currentIndex,
			currentItem: item,
			runCount: this.runCount,
			minRuns: this.minRuns,
			canTransition: this.canTransition,
			elapsedTime: this.startTime ? Date.now() - this.startTime : 0,
			activeType: element?.tagName.toLowerCase() ?? null,
			activeIndex: element?.dataset.index ?? null,
			mediaState: { ...this.mediaState },
		};

		if (element?.tagName === 'VIDEO') {
			info.video = {
				currentTime: element.currentTime, duration: element.duration,
				paused: element.paused, ended: element.ended,
				readyState: element.readyState, networkState: element.networkState,
				buffered: this._getBufferedRanges(element),
				muted: element.muted, volume: element.volume,
				videoWidth: element.videoWidth, videoHeight: element.videoHeight,
			};
		}
		if (element?.tagName === 'IMG') {
			info.image = {
				src: element.src,
				complete: element.complete,
				naturalWidth: element.naturalWidth,
				naturalHeight: element.naturalHeight,
			};
		}
		return info;
	}

	/**
	 *
	 */
	destroy() {
		clearTimeout(this.transitionTimer);
		[...this.videoElements, ...this.imageElements].forEach(el => {
			if (el.tagName === 'VIDEO') {
				el.pause();
				el.src = '';
				el.load();
			}
			el.remove();
		});
		this.videoElements = [];
		this.imageElements = [];
		this.activeElement = null;
		logger.debug('MediaManager destroyed.');
	}

	// ─── Private helpers ──────────────────────────────────────────────────────

	/**
	 *
	 * @param updates
	 * @private
	 */
	_setState(updates) {
		Object.assign(this.mediaState, updates);
		if (this.activeElement?.tagName === 'VIDEO') {
			this.mediaState.readyState = this.activeElement.readyState;
			this.mediaState.networkState = this.activeElement.networkState;
		}
		this.config.onMediaStateChanged?.('update', { ...this.mediaState });
	}

	/**
	 *
	 * @param video
	 * @returns {*[]}
	 * @private
	 */
	_getBufferedRanges(video) {
		const ranges = [];
		for (let i = 0; i < video.buffered.length; i++) {
			ranges.push({ start: video.buffered.start(i), end: video.buffered.end(i) });
		}
		return ranges;
	}
}
