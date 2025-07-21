import React from 'react';
import { motion } from 'framer-motion';
import { QuantumParticles } from '../components/animations/QuantumParticles';
import { ResearchCard } from '../components/ui/ResearchCard';
import { NVCenterVisualization } from '../components/visualizations/NVCenterVisualization';

// Enhanced Research Page Component
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

      {/* Research Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {researchData.map((research, index) => (
          <ResearchCard 
            key={index} 
            {...research} 
            index={index} 
            language={language}
            isDark={isDark}
          />
        ))}
      </motion.div>

      {/* Research Metrics Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <h2 className={`text-3xl font-bold mb-8 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Research Impact' : '研究インパクト'}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '12', label: { EN: 'Active Projects', JP: 'アクティブプロジェクト' } },
            { value: '8', label: { EN: 'Collaborations', JP: '共同研究' } },
            { value: '42', label: { EN: 'Publications', JP: '論文数' } },
            { value: '¥85M', label: { EN: 'Funding', JP: '研究資金' } }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className={`
                p-6 rounded-xl border text-center backdrop-blur-sm
                ${isDark 
                  ? 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-900/70' 
                  : 'bg-white/80 border-gray-200/80 hover:bg-white shadow-lg'
                }
                transition-all duration-300 hover:scale-105
              `}
            >
              <div className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-teal-400' : 'text-teal-600'
              }`}>
                {metric.value}
              </div>
              <div className={`text-sm font-medium ${
                isDark ? 'text-slate-300' : 'text-gray-600'
              }`}>
                {metric.label[language]}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);