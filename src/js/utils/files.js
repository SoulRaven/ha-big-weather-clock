export class Files {

	/**
	 *
	 * @param url
	 * @param callback
	 * @returns {boolean}
	 */
	static imageExists(url, callback=()=>{}) {
		const img = new Image();
		img.src = url;

		if (img.complete) {
			// eslint-disable-next-line n/no-callback-literal
			callback(true);
			return true;
		}
		return false;
	}

	static async isVideoValid(url) {
		try {
			const response = await fetch(url, { method: 'HEAD' });
			const contentType = response.headers.get('Content-Type');
			return response.ok && contentType.includes('video');
		} catch (e) {
			return false;
		}
	}
}
