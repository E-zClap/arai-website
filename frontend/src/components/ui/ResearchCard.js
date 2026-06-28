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
        duration: 0.6,
        delay: index * 0.1
      }}
      className="bg-white/[0.03] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300 group"
      whileHover={{ y: -4 }}
    >
      {/* Image Section */}
      <div className="relative h-56 bg-cover bg-center overflow-hidden rounded-t-2xl">
        <motion.img
          src={research.image}
          alt={`${research.title[language] || research.title} - Research Area`}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6 }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />

        {/* Research Category Chip */}
        <div className="absolute top-4 right-4">
          <div className="bg-orange-500/10 backdrop-blur-md rounded-lg px-3 py-1.5 border border-orange-500/30">
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-[0.18em]">
              {research.category}
            </span>
          </div>
        </div>

        {/* Research Status Indicators */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-white text-sm font-medium">
                {research.status}
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/10">
              <span className="text-slate-300 text-xs font-medium">
                {research.fundingLevel}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-8 space-y-6">
        {/* Research Title */}
        <div>
          <h3
            className="text-lg sm:text-xl font-semibold tracking-tight text-white mb-3 group-hover:text-orange-500 transition-colors duration-300"
            style={{ fontFamily: '"Inter", system-ui' }}
          >
            {research.title[language] || research.title}
          </h3>

          {/* Thin accent mark */}
          <div className="h-px w-12 bg-orange-500/60 rounded-full" />
        </div>

        {/* Description */}
        <p
          className="text-slate-400 leading-relaxed text-base"
          style={{ fontFamily: '"Inter", system-ui' }}
        >
          {research.description[language] || research.description}
        </p>

        {/* Research Metrics */}
        <div className="grid grid-cols-3 gap-3 py-2">
          <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <Target size={20} className="text-orange-500 mx-auto mb-2" />
            <div className="text-xs text-slate-400">
              {language === 'EN' ? 'Focus Area' : 'フォーカスエリア'}
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <Zap size={20} className="text-orange-500 mx-auto mb-2" />
            <div className="text-xs text-slate-400">
              {language === 'EN' ? 'Active' : 'アクティブ'}
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <BookOpen size={20} className="text-orange-500 mx-auto mb-2" />
            <div className="text-xs text-slate-400">
              {language === 'EN' ? 'Research' : '研究'}
            </div>
          </div>
        </div>

        {/* Expandable Details Section */}
        <div
          className="border-t border-white/10 pt-6"
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-300 group"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className="text-orange-500" />
              </motion.div>
              <span className="text-white font-semibold">
                {language === 'EN' ? 'Research Details' : '研究詳細'}
              </span>
            </div>
            <ChevronRight size={18} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
          </button>

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
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Lightbulb size={18} className="text-orange-500" />
                      <h4 className="text-lg font-semibold text-white">
                        {language === 'EN' ? 'Detailed Overview' : '詳細概要'}
                      </h4>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
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
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Target size={18} className="text-orange-500" />
                      <span>{language === 'EN' ? 'Methodology' : '方法論'}</span>
                    </h4>
                    <div className="text-slate-400 leading-relaxed whitespace-pre-line">
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
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Zap size={18} className="text-orange-500" />
                      <span>{language === 'EN' ? 'Applications' : '応用'}</span>
                    </h4>
                    <div className="text-slate-400 leading-relaxed whitespace-pre-line">
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
                    className="p-6 rounded-2xl bg-orange-500/[0.06] border border-orange-500/30"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <BookOpen size={18} className="text-orange-500" />
                      <span>{language === 'EN' ? 'Current Projects' : '現在のプロジェクト'}</span>
                    </h4>
                    <div className="text-slate-400 leading-relaxed whitespace-pre-line">
                      {research.currentProjects[language] || research.currentProjects}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};