import { logger } from '../utils/logger.js';

export class MediaEvents {

	constructor(manager) {
		this.manager = manager;
		this.countImageFail = 0;
	}

	attachVideoListeners(video) {
		const idx = video.dataset.index;

		video.addEventListener('playing', () => {
			if (video !== this.manager.activeElement) {
				return;
			}
			clearTimeout(video._stallTimer);
			this.manager._setState({
				isPlaying: true,
				isBuffering: false,
				isPaused: false
			});
		});

		video.addEventListener('pause', () => {
			if (video !== this.manager.activeElement) {
				return;
			}

			this.manager._setState({ isPlaying: false, isPaused: true });
		});

		video.addEventListener('waiting', () => {
			if (video !== this.manager.activeElement) {
				return;
			}
			clearTimeout(video._stallTimer);
			video._stallTimer = setTimeout(() => {
				if (!video.paused || this.manager.mediaState.isPaused) {
					return;
				}
				video.play().catch(() => {
				});
			}, 300);
			this.manager._setState({ isBuffering: true });

			// If the active video stalls mid-playback, attempt resume after a short delay.
			// This covers both Chrome and Firefox dropping playback while the next video loads.
			clearTimeout(video._stallTimer);
			video._stallTimer = setTimeout(() => {
				if (video !== this.manager.activeElement) {
					return;
				}

				if (video.paused && !this.manager.mediaState.isPaused) {
					logger.debug(`Video [${video.dataset.index}] stalled — attempting resume.`);
					video.play().catch(() => this.manager._handleMediaError(video, new Error('stall resume failed')));
				}
			}, 500);
		});

		video.addEventListener('canplay', () => {
			if (video !== this.manager.activeElement) {
				return;
			}
			clearTimeout(video._stallTimer);
			this.manager._setState({ isBuffering: false, isLoading: false });
		});

		video.addEventListener('timeupdate', () => {
			if (video !== this.manager.activeElement) {
				return;
			}
			this.manager._setState({
				currentTime: video.currentTime,
				remainingTime: video.duration - video.currentTime,
			});
		});

		video.addEventListener('ended', () => {
			this.manager.handleMediaEnd(video);
		});

		video.addEventListener('error', (e) => {
			logger.error(`Video [${idx}] error:`, e);
			this.manager._handleMediaError(video, e);
		});
	}

	attachImageListeners(img) {
		img.addEventListener('load', () => {
			this.countImageFail = 0; // reset streak on success
			this.manager._setState({ isLoading: false, hasError: false });
		});

		img.addEventListener('error', (e) => {
			this.countImageFail++;
			logger.error(`Image load error [${this.countImageFail}]: ${img.src}`);

			if (this.countImageFail <= 3) {
				this.manager._handleMediaError(img, e);
			} else {
				logger.warn('Too many consecutive image failures — stopping auto-recover.');
				this.manager._setState({
					hasError: true,
					errorMessage: `Image failed: ${img.src}`
				});
			}
		});
	}
}
