import { logger } from '../utils/logger.js';

export class WeatherProviderRegistry {
	static instance = null;

	constructor() {
		if (WeatherProviderRegistry.instance) {
			return WeatherProviderRegistry.instance;
		}
		this.providers = new Map();
		WeatherProviderRegistry.instance = this;
	}

	static getInstance() {
		if (!WeatherProviderRegistry.instance) {
			WeatherProviderRegistry.instance = new WeatherProviderRegistry();
		}
		return WeatherProviderRegistry.instance;
	}

	register(provider) {
		if (this.providers.has(provider.id)) {
			logger.warn(`Weather provider with ID ${provider.id} is already registered. Overwriting.`);
		}
		this.providers.set(provider.id, provider);
	}

	getProvider(id) {
		return this.providers.get(id);
	}

	getAllProviders() {
		return Array.from(this.providers.values());
	}

	hasProvider(id) {
		return this.providers.has(id);
	}
}
