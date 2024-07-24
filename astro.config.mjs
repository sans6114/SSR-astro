import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import db from "@astrojs/db";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), db(), vue()],
  output: "hybrid",
  adapter: cloudflare()
});