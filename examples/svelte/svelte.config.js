import adapter from '@sveltejs/adapter-auto';
import markdown from '@dansvel/vite-plugin-markdown'

import markedOptions from './marked.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: () => ({
			plugins: [markdown({ markedOptions, withOrigin: true })]
		})
	}
};

export default config;
