import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Enhanced Professional Quantum Particles Animation
export const QuantumParticles = ({ intensity = 30 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < intensity; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 3,
          opacity: Math.random() * 0.8 + 0.4,
          speed: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2,
          type: Math.random() > 0.7 ? 'energy' : 'particle' // Different types for variety
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [intensity]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute ${
            particle.type === 'energy' 
              ? 'bg-gradient-to-r from-cyan-400 to-teal-400' 
              : 'bg-gradient-to-r from-teal-400 to-emerald-400'
          } shadow-lg`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            borderRadius: particle.type === 'energy' ? '50%' : '2px',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.type === 'energy' ? 'rgba(20, 184, 166, 0.6)' : 'rgba(16, 185, 129, 0.6)'}`
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [particle.opacity, particle.opacity * 0.4, particle.opacity],
            rotate: particle.type === 'energy' ? [0, 360] : [0, 180, 360],
            x: [0, Math.sin(particle.phase) * 20, 0],
            y: [0, Math.cos(particle.phase) * 20, 0]
          }}
          transition={{
            duration: 4 + particle.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.1
          }}
        />
      ))}
    </div>
  );
};