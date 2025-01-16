// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import "dotenv/config";

// https://astro.build/config
export default defineConfig({
  outDir: "dist/astro",
  integrations: [vue(), tailwind({ applyBaseStyles: false })],
  prefetch: {
    prefetchAll: true,
  },
  adapter: node({
    mode: "middleware",
  }),
  experimental: {
    session: {
      driver: "mongodb",
      options: {
        connectionString: "mongodb://mongodb:27017",
        databaseName: "supernova",
        collectionName: "session",
      }
    },
  },
  server: { port: 2000, host: true },
});
