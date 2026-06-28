import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Users,
  Calendar,
  Award,
  Quote,
  TrendingUp,
  FileText
} from 'lucide-react';

// Ultra-Professional Publication Card Component
export const PublicationCard = ({ publication, index, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Very High':
        return 'from-orange-600 to-orange-500';
      case 'High':
        return 'from-orange-500 to-orange-400';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Peer-Reviewed':
        return <Award size={14} className="text-orange-500" />;
      case 'Preprint':
        return <FileText size={14} className="text-orange-500" />;
      default:
        return <BookOpen size={14} className="text-slate-400" />;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut"
      }}
      className="bg-white/[0.03] rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors duration-300 group"
    >
      {/* Publication Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {/* Publication Type Chip */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-semibold">
            {getTypeIcon(publication.type)}
            {publication.type}
          </span>

          {/* Impact Level Chip */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold">
            <TrendingUp size={12} className="text-orange-500" />
            {publication.impact} Impact
          </span>
        </div>

        {/* Citation Count */}
        <div className="text-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex-shrink-0">
          <div className="text-white font-semibold text-lg leading-tight">{publication.citations}</div>
          <div className="text-slate-500 text-xs">
            {language === 'EN' ? 'Citations' : '引用'}
          </div>
        </div>
      </div>

      {/* Publication Title */}
      <h3
        className="text-lg sm:text-xl font-semibold tracking-tight text-white mb-5 leading-snug"
        style={{ fontFamily: '"Inter", system-ui' }}
      >
        {publication.title[language] || publication.title}
      </h3>

      {/* Publication Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Authors */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <Users size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
              {language === 'EN' ? 'Authors' : '著者'}
            </div>
            <div className="text-slate-400 text-sm leading-relaxed">{publication.authors}</div>
          </div>
        </div>

        {/* Journal & Year */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <Calendar size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
              {language === 'EN' ? 'Publication' : '出版'}
            </div>
            <div className="text-slate-400 text-sm leading-relaxed">
              {publication.journal} · {publication.year}
            </div>
          </div>
        </div>
      </div>

      {/* Journal Details */}
      {(publication.volume || publication.pages) && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          {publication.volume && (
            <div className="text-sm">
              <span className="text-slate-500">Vol.</span>
              <span className="text-slate-300 font-medium ml-1">{publication.volume}</span>
              {publication.issue && (
                <>
                  <span className="text-slate-500 ml-2">Issue</span>
                  <span className="text-slate-300 font-medium ml-1">{publication.issue}</span>
                </>
              )}
            </div>
          )}
          {publication.pages && (
            <div className="text-sm">
              <span className="text-slate-500">Pages:</span>
              <span className="text-slate-300 font-medium ml-1">{publication.pages}</span>
            </div>
          )}
          {publication.doi && (
            <div className="text-sm">
              <span className="text-slate-500">DOI:</span>
              <span className="text-slate-300 font-medium ml-1 font-mono text-xs">{publication.doi}</span>
            </div>
          )}
        </div>
      )}

      {/* Category & Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-semibold">
          {publication.category}
        </span>

        {publication.link && publication.link !== '#' && (
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors"
          >
            <span>
              {language === 'EN' ? 'View Paper' : '論文を見る'}
            </span>
            <ExternalLink size={16} className="text-orange-500" />
          </a>
        )}
      </div>

      {/* Expandable Abstract Section */}
      {publication.abstract && (
        <div className="border-t border-white/10 pt-5">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors group/abstract"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} className="text-orange-500" />
              </motion.div>
              <Quote size={16} className="text-orange-500" />
              <span className="text-white text-sm font-semibold">
                {language === 'EN' ? 'Abstract' : '要約'}
              </span>
            </div>
            <ChevronRight size={16} className="text-slate-500 group-hover/abstract:text-orange-500 transition-colors" />
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-start gap-4">
                    <Quote size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-slate-400 leading-relaxed text-sm">
                        {publication.abstract[language] || publication.abstract}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.article>
  );
};