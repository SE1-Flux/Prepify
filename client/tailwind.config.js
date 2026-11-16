/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#b9d8ff',
          600: '#1763dd',
          700: '#164fba',
          800: '#193f91',
          900: '#1a376f',
          950: '#172554',
        },
        neutral: {
          50: '#f6f8fb',
          200: '#dce3ed',
          600: '#596983',
          700: '#45536a',
          900: '#172238',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
