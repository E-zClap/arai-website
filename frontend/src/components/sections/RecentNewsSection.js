import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown } from 'lucide-react';
import { NewsCard } from '../ui/NewsCard';

// Enhanced Professional Recent News Section
export const RecentNewsSection = ({ language, isDark, newsData, setCurrentPage }) => {
  // Show only the first 3 news items for the homepage
  const recentNews = newsData.slice(0, 3);

  return (
    <section className={`py-24 px-8 ${
      isDark ? 'bg-dark-gray-900/30' : 'bg-white/95'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center px-6 py-3 rounded-2xl border mb-8 ${
            isDark 
              ? 'backdrop-blur-sm bg-dark-gray-850/60 border-dark-gray-600/30 text-slate-300'
              : 'bg-slate-50 border-slate-200/50 text-slate-700 shadow-lg'
          }`}>
            <BookOpen className="mr-3" size={20} />
            <span className="text-sm font-medium tracking-wider uppercase">
              {language === 'EN' ? 'LATEST UPDATES' : '最新情報'}
            </span>
          </div>

          <h2 className={`text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`} style={{ fontFamily: '"Inter", system-ui' }}>
            {language === 'EN' ? 'Recent News' : '最新ニュース'}
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-orange-500 mx-auto rounded-full mb-6" />
          
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {language === 'EN' 
              ? "Stay updated with the latest breakthroughs, publications, and achievements from our quantum sensing research laboratory."
              : "量子センシング研究室の最新の突破、出版物、成果をご確認ください。"
            }
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="space-y-8 mb-12">
          {recentNews.map((news, index) => (
            <NewsCard 
              key={index} 
              news={news} 
              index={index} 
              language={language} 
              isDark={isDark} 
            />
          ))}
        </div>

        {/* Enhanced View All News Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => setCurrentPage('news')}
            className={`group inline-flex items-center px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-500 hover:to-orange-400 shadow-lg hover:shadow-orange-500/25'
                : 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 shadow-lg hover:shadow-xl'
            }`}
          >
            <span>{language === 'EN' ? 'View All News' : 'すべてのニュースを見る'}</span>
            <ChevronDown 
              size={20} 
              className="ml-2 group-hover:translate-y-1 transition-transform duration-300 rotate-[-90deg]" 
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};