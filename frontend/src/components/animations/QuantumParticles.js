import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePerformanceSettings } from '../../hooks/usePerformanceSettings';

// Ultra-Performance-Optimized Quantum Particles - Minimal overhead
export const QuantumParticles = ({ intensity = 15 }) => {
  const [particles, setParticles] = useState([]);
  const performanceSettings = usePerformanceSettings();

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      // Very aggressive performance optimization - max 15 particles
      const optimizedIntensity = Math.min(15, Math.max(5, Math.floor(intensity * performanceSettings.performanceScore)));
      
      for (let i = 0; i < optimizedIntensity; i++) {
        // Mix of orange and blue particles (60% orange, 40% blue)
        const isBlue = Math.random() > 0.6;
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 4, // Smaller sizes
          opacity: Math.random() * 0.5 + 0.3, // Lower opacity
          speed: Math.random() * 2 + 2, // Faster animations
          phase: Math.random() * Math.PI * 2,
          type: isBlue ? 'blue' : 'orange', // Mix of blue and orange particles
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [intensity, performanceSettings]);

  const getParticleStyle = (particle) => {
    // Ultra-simplified styles for maximum performance
    // Use blue color for blue particles, orange for others
    const particleColor = particle.type === 'blue' ? '#3b82f6' : '#f97316';
    
    return {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      opacity: particle.opacity,
      background: particleColor,
      borderRadius: '50%',
      // No box-shadow for better performance
      willChange: 'transform, opacity', // Browser hint for optimization
    };
  };

  const getAnimationProps = (particle) => {
    // Ultra-simplified animations - only opacity changes
    if (performanceSettings.prefersReducedMotion) {
      return {
        opacity: [particle.opacity * 0.7, particle.opacity, particle.opacity * 0.7],
      };
    }

    // Minimal animation for maximum performance
    return {
      opacity: [particle.opacity, particle.opacity * 0.4, particle.opacity],
      scale: [1, 1.1, 1],
    };
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
            duration: 3 + particle.speed,
            repeat: Infinity,
            ease: "linear",
            delay: particle.id * 0.1,
          }}
        />
      ))}
    </div>
  );
};