/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        areia: {
          50: "#FAF8F3",
          100: "#F2EFE7",
          200: "#E6E0D2",
          300: "#D5CBB5",
        },
        tinta: {
          500: "#66716D",
          700: "#33443F",
          900: "#1E2A2A",
        },
        mare: {
          500: "#3A7D77",
          600: "#2C625D",
          700: "#234E4A",
        },
        prata: {
          400: "#B7C3C0",
          500: "#9FB0AC",
          600: "#7E938E",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
