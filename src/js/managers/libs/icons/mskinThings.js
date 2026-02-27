/**
 * Makin-Things Weather Icon
 * Grouped by the OpenWeatherMap condition codes for dynamic day/night rendering.
 * source: https://github.com/Makin-Things/weather-icons
 * @type {Readonly<{thunderstorm_with_light_rain: {day: string, night: string}, thunderstorm_with_rain: {day: string, night: string}, thunderstorm_with_heavy_rain: {day: string, night: string}, light_thunderstorm: {day: string, night: string}, thunderstorm: {day: string, night: string}, heavy_thunderstorm: {day: string, night: string}, ragged_thunderstorm: {day: string, night: string}, thunderstorm_with_light_drizzle: {day: string, night: string}, thunderstorm_with_drizzle: {day: string, night: string}, thunderstorm_with_heavy_drizzle: {day: string, night: string}, light_intensity_drizzle: {day: string, night: string}, drizzle: {day: string, night: string}, heavy_intensity_drizzle: {day: string, night: string}, light_intensity_drizzle_rain: {day: string, night: string}, drizzle_rain: {day: string, night: string}, heavy_intensity_drizzle_rain: {day: string, night: string}, shower_rain_and_drizzle: {day: string, night: string}, heavy_shower_rain_and_drizzle: {day: string, night: string}, shower_drizzle: {day: string, night: string}, light_rain: {day: string, night: string}, moderate_rain: {day: string, night: string}, heavy_intensity_rain: {day: string, night: string}, very_heavy_rain: {day: string, night: string}, extreme_rain: {day: string, night: string}, freezing_rain: {day: string, night: string}, light_intensity_shower_rain: {day: string, night: string}, shower_rain: {day: string, night: string}, heavy_intensity_shower_rain: {day: string, night: string}, ragged_shower_rain: {day: string, night: string}, light_snow: {day: string, night: string}, snow: {day: string, night: string}, heavy_snow: {day: string, night: string}, sleet: {day: string, night: string}, light_shower_sleet: {day: string, night: string}, shower_sleet: {day: string, night: string}, light_rain_and_snow: {day: string, night: string}, rain_and_snow: {day: string, night: string}, light_shower_snow: {day: string, night: string}, shower_snow: {day: string, night: string}, heavy_shower_snow: {day: string, night: string}, mist: {day: string, night: string}, smoke: {day: string, night: string}, haze: {day: string, night: string}, sand_dust_whirls: {day: string, night: string}, fog: {day: string, night: string}, sand: {day: string, night: string}, dust: {day: string, night: string}, volcanic_ash: {day: string, night: string}, squalls: {day: string, night: string}, tornado: {day: string, night: string}, clear_sky: {day: string, night: string}, few_clouds: {day: string, night: string}, scattered_clouds: {day: string, night: string}, broken_clouds: {day: string, night: string}, overcast_clouds: {day: string, night: string}}>}
 */
