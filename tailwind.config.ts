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
        prime: {
          yellow: {
            DEFAULT: '#FFC107',
            light: '#FFD54F',
            dark: '#FFA000',
            50: '#FFFDE7',
            100: '#FFF9C4',
            200: '#FFF59D',
            300: '#FFF176',
            400: '#FFEE58',
            500: '#FFC107',
            600: '#FFB300',
            700: '#FFA000',
            800: '#FF8F00',
            900: '#FF6F00',
          },
          black: {
            DEFAULT: '#0A0A0A',
            light: '#1A1A1A',
            lighter: '#2A2A2A',
          },
          gray: {
            dark: '#141414',
            medium: '#1F1F1F',
            light: '#2D2D2D',
          },
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#B0B0B0',
          muted: '#808080',
        },
      },
    },
  },
  plugins: [],
};
export default config;
