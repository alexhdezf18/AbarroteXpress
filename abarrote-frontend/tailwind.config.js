/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Paleta basada en el azul marino del logo AbarroteXpress
        indigo: {
          50: '#f0f4fa',
          100: '#dce5f1',
          200: '#b8cce2',
          300: '#93b2d3',
          400: '#5e87b8',
          500: '#355f92',
          600: '#1e3f6f',
          700: '#163055',
          800: '#0e223c',
          900: '#08152a',
          950: '#050d1c',
        },
        // Paleta basada en el verde hoja del logo AbarroteXpress
        emerald: {
          50: '#f0faef',
          100: '#dbf3d9',
          200: '#b7e7b4',
          300: '#8cd888',
          400: '#5fc65e',
          500: '#3da948',
          600: '#2f8b3a',
          700: '#266f2f',
          800: '#1f5826',
          900: '#19451e',
          950: '#0d2511',
        },
        // Alias semánticos
        'marca-azul': '#1e3f6f',
        'marca-verde': '#3da948',
        'marca-oscuro': '#0e223c',
      },
    },
  },
  plugins: [],
};
