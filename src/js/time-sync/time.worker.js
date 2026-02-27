
const connectedPorts = new Set();

let timeoutId = null,
	expectedTime = 0;

/**
 * Starts a self-correcting high-precision timer.
 */
function startPreciseTimer(callback, interval) {
	const now = performance.now();

	// Initialize timing on the first run
	if (!expectedTime) {
		expectedTime = now + interval;
	}

	const drift = now - expectedTime;
	callback();

	// Calculate the next delay, compensating for the execution drift
	expectedTime += interval;
	const nextDelay = Math.max(0, interval - drift);

	// Store the ID so we can clear it later
	timeoutId = setTimeout(() => {
		startPreciseTimer(callback, interval);
	}, nextDelay);
}

/**
 * Stops the high-precision timer.
 */
function stopPreciseTimer() {
	if (timeoutId) {
		clearTimeout(timeoutId);
		timeoutId = null;
		expectedTime = 0; // Reset for next start
		console.log("Timer stopped.");
	}
}

stopPreciseTimer();
startPreciseTimer(() => {

	for (const port of connectedPorts) {

		try {
			port.postMessage({
				type: 'TICK',
				tick: performance.now()
			});
		} catch (e) {
			console.error('Error sending tick message:', e);
			connectedPorts.delete(port);
		}

	}
}, 1000);

self.addEventListener('connect', (e) => {
	const port = e.ports[0];
	connectedPorts.add(port); // add a new connection to the current list

	port.onmessage = ev => {
		console.log('Message received from main script', ev.data);

		if (ev.data?.type === 'DISCONNECT') {
			connectedPorts.delete(port);
			port.close();
			stopPreciseTimer();
		}

		// piggyback the worker and forward the messages between the weather providers and main application
		// @todo: find a better solution for his in the future
		if (ev.data?.type === 'WEATHER_UPDATE') {
			port.postMessage({
				type: 'WEATHER_UPDATE',
				weather: ev.data.weather,
			});
		}

	};

	port.onclose = () => {
		console.log('worker disconnected from main script');
		connectedPorts.delete(port);
		port.close();
		stopPreciseTimer();
	};

	//port.start();
});
