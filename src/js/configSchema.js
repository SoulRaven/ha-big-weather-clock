export const configSchema = {
	general: {
		label: "General",
		fields: {
			timeFormat: {
				type: 'select',
				label: 'Time Format',
				options: [{ label: '24h', value: 'HH:mm:ss' }, {
					label: '12h',
					value: 'hh:mm:ss a'
				}]
			},
			dateFormat: { type: 'text', label: 'Date Format' },
			timezone: {
				type: 'select',
				label: 'Timezone',
				options: [
					{ label: 'Auto (Browser Default)', value: 'browser' },
					...Intl.supportedValuesOf('timeZone').map(tz => ({
						label: tz.replace('_', ' '), // Clean up underscores for UI
						value: tz
					}))
				]
			},
			hidePanels: { type: 'boolean', label: 'Hide Side Panels' }
		}
	},
	theme: {
		label: "Theme",
		fields: {
			day: {
				type: 'select',
				label: 'Day Theme',
				options: [
					{ label: 'High Contrast', value: 'high-contrast' },
					{ label: 'Safety Vivid', value: 'safety-vivid' },
					{ label: 'Solar Bright', value: 'solar-bright' },
					{ label: 'Oceanic', value: 'oceanic' },
				]
			},
			night: {
				type: 'select',
				label: 'Night Theme',
				options: [
					{ label: 'Night Vision Red', value: 'night-vision-red' },
					{ label: 'Low Light Green', value: 'low-light-green' },
					{ label: 'Deep Indigo', value: 'deep-indigo' },
					{ label: 'Forest Zen', value: 'forest-zen' },
				]
			}
		}
	},
	mediaManager: {
		label: "Media",
		fields: {
			renderType: {
				type: 'select',
				label: 'Mode',
				options: [
					{ label: 'Both', value: 'both' },
					{ label: 'Images', value: 'images' },
					{ label: 'Videos', value: 'videos' },
					{ label: 'None', value: 'none' }
				]
			},
			conditionMode: {
				type: 'select',
				label: 'Condition Mode',
				options: [
					{ label: 'Main', value: 'main' },
					{ label: 'Description', value: 'description' }
				]
			},
			useRandom: { type: 'boolean', label: 'Randomize Playback' },
			fadeDuration: { type: 'number', label: 'Fade Duration (ms)', min: 0, max: 5000 },
			minPlayTime: { type: 'number', label: 'Min Play Time (ms)', min: 0, max: 600000 },
			minRuns: { type: 'number', label: 'Min Runs Before Change', min: 1, max: 100 },
			imageDuration: { type: 'number', label: 'Image Duration (ms)', min: 0, max: 600000 },
		}
	},
	weatherConfig: {
		label: "Weather",
		fields: {
			entityId: { type: 'text', label: 'Entity ID' },
			weatherProvider: {
				type: 'select',
				label: 'Provider',
				options: [
					{ label: 'OpenWeatherMap', value: 'openweathermap' },
					{ label: 'HomeAsisstant (not implemented)', value: 'homeasisstant' },
					{ label: 'ANM Romania (not implemented)', value: 'anmromania' },
				]
			},
			owm_apiKey: {
				type: 'text',
				label: 'OWM API Key',
				description: 'Required for OpenWeatherMap, not used for others'
			},
			weatherUpdateInterval: {
				type: 'number',
				label: 'Update Interval (min)',
				min: 1,
				max: 30,
			},
			owm_description: {
				type: 'select',
				label: 'Description Mode',
				options: [
					{ label: 'Basic', value: 'basic' },
					{ label: 'Detailed', value: 'detailed' }
				]
			},
			owm_conditions: {
				type: 'select',
				label: 'Conditions Mode',
				options: [
					{ label: 'Basic', value: 'basic' },
					{ label: 'Detailed', value: 'detailed' }
				]
			},
			displayMode: {
				type: 'select',
				label: 'Display Mode',
				options: [
					{ label: 'Current', value: 'current' },
					{ label: 'Forecast', value: 'forecast' },
					{ label: 'Both', value: 'both' }
				]
			},
			units: {
				type: 'select',
				label: 'Units',
				options: [{ label: 'Metric', value: 'metric' }, {
					label: 'Imperial',
					value: 'imperial'
				}]
			},
			weatherForecastDays: {
				type: 'number',
				label: 'Forecast Days',
				min: 1,
				max: 8
			},
			icons: {
				label: "Weather Icons",
				type: "group",
				fields: {
					iconSet: {
						type: 'select',
						label: 'Icon Set',
						options: [
							'amcharts',
							'basmilius',
							'metno',
							'openweathermap',
							'maskinThings'
						]
					},
					type: {
						type: 'select',
						label: 'Animation',
						options: ['static', 'animated']
					}
				}
			},
			// Nested Group: iconsAlerts
			iconsAlerts: {
				label: "Alert Icons",
				type: "group",
				fields: {
					iconSet: {
						type: 'select',
						label: 'Icon Set',
						options: ['nrkno', 'amcharts']
					},
					type: {
						type: 'select',
						label: 'Type',
						options: ['static', 'animated']
					}
				}
			}
		}
	}
};
