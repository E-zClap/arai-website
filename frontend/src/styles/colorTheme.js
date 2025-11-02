// Deep Blue Color Theme Configuration
// This file centralizes all color definitions for easy maintenance

export const colorTheme = {
  // Base Colors
  colors: {
    primary: '#1e40af',      // Electric Blue
    secondary: '#4f46e5',    // Royal Indigo  
    accent: '#3b82f6',       // Lighter Electric Blue
    dark: '#0b1020',         // Deep Navy
  },

  // Light Mode Palette
  light: {
    primary: '#3b82f6',
    secondary: '#818cf8',
    accent: '#60a5fa',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
  },

  // Dark Mode Palette  
  dark: {
    primary: '#1e40af',
    secondary: '#4f46e5',
    accent: '#3b82f6',
    background: '#0b1020',
    surface: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    border: '#475569',
  },

  // Gradient Definitions
  gradients: {
    primary: 'linear-gradient(135deg, #1e40af, #4f46e5)',
    secondary: 'linear-gradient(135deg, #3b82f6, #1e40af)',
    accent: 'linear-gradient(135deg, #4f46e5, #818cf8)',
    radial: 'radial-gradient(circle, #1e40af, #4f46e5)',
  },

  // Shadow Colors
  shadows: {
    primary: 'rgba(30, 64, 175, 0.3)',
    secondary: 'rgba(79, 70, 229, 0.3)',
    accent: 'rgba(59, 130, 246, 0.3)',
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