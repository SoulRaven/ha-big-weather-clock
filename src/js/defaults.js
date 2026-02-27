export const defaultSettings = {
	get app() {
		return {
			__app_name__: __CARD_NAME__,
			hacs_path: `/hacsfiles/${__CARD_NAME__}`
		};
	},
	// Path of where the media files are located on the web.
	// If webPath is set, the media files will be loaded from this path instead
	// of the local path. Example: 'https://example.com/media/weather-card/'
	// consider that the web path must be accessible from the browser and with CORS enabled
	webPath: null,
	videoPath: null,
	imagePath: null,
	iconsPath: null,

	timeFormat: 'HH:mm:ss', // defaults to HH:mm:ss when no timeFormat is specified
	dateFormat: 'DD-MM-YYYY', // defaults to DD-MM-YYYY when no dateFormat is specified
	showAMPM: false, // works only with timeFormat that contains 'hh' or 'h'
	timezone: 'UTC', // 'browser' or IANA timezone string like 'Europe/Bucharest'
	locale: 'en', // defaults to 'en' when no locale is specified, tested only on 'ro' and 'en'
	hidePanels: true, // add the options to hide the left and right panels; when the panels are hidden, the media is extended to the full width of the card
	day_night_entity: 'sun.sun', // When is true day theme and video are used, and on false, night theme and video are used
	theme: {
		day: 'solar-bright', // theme for daytime, supports any ha-theme or custom theme, also can be set with CSS variables for the colors in the themeColors config
		night: 'night-vision-red' // theme for nighttime, supports any ha-theme or custom theme, also can be set with CSS variables for the colors in the themeColors config
	},
	mediaManager: {
		renderType: 'both', // 'both'|'images'|'videos'|'none'
		conditionMode: 'description', // 'main' or 'description' - use the main or description field from the weather condition to match the media
		useRandom: true, // if enabled, the media will be randomized for each update
		fadeDuration: 1000, // duration of the fade effect in ms
		minPlayTime: 30_000, // minimum time to play the media in ms
		minRuns: 5, // minimum number of times to play the media before changing it
		imageDuration: 30_000, // duration of the image in ms
		// callbacks
		onError: null, // callback function when an error occurs
		onMediaStateChanged: null, // callback function when the media state changes
		onMediaEnded: null, // callback function when the media ends
		onPlaylistChange: null, // callback function when the playlist changes
		onTransition: null, // callback function when the transition between media elements starts
		fallBackImages: [
			'default/default_day.jpg', // fallback image for day
			'default/default_night.jpg' // fallback image for night
		],
		playlist: []
	},
	localSensors: [], // user defined local sensors to be shown in the card on the left side
	weatherConfig: {
		entityId: 'weather.forecast_home', // Required for Home Assistant provider
		weatherProvider: null, // Supports 'homeassistant' or 'openweathermap' or anm

		// ---- OpenWeatherMap ----
		owm_apiKey: 'your-openweathermap-api-key', // Required for OpenWeatherMap, not used for others

		// Supports 'basic' or 'detailed'.
		// Using 'basic' mode, only the first weather condition is shown.
		// Using 'detailed' mode, all the weather conditions are shown.
		// options are applied only for OpenWeatherMap
		owm_description: 'basic',

		// Supports 'basic' or 'detailed'
		// when 'basic' is using the groups of the conditions grou
		// when 'detailed' is using the specific conditions from the detailed
		// options are applied only for OpenWeatherMap
		owm_conditions: 'basic',

		displayMode: 'both', // Supports 'current' or 'forecast' or 'both'

		latitude: '44.323216', // Default latitude (Craiova, Romania)
		longitude: '23.7654655', // Default longitude (Craiova, Romania)
		units: 'metric', // Supports 'metric' or 'imperial'
		language: 'en', // Language code (ro for Romanian, en for English, etc.) more info from: https://openweathermap.org/api/one-call-3?collection=one_call_api_3.0#multi
		// --- Forcast zone ----
		weatherForecastDays: 8, // Number of days to show in the forecast (1-8)
		weatherUpdateInterval: 30, // Update interval in minutes (minimum: 1, default: 30)

		showLabels: true, // show the labels for items in the current weather display

		icons: {
			iconSet: 'amcharts',// 'basmilius', 'metno', 'amcharts', 'openweathermap', 'maskinThings'
			type: "animated", // possible options are 'static' or 'animated', some sets only contain static; in this case an error is thrown
		},
		iconsAlerts: {
			iconSet: 'nrkno',
			type: "static"
		}

	},
	styles: '', // default styles for the card
};
