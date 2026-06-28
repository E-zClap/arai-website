import React from 'react';
import { motion } from 'framer-motion';
import { QuantumField } from '../components/animations/QuantumField';
import { NewsCard } from '../components/ui/NewsCard';
import { Sparkles, TrendingUp } from 'lucide-react';

// Premium News Page Component
export const NewsPage = ({ language, isDark, newsData }) => {
  // Sort by date so the newest item is featured regardless of API ordering.
  const sorted = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featuredNews = sorted[0];
  const regularNews = sorted.slice(1);
  
  return (
    <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-dark-gray-950' : 'bg-gray-50'
    }`}>
      {/* Enhanced Background */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-orange-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-orange-100/40'
      }`} />
      
      {/* Animated gradient blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <QuantumField density={0.9} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Title with decorative elements */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-orange-500" size={32} />
            </motion.div>
            <h1 className={`text-7xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent`}>
              {language === 'EN' ? 'Latest News' : '最新ニュース'}
            </h1>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp className="text-orange-500" size={32} />
            </motion.div>
          </div>
          
          {/* Enhanced underline with animation */}
          <div className="relative w-40 h-1.5 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-transparent via-orange-600 to-transparent">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'} max-w-2xl mx-auto`}>
            {language === 'EN' 
              ? 'Stay updated with the latest developments, publications, and achievements from our laboratory'
              : '私たちの研究室の最新の動向、出版物、成果をご覧ください'}
          </p>
        </motion.div>

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
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium ${
            isDark 
              ? 'bg-dark-gray-900/60 border border-orange-600/30 text-orange-300'
              : 'bg-white/80 border border-orange-300/50 text-orange-600'
          }`}>
            <span>{language === 'EN' ? 'All news loaded' : 'すべてのニュースを読み込みました'}</span>
            <span className="text-orange-500">✓</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};