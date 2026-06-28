import { useMemo } from 'react';

/**
 * Performance optimization hook that detects device capabilities
 * and user preferences to optimize animations and effects accordingly
 */
export const usePerformanceSettings = () => {
  return useMemo(() => {
    // Detect device capabilities
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const deviceMemory = navigator.deviceMemory || 4;
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    // Respect user's accessibility preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersReducedData = window.matchMedia('(prefers-reduced-data: reduce)').matches;
    
    // Check connection quality (if available)
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection ? 
      (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') : false;
    
    // Performance scoring (0-1, where 1 is highest performance)
    let performanceScore = 1;
    
    // Apply penalties for limiting factors
    if (isMobile) performanceScore *= 0.6;
    if (hardwareConcurrency < 4) performanceScore *= 0.7;
    if (deviceMemory < 4) performanceScore *= 0.8;
    if (prefersReducedMotion) performanceScore *= 0.2;
    if (prefersReducedData) performanceScore *= 0.5;
    if (isSlowConnection) performanceScore *= 0.4;

    return {
      // Device characteristics
      isMobile,
      hardwareConcurrency,
      deviceMemory,
      isSlowConnection,
      
      // User preferences
      prefersReducedMotion,
      prefersReducedData,
      
      // Performance settings
      performanceScore,
      
      // Optimized values based on performance score
      particleIntensity: Math.max(8, Math.floor(40 * performanceScore)),
      nodeCount: Math.max(8, Math.floor(24 * performanceScore)),
      maxConnections: Math.max(3, Math.floor(15 * performanceScore)),
      
      // Feature flags
      enableGlow: performanceScore > 0.5 && !prefersReducedData,
      enableComplexAnimations: performanceScore > 0.7 && !prefersReducedMotion,
      enableParticleConnections: performanceScore > 0.6 && !prefersReducedMotion,
      enableBackgroundEffects: performanceScore > 0.4 && !prefersReducedData,
      
      // Animation settings
      animationDuration: performanceScore > 0.8 ? 1 : performanceScore > 0.6 ? 0.7 : 0.5,
      frameRate: performanceScore > 0.8 ? 60 : performanceScore > 0.6 ? 30 : 20,
    };
  }, []); // Empty dependency array as these values shouldn't change during session
};

/**
 * Performance-aware component wrapper that conditionally renders
 * based on performance settings
 */
export const PerformanceGate = ({ 
  children, 
  fallback = null, 
  requireGlow = false, 
  requireComplexAnimations = false,
  requireHighPerformance = false 
}) => {
  const settings = usePerformanceSettings();
  
  const shouldRender = 
    (!requireGlow || settings.enableGlow) &&
    (!requireComplexAnimations || settings.enableComplexAnimations) &&
    (!requireHighPerformance || settings.performanceScore > 0.8);
  
  return shouldRender ? children : fallback;
};