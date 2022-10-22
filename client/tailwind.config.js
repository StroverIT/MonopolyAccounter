/** @type {import('tailwindcss').Config} */

const customColors = {
  "bg-color": "#0B0C10",
  gray: {
    DEFAULT: "#1F2833",
    100: "#C5C6C7",
  },
  primary: {
    DEFAULT: "#66FCF1",
    100: "#45A29E",
    200: "#355986",
  },
  red: {
    DEFAULT: "#DC1E1E",
  },
  green: {
    DEFAULT: "#26A811",
  },
  yellow: {
    DEFAULT: "#FFFF33",
  },
  white: {
    DEFAULT: "#FFFFFF",
  },
  transparent: "transparent",
  cardColors: {
    brown: "#864E1F",
    lightBlue: "#AADDF6",
    pink: "#D72287",
    orange: "#EB9B10",
    red: "#DB0929",
    yellow: "#EBE33D",
    green: "#239D51",
    blue: "#325085",
  },
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: { min: "350px" },
      sm: { min: "640px" },
      // => @media (min-width: 640px) { ... }

      md: { min: "768px" },
      lg: { min: "1024px" },
      "max-lg": { max: "1024px" },

      xl: { min: "1280px" },

      "2xl": { min: "1536px" },
    },
    colors: customColors,
    backgroundColor: (theme) => ({
      ...theme("colors"),
      color: customColors["bg-color"],
      gray: customColors.gray,
      primary: customColors.primary,
      white: customColors.white,
      cardColors: customColors.cardColors,
    }),
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
};
