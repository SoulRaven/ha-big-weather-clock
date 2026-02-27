/**
 * AmCharts Weather Icon
 * Grouped by the OpenWeatherMap condition codes for dynamic day/night rendering.
 * source: https://www.amcharts.com/free-animated-svg-weather-icons/
 * @type {Readonly<{thunderstorm_with_light_rain: {day: string, night: string}, thunderstorm_with_rain: {day: string, night: string}, thunderstorm_with_heavy_rain: {day: string, night: string}, light_thunderstorm: {day: string, night: string}, thunderstorm: {day: string, night: string}, heavy_thunderstorm: {day: string, night: string}, ragged_thunderstorm: {day: string, night: string}, thunderstorm_with_light_drizzle: {day: string, night: string}, thunderstorm_with_drizzle: {day: string, night: string}, thunderstorm_with_heavy_drizzle: {day: string, night: string}, light_intensity_drizzle: {day: string, night: string}, drizzle: {day: string, night: string}, heavy_intensity_drizzle: {day: string, night: string}, light_intensity_drizzle_rain: {day: string, night: string}, drizzle_rain: {day: string, night: string}, heavy_intensity_drizzle_rain: {day: string, night: string}, shower_rain_and_drizzle: {day: string, night: string}, heavy_shower_rain_and_drizzle: {day: string, night: string}, shower_drizzle: {day: string, night: string}, light_rain: {day: string, night: string}, moderate_rain: {day: string, night: string}, heavy_intensity_rain: {day: string, night: string}, very_heavy_rain: {day: string, night: string}, extreme_rain: {day: string, night: string}, freezing_rain: {day: string, night: string}, light_intensity_shower_rain: {day: string, night: string}, shower_rain: {day: string, night: string}, heavy_intensity_shower_rain: {day: string, night: string}, ragged_shower_rain: {day: string, night: string}, light_snow: {day: string, night: string}, snow: {day: string, night: string}, heavy_snow: {day: string, night: string}, sleet: {day: string, night: string}, light_shower_sleet: {day: string, night: string}, shower_sleet: {day: string, night: string}, light_rain_and_snow: {day: string, night: string}, rain_and_snow: {day: string, night: string}, light_shower_snow: {day: string, night: string}, shower_snow: {day: string, night: string}, heavy_shower_snow: {day: string, night: string}, mist: {day: string, night: string}, smoke: {day: string, night: string}, haze: {day: string, night: string}, sand_dust_whirls: {day: string, night: string}, fog: {day: string, night: string}, sand: {day: string, night: string}, dust: {day: string, night: string}, volcanic_ash: {day: string, night: string}, squalls: {day: string, night: string}, tornado: {day: string, night: string}, clear_sky: {day: string, night: string}, few_clouds: {day: string, night: string}, scattered_clouds: {day: string, night: string}, broken_clouds: {day: string, night: string}, overcast_clouds: {day: string, night: string}}>}
 */
