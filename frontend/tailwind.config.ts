import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-end Red, White, and Black Palette
        primary: {
          DEFAULT: "#DC2626", // Bold Crimson Red
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#171717", // Rich Carbon Black
          foreground: "#FFFFFF",
        },
        background: "#FFFFFF", // Crisp White
        foreground: "#000000", // Deep Black
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#737373",
        },
      },
      borderRadius: {
        // Sharper corners often feel more "premium/institutional" 
        // than rounded "bubbly" ones in a Red/Black scheme.
        'none': '0',
        'sm': '0.125rem',
      }
    },
  },
  plugins: [],
};
export default config;