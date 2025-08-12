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
        return 'from-electric-blue-600 to-royal-indigo-500';
      case 'High':
        return 'from-electric-blue-500 to-royal-indigo-400';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Peer-Reviewed':
        return <Award size={16} className="text-electric-blue-400" />;
      case 'Preprint':
        return <FileText size={16} className="text-royal-indigo-400" />;
      default:
        return <BookOpen size={16} className="text-slate-400" />;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-8 border border-electric-blue-600/20 hover:border-electric-blue-500/50 transition-all duration-700 group shadow-2xl hover:shadow-electric-blue-500/20"
      whileHover={{ y: -5, scale: 1.01 }}
    >
      {/* Publication Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          {/* Publication Type Badge */}
          <motion.div 
            className={`flex items-center space-x-2 px-4 py-2 rounded-2xl bg-gradient-to-r ${getImpactColor(publication.impact)} shadow-lg`}
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                "0 5px 15px rgba(30, 64, 175, 0.3)",
                "0 8px 25px rgba(30, 64, 175, 0.4)",
                "0 5px 15px rgba(30, 64, 175, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {getTypeIcon(publication.type)}
            <span className="text-white text-sm font-bold">
              {publication.type}
            </span>
          </motion.div>

          {/* Impact Level */}
          <motion.div 
            className="px-3 py-1.5 rounded-xl bg-slate-800/50 border border-slate-700/40"
            whileHover={{ backgroundColor: "rgba(30, 64, 175, 0.1)" }}
          >
            <div className="flex items-center space-x-2">
              <TrendingUp size={14} className="text-electric-blue-500" />
              <span className="text-electric-blue-300 text-xs font-medium">
                {publication.impact} Impact
              </span>
            </div>
          </motion.div>
        </div>

        {/* Citation Count */}
        <motion.div 
          className="text-center p-3 rounded-2xl bg-slate-800/40 border border-slate-700/30"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
        >
          <div className="text-cyan-400 font-bold text-lg">{publication.citations}</div>
          <div className="text-slate-400 text-xs">
            {language === 'EN' ? 'Citations' : '引用'}
          </div>
        </motion.div>
      </div>

      {/* Publication Title */}
      <motion.h3 
        className="text-xl font-bold text-white mb-4 leading-relaxed group-hover:text-teal-200 transition-colors duration-500"
        style={{ fontFamily: '"Inter", system-ui' }}
        whileHover={{ x: 5 }}
      >
        {publication.title[language] || publication.title}
      </motion.h3>

      {/* Publication Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Authors */}
        <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/30">
          <Users size={18} className="text-teal-400 mt-1 flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold text-slate-300 mb-1">
              {language === 'EN' ? 'Authors' : '著者'}
            </div>
            <div className="text-slate-400 text-sm">{publication.authors}</div>
          </div>
        </div>

        {/* Journal & Year */}
        <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/30">
          <Calendar size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold text-slate-300 mb-1">
              {language === 'EN' ? 'Publication' : '出版'}
            </div>
            <div className="text-slate-400 text-sm">
              {publication.journal} ({publication.year})
            </div>
          </div>
        </div>
      </div>

      {/* Journal Details */}
      {(publication.volume || publication.pages) && (
        <div className="flex items-center space-x-6 mb-6 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/20">
          {publication.volume && (
            <div className="text-sm">
              <span className="text-slate-400">Vol.</span>
              <span className="text-slate-300 font-medium ml-1">{publication.volume}</span>
              {publication.issue && (
                <>
                  <span className="text-slate-400 ml-2">Issue</span>
                  <span className="text-slate-300 font-medium ml-1">{publication.issue}</span>
                </>
              )}
            </div>
          )}
          {publication.pages && (
            <div className="text-sm">
              <span className="text-slate-400">Pages:</span>
              <span className="text-slate-300 font-medium ml-1">{publication.pages}</span>
            </div>
          )}
          {publication.doi && (
            <div className="text-sm">
              <span className="text-slate-400">DOI:</span>
              <span className="text-slate-300 font-medium ml-1 font-mono text-xs">{publication.doi}</span>
            </div>
          )}
        </div>
      )}

      {/* Category & Link */}
      <div className="flex items-center justify-between mb-6">
        <motion.span 
          className="px-4 py-2 bg-gradient-to-r from-teal-900/40 to-cyan-900/40 text-teal-300 rounded-full text-sm font-medium border border-teal-500/30"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 184, 166, 0.2)" }}
        >
          {publication.category}
        </motion.span>

        {publication.link && publication.link !== '#' && (
          <motion.a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-teal-600/20 rounded-2xl border border-slate-700/40 hover:border-teal-500/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-slate-300 text-sm font-medium">
              {language === 'EN' ? 'View Paper' : '論文を見る'}
            </span>
            <ExternalLink size={16} className="text-teal-400" />
          </motion.a>
        )}
      </div>

      {/* Expandable Abstract Section */}
      {publication.abstract && (
        <motion.div className="border-t border-slate-700/50 pt-6">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-slate-600/30 hover:border-teal-500/40 transition-all duration-300 group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className="text-teal-400" />
              </motion.div>
              <Quote size={18} className="text-cyan-400" />
              <span className="text-white font-semibold">
                {language === 'EN' ? 'Abstract' : '要約'}
              </span>
            </div>
            <ChevronRight size={18} className="text-slate-400 group-hover:text-teal-400 transition-colors" />
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mt-6 overflow-hidden"
              >
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-800/40 border border-slate-700/40"
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Quote size={24} className="text-teal-400 flex-shrink-0 mt-1" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-slate-300 leading-relaxed text-sm italic">
                        {publication.abstract[language] || publication.abstract}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.article>
  );
};