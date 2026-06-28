import React from 'react';
import { motion } from 'framer-motion';
import { QuantumField } from '../components/animations/QuantumField';
import { NewsCard } from '../components/ui/NewsCard';
import { PageHeader } from '../components/ui/PageHeader';

// Premium News Page Component
export const NewsPage = ({ language, isDark, newsData }) => {
  // Sort by date so the newest item is featured regardless of API ordering.
  const sorted = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featuredNews = sorted[0];
  const regularNews = sorted.slice(1);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <QuantumField density={0.9} />

      <div className="max-w-6xl mx-auto px-6 py-28 sm:py-32 relative z-10">
        <PageHeader
          isDark={isDark}
          eyebrow="Latest"
          title={language === 'EN' ? 'Latest News' : '最新ニュース'}
          subtitle={language === 'EN'
            ? 'Stay updated with the latest developments, publications, and achievements from our laboratory'
            : '私たちの研究室の最新の動向、出版物、成果をご覧ください'}
        />

        {/* Featured News Hero Section */}
        {featuredNews && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <NewsCard 
              news={featuredNews} 
              index={0} 
              language={language} 
              isDark={isDark}
              featured={true}
            />
          </motion.div>
        )}

        {/* Regular News Grid */}
        <div className="grid gap-8">
          {regularNews.map((news, index) => (
            <NewsCard
              key={news.id ?? index}
              news={news}
              index={index + 1} 
              language={language} 
              isDark={isDark}
              featured={false}
            />
          ))}
        </div>

        {/* Load More Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium ${
            isDark
              ? 'bg-white/[0.03] border border-white/10 text-slate-400'
              : 'bg-white border border-slate-200 text-slate-600'
          }`}>
            <span>{language === 'EN' ? 'All news loaded' : 'すべてのニュースを読み込みました'}</span>
            <span className="text-orange-500">✓</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};