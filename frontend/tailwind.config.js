/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Deep Blue Theme Colors
        'deep-navy': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d8ff',
          300: '#a4bcff',
          400: '#8095ff',
          500: '#5c6fff',
          600: '#4338ca',
          700: '#3730a3',
          800: '#312e81',
          900: '#1e1b4b',
          950: '#0b1020', // Deep Navy - main dark color
        },
        'electric-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e40af', // Electric Blue - primary action color
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e3a8a',
          950: '#172554',
        },
        'royal-indigo': {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4f46e5', // Indigo - accent color
          600: '#4338ca',
          700: '#3730a3',
          800: '#312e81',
          900: '#2d1b69',
          950: '#1e1b4b',
        },
        // Convenience aliases for the main theme colors
        'theme': {
          primary: '#1e40af',    // electric-blue-600
          secondary: '#4f46e5',  // royal-indigo-500  
          dark: '#0b1020',       // deep-navy-950
          accent: '#3b82f6',     // electric-blue-500
        }
      },
    },
  },
  plugins: [],
};