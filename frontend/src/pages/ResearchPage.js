import React from 'react';
import { motion } from 'framer-motion';
import { QuantumParticles } from '../components/animations/QuantumParticles';
import { ResearchCard } from '../components/ui/ResearchCard';
import { NVCenterVisualization } from '../components/visualizations/NVCenterVisualization';

// Enhanced Professional Research Page Component
export const ResearchPage = ({ language, isDark, researchData }) => (
  <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
    isDark ? 'bg-deep-navy-950' : 'bg-gray-50'
  }`}>
    <div className={`absolute inset-0 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-electric-blue-900/20'
        : 'bg-gradient-to-br from-slate-100/40 via-transparent to-electric-blue-100/40'
    }`} />
    <QuantumParticles intensity={40} />
    
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Enhanced Professional Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <motion.h1 
          className={`text-6xl lg:text-7xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}
          style={{ fontFamily: '"Inter", system-ui' }}
          whileHover={{ scale: 1.02 }}
        >
          {language === 'EN' ? 'Research Areas' : '研究分野'}
        </motion.h1>
        
        <motion.div 
          className="w-32 h-1 bg-gradient-to-r from-electric-blue-600 via-royal-indigo-500 to-electric-blue-500 rounded-full mx-auto mb-10"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        
        <motion.p 
          className={`text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
          style={{ fontFamily: '"Inter", system-ui' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {language === 'EN' 
            ? "Our research focuses on quantum sensing technologies and their integration with informatics to drive quantum transformation in various applications."
            : "私たちの研究は量子センシング技術とインフォマティクスの統合に焦点を当て、様々な応用分野における量子変革を推進しています。"
          }
        </motion.p>
      </motion.div>

      {/* NV Center Visualization with Enhanced Styling */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-20"
      >
        <NVCenterVisualization language={language} isDark={isDark} />
      </motion.div>

      {/* Enhanced Research Cards Grid */}
      <motion.div 
        className="grid lg:grid-cols-1 gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {researchData.map((research, index) => (
          <ResearchCard key={index} research={research} index={index} language={language} />
        ))}
      </motion.div>
    </div>
  </div>
);