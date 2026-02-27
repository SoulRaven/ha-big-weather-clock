import { Maths } from "./maths.js";

export class Meteorology {

	static #UNITS = {
		temp: {
			C: { long: "Celsius", short: "°C" },
			F: { long: "Fahrenheit", short: "°F" },
			K: { long: "Kelvin", short: "K" }
		},
		wind: {
			ms: { long: "Meters per second", short: "m/s", rate: 1 },
			kmh: { long: "Kilometers per hour", short: "Km/h", rate: 3.6 },
			mph: { long: "Miles per hour", short: "mph", rate: 2.23694 },
			knots: { long: "Knots", short: "kn", rate: 1.94384 }
		},
		pressure: {
			hpa: { long: "Hectopascals", short: "hPa", rate: 1 },
			mb: { long: "Millibars", short: "mb", rate: 1 },
			inhg: { long: "Inches of Mercury", short: "inHg", rate: 0.02953 },
			atm: { long: "Atmospheres", short: "atm", rate: 0.0009869 }
		},
		distance: {
			m: { long: "Meters", short: "m", rate: 1 },
			km: { long: "Kilometers", short: "km", rate: 0.001 },
			mi: { long: "Miles", short: "mi", rate: 0.000621371 },
			nmi: { long: "Nautical Miles", short: "nmi", rate: 0.000539957 },
			ft: { long: "Feet", short: "ft", rate: 3.28084 }
		},
		precip: {
			mm: { long: "Millimeters", short: "mm", rate: 1 },
			in: { long: "Inches", short: "in", rate: 0.0393701 },
			cm: { long: "Centimeters", short: "cm", rate: 0.1 }
		}
	};

	/**
	 * Helper to handle linear conversion categories like wind speed, pressure, distance, precipitation
	 * @param category
	 * @param val
	 * @param from
	 * @param to
	 * @param unit
	 * @returns {(number|*)[]}
	 */
	static #convertLinear(category, val, from, to, unit = 'short') {
		const data = this.#UNITS[category];

		if (!data[from] || !data[to]) {
			throw new Error(`Invalid unit in ${category}`);
		}

		const result = (val / data[from].rate) * data[to].rate;

		return [Maths.round(result, 0), data[to][unit]];
	}

	/**
	 * Assumes that the value from is already in Celsius
	 * @param val
	 * @param from
	 * @param to
	 * @param unit
	 */
	static convertTemp(val, from, to, unit = 'short') {
		const data = this.#UNITS.temp;

		let celsius = from === 'C' ? val : from === 'F' ? (val - 32) * 5 / 9 : val - 273.15,
			result = to === 'C' ? celsius : to === 'F' ? (celsius * 9 / 5) + 32 : celsius + 273.15;

		return [Maths.round(result, 0), data[to][unit]];
	}


	static convertWind(val, from, to, unit = 'short') {
		return this.#convertLinear('wind', val, from, to, unit);
	}

	static convertPressure(val, from, to, unit = 'short') {
		return this.#convertLinear('pressure', val, from, to, unit);
	}

	static convertDistance(val, from, to, unit = 'short') {
		return this.#convertLinear('distance', val, from, to, unit);
	}

	static convertPrecip(val, from, to, unit = 'short') {
		return this.#convertLinear('precip', val, from, to, unit);
	}

	static getWindDirection(degrees) {
		const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
		const index = Math.round(degrees / 45) % 8;
		return directions[index];
	}
}
