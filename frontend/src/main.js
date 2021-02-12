import App from './App.svelte';

// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', () => {
// 		navigator.serviceWorker.register('/sw.js')
// 		.catch(error => {
// 			console.error(`Service worker registration error: ${error}`);
// 		});
// 	});
// }

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;