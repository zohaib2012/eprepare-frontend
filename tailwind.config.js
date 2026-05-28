/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E53E3E',
          blue: '#2B6CB0',
          dark: '#1A202C',
        }
      },
    },
  },
  plugins: [],
}
