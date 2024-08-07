import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import { astroPagefindIntegration } from "./src/astro-integrations/pagefind";
import { keystaticFootnotes } from "./src/markdown-plugins/keystatic-footnotes.mjs";
import vercelServerLess from "@astrojs/vercel/serverless";

import mdx from "@astrojs/mdx";

const vercelServerLessAdapter = () =>
  vercelServerLess({
    maxDuration: 10,
    imageService: true,
    // imagesConfig,
  });

const nodeAdapter = () =>
  node({
    mode: "standalone",
  });

const adapter = import.meta.env.PROD
  ? vercelServerLessAdapter()
  : nodeAdapter();

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  devToolbar: {
    enabled: false,
  },
  integrations: [
    tailwind(),
    react(),
    markdoc(),
    mdx(),
    astroPagefindIntegration(),
    keystatic(),
  ],
  markdown: {
    remarkPlugins: [keystaticFootnotes],
  },
  adapter,
});
