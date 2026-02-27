/**
 * OpenWeatherMap Weather Icons
 * Grouped by the OpenWeatherMap condition codes for dynamic day/night rendering.
 * @type {Readonly<{thunderstorm_with_light_rain: {day: string, night: string}, thunderstorm_with_rain: {day: string, night: string}, thunderstorm_with_heavy_rain: {day: string, night: string}, light_thunderstorm: {day: string, night: string}, thunderstorm: {day: string, night: string}, heavy_thunderstorm: {day: string, night: string}, ragged_thunderstorm: {day: string, night: string}, thunderstorm_with_light_drizzle: {day: string, night: string}, thunderstorm_with_drizzle: {day: string, night: string}, thunderstorm_with_heavy_drizzle: {day: string, night: string}, light_intensity_drizzle: {day: string, night: string}, drizzle: {day: string, night: string}, heavy_intensity_drizzle: {day: string, night: string}, light_intensity_drizzle_rain: {day: string, night: string}, drizzle_rain: {day: string, night: string}, heavy_intensity_drizzle_rain: {day: string, night: string}, shower_rain_and_drizzle: {day: string, night: string}, heavy_shower_rain_and_drizzle: {day: string, night: string}, shower_drizzle: {day: string, night: string}, light_rain: {day: string, night: string}, moderate_rain: {day: string, night: string}, heavy_intensity_rain: {day: string, night: string}, very_heavy_rain: {day: string, night: string}, extreme_rain: {day: string, night: string}, freezing_rain: {day: string, night: string}, light_intensity_shower_rain: {day: string, night: string}, shower_rain: {day: string, night: string}, heavy_intensity_shower_rain: {day: string, night: string}, ragged_shower_rain: {day: string, night: string}, light_snow: {day: string, night: string}, snow: {day: string, night: string}, heavy_snow: {day: string, night: string}, sleet: {day: string, night: string}, light_shower_sleet: {day: string, night: string}, shower_sleet: {day: string, night: string}, light_rain_and_snow: {day: string, night: string}, rain_and_snow: {day: string, night: string}, light_shower_snow: {day: string, night: string}, shower_snow: {day: string, night: string}, heavy_shower_snow: {day: string, night: string}, mist: {day: string, night: string}, smoke: {day: string, night: string}, haze: {day: string, night: string}, sand_dust_whirls: {day: string, night: string}, fog: {day: string, night: string}, sand: {day: string, night: string}, dust: {day: string, night: string}, volcanic_ash: {day: string, night: string}, squalls: {day: string, night: string}, tornado: {day: string, night: string}, clear_sky: {day: string, night: string}, few_clouds: {day: string, night: string}, scattered_clouds: {day: string, night: string}, broken_clouds: {day: string, night: string}, overcast_clouds: {day: string, night: string}}>}
 * source: https://github.com/rodrigokamada/openweathermap
 */
