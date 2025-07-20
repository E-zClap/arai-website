import React from 'react';
import { motion } from 'framer-motion';
import { QuantumParticles } from '../components/animations/QuantumParticles';
import { NewsCard } from '../components/ui/NewsCard';

// News Page Component
export const NewsPage = ({ language, isDark, newsData }) => (
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
          {language === 'EN' ? 'Latest News' : '最新ニュース'}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto" />
      </motion.div>

      <div className="grid gap-8">
        {newsData.map((news, index) => (
          <NewsCard key={index} news={news} index={index} language={language} isDark={isDark} />
        ))}
      </div>
    </div>
  </div>
);