import { defineConfig } from 'astro/config';
import { BASE_URL } from './src/config'

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import node from '@astrojs/node';

// https://astro.build/config
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
export default defineConfig({
	site: BASE_URL,
	integrations: [tailwind({ config: { applyBaseStyles: false } }), prefetch()],
	output: 'server',
	adapter: node({
		mode: 'standalone'
	})
});
