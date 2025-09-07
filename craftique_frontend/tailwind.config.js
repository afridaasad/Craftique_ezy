/** @type {import('tailwindcss').Config} */
export default {
  content: [
    
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#F4CBA3',
          200: '#E2B38A',
          300: '#E18A56',
          400: '#7B3F10',
          500: '#633012',
        },
      },
    },
  },
  plugins: [],
}
