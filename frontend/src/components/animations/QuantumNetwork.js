import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// Performance-Optimized Quantum Network Animation with Device Detection
export const QuantumNetwork = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  // Performance detection and optimization
  const performanceSettings = useMemo(() => {
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const deviceMemory = navigator.deviceMemory || 4;
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let performanceScore = 1;
    if (isMobile) performanceScore *= 0.6;
    if (hardwareConcurrency < 4) performanceScore *= 0.7;
    if (deviceMemory < 4) performanceScore *= 0.8;
    if (prefersReducedMotion) performanceScore *= 0.3;
    
    return {
      nodeCount: Math.max(8, Math.floor(24 * performanceScore)),
      maxConnections: Math.max(5, Math.floor(15 * performanceScore)),
      enableGlow: performanceScore > 0.5,
      enableComplexAnimations: performanceScore > 0.7,
      isMobile,
      prefersReducedMotion
    };
  }, []);

  useEffect(() => {
    const generateNetwork = () => {
      // Enhanced nodes with different quantum states
      const newNodes = [];
      for (let i = 0; i < performanceSettings.nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 95 + 2.5,
          y: Math.random() * 95 + 2.5,
          size: Math.random() * (performanceSettings.isMobile ? 6 : 8) + (performanceSettings.isMobile ? 4 : 6),
          type: Math.random() > 0.7 ? 'quantum' : Math.random() > 0.4 ? 'classical' : 'superposition',
          energy: Math.random(),
          phase: Math.random() * Math.PI * 2,
          coherence: Math.random() * 0.8 + 0.2
        });
      }

      // Optimized connection algorithm
      const newConnections = [];
      let connectionCount = 0;
      for (let i = 0; i < newNodes.length && connectionCount < performanceSettings.maxConnections; i++) {
        for (let j = i + 1; j < newNodes.length && connectionCount < performanceSettings.maxConnections; j++) {
          const node1 = newNodes[i];
          const node2 = newNodes[j];
          const distance = Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2);
          
          // Simplified probability calculation for performance
          const entanglementProbability = 
            (node1.type === 'quantum' && node2.type === 'quantum') ? 0.3 :
            (node1.type === 'superposition' || node2.type === 'superposition') ? 0.2 :
            0.1;
          
          if (distance < (performanceSettings.isMobile ? 40 : 35) && Math.random() < entanglementProbability) {
            newConnections.push({
              id: `${i}-${j}`,
              from: i,
              to: j,
              strength: Math.random() * 0.8 + 0.2,
              type: node1.type === 'quantum' && node2.type === 'quantum' ? 'entangled' : 'correlated',
              frequency: Math.random() * 2 + 1
            });
            connectionCount++;
          }
        }
      }

      setNodes(newNodes);
      setConnections(newConnections);
    };

    generateNetwork();
  }, [performanceSettings]);

  const getNodeStyle = (node) => {
    const baseStyles = {
      left: `${node.x}%`,
      top: `${node.y}%`,
      width: `${node.size}px`,
      height: `${node.size}px`,
    };

    // Simplified styles for low-performance devices
    if (!performanceSettings.enableGlow) {
      const simpleColors = {
        quantum: '#14b8a6',
        superposition: '#10b981',
        classical: '#0891b2'
      };
      
      return {
        ...baseStyles,
        background: simpleColors[node.type] || simpleColors.classical,
        border: `1px solid ${simpleColors[node.type] || simpleColors.classical}`,
        borderRadius: node.type === 'quantum' ? '50%' : node.type === 'superposition' ? '30%' : '20%',
        filter: `brightness(${1 + node.energy * 0.2})`,
      };
    }

    // Full-featured styles for high-performance devices
    switch (node.type) {
      case 'quantum':
        return {
          ...baseStyles,
          background: 'radial-gradient(circle, #14b8a6, #0891b2)',
          boxShadow: `0 0 ${node.size * 2}px rgba(20, 184, 166, 0.6), 0 0 ${node.size * 4}px rgba(20, 184, 166, 0.3)`,
          border: '2px solid rgba(20, 184, 166, 0.9)',
          borderRadius: '50%',
        };
      case 'superposition':
        return {
          ...baseStyles,
          background: 'linear-gradient(45deg, #10b981, #059669, #14b8a6)',
          backgroundSize: performanceSettings.enableComplexAnimations ? '200% 200%' : '100% 100%',
          boxShadow: `0 0 ${node.size * 2.5}px rgba(16, 185, 129, 0.5), 0 0 ${node.size * 5}px rgba(5, 150, 105, 0.2)`,
          border: '2px solid rgba(16, 185, 129, 0.8)',
          borderRadius: '30%',
        };
      default: // classical
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #0891b2, #0e7490)',
          boxShadow: `0 0 ${node.size * 1.5}px rgba(8, 145, 178, 0.4)`,
          border: '1px solid rgba(8, 145, 178, 0.7)',
          borderRadius: '20%',
        };
    }
  };

  const getConnectionStyle = (connection) => {
    if (!nodes[connection.from] || !nodes[connection.to]) return {};
    
    const from = nodes[connection.from];
    const to = nodes[connection.to];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const colors = {
      entangled: 'rgba(20, 184, 166, 0.8)',
      correlated: 'rgba(8, 145, 178, 0.6)',
    };

    return {
      left: `${from.x}%`,
      top: `${from.y}%`,
      width: `${length}%`,
      height: '2px',
      background: `linear-gradient(90deg, ${colors[connection.type]}, transparent, ${colors[connection.type]})`,
      transformOrigin: 'left center',
      transform: `rotate(${angle}deg)`,
      opacity: connection.strength,
    };
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Quantum Field Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-teal-900/10 via-cyan-900/5 to-transparent"
        animate={{
          scale: [1, 1.2, 1.1, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Quantum Connections with Advanced Effects */}
      {connections.map(connection => (
        <motion.div
          key={connection.id}
          className="absolute"
          style={getConnectionStyle(connection)}
          animate={{
            opacity: [connection.strength * 0.3, connection.strength * 1.2, connection.strength * 0.6],
            scaleX: [0.8, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 4 + connection.frequency,
            repeat: Infinity,
            ease: "easeInOut",
            delay: connection.from * 0.1,
          }}
        />
      ))}

      {/* Advanced Quantum Nodes */}
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={getNodeStyle(node)}
          animate={{
            scale: [1, 1.3, 1.1, 1],
            rotate: node.type === 'quantum' ? [0, 360] : node.type === 'superposition' ? [0, 180, 360] : [0, 90, 180, 270],
            opacity: [0.6, 1, 0.8, 0.6],
            x: [0, Math.sin(node.phase) * 15, 0],
            y: [0, Math.cos(node.phase) * 15, 0],
          }}
          transition={{
            duration: node.type === 'quantum' ? 8 : node.type === 'superposition' ? 6 : 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.id * 0.2,
          }}
        >
          {/* Quantum State Indicator */}
          {node.type === 'quantum' && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-teal-300/50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.id * 0.1,
              }}
            />
          )}
          
          {/* Superposition Effect */}
          {node.type === 'superposition' && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/30 to-teal-400/30"
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Quantum Wave Function */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.03) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.3, 1.1, 1],
          rotate: [0, 1, -1, 0],
          opacity: [0.5, 0.8, 0.6, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};