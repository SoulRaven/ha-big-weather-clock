/**
 * this is considered as a truth table for the rest of the providers and weather conditions.
 * the mapping is done from https://openweathermap.org/weather-conditions?collection=other#Weather-Condition-Codes-2
 * The images, video, and icons will be mapped using this table as a reference.
 * @type {{icon_url_template: string, weather_conditions: [{condition_id: number, main: string, description: string, icon_code: string, icon_day: string, icon_night: string, icon_group: string},{condition_id: number, main: string, description: string, icon_code: string, icon_day: string, icon_night: string, icon_group: string},{condition_id: number, main: string, description: string, icon_code: string, icon_day: string, icon_night: string, icon_group: string},{condition_id: number, main: string, description: string, icon_code: string, icon_day: string, icon_night: string, icon_group: string},{condition_id: number, main: string, description: string, icon_code: string, icon_day: string, icon_night: string, icon_group: string},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}}
 */
export const owmMap = Object.freeze({
	"icon_url_template": "https://openweathermap.org/payload/api/media/file/{icon_code}@2x.png",
	"weather_conditions": [
		{
			"condition_id": 200,
			"main": "Thunderstorm",
			"description": "thunderstorm with light rain",
			"icon_code": "11d",
			"icon_day": "11d.png",
			"icon_night": "11n.png",
			"icon_group": "thunderstorm"
		},
		{
			"condition_id": 201,
			"main": "Thunderstorm",
			"description": "thunderstorm with rain",
			"icon_code": "11d",
			"icon_day": "11d.png",
			"icon_night": "11n.png",
			"icon_group": "thunderstorm"
		},
		{
			"condition_id": 202,
			"main": "Thunderstorm",
			"description": "thunderstorm with heavy rain",
			"icon_code": "11d",
			"icon_day": "11d.png",
			"icon_night": "11n.png",
			"icon_group": "thunderstorm"
		},
		{
			"condition_id": 210,
			"main": "Thunderstorm",
			"description": "light thunderstorm",
			"icon_code": "11d",
			"icon_day": "11d.png",
			"icon_night": "11n.png",
			"icon_group": "thunderstorm"
		},
		{
			"condition_id": 211,
			"main": "Thunderstorm",
			"description": "thunderstorm",
			"icon_code": "11d",
			"icon_day": "11d.png",
			"icon_night": "11n.png",
			"icon_group": "thunderstorm"
		},
		{
			"condition_id": 212,
			"main": "Thunderstorm",
			"description": "heavy thunderstorm",
			"icon_code": "11d",
			"icon_day": "11d.png",
			"icon_night": "11n.png",
			"icon_group": "thunderstorm"
		},
		{
			"condition_id": 221,
			"main": "Thunderstorm",
			"description": "ragged thunderstorm",
			"icon_code": "11d",
			"icon_day": "11d.png",
			"icon_night": "11n.png",
			"icon_group": "thunderstorm"
		},
		{
			"condition_id": 230,
			"main": "Thunderstorm",
			"description": "thunderstorm with light drizzle",
			"icon_code": "11d",
			"icon_day": "11d.png",
			"icon_night": "11n.png",
			"icon_group": "thunderstorm"
		},
		{
			"condition_id": 231,
			"main": "Thunderstorm",
			"description": "thunderstorm with drizzle",
			"icon_code": "11d",
			"icon_day": "11d.png",
			"icon_night": "11n.png",
			"icon_group": "thunderstorm"
		},
		{
			"condition_id": 232,
			"main": "Thunderstorm",
			"description": "thunderstorm with heavy drizzle",
			"icon_code": "11d",
			"icon_day": "11d.png",
			"icon_night": "11n.png",
			"icon_group": "thunderstorm"
		},
		{
			"condition_id": 300,
			"main": "Drizzle",
			"description": "light intensity drizzle",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 301,
			"main": "Drizzle",
			"description": "drizzle",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 302,
			"main": "Drizzle",
			"description": "heavy intensity drizzle",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 310,
			"main": "Drizzle",
			"description": "light intensity drizzle rain",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 311,
			"main": "Drizzle",
			"description": "drizzle rain",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 312,
			"main": "Drizzle",
			"description": "heavy intensity drizzle rain",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 313,
			"main": "Drizzle",
			"description": "shower rain and drizzle",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 314,
			"main": "Drizzle",
			"description": "heavy shower rain and drizzle",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 321,
			"main": "Drizzle",
			"description": "shower drizzle",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 500,
			"main": "Rain",
			"description": "light rain",
			"icon_code": "10d",
			"icon_day": "10d.png",
			"icon_night": "10n.png",
			"icon_group": "rain"
		},
		{
			"condition_id": 501,
			"main": "Rain",
			"description": "moderate rain",
			"icon_code": "10d",
			"icon_day": "10d.png",
			"icon_night": "10n.png",
			"icon_group": "rain"
		},
		{
			"condition_id": 502,
			"main": "Rain",
			"description": "heavy intensity rain",
			"icon_code": "10d",
			"icon_day": "10d.png",
			"icon_night": "10n.png",
			"icon_group": "rain"
		},
		{
			"condition_id": 503,
			"main": "Rain",
			"description": "very heavy rain",
			"icon_code": "10d",
			"icon_day": "10d.png",
			"icon_night": "10n.png",
			"icon_group": "rain"
		},
		{
			"condition_id": 504,
			"main": "Rain",
			"description": "extreme rain",
			"icon_code": "10d",
			"icon_day": "10d.png",
			"icon_night": "10n.png",
			"icon_group": "rain"
		},
		{
			"condition_id": 511,
			"main": "Rain",
			"description": "freezing rain",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 520,
			"main": "Rain",
			"description": "light intensity shower rain",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 521,
			"main": "Rain",
			"description": "shower rain",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 522,
			"main": "Rain",
			"description": "heavy intensity shower rain",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 531,
			"main": "Rain",
			"description": "ragged shower rain",
			"icon_code": "09d",
			"icon_day": "09d.png",
			"icon_night": "09n.png",
			"icon_group": "shower rain"
		},
		{
			"condition_id": 600,
			"main": "Snow",
			"description": "light snow",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 601,
			"main": "Snow",
			"description": "snow",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 602,
			"main": "Snow",
			"description": "heavy snow",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 611,
			"main": "Snow",
			"description": "sleet",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 612,
			"main": "Snow",
			"description": "light shower sleet",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 613,
			"main": "Snow",
			"description": "shower sleet",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 615,
			"main": "Snow",
			"description": "light rain and snow",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 616,
			"main": "Snow",
			"description": "rain and snow",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 620,
			"main": "Snow",
			"description": "light shower snow",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 621,
			"main": "Snow",
			"description": "shower snow",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 622,
			"main": "Snow",
			"description": "heavy shower snow",
			"icon_code": "13d",
			"icon_day": "13d.png",
			"icon_night": "13n.png",
			"icon_group": "snow"
		},
		{
			"condition_id": 701,
			"main": "Mist",
			"description": "mist",
			"icon_code": "50d",
			"icon_day": "50d.png",
			"icon_night": "50n.png",
			"icon_group": "mist"
		},
		{
			"condition_id": 711,
			"main": "Smoke",
			"description": "smoke",
			"icon_code": "50d",
			"icon_day": "50d.png",
			"icon_night": "50n.png",
			"icon_group": "mist"
		},
		{
			"condition_id": 721,
			"main": "Haze",
			"description": "haze",
			"icon_code": "50d",
			"icon_day": "50d.png",
			"icon_night": "50n.png",
			"icon_group": "mist"
		},
		{
			"condition_id": 731,
			"main": "Dust",
			"description": "sand/dust whirls",
			"icon_code": "50d",
			"icon_day": "50d.png",
			"icon_night": "50n.png",
			"icon_group": "mist"
		},
		{
			"condition_id": 741,
			"main": "Fog",
			"description": "fog",
			"icon_code": "50d",
			"icon_day": "50d.png",
			"icon_night": "50n.png",
			"icon_group": "mist"
		},
		{
			"condition_id": 751,
			"main": "Sand",
			"description": "sand",
			"icon_code": "50d",
			"icon_day": "50d.png",
			"icon_night": "50n.png",
			"icon_group": "mist"
		},
		{
			"condition_id": 761,
			"main": "Dust",
			"description": "dust",
			"icon_code": "50d",
			"icon_day": "50d.png",
			"icon_night": "50n.png",
			"icon_group": "mist"
		},
		{
			"condition_id": 762,
			"main": "Ash",
			"description": "volcanic ash",
			"icon_code": "50d",
			"icon_day": "50d.png",
			"icon_night": "50n.png",
			"icon_group": "mist"
		},
		{
			"condition_id": 771,
			"main": "Squall",
			"description": "squalls",
			"icon_code": "50d",
			"icon_day": "50d.png",
			"icon_night": "50n.png",
			"icon_group": "mist"
		},
		{
			"condition_id": 781,
			"main": "Tornado",
			"description": "tornado",
			"icon_code": "50d",
			"icon_day": "50d.png",
			"icon_night": "50n.png",
			"icon_group": "mist"
		},
		{
			"condition_id": 800,
			"main": "Clear",
			"description": "clear sky",
			"icon_code_day": "01d",
			"icon_code_night": "01n",
			"icon_day": "01d.png",
			"icon_night": "01n.png",
			"icon_group": "clear sky"
		},
		{
			"condition_id": 801,
			"main": "Clouds",
			"description": "few clouds: 11-25%",
			"icon_code_day": "02d",
			"icon_code_night": "02n",
			"icon_day": "02d.png",
			"icon_night": "02n.png",
			"icon_group": "few clouds"
		},
		{
			"condition_id": 802,
			"main": "Clouds",
			"description": "scattered clouds: 25-50%",
			"icon_code_day": "03d",
			"icon_code_night": "03n",
			"icon_day": "03d.png",
			"icon_night": "03n.png",
			"icon_group": "scattered clouds"
		},
		{
			"condition_id": 803,
			"main": "Clouds",
			"description": "broken clouds: 51-84%",
			"icon_code_day": "04d",
			"icon_code_night": "04n",
			"icon_day": "04d.png",
			"icon_night": "04n.png",
			"icon_group": "broken clouds"
		},
		{
			"condition_id": 804,
			"main": "Clouds",
			"description": "overcast clouds: 85-100%",
			"icon_code_day": "04d",
			"icon_code_night": "04n",
			"icon_day": "04d.png",
			"icon_night": "04n.png",
			"icon_group": "broken clouds"
		}
	]
});

