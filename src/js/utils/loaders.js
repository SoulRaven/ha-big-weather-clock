import { Config } from "@Config";

import { logger } from "./logger.js";

const hacs_path = Config.get('app.hacs_path');

export async function loadPlaylists(playlistDict= {}) {
	try {

		// 1. Get the keys (e.g., "video", "image") and paths
		const keys = Object.keys(playlistDict);
		const paths = Object.values(playlistDict);

		// 2. Fetch all paths in parallel
		const results = await Promise.all(
			paths.map(path =>
				fetch(`${hacs_path}/other${path}`).then(r => {
					if (!r.ok) throw new Error(`Fetch failed for ${path}`);
					return r.json();
				})
			)
		);

		// 3. Map the results back into an object using the original keys
		const mappedData = {};
		keys.forEach((key, index) => {
			mappedData[key] = results[index];
		});
		return mappedData;

	} catch (error) {
		logger.error("Failed to load playlists:", error);
		return {};
	}
}

export async function loadIcons(iconsList=[]) {
	try {
		const [am, mskin, met, bas, owm, alrt] = await Promise.all(
			iconsList.map(path => fetch(`${hacs_path}/other/icons${path}`).then(r => r.json()))
		);

		// 3. Construct your truth tables with the actual data
		const weatherIcons = {
			amcharts: am,
			mskinThings: mskin,
			metno: met,
			basmilius: bas,
			owm
		};

		const alertIcons = {
			nrknoAlertIcons: alrt
		};

		return { weatherIcons, alertIcons };

	} catch (error) {
		logger.error("Failed to load icon truth tables:", error);
	}
}
