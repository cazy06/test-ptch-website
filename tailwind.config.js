/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A2463',
          800: '#0D2E7A',
          700: '#1040A0',
        },
        brand: {
          blue: '#3E92CC',
          cyan: '#00C2CB',
          orange: '#FF8C42',
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

