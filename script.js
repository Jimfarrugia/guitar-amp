const volume = document.getElementById('volume');
const bass = document.getElementById('bass');
const mid = document.getElementById('mid');
const treble = document.getElementById('treble');
const visualizer = document.getElementById('visualizer');

const context = new AudioContext();

async function setupContext() {
	const guitar = await getGuitar();
	if (context.state === 'suspended') {
		await context.resume();
	}
	const source = context.createMediaStreamSource(guitar);
	source.connect(context.destination);
}

function getGuitar() {
	return navigator.mediaDevices.getUserMedia({
		audio: {
			echoCancellation: false,
			autoGainControl: false,
			noiseSuppression: false,
			latency: 0
		}
	});
}