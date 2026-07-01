import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "chip-cyan": "#00D4FF",
        "chip-dark": "#0A0A0F",
        "chip-card": "#12121A",
        "chip-border": "#1E1E2E",
        "chip-amber": "#FFB800",
        "chip-green": "#00FF88",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
