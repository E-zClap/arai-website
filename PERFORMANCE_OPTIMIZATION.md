# Quantum Animation Performance Optimization

## Overview

The quantum particle and network animations in Arai's Laboratory website have been optimized for better performance on lower-end devices while maintaining the high-quality visual experience on capable hardware.

## Key Optimizations Implemented

### 1. Device Performance Detection

**`usePerformanceSettings` Hook**
- Detects hardware capabilities (CPU cores, RAM)
- Identifies mobile devices
- Checks network connection quality
- Respects user accessibility preferences
- Calculates performance score (0-1)

**Detection Factors:**
- `navigator.hardwareConcurrency`: CPU core count
- `navigator.deviceMemory`: Available RAM
- `navigator.connection`: Network quality
- `prefers-reduced-motion`: Accessibility preference
- `prefers-reduced-data`: Data usage preference
- Mobile device detection via user agent

### 2. Adaptive Animation Settings

**Particle Count Optimization:**
- High performance (score > 0.8): 40 particles
- Medium performance (0.6-0.8): 24-32 particles  
- Low performance (< 0.6): 8-16 particles
- Mobile devices: Additional 40% reduction

**Network Complexity:**
- High performance: 24 nodes, 15 connections
- Medium performance: 16-20 nodes, 8-12 connections
- Low performance: 8-12 nodes, 3-5 connections

### 3. Feature Flags

**Progressive Enhancement:**
- `enableGlow`: Advanced shadow/glow effects (performance score > 0.5)
- `enableComplexAnimations`: Multi-stage animations (score > 0.7)
- `enableParticleConnections`: Particle connection lines (score > 0.6)
- `enableBackgroundEffects`: Background field effects (score > 0.4)

### 4. Animation Simplification

**High Performance Devices:**
```javascript
// Complex multi-stage animations
animate={{
  scale: [1, 1.4, 1.1, 1],
  opacity: [0.8, 0.3, 0.8, 0.8],
  rotate: [0, 360, 720, 1080],
  x: [0, sin(phase)*25, cos(phase)*15, 0]
}}
```

**Low Performance Devices:**
```javascript
// Simplified animations
animate={{
  scale: [1, 1.2, 1],
  opacity: [0.8, 0.6, 0.8],
  x: [0, sin(phase)*15, 0]
}}
```

**Reduced Motion Preference:**
```javascript
// Minimal animations
animate={{
  opacity: [0.5, 1, 0.5],
  scale: [1, 1.05, 1]
}}
```

### 5. Rendering Optimizations

**CSS vs JavaScript:**
- Use CSS transforms instead of box-shadow when possible
- Reduce gradient complexity on low-end devices
- Simplify border-radius calculations
- Use `filter: brightness()` instead of complex shadows

**Animation Timing:**
- Longer durations on slower devices (less CPU intensive)
- Reduced delay between particle animations
- Lower frame rate targets (60fps → 30fps → 20fps)

### 6. Memory Management

**Efficient Particle Generation:**
- Limit maximum particles based on device capabilities
- Reduce stored particle properties on low-end devices
- Optimize connection algorithms to prevent O(n²) complexity

## Usage Examples

### Basic Performance-Aware Component

```javascript
import { usePerformanceSettings } from '../hooks/usePerformanceSettings';

const MyComponent = () => {
  const settings = usePerformanceSettings();
  
  return (
    <motion.div
      animate={settings.enableComplexAnimations ? 
        { scale: [1, 1.2, 1], rotate: [0, 360] } :
        { scale: [1, 1.05, 1] }
      }
      transition={{ 
        duration: settings.enableComplexAnimations ? 2 : 1 
      }}
    />
  );
};
```

### Using Performance Gates

```javascript
import { PerformanceGate } from '../hooks/usePerformanceSettings';

const ExpensiveComponent = () => (
  <PerformanceGate 
    requireGlow={true}
    fallback={<SimpleVersion />}
  >
    <ComplexGlowComponent />
  </PerformanceGate>
);
```

## Performance Metrics

### Before Optimization:
- **Mobile devices**: 40 particles, complex animations, high CPU usage
- **Low-end devices**: Potential frame drops, slow load times
- **Accessibility**: No reduced motion support

### After Optimization:
- **Mobile devices**: 8-16 particles, simplified animations, smooth performance
- **Low-end devices**: Adaptive complexity, maintained 30+ FPS
- **Accessibility**: Full reduced motion support
- **High-end devices**: Full visual experience maintained

## Browser Compatibility

**Supported APIs:**
- `navigator.hardwareConcurrency` (Chrome 37+, Firefox 48+)
- `navigator.deviceMemory` (Chrome 63+, Edge 79+)
- `navigator.connection` (Chrome 61+, Firefox 31+)
- `prefers-reduced-motion` (All modern browsers)
- `prefers-reduced-data` (Chrome 85+, Safari 13+)

**Fallback Behavior:**
- Default to medium performance settings when APIs unavailable
- Progressive enhancement approach ensures compatibility

## Best Practices

1. **Always provide fallbacks** for unsupported performance APIs
2. **Respect user preferences** especially accessibility settings
3. **Test on actual low-end devices** not just slow network simulation
4. **Monitor performance** with browser dev tools
5. **Update thresholds** based on real-world usage data

## Future Enhancements

1. **Machine Learning**: Learn user's device capabilities over time
2. **Battery API**: Reduce animations when battery is low
3. **Thermal API**: Throttle animations on overheating devices
4. **WebGL Detection**: Use hardware acceleration when available
5. **Performance Observer**: Real-time performance monitoring

## Testing

To test the performance optimizations:

1. Visit `/performance-test` page (development only)
2. Use Chrome DevTools Device Simulation
3. Enable "Slow 3G" network throttling
4. Test with "prefers-reduced-motion" enabled
5. Monitor FPS in Performance tab

The optimizations ensure that Arai's Laboratory website provides an excellent user experience across all devices while maintaining the sophisticated scientific aesthetic for capable hardware.