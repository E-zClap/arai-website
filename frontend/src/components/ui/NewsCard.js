import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Award, BookOpen, Users, MapPin, Trophy, Zap, Star } from 'lucide-react';

// Get icon based on tags
const getNewsIcon = (tags) => {
  if (!tags || tags.length === 0) return Zap;
  const firstTag = tags[0].toLowerCase();
  if (firstTag.includes('award') || firstTag.includes('prize')) return Award;
  if (firstTag.includes('publication') || firstTag.includes('paper')) return BookOpen;
  if (firstTag.includes('team') || firstTag.includes('welcome')) return Users;
  if (firstTag.includes('visit') || firstTag.includes('relocation')) return MapPin;
  if (firstTag.includes('sport') || firstTag.includes('tournament')) return Trophy;
  return Star;
};

// Premium News Card Component with Featured Support
export const NewsCard = ({ news, index, language, isDark = true, featured = false }) => {
  const tags = news.tags || [];
  const Icon = getNewsIcon(tags);
  
  if (featured) {
    // Featured Hero Card Design
    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative backdrop-blur-xl rounded-3xl p-10 border overflow-hidden transition-all duration-500 group ${
          isDark 
            ? 'bg-gradient-to-br from-dark-gray-900/80 to-dark-gray-850/80 border-orange-500/40 hover:border-orange-400/60'
            : 'bg-gradient-to-br from-white to-orange-50/30 border-orange-400/50 hover:border-orange-500/70 shadow-2xl hover:shadow-3xl'
        }`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10" />
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Featured badge */}
        <div className="absolute top-0 right-0 mt-6 mr-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
              isDark 
                ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white'
                : 'bg-gradient-to-r from-orange-500 to-orange-400 text-white'
            } shadow-lg`}
          >
            <span className="flex items-center gap-2">
              <Star size={14} fill="currentColor" />
              {language === 'EN' ? 'Featured' : '注目'}
            </span>
          </motion.div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start gap-8">
            {/* Large Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`flex-shrink-0 p-6 rounded-2xl ${
                isDark 
                  ? 'bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-500/30'
                  : 'bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-300/50'
              } shadow-xl`}
            >
              <Icon className="text-orange-500" size={48} />
            </motion.div>

            <div className="flex-1 space-y-5">
              {/* Date with enhanced styling */}
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
                  isDark 
                    ? 'bg-dark-gray-850/50 border border-orange-600/20'
                    : 'bg-white/80 border border-orange-300/30'
                }`}>
                  <Calendar size={18} className="text-orange-500" />
                  <time dateTime={news.date} className={`text-sm font-semibold ${
                    isDark ? 'text-orange-300' : 'text-orange-700'
                  }`}>
                    {new Date(news.date).toLocaleDateString(language === 'EN' ? 'en-US' : 'ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>

              {/* Enhanced Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      whileHover={{ scale: 1.05 }}
                      className={`px-4 py-2 text-sm rounded-xl font-medium transition-all ${
                        tagIndex === 0 && isDark
                          ? 'bg-gradient-to-r from-orange-600/30 to-orange-500/20 text-orange-300 border border-orange-500/50'
                          : isDark
                          ? 'bg-dark-gray-850/50 text-slate-300 border border-dark-gray-700/50 hover:border-orange-600/40'
                          : 'bg-orange-100 text-orange-800 border border-orange-300/60 hover:border-orange-400/80'
                      }`}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              )}

              {/* Large Title */}
              <h2 className={`text-3xl font-bold leading-tight transition-colors ${
                isDark 
                  ? 'text-white group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-orange-300 group-hover:bg-clip-text group-hover:text-transparent'
                  : 'text-slate-900 group-hover:text-orange-700'
              }`} style={{ fontFamily: '"Inter", system-ui' }}>
                {news.title[language] || news.title}
              </h2>

              {/* Read More Button - Enhanced */}
              {news.link && news.link !== '#' && (
                <div className="pt-4">
                  <motion.a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-500 hover:to-orange-400 shadow-lg hover:shadow-orange-500/50'
                        : 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 shadow-xl hover:shadow-2xl'
                    }`}
                  >
                    <span>{language === 'EN' ? 'Read Full Article' : '全文を読む'}</span>
                    <ExternalLink size={18} />
                  </motion.a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-orange-500/30 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-orange-500/30 rounded-br-3xl" />
      </motion.article>
    );
  }

  // Regular Card Design - Enhanced
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className={`relative backdrop-blur-xl rounded-2xl p-8 border overflow-hidden transition-all duration-300 group ${
        isDark 
          ? 'bg-dark-gray-900/70 border-orange-600/20 hover:border-orange-500/40 hover:bg-dark-gray-850/80'
          : 'bg-white/90 border-orange-300/30 hover:border-orange-400/60 shadow-lg hover:shadow-xl'
      }`}
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5" />
      </div>

      {/* Side accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-600 via-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex items-start gap-6">
        {/* Enhanced Visual Indicator with Icon */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 180 }}
            className={`p-3 rounded-xl ${
              isDark 
                ? 'bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-500/30'
                : 'bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-300/50'
            } shadow-lg`}
          >
            <Icon className="text-orange-500" size={24} />
          </motion.div>
          <div className={`w-0.5 h-16 mt-3 ${
            isDark ? 'bg-gradient-to-b from-dark-gray-700 to-transparent' : 'bg-gradient-to-b from-slate-300 to-transparent'
          }`} />
        </div>
        
        <div className="flex-1 space-y-4">
          {/* Enhanced Date and Category */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              isDark 
                ? 'bg-dark-gray-850/50 border border-orange-600/20'
                : 'bg-orange-50/50 border border-orange-200/50'
            }`}>
              <Calendar size={14} className="text-orange-500" />
              <time dateTime={news.date} className={`text-xs font-semibold ${
                isDark ? 'text-orange-300' : 'text-orange-700'
              }`}>
                {new Date(news.date).toLocaleDateString(language === 'EN' ? 'en-US' : 'ja-JP', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <span className={`px-3 py-1 text-xs rounded-lg font-medium ${
              isDark
                ? 'bg-dark-gray-850/70 text-slate-400 border border-dark-gray-700/50'
                : 'bg-slate-50 text-slate-600 border border-slate-200/50'
            }`}>
              {language === 'EN' ? 'Academic News' : 'アカデミック'}
            </span>
          </div>
          
          {/* Enhanced Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                    tagIndex === 0 && isDark
                      ? 'bg-blue-accent/15 text-blue-accent-light border border-blue-accent/30 hover:bg-blue-accent/25'
                      : isDark
                      ? 'bg-orange-900/30 text-orange-400 border border-orange-700/30 hover:bg-orange-900/50'
                      : 'bg-orange-50 text-orange-700 border border-orange-200/50 hover:bg-orange-100'
                  }`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
          
          {/* Enhanced Title */}
          <h3 className={`text-xl font-semibold leading-relaxed transition-all duration-300 ${
            isDark 
              ? 'text-white group-hover:text-orange-300' 
              : 'text-slate-900 group-hover:text-orange-700'
          }`} style={{ fontFamily: '"Inter", system-ui' }}>
            {news.title[language] || news.title}
          </h3>
          
          {/* Enhanced Read More Link */}
          {news.link && news.link !== '#' && (
            <div className="pt-2">
              <motion.a 
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isDark 
                    ? 'text-orange-400 hover:text-white hover:bg-orange-600/20 border border-orange-600/30 hover:border-orange-500/50'
                    : 'text-orange-600 hover:text-orange-800 hover:bg-orange-50 border border-orange-300/50 hover:border-orange-400/70'
                }`}
              >
                <span>{language === 'EN' ? 'Read Full Article' : '全文を読む'}</span>
                <ExternalLink size={14} />
              </motion.a>
            </div>
          )}
        </div>
      </div>

      {/* Decorative corner dot */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-orange-500/30 group-hover:bg-orange-500 transition-colors duration-300" />
    </motion.article>
  );
};