import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuantumField } from '../components/animations/QuantumField';
import { NVCenterVisualization } from '../components/visualizations/NVCenterVisualization';
import { PageHeader } from '../components/ui/PageHeader';
import { Beaker, Cpu, Microscope, Waves, Brain, ChevronDown, Sparkles } from 'lucide-react';

// Icon mapping for research themes
const themeIcons = {
  1: Waves,    // Quantum Metrology, Control & Machine Learning (merged)
  2: Cpu,      // Diamond Quantum Electronics
  3: Microscope, // Quantum Materials Sensing & Extreme-Condition Physics
  4: Beaker,   // Quantum Environmental & Infrastructure Sensing
  5: Brain     // Quantum Probability & Social Informatics
};

// Refined research theme card: hairline-bordered surface, precise orange accent
const ResearchThemeCard = ({ theme, index, language, isDark }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = themeIcons[theme.number] || Beaker;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Main Card Container */}
      <div
        className={`relative rounded-2xl border transition-colors ${
          isDark
            ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
            : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
        }`}
      >
        <div className="p-6 sm:p-8">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              {/* Number Badge */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-xl text-lg font-semibold ${
                  isDark
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                    : 'bg-orange-50 text-orange-600 border border-orange-200'
                }`}
              >
                {theme.number}
              </div>

              {/* Icon */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                  isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <Icon className={`w-6 h-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`} strokeWidth={2} />
              </div>
            </div>

            {/* Category Chip */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                isDark
                  ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                  : 'bg-orange-50 text-orange-700 border border-orange-200'
              }`}
            >
              {theme.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`text-lg sm:text-xl font-semibold tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {theme.title[language]}
          </h3>

          {/* Lead Researchers (if exists) */}
          {theme.leadResearchers && (
            <div className={`flex items-center gap-2 mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">{theme.leadResearchers[language]}</span>
            </div>
          )}

          {/* Overview */}
          <p className={`text-base leading-relaxed mb-5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {theme.overview[language]}
          </p>

          {/* Description */}
          <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {theme.description[language]}
          </p>

          {/* Example Topics Section with Expand/Collapse */}
          <div className={`border-t pt-6 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center justify-between w-full text-left mb-2 transition-colors ${
                isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'
              }`}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                {language === 'EN' ? 'Research Topics' : '研究トピック'}
                <span className={`text-xs font-normal ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  ({theme.exampleTopics[language].length})
                </span>
              </h4>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-4">
                    {theme.exampleTopics[language].map((topic, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                          isDark
                            ? 'bg-white/[0.02] border-white/10 hover:border-white/20'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                        <span className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {topic}
                        </span>
                      </div>
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
  <div className="relative min-h-screen overflow-hidden">
    <QuantumField density={0.9} />

    <div className="max-w-6xl mx-auto px-6 py-28 sm:py-32 relative z-10">
      <PageHeader
        isDark={isDark}
        eyebrow={language === 'EN' ? 'What we do' : 'What we do'}
        title={language === 'EN' ? 'Research' : '研究'}
        subtitle={
          language === 'EN'
            ? 'Connecting fundamental physics, quantum devices, materials, and societal applications across interconnected research themes.'
            : '基礎物理学、量子デバイス、材料、社会応用を、相互接続された研究テーマを通じて結びつけます。'
        }
      />

      {/* Guiding Question Card */}
      <motion.div
        className={`mb-14 p-6 sm:p-8 rounded-2xl border ${
          isDark
            ? 'bg-white/[0.03] border-white/10'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em] mb-4">
          {language === 'EN' ? 'Our guiding question' : '私たちの問い'}
        </p>
        <p className={`text-xl sm:text-2xl font-semibold tracking-tight leading-relaxed ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {language === 'EN'
            ? 'How can quantum science be transformed from a fragile laboratory curiosity into a shared intellectual and technological infrastructure for society?'
            : '量子科学を、脆弱な実験室の好奇心から、社会のための共有知的・技術的インフラへと変革するにはどうすればよいか？'
          }
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        className="max-w-3xl mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <p className={`text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {language === 'EN'
            ? 'Guided by our Purpose (unlocking the potential of quantum science) and our Vision (extending how we describe and understand the world through quantum informatics), we pursue research that connects fundamental physics, quantum devices, materials, and societal applications.'
            : '私たちの目的（量子科学の可能性を解き放つこと）と私たちのビジョン（量子情報学を通じて世界を記述し理解する方法を拡張すること）に導かれ、基礎物理学、量子デバイス、材料、社会応用を結びつける研究を追求しています。'
          }
        </p>

        {/* Theme Count Chip */}
        <div
          className={`inline-flex items-center gap-2 mt-6 px-3 py-1.5 rounded-full text-sm font-semibold ${
            isDark
              ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
              : 'bg-orange-50 text-orange-700 border border-orange-200'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          {language === 'EN'
            ? `${researchData.length} Interconnected Research Themes`
            : `${researchData.length}つの相互接続された研究テーマ`
          }
        </div>
      </motion.div>

      {/* NV Center Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-20"
      >
        <NVCenterVisualization language={language} isDark={isDark} />
      </motion.div>

      {/* Research Themes */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
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

      {/* Bottom Statement */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div
          className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${
            isDark
              ? 'bg-white/[0.03] border-white/10'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {language === 'EN'
              ? 'Transforming quantum science into societal infrastructure'
              : '量子科学を社会インフラに変革する'
            }
          </span>
        </div>
      </motion.div>
    </div>
  </div>
);
