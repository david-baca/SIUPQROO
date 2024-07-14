/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.tsx"],
  theme: {
    extend: {
      clipPath: {
        polygon: 'polygon(75% 3%, 50% 100%, 100% 100%)',
      },
    },
  },
  plugins: [],
}
