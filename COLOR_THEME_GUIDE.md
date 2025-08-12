# Color Theme Management Guide

This guide provides comprehensive instructions for managing and changing color themes in the Arai Laboratory website.

## Current Color Scheme: Deep Blue Professional

### Primary Colors
- **Deep Navy**: `#0b1020` (main dark background)
- **Electric Blue**: `#1e40af` (primary actions, buttons)  
- **Royal Indigo**: `#4f46e5` (accents, highlights)
- **Electric Blue Light**: `#3b82f6` (secondary elements)

## Color Management System

### 1. CSS Custom Properties (`/frontend/src/index.css`)
```css
:root {
  --color-primary: #1e40af;           /* Electric Blue */
  --color-secondary: #4f46e5;         /* Royal Indigo */
  --color-accent: #3b82f6;            /* Lighter Electric Blue */
  --color-dark: #0b1020;              /* Deep Navy */
}
```

### 2. Tailwind CSS Configuration (`/frontend/tailwind.config.js`)
```javascript
colors: {
  'deep-navy': {
    950: '#0b1020',
  },
  'electric-blue': {
    600: '#1e40af',
    500: '#3b82f6',
  },
  'royal-indigo': {
    500: '#4f46e5',
  },
}
```

### 3. JavaScript Color Theme (`/frontend/src/styles/colorTheme.js`)
Centralized configuration file with:
- Base colors
- Light/dark mode variants
- Gradient definitions
- Shadow colors
- Tailwind class mappings

## How to Change Colors

### Method 1: Quick Color Swap (Recommended)

1. **Update the base colors in `/frontend/src/styles/colorTheme.js`**:
```javascript
export const colorTheme = {
  colors: {
    primary: '#your-new-primary',
    secondary: '#your-new-secondary', 
    accent: '#your-new-accent',
    dark: '#your-new-dark',
  },
  // ... rest stays the same
};
```

2. **Update CSS custom properties in `/frontend/src/index.css`**:
```css
:root {
  --color-primary: #your-new-primary;
  --color-secondary: #your-new-secondary;
  --color-accent: #your-new-accent;
  --color-dark: #your-new-dark;
}
```

3. **Update Tailwind config in `/frontend/tailwind.config.js`**:
Add your new color palette to the `extend.colors` section.

### Method 2: Comprehensive Theme Change

For completely different color schemes:

1. Update all three configuration files above
2. Search and replace color class names in components:
   - `electric-blue-` → `your-new-color-`
   - `royal-indigo-` → `your-new-accent-`
   - `deep-navy-` → `your-new-dark-`

### Method 3: Runtime Color Changes

Use the JavaScript helper functions:
```javascript
import { applyCSSVariables } from './styles/colorTheme';

// Apply new theme
applyCSSVariables('dark'); // or 'light'
```

## Component Color Usage Patterns

### Common Color Applications:
- **Sidebar**: Electric blue gradients and highlights
- **Hero Section**: Electric blue/royal indigo text gradients
- **Animations**: Quantum particles use all three main colors
- **Buttons**: Electric blue primary, royal indigo secondary
- **Borders**: Transparent versions of main colors (e.g., `electric-blue-600/30`)

### Animation Colors:
- **QuantumParticles.js**: Lines 45-87 (particle styling)
- **QuantumNetwork.js**: Lines 74-116 (node styling) 
- **MissionSection.js**: Lines 100-125 (wave gradients)

## Accessibility Considerations

- Maintain contrast ratios above 4.5:1 for text
- Test with both light and dark modes
- Ensure color-blind friendly combinations
- Use semantic color meanings consistently

## Testing Color Changes

1. **Visual Testing**: Check all pages in both light and dark modes
2. **Animation Testing**: Verify quantum particles and network animations
3. **Responsive Testing**: Test on mobile and desktop viewports
4. **Accessibility Testing**: Use browser dev tools to check contrast

## Common Issues and Solutions

### Issue: Colors not updating
- **Solution**: Restart the frontend server: `sudo supervisorctl restart frontend`

### Issue: Tailwind classes not working  
- **Solution**: Rebuild Tailwind: `cd frontend && yarn build:css`

### Issue: CSS custom properties not applying
- **Solution**: Clear browser cache and hard refresh

## Pre-built Color Themes

Ready-to-use color combinations for quick changes:

### Ocean Blue (Current)
```css
--color-primary: #1e40af;   /* Electric Blue */
--color-secondary: #4f46e5; /* Royal Indigo */
--color-accent: #3b82f6;    /* Electric Blue Light */
--color-dark: #0b1020;      /* Deep Navy */
```

### Emerald Green
```css
--color-primary: #059669;   /* Emerald */
--color-secondary: #10b981; /* Green */
--color-accent: #34d399;    /* Light Green */
--color-dark: #064e3b;      /* Dark Green */
```

### Purple Professional
```css
--color-primary: #7c3aed;   /* Violet */
--color-secondary: #8b5cf6; /* Purple */
--color-accent: #a78bfa;    /* Light Purple */
--color-dark: #1e1b4b;      /* Dark Violet */
```

### Warm Orange
```css
--color-primary: #ea580c;   /* Orange */
--color-secondary: #f97316; /* Orange Red */
--color-accent: #fb923c;    /* Light Orange */
--color-dark: #431407;      /* Dark Orange */
```

## File Locations Summary

**Core Configuration Files:**
- `/frontend/src/index.css` - CSS custom properties and global styles
- `/frontend/tailwind.config.js` - Tailwind color palette
- `/frontend/src/styles/colorTheme.js` - JavaScript color management

**Main Component Files Using Colors:**
- `/frontend/src/components/ui/Sidebar.js` - Navigation colors
- `/frontend/src/components/sections/HeroSection.js` - Hero gradients
- `/frontend/src/components/sections/MissionSection.js` - Mission section waves
- `/frontend/src/components/animations/QuantumParticles.js` - Particle colors
- `/frontend/src/components/animations/QuantumNetwork.js` - Network node colors
- `/frontend/src/components/ui/FloatingControls.js` - Control button colors

This system provides maximum flexibility for future color theme changes while maintaining consistency across the application.