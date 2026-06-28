import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';

// Profile Page Component for Team Members
export const ProfilePage = ({ profileData, language, isDark, setCurrentPage }) => {
  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {language === 'EN' ? 'Profile not found' : 'プロフィールが見つかりません'}
          </h1>
          <button
            onClick={() => setCurrentPage('team')}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors"
          >
            {language === 'EN' ? 'Back to Team' : 'チームに戻る'}
          </button>
        </div>
      </div>
    );
  }

  const cardClass = isDark
    ? 'bg-white/[0.03] border border-white/10'
    : 'bg-white border border-slate-200 shadow-sm';

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 py-28 sm:py-32 relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => setCurrentPage('team')}
          className={`mb-10 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
            isDark
              ? 'border-white/15 bg-white/5 hover:bg-white/10 text-white'
              : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft size={16} />
          {language === 'EN' ? 'Back to Team' : 'チームに戻る'}
        </motion.button>

        <PageHeader
          isDark={isDark}
          eyebrow={language === 'EN' ? 'Principal investigator' : '主任研究者'}
          title={profileData.name[language]}
          subtitle={profileData.position[language]}
        />

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl p-6 sm:p-8 mb-12 ${cardClass}`}
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative w-56 h-56 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={profileData.image}
                  alt={profileData.name[language]}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                  }}
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/30 px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em]">
                  {profileData.position[language]}
                </span>
              </div>

              <div className={`space-y-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {profileData.education[language].map((edu, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 flex-shrink-0" />
                    <span>{edu}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Career Timeline */}
        {profileData.careerTimeline && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em] mb-3">
              {language === 'EN' ? 'Career' : 'キャリア'}
            </p>
            <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-8 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {language === 'EN' ? 'Career Timeline' : 'キャリア・タイムライン'}
            </h2>

            {/* Thin orange spine timeline */}
            <div className="relative pl-8">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-orange-500/30" />
              <div className="space-y-5">
                {profileData.careerTimeline[language].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * idx }}
                    className="relative"
                  >
                    {/* Spine node */}
                    <div className="absolute -left-[26px] top-6 w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-orange-500/10" />
                    <div className={`rounded-2xl p-6 transition-colors ${cardClass} ${isDark ? 'hover:border-white/20' : 'hover:border-slate-300'}`}>
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <h3 className={`text-lg sm:text-xl font-semibold tracking-tight ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {item.position}
                        </h3>
                        <span className="flex-shrink-0 text-sm font-semibold text-orange-500">
                          {item.year}
                        </span>
                      </div>
                      <p className={`text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {item.institution}
                      </p>
                      <p className={`text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Research Evolution */}
        {profileData.researchEvolution && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em] mb-3">
              {language === 'EN' ? 'Research' : '研究'}
            </p>
            <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-8 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {language === 'EN' ? 'Research Evolution' : '研究の発展'}
            </h2>

            <div className="space-y-5">
              {profileData.researchEvolution[language].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * idx }}
                  className={`rounded-2xl p-6 transition-colors ${cardClass} ${isDark ? 'hover:border-white/20' : 'hover:border-slate-300'}`}
                >
                  <h3 className={`text-lg sm:text-xl font-semibold tracking-tight mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {item.period}
                  </h3>
                  <div className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em] mb-3">
                    {item.focus}
                  </div>
                  <p className={`text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
