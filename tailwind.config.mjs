import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./keystatic/**/*.{jsx, js, tsx, ts}",
    // this was when I was trying to use tailwindcss for keystatic rich text editor components.
    // related: https://github.com/Thinkmill/keystatic/issues/1189
    "./astro/keystatic-imports.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        yellow: {
          transform: "hsl(var(--color-yellow-transform))",
          transformLight: "hsl(var(--color-yellow-transformLight))",
        },
        gray: {
          transform: "hsl(var(--color-gray-transform))",
          transformLight: "hsl(var(--color-gray-transform-light))",
        },
        red: {
          transform: "hsl(var(--color-red-transform))",
          transformLight: "hsl(var(--color-red-transform-light))",
        },
        orange: {
          transform: "hsl(var(--color-orange-transform))",
          transformLight: "hsl(var(--color-orange-transformLight))",
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
        sidebar: "sidebar 0.3s ease-in-out",
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
          "--color-yellow-transformLight":
            "34.28571428571428, 96.25000000000001%, 68.62745098039215%",
          "--color-gray-transform": "270 2% 25%",
          "--color-gray-transform-light":
            "249.99999999999997, 3.896103896103891%, 30.196078431372552%",
          "--color-red-transform": "354 73% 43%",
          "--color-red-transform-light":
            "0.9230769230769263, 84.4155844155844%, 69.80392156862744%",
          "--color-orange-transform": "15 88% 55%",
          "--color-orange-transformLight":
            "16.056338028169016, 88.75000000000001%, 68.62745098039215%",
        },
      });
    },
    require("@tailwindcss/typography"),
  ],
};
