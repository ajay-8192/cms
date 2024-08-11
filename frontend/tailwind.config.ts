import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "360px",
        mobileLandscape: "414px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1440px",
        monitor: "1920px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#2F76DB",
          white: "#FBFBFB",
          blue: "#1F2D5A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