export const amchartsTruthTable = Object.freeze({
	options: {
		alias: 'amcharts',
		type: ['static', 'animated'],
		path: '/media/icons/weather/amcharts/'
	},

	// Thunderstorm (Using thunder.svg and rainy variants)
	thunderstorm_with_light_rain: {day: "thunder.svg", night: "thunder.svg"},
	thunderstorm_with_rain: {day: "thunder.svg", night: "thunder.svg"},
	thunderstorm_with_heavy_rain: {day: "thunder.svg", night: "thunder.svg"},
	light_thunderstorm: {day: "thunder.svg", night: "thunder.svg"},
	thunderstorm: {day: "thunder.svg", night: "thunder.svg"},
	heavy_thunderstorm: {day: "thunder.svg", night: "thunder.svg"},
	ragged_thunderstorm: {day: "thunder.svg", night: "thunder.svg"},
	thunderstorm_with_light_drizzle: {day: "thunder.svg", night: "thunder.svg"},
	thunderstorm_with_drizzle: {day: "thunder.svg", night: "thunder.svg"},
	thunderstorm_with_heavy_drizzle: {day: "thunder.svg", night: "thunder.svg"},

	// Drizzle (Using light rainy variants)
	light_intensity_drizzle: {day: "rainy-1.svg", night: "rainy-1.svg"},
	drizzle: {day: "rainy-2.svg", night: "rainy-2.svg"},
	heavy_intensity_drizzle: {day: "rainy-3.svg", night: "rainy-3.svg"},
	light_intensity_drizzle_rain: {day: "rainy-1.svg", night: "rainy-1.svg"},
	drizzle_rain: {day: "rainy-2.svg", night: "rainy-2.svg"},
	heavy_intensity_drizzle_rain: {day: "rainy-3.svg", night: "rainy-3.svg"},
	shower_rain_and_drizzle: {day: "rainy-3.svg", night: "rainy-3.svg"},
	heavy_shower_rain_and_drizzle: {day: "rainy-4.svg", night: "rainy-4.svg"},
	shower_drizzle: {day: "rainy-2.svg", night: "rainy-2.svg"},

	// Rain (Scaling intensity from 4 to 7)
	light_rain: {day: "rainy-4.svg", night: "rainy-4.svg"},
	moderate_rain: {day: "rainy-5.svg", night: "rainy-5.svg"},
	heavy_intensity_rain: {day: "rainy-6.svg", night: "rainy-6.svg"},
	very_heavy_rain: {day: "rainy-7.svg", night: "rainy-7.svg"},
	extreme_rain: {day: "rainy-7.svg", night: "rainy-7.svg"},
	freezing_rain: {day: "rainy-7.svg", night: "rainy-7.svg"},
	light_intensity_shower_rain: {day: "rainy-4.svg", night: "rainy-4.svg"},
	shower_rain: {day: "rainy-5.svg", night: "rainy-5.svg"},
	heavy_intensity_shower_rain: {day: "rainy-6.svg", night: "rainy-6.svg"},
	ragged_shower_rain: {day: "rainy-5.svg", night: "rainy-5.svg"},

	// Snow (Scaling intensity from 1 to 6)
	light_snow: {day: "snowy-1.svg", night: "snowy-1.svg"},
	snow: {day: "snowy-3.svg", night: "snowy-3.svg"},
	heavy_snow: {day: "snowy-6.svg", night: "snowy-6.svg"},
	sleet: {day: "snowy-4.svg", night: "snowy-4.svg"},
	light_shower_sleet: {day: "snowy-2.svg", night: "snowy-2.svg"},
	shower_sleet: {day: "snowy-4.svg", night: "snowy-4.svg"},
	light_rain_and_snow: {day: "snowy-2.svg", night: "snowy-2.svg"},
	rain_and_snow: {day: "snowy-3.svg", night: "snowy-3.svg"},
	light_shower_snow: {day: "snowy-1.svg", night: "snowy-1.svg"},
	shower_snow: {day: "snowy-4.svg", night: "snowy-4.svg"},
	heavy_shower_snow: {day: "snowy-6.svg", night: "snowy-6.svg"},

	// Atmosphere (Fallback to generic weather/cloudy for missing specific types)
	mist: {day: "cloudy.svg", night: "cloudy.svg"},
	smoke: {day: "cloudy.svg", night: "cloudy.svg"},
	haze: {day: "cloudy-day-1.svg", night: "cloudy-night-1.svg"},
	sand_dust_whirls: {day: "weather.svg", night: "weather.svg"},
	fog: {day: "cloudy.svg", night: "cloudy.svg"},
	sand: {day: "weather.svg", night: "weather.svg"},
	dust: {day: "weather.svg", night: "weather.svg"},
	volcanic_ash: {day: "weather.svg", night: "weather.svg"},
	squalls: {day: "weather.svg", night: "weather.svg"},
	tornado: {day: "weather.svg", night: "weather.svg"},

	// Clouds (Using cloudy-day/night variants)
	clear_sky: {day: "day.svg", night: "night.svg"},
	few_clouds: {day: "cloudy-day-1.svg", night: "cloudy-night-1.svg"},
	scattered_clouds: {day: "cloudy-day-2.svg", night: "cloudy-night-2.svg"},
	broken_clouds: {day: "cloudy-day-3.svg", night: "cloudy-night-3.svg"},
	overcast_clouds: {day: "cloudy.svg", night: "cloudy.svg"}
});

/**
 * 2026 Icon Picker Logic for AmCharts
 * @param {string} condition - Internal key (e.g., 'cloudy_1')
 * @param {boolean} isDay - Boolean from sun.sun state
 */
export function getAmChartsIcon(condition, isDay) {
	const mode = isDay ? 'day' : 'night';

	// 1. Check if the condition exists in the current lighting mode
	if (AMCHARTS_ICONS[mode][condition]) {
		return AMCHARTS_ICONS[mode][condition];
	}

	// 2. Fallback to universal (rain, snow, thunder)
	return AMCHARTS_ICONS.universal[condition] || AMCHARTS_ICONS.universal.weather;
}
