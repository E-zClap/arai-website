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
    // Featured Card - larger card on the same hairline surface
    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative rounded-2xl p-8 sm:p-10 border transition-colors duration-300 group ${
          isDark
            ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
            : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
        }`}
      >
        {/* Featured eyebrow */}
        <div className="absolute top-8 right-8 sm:top-10 sm:right-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
            <Star size={12} fill="currentColor" />
            {language === 'EN' ? 'Featured' : '注目'}
          </span>
        </div>

        <div className="relative">
          <div className="flex items-start gap-6 sm:gap-8">
            {/* Large Icon */}
            <div
              className={`flex-shrink-0 p-5 rounded-2xl ${
                isDark
                  ? 'bg-orange-500/10 border border-orange-500/30'
                  : 'bg-orange-50 border border-orange-200'
              }`}
            >
              <Icon className="text-orange-500" size={40} />
            </div>

            <div className="flex-1 space-y-5">
              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-orange-500" />
                <time dateTime={news.date} className={`text-sm font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {new Date(news.date).toLocaleDateString(language === 'EN' ? 'en-US' : 'ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs rounded-lg font-medium bg-orange-500/10 text-orange-500 border border-orange-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Large Title - solid color */}
              <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`} style={{ fontFamily: '"Inter", system-ui' }}>
                {news.title[language] || news.title}
              </h2>

              {/* Read More Button - single solid CTA */}
              {news.link && news.link !== '#' && (
                <div className="pt-2">
                  <a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors"
                  >
                    <span>{language === 'EN' ? 'Read Full Article' : '全文を読む'}</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Regular Card Design
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`relative rounded-2xl p-6 sm:p-8 border transition-colors duration-300 group ${
        isDark
          ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
          : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
      }`}
    >
      <div className="relative flex items-start gap-5 sm:gap-6">
        {/* Visual Indicator with Icon */}
        <div
          className={`flex-shrink-0 p-3 rounded-xl ${
            isDark
              ? 'bg-orange-500/10 border border-orange-500/30'
              : 'bg-orange-50 border border-orange-200'
          }`}
        >
          <Icon className="text-orange-500" size={22} />
        </div>

        <div className="flex-1 space-y-4">
          {/* Date and Category */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-orange-500" />
              <time dateTime={news.date} className={`text-xs font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {new Date(news.date).toLocaleDateString(language === 'EN' ? 'en-US' : 'ja-JP', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            </div>

            <span className={`px-2.5 py-1 text-xs rounded-lg font-medium ${
              isDark
                ? 'bg-white/5 text-slate-400 border border-white/10'
                : 'bg-slate-50 text-slate-600 border border-slate-200'
            }`}>
              {language === 'EN' ? 'Academic News' : 'アカデミック'}
            </span>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-xs rounded-lg font-medium bg-orange-500/10 text-orange-500 border border-orange-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title - solid color */}
          <h3 className={`text-lg sm:text-xl font-semibold tracking-tight leading-snug ${
            isDark ? 'text-white' : 'text-slate-900'
          }`} style={{ fontFamily: '"Inter", system-ui' }}>
            {news.title[language] || news.title}
          </h3>

          {/* Read More Link - orange accent */}
          {news.link && news.link !== '#' && (
            <div className="pt-1">
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors"
              >
                <span>{language === 'EN' ? 'Read Full Article' : '全文を読む'}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};
