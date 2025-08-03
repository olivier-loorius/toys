/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#121212',
        light: '#f5f5f5',
        primary: '#DE8F6E',
        secondary: '#08415C',
      },
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

