/**
 * Tokenize the string to match the keys in the locale files
 * some cases are handled specifically for OpenWeatherMap descriptions
 * @param str
 * @returns {string}
 */

export class Strings {

	static isValidUrl(str) {
		try {
			const url = new URL(str);
			return url.protocol === 'http:' || url.protocol === 'https:';
		} catch (_) {
			return false;
		}
	}

	static tokenize(str) {
		if (!str) return '';

		return str
			// Replace special characters and spaces with underscores
			.replace(/\//g, '.')
			.replace(/[^a-zA-Z0-9._]+/g, '_')
			// Remove leading/trailing underscores
			.replace(/^_+|_+$/g, '')
			.replace(/[ :%]/g, '_');
	}
}
