import { logger } from '../../utils/logger.js';

import { WeatherIconManager } from '../WeatherIconsManager.js';
import { Meteorology } from "../../utils/meteorology.js";

export class OpenWeatherMapProvider {
	constructor() {
		this.id = 'openweathermap';
		this.name = 'OpenWeatherMap';
		this.description = 'Weather forecasts from OpenWeatherMap API';

		this.defaultUpdateInterval = 15 * 60;

		// OWM reports the units in "standard", "metric", "imperial
		// user will have access only to metric and imperial conversion
		this.units = 'standard';

	}

	async fetchWeather(worker, config) {

		// convert to seconds
		this.defaultUpdateInterval = config.weatherUpdateInterval * 60 || this.defaultUpdateInterval;

		let counter = 0;

		// initial fetch of weather data
		// next fetch will be in the regular time slot
		this.fetchWeatherAsync(config).then(result => {
			worker.port.postMessage({
				type: 'WEATHER_UPDATE',
				weather: result
			});
		}).catch(error => {
			logger.error('Fail to initial fetch the data for OpenWeatherMap:', error);
		});

		worker.port.addEventListener('message', (event) => {
			if (event.data.type === 'TICK') {
				counter++;
				if (counter >= this.defaultUpdateInterval) {

					this.fetchWeatherAsync(config).then(result => {
						worker.port.postMessage({
							type: 'WEATHER_UPDATE',
							weather: result
						});
					}).catch(error => {
						logger.error('Error updating weather data from OpenWeatherMap:', error);
					});
					logger.debug(`[OpenWeatherMap] fetch data in default interval of ${this.defaultUpdateInterval} minutes`);
					counter = 0;
				}
			}
		});
	}

