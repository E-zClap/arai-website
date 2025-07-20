import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { QuantumParticles } from '../components/animations/QuantumParticles';

// Publications Page Component
export const PublicationsPage = ({ language, isDark, publicationsData }) => (
  <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
    isDark ? 'bg-black' : 'bg-gray-50'
  }`}>
    <div className={`absolute inset-0 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
        : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
    }`} />
    <QuantumParticles intensity={30} />
    
    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className={`text-6xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Publications' : '論文・出版物'}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto" />
      </motion.div>

      <div className="grid gap-6">
        {publicationsData.map((pub, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 ${
              isDark 
                ? 'bg-black/40 border-teal-500/20 hover:border-teal-400/40'
                : 'bg-white/70 border-teal-300/30 hover:border-teal-400/50 shadow-lg'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {pub.title[language] || pub.title}
                </h3>
                <p className="text-teal-500 mb-2">{pub.authors}</p>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>{pub.journal} ({pub.year})</p>
              </div>
              <a 
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-600 transition-colors ml-4"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);