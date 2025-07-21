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
          ? 'bg-slate-900/60 border-teal-500/20 hover:border-teal-400/40 hover:bg-slate-800/70'
          : 'bg-white/80 border-teal-200/30 hover:border-teal-300/50 shadow-lg hover:shadow-xl'
      }`}
    >
      <div className="flex items-start space-x-6">
        {/* Enhanced Visual Indicator */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg" />
          <div className={`w-0.5 h-16 mt-2 ${
            isDark ? 'bg-slate-700' : 'bg-slate-200'
          }`} />
        </div>
        
        <div className="flex-1 space-y-4">
          {/* Enhanced Date and Source */}
          <div className="flex items-center justify-between">
            <div className={`text-sm flex items-center ${
              isDark ? 'text-teal-300' : 'text-teal-600'
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
                ? 'bg-slate-800/50 text-slate-300 border border-slate-600/30'
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
                      ? 'bg-teal-900/40 text-teal-300 border border-teal-500/30 hover:bg-teal-800/50'
                      : 'bg-teal-50 text-teal-700 border border-teal-200/50 hover:bg-teal-100'
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
              ? 'text-white group-hover:text-teal-300' 
              : 'text-slate-900 group-hover:text-teal-700'
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
                    ? 'text-teal-400 hover:text-white hover:bg-teal-600/20 border border-teal-500/30 hover:border-teal-400/50'
                    : 'text-teal-600 hover:text-teal-800 hover:bg-teal-50 border border-teal-200/50 hover:border-teal-300/70'
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