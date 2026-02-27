/**
 * Meteocons Weather Icon
 * Grouped by the OpenWeatherMap condition codes for dynamic day/night rendering.
 * source: https://github.com/basmilius/weather-icons
 * source: https://bas.dev/work/meteocons
 * @type {Readonly<{thunderstorm_with_light_rain: {day: string, night: string}, thunderstorm_with_rain: {day: string, night: string}, thunderstorm_with_heavy_rain: {day: string, night: string}, light_thunderstorm: {day: string, night: string}, thunderstorm: {day: string, night: string}, heavy_thunderstorm: {day: string, night: string}, ragged_thunderstorm: {day: string, night: string}, thunderstorm_with_light_drizzle: {day: string, night: string}, thunderstorm_with_drizzle: {day: string, night: string}, thunderstorm_with_heavy_drizzle: {day: string, night: string}, light_intensity_drizzle: {day: string, night: string}, drizzle: {day: string, night: string}, heavy_intensity_drizzle: {day: string, night: string}, light_intensity_drizzle_rain: {day: string, night: string}, drizzle_rain: {day: string, night: string}, heavy_intensity_drizzle_rain: {day: string, night: string}, shower_rain_and_drizzle: {day: string, night: string}, heavy_shower_rain_and_drizzle: {day: string, night: string}, shower_drizzle: {day: string, night: string}, light_rain: {day: string, night: string}, moderate_rain: {day: string, night: string}, heavy_intensity_rain: {day: string, night: string}, very_heavy_rain: {day: string, night: string}, extreme_rain: {day: string, night: string}, freezing_rain: {day: string, night: string}, light_intensity_shower_rain: {day: string, night: string}, shower_rain: {day: string, night: string}, heavy_intensity_shower_rain: {day: string, night: string}, ragged_shower_rain: {day: string, night: string}, light_snow: {day: string, night: string}, snow: {day: string, night: string}, heavy_snow: {day: string, night: string}, sleet: {day: string, night: string}, light_shower_sleet: {day: string, night: string}, shower_sleet: {day: string, night: string}, light_rain_and_snow: {day: string, night: string}, rain_and_snow: {day: string, night: string}, light_shower_snow: {day: string, night: string}, shower_snow: {day: string, night: string}, heavy_shower_snow: {day: string, night: string}, mist: {day: string, night: string}, smoke: {day: string, night: string}, haze: {day: string, night: string}, sand_dust_whirls: {day: string, night: string}, fog: {day: string, night: string}, sand: {day: string, night: string}, dust: {day: string, night: string}, volcanic_ash: {day: string, night: string}, squalls: {day: string, night: string}, tornado: {day: string, night: string}, clear_sky: {day: string, night: string}, few_clouds: {day: string, night: string}, scattered_clouds: {day: string, night: string}, broken_clouds: {day: string, night: string}, overcast_clouds: {day: string, night: string}}>}
 */
