import { LitElement, html, css } from "lit";

import { Config } from "@Config";
import bus, { EventBusMixin } from "@EventBus";

import { logger } from "./utils/logger.js";

import { configSchema } from './configSchema.js';

import Style from "../scss/style-editor.scss";

class WallClockVideo_Editor extends EventBusMixin(LitElement) {

	// Define which keys should NEVER be synced to the server/storage
	#blacklist = [
		'app', 'videoPath', 'imagePath', '__BUILD_HASH__',
		'onError', 'onMediaStateChanged', 'onMediaEnded', 'onMediaPlaying',
		'onMediaPaused', '_panel_custom'
	];

	constructor() {
		super();
		this._activeTab = Object.keys(configSchema)[0];
		// Deep clone current config into staged settings
		this._stagedSettings = Config.get();
	}

	static properties = {
		hass: {},
		_config: { state: true },
		_activeTab: { state: true },
		_stagedSettings: { state: true }
	};

	static styles = css`${Style}`;

	setConfig(config) {
		this._config = { ...config };
	}

	_getValue(tabKey, fieldKey) {
		if (tabKey === 'general') return this._stagedSettings[fieldKey];
		return this._stagedSettings[tabKey]?.[fieldKey];
	}

	_updateField(path, value) {
		const keys = path.split('.');
		let current = this._stagedSettings;

		// Navigate through the object levels
		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			// If the path doesn't exist yet, create an empty object
			if (!(key in current)) {
				current[key] = {};
			}
			current = current[key];
		}

		// Set the final value
		current[keys[keys.length - 1]] = value;
		this.requestUpdate();
	}

	/**
	 *
	 * @returns {Promise<void>}
	 * @private
	 */
	async _handleApply() {

		// before any bulk update filter the blacklist
		for (const key in this._stagedSettings) {
			if (this.#blacklist.includes(key)) {
				delete this._stagedSettings[key];
			}
		}

		await Config.setBulk(this._stagedSettings).then(() => {
			this._close();
		});
	}

	/**
	 *
	 * @private
	 */
	_close() {
		this.dispatchEvent(new CustomEvent('closeSettings', {
			bubbles: true,
			composed: true
		}));
		this.emit('config:close');
	}

	/**
	 *
	 * @param path
	 * @param schema
	 * @param value
	 * @returns {}
	 * @private
	 */
	_renderInput(path, schema, value) {
		// Determine if options are simple strings or {label, value} objects
		const renderOptions = (options) => {
			return options.map(opt => {
				const isObj = typeof opt === 'object',
					val = isObj ? opt.value : opt,
					lab = isObj ? opt.label : opt;
				return html`<option value="${val}" ?selected="${value === val}">${lab}</option>`;
			});
		};

		if (schema.type === 'select') {
			return html`
				<select @change="${e => this._updateField(path, e.target.value)}">
					${renderOptions(schema.options)}
				</select>`;
		}

		if (schema.type === 'boolean') {
			return html`
				<input type="checkbox" .checked="${value}"
				       @change="${e => this._updateField(path, e.target.checked)}">`;
		}

		if (schema.type === 'number') {
			return html`
				<input type="number" .value="${value}"
				       min="${schema.min ?? ''}"
				       max="${schema.max ?? ''}"
				       @input="${e => this._updateField(path, parseInt(e.target.value) || 0)}">`;
		}

		return html`
			<input type="text" .value="${value || ''}"
			       @input="${e => this._updateField(path, e.target.value)}">`;
	}


	/**
	 *
	 * @param tabKey
	 * @returns {TemplateResult<1>[]}
	 * @private
	 */
	_renderFields(tabKey) {
		const fields = configSchema[tabKey].fields;

		return Object.entries(fields).map(([fieldKey, schema]) => {
			// If it's a group, loop through subfields
			if (schema.type === 'group') {
				return html`
					<div class="settings-group">
						<div class="group-header">${schema.label}</div>
							${Object.entries(schema.fields)
								.map(([subKey, subSchema]) =>
								{
									const path = `${tabKey}.${fieldKey}.${subKey}`;
									const value = this._resolvePath(path, this._stagedSettings);

									return html`
			              <div class="row">
			                  <label>${subSchema.label}</label>
			                  ${this._renderInput(path, subSchema, value)}
			              </div>`;
								})}
						</div>
					</div>`;
			}

			// Standard Top Level Field
			const path = tabKey === 'general' ? fieldKey : `${tabKey}.${fieldKey}`;
			const value = this._resolvePath(path, this._stagedSettings);

			return html`
        <div class="row">
            <label>${schema.label}</label>
            ${this._renderInput(path, schema, value)}
        </div>`;
		});
	}


	/**
	 *
	 * @param path
	 * @param obj
	 * @returns {undefined|*}
	 * @private
	 */
	_resolvePath(path, obj) {
		if (!path || !obj) return undefined;

		// Split the path and reduce the object to the final value
		return path.split('.').reduce((prev, curr) => {
			return (prev && prev[curr] !== undefined) ? prev[curr] : undefined;
		}, obj);
	}

	render() {
		return html`
			<div class="backdrop">
				<div class="modal wrapper">
					<!-- Auto-generated Tabs -->
					<div class="tabs">
						${Object.entries(configSchema).map(([key, tab]) => html`
                  <div class="tab ${this._activeTab === key ? 'active' : ''}"
                       @click="${() => this._activeTab = key}">
                      ${tab.label}
                  </div>
            `)}
					</div>

					<!-- Auto-generated Content -->
					<div class="content">
						${this._renderFields(this._activeTab)}
					</div>

					<div class="actions">
						<button @click="${this._close}">Cancel</button>
						<button class="apply-btn" @click="${this._handleApply}">Apply Changes</button>
					</div>
			</div>
		`;
	}
}

customElements.define("wall-click-video_editor", WallClockVideo_Editor);
