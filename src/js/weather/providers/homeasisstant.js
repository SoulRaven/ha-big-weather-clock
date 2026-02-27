export class HomeAssistantProvider {
	constructor() {
		this.id = 'homeassistant';
		this.name = 'Home Assistant';
		this.description = 'Weather data from a Home Assistant entity';
		this.hass = undefined;
	}

	setHass(hass) {
		this.hass = hass;
	}

	async fetchWeatherAsync(config) {
		if (!this.hass) {
			throw new Error('Home Assistant instance not set');
		}

		const entityId = config.entityId;
		if (!entityId) {
			throw new Error('Home Assistant weather entity ID is required');
		}

		const state = this.hass.states[entityId];
		if (!state) {
			throw new Error(`Entity ${entityId} not found`);
		}

		const attributes = state.attributes;
		const condition = state.state;
		const conditionUnified = this.mapWeatherCondition(condition);

		const current = {
			temperature: attributes.temperature,
			condition: this.mapConditionToKey(condition),
			conditionUnified: conditionUnified,
			icon: this.getIconUrl(condition, config.iconSet),
			humidity: attributes.humidity,
			windSpeed: attributes.wind_speed,
			pressure: attributes.pressure,
			feelsLike: attributes.apparent_temperature
		};

		let daily = [];

		try {
			const forecastResponse = await this.hass.callWS({
				type: 'call_service',
				domain: 'weather',
				service: 'get_forecasts',
				service_data: {type: 'daily'},
				target: {entity_id: entityId},
				return_response: true,
			});

			const forecastData = forecastResponse.response[entityId]?.forecast;

			if (forecastData && Array.isArray(forecastData)) {
				daily = forecastData.map((item) => ({
					date: new Date(item.datetime),
					temperatureMin: item.templow !== undefined ? item.templow : item.temperature,
					temperatureMax: item.temperature,
					condition: this.mapConditionToKey(item.condition),
					icon: this.getIconUrl(item.condition, config.iconSet),
					precipitation: item.precipitation,
					humidity: item.humidity,
					windSpeed: item.wind_speed
				}));
			}
		} catch (error) {
			logger.error(`[HA Weather] Error fetching forecast for ${entityId}:`, error);
		}

		return {current, daily, entityId};
	}

	getDefaultConfig() {
		return {entityId: ''};
	}

	mapConditionToKey(condition) {
		const lowerCondition = condition?.toLowerCase();
		switch (lowerCondition) {
			case 'sunny':
			case 'clear-night':
				return 'clear_sky';
			case 'cloudy':
				return 'overcast_clouds';
			case 'partlycloudy':
				return 'scattered_clouds';
			case 'rainy':
				return 'rain';
			case 'pouring':
				return 'heavy_intensity_rain';
			case 'lightning':
			case 'lightning-rainy':
				return 'thunderstorm';
			case 'snowy':
			case 'snowy-rainy':
				return 'snow';
			case 'fog':
				return 'mist';
			default:
				return lowerCondition;
		}
	}

	mapWeatherCondition(condition) {
		const lowerCondition = condition?.toLowerCase();
		switch (lowerCondition) {
			case 'clear-night':
			case 'sunny':
				return Weather.ClearSky;
			case 'cloudy':
			case 'partlycloudy':
				return Weather.Clouds;
			case 'rainy':
			case 'pouring':
			case 'lightning':
			case 'lightning-rainy':
				return Weather.Rain;
			case 'snowy':
			case 'snowy-rainy':
				return Weather.Snow;
			case 'fog':
			case 'hail':
				return Weather.Mist;
			default:
				return Weather.All;
		}
	}

	getIconUrl(condition, iconSet) {
		const lowerCondition = condition?.toLowerCase();
		if (iconSet === 'basmilius') return this.getAnimatedIconUrl(lowerCondition);
		if (iconSet === 'openweathermap') return this.getOpenWeatherMapIconUrl(lowerCondition);

		let symbol = 'clearsky_day';
		switch (lowerCondition) {
			case 'sunny':
				symbol = 'clearsky_day';
				break;
			case 'clear-night':
				symbol = 'clearsky_night';
				break;
			case 'cloudy':
				symbol = 'cloudy';
				break;
			case 'partlycloudy':
				symbol = 'fair_day';
				break;
			case 'rainy':
				symbol = 'rain';
				break;
			case 'pouring':
				symbol = 'heavyrain';
				break;
			case 'lightning':
			case 'lightning-rainy':
				symbol = 'rainshowersandthunder_day';
				break;
			case 'snowy':
				symbol = 'snow';
				break;
			case 'snowy-rainy':
				symbol = 'sleet';
				break;
			case 'fog':
				symbol = 'fog';
				break;
		}
		return `https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${symbol}.svg`;
	}

	getOpenWeatherMapIconUrl(condition) {
		let iconCode = '01d';
		switch (condition) {
			case 'sunny':
				iconCode = '01d';
				break;
			case 'clear-night':
				iconCode = '01n';
				break;
			case 'cloudy':
				iconCode = '03d';
				break;
			case 'partlycloudy':
				iconCode = '02d';
				break;
			case 'rainy':
				iconCode = '10d';
				break;
			case 'pouring':
				iconCode = '09d';
				break;
			case 'lightning':
			case 'lightning-rainy':
				iconCode = '11d';
				break;
			case 'snowy':
			case 'snowy-rainy':
				iconCode = '13d';
				break;
			case 'fog':
				iconCode = '50d';
				break;
		}
		return `https://openweathermap.org/img/wn/{iconCode}@2x.png`;
	}

	getAnimatedIconUrl(condition) {
		let symbol = 'clear-day';
		switch (condition) {
			case 'sunny':
				symbol = 'clear-day';
				break;
			case 'clear-night':
				symbol = 'clear-night';
				break;
			case 'cloudy':
				symbol = 'cloudy';
				break;
			case 'partlycloudy':
				symbol = 'partly-cloudy-day';
				break;
			case 'rainy':
				symbol = 'rain';
				break;
			case 'pouring':
				symbol = 'extreme-rain';
				break;
			case 'lightning':
			case 'lightning-rainy':
				symbol = 'thunderstorms-rain';
				break;
			case 'snowy':
				symbol = 'snow';
				break;
			case 'snowy-rainy':
				symbol = 'sleet';
				break;
			case 'fog':
				symbol = 'fog';
				break;
			case 'hail':
				symbol = 'hail';
				break;
			case 'windy':
				symbol = 'wind';
				break;
		}
		return `https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${symbol}.svg`;
	}
}

export const homeAssistantWeatherProvider = new HomeAssistantProvider();
