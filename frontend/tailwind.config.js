/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        bgd: "#1B1B1B", //shade of black1
        rd: "#f56664", //red
        gr: "#009E60", //green
        tl: "#0d9488",  //teal
        line: "#4F4F4F", //shade of black2
        txt: "#FFFFFF", //white
      },
    },
  },
  plugins: [],
};
