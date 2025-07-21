import React from 'react';
import { motion } from 'framer-motion';
import { QuantumParticles } from '../components/animations/QuantumParticles';
import { ResearchCard } from '../components/ui/ResearchCard';
import { NVCenterVisualization } from '../components/visualizations/NVCenterVisualization';
import { ResearchTimeline } from '../components/sections/ResearchTimeline';
import { InteractiveResearchDashboard } from '../components/sections/InteractiveResearchDashboard';

// Enhanced Research Page Component with Interactive Showcase
export const ResearchPage = ({ language, isDark, researchData }) => (
  <div className={`min-h-screen py-12 px-6 relative overflow-hidden ${
    isDark ? 'bg-black' : 'bg-gray-50'
  }`}>
    <div className={`absolute inset-0 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
        : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
    }`} />
    <QuantumParticles intensity={30} />
    
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Page Header */}
      <motion.header
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className={`text-6xl lg:text-7xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Research Areas' : '研究分野'}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-8" />
        <p className={`text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {language === 'EN' 
            ? "Our research focuses on quantum sensing technologies and their integration with informatics to drive quantum transformation in various applications."
            : "私たちの研究は量子センシング技術とインフォマティクスの統合に焦点を当て、様々な応用分野における量子変革を推進しています。"
          }
        </p>
      </motion.header>

      {/* Enhanced NV Center Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <NVCenterVisualization language={language} isDark={isDark} />
      </motion.div>

      {/* Research Timeline */}
      <ResearchTimeline language={language} isDark={isDark} />

      {/* Interactive Research Dashboard */}
      <InteractiveResearchDashboard 
        language={language} 
        isDark={isDark} 
        researchData={researchData} 
      />
    </div>
  </div>
);