export const basmiliusTruthTable = Object.freeze({
	options: {
		alias: 'basmilius',
		type: ['static', 'animated'],
		path: '/media/icons/weather/basmilius/'
	},

	// Thunderstorm
	thunderstorm_with_light_rain: {
		day: "thunderstorms-day-rain.svg",
		night: "thunderstorms-night-rain.svg"
	},
	thunderstorm_with_rain: {
		day: "thunderstorms-day-rain.svg",
		night: "thunderstorms-night-rain.svg"
	},
	thunderstorm_with_heavy_rain: {
		day: "thunderstorms-day-extreme-rain.svg",
		night: "thunderstorms-night-extreme-rain.svg"
	},
	light_thunderstorm: {
		day: "thunderstorms-day.svg",
		night: "thunderstorms-night.svg"
	},
	thunderstorm: {
		day: "thunderstorms-day.svg",
		night: "thunderstorms-night.svg"
	},
	heavy_thunderstorm: {
		day: "thunderstorms-day-extreme.svg",
		night: "thunderstorms-night-extreme.svg"
	},
	ragged_thunderstorm: {
		day: "thunderstorms-day.svg",
		night: "thunderstorms-night.svg"
	},
	thunderstorm_with_light_drizzle: {
		day: "thunderstorms-day-rain.svg",
		night: "thunderstorms-night-rain.svg"
	},
	thunderstorm_with_drizzle: {
		day: "thunderstorms-day-rain.svg",
		night: "thunderstorms-night-rain.svg"
	},
	thunderstorm_with_heavy_drizzle: {
		day: "thunderstorms-day-extreme-rain.svg",
		night: "thunderstorms-night-extreme-rain.svg"
	},

	// Drizzle
	light_intensity_drizzle: {
		day: "partly-cloudy-day-drizzle.svg",
		night: "partly-cloudy-night-drizzle.svg"
	},
	drizzle: {day: "drizzle.svg", night: "overcast-night-drizzle.svg"},
	heavy_intensity_drizzle: {
		day: "overcast-day-drizzle.svg",
		night: "overcast-night-drizzle.svg"
	},
	light_intensity_drizzle_rain: {
		day: "partly-cloudy-day-drizzle.svg",
		night: "partly-cloudy-night-drizzle.svg"
	},
	drizzle_rain: {day: "drizzle.svg", night: "overcast-night-drizzle.svg"},
	heavy_intensity_drizzle_rain: {
		day: "overcast-day-drizzle.svg",
		night: "overcast-night-drizzle.svg"
	},
	shower_rain_and_drizzle: {
		day: "overcast-day-rain.svg",
		night: "overcast-night-rain.svg"
	},
	heavy_shower_rain_and_drizzle: {
		day: "extreme-day-rain.svg",
		night: "extreme-night-rain.svg"
	},
	shower_drizzle: {
		day: "overcast-day-drizzle.svg",
		night: "overcast-night-drizzle.svg"
	},

	// Rain
	light_rain: {
		day: "partly-cloudy-day-rain.svg",
		night: "partly-cloudy-night-rain.svg"
	},
	moderate_rain: {day: "rain.svg", night: "overcast-night-rain.svg"},
	heavy_intensity_rain: {
		day: "overcast-day-rain.svg",
		night: "overcast-night-rain.svg"
	},
	very_heavy_rain: {
		day: "extreme-day-rain.svg",
		night: "extreme-night-rain.svg"
	},
	extreme_rain: {day: "extreme-rain.svg", night: "extreme-night-rain.svg"},
	freezing_rain: {
		day: "overcast-day-sleet.svg",
		night: "overcast-night-sleet.svg"
	},
	light_intensity_shower_rain: {
		day: "partly-cloudy-day-rain.svg",
		night: "partly-cloudy-night-rain.svg"
	},
	shower_rain: {day: "overcast-rain.svg", night: "overcast-night-rain.svg"},
	heavy_intensity_shower_rain: {
		day: "extreme-day-rain.svg",
		night: "extreme-night-rain.svg"
	},
	ragged_shower_rain: {day: "rain.svg", night: "overcast-night-rain.svg"},

	// Snow
	light_snow: {
		day: "partly-cloudy-day-snow.svg",
		night: "partly-cloudy-night-snow.svg"
	},
	snow: {day: "snow.svg", night: "overcast-night-snow.svg"},
	heavy_snow: {day: "extreme-day-snow.svg", night: "extreme-night-snow.svg"},
	sleet: {day: "sleet.svg", night: "overcast-night-sleet.svg"},
	light_shower_sleet: {
		day: "partly-cloudy-day-sleet.svg",
		night: "partly-cloudy-night-sleet.svg"
	},
	shower_sleet: {day: "overcast-sleet.svg", night: "overcast-night-sleet.svg"},
	light_rain_and_snow: {
		day: "overcast-day-sleet.svg",
		night: "overcast-night-sleet.svg"
	},
	rain_and_snow: {day: "overcast-sleet.svg", night: "overcast-night-sleet.svg"},
	light_shower_snow: {
		day: "partly-cloudy-day-snow.svg",
		night: "partly-cloudy-night-snow.svg"
	},
	shower_snow: {day: "overcast-snow.svg", night: "overcast-night-snow.svg"},
	heavy_shower_snow: {
		day: "extreme-day-snow.svg",
		night: "extreme-night-snow.svg"
	},

	// Atmosphere
	mist: {day: "mist.svg", night: "mist.svg"},
	smoke: {day: "extreme-day-smoke.svg", night: "extreme-night-smoke.svg"},
	haze: {day: "haze-day.svg", night: "haze-night.svg"},
	sand_dust_whirls: {day: "dust-wind.svg", night: "dust-wind.svg"},
	fog: {day: "fog-day.svg", night: "fog-night.svg"},
	sand: {day: "dust-day.svg", night: "dust-night.svg"},
	dust: {day: "dust.svg", night: "dust.svg"},
	volcanic_ash: {day: "smoke.svg", night: "smoke.svg"},
	squalls: {day: "wind.svg", night: "wind.svg"},
	tornado: {day: "tornado.svg", night: "tornado.svg"},

	// Clouds
	clear_sky: {day: "clear-day.svg", night: "clear-night.svg"},
	few_clouds: {day: "partly-cloudy-day.svg", night: "partly-cloudy-night.svg"},
	scattered_clouds: {
		day: "partly-cloudy-day.svg",
		night: "partly-cloudy-night.svg"
	},
	broken_clouds: {day: "overcast-day.svg", night: "overcast-night.svg"},
	overcast_clouds: {day: "overcast.svg", night: "overcast-night.svg"},
});

export const others =  Object.freeze({
	sensors: {
		uv: (index) => index >= 1 && index <= 11 ? `uv-index-${index}.svg` : "uv-index.svg",
		wind_beaufort: (bft) => bft >= 0 && bft <= 12 ? `wind-beaufort-${bft}.svg` : "wind.svg",
		humidity: "humidity.svg",
		barometer: "barometer.svg",
		thermometer: "thermometer.svg",
		compass: "compass.svg",
		raindrops: "raindrops.svg",
		pressure_high: "pressure-high.svg",
		pressure_low: "pressure-low.svg"
	},
	astronomy: {
		sunrise: "sunrise.svg",
		sunset: "sunset.svg",
		moon_full: "moon-full.svg",
		moon_new: "moon-new.svg",
		moon_first_quarter: "moon-first-quarter.svg",
		moon_last_quarter: "moon-last-quarter.svg",
		moonrise: "moonrise.svg",
		moonset: "moonset.svg",
		eclipse: "solar-eclipse.svg"
	},
	alerts: {
		warning_yellow: "code-yellow.svg",
		warning_orange: "code-orange.svg",
		warning_red: "code-red.svg",
		warning_green: "code-green.svg",
		gale_warning: "flag-gale-warning.svg",
		hurricane_warning: "flag-hurricane-warning.svg",
		avalanche_danger: "alert-avalanche-danger.svg",
		wind_alert: "wind-alert.svg"
	},
	universal: {
		cloudy: "cloudy.svg",
		mist: "mist.svg",
		dust: "dust.svg",
		rain: "rain.svg",
		snow: "snow.svg",
		sleet: "sleet.svg",
		hail: "hail.svg",
		hurricane: "hurricane.svg",
		tornado: "tornado.svg",
		not_available: "not-available.svg"
	}
});
