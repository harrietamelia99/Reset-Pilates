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
        /** Brand palette — charcoal, mid-grey, warm-grey, light-grey, white */
        charcoal: "#2b2b29",
        "mid-grey": "#545456",
        "warm-grey": "#8E898A",
        "light-grey": "#C6C5C4",
        white: "#FFFFFF",
        /** Same as charcoal — headline ink on light surfaces */
        "editorial-ink": "#2b2b29",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        accent: [
          "var(--font-accent)",
          "Anca Coder",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      letterSpacing: {
        /** Brand heading tracking — 0.196em */
        heading: "0.196em",
      },
    },
  },
  plugins: [],
};
export default config;
