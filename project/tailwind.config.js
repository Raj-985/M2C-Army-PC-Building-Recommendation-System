/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#FFD700',
          600: '#E6C200',
          700: '#CCA800',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(255, 215, 0, 0.25)',
      },
    },
  },
  plugins: [],
};