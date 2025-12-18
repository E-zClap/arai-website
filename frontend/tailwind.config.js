/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Dark Gray Theme with Orange Accents (Lighter)
        'deep-navy': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#1a1a1a', // Dark background (lighter)
        },
        'electric-blue': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c', // Vibrant Orange - primary accent color
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        'royal-indigo': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Orange - accent color
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Dark Gray Shades for Professional Dark Theme (Lighter)
        'dark-gray': {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#303030',
          850: '#2a2a2a',
          900: '#262626',
          925: '#202020',
          950: '#1a1a1a', // Dark background (lighter)
        },
        // Convenience aliases for the main theme colors
        'theme': {
          primary: '#ea580c',       // vibrant-orange-600
          secondary: '#f97316',     // orange-500  
          dark: '#1a1a1a',          // dark background (lighter)
          'dark-surface': '#262626', // dark gray surface (lighter)
          'dark-elevated': '#303030', // elevated surface (lighter)
          accent: '#fb923c',        // orange-400
        },
        // Blue accent colors for subtle highlights
        'blue-accent': {
          light: '#60a5fa',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        }
      },
    },
  },
  plugins: [],
};
