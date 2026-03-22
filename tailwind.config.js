/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-syne)'],
      },
      colors: {
        bg: '#0E0E10',
        surface: '#18181C',
        surface2: '#22222A',
        border: '#2E2E38',
        ink: '#F0F0F4',
        muted: '#6B6B80',
        accent: '#7C6EF0',
        accent2: '#A599FF',
        green: '#34C98A',
        yellow: '#F5C842',
        red: '#F05C5C',
        blue: '#4EA8F5',
      },
    },
  },
  plugins: [],
}
