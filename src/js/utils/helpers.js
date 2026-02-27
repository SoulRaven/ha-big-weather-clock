
export class Helpers {

	/**
	 * Checks if an item is a true object (and not an Array or null)
	 * @param {any} item - The item to test
	 * @returns {boolean}
	 */
	static isObject(item) {
		return (item && typeof item === 'object' && !Array.isArray(item));
	}

	/**
	 * Human-readable time difference between now and lastUpdated
	 * @param lastUpdated
	 * @returns {string}
	 */
	static getRelativeTime(lastUpdated) {
		const now = new Date();
		const updated = new Date(lastUpdated);
		const diffSeconds = Math.floor((now - updated) / 1000);

		if (diffSeconds < 60) {
			return i18n._("global.just_now");
		}
		if (diffSeconds < 3600) {
			const mins = Math.floor(diffSeconds / 60);
			return `${mins} ${mins === 1 ? 'min' : 'mins'} ago`;
		}
		if (diffSeconds < 86400) {
			const hrs = Math.floor(diffSeconds / 3600);
			return `${hrs} ${hrs === 1 ? 'hr' : 'hrs'} ago`;
		}
		return updated.toLocaleDateString();
	}

	/**
	 * Checks if the lastUpdated is older than 10 minutes
	 * @param lastUpdated
	 * @returns {boolean}
	 */
	static isStale(lastUpdated) {
		const diff = (new Date() - new Date(lastUpdated)) / 1000;
		return diff > 600;
	}

	static _calculateMoldRisk(temp, humidity) {
		// Magnus Formula constants for accuracy between -45C and 60C
		const a = 17.27,
			b = 237.7;

		// 1. Calculate Dew Point
		const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
		const dewPoint = (b * alpha) / (a - alpha);

		// 2. Estimate the coldest surface (e.g., wall/window is ~3°C colder)
		const surfaceTemp = temp - 3;

		// 3. Calculate Spread
		const spread = surfaceTemp - dewPoint;

		let risk;

		switch (true) {
			case (spread <= 1):
				risk = {
					level: i18n._('global.critical'),
					cssClass: "mold-risk-critical",
					icon: 'mdi:alert-octagon'
				}; // Near condensation
				break;
			case (spread <= 3):
				risk = { level: i18n._('global.high'), cssClass: "mold-risk-high", icon: 'mdi:alert' };
				break;
			case (humidity > 70):
				risk = { level: i18n._('global.medium'), cssClass: "mold-risk-warning", icon: 'mdi:alert-outline' }; // High RH
				break;
			default:
				risk = { level: i18n._('global.safe'), cssClass: "mold-risk-safe", 'icon': 'mdi:check-circle' };
		}
		return risk;
	}

	/**
	 *
	 * @param stateString
	 * @returns {string}
	 * @private
	 */
	static getBatteryInfo(stateString) {
		const value = parseInt(stateString);

		let color;

		switch(true) {
			case isNaN(value):
				color = 'var(--secondary-text-color)';
				break;
			case (value <= 15):
				color = 'var(--error-color)'; // Empty
				break;
			case (value <= 30):
				color = 'var(--warning-color)'; // Full
				break;
			case (value <= 70):
				color = 'var(--primary-text-color)';
				break;
			default:
				color = 'var(--success-color, #4caf50)';
		}
		return color;
	}

	static isKioskActive() {
		const urlParams = new URLSearchParams(window.location.search);
		// Returns true if ?kiosk or ?hide_header is present in the URL
		return urlParams.has('kiosk') || urlParams.has('hide_header');
	}

	static hasDebug() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.has('debug');

	}

	static isNight(entity, hass) {
		const _hass = hass || document.querySelector('home-assistant').hass,
			h = new Date().getHours(),
			fallBackState = h < 6 || h >= 19;

		if (!entity || !_hass) {
			return fallBackState;
		}

		const stateObj = _hass.states[entity];
		if (!stateObj) {
			return fallBackState;
		}

		const state = stateObj.state;

		// Boolean-like entities
		if (["on", "true", "home", "open"].includes(state)) {
			return true;
		}

		if (["off", "false", "not_home", "closed"].includes(state)) {
			return false;
		}

		// sun.sun special handling
		if (state === "below_horizon") {
			return true;
		}
		if (state === "above_horizon") {
			return false;
		}
		return fallBackState;
	}

	/**
	 * Merges user configuration into a default configuration object.
	 * Handles deeply nested objects and merges arrays.
	 *
	 * @param {Object} target - The default/base configuration
	 * @param {Object} source - The user-defined options
	 * @returns {Object} A new merged object
	 */
	static defaultMerge(target, source) {

		const result = structuredClone(target);

		const merge = (t, s) => {
			// If a source is not an object/array, it's a primitive; return it to overwrite target
			if (!s || typeof s !== 'object') return s;

			Object.keys(s).forEach(key => {
				const sValue = s[key],
					tValue = t[key];

				if (Array.isArray(tValue) && Array.isArray(sValue)) {
					// ARRAY MERGE: Concatenate user options to defaults
					t[key] = [...tValue, ...sValue];
				} else if (Helpers.isObject(tValue) && Helpers.isObject(sValue)) {
					// OBJECT MERGE: Recursive call AND assign the result back
					t[key] = merge(tValue, sValue);
				} else {
					// OVERWRITE: Fallback for primitives or if types changed (e.g., string to object)
					t[key] = sValue;
				}
			});
			return t;
		};

		return merge(result, source);
	}

	/**
	 * Performs a deep merge of two objects, specifically designed for
	 * Home Assistant configuration objects.
	 *
	 * @param {Object} target - The base/default object to merge into.
	 * @param {Object} source - The user-defined object containing overrides.
	 * @returns {Object} A new, deeply merged object without mutating originals.
	 */
	static deepMerge(target, source) {
		// 1. Initialize the merge by cloning the target to ensure immutability.
		// This prevents the "memory slip" from accidentally changing your default constants.
		const result = structuredClone(target);

		// Internal helper to handle the recursive merging without re-cloning every level
		const runner = (tg, src) => {
			// If the source isn't an object (e.g., null or primitive), return it as is
			if (!Helpers.isObject(src)) return src;

			Object.keys(src).forEach(key => {
				const targetVal = tg[key],
					sourcesVal = src[key];

				if (Array.isArray(targetVal) && Array.isArray(sourcesVal)) {
					// STRATEGY: Array Concatenation
					// Combines user arrays with default arrays instead of replacing them.
					tg[key] = targetVal.concat(sourcesVal);
				} else if (Helpers.isObject(targetVal) && Helpers.isObject(sourcesVal)) {
					// STRATEGY: Recursive Object Merge
					// If both are objects, we dive deeper into the tree.
					tg[key] = runner(targetVal, sourcesVal);
				} else {
					// STRATEGY: Overwrite
					// If types don't match or are primitives (string/number/bool),
					// the source value takes precedence.
					tg[key] = sourcesVal;
				}
			});
			return tg;
		};
		return runner(result, source);
	}

}

