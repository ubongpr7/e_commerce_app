import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"
import scrollbarHide from "tailwind-scrollbar-hide" // <-- Import the plugin

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {},
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "main-red": "#FF0000",
        gold: "#FFD700",
      },
      fontFamily: {
        sans: ['"Segoe UI"', "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-in-out",
      },
    },
  },
  plugins: [
    scrollbarHide, // <-- Keep scrollbar hiding
    plugin(({ addUtilities }) => {
      addUtilities({
        ".no-select": {
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
        },
      })
    }),
  ],
}

export default config
