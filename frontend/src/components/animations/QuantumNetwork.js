import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Enhanced Professional Quantum Network Animation
export const QuantumNetwork = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      for (let i = 0; i < 20; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 85 + 7.5, // Keep nodes away from edges
          y: Math.random() * 85 + 7.5,
          size: Math.random() * 8 + 6, // Larger, more varied sizes
          energy: Math.random(),
          type: Math.random() > 0.6 ? 'quantum' : 'classical'
        });
      }
      setNodes(newNodes);

      // Generate more sophisticated connections
      const newConnections = [];
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = i + 1; j < newNodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(newNodes[i].x - newNodes[j].x, 2) + 
            Math.pow(newNodes[i].y - newNodes[j].y, 2)
          );
          
          // Create connections based on distance and quantum properties
          if (distance < 35 && Math.random() > 0.4) {
            const strength = Math.max(0.1, 1 - distance / 35);
            const isQuantumLink = newNodes[i].type === 'quantum' || newNodes[j].type === 'quantum';
            
            newConnections.push({
              id: `${i}-${j}`,
              x1: newNodes[i].x,
              y1: newNodes[i].y,
              x2: newNodes[j].x,
              y2: newNodes[j].y,
              opacity: strength,
              strength: strength,
              type: isQuantumLink ? 'quantum' : 'classical',
              phase: Math.random() * Math.PI * 2
            });
          }
        }
      }
      setConnections(newConnections);
    };

    generateNodes();
  }, []);

  return (
    <div className="absolute inset-0 opacity-15">
      <svg className="w-full h-full">
        {/* Enhanced connection lines with quantum effects */}
        {connections.map(conn => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke={conn.type === 'quantum' ? "url(#quantumGradient)" : "url(#classicalGradient)"}
            strokeWidth={conn.strength * 2 + 0.5}
            opacity={conn.opacity}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: conn.opacity,
              strokeDasharray: conn.type === 'quantum' ? [5, 5] : [0, 0]
            }}
            transition={{ 
              duration: 2 + conn.strength, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: conn.phase
            }}
          />
        ))}
        
        {/* Enhanced quantum nodes */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={node.type === 'quantum' ? "url(#quantumNodeGradient)" : "url(#classicalNodeGradient)"}
            filter="url(#glow)"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 3 + node.energy,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.id * 0.2
            }}
          />
        ))}
        
        {/* Enhanced gradient definitions for quantum effects */}
        <defs>
          <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="classicalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e7490" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <radialGradient id="quantumNodeGradient">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="70%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#0e7490" />
          </radialGradient>
          <radialGradient id="classicalNodeGradient">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="70%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};