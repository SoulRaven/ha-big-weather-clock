import { EventBusMixin } from "@EventBus";

import { Helpers } from './helpers.js';
import { logger } from './logger.js';
import { Strings } from './strings.js';
import { defaultSettings } from '../defaults.js';

const buildPath = (path, subPath) => {
	const isUrl = Strings.isValidUrl(path.webPath),
		base = isUrl ? path.webPath : `${path.app?.hacs_path}`,
		fullPath = `${base}${subPath}`;
	return fullPath.endsWith('/') ? fullPath : `${fullPath}/`;
};

/**
 * Logic for properties that need to be re-evaluated dynamically
 */
const dynamicPaths = {

	videoPath: (cfg) => buildPath(cfg, '/media/video'),
	imagePath: (cfg) => buildPath(cfg, '/media/img'),
	iconsPath: (cfg) => buildPath(cfg, '/media/icons'),
};

class ConfigEngine extends EventBusMixin() {
	#rawSettings = {};
	#settings = null; // Proxy settings holder
	#hass = null;

	constructor() {
		super();

		this.#initSettings(defaultSettings);

		this.on('config:load:pre', (e) => {
			this.updateFromHA(e.detail);
		});

	}

	/**
	 * Initializes the settings object and wraps it in a Proxy to handle dynamic getters
	 * @param data
	 */
	#initSettings(data) {
		this.#rawSettings = Helpers.deepMerge({}, data);

		this.#settings = new Proxy(this.#rawSettings, {
			get: (target, prop, receiver) => {
				// Intercept dynamic paths
				if (prop in dynamicPaths) {
					return dynamicPaths[prop](target);
				}
				// Standard property access
				return Reflect.get(target, prop, receiver);
			}
		});
	}

	/**
	 * Set the HASS reference from your Lit element
	 * Necessary to detect the websocket connection and push changes to HA Server
	 * @param hass
	 */
	setHass(hass) {
		this.#hass = hass;
	}

	/**
	 * Resolves dot notation strings (e.g., "weather.units")
	 */
	#resolvePath(path, obj) {
		return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), obj);
	}

	/**
	 * Reset to factory defaults if needed
	 */
	resetToDefaults() {
		this.#initSettings(defaultSettings);
		this.emit('config:reset');
	}

	/**
	 *
	 * @param haConfig
	 */
	updateFromHA(haConfig) {
		if (!haConfig) {
			return;
		}

		// 1. Create a copy to prevent changing the original HA object
		const incomingData = { ...haConfig };

		// 2. USER/SERVER CHOICE:
		// If HA sends an array, we assume the Server is the 'Source of Truth'
		if (Array.isArray(incomingData.localSensors)) {
			this.#rawSettings.localSensors = [...incomingData.localSensors];
			delete incomingData.localSensors;
		}

		this.#rawSettings = Helpers.deepMerge(this.#rawSettings, incomingData);

		// Re-initialize the proxy to ensure it points to the new raw object reference
		this.#initSettings(this.#rawSettings);

		this.emit('config:initial-load');
	}

	/**
	 * Checks if a configuration path exists and is not undefined/null
	 * @param {string} path - Dot notation path
	 * @returns {boolean}
	 */
	has(path) {
		if (!path) {
			return false;
		}
		return this.get(path, false) !== false;
	}

	/**
	 * Return a value for a specific config path
	 * Dot notation is supported (e.g., "weather.units")
	 * If no path is provided, return the entire config object
	 * @param path
	 * @param defaultValue
	 * @returns {{weather: {show_humidity: boolean, units: string}, clock: {format: number, theme: string}}|*|null}
	 */
	get(path, defaultValue = null) {
		if (!path) {
			// Force the dynamic properties in the full object dump
			// the only way to do this without breaking the Proxy is to create a new object and copy the values
			const fullConfig = JSON.parse(JSON.stringify(this.#rawSettings));
			fullConfig.videoPath = this.#settings.videoPath;
			fullConfig.imagePath = this.#settings.imagePath;

			return fullConfig;
		}

		const value = this.#resolvePath(path, this.#settings);
		// Return defaultValue if a path results in undefined or null
		return value !== undefined && value !== null ? value : defaultValue;
	}

	/**
	 * Updates values for multiple config paths in a single call.
	 * Dot notation is supported (e.g., "weather.units")
	 * @param settings
	 * @param path
	 * @param value
	 * @returns {Promise<void>}
	 */
	set(path, value) {
		// Capture old settings for diffing
		const oldSettings = JSON.parse(JSON.stringify(this.#settings));

		const keys = path.split('.');
		let current = this.#settings;

		for (let i = 0; i < keys.length - 1; i++) {
			if (!(keys[i] in current)) current[keys[i]] = {};
			current = current[keys[i]];
		}

		current[keys[keys.length - 1]] = value;

		this.emit('config:changed', { path, value });
		logger.debug(`Config updated: ${path} = ${value}`);
	}

}

const instance = new ConfigEngine();

window.sgs = window.sgs || {};

if (!window.sgs.configInstance) {
	window.sgs.configInstance = instance;
} else {
	logger.warn('ConfigEngine instance already exists. Using the existing instance.');
}

export const Config = window.sgs.configInstance;
