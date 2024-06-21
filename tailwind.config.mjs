/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./keystatic/**/*.{jsx, js, tsx, ts}",
    "./astro/keystatic-imports.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
