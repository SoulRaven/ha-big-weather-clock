/**
 * Met.no Weather Icon
 * Grouped by the OpenWeatherMap condition codes for dynamic day/night rendering.
 * source: https://github.com/metno/weathericons/tree/main
 * @type {Readonly<{thunderstorm_with_light_rain: {day: string, night: string}, thunderstorm_with_rain: {day: string, night: string}, thunderstorm_with_heavy_rain: {day: string, night: string}, light_thunderstorm: {day: string, night: string}, thunderstorm: {day: string, night: string}, heavy_thunderstorm: {day: string, night: string}, ragged_thunderstorm: {day: string, night: string}, thunderstorm_with_light_drizzle: {day: string, night: string}, thunderstorm_with_drizzle: {day: string, night: string}, thunderstorm_with_heavy_drizzle: {day: string, night: string}, light_intensity_drizzle: {day: string, night: string}, drizzle: {day: string, night: string}, heavy_intensity_drizzle: {day: string, night: string}, light_intensity_drizzle_rain: {day: string, night: string}, drizzle_rain: {day: string, night: string}, heavy_intensity_drizzle_rain: {day: string, night: string}, shower_rain_and_drizzle: {day: string, night: string}, heavy_shower_rain_and_drizzle: {day: string, night: string}, shower_drizzle: {day: string, night: string}, light_rain: {day: string, night: string}, moderate_rain: {day: string, night: string}, heavy_intensity_rain: {day: string, night: string}, very_heavy_rain: {day: string, night: string}, extreme_rain: {day: string, night: string}, freezing_rain: {day: string, night: string}, light_intensity_shower_rain: {day: string, night: string}, shower_rain: {day: string, night: string}, heavy_intensity_shower_rain: {day: string, night: string}, ragged_shower_rain: {day: string, night: string}, light_snow: {day: string, night: string}, snow: {day: string, night: string}, heavy_snow: {day: string, night: string}, sleet: {day: string, night: string}, light_shower_sleet: {day: string, night: string}, shower_sleet: {day: string, night: string}, light_rain_and_snow: {day: string, night: string}, rain_and_snow: {day: string, night: string}, light_shower_snow: {day: string, night: string}, shower_snow: {day: string, night: string}, heavy_shower_snow: {day: string, night: string}, mist: {day: string, night: string}, smoke: {day: string, night: string}, haze: {day: string, night: string}, sand_dust_whirls: {day: string, night: string}, fog: {day: string, night: string}, sand: {day: string, night: string}, dust: {day: string, night: string}, volcanic_ash: {day: string, night: string}, squalls: {day: string, night: string}, tornado: {day: string, night: string}, clear_sky: {day: string, night: string}, few_clouds: {day: string, night: string}, scattered_clouds: {day: string, night: string}, broken_clouds: {day: string, night: string}, overcast_clouds: {day: string, night: string}}>}
 */
