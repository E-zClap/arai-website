import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Ultra-Professional Quantum Particles Animation with Advanced Effects
export const QuantumParticles = ({ intensity = 40 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < intensity; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 12 + 6,
          opacity: Math.random() * 1.0 + 0.6,
          speed: Math.random() * 3 + 2,
          phase: Math.random() * Math.PI * 2,
          type: Math.random() > 0.6 ? 'energy' : Math.random() > 0.3 ? 'quantum' : 'particle',
          glowIntensity: Math.random() * 6 + 4
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [intensity]);

  const getParticleStyle = (particle) => {
    const baseStyles = {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      opacity: particle.opacity,
    };

    switch (particle.type) {
      case 'energy':
        return {
          ...baseStyles,
          background: 'linear-gradient(45deg, #06b6d4, #14b8a6)',
          borderRadius: '50%',
          boxShadow: `0 0 ${particle.glowIntensity * 8}px rgba(20, 184, 166, 1.0), 0 0 ${particle.glowIntensity * 16}px rgba(6, 182, 212, 0.6), 0 0 ${particle.glowIntensity * 24}px rgba(20, 184, 166, 0.3)`,
          border: '2px solid rgba(20, 184, 166, 0.6)',
        };
      case 'quantum':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          borderRadius: '30%',
          boxShadow: `0 0 ${particle.glowIntensity * 6}px rgba(16, 185, 129, 1.0), 0 0 ${particle.glowIntensity * 12}px rgba(5, 150, 105, 0.5)`,
          border: '1px solid rgba(16, 185, 129, 0.8)',
          transform: 'rotate(45deg)',
        };
      default:
        return {
          ...baseStyles,
          background: 'linear-gradient(90deg, #0891b2, #0e7490)',
          borderRadius: '2px',
          boxShadow: `0 0 ${particle.glowIntensity * 4}px rgba(8, 145, 178, 0.9), 0 0 ${particle.glowIntensity * 8}px rgba(14, 116, 144, 0.4)`,
          border: '1px solid rgba(8, 145, 178, 0.7)',
        };
    }
  };

  const getAnimationProps = (particle) => {
    const baseAnimation = {
      scale: [1, 1.4, 1.1, 1],
      opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity * 0.8, particle.opacity],
      x: [0, Math.sin(particle.phase) * 30, Math.cos(particle.phase) * 20, 0],
      y: [0, Math.cos(particle.phase) * 30, Math.sin(particle.phase) * 20, 0],
    };

    switch (particle.type) {
      case 'energy':
        return {
          ...baseAnimation,
          rotate: [0, 360, 720, 1080],
          scale: [1, 1.6, 1.2, 1],
        };
      case 'quantum':
        return {
          ...baseAnimation,
          rotate: [0, 180, 360, 540],
          scale: [1, 1.3, 0.9, 1],
          skewX: [0, 5, -5, 0],
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
            duration: 6 + particle.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.15,
            times: [0, 0.3, 0.7, 1]
          }}
        />
      ))}
      
      {/* Advanced Particle Connections */}
      <div className="absolute inset-0">
        {particles.filter(p => p.type === 'energy').slice(0, 8).map((particle, index) => (
          <motion.div
            key={`connection-${particle.id}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-teal-400/20 to-transparent"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              height: '200px',
              transformOrigin: 'top',
            }}
            animate={{
              rotate: [0, 360],
              scaleY: [0.5, 1.2, 0.8, 0.5],
              opacity: [0, 0.6, 0.3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Quantum Field Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-teal-500/5 via-cyan-500/3 to-transparent"
        animate={{
          scale: [1, 1.1, 1.05, 1],
          opacity: [0.3, 0.6, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};