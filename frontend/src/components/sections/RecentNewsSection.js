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
      isDark ? 'bg-white/[0.02]' : 'bg-white/95'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <BookOpen className="text-orange-500" size={16} />
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em]">
              {language === 'EN' ? 'Latest Updates' : '最新情報'}
            </span>
          </div>

          <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-5 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`} style={{ fontFamily: '"Inter", system-ui' }}>
            {language === 'EN' ? 'Recent News' : '最新ニュース'}
          </h2>

          <p className={`text-base leading-relaxed max-w-2xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-slate-600'
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

        {/* View All News Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => setCurrentPage('news')}
            className="group inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors"
          >
            <span>{language === 'EN' ? 'View All News' : 'すべてのニュースを見る'}</span>
            <ChevronDown
              size={18}
              className="group-hover:translate-y-0.5 transition-transform duration-300 rotate-[-90deg]"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};