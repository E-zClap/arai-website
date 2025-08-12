import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Target, Zap, BookOpen, Lightbulb } from 'lucide-react';

// Ultra-Professional Research Card Component with Expandable Details
export const ResearchCard = ({ research, index, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl overflow-hidden border border-electric-blue-600/20 hover:border-electric-blue-500/50 transition-all duration-700 group shadow-2xl hover:shadow-electric-blue-500/20"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Enhanced Image Section with Premium Overlay */}
      <div className="relative h-72 bg-cover bg-center overflow-hidden">
        <motion.img 
          src={research.image} 
          alt={`${research.title[language] || research.title} - Research Area`}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.8 }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        {/* Premium Research Category Badge */}
        <div className="absolute top-6 right-6">
          <motion.div 
            className="bg-gradient-to-r from-electric-blue-600/90 to-royal-indigo-500/90 backdrop-blur-xl rounded-2xl px-4 py-2 border border-white/20 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                "0 10px 20px rgba(20, 184, 166, 0.3)",
                "0 15px 30px rgba(6, 182, 212, 0.4)", 
                "0 10px 20px rgba(20, 184, 166, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-white text-sm font-bold tracking-wider">
              {research.category}
            </span>
          </motion.div>
        </div>

        {/* Research Status Indicators */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-4 h-4 bg-gradient-to-r from-electric-blue-400 to-royal-indigo-400 rounded-full shadow-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 10px rgba(20, 184, 166, 0.5)",
                    "0 0 20px rgba(16, 185, 129, 0.8)",
                    "0 0 10px rgba(20, 184, 166, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white text-sm font-semibold">
                {research.status}
              </span>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-electric-blue-500/30">
              <span className="text-electric-blue-300 text-xs font-medium">
                {research.fundingLevel}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Content Section */}
      <div className="p-8 space-y-6">
        {/* Research Title with Professional Typography */}
        <div>
          <motion.h3 
            className="text-2xl font-bold text-white mb-4 group-hover:text-electric-blue-300 transition-colors duration-500"
            style={{ fontFamily: '"Inter", system-ui' }}
            whileHover={{ x: 5 }}
          >
            {research.title[language] || research.title}
          </motion.h3>
          
          {/* Dynamic Underline */}
          <motion.div 
            className="h-1 bg-gradient-to-r from-electric-blue-600 via-royal-indigo-500 to-electric-blue-500 rounded-full"
            initial={{ width: "20%" }}
            whileHover={{ width: "40%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Enhanced Description */}
        <motion.p 
          className="text-slate-300 leading-relaxed text-lg"
          style={{ fontFamily: '"Inter", system-ui' }}
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {research.description[language] || research.description}
        </motion.p>
        
        {/* Professional Research Metrics */}
        <div className="grid grid-cols-3 gap-4 py-4">
          <motion.div 
            className="text-center p-3 rounded-xl bg-slate-800/40 border border-slate-700/30"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 184, 166, 0.1)" }}
          >
            <Target size={20} className="text-electric-blue-500 mx-auto mb-2" />
            <div className="text-xs text-slate-400">
              {language === 'EN' ? 'Focus Area' : 'フォーカスエリア'}
            </div>
          </motion.div>
          <motion.div 
            className="text-center p-3 rounded-xl bg-slate-800/40 border border-slate-700/30"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
          >
            <Zap size={20} className="text-royal-indigo-400 mx-auto mb-2" />
            <div className="text-xs text-slate-400">
              {language === 'EN' ? 'Active' : 'アクティブ'}
            </div>
          </motion.div>
          <motion.div 
            className="text-center p-3 rounded-xl bg-slate-800/40 border border-slate-700/30"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
          >
            <BookOpen size={20} className="text-electric-blue-400 mx-auto mb-2" />
            <div className="text-xs text-slate-400">
              {language === 'EN' ? 'Research' : '研究'}
            </div>
          </motion.div>
        </div>

        {/* Expandable Details Section */}
        <motion.div
          className="border-t border-slate-700/50 pt-6"
        >
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-slate-600/30 hover:border-electric-blue-500/40 transition-all duration-300 group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className="text-electric-blue-500" />
              </motion.div>
              <span className="text-white font-semibold">
                {language === 'EN' ? 'Research Details' : '研究詳細'}
              </span>
            </div>
            <ChevronRight size={18} className="text-slate-400 group-hover:text-electric-blue-500 transition-colors" />
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mt-6 space-y-6 overflow-hidden"
              >
                {/* Detailed Description */}
                {research.detailedDescription && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Lightbulb size={18} className="text-yellow-400" />
                      <h4 className="text-lg font-semibold text-white">
                        {language === 'EN' ? 'Detailed Overview' : '詳細概要'}
                      </h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {research.detailedDescription[language] || research.detailedDescription}
                    </p>
                  </motion.div>
                )}

                {/* Methodology */}
                {research.methodology && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Target size={18} className="text-electric-blue-500" />
                      <span>{language === 'EN' ? 'Methodology' : '方法論'}</span>
                    </h4>
                    <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {research.methodology[language] || research.methodology}
                    </div>
                  </motion.div>
                )}

                {/* Applications */}
                {research.applications && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Zap size={18} className="text-royal-indigo-400" />
                      <span>{language === 'EN' ? 'Applications' : '応用'}</span>
                    </h4>
                    <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {research.applications[language] || research.applications}
                    </div>
                  </motion.div>
                )}

                {/* Current Projects */}
                {research.currentProjects && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-electric-blue-900/20 to-royal-indigo-900/20 border border-electric-blue-600/30"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <BookOpen size={18} className="text-emerald-400" />
                      <span>{language === 'EN' ? 'Current Projects' : '現在のプロジェクト'}</span>
                    </h4>
                    <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {research.currentProjects[language] || research.currentProjects}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.article>
  );
};