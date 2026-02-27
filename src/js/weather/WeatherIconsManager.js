/**
 * Unified Weather condition "enumeration"
 * Maps standard Home Assistant states and major OpenWeatherMap groups
 */
const Weather = Object.freeze({
	// General/Fallback
	All: "all",
	NotAvailable: "not-available",

	// Clear and Clouds
	ClearSky: "clear sky",
	Sunny: "sunny",
	PartlyCloudy: "partlycloudy",
	Clouds: "clouds",
	Overcast: "overcast",
	OvercastClouds: "overcast clouds",

	// Rain and Drizzle
	Rain: "rain",
	Drizzle: "drizzle",
	Pouring: "pouring",
	LightRain: "light rain",
	HeavyRain: "heavy rain",
	ShowerRain: "shower rain",

	// Snow and Ice
	Snow: "snow",
	Sleet: "sleet",
	Hail: "hail",
	SnowyRainy: "snowy-rainy",

	// Thunderstorm
	Thunderstorm: "thunderstorm",
	Lightning: "lightning",
	LightningRainy: "lightning-rainy",

	// Atmosphere
	Mist: "mist",
	Fog: "fog",
	Haze: "haze",
	Smoke: "smoke",
	Dust: "dust",
	Sand: "sand",
	Ash: "ash",
	Squall: "squall",
	Tornado: "tornado",

	// Extreme/Wind
	Windy: "windy",
	WindyVariant: "windy-variant"
});

/**
 * Valid weather conditions for UI validation and filtering
 */
const ValidWeather = Object.freeze(Object.values(Weather));

/**
 * Map OWM descriptions to our internal Weather constants
 * @type {{"few clouds": string, "scattered clouds": string, "broken clouds": string, "overcast clouds": string, "clear sky": string, "light rain": string, "moderate rain": string, "heavy intensity rain": string, "very heavy rain": string, "extreme rain": string, "freezing rain": string, "light intensity shower rain": string, "shower rain": string, "heavy intensity shower rain": string, "ragged shower rain": string, "light intensity drizzle": string, drizzle: string, "heavy intensity drizzle": string, "shower drizzle": string}}
 */
const OWM_DESCRIPTION_MAP = {
	// Cloud variations
	'few clouds': Weather.PartlyCloudy,
	'scattered clouds': Weather.PartlyCloudy,
	'broken clouds': Weather.Clouds,
	'overcast clouds': Weather.Overcast,

	// Clear variations
	'clear sky': Weather.ClearSky,

	// Rain variations
	'light rain': Weather.LightRain,
	'moderate rain': Weather.Rain,
	'heavy intensity rain': Weather.HeavyRain,
	'very heavy rain': Weather.HeavyRain,
	'extreme rain': Weather.Pouring,
	'freezing rain': Weather.SnowyRainy,
	'light intensity shower rain': Weather.ShowerRain,
	'shower rain': Weather.ShowerRain,
	'heavy intensity shower rain': Weather.ShowerRain,
	'ragged shower rain': Weather.ShowerRain,

	// Drizzle variations
	'light intensity drizzle': Weather.Drizzle,
	'drizzle': Weather.Drizzle,
	'heavy intensity drizzle': Weather.Drizzle,
	'shower drizzle': Weather.Drizzle
};

// 1. Map OWM codes (01d, 10n, etc.) to our internal Weather constants
const OWM_CODE_MAP = {
	'01d': Weather.Sunny, '01n': Weather.ClearSky,
	'02d': Weather.PartlyCloudy, '02n': Weather.PartlyCloudy,
	'03d': Weather.Clouds, '03n': Weather.Clouds,
	'04d': Weather.Overcast, '04n': Weather.Overcast,
	'09d': Weather.Rain, '09n': Weather.Rain,
	'10d': Weather.Rain, '10n': Weather.Rain,
	'11d': Weather.Thunderstorm, '11n': Weather.Thunderstorm,
	'13d': Weather.Snow, '13n': Weather.Snow,
	'50d': Weather.Fog, '50n': Weather.Fog
};


const BASE_URLS = {
	BASMILIUS: 'https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all',
	METNO: 'https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg',
	OWM: 'https://openweathermap.org/img/wn',
	AMCHARTS: 'https://www.amcharts.com'
};



