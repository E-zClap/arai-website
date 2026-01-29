import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuantumParticles } from '../components/animations/QuantumParticles';
import { NVCenterVisualization } from '../components/visualizations/NVCenterVisualization';
import { Beaker, Cpu, Microscope, Waves, Users, Brain, ChevronDown, Sparkles } from 'lucide-react';

// Icon mapping for research themes
const themeIcons = {
  1: Waves,    // Quantum Metrology, Control & Machine Learning (merged)
  2: Cpu,      // Diamond Quantum Electronics
  3: Microscope, // Quantum Materials Sensing & Extreme-Condition Physics
  4: Beaker,   // Quantum Environmental & Infrastructure Sensing
  5: Brain     // Quantum Probability & Social Informatics
};

// Premium gradient colors for each theme
const themeColors = {
  1: { from: 'from-orange-500', to: 'to-pink-500', glow: 'orange' },
  2: { from: 'from-blue-500', to: 'to-cyan-500', glow: 'blue' },
  3: { from: 'from-purple-500', to: 'to-indigo-500', glow: 'purple' },
  4: { from: 'from-emerald-500', to: 'to-teal-500', glow: 'emerald' },
  5: { from: 'from-amber-500', to: 'to-orange-500', glow: 'amber' }
};

// Premium Research Theme Card Component
const ResearchThemeCard = ({ theme, index, language, isDark }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = themeIcons[theme.number] || Beaker;
  const colors = themeColors[theme.number] || themeColors[1];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
    >
      {/* Animated Background Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${colors.from} ${colors.to} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700`} />
      
      {/* Main Card Container */}
      <div
        className={`relative overflow-hidden rounded-3xl backdrop-blur-2xl border-2 transition-all duration-500 ${
          isDark
            ? 'bg-gradient-to-br from-dark-gray-900/90 via-dark-gray-900/80 to-dark-gray-850/90 border-orange-600/30 hover:border-orange-500/60'
            : 'bg-gradient-to-br from-white/95 via-white/90 to-gray-50/95 border-orange-300/40 hover:border-orange-400/70'
        } shadow-2xl hover:shadow-orange-500/20`}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
        
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'easeInOut'
          }}
        />
        
        {/* Side Accent Bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${colors.from} ${colors.to} opacity-80`} />
        
        <div className="relative p-10 lg:p-12">
          {/* Premium Header Section */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              {/* Large Gradient Number Badge */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.from} ${colors.to} shadow-2xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                <span className="relative text-3xl font-black text-white" style={{ fontFamily: '"Inter", system-ui' }}>
                  {theme.number}
                </span>
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} rounded-2xl opacity-50 blur-xl`} />
              </motion.div>
              
              {/* Premium Icon with Gradient Background */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className={`relative p-5 rounded-2xl bg-gradient-to-br ${colors.from} ${colors.to} shadow-xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl" />
                <Icon className="relative w-10 h-10 text-white drop-shadow-lg" strokeWidth={2.5} />
              </motion.div>
            </div>
            
            {/* Enhanced Category Badge */}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                isDark
                  ? 'bg-gradient-to-r from-orange-600/20 to-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border border-orange-300/50'
              } backdrop-blur-xl shadow-lg`}
            >
              {theme.category}
            </motion.span>
          </div>
          
          {/* Title with Gradient Effect */}
          <motion.h3
            className={`text-3xl lg:text-4xl font-black mb-6 leading-tight bg-gradient-to-r ${colors.from} ${colors.to} bg-clip-text text-transparent`}
            style={{ fontFamily: '"Inter", system-ui' }}
            whileHover={{ scale: 1.02 }}
          >
            {theme.title[language]}
          </motion.h3>
          
          {/* Lead Researchers (if exists) */}
          {theme.leadResearchers && (
            <div className={`flex items-center gap-2 mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{theme.leadResearchers[language]}</span>
            </div>
          )}
          
          {/* Overview with Premium Styling */}
          <p className={`text-lg lg:text-xl mb-8 leading-relaxed font-medium ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`} style={{ letterSpacing: '0.01em' }}>
            {theme.overview[language]}
          </p>
          
          {/* Description */}
          <p className={`text-base lg:text-lg mb-10 leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`} style={{ lineHeight: '1.8' }}>
            {theme.description[language]}
          </p>
          
          {/* Example Topics Section with Expand/Collapse */}
          <div className={`border-t-2 pt-8 ${
            isDark ? 'border-orange-600/20' : 'border-orange-300/30'
          }`}>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center justify-between w-full text-left group/button mb-6 ${
                isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'
              } transition-colors`}
              whileHover={{ x: 5 }}
            >
              <h4 className="text-base font-bold uppercase tracking-wider flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.from} ${colors.to}`} />
                {language === 'EN' ? 'Research Topics' : '研究トピック'}
                <span className={`text-xs font-normal ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  ({theme.exampleTopics[language].length})
                </span>
              </h4>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 rounded-2xl ${
                    isDark ? 'bg-dark-gray-850/50' : 'bg-gray-50/50'
                  } backdrop-blur-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                    {theme.exampleTopics[language].map((topic, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                          isDark
                            ? 'hover:bg-dark-gray-800/50 border border-transparent hover:border-orange-600/20'
                            : 'hover:bg-white/50 border border-transparent hover:border-orange-300/30'
                        }`}
                      >
                        <div className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r ${colors.from} ${colors.to} flex-shrink-0 shadow-lg`} />
                        <span className={`text-base leading-relaxed font-medium ${
                          isDark ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                          {topic}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Research Page Component
export const ResearchPage = ({ language, isDark, researchData }) => (
  <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
    isDark ? 'bg-transparent' : 'bg-gray-50'
  }`}>
    <QuantumParticles intensity={30} />
    
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.h1 
          className={`text-5xl lg:text-7xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
          style={{ fontFamily: '"Inter", system-ui' }}
        >
          {language === 'EN' ? 'Research' : '研究'}
        </motion.h1>
        
        <motion.div 
          className="w-32 h-1 bg-gradient-to-r from-orange-600 via-orange-500 to-blue-500 rounded-full mx-auto mb-10"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        
        {/* Guiding Question */}
        <motion.div 
          className={`max-w-5xl mx-auto mb-8 p-8 rounded-2xl backdrop-blur-xl border ${
            isDark
              ? 'bg-dark-gray-900/40 border-orange-600/20'
              : 'bg-white/60 border-orange-200/50'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className={`text-xl lg:text-2xl font-medium leading-relaxed italic ${
            isDark ? 'text-orange-300' : 'text-orange-700'
          }`} style={{ fontFamily: '"Inter", system-ui' }}>
            {language === 'EN'
              ? '"How can quantum science be transformed from a fragile laboratory curiosity into a shared intellectual and technological infrastructure for society?"'
              : '「量子科学を、脆弱な実験室の好奇心から、社会のための共有知的・技術的インフラへと変革するにはどうすればよいか？」'
            }
          </p>
        </motion.div>
        
        {/* Mission Statement */}
        <motion.p 
          className={`text-lg lg:text-xl max-w-5xl mx-auto leading-relaxed mb-12 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
          style={{ fontFamily: '"Inter", system-ui' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {language === 'EN'
            ? 'Guided by our Purpose (unlocking the potential of quantum science) and our Vision (extending how we describe and understand the world through quantum informatics), we pursue research that connects fundamental physics, quantum devices, materials, and societal applications.'
            : '私たちの目的（量子科学の可能性を解き放つこと）と私たちのビジョン（量子情報学を通じて世界を記述し理解する方法を拡張すること）に導かれ、基礎物理学、量子デバイス、材料、社会応用を結びつける研究を追求しています。'
          }
        </motion.p>
        
        <motion.p
          className={`text-base lg:text-lg font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {language === 'EN'
            ? 'Our activities are organized into the following six tightly connected themes.'
            : '私たちの活動は、以下の6つの密接に関連したテーマに組織されています。'
          }
        </motion.p>
      </motion.div>

      {/* NV Center Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mb-20"
      >
        <NVCenterVisualization language={language} isDark={isDark} />
      </motion.div>

      {/* Research Themes */}
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {researchData.map((theme, index) => (
          <ResearchThemeCard
            key={theme.number}
            theme={theme}
            index={index}
            language={language}
            isDark={isDark}
          />
        ))}
      </motion.div>
    </div>
  </div>
);