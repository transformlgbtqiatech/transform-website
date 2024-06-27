import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./keystatic/**/*.{jsx, js, tsx, ts}",
    "./astro/keystatic-imports.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswaldHeading: ["Oswald", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        yellow: {
          transform: "hsl(var(--color-yellow-transform))",
        },
        gray: {
          transform: "hsl(var(--color-gray-transform))",
        },
        red: {
          transform: "hsl(var(--color-red-transform))",
        },
        orange: {
          transform: "hsl(var(--color-orange-transform))",
        },
      },
      boxShadow: {
        tooltip: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      },
      keyframes: {
        flash: {
          "0% 100%": {
            backgroundColor: "inherit",
          },
          "50%": {
            backgroundColor: "hsl(var(--color-yellow-transform) / 0.2)",
          },
        },
        sidebar: {
          "0%": {
            opacity: 0,
            visibility: "hidden",
            transform: "translateX(-100%)",
          },
          "100%": {
            opacity: 1,
            visibility: "visible",
            transform: "translateX(0)",
          },
        },
        "sidebar-unmount": {
          "0%": {
            opacity: 1,
            visibility: "visible",
            transform: "translateX(0)",
          },
          "100%": {
            opacity: 0,
            visibility: "hidden",
            transform: "translateX(-100%)",
          },
        },
      },
      animation: {
        flash: "flash 1.25s ease-in-out",
        sidebar: "sidebar 0.4s ease-in-out",
        "sidebar-unmount": "sidebar-unmount 0.3s ease-out",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ":root": {
          "--color-yellow-transform":
            "35.93582887700535 95.8974358974359% 61.76470588235294%",
          "--color-gray-transform": "270 2% 25%",
          "--color-red-transform": "354 73% 43%",
          "--color-orange-transform": "15 88% 55%",
        },
      });
    },
    require("@tailwindcss/typography"),
  ],
};