	async fetchWeatherAsync(config) {
		if (!config.owm_apiKey) {
			throw new Error('OpenWeatherMap API key is required');
		}

		const api_key = config.owm_apiKey,
			latitude = config.latitude || 44.323216,
			longitude = config.longitude || 23.7654655,
			language = config.language || 'en',
			locale = config.locale,
			timezone = config.timezone,
			iconSet = config.iconSet || 'openweathermap',
			localPath = config.iconsLocalPath,

			weather_unit_distance = config.units === 'metric' ? 'km' : 'mi',
			weather_unit_speed = config.units === 'metric' ? 'kmh' : 'mph',
			weather_unit_pressure = config.units === 'metric' ? 'hpa' : 'inhg',
			weather_unit_temperature = config.units === 'metric' ? 'C' : 'F',
			weather_unit_precipitation = config.units === 'metric' ? 'mm' : 'in',

			dt_options = {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				weekday: 'short',
				hour12: false,
				timeZone: timezone
			},
			dt_formatter = new Intl.DateTimeFormat(locale, dt_options),

			forcastLength = config.weatherForecastDays > 8 ? 8 : config.weatherForecastDays;

		try {
			const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${this.units}&lang=${language}&appid=${api_key}`;
			logger.debug(`[OpenWeatherMap] ${  url}`);

			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`OpenWeatherMap API error: ${response.statusText}`);
			}

			const data = await response.json();

			if (!data.daily || !data.daily.length) {
				throw new Error('No forecast data available');
			}

			const currentForcast = data.current,
				description = currentForcast.weather[0].description,
				lastUpdate = dt_formatter.formatToParts(new Date(currentForcast.dt * 1000)),
				sunrise = dt_formatter.formatToParts(new Date(currentForcast.sunrise * 1000)),
				sunset = dt_formatter.formatToParts(new Date(currentForcast.sunset * 1000)),

				current = {
					dt: currentForcast.dt,
					lastUpdate: lastUpdate.filter(part => ['hour', 'minute'].includes(part.type)).map(part => part.value).join(':'),
					sunrise: sunrise.filter(part => ['hour', 'minute'].includes(part.type)).map(part => part.value).join(':'),
					sunset: sunset.filter(part => ['hour', 'minute'].includes(part.type)).map(part => part.value).join(':'),

					weather: currentForcast.weather,
					datetime: currentForcast.dt,
					temp: Meteorology.convertTemp(currentForcast.temp, 'K', weather_unit_temperature),
					feels_like: Meteorology.convertTemp(currentForcast.feels_like, 'K', weather_unit_temperature),
					pressure: Meteorology.convertPressure(currentForcast.pressure, 'hpa', weather_unit_pressure),
					humidity: [currentForcast.humidity, '%'],
					dew_point: Meteorology.convertTemp(currentForcast.dew_point, 'K', weather_unit_temperature),
					uvi: [currentForcast.uvi, 'W/m²'],
					clouds: [currentForcast.clouds, '%'],
					visibility: Meteorology.convertDistance(currentForcast.visibility, 'm', weather_unit_distance),
					windSpeed: Meteorology.convertWind(currentForcast.wind_speed, 'ms', weather_unit_speed),
					windDirection: Meteorology.getWindDirection(currentForcast.wind_deg),

					icon: WeatherIconManager.getIconUrl(description, iconSet, localPath),
				};

			const forecast = data.daily.slice(0, forcastLength),
				dailyForecast = Array.from(forecast).map((items) => {

					const weekday = dt_formatter.formatToParts(new Date(items.dt * 1000)),
						sunrise = dt_formatter.formatToParts(new Date(items.sunrise * 1000)),
						sunset = dt_formatter.formatToParts(new Date(items.sunset * 1000)),
						moonrise = dt_formatter.formatToParts(new Date(items.moonrise * 1000)),
						moonset = dt_formatter.formatToParts(new Date(items.moonset * 1000));

					return {
						dt: items.dt,
						dayName: weekday.find(part => part.type === 'weekday').value,
						sunrise: sunrise.filter(part => ['hour', 'minute'].includes(part.type)).map(part => part.value).join(':'),
						sunset: sunset.filter(part => ['hour', 'minute'].includes(part.type)).map(part => part.value).join(':'),
						moonrise: moonrise.filter(part => ['hour', 'minute'].includes(part.type)).map(part => part.value).join(':'),
						moonset: moonset.filter(part => ['hour', 'minute'].includes(part.type)).map(part => part.value).join(':'),
						moon_phase: items.moon_phase,
						summary: items.summary,
						temp: Object.fromEntries(
							Object.entries(items.temp).map(
								([k,v]) => [k, Meteorology.convertTemp(v, 'K', weather_unit_temperature)])),

						temp_day: Meteorology.convertTemp(items.temp.day, 'K', weather_unit_temperature),
						temp_min: Meteorology.convertTemp(items.temp.min, 'K', weather_unit_temperature),
						temp_max: Meteorology.convertTemp(items.temp.max, 'K', weather_unit_temperature),
						temp_night: Meteorology.convertTemp(items.temp.night, 'K', weather_unit_temperature),
						temp_eve: Meteorology.convertTemp(items.temp.eve, 'K', weather_unit_temperature),
						temp_morn: Meteorology.convertTemp(items.temp.morn, 'K', weather_unit_temperature),

						feels_like_day: Meteorology.convertTemp(items.feels_like.day, 'K', weather_unit_temperature),
						feels_like_night: Meteorology.convertTemp(items.feels_like.night, 'K', weather_unit_temperature),
						feels_like_eve: Meteorology.convertTemp(items.feels_like.eve, 'K', weather_unit_temperature),
						feels_like_morn: Meteorology.convertTemp(items.feels_like.morn, 'K', weather_unit_temperature),

						pressure: Meteorology.convertPressure(items.pressure, 'hpa', weather_unit_pressure),
						humidity: [items.humidity, '%'],
						dew_point: Meteorology.convertTemp(items.dew_point, 'K', weather_unit_temperature),
						wind_speed: Meteorology.convertWind(items.wind_speed, 'ms', weather_unit_speed),
						windDirection: Meteorology.getWindDirection(items.wind_deg),
						wind_gust: Meteorology.convertWind(items.wind_gust, 'ms', weather_unit_speed),
						clouds: [items.clouds, '%'],
						uvi: [items.uvi, 'W/m²'],
						pop: [items?.pop  || 0, '%'],
						rain: Meteorology.convertPrecip(items?.rain, 'mm', weather_unit_precipitation),
						snow: Meteorology.convertPrecip(items?.snow, 'mm', weather_unit_precipitation),

						weather: items.weather,

						icon: WeatherIconManager.getIconUrl(items.weather[0].description, iconSet, localPath),
					};
				});

			const alerts = Array.from(data?.alerts || []).map((items) => {
				const start = dt_formatter.formatToParts(new Date(items.start * 1000)),
					startDate = start.filter(part => ['year', 'month', 'day'].includes(part.type)).map(part => part.value).join('/'),
					startTime = start.filter(part => ['hour', 'minute'].includes(part.type)).map(part => part.value).join(':'),

					end = dt_formatter.formatToParts(new Date(items.end * 1000)),
					endDate = end.filter(part => ['year', 'month', 'day'].includes(part.type)).map(part => part.value).join('/'),
					endTime = end.filter(part => ['hour', 'minute'].includes(part.type)).map(part => part.value).join(':');

				let event = {};

				items.event.split(',').forEach(item => {
					const [key, val] = item.trim().split('=');
					const value = val.trim();
					event[key.trim()] = !isNaN(value) && value !== '' ? Number(value) : value;
				});

				return {
					sender_name: items.sender_name,
					event,
					start: `${startDate} ${startTime}`,
					end: `${endDate} ${endTime}`,
					description: items.description,
					tags: items.tags
				};
			});

			return { current, dailyForecast, alerts };
		} catch (error) {
			logger.error('Error fetching weather data from OpenWeatherMap:', error);
			throw error;
		}
	}

	getDefaultConfig() {
		return {
			apiKey: '',
			latitude: 44.323216,
			longitude: 23.7654655,
			units: 'metric',
			language: 'en'
		};
	}
}

export const openWeatherMapProvider = new OpenWeatherMapProvider();