// consider this a truth table for all the weather conditions description
// used as a template for the media content to map the conditions on media elements
/**
 * consider this a truth table for all the weather conditions description
 * used as a template for the media content to map the conditions on media elements
 * @type {Readonly<{thunderstorm_with_light_rain: {}, thunderstorm_with_rain: {}, thunderstorm_with_heavy_rain: {}, light_thunderstorm: {}, thunderstorm: {}, heavy_thunderstorm: {}, ragged_thunderstorm: {}, thunderstorm_with_light_drizzle: {}, thunderstorm_with_drizzle: {}, thunderstorm_with_heavy_drizzle: {}, light_intensity_drizzle: {}, drizzle: {}, heavy_intensity_drizzle: {}, light_intensity_drizzle_rain: {}, drizzle_rain: {}, heavy_intensity_drizzle_rain: {}, shower_rain_and_drizzle: {}, heavy_shower_rain_and_drizzle: {}, shower_drizzle: {}, light_rain: {}, moderate_rain: {}, heavy_intensity_rain: {}, very_heavy_rain: {}, extreme_rain: {}, freezing_rain: {}, light_intensity_shower_rain: {}, shower_rain: {}, heavy_intensity_shower_rain: {}, ragged_shower_rain: {}, light_snow: {}, snow: {}, heavy_snow: {}, sleet: {}, light_shower_sleet: {}, shower_sleet: {}, light_rain_and_snow: {}, rain_and_snow: {}, light_shower_snow: {}, shower_snow: {}, heavy_shower_snow: {}, mist: {}, smoke: {}, haze: {}, sand_dust_whirls: {}, fog: {}, sand: {}, dust: {}, volcanic_ash: {}, squalls: {}, tornado: {}, clear_sky: {}, few_clouds: {}, scattered_clouds: {}, broken_clouds: {}, overcast_clouds: {}}>}
 */
