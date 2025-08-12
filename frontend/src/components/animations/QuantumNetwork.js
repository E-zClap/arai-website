import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePerformanceSettings } from '../../hooks/usePerformanceSettings';

// Enhanced Quantum Network Animation with Deep Blue Theme
export const QuantumNetwork = ({ intensity = 30, className = "" }) => {
  const [nodes, setNodes] = useState({});
  const [connections, setConnections] = useState([]);
  const containerRef = useRef(null);
  const performanceSettings = usePerformanceSettings();

  useEffect(() => {
    if (!containerRef.current) return;

    const nodeCount = Math.min(intensity, performanceSettings.maxParticles || 30);
    console.log('QuantumNetwork Debug:', {
      intensity,
      maxParticles: performanceSettings.maxParticles,
      nodeCount,
      performanceScore: performanceSettings.performanceScore
    });
    
    const newNodes = {};
    const newConnections = [];
    
    // Generate quantum network nodes
    for (let i = 0; i < nodeCount; i++) {
      const nodeType = Math.random() > 0.7 ? 'quantum' : Math.random() > 0.4 ? 'superposition' : 'classical';
      newNodes[i] = {
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        type: nodeType,
        energy: Math.random() * 0.8 + 0.2,
        size: nodeType === 'quantum' ? 12 : nodeType === 'superposition' ? 10 : 8,
        phase: Math.random() * Math.PI * 2,
        pulseRate: Math.random() * 2 + 1
      };
    }

    // Create quantum entanglement connections
    Object.values(newNodes).forEach(node => {
      if (Math.random() > 0.6 && newConnections.length < Math.floor(nodeCount / 2)) {
        const possibleTargets = Object.values(newNodes).filter(n => 
          n.id !== node.id && 
          !newConnections.some(c => 
            (c.from === node.id && c.to === n.id) || 
            (c.from === n.id && c.to === node.id)
          )
        );
        
        if (possibleTargets.length > 0) {
          const target = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
          newConnections.push({
            from: node.id,
            to: target.id,
            type: node.type === 'quantum' && target.type === 'quantum' ? 'entangled' : 'correlated',
            strength: Math.random() * 0.6 + 0.4
          });
        }
      }
    });

    setNodes(newNodes);
    setConnections(newConnections);
  }, [intensity, performanceSettings]);

  const getNodeStyle = (node) => {
    const baseStyles = {
      position: 'absolute',
      left: `${node.x}%`,
      top: `${node.y}%`,
      width: `${node.size}px`,
      height: `${node.size}px`,
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      opacity: node.energy,
    };

    // Simplified styles for low-performance devices
    if (!performanceSettings.enableGlow) {
      const simpleColors = {
        quantum: '#1e40af',
        superposition: '#4f46e5',
        classical: '#3b82f6'
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
          background: 'radial-gradient(circle, #1e40af, #3b82f6)',
          boxShadow: `0 0 ${node.size * 2}px rgba(30, 64, 175, 0.6), 0 0 ${node.size * 4}px rgba(30, 64, 175, 0.3)`,
          border: '2px solid rgba(30, 64, 175, 0.9)',
          borderRadius: '50%',
        };
      case 'superposition':
        return {
          ...baseStyles,
          background: 'linear-gradient(45deg, #4f46e5, #3b82f6, #1e40af)',
          backgroundSize: performanceSettings.enableComplexAnimations ? '200% 200%' : '100% 100%',
          boxShadow: `0 0 ${node.size * 2.5}px rgba(79, 70, 229, 0.5), 0 0 ${node.size * 5}px rgba(59, 130, 246, 0.2)`,
          border: '2px solid rgba(79, 70, 229, 0.8)',
          borderRadius: '30%',
        };
      default: // classical
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
          boxShadow: `0 0 ${node.size * 1.5}px rgba(59, 130, 246, 0.4)`,
          border: '1px solid rgba(59, 130, 246, 0.7)',
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
      entangled: 'rgba(30, 64, 175, 0.8)',
      correlated: 'rgba(59, 130, 246, 0.6)',
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
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Quantum Field Background Effect */}
      <motion.div
        className={`absolute inset-0 ${
          performanceSettings.enableGlow 
            ? 'bg-gradient-radial from-electric-blue-900/10 via-royal-indigo-900/5 to-transparent'
            : 'bg-gradient-radial from-electric-blue-900/5 via-royal-indigo-900/2 to-transparent'
        }`}
        animate={performanceSettings.enableComplexAnimations ? {
          scale: [1, 1.1, 1.05, 1],
          opacity: [0.3, 0.6, 0.4, 0.3],
        } : {
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: performanceSettings.enableComplexAnimations ? 12 : 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Connection Lines */}
      {connections.map((connection, index) => (
        <motion.div
          key={`connection-${index}`}
          className="absolute"
          style={getConnectionStyle(connection)}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: connection.strength,
            scaleX: 1,
          }}
          transition={{ 
            duration: 2,
            delay: index * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 3
          }}
        />
      ))}

      {/* Quantum Network Nodes */}
      {Object.values(nodes).map((node) => {
        const NodeComponent = performanceSettings.enableComplexAnimations ? motion.div : 'div';
        const nodeProps = performanceSettings.enableComplexAnimations ? {
          animate: {
            scale: [1, 1.2 + node.energy * 0.3, 1],
            opacity: [node.energy, node.energy * 1.4, node.energy],
            rotate: node.type === 'superposition' ? [0, 360] : [0, 0],
          },
          transition: {
            duration: node.pulseRate * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.id * 0.1
          }
        } : {};

        return (
          <NodeComponent
            key={node.id}
            style={getNodeStyle(node)}
            {...nodeProps}
          >
            {/* Enhanced Node Effects for high-performance devices */}
            {performanceSettings.enableGlow && (
              <>
                {/* Quantum Ring Effect */}
                {node.type === 'quantum' && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-electric-blue-300/40"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: node.id * 0.2
                    }}
                  />
                )}
                
                {/* Superposition Shimmer */}
                {node.type === 'superposition' && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-royal-indigo-400/20 to-electric-blue-400/20"
                    animate={performanceSettings.enableComplexAnimations ? {
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      rotate: [0, 180, 360],
                    } : {
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}
              </>
            )}
          </NodeComponent>
        );
      })}
    </div>
  );
};