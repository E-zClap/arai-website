import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

// Profile Page Component for Team Members
export const ProfilePage = ({ profileData, language, isDark, setCurrentPage }) => {
  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {language === 'EN' ? 'Profile not found' : 'プロフィールが見つかりません'}
          </h1>
          <button
            onClick={() => setCurrentPage('team')}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl"
          >
            {language === 'EN' ? 'Back to Team' : 'チームに戻る'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => setCurrentPage('team')}
          className={`mb-8 inline-flex items-center px-4 py-2 rounded-xl transition-all duration-300 ${
            isDark 
              ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
              : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-800'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft size={18} className="mr-2" />
          {language === 'EN' ? 'Back to Team' : 'チームに戻る'}
        </motion.button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
            isDark 
              ? 'bg-black/40 border-teal-500/20'
              : 'bg-white/70 border-teal-300/30 shadow-xl'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-teal-500/30">
                <img 
                  src={profileData.image} 
                  alt={profileData.name[language]}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent" />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className={`text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {profileData.name[language]}
              </h1>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600/20 to-cyan-600/20 rounded-full border border-teal-500/30 mb-6">
                <div className="w-2 h-2 bg-teal-400 rounded-full mr-2" />
                <span className="text-teal-300 font-medium">
                  {profileData.position[language]}
                </span>
              </div>
              
              <div className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {profileData.education[language].map((edu, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3 flex-shrink-0" />
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
              isDark 
                ? 'bg-black/40 border-teal-500/20'
                : 'bg-white/70 border-teal-300/30 shadow-xl'
            }`}
          >
            <h2 className={`text-3xl font-bold mb-8 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {language === 'EN' ? 'Career Timeline' : 'キャリア・タイムライン'}
            </h2>
            
            <div className="space-y-6">
              {profileData.careerTimeline[language].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  className={`flex gap-6 p-6 rounded-2xl border ${
                    isDark 
                      ? 'bg-slate-800/40 border-slate-700/50' 
                      : 'bg-slate-50/80 border-slate-200/50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {item.year.split('-')[0]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`text-xl font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item.position}
                    </h4>
                    <p className="text-teal-500 mb-2 font-medium">{item.institution}</p>
                    <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {item.description}
                    </p>
                    <div className="mt-3 text-sm text-slate-400">
                      {item.year}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Research Evolution */}
        {profileData.researchEvolution && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
              isDark 
                ? 'bg-black/40 border-teal-500/20'
                : 'bg-white/70 border-teal-300/30 shadow-xl'
            }`}
          >
            <h2 className={`text-3xl font-bold mb-8 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {language === 'EN' ? 'Research Evolution' : '研究の発展'}
            </h2>
            
            <div className="space-y-6">
              {profileData.researchEvolution[language].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  className={`p-6 rounded-2xl border ${
                    isDark 
                      ? 'bg-slate-800/40 border-slate-700/50' 
                      : 'bg-slate-50/80 border-slate-200/50'
                  }`}
                >
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDark ? 'text-teal-300' : 'text-teal-700'
                  }`}>
                    {item.period}
                  </h4>
                  <div className={`text-sm font-medium mb-2 ${
                    isDark ? 'text-cyan-400' : 'text-cyan-600'
                  }`}>
                    {item.focus}
                  </div>
                  <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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