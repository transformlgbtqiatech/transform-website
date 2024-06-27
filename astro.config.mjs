import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  devToolbar: {
    enabled: false,
  },
  integrations: [tailwind(), react(), markdoc(), mdx(), keystatic()],
  adapter: node({
    mode: "standalone",
  }),
});
