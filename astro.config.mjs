import { defineConfig } from 'astro/config';
import { BASE_URL } from './src/config';
import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

// https://astro.build/config
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
import critters from "astro-critters";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: `https://${BASE_URL}`,
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), prefetch(), critters({
    logger: 0
  }), compress({
    html: false
  })],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});