export const metnoTruthTable = Object.freeze({
	options: {
		alias: 'metno',
		type: ['static'],
		path: '/media/icons/weather/metno/'
	},

	// Thunderstorm
	thunderstorm_with_light_rain: {
		day: "lightrainshowersandthunder_day.svg",
		night: "lightrainshowersandthunder_night.svg"
	},
	thunderstorm_with_rain: {
		day: "rainshowersandthunder_day.svg",
		night: "rainshowersandthunder_night.svg"
	},
	thunderstorm_with_heavy_rain: {
		day: "heavyrainshowersandthunder_day.svg",
		night: "heavyrainshowersandthunder_night.svg"
	},
	light_thunderstorm: {
		day: "lightrainandthunder.svg",
		night: "lightrainandthunder.svg"
	},
	thunderstorm: {day: "rainandthunder.svg", night: "rainandthunder.svg"},
	heavy_thunderstorm: {
		day: "heavyrainandthunder.svg",
		night: "heavyrainandthunder.svg"
	},
	ragged_thunderstorm: {day: "rainandthunder.svg", night: "rainandthunder.svg"},
	thunderstorm_with_light_drizzle: {
		day: "lightrainandthunder.svg",
		night: "lightrainandthunder.svg"
	},
	thunderstorm_with_drizzle: {
		day: "rainandthunder.svg",
		night: "rainandthunder.svg"
	},
	thunderstorm_with_heavy_drizzle: {
		day: "heavyrainandthunder.svg",
		night: "heavyrainandthunder.svg"
	},

	// Drizzle
	light_intensity_drizzle: {
		day: "lightrainshowers_day.svg",
		night: "lightrainshowers_night.svg"
	},
	drizzle: {day: "lightrain.svg", night: "lightrain.svg"},
	heavy_intensity_drizzle: {day: "rain.svg", night: "rain.svg"},
	light_intensity_drizzle_rain: {
		day: "lightrainshowers_day.svg",
		night: "lightrainshowers_night.svg"
	},
	drizzle_rain: {day: "lightrain.svg", night: "lightrain.svg"},
	heavy_intensity_drizzle_rain: {day: "rain.svg", night: "rain.svg"},
	shower_rain_and_drizzle: {
		day: "rainshowers_day.svg",
		night: "rainshowers_night.svg"
	},
	heavy_shower_rain_and_drizzle: {
		day: "heavyrainshowers_day.svg",
		night: "heavyrainshowers_night.svg"
	},
	shower_drizzle: {
		day: "lightrainshowers_day.svg",
		night: "lightrainshowers_night.svg"
	},

	// Rain
	light_rain: {day: "lightrain.svg", night: "lightrain.svg"},
	moderate_rain: {day: "rain.svg", night: "rain.svg"},
	heavy_intensity_rain: {day: "heavyrain.svg", night: "heavyrain.svg"},
	very_heavy_rain: {day: "heavyrain.svg", night: "heavyrain.svg"},
	extreme_rain: {day: "heavyrain.svg", night: "heavyrain.svg"},
	freezing_rain: {day: "sleet.svg", night: "sleet.svg"},
	light_intensity_shower_rain: {
		day: "lightrainshowers_day.svg",
		night: "lightrainshowers_night.svg"
	},
	shower_rain: {day: "rainshowers_day.svg", night: "rainshowers_night.svg"},
	heavy_intensity_shower_rain: {
		day: "heavyrainshowers_day.svg",
		night: "heavyrainshowers_night.svg"
	},
	ragged_shower_rain: {
		day: "rainshowers_day.svg",
		night: "rainshowers_night.svg"
	},

	// Snow
	light_snow: {day: "lightsnow.svg", night: "lightsnow.svg"},
	snow: {day: "snow.svg", night: "snow.svg"},
	heavy_snow: {day: "heavysnow.svg", night: "heavysnow.svg"},
	sleet: {day: "sleet.svg", night: "sleet.svg"},
	light_shower_sleet: {
		day: "lightsleetshowers_day.svg",
		night: "lightsleetshowers_night.svg"
	},
	shower_sleet: {day: "sleetshowers_day.svg", night: "sleetshowers_night.svg"},
	light_rain_and_snow: {day: "lightsleet.svg", night: "lightsleet.svg"},
	rain_and_snow: {day: "sleet.svg", night: "sleet.svg"},
	light_shower_snow: {
		day: "lightsnowshowers_day.svg",
		night: "lightsnowshowers_night.svg"
	},
	shower_snow: {day: "snowshowers_day.svg", night: "snowshowers_night.svg"},
	heavy_shower_snow: {
		day: "heavysnowshowers_day.svg",
		night: "heavysnowshowers_night.svg"
	},

	// Atmosphere
	mist: {day: "fog.svg", night: "fog.svg"},
	smoke: {day: "fog.svg", night: "fog.svg"},
	haze: {day: "fog.svg", night: "fog.svg"},
	sand_dust_whirls: {day: "fog.svg", night: "fog.svg"},
	fog: {day: "fog.svg", night: "fog.svg"},
	sand: {day: "fog.svg", night: "fog.svg"},
	dust: {day: "fog.svg", night: "fog.svg"},
	volcanic_ash: {day: "fog.svg", night: "fog.svg"},
	squalls: {day: "cloudy.svg", night: "cloudy.svg"},
	tornado: {day: "cloudy.svg", night: "cloudy.svg"},

	// Clouds
	clear_sky: {day: "clearsky_day.svg", night: "clearsky_night.svg"},
	few_clouds: {day: "fair_day.svg", night: "fair_night.svg"},
	scattered_clouds: {
		day: "partlycloudy_day.svg",
		night: "partlycloudy_night.svg"
	},
	broken_clouds: {day: "cloudy.svg", night: "cloudy.svg"},
	overcast_clouds: {day: "cloudy.svg", night: "cloudy.svg"}
});

/**
 * Logic to pick up the specific icons
 * @param {string} condition - e.g., 'clearsky'
 * @param {string} mode - 'day', 'night', or 'polartwilight'
 */
export function getMetNoIcon(condition, mode) {
	// 1. Check Universal group first (rain, cloudy, etc.)
	if (METNO_ICONS.universal[condition]) {
		return METNO_ICONS.universal[condition];
	}
	// 2. Fallback to a specific lighting mode (day/night/twilight)
	return METNO_ICONS[mode]?.[condition] || METNO_ICONS.day[condition];
}
