/**
 * Weather Alert Icon Registry (2026)
 * Organized by Severity Level for dynamic UI alerting.
 */
export const nrknoAlertIcons = Object.freeze({
	options: {
		alias: 'nrkno',
		type: ['static'],
		path: '/media/icons/alerts/nrkno/'
	},

	yellow: { // 2 - Yellow (potential danger)
		avalanches: "icon-warning-avalanches-yellow.svg",
		drivingconditions: "icon-warning-drivingconditions-yellow.svg",
		flood: "icon-warning-flood-yellow.svg",
		forestfire: "icon-warning-forestfire-yellow.svg",
		generic: "icon-warning-generic-yellow.svg",
		ice: "icon-warning-ice-yellow.svg",
		landslide: "icon-warning-landslide-yellow.svg",
		lightning: "icon-warning-lightning-yellow.svg",
		polarlow: "icon-warning-polarlow-yellow.svg",
		rainflood: "icon-warning-rainflood-yellow.svg",
		rain: "icon-warning-rain-yellow.svg",
		snow: "icon-warning-snow-yellow.svg",
		stormsurge: "icon-warning-stormsurge-yellow.svg",
		wind: "icon-warning-wind-yellow.svg"
	},
	orange: { // 3 - Orange (dangerous weather)
		avalanches: "icon-warning-avalanches-orange.svg",
		drivingconditions: "icon-warning-drivingconditions-orange.svg",
		flood: "icon-warning-flood-orange.svg",
		forestfire: "icon-warning-forestfire-orange.svg",
		generic: "icon-warning-generic-orange.svg",
		ice: "icon-warning-ice-orange.svg",
		landslide: "icon-warning-landslide-orange.svg",
		lightning: "icon-warning-lightning-orange.svg",
		polarlow: "icon-warning-polarlow-orange.svg",
		rainflood: "icon-warning-rainflood-orange.svg",
		rain: "icon-warning-rain-orange.svg",
		snow: "icon-warning-snow-orange.svg",
		stormsurge: "icon-warning-stormsurge-orange.svg",
		wind: "icon-warning-wind-orange.svg"
	},
	red: { // 4 - Red (very dangerous weather)
		avalanches: "icon-warning-avalanches-red.svg",
		drivingconditions: "icon-warning-drivingconditions-red.svg",
		flood: "icon-warning-flood-red.svg",
		forestfire: "icon-warning-forestfire-red.svg",
		generic: "icon-warning-generic-red.svg",
		ice: "icon-warning-ice-red.svg",
		landslide: "icon-warning-landslide-red.svg",
		lightning: "icon-warning-lightning-red.svg",
		polarlow: "icon-warning-polarlow-red.svg",
		rainflood: "icon-warning-rainflood-red.svg",
		rain: "icon-warning-rain-red.svg",
		snow: "icon-warning-snow-red.svg",
		stormsurge: "icon-warning-stormsurge-red.svg",
		wind: "icon-warning-wind-red.svg"
	},
	special: {
		extreme: "icon-warning-extreme.svg"
	}
});

/**
 * 2026 Alert Resolver
 * @param {string} type - e.g., 'wind', 'flood'
 * @param {string} severity - 'yellow', 'orange', 'red'
 */
export function getAlertIcon(type, severity) {
	const level = severity?.toLowerCase() || 'yellow';
	const alertType = type?.toLowerCase() || 'generic';

	// Return a specific severity icon or fall back to generic of that level
	return ALERT_ICONS[level]?.[alertType] ||
		ALERT_ICONS[level]?.generic ||
		ALERT_ICONS.special.extreme;
}
