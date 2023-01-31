import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import node from '@astrojs/node';

// https://astro.build/config
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), prefetch(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});