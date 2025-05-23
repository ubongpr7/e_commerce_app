import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide"; // <-- Import the plugin

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'main-red': '#FF0000',
        'gold': '#FFD700',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    scrollbarHide, // <-- Register the plugin here
  ],
};

export default config;