/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "wh-10": "#F4F4F4",
        "wh-50": "#FBFBFB",
        "wh-100": "#C9C9C9",
        "wh-300": "#939393",
        "wh-500": "#595959",
        "wh-900": "#0F0F0F",
        "accent-red": "#EA9648",
        "accent-orange": "#F6CF68",
        "accent-green": "#C2E9B4",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "bl-sm": "2px 5px 27px -8px rgba(0,0,0,0.1) ",
      },
      screens: {
        xs: "480px",
        sm: "760px",
        md: "1060px",
        // lg:"1280px"
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
