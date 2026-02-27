
import { Helpers } from "./helpers.js";

const __app_name__ = __CARD_NAME__,
	logPrefix = '≡ BWC',
	debugPrefix = '≡ BWC [DEBUG]',
	debugMode = false,
	console_prefix = "background-color: #555;color: #fff;padding: 3px 2px 3px 3px;border-radius: 14px 0 0 14px;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)",
	console_subfix = "background-color: #506eac;color: #fff;padding: 3px 3px 3px 2px;border-radius: 0 14px 14px 0;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)",
	header_console = "display:inline-block;border-width:1px 1px 0 1px;border-style:solid;border-color:#424242;color:white;background:#03a9f4;font-size:11px;padding:4px 4.5px 5px 6px;",
	info_console = "border-width:0px 1px 1px 1px;padding:7.5px;background:white;color:#424242;line-height:0.7;font-weight:600;",
	STYLES = {
		log: 'color: #03a9f4; font-weight: bold;',
		info: 'color: #4caf50; font-weight: bold;',
		warn: 'color: #ff9800; font-weight: bold;',
		error: 'color: #f44336; font-weight: bold;',
		debug: 'color: #9c27b0; font-style: italic;',
		reset: 'color: inherit; font-weight: normal; font-style: normal;'
	};

const conInfo = {
		header: `%c≡ ${__app_name__}`.padEnd(36),
		ver: `%cVersion:${__VERSION__} Hash:${__BUILD_HASH__}`
	},
	br = "%c\n",
	maxLen = Math.max(...Object.values(conInfo).map((el) => el.length));

for (const [key] of Object.entries(conInfo)) {
	if (conInfo[key].length <= maxLen) {
		conInfo[key] = conInfo[key].padEnd(maxLen);
	}
	if (key === "header") {
		conInfo[key] = `${conInfo[key].slice(0, -1)}⋮`;
	}
}

function bootupMessage() {
	console.info(conInfo.header + br + conInfo.ver, header_console, "", `${header_console} ${info_console}`);
}

const logger = {
	log: (msg, ...args) => console.log(`%c${logPrefix} %c${msg}`, STYLES.log, STYLES.reset, ...args),

	info: (msg, ...args) => console.info(`%cⓘ %c${logPrefix} %c${msg}`, STYLES.info, STYLES.info, STYLES.reset, ...args),

	success: (msg, ...args) => console.info(`%c✔ %c${logPrefix} %c${msg}`, STYLES.info, STYLES.info, STYLES.reset, ...args),

	warn: (msg, ...args) => console.warn(`%c⚠ %c${logPrefix} %c${msg}`, STYLES.warn, STYLES.warn, STYLES.reset, ...args),

	error: (msg, ...args) => console.error(`%c✘ %c${logPrefix} %c${msg}`, STYLES.error, STYLES.error, STYLES.reset, ...args),

	debug: (msg, ...args) => {
		// Only shows if "debug: true" is in your card config or global storage
		if (Helpers.hasDebug()) {
			console.log(`%c🪲 ${debugPrefix} %c ${msg} %c`, console_prefix, console_subfix, STYLES.reset, ...args);
		}
	}
};

export { logger, bootupMessage };
