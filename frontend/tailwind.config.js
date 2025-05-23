/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#c0d0dd',
        primaryLight: '#d3dee7',
        primaryHover: "#9cb4c9",
        blue: {
          500: '#d3dee7', // replaces bg-blue-500, text-blue-500, border-blue-500, etc.
          600: '#c0d0dd', // replaces bg-blue-600, text-blue-600, hover:bg-blue-600, etc.
        },
      },
    },
  },
  plugins: [],
}
