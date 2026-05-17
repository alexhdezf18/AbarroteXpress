/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'marca-verde': '#10b981',
        'marca-oscuro': '#1f2937',
      },
    },
  },
  plugins: [],
};
