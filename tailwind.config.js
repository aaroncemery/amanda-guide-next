/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Cinzel', 'serif'],
      display: ['DM Serif Display', 'serif'],
    },
    extend: {
      colors: {
        midnight: '#000C2C',
      },
    },
  },
  plugins: [],
}
