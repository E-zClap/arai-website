import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePerformanceSettings } from '../../hooks/usePerformanceSettings';

// Performance-Optimized Quantum Particles Animation with Device Detection
export const QuantumParticles = ({ intensity = 40 }) => {
  const [particles, setParticles] = useState([]);
  const performanceSettings = usePerformanceSettings();

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const optimizedIntensity = Math.max(8, Math.floor(intensity * performanceSettings.performanceScore));
      
      for (let i = 0; i < optimizedIntensity; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (performanceSettings.isMobile ? 8 : 12) + (performanceSettings.isMobile ? 4 : 6),
          opacity: Math.random() * 0.8 + 0.4,
          speed: Math.random() * (performanceSettings.enableComplexAnimations ? 3 : 1.5) + 1,
          phase: Math.random() * Math.PI * 2,
          type: Math.random() > 0.6 ? 'energy' : Math.random() > 0.3 ? 'quantum' : 'particle',
          glowIntensity: performanceSettings.enableGlow ? Math.random() * 4 + 2 : 1
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [intensity, performanceSettings]);

  const getParticleStyle = (particle) => {
    const baseStyles = {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      opacity: particle.opacity,
    };

    // Simplified styles for low-performance devices
    if (!performanceSettings.enableGlow) {
      const simpleColors = {
        energy: '#1e40af',
        quantum: '#4f46e5',
        particle: '#3b82f6'
      };
      
      return {
        ...baseStyles,
        background: simpleColors[particle.type] || simpleColors.particle,
        borderRadius: particle.type === 'quantum' ? '30%' : '50%',
        border: `1px solid ${simpleColors[particle.type] || simpleColors.particle}`,
        transform: particle.type === 'quantum' ? 'rotate(45deg)' : 'none',
        // Use CSS transform instead of box-shadow for better performance
        filter: `brightness(${1 + particle.glowIntensity * 0.1})`,
      };
    }

    // Full-featured styles for high-performance devices
    switch (particle.type) {
      case 'energy':
        return {
          ...baseStyles,
          background: 'linear-gradient(45deg, #06b6d4, #14b8a6)',
          borderRadius: '50%',
          boxShadow: `0 0 ${particle.glowIntensity * 6}px rgba(20, 184, 166, 0.8), 0 0 ${particle.glowIntensity * 12}px rgba(6, 182, 212, 0.4)`,
          border: '2px solid rgba(20, 184, 166, 0.6)',
        };
      case 'quantum':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          borderRadius: '30%',
          boxShadow: `0 0 ${particle.glowIntensity * 4}px rgba(16, 185, 129, 0.8), 0 0 ${particle.glowIntensity * 8}px rgba(5, 150, 105, 0.4)`,
          border: '1px solid rgba(16, 185, 129, 0.8)',
          transform: 'rotate(45deg)',
        };
      default:
        return {
          ...baseStyles,
          background: 'linear-gradient(90deg, #0891b2, #0e7490)',
          borderRadius: '2px',
          boxShadow: `0 0 ${particle.glowIntensity * 3}px rgba(8, 145, 178, 0.7), 0 0 ${particle.glowIntensity * 6}px rgba(14, 116, 144, 0.3)`,
          border: '1px solid rgba(8, 145, 178, 0.7)',
        };
    }
  };

  const getAnimationProps = (particle) => {
    // Simplified animations for reduced motion preference or low performance
    if (performanceSettings.prefersReducedMotion) {
      return {
        opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
        scale: [1, 1.05, 1],
      };
    }

    // Simplified animations for low-performance devices
    if (!performanceSettings.enableComplexAnimations) {
      return {
        scale: [1, 1.2, 1],
        opacity: [particle.opacity, particle.opacity * 0.6, particle.opacity],
        x: [0, Math.sin(particle.phase) * 15, 0],
        y: [0, Math.cos(particle.phase) * 15, 0],
      };
    }

    // Full-featured animations for high-performance devices
    const baseAnimation = {
      scale: [1, 1.4, 1.1, 1],
      opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity * 0.8, particle.opacity],
      x: [0, Math.sin(particle.phase) * 25, Math.cos(particle.phase) * 15, 0],
      y: [0, Math.cos(particle.phase) * 25, Math.sin(particle.phase) * 15, 0],
    };

    switch (particle.type) {
      case 'energy':
        return {
          ...baseAnimation,
          rotate: [0, 360, 720, 1080],
          scale: [1, 1.5, 1.1, 1],
        };
      case 'quantum':
        return {
          ...baseAnimation,
          rotate: [0, 180, 360, 540],
          scale: [1, 1.3, 0.9, 1],
          skewX: [0, 3, -3, 0],
        };
      default:
        return {
          ...baseAnimation,
          rotate: [0, 90, 180, 270],
        };
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={getParticleStyle(particle)}
          animate={getAnimationProps(particle)}
          transition={{
            duration: performanceSettings.enableComplexAnimations ? 6 + particle.speed : 4 + particle.speed * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * (performanceSettings.enableComplexAnimations ? 0.15 : 0.1),
            times: performanceSettings.prefersReducedMotion ? [0, 0.5, 1] : [0, 0.3, 0.7, 1]
          }}
        />
      ))}
      
      {/* Advanced Particle Connections - Only on high performance devices */}
      {performanceSettings.enableParticleConnections && (
        <div className="absolute inset-0">
          {particles.filter(p => p.type === 'energy').slice(0, performanceSettings.maxConnections).map((particle, index) => (
            <motion.div
              key={`connection-${particle.id}`}
              className="absolute w-px bg-gradient-to-b from-transparent via-teal-400/15 to-transparent"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                height: performanceSettings.isMobile ? '120px' : '180px',
                transformOrigin: 'top',
              }}
              animate={{
                rotate: [0, 360],
                scaleY: [0.5, 1.1, 0.7, 0.5],
                opacity: [0, 0.4, 0.2, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: index * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Quantum Field Effect - Simplified for low performance */}
      {performanceSettings.enableBackgroundEffects && (
        <motion.div
          className={`absolute inset-0 ${
            performanceSettings.enableGlow 
              ? 'bg-gradient-radial from-electric-blue-600/5 via-royal-indigo-500/3 to-transparent'
              : 'bg-gradient-radial from-electric-blue-600/2 via-royal-indigo-500/1 to-transparent'
          }`}
          animate={performanceSettings.enableComplexAnimations ? {
            scale: [1, 1.1, 1.05, 1],
            opacity: [0.3, 0.6, 0.4, 0.3],
          } : {
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: performanceSettings.enableComplexAnimations ? 10 : 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
};