export const owmTruthTable = Object.freeze({
	options: {
		alias: 'openweathermap',
		type: ['static'],
		path: '/media/icons/weather/owm/'
	},

	// Thunderstorm (Group 11)
	thunderstorm_with_light_rain: {day: "11d_t@4x.png", night: "11n_t@4x.png"},
	thunderstorm_with_rain: {day: "11d_t@4x.png", night: "11n_t@4x.png"},
	thunderstorm_with_heavy_rain: {day: "11d_t@4x.png", night: "11n_t@4x.png"},
	light_thunderstorm: {day: "11d_t@4x.png", night: "11n_t@4x.png"},
	thunderstorm: {day: "11d_t@4x.png", night: "11n_t@4x.png"},
	heavy_thunderstorm: {day: "11d_t@4x.png", night: "11n_t@4x.png"},
	ragged_thunderstorm: {day: "11d_t@4x.png", night: "11n_t@4x.png"},
	thunderstorm_with_light_drizzle: {day: "11d_t@4x.png", night: "11n_t@4x.png"},
	thunderstorm_with_drizzle: {day: "11d_t@4x.png", night: "11n_t@4x.png"},
	thunderstorm_with_heavy_drizzle: {day: "11d_t@4x.png", night: "11n_t@4x.png"},

	// Drizzle (Group 09)
	light_intensity_drizzle: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	drizzle: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	heavy_intensity_drizzle: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	light_intensity_drizzle_rain: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	drizzle_rain: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	heavy_intensity_drizzle_rain: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	shower_rain_and_drizzle: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	heavy_shower_rain_and_drizzle: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	shower_drizzle: {day: "09d_t@4x.png", night: "09n_t@4x.png"},

	// Rain (Group 10)
	light_rain: {day: "10d_t@4x.png", night: "10n_t@4x.png"},
	moderate_rain: {day: "10d_t@4x.png", night: "10n_t@4x.png"},
	heavy_intensity_rain: {day: "10d_t@4x.png", night: "10n_t@4x.png"},
	very_heavy_rain: {day: "10d_t@4x.png", night: "10n_t@4x.png"},
	extreme_rain: {day: "10d_t@4x.png", night: "10n_t@4x.png"},
	freezing_rain: {day: "13d_t@4x.png", night: "13n_t@4x.png"}, // Freezing rain maps to snow icon in OWM
	light_intensity_shower_rain: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	shower_rain: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	heavy_intensity_shower_rain: {day: "09d_t@4x.png", night: "09n_t@4x.png"},
	ragged_shower_rain: {day: "09d_t@4x.png", night: "09n_t@4x.png"},

	// Snow (Group 13)
	light_snow: {day: "13d_t@4x.png", night: "13n_t@4x.png"},
	snow: {day: "13d_t@4x.png", night: "13n_t@4x.png"},
	heavy_snow: {day: "13d_t@4x.png", night: "13n_t@4x.png"},
	sleet: {day: "13d_t@4x.png", night: "13n_t@4x.png"},
	light_shower_sleet: {day: "13d_t@4x.png", night: "13n_t@4x.png"},
	shower_sleet: {day: "13d_t@4x.png", night: "13n_t@4x.png"},
	light_rain_and_snow: {day: "13d_t@4x.png", night: "13n_t@4x.png"},
	rain_and_snow: {day: "13d_t@4x.png", night: "13n_t@4x.png"},
	light_shower_snow: {day: "13d_t@4x.png", night: "13n_t@4x.png"},
	shower_snow: {day: "13d_t@4x.png", night: "13n_t@4x.png"},
	heavy_shower_snow: {day: "13d_t@4x.png", night: "13n_t@4x.png"},

	// Atmosphere (Group 50)
	mist: {day: "50d_t@4x.png", night: "50n_t@4x.png"},
	smoke: {day: "50d_t@4x.png", night: "50n_t@4x.png"},
	haze: {day: "50d_t@4x.png", night: "50n_t@4x.png"},
	sand_dust_whirls: {day: "50d_t@4x.png", night: "50n_t@4x.png"},
	fog: {day: "50d_t@4x.png", night: "50n_t@4x.png"},
	sand: {day: "50d_t@4x.png", night: "50n_t@4x.png"},
	dust: {day: "50d_t@4x.png", night: "50n_t@4x.png"},
	volcanic_ash: {day: "50d_t@4x.png", night: "50n_t@4x.png"},
	squalls: {day: "50d_t@4x.png", night: "50n_t@4x.png"},
	tornado: {day: "50d_t@4x.png", night: "50n_t@4x.png"},

	// Clouds (Groups 01, 02, 03, 04)
	clear_sky: {day: "01d_t@4x.png", night: "01n_t@4x.png"},
	few_clouds: {day: "02d_t@4x.png", night: "02n_t@4x.png"},
	scattered_clouds: {day: "03d_t@4x.png", night: "03n_t@4x.png"},
	broken_clouds: {day: "04d_t@4x.png", night: "04n_t@4x.png"},
	overcast_clouds: {day: "04d_t@4x.png", night: "04n_t@4x.png"}
});
