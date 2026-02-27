
import { logger } from "./logger.js";

const bus = new EventTarget();

// Generate a random ID once when the module loads
bus.instanceId = `bus_${Math.random().toString(36).substring(2, 9)}`;

/**
 * The Mixin: Call this on any class to give it global event powers.
 * @param Base
 * @returns
 * @constructor
 */
export const EventBusMixin = (Base = Object) => {

	const _Base = class extends Base {

		#observers = new Set(); // Store observers for auto-cleanup
		#pageVisibilityHandler = null;

		/**
		 * Hackish way to parse the arguments from the parent class constructor
		 *
		 * @param args
		 */
		constructor(...args) {
			super(...args);

		}

		/**
		 * Verifies if this class instance is using the same global bus
		 * @param {EventTarget} externalBus - The bus instance to compare against
		 */
		isUsingBus(externalBus) {
			// Strict equality check (checks if they point to the same memory reference)
			return bus === externalBus;
		}

		/**
		 * Optional: Get a unique ID for the bus to compare manually in logs
		 */
		getBusDebugInfo() {
			return {
				busExists: !!bus,
				busInstance: bus,
				// Using a unique property to verify it's the same object
				id: bus.uniqueId || 'No ID set'
			};
		}

		/**
		 * Returns the unique ID of the bus this instance is using.
		 * If two classes return different IDs, you have a bundling issue.
		 * Utility function to help debug.
		 * @returns {string}
		 */
		getBusId() {
			return bus.instanceId;
		}

		/**
		 * Check if this instance shares the bus with another object
		 * Utility function to help debug.
		 * @param other {Object} - Any object with a getBusId() method
		 * @returns {boolean} - True if the other object shares the same bus as this one.
		 */
		sharesBusWith(other) {
			return typeof other.getBusId === 'function' &&
				other.getBusId() === this.getBusId();
		}

		/**
		 * Dispatch to the global bus
		 * @param type
		 * @param detail
		 */
		emit(type, detail = {}) {

			// run the base class logic if is present
			if (super.emit) {
				super.emit(type, detail);
			}
			// run the Mixin logic
			bus.dispatchEvent(new CustomEvent(type, { detail }));
		}

		/**
		 * Listen to the global bus
		 * @param type
		 * @param callback
		 */
		on(type, callback) {
			bus.addEventListener(type, callback);
		}

		/**
		 * Remove listener from the global bus
		 * @param type
		 * @param callback
		 */
		off(type, callback) {
			bus.removeEventListener(type, callback);
		}

		// ---- Observers section ----

		/**
		 * Check when a DOM element is added or removed from the DOM.
		 * Emits a global event 'dom:mutation' with the targetId and added nodes count.
		 * Emits a local callback with the mutation object.
		 * @param target
		 * @param callback
		 * @returns {MutationObserver}
		 */
		observeDOM(target, callback) {
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.addedNodes.length || mutation.removedNodes.length) {
						// 1. Run local callback
						if (callback) {
							callback(mutation);
							logger.debug(`Observer DOM Callback: [${this.constructor.name}] DOM mutation detected.`);
						}

						// 2. Auto-emit global event
						this.emit('dom:mutation', {
							targetId: target.id || target.tagName,
							added: mutation.addedNodes.length
						});
					}
				});
			});

			observer.observe(target, { childList: true, subtree: true });
			this.#observers.add(observer); // Track it
			return observer;
		}

		/**
		 * Visibility Observer Helper
		 * @param target {HTMLElement} target - Element to watch (usually 'this')
		 * @param callback {Function} callback - Function to run on visibility change
		 * @param options {Object} options - IntersectionObserver config
		 * @returns {IntersectionObserver}
		 */
		observeVisibility(target, callback, options = { threshold: 0.1 }) {
			const observer = new IntersectionObserver((entries) => {
				for (const entry of entries) {
					// 1. Run local logic
					if (callback) {
						callback(entry.isIntersecting, entry);
						logger.debug(`Observer Callback: [${this.constructor.name}] Visibility changed to ${entry.isIntersecting}`);
					}

					// 2. Broadcast globally
					this.emit('dom:visibility-change', {
						target: target.tagName,
						isIntersecting: entry.isIntersecting
					});
				}
			}, options);

			observer.observe(target);
			this.#observers.add(observer); // Auto-cleanup in disconnectedCallback
			return observer;
		}

		/**
		 * Page Visibility Helper (Tab Switching)
		 * @param {Function} callback - Receives (isVisible: boolean)
		 */
		observePageVisibility(callback) {
			this.#pageVisibilityHandler = () => {
				const isVisible = document.visibilityState === 'visible';

				if (callback) {
					callback(isVisible);
					logger.debug(`Observer Page Visibility Callback: [${this.constructor.name}] Page visibility changed to ${isVisible}`);
				}

				this.emit('app:tab-visibility', { isVisible });
			};

			document.addEventListener('visibilitychange', this.#pageVisibilityHandler);
		}

		/**
		 * Observe the resize of a DOM element.
		 * Emits a global event 'dom:resize' with the targetId and the new dimensions.
		 * Emits a local callback with the new dimensions.
		 * @param target
		 * @param callback
		 */
		observeResize(target, callback) {
			const observer = new ResizeObserver(entries => {
				for (let entry of entries) {

					if (callback) {
						callback(entry.contentRect);
						logger.debug(`Observer Resize Callback: [${this.constructor.name}] Resize detected.`);
					}

					this.emit('dom:resize', {
						target: target.tagName,
						rect: entry.contentRect
					});
				}
			});
			observer.observe(target);
			this.#observers.add(observer);
		}

		/**
		 * Used only in the Lit even where the disconnectedCallback is native to the framework
		 * In other environments, you might need to call this manually when the
		 * element is removed from the DOM
		 *
		 */
		disconnectedCallback() {
			// Call the parent's disconnectedCallback if it exists
			if (super.disconnectedCallback) {
				super.disconnectedCallback();
			}

			// Kill all observers automatically when an element leaves DOM
			this.#observers.forEach(obs => obs.disconnect());
			this.#observers.clear();

			// clean the document event listener for page visibility
			if (this.#pageVisibilityHandler) {
				document.removeEventListener('visibilitychange', this.#pageVisibilityHandler);
			}

			logger.debug(`[${this.constructor.name}] Observers disconnected.`);
		}
	};

	return _Base;
};

export default bus;
