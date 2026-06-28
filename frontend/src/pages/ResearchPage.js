import React from 'react';
import { motion } from 'framer-motion';
import { QuantumField } from '../components/animations/QuantumField';
import { NVCenterVisualization } from '../components/visualizations/NVCenterVisualization';
import { PageHeader } from '../components/ui/PageHeader';
import { Beaker, Cpu, Microscope, Waves, Brain, Sparkles } from 'lucide-react';

// Icon mapping for research themes
const themeIcons = {
  1: Waves,    // Quantum Metrology, Control & Machine Learning (merged)
  2: Cpu,      // Diamond Quantum Electronics
  3: Microscope, // Quantum Materials Sensing & Extreme-Condition Physics
  4: Beaker,   // Quantum Environmental & Infrastructure Sensing
  5: Brain     // Quantum Probability & Social Informatics
};

// Editorial research-theme block: large index numeral, single accent icon,
// topics shown in a clean two-column list (no hide-and-seek expander).
const ResearchThemeCard = ({ theme, index, language, isDark }) => {
  const Icon = themeIcons[theme.number] || Beaker;
  const topics = theme.exampleTopics[language] || [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative rounded-2xl border p-7 sm:p-10 transition-colors ${
        isDark
          ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
          : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
      }`}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-9">
        {/* Index + icon rail */}
        <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-start sm:gap-4">
          <span
            className={`text-5xl font-bold leading-none tabular-nums sm:text-6xl ${
              isDark ? 'text-white/[0.08]' : 'text-slate-900/[0.07]'
            }`}
          >
            {String(theme.number).padStart(2, '0')}
          </span>
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
              isDark
                ? 'border border-orange-500/30 bg-orange-500/10 text-orange-400'
                : 'border border-orange-200 bg-orange-50 text-orange-600'
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            {theme.category}
          </p>
          <h3
            className={`text-2xl font-semibold leading-snug tracking-tight sm:text-[28px] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {theme.title[language]}
          </h3>
          {theme.leadResearchers && (
            <p className={`mt-3 flex items-center gap-2 text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              <span className="h-1 w-1 rounded-full bg-orange-500" />
              {theme.leadResearchers[language]}
            </p>
          )}
          <p className={`mt-5 text-[17px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {theme.overview[language]}
          </p>
          <p className={`mt-4 text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {theme.description[language]}
          </p>

          {topics.length > 0 && (
            <div className={`mt-7 border-t pt-6 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {language === 'EN' ? 'Selected topics' : '主な研究トピック'}
              </p>
              <div className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {topics.map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-orange-500" />
                    <span className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
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
