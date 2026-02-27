
import { Strings } from './strings.js';

import en from '../../locale/en.js';
import ro from '../../locale/ro.js';

const languages = { en, ro };

export class Localizer {

	constructor(lang = 'en') {
		this.lang = lang;
	}

	setLang(lang) {
		if (!languages[lang]) {
			console.warn(`Language "${lang}" not found, keeping "${this.lang}"`);
			return;
		}
		this.lang = lang;
	}

	/**
	 * translate the string that matches the key
	 * @param key
	 * @param search
	 * @param replace
	 * @returns {unknown}
	 */
	_(key, search = '', replace = '') {

		// Determine which language object to use, fallback to default
		const data = languages[this.lang] ?? languages['en'],
			str = Strings.tokenize(key);

		// Deep-dive into the object using split/reduce
		let translated = str.split('.').reduce((o, i) => o?.[i], data) || key;

		// Handle interpolation if search/replace provided
		if (search && replace) {
			translated = translated.replace(search, replace);
		}

		return translated;
	}

	// ---- Special cases for openweather map description and main groups ----

	/**
	 *
	 * @param weatherObj
	 * @private
	 */
	_owmDesc(weatherObj) {
		if (!weatherObj || weatherObj.length === 0) return '';

		let descr = [];
		weatherObj.forEach((weather) => {
			if (weather?.id >= 801 && weather?.id <= 804) {
				descr.push(this._(`conditions.clouds.${weather.id}`));
			} else {
				descr.push(this._(`conditions.${weather.description}`));
			}
		});
		return descr;
	}

	_owmMain(weatherObj) {
		if (!weatherObj || weatherObj.length === 0) return '';

		let main = [];
		weatherObj.forEach((weather) => {
			main.push(this._(`conditionsGroups.${weather.main.toLowerCase()}`));
		});

		return main;
	}
}
