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
      // colors: {
      //   bgl: "#1E1E1E",
      //   bgd: "#0D0D0D",
      //   hvr: "#2A2B2D",
      //   brd: "#3C3C3C",

      //   txt: "#E5E5E5",

      //   tl: "#14B8A6",
      //   tlh: "#0d9488",

      //   rd: "#f56664",
      //   rds: "#e05553",

      //   gr: "#009E60",
      //   grs: "#007f4d",
      // },
      colors: {
        // Backgrounds
        bgl: "#F9FAFB", // Light Background 1 (page base)
        bgd: "#F3F4F6", // Light Background 2 (cards, containers)
        hvr: "#E5E7EB", // Hover Background (gray-200)

        // Borders
        brd: "#D1D5DB", // Light border (gray-300)

        // Text
        txt: "#1F2937", // Primary text (gray-800)

        // Teal (Primary buttons)
        tl: "#14B8A6", // Teal (emerald-500)
        tlh: "#0D9488", // Teal Hover (emerald-600)

        // Red (Danger buttons)
        rd: "#EF4444", // Red (red-500)
        rds: "#DC2626", // Red Hover (red-600)

        // Green (Success buttons)
        gr: "#22C55E", // Green (green-500)
        grs: "#16A34A", // Green Hover (green-600)
      },
    },
  },
  plugins: [],
};
