
export class Maths {
	static max(n) {
		return Math.max(...n);
	}

	static min(n) {
		return Math.min(...n);
	}

	static round(n, precision = 0) {
		if (precision <= 0) {
			return Math.round(n);
		}
		const factor = Math.pow(10, precision);
		return Math.round(n * factor) / factor;
	}

	static roundUp(n, precision = 0) {
		if (precision <= 0) {
			return Math.ceil(n);
		}
		return Math.ceil(n / precision) * precision;
	}

	static roundDown(n, precision = 0) {
		if (precision <= 0) {
			return Math.floor(n);
		}
		return Math.floor(n / precision) * precision;
	}

	static roundIfNotNull(number = null) {
		if (number === null) {
			return null;
		}
		return Math.round(number);
	}

	static randomIntFromInterval(min, max) { // min and max included
		min = Math.ceil(min);
		max = Math.floor(max);
		const range = max - min + 1;

		// Check if Web Crypto API is available
		if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
			const randomBuffer = new Uint32Array(1);
			window.crypto.getRandomValues(randomBuffer);

			// Normalize the 32-bit unsigned integer to our range
			// 0xffffffff is the max value for a Uint32
			return min + Math.floor((randomBuffer[0] / 0x100000000) * range);
		} else {
			// Fallback for older browsers or non-secure contexts
			console.warn("window.crypto not available. Falling back to Math.random.");
			return Math.floor(Math.random() * range) + min;
		}
	}
}
