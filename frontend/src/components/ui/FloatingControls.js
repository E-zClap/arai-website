import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe } from 'lucide-react';

// Enhanced Professional Floating Controls
export const FloatingControls = ({ isDark, setIsDark, language, setLanguage }) => {
  return (
    <div className="fixed right-6 top-6 z-40 flex space-x-3">
      {/* Professional Theme Toggle */}
      <motion.button
        onClick={() => setIsDark(!isDark)}
        className={`w-12 h-12 rounded-xl transition-all duration-300 group ${
          isDark 
            ? 'bg-dark-gray-850/80 border-slate-600/50 text-yellow-400 hover:bg-slate-700/90' 
            : 'bg-white border-slate-200/50 text-slate-600 hover:bg-gray-50 shadow-lg'
        } border backdrop-blur-xl flex items-center justify-center`}
        whileHover={{ scale: 1.05, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDark ? (
          <Sun size={18} className="group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </motion.button>

      {/* Professional Language Toggle */}
      <motion.button
        onClick={() => setLanguage(language === 'EN' ? 'JP' : 'EN')}
        className={`w-12 h-12 rounded-xl transition-all duration-300 group ${
          isDark 
            ? 'bg-dark-gray-850/80 border-slate-600/50 text-orange-400 hover:bg-slate-700/90' 
            : 'bg-white border-slate-200/50 text-slate-600 hover:bg-gray-50 shadow-lg'
        } border backdrop-blur-xl flex items-center justify-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Switch to ${language === 'EN' ? 'Japanese' : 'English'}`}
      >
        <div className="flex flex-col items-center">
          <Globe size={14} className="mb-0.5 group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-xs font-bold tracking-wider">{language}</span>
        </div>
      </motion.button>
    </div>
  );
};