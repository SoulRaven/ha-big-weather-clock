import { Config } from "@Config";
import { EventBusMixin } from "@EventBus";

export class DateTimeManager extends EventBusMixin() {

	constructor({ date = null, timezone }) {
		super();

		this._date = date || new Date();

		const savedTimezone = timezone || Config.get('timezone'),
			activeTimezone = savedTimezone === 'browser' ?
				Intl.DateTimeFormat().resolvedOptions().timeZone : savedTimezone;

		this.config = {
			timeFormat: Config.get('timeFormat'),
			dateFormat: Config.get('dateFormat'),
			locale: Config.get('locale'),
			timezone: activeTimezone,
		};

		// detect the 12h ort 24h based on the 'h' or 'H' in the format string
		this.use12Hour = /h/.test(this.config.timeFormat);

		// Initialize reusable formatters for better performance
		this._numFormatter = new Intl.NumberFormat(this.config.locale, { minimumIntegerDigits: 2 });
		this._msFormatter = new Intl.NumberFormat(this.config.locale, { minimumIntegerDigits: 3 });

		// This handles the padding and 12/24 logic natively
		this.dtf = new Intl.DateTimeFormat(this.config.locale, {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: this.use12Hour,
			timeZone: this.config.timezone
		});
	}

	// ============ STATIC METHODS ============

	static now(timezone = 'local') {
		return new DateTimeManager({
			date: new Date(),
			timezone
		});
	}

	static fromTimestamp(timestamp, timezone = 'local') {
		return new DateTimeManager({
			date: new Date(timestamp),
			timezone
		});
	}

	static create(year, month = 0, day = 1, hour = 0, minute = 0, second = 0, ms = 0) {
		return new DateTimeManager({
			date: new Date(year, month, day, hour, minute, second, ms)
		});
	}

	// ============ GETTER METHODS ============

	get year() {
		return this._date.getFullYear();
	}

	get month() {
		return this._date.getMonth();
	} // 0-11

	get monthName() {
		return this._date.toLocaleString(this.config.locale, { month: 'long' });
	}

	get monthShort() {
		return this._date.toLocaleString(this.config.locale, { month: 'short' });
	}

	get date() {
		return this._date.getDate();
	} // 1-31

	get day() {
		return this._date.getDay();
	} // 0-6 (Sun-Sat)

	get dayName() {
		return this._date.toLocaleString(this.config.locale, { weekday: 'long' });
	}

	get dayShort() {
		return this._date.toLocaleString(this.config.locale, { weekday: 'short' });
	}

	get hours() {
		return this._date.getHours();
	} // 0-23

	get hours12() {
		return this.hours % 12 || 12;
	}

	get minutes() {
		return this._date.getMinutes();
	}

	get seconds() {
		return this._date.getSeconds();
	}

	get milliseconds() {
		return this._date.getMilliseconds();
	}

	get timestamp() {
		return this._date.getTime();
	}

	get timezoneOffset() {
		return this._date.getTimezoneOffset();
	} // minutes

	get isAM() {
		return this.hours < 12;
	}

	get isPM() {
		return this.hours >= 12;
	}

	get ampm() {
		return this.isAM ? 'AM' : 'PM';
	}

	get ampmLower() {
		return this.isAM ? 'am' : 'pm';
	}

	// ============ TIMEZONE METHODS ============

	get utc() {
		if (this.config.timezone === 'utc') return this;
		const utcDate = new Date(this._date.getTime() + this.timezoneOffset * 60000);
		return new DateTimeManager({
			date: utcDate,
			timezone: 'utc' });
	}

	get local() {
		if (this.config.timezone === 'local') return this;

		const localDate = new Date(this._date.getTime() - this.timezoneOffset * 60000);

		return new DateTimeManager({
			date: localDate,
			timezone: 'local'
		});
	}

	toTimezone(timezone) {
		// Basic timezone conversion (for full timezone support, you'd need a timezone library)
		if (timezone === 'utc') return this.utc;
		if (timezone === 'local') return this.local;
		return this; // Fallback
	}

	// ============ FORMATTING METHODS ============

	format(formatStr) {

		const parts = this.dtf.formatToParts(this._date),
			getPart = (type) => parts.find(p => p.type === type)?.value || '',

			// Use Intl.NumberFormat for padding without toString().padStart()
			pad = (n) => this._numFormatter.format(n),
			padMS = (n) => this._msFormatter.format(n);

		const replacements = {
			// Year
			YYYY: this.year,
			YY: this.year.toString().slice(-2),
			// Month
			MMMM: this.monthName,
			MMM: this.monthShort,
			MM: pad(this.month + 1),
			M: this.month + 1,
			// Date
			DD: pad(this.date),
			D: this.date,
			// Weekday
			dddd: this.dayName,
			ddd: this.dayShort,
			// Hours (Using Intl extracted parts for perfect 12/24 padding)
			HH: getPart('hour'),      // Localized 24h or 12h depending on formatStr
			H: this.hours,            // Raw 24h
			hh: getPart('hour'),      // Localized 12h
			h: this.hours12,          // Raw 12h
			// Minutes
			mm: getPart('minute'),
			m: this.minutes,
			// Seconds
			ss: getPart('second'),
			s: this.seconds,
			// Milliseconds
			SSS: padMS(this.milliseconds),
			// AM/PM (Extracted natively from the locale)
			A: getPart('dayPeriod') || this.ampm,
			a: (getPart('dayPeriod') || this.ampm).toLowerCase(),
			// Timezone
			Z: `UTC${this.timezoneOffset > 0 ? '-' : '+'}${Math.abs(this.timezoneOffset / 60)}`,
			z: this.config.timezone
		};

		return formatStr.replace(
			/YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|hh|h|mm|m|ss|s|SSS|A|a|Z|z/g,
			(match) => replacements[match] !== undefined ? replacements[match] : match
		);
	}

