// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { BASE_URL } from './src/config';
import { postContentPlugin } from './src/lib/markdown-plugins.mjs';

export default defineConfig({
	site: `https://${BASE_URL}`,
	output: 'static',
	adapter: node({
		mode: 'standalone'
	}),
	prefetch: true,
	integrations: [sitemap()],
	markdown: {
		syntaxHighlight: false,
		processor: satteri({
			hastPlugins: [postContentPlugin]
		})
	},
	vite: {
		plugins: [tailwindcss()]
	}
});
