import { Weather } from "../WeatherIconsManager.js";

const ANM_CONDITION_MAP = {
	'cer senin': Weather.ClearSky,
	'senin': Weather.Sunny,
	'cer variabil': Weather.PartlyCloudy,
	'noros': Weather.Clouds,
	'cer acoperit': Weather.Overcast,
	'ploaie': Weather.Rain,
	'ploaie slaba': Weather.LightRain,
	'aversa de ploaie': Weather.ShowerRain,
	'ninsoare': Weather.Snow,
	'lapovita': Weather.Sleet,
	'grindina': Weather.Hail,
	'furtuna': Weather.Thunderstorm,
	'descarcari electrice': Weather.Lightning,
	'ceata': Weather.Fog,
	'burnita': Weather.Drizzle,
	'vifor': Weather.WindyVariant
};


/**
 * Helper to map ANM data specifically if needed
 */
mapANMCondition(anmString)
{
	return ANM_CONDITION_MAP[anmString?.toLowerCase()] || Weather.All;
}