export const weatherTruthTable = Object.freeze({
	// Thunderstorm
	thunderstorm_with_light_rain: {},
	thunderstorm_with_rain: {},
	thunderstorm_with_heavy_rain: {},
	light_thunderstorm: {},
	thunderstorm: {},
	heavy_thunderstorm: {},
	ragged_thunderstorm: {},
	thunderstorm_with_light_drizzle: {},
	thunderstorm_with_drizzle: {},
	thunderstorm_with_heavy_drizzle: {},

	// Drizzle
	light_intensity_drizzle: {},
	drizzle: {},
	heavy_intensity_drizzle: {},
	light_intensity_drizzle_rain: {},
	drizzle_rain: {},
	heavy_intensity_drizzle_rain: {},
	shower_rain_and_drizzle: {},
	heavy_shower_rain_and_drizzle: {},
	shower_drizzle: {},

	// Rain
	light_rain: {},
	moderate_rain: {},
	heavy_intensity_rain: {},
	very_heavy_rain: {},
	extreme_rain: {},
	freezing_rain: {},
	light_intensity_shower_rain: {},
	shower_rain: {},
	heavy_intensity_shower_rain: {},
	ragged_shower_rain: {},

	// Snow
	light_snow: {},
	snow: {},
	heavy_snow: {},
	sleet: {},
	light_shower_sleet: {},
	shower_sleet: {},
	light_rain_and_snow: {},
	rain_and_snow: {},
	light_shower_snow: {},
	shower_snow: {},
	heavy_shower_snow: {},

	// Atmosphere
	mist: {},
	smoke: {},
	haze: {},
	sand_dust_whirls: {},
	fog: {},
	sand: {},
	dust: {},
	volcanic_ash: {},
	squalls: {},
	tornado: {},

	// Clouds
	clear_sky: {},
	few_clouds: {},
	scattered_clouds: {},
	broken_clouds: {},
	overcast_clouds: {}
});