	toISOString() {
		return this._date.toISOString();
	}

	toLocaleString(options = {}) {
		const defaultOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: this.use12Hour
		};

		return this._date.toLocaleString(this.config.locale, { ...defaultOptions, ...options });
	}

	// ============ GET and format date time ============
	get now() {
		return DateTimeManager.now(this.config.timezone);
	}

	// Format current time
	get formattedTime() {
		return this.now.format(this.config.timeFormat);
	}

	get formattedDate() {
		return this.now.format(this.config.dateFormat);
	}

	// Get various time components
	get components() {
		const now = this.now,

			parts = this.dtf.formatToParts(now._date),
			getPart = (type) => parts.find(p => p.type === type)?.value || '',

			separators = (this.formattedTime.match(/[:.\s-]/g) || []).length,
			timeNoSeconds = separators >= 2 ?
				this.formattedTime.replace(/[:.\s-]\d{2}(?=$|\s[AP]M|Z)/i, '') :
				this.formattedTime;

		return {
			datetime: `${this.formattedDate} ${this.formattedTime}`,
			timeObj: {
				timeFormatted: this.formattedTime,
				timeShort: timeNoSeconds,
				hours: getPart('hour'),
				minutes: getPart('minute'),
				seconds: getPart('second'),
				ampm: getPart('dayPeriod') || now.ampm, // Uses local AM/PM if available
			},
			dateObj: {
				dateFormatted: this.formattedDate,
				year: now.year,
				yearShort: now.year.toString().slice(-2),
				month: now.month + 1,
				day: now.date,
				weekday: now.dayName,
				weekdayShort: now.dayShort,
				monthName: now.monthName,
				monthShort: now.monthShort,
			},
			timestamp: now.timestamp,
			iso: now.toISOString(),
			locale: now.toLocaleString(),
			timezone: now.config.timezone,
		};
	}

	// ============ MANIPULATION METHODS ============

	add(amount, unit) {
		const newDate = new Date(this._date);

		switch (unit) {
			case 'years':
				newDate.setFullYear(newDate.getFullYear() + amount);
				break;
			case 'months':
				newDate.setMonth(newDate.getMonth() + amount);
				break;
			case 'days':
				newDate.setDate(newDate.getDate() + amount);
				break;
			case 'hours':
				newDate.setHours(newDate.getHours() + amount);
				break;
			case 'minutes':
				newDate.setMinutes(newDate.getMinutes() + amount);
				break;
			case 'seconds':
				newDate.setSeconds(newDate.getSeconds() + amount);
				break;
			case 'milliseconds':
				newDate.setMilliseconds(newDate.getMilliseconds() + amount);
				break;
		}

		return new DateTimeManager({
			date: newDate,
			timezone: this.config.timezone });
	}

	subtract(amount, unit) {
		return this.add(-amount, unit);
	}

	// ============ COMPARISON METHODS ============

	isBefore(other) {
		return this._date < other._date;
	}

	isAfter(other) {
		return this._date > other._date;
	}

	isSame(other, unit = 'millisecond') {
		const date1 = this._date;
		const date2 = other._date;

		switch (unit) {
			case 'year':
				return date1.getFullYear() === date2.getFullYear();
			case 'month':
				return date1.getMonth() === date2.getMonth() &&
					date1.getFullYear() === date2.getFullYear();
			case 'day':
				return date1.toDateString() === date2.toDateString();
			case 'hour':
				return date1.getHours() === date2.getHours() &&
					date1.toDateString() === date2.toDateString();
			case 'minute':
				return date1.getMinutes() === date2.getMinutes() &&
					date1.getHours() === date2.getHours() &&
					date1.toDateString() === date2.toDateString();
			case 'second':
				return date1.getTime() === date2.getTime();
			default:
				return date1.getTime() === date2.getTime();
		}
	}

	diff(other, unit = 'milliseconds') {
		const diffMs = this._date - other._date;

		switch (unit) {
			case 'years':
				return Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
			case 'months':
				return Math.floor(diffMs / (30.44 * 24 * 60 * 60 * 1000));
			case 'days':
				return Math.floor(diffMs / (24 * 60 * 60 * 1000));
			case 'hours':
				return Math.floor(diffMs / (60 * 60 * 1000));
			case 'minutes':
				return Math.floor(diffMs / (60 * 1000));
			case 'seconds':
				return Math.floor(diffMs / 1000);
			default:
				return diffMs;
		}
	}

	/**
	 * Start auto-update interval
	 */
	startAutoUpdate(worker, callback) {
		if (!callback) return;

		const tick = () => {
			const now = this.now;
			const formatted = now.format(this.config.timeFormat);
			return {
				formatted,
				components: this.components,
				timestamp: now.timestamp,
				dateTime: now
			};
		};

		// Initial update
		if (callback) {
			callback(tick());
		}

		worker.port.addEventListener('message', (event) => {
			if (event.data.type === 'TICK') {
				callback(tick());
			}
		});
	}
}

