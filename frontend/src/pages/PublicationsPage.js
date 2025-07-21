import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Filter, 
  Search,
  Calendar,
  Users,
  Star,
  Citation,
  Download
} from 'lucide-react';
import { QuantumParticles } from '../components/animations/QuantumParticles';

// Research Metrics Dashboard Component
const ResearchMetricsDashboard = ({ language, isDark }) => {
  const metrics = {
    totalPublications: 42,
    totalCitations: 1256,
    hIndex: 18,
    i10Index: 25,
    averageCitations: 29.9
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-12"
    >
      <h2 className={`text-3xl font-bold mb-8 text-center ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        {language === 'EN' ? 'Research Impact Metrics' : '研究インパクト指標'}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { 
            key: 'publications', 
            value: metrics.totalPublications, 
            label: { EN: 'Publications', JP: '論文数' },
            icon: BookOpen,
            color: 'teal'
          },
          { 
            key: 'citations', 
            value: metrics.totalCitations, 
            label: { EN: 'Citations', JP: '被引用数' },
            icon: Citation,
            color: 'cyan'
          },
          { 
            key: 'hindex', 
            value: metrics.hIndex, 
            label: { EN: 'h-index', JP: 'h-index' },
            icon: Award,
            color: 'emerald'
          },
          { 
            key: 'i10index', 
            value: metrics.i10Index, 
            label: { EN: 'i10-index', JP: 'i10-index' },
            icon: Star,
            color: 'blue'
          },
          { 
            key: 'average', 
            value: metrics.averageCitations, 
            label: { EN: 'Avg Citations', JP: '平均被引用数' },
            icon: TrendingUp,
            color: 'purple'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className={`
              p-6 rounded-xl backdrop-blur-sm border text-center
              ${isDark 
                ? 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-900/70' 
                : 'bg-white/80 border-gray-200/80 hover:bg-white shadow-lg'
              }
              transition-all duration-300 hover:scale-105 group
            `}
          >
            <metric.icon 
              size={28} 
              className={`mx-auto mb-3 text-${metric.color}-500 group-hover:text-${metric.color}-400 transition-colors`} 
            />
            <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {metric.value}
            </div>
            <div className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              {metric.label[language]}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Enhanced Publication Card Component
const PublicationCard = ({ pub, index, language, isDark }) => {
  const [showAbstract, setShowAbstract] = useState(false);
  
  // Generate impact metrics (simulation for demo)
  const impactMetrics = {
    citations: Math.floor(Math.random() * 50) + 10,
    downloads: Math.floor(Math.random() * 200) + 50,
    mentions: Math.floor(Math.random() * 15) + 3
  };

  const journalTier = ['Q1', 'Q2', 'Q1', 'Q1'][index % 4];
  const impactFactor = [8.2, 5.7, 12.4, 9.1][index % 4];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`
        backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 group
        ${isDark 
          ? 'bg-black/40 border-teal-500/20 hover:border-teal-400/40 hover:bg-black/60'
          : 'bg-white/70 border-teal-300/30 hover:border-teal-400/50 shadow-lg hover:shadow-xl'
        }
      `}
      role="article"
      aria-label={`Publication: ${pub.title[language] || pub.title}`}
    >
      {/* Publication Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          {/* Journal Badge and Impact Factor */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`
              px-3 py-1 rounded-full text-xs font-bold
              ${journalTier === 'Q1' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
              }
            `}>
              {journalTier} Journal
            </span>
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}
            `}>
              IF: {impactFactor}
            </span>
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${isDark ? 'bg-cyan-900/30 text-cyan-300' : 'bg-cyan-100 text-cyan-600'}
            `}>
              {pub.year}
            </span>
          </div>

          {/* Title */}
          <h3 className={`
            text-xl lg:text-2xl font-semibold mb-4 leading-tight group-hover:text-teal-400 transition-colors
            ${isDark ? 'text-white' : 'text-gray-800'}
          `}>
            {pub.title[language] || pub.title}
          </h3>

          {/* Authors and Journal */}
          <div className="space-y-2 mb-4">
            <p className="text-teal-500 font-medium flex items-center">
              <Users size={16} className="mr-2" />
              {pub.authors}
            </p>
            <p className={`text-sm flex items-center ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <BookOpen size={16} className="mr-2" />
              {pub.journal}
              <Calendar size={14} className="ml-4 mr-1" />
              {pub.year}
            </p>
          </div>

          {/* Impact Metrics */}
          <div className="flex items-center gap-6 mb-4 text-sm">
            <div className={`flex items-center ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              <Citation size={14} className="mr-1" />
              {impactMetrics.citations} citations
            </div>
            <div className={`flex items-center ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              <Download size={14} className="mr-1" />
              {impactMetrics.downloads} downloads
            </div>
            <div className={`flex items-center ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              <TrendingUp size={14} className="mr-1" />
              {impactMetrics.mentions} mentions
            </div>
          </div>
        </div>

        {/* External Link */}
        <motion.a 
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`
            ml-6 p-3 rounded-lg transition-all duration-200
            ${isDark 
              ? 'text-teal-400 hover:text-teal-300 hover:bg-teal-900/30' 
              : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50'
            }
            focus:outline-none focus:ring-2 focus:ring-teal-500/50
          `}
          aria-label={`Open publication: ${pub.title[language] || pub.title}`}
        >
          <ExternalLink size={24} />
        </motion.a>
      </div>

      {/* Abstract Toggle (Demo) */}
      {index < 2 && (
        <div className="mt-6 pt-6 border-t border-slate-700/30">
          <motion.button
            onClick={() => setShowAbstract(!showAbstract)}
            className={`
              text-sm font-medium transition-colors duration-200
              ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'}
              focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded px-2 py-1
            `}
          >
            {showAbstract ? 'Hide Abstract' : 'Show Abstract'}
          </motion.button>
          
          {showAbstract && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-gray-600'
              }`}>
                {language === 'EN' 
                  ? 'This research presents novel approaches to quantum sensing using diamond nitrogen-vacancy centers, demonstrating significant advances in coherent control techniques and their applications in materials science...'
                  : 'この研究は、ダイヤモンド窒素空孔センターを用いた量子センシングの新しいアプローチを提示し、コヒーレント制御技術とその材料科学への応用において重要な進歩を示しています...'
                }
              </p>
            </motion.div>
          )}
        </div>
      )}
    </motion.article>
  );
};

