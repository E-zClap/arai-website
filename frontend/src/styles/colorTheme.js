// Vibrant Orange Color Theme Configuration
// This file centralizes all color definitions for easy maintenance

export const colorTheme = {
  // Base Colors
  colors: {
    primary: '#ea580c',      // Vibrant Orange
    secondary: '#f97316',    // Orange  
    accent: '#fb923c',       // Lighter Orange
    dark: '#1a0d08',         // Deep Dark
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

  // Dark Mode Palette  
  dark: {
    primary: '#ea580c',
    secondary: '#f97316',
    accent: '#fb923c',
    background: '#1a0d08',
    surface: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    border: '#475569',
  },

  // Gradient Definitions
  gradients: {
    primary: 'linear-gradient(135deg, #ea580c, #f97316)',
    secondary: 'linear-gradient(135deg, #f97316, #fb923c)',
    accent: 'linear-gradient(135deg, #fb923c, #fdba74)',
    radial: 'radial-gradient(circle, #ea580c, #f97316)',
  },

  // Shadow Colors
  shadows: {
    primary: 'rgba(234, 88, 12, 0.3)',
    secondary: 'rgba(249, 115, 22, 0.3)',
    accent: 'rgba(251, 146, 60, 0.3)',
  },

  // Tailwind Class Mappings
  tailwind: {
    primary: 'orange-600',
    secondary: 'orange-500',
    accent: 'orange-500',
    dark: 'orange-950',
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