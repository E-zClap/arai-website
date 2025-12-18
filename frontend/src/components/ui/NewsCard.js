import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';

// Enhanced Professional News Card Component
export const NewsCard = ({ news, index, language, isDark = true }) => {
  const tags = news.tags || [];
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 group ${
        isDark 
          ? 'bg-dark-gray-900/60 border-orange-600/20 hover:border-orange-500/40 hover:bg-dark-gray-850/70'
          : 'bg-white/80 border-orange-300/30 hover:border-orange-400/50 shadow-lg hover:shadow-xl'
      }`}
    >
      <div className="flex items-start space-x-6">
        {/* Enhanced Visual Indicator */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full shadow-lg" />
          <div className={`w-0.5 h-16 mt-2 ${
            isDark ? 'bg-slate-700' : 'bg-slate-200'
          }`} />
        </div>
        
        <div className="flex-1 space-y-4">
          {/* Enhanced Date and Source */}
          <div className="flex items-center justify-between">
            <div className={`text-sm flex items-center ${
              isDark ? 'text-orange-300' : 'text-orange-600'
            }`}>
              <Calendar size={16} className="mr-2" />
              <time dateTime={news.date} className="font-medium">
                {new Date(news.date).toLocaleDateString(language === 'EN' ? 'en-US' : 'ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            {/* Publication Type Badge */}
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
              isDark
                ? 'bg-dark-gray-850/50 text-slate-300 border border-slate-600/30'
                : 'bg-slate-100 text-slate-600 border border-slate-200/50'
            }`}>
              {language === 'EN' ? 'Academic News' : 'アカデミック・ニュース'}
            </span>
          </div>
          
          {/* Enhanced Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                    isDark
                      ? 'bg-orange-900/40 text-orange-300 border border-orange-600/30 hover:bg-orange-800/50'
                      : 'bg-orange-50 text-orange-700 border border-orange-300/50 hover:bg-orange-100'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Enhanced Title */}
          <h3 className={`text-xl font-semibold leading-relaxed transition-colors ${
            isDark 
              ? 'text-white group-hover:text-orange-300' 
              : 'text-slate-900 group-hover:text-orange-700'
          }`} style={{ fontFamily: '"Inter", system-ui' }}>
            {news.title[language] || news.title}
          </h3>
          
          {/* Enhanced Read More Link - Only show if there's a valid link */}
          {news.link && news.link !== '#' && (
            <div className="pt-2">
              <a 
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isDark 
                    ? 'text-orange-400 hover:text-white hover:bg-orange-600/20 border border-orange-600/30 hover:border-orange-500/50'
                    : 'text-orange-600 hover:text-orange-800 hover:bg-orange-50 border border-orange-300/50 hover:border-orange-400/70'
                }`}
              >
                <span>{language === 'EN' ? 'Read Full Article' : '全文を読む'}</span>
                <ExternalLink size={14} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};