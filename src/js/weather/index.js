import { WeatherProviderRegistry } from './registry.js';
import { openWeatherMapProvider } from './providers/openweathermap.js';
import { homeAssistantWeatherProvider } from './providers/homeasisstant.js';

const registry = WeatherProviderRegistry.getInstance();

registry.register(openWeatherMapProvider);
registry.register(homeAssistantWeatherProvider);

export function registerWeatherProvider(provider) {
	registry.register(provider);
}

export function getAllWeatherProviders() {
	return registry.getAllProviders();
}

export function getWeatherProvider(id) {
	return registry.getProvider(id);
}