// Enhanced Publications Page Component
export const PublicationsPage = ({ language, isDark, publicationsData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('year');
  const [filterBy, setFilterBy] = useState('all');

  const filteredPublications = publicationsData
    .filter(pub => {
      const titleMatch = (pub.title[language] || pub.title).toLowerCase().includes(searchTerm.toLowerCase());
      const authorMatch = pub.authors.toLowerCase().includes(searchTerm.toLowerCase());
      const journalMatch = pub.journal.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || authorMatch || journalMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'title') return (a.title[language] || a.title).localeCompare(b.title[language] || b.title);
      return 0;
    });

  return (
    <div className={`min-h-screen py-12 px-6 relative overflow-hidden ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
      }`} />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`text-6xl lg:text-7xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Publications' : '論文・出版物'}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-8" />
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-gray-600'
          }`}>
            {language === 'EN'
              ? 'Cutting-edge research publications in quantum sensing, diamond physics, and computational informatics'
              : '量子センシング、ダイヤモンド物理学、計算情報学における最先端の研究出版物'
            }
          </p>
        </motion.header>

        {/* Research Metrics Dashboard */}
        <ResearchMetricsDashboard language={language} isDark={isDark} />

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search 
              size={20} 
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isDark ? 'text-slate-400' : 'text-gray-400'
              }`} 
            />
            <input
              type="text"
              placeholder={language === 'EN' ? 'Search publications...' : '論文を検索...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                w-full pl-12 pr-4 py-3 rounded-lg border backdrop-blur-sm
                ${isDark 
                  ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-400'
                  : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                }
                focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all
              `}
            />
          </div>

          {/* Sort and Filter */}
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`
                px-4 py-3 rounded-lg border backdrop-blur-sm
                ${isDark 
                  ? 'bg-slate-900/50 border-slate-700 text-white'
                  : 'bg-white/80 border-gray-300 text-gray-900'
                }
                focus:outline-none focus:ring-2 focus:ring-teal-500/50
              `}
            >
              <option value="year">{language === 'EN' ? 'Sort by Year' : '年順'}</option>
              <option value="title">{language === 'EN' ? 'Sort by Title' : 'タイトル順'}</option>
            </select>
          </div>
        </motion.div>

        {/* Publications Grid */}
        <div className="space-y-6">
          {filteredPublications.map((pub, index) => (
            <PublicationCard
              key={index}
              pub={pub}
              index={index}
              language={language}
              isDark={isDark}
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredPublications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              {language === 'EN' ? 'No publications found matching your search.' : '検索に一致する論文が見つかりません。'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};