import React from 'react';
import { usePerformanceSettings, PerformanceGate } from '../hooks/usePerformanceSettings';
import { QuantumParticles } from '../components/animations/QuantumParticles';
import { QuantumNetwork } from '../components/animations/QuantumNetwork';

const PerformanceTestPage = () => {
  const settings = usePerformanceSettings();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-teal-400">
          Animation Performance Optimization Demo
        </h1>
        
        {/* Performance Information */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Device Performance Analysis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-medium text-gray-300 mb-2">Device Info</h3>
              <p className="text-sm text-gray-400">Mobile: {settings.isMobile ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-400">CPU Cores: {settings.hardwareConcurrency}</p>
              <p className="text-sm text-gray-400">Memory: {settings.deviceMemory}GB</p>
              <p className="text-sm text-gray-400">Slow Connection: {settings.isSlowConnection ? 'Yes' : 'No'}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-300 mb-2">User Preferences</h3>
              <p className="text-sm text-gray-400">Reduced Motion: {settings.prefersReducedMotion ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-400">Reduced Data: {settings.prefersReducedData ? 'Yes' : 'No'}</p>
            </div>
          </div>
          
          <div className="bg-slate-700 rounded p-4">
            <h3 className="font-medium text-gray-300 mb-2">Performance Score</h3>
            <div className="flex items-center mb-2">
              <div className="flex-1 bg-slate-600 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${settings.debug.performanceScore * 100}%` }}
                ></div>
              </div>
              <span className="ml-3 text-sm text-white font-medium">
                {Math.round(settings.debug.performanceScore * 100)}%
              </span>
            </div>
            
            {settings.debug.reasons.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Performance factors:</p>
                <ul className="text-xs text-gray-500">
                  {settings.debug.reasons.map((reason, index) => (
                    <li key={index}>• {reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Optimization Settings */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Applied Optimizations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-300 mb-2">Animation Settings</h3>
              <p className="text-sm text-gray-400">Particle Count: {settings.particleIntensity}</p>
              <p className="text-sm text-gray-400">Network Nodes: {settings.nodeCount}</p>
              <p className="text-sm text-gray-400">Max Connections: {settings.maxConnections}</p>
              <p className="text-sm text-gray-400">Animation Duration: {settings.animationDuration}x</p>
              <p className="text-sm text-gray-400">Target FPS: {settings.frameRate}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-300 mb-2">Feature Flags</h3>
              <p className="text-sm text-gray-400">
                Glow Effects: {settings.enableGlow ? '✅ Enabled' : '❌ Disabled'}
              </p>
              <p className="text-sm text-gray-400">
                Complex Animations: {settings.enableComplexAnimations ? '✅ Enabled' : '❌ Disabled'}
              </p>
              <p className="text-sm text-gray-400">
                Particle Connections: {settings.enableParticleConnections ? '✅ Enabled' : '❌ Disabled'}
              </p>
              <p className="text-sm text-gray-400">
                Background Effects: {settings.enableBackgroundEffects ? '✅ Enabled' : '❌ Disabled'}
              </p>
            </div>
          </div>
        </div>

        {/* Animation Demos */}
        <div className="space-y-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">
              Optimized Quantum Particles
            </h2>
            <div className="relative h-64 bg-slate-900 rounded-lg overflow-hidden">
              <QuantumParticles intensity={40} />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Particle count automatically adjusted from 40 to {settings.particleIntensity} based on device performance.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">
              Optimized Quantum Network
            </h2>
            <div className="relative h-64 bg-slate-900 rounded-lg overflow-hidden">
              <QuantumNetwork />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Network complexity automatically reduced from 24 nodes to {settings.nodeCount} nodes with max {settings.maxConnections} connections.
            </p>
          </div>

          {/* Performance Gates Demo */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">
              Performance Gates Demo
            </h2>
            
            <PerformanceGate requireGlow={true} fallback={
              <div className="p-4 bg-slate-700 rounded text-center text-gray-400">
                High-end glow effects disabled for performance
              </div>
            }>
              <div className="p-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded text-center shadow-lg shadow-teal-500/20">
                High-end glow effects enabled!
              </div>
            </PerformanceGate>

            <PerformanceGate requireComplexAnimations={true} fallback={
              <div className="p-4 bg-slate-700 rounded text-center text-gray-400 mt-4">
                Complex animations disabled for performance
              </div>
            }>
              <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded text-center shadow-lg shadow-emerald-500/20 mt-4">
                Complex animations enabled!
              </div>
            </PerformanceGate>

            <PerformanceGate requireHighPerformance={true} fallback={
              <div className="p-4 bg-slate-700 rounded text-center text-gray-400 mt-4">
                High-performance features disabled for better performance
              </div>
            }>
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded text-center shadow-lg shadow-purple-500/20 mt-4">
                All high-performance features enabled!
              </div>
            </PerformanceGate>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            The animations above automatically adjust their complexity based on your device's capabilities
            and your accessibility preferences for optimal performance and user experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTestPage;