import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	preprocess: preprocess({
		postcss: true // ✅ Enable PostCSS for TailwindCSS
	}),
};

export default config;
