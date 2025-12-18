import React from 'react';
import { motion } from 'framer-motion';
import { QuantumParticles } from '../components/animations/QuantumParticles';
import { NVCenterVisualization } from '../components/visualizations/NVCenterVisualization';
import { Beaker, Cpu, Microscope, Waves, Users, Brain } from 'lucide-react';

// Icon mapping for research themes
const themeIcons = {
  1: Waves,
  2: Cpu,
  3: Microscope,
  4: Beaker,
  5: Users,
  6: Brain
};

// Enhanced Research Theme Card Component
const ResearchThemeCard = ({ theme, index, language, isDark }) => {
  const Icon = themeIcons[theme.number] || Beaker;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] ${
        isDark
          ? 'bg-dark-gray-900/60 border-orange-600/20 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10'
          : 'bg-white/80 border-orange-200/50 hover:border-orange-300/70 hover:shadow-2xl hover:shadow-orange-200/20'
      }`}
    >
      {/* Accent Border Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8 lg:p-10">
        {/* Header with Number and Icon */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Theme Number Badge */}
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg ${
              isDark
                ? 'bg-gradient-to-br from-orange-600 to-orange-500 text-white'
                : 'bg-gradient-to-br from-orange-500 to-orange-400 text-white'
            } shadow-lg`}>
              {theme.number}
            </div>
            
            {/* Icon */}
            <div className={`p-3 rounded-xl ${
              isDark ? 'bg-blue-500/10' : 'bg-blue-50'
            }`}>
              <Icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>
          
          {/* Category Badge */}
          <span className={`px-4 py-2 rounded-full text-xs font-medium ${
            isDark
              ? 'bg-slate-800/80 text-slate-300 border border-slate-700/50'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
            {theme.category}
          </span>
        </div>
        
        {/* Title */}
        <h3 className={`text-2xl lg:text-3xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`} style={{ fontFamily: '"Inter", system-ui' }}>
          {theme.title[language]}
        </h3>
        
        {/* Overview */}
        <p className={`text-base lg:text-lg mb-6 leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {theme.overview[language]}
        </p>
        
        {/* Description */}
        <p className={`text-sm lg:text-base mb-8 leading-relaxed ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {theme.description[language]}
        </p>
        
        {/* Example Topics */}
        <div className={`border-t pt-6 ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <h4 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
            isDark ? 'text-orange-400' : 'text-orange-600'
          }`}>
            {language === 'EN' ? 'Example Topics' : '例題'}
          </h4>
          <ul className="space-y-3">
            {theme.exampleTopics[language].map((topic, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  isDark ? 'bg-orange-500' : 'bg-orange-600'
                }`} />
                <span className={`text-sm lg:text-base leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {topic}
                </span>
              </li>
            ))}
          </ul>
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