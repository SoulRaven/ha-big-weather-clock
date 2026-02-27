import packageInfo from '../../package.json';

import bus, { EventBusMixin } from "./utils/eventBusMixin.js";
import { Helpers } from "./utils/helpers.js";
import { bootupMessage } from "./utils/logger.js";

import { WallClockVideo } from "./weather-big-wall-clock.js";

const __DEBUG__ = Helpers.hasDebug();

// create a global namespace for the card,
// this allows us to store global variables and functions that can be accessed
// from anywhere in the application
window.sgs = window.sgs || {};

// attach the event bus to the global namespace
window.sgs.EventBus = bus;
window.sgs.EventBusMixin = EventBusMixin;

// Card picker metadata
window.customCards = window.customCards || [];
window.customCards.push({
	type: WallClockVideo.cardType,
	name: WallClockVideo.cardName,
	description: packageInfo.description,
	documentationURL: packageInfo.homepage,
	author: packageInfo.author,
	version: packageInfo.version,
	debug: __DEBUG__
});

customElements.define(WallClockVideo.cardType, WallClockVideo);

bootupMessage();
