/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",],
  safelist: [
    {
      pattern: /^bg|^to|^from/
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
