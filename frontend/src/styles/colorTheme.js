// Professional Dark Gray/Black Theme with Orange Accents + Blue Highlights
// This file centralizes all color definitions for easy maintenance

export const colorTheme = {
  // Base Colors
  colors: {
    primary: '#ea580c',         // Vibrant Orange
    secondary: '#f97316',       // Orange  
    accent: '#fb923c',          // Lighter Orange
    blueAccent: '#3b82f6',      // Dark-Light Blue (subtle highlight)
    blueLight: '#60a5fa',       // Light Blue
    blueDark: '#2563eb',        // Darker Blue
    dark: '#0a0a0a',            // True Black
    darkSurface: '#1a1a1a',     // Dark Gray Surface
    darkElevated: '#242424',    // Elevated Surface
    darkSubtle: '#2a2a2a',      // Subtle Dark
  },

  // Light Mode Palette
  light: {
    primary: '#f97316',
    secondary: '#fb923c',
    accent: '#fdba74',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
  },

  // Dark Mode Palette - Professional Dark Gray/Black  
  dark: {
    primary: '#ea580c',
    secondary: '#f97316',
    accent: '#fb923c',
    background: '#0a0a0a',      // True black background
    surface: '#1a1a1a',         // Dark gray surface
    elevated: '#242424',        // Elevated elements
    subtle: '#2a2a2a',          // Subtle backgrounds
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    border: '#333333',
    borderSubtle: '#2a2a2a',
  },

  // Gradient Definitions
  gradients: {
    primary: 'linear-gradient(135deg, #ea580c, #f97316)',
    secondary: 'linear-gradient(135deg, #f97316, #fb923c)',
    accent: 'linear-gradient(135deg, #fb923c, #fdba74)',
    radial: 'radial-gradient(circle, #ea580c, #f97316)',
    darkSubtle: 'linear-gradient(135deg, #1a1a1a, #242424)',
    darkElevated: 'linear-gradient(180deg, #242424, #1a1a1a)',
  },

  // Shadow Colors
  shadows: {
    primary: 'rgba(234, 88, 12, 0.3)',
    secondary: 'rgba(249, 115, 22, 0.3)',
    accent: 'rgba(251, 146, 60, 0.3)',
    dark: 'rgba(0, 0, 0, 0.5)',
    darkSubtle: 'rgba(0, 0, 0, 0.3)',
  },

  // Tailwind Class Mappings
  tailwind: {
    primary: 'orange-600',
    secondary: 'orange-500',
    accent: 'orange-400',
    dark: 'dark-gray-950',
    darkSurface: 'dark-gray-900',
  }
};

// Helper functions for dynamic color usage
export const getThemeColor = (colorName, mode = 'light') => {
  return colorTheme[mode][colorName] || colorTheme.colors[colorName];
};

export const getThemeGradient = (gradientName) => {
  return colorTheme.gradients[gradientName];
};

export const getThemeShadow = (shadowName) => {
  return colorTheme.shadows[shadowName];
};

// CSS Variables for runtime color changes
export const applyCSSVariables = (mode = 'light') => {
  const root = document.documentElement;
  const colors = colorTheme[mode];
  
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
};

export default colorTheme;