export const mskinThingsTruthTable = Object.freeze({
	options: {
		alias: 'maskinThings',
		type: ['static', 'animated'],
		path: '/media/icons/weather/makinThings/'
	},

	// Thunderstorm
	thunderstorm_with_light_rain: {
		day: "isolated-thunderstorms-day.svg",
		night: "isolated-thunderstorms-night.svg"
	},
	thunderstorm_with_rain: {
		day: "scattered-thunderstorms-day.svg",
		night: "scattered-thunderstorms-night.svg"
	},
	thunderstorm_with_heavy_rain: {
		day: "severe-thunderstorm.svg",
		night: "severe-thunderstorm.svg"
	},
	light_thunderstorm: {
		day: "isolated-thunderstorms.svg",
		night: "isolated-thunderstorms.svg"
	},
	thunderstorm: {day: "thunderstorms.svg", night: "thunderstorms.svg"},
	heavy_thunderstorm: {
		day: "severe-thunderstorm.svg",
		night: "severe-thunderstorm.svg"
	},
	ragged_thunderstorm: {day: "thunderstorms.svg", night: "thunderstorms.svg"},
	thunderstorm_with_light_drizzle: {
		day: "isolated-thunderstorms-day.svg",
		night: "isolated-thunderstorms-night.svg"
	},
	thunderstorm_with_drizzle: {
		day: "scattered-thunderstorms-day.svg",
		night: "scattered-thunderstorms-night.svg"
	},
	thunderstorm_with_heavy_drizzle: {
		day: "severe-thunderstorm.svg",
		night: "severe-thunderstorm.svg"
	},

	// Drizzle
	light_intensity_drizzle: {day: "rainy-1-day.svg", night: "rainy-1-night.svg"},
	drizzle: {day: "rainy-1.svg", night: "rainy-1.svg"},
	heavy_intensity_drizzle: {day: "rainy-2.svg", night: "rainy-2.svg"},
	light_intensity_drizzle_rain: {
		day: "rainy-1-day.svg",
		night: "rainy-1-night.svg"
	},
	drizzle_rain: {day: "rainy-1.svg", night: "rainy-1.svg"},
	heavy_intensity_drizzle_rain: {day: "rainy-2.svg", night: "rainy-2.svg"},
	shower_rain_and_drizzle: {day: "rainy-2-day.svg", night: "rainy-2-night.svg"},
	heavy_shower_rain_and_drizzle: {day: "rainy-3.svg", night: "rainy-3.svg"},
	shower_drizzle: {day: "rainy-1.svg", night: "rainy-1.svg"},

	// Rain
	light_rain: {day: "rainy-1-day.svg", night: "rainy-1-night.svg"},
	moderate_rain: {day: "rainy-2.svg", night: "rainy-2.svg"},
	heavy_intensity_rain: {day: "rainy-3-day.svg", night: "rainy-3-night.svg"},
	very_heavy_rain: {day: "rainy-3.svg", night: "rainy-3.svg"},
	extreme_rain: {day: "rainy-3.svg", night: "rainy-3.svg"},
	freezing_rain: {
		day: "rain-and-sleet-mix.svg",
		night: "rain-and-sleet-mix.svg"
	},
	light_intensity_shower_rain: {
		day: "rainy-1-day.svg",
		night: "rainy-1-night.svg"
	},
	shower_rain: {day: "rainy-2-day.svg", night: "rainy-2-night.svg"},
	heavy_intensity_shower_rain: {day: "rainy-3-day.svg", night: "rainy-3-night.svg"},
	ragged_shower_rain: {day: "rainy-2-day.svg", night: "rainy-2-night.svg"},

	// Snow
	light_snow: {day: "snowy-1-day.svg", night: "snowy-1-night.svg"},
	snow: {day: "snowy-2-day.svg", night: "snowy-2-night.svg"},
	heavy_snow: {day: "snowy-3-day.svg", night: "snowy-3-night.svg"},
	sleet: {day: "snow-and-sleet-mix.svg", night: "snow-and-sleet-mix.svg"},
	light_shower_sleet: {
		day: "snow-and-sleet-mix.svg",
		night: "snow-and-sleet-mix.svg"
	},
	shower_sleet: {
		day: "snow-and-sleet-mix.svg",
		night: "snow-and-sleet-mix.svg"
	},
	light_rain_and_snow: {
		day: "rain-and-snow-mix.svg",
		night: "rain-and-snow-mix.svg"
	},
	rain_and_snow: {day: "rain-and-snow-mix.svg", night: "rain-and-snow-mix.svg"},
	light_shower_snow: {day: "snowy-1-day.svg", night: "snowy-1-night.svg"},
	shower_snow: {day: "snowy-2-day.svg", night: "snowy-2-night.svg"},
	heavy_shower_snow: {day: "snowy-3-day.svg", night: "snowy-3-night.svg"},

	// Atmosphere
	mist: {day: "fog.svg", night: "fog.svg"},
	smoke: {day: "fog.svg", night: "fog.svg"},
	haze: {day: "haze-day.svg", night: "haze-night.svg"},
	sand_dust_whirls: {day: "dust.svg", night: "dust.svg"},
	fog: {day: "fog-day.svg", night: "fog-night.svg"},
	sand: {day: "dust.svg", night: "dust.svg"},
	dust: {day: "dust.svg", night: "dust.svg"},
	volcanic_ash: {day: "fog.svg", night: "fog.svg"},
	squalls: {day: "wind.svg", night: "wind.svg"},
	tornado: {day: "tornado.svg", night: "tornado.svg"},

	// Clouds
	clear_sky: {day: "clear-day.svg", night: "clear-night.svg"},
	few_clouds: {day: "cloudy-1-day.svg", night: "cloudy-1-night.svg"},
	scattered_clouds: {day: "cloudy-2-day.svg", night: "cloudy-2-night.svg"},
	broken_clouds: {day: "cloudy-3-day.svg", night: "cloudy-3-night.svg"},
	overcast_clouds: {day: "cloudy.svg", night: "cloudy.svg"}
});

/**
 * 2026 Optimized Icon Resolver
 * @param {string} condition - The normalized condition key
 * @param {boolean} isDay - Calculated from sun.sun or sunset/sunrise times
 */
export function resolveWeatherIcon(condition, isDay) {
	const mode = isDay ? 'day' : 'night';

	// 1. Try to find a mode-specific icon (day or night version)
	if (WEATHER_ICONS[mode][condition]) {
		return WEATHER_ICONS[mode][condition];
	}

	// 2. Fallback to Universal icon (e.g. tornado, hurricane, wind)
	return WEATHER_ICONS.universal[condition] || "cloudy.svg";
}