const WeatherIconManager = {

	/**
	 * @param {string} condition - Can be OWM code ('01d'), HA state ('rainy'), or ANM ('cer senin')
	 * @param {string} iconSet - 'basmilius', 'metno', 'amcharts', 'openweathermap', 'fontawesome', 'local'
	 * @param localPath
	 */
	getIconUrl(condition, iconSet, localPath = '/local/weather-icons/') {
		const normalized = this._normalize(condition);

		switch (iconSet) {
			case 'basmilius':
				return this._getBasMiliusIcon(normalized);
			case 'amcharts':
				return this._getAmChartsIcon(normalized);
			case 'fontawesome':
				return this._getFontAwesomeClass(normalized);
			case 'openweathermap':
				return this._getOpenWeatherMapIcon(normalized);
			case 'local':
				return `${localPath}${normalized}.svg`;
			case 'metno':
			default:
				return this._getMetNoIcon(normalized);
		}
	},

	/**
	 * The Master Normalizer: Converts any source input into a Weather constant
	 */
	_normalize(input) {
		if (!input) {
			return Weather.NotAvailable;
		}

		const lowInput = input.toLowerCase();

		// Check if it's an OWM code
		if (OWM_CODE_MAP[lowInput]) {
			return lowInput;
		}

		// Check if it's an OWM description
		if (OWM_DESCRIPTION_MAP[lowInput]) {
			return OWM_DESCRIPTION_MAP[lowInput];
		}

		// Check if it's already a valid HA state/Weather constant value
		// We do a direct return if the value exists in our Weather enum values
		return lowInput;
	},

	/**
		 * Animated Bas Milius (High Quality)
		 */
	_getBasMiliusIcon(c) {
		const map = {
			[Weather.Sunny]: 'clear-day',
			[Weather.ClearSky]: 'clear-day',
			[Weather.PartlyCloudy]: 'partly-cloudy-day',
			[Weather.Clouds]: 'cloudy',
			[Weather.Overcast]: 'overcast',
			[Weather.Rain]: 'rain',
			[Weather.Drizzle]: 'drizzle',
			[Weather.Pouring]: 'extreme-rain',
			[Weather.Thunderstorm]: 'thunderstorms',
			[Weather.LightningRainy]: 'thunderstorms-rain',
			[Weather.Snow]: 'snow',
			[Weather.Sleet]: 'sleet',
			[Weather.Fog]: 'fog',
			[Weather.Windy]: 'wind'
		};
		return `${BASE_URLS.BASMILIUS}/${map[c] || 'not-available'}.svg`;
	},

	/**
	 * Met.no (Official HA Style)
	 */
	_getMetNoIcon(c) {
		const map = {
			[Weather.Sunny]: 'clearsky_day',
			[Weather.ClearSky]: 'clearsky_day',
			[Weather.PartlyCloudy]: 'fair_day',
			[Weather.Clouds]: 'cloudy',
			[Weather.Rain]: 'rain',
			[Weather.Pouring]: 'heavyrain',
			[Weather.LightningRainy]: 'rainshowersandthunder_day',
			[Weather.Snow]: 'snow',
			[Weather.Sleet]: 'sleet',
			[Weather.Fog]: 'fog'
		};
		console.log(map);
		return `${BASE_URLS.METNO}/${map[c] || 'clearsky_day'}.svg`;
	},

	/**
	 * AmCharts (SVG Animations)
	 */
	_getAmChartsIcon(c) {
		const map = {
			[Weather.Sunny]: 'day',
			[Weather.ClearSky]: 'day',
			[Weather.PartlyCloudy]: 'cloudy-day-1',
			[Weather.Clouds]: 'cloudy',
			[Weather.Rain]: 'rainy-6',
			[Weather.Thunderstorm]: 'thunder',
			[Weather.Snow]: 'snowy-6',
			[Weather.Fog]: 'cloudy'
		};
		return `${BASE_URLS.AMCHARTS}/${map[c] || 'day'}.svg`;
	},

	/**
	 * Font Awesome Classes (v6/v7)
	 */
	_getFontAwesomeClass(c) {
		const map = {
			[Weather.Sunny]: 'fas fa-sun',
			[Weather.ClearSky]: 'fas fa-sun',
			[Weather.PartlyCloudy]: 'fas fa-cloud-sun',
			[Weather.Clouds]: 'fas fa-cloud',
			[Weather.Rain]: 'fas fa-cloud-showers-heavy',
			[Weather.Snow]: 'fas fa-snowflake',
			[Weather.Thunderstorm]: 'fas fa-bolt-lightning',
			[Weather.Windy]: 'fas fa-wind',
			[Weather.Fog]: 'fas fa-smog'
		};
		return map[c] || 'fas fa-question';
	},

	/**
	 * OpenWeatherMap Static
	 */
	_getOpenWeatherMapIcon(c) {
		return `${BASE_URLS.OWM}/${c || '01d'}@2x.png`;
	},

};


export { BASE_URLS, Weather, ValidWeather, WeatherIconManager };
