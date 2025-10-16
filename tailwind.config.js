/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Це шлях, де Tailwind шукає класи.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
