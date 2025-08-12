import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award,
  Calendar,
  BarChart3,
  X
} from 'lucide-react';
import { PublicationCard } from '../components/ui/PublicationCard';
import { publicationsData, publicationCategories, publicationMetrics } from '../data/publicationsData';

// Ultra-Professional Publications Page with Advanced Filtering
export const PublicationsPage = ({ language, isDark }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique years from publications
  const years = useMemo(() => {
    const yearSet = new Set(publicationsData.map(pub => pub.year));
    return Array.from(yearSet).sort((a, b) => b - a);
  }, []);

  // Filter publications based on search and filters
  const filteredPublications = useMemo(() => {
    return publicationsData.filter(publication => {
      const matchesSearch = searchTerm === '' || 
        publication.title.EN.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.title.JP.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.journal.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || 
        publication.category === publicationCategories.find(cat => cat.id === selectedCategory)?.label.EN;

      const matchesYear = selectedYear === 'all' || publication.year === selectedYear;

      const matchesImpact = selectedImpact === 'all' || publication.impact === selectedImpact;

      return matchesSearch && matchesCategory && matchesYear && matchesImpact;
    });
  }, [searchTerm, selectedCategory, selectedYear, selectedImpact]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedYear('all');
    setSelectedImpact('all');
  };

  return (
    <div className={`min-h-screen p-8 ${isDark ? 'bg-deep-navy-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Professional Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className={`text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
            style={{ fontFamily: '"Inter", system-ui' }}
            whileHover={{ scale: 1.02 }}
          >
            {language === 'EN' ? 'Publications' : '論文'}
          </motion.h1>
          
          <motion.p 
            className={`text-xl mb-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {language === 'EN' 
              ? 'Peer-reviewed publications and research contributions in quantum sensing and quantum information science'
              : '量子センシングと量子情報科学における査読付き論文と研究貢献'
            }
          </motion.p>

          {/* Professional Underline */}
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-electric-blue-600 via-royal-indigo-500 to-electric-blue-500 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Publication Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div 
            className={`p-6 rounded-3xl border backdrop-blur-2xl ${
              isDark 
                ? 'bg-slate-900/60 border-electric-blue-600/20 shadow-2xl'
                : 'bg-white/80 border-electric-blue-300/30 shadow-xl'
            }`}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <BookOpen size={24} className="text-electric-blue-600" />
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <BarChart3 size={20} className="text-electric-blue-500" />
              </motion.div>
            </div>
            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {publicationMetrics.totalPublications}
            </div>
            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'EN' ? 'Total Publications' : '総論文数'}
            </div>
          </motion.div>

          <motion.div 
            className={`p-6 rounded-3xl border backdrop-blur-2xl ${
              isDark 
                ? 'bg-slate-900/60 border-royal-indigo-500/20 shadow-2xl'
                : 'bg-white/80 border-royal-indigo-300/30 shadow-xl'
            }`}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <TrendingUp size={24} className="text-royal-indigo-500" />
              <Users size={20} className="text-royal-indigo-400" />
            </div>
            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {publicationMetrics.totalCitations}
            </div>
            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'EN' ? 'Total Citations' : '総引用数'}
            </div>
          </motion.div>

          <motion.div 
            className={`p-6 rounded-3xl border backdrop-blur-2xl ${
              isDark 
                ? 'bg-slate-900/60 border-electric-blue-500/20 shadow-2xl'
                : 'bg-white/80 border-electric-blue-300/30 shadow-xl'
            }`}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <Award size={24} className="text-electric-blue-500" />
              <Calendar size={20} className="text-electric-blue-400" />
            </div>
            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {publicationMetrics.hIndex}
            </div>
            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'EN' ? 'H-Index' : 'Hインデックス'}
            </div>
          </motion.div>

          <motion.div 
            className={`p-6 rounded-3xl border backdrop-blur-2xl ${
              isDark 
                ? 'bg-slate-900/60 border-electric-blue-600/20 shadow-2xl'
                : 'bg-white/80 border-electric-blue-300/30 shadow-xl'
            }`}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <BookOpen size={24} className="text-electric-blue-600" />
              <TrendingUp size={20} className="text-electric-blue-500" />
            </div>
            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {publicationMetrics.highImpactPapers}
            </div>
            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'EN' ? 'High Impact' : '高インパクト'}
            </div>
          </motion.div>
        </motion.div>

        {/* Advanced Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={`p-8 rounded-3xl border backdrop-blur-2xl mb-12 ${
            isDark 
              ? 'bg-slate-900/60 border-electric-blue-600/20 shadow-2xl'
              : 'bg-white/80 border-electric-blue-300/30 shadow-xl'
          }`}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <motion.input
              type="text"
              placeholder={language === 'EN' ? 'Search publications...' : '論文を検索...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-5 pl-14 rounded-2xl border transition-all duration-300 text-lg ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700/40 text-white placeholder-slate-400 focus:border-electric-blue-500/60'
                  : 'bg-white/80 border-slate-300/40 text-slate-900 placeholder-slate-500 focus:border-electric-blue-500/60'
              } focus:outline-none focus:ring-0`}
              whileFocus={{ scale: 1.01 }}
            />
            <Search size={24} className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`} />
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border transition-all duration-300 ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700/40 text-white hover:border-electric-blue-500/60'
                  : 'bg-white/80 border-slate-300/40 text-slate-900 hover:border-electric-blue-500/60'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter size={20} className="text-electric-blue-600" />
              <span className="font-medium">
                {language === 'EN' ? 'Advanced Filters' : '詳細フィルター'}
              </span>
              <motion.div
                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ 
                    scale: isFilterOpen ? 1.2 : 1,
                    color: isFilterOpen ? '#14b8a6' : '#64748b'
                  }}
                >
                  <Filter size={16} />
                </motion.div>
              </motion.div>
            </motion.button>

            {/* Clear Filters Button */}
            {(searchTerm || selectedCategory !== 'all' || selectedYear !== 'all' || selectedImpact !== 'all') && (
              <motion.button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} />
                <span className="text-sm font-medium">
                  {language === 'EN' ? 'Clear' : 'クリア'}
                </span>
              </motion.button>
            )}
          </div>

          {/* Expandable Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mt-6 pt-6 border-t border-slate-700/30 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {language === 'EN' ? 'Category' : 'カテゴリ'}
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={`w-full p-3 rounded-2xl border transition-all duration-300 ${
                        isDark 
                          ? 'bg-slate-800/50 border-slate-700/40 text-white'
                          : 'bg-white/80 border-slate-300/40 text-slate-900'
                      } focus:outline-none focus:border-teal-400/60`}
                    >
                      {publicationCategories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.label[language]} ({category.count})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year Filter */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {language === 'EN' ? 'Year' : '年'}
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className={`w-full p-3 rounded-2xl border transition-all duration-300 ${
                        isDark 
                          ? 'bg-slate-800/50 border-slate-700/40 text-white'
                          : 'bg-white/80 border-slate-300/40 text-slate-900'
                      } focus:outline-none focus:border-teal-400/60`}
                    >
                      <option value="all">
                        {language === 'EN' ? 'All Years' : '全年'}
                      </option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  {/* Impact Filter */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {language === 'EN' ? 'Impact Level' : 'インパクトレベル'}
                    </label>
                    <select
                      value={selectedImpact}
                      onChange={(e) => setSelectedImpact(e.target.value)}
                      className={`w-full p-3 rounded-2xl border transition-all duration-300 ${
                        isDark 
                          ? 'bg-slate-800/50 border-slate-700/40 text-white'
                          : 'bg-white/80 border-slate-300/40 text-slate-900'
                      } focus:outline-none focus:border-teal-400/60`}
                    >
                      <option value="all">
                        {language === 'EN' ? 'All Impact Levels' : '全インパクトレベル'}
                      </option>
                      <option value="Very High">
                        {language === 'EN' ? 'Very High' : '非常に高い'}
                      </option>
                      <option value="High">
                        {language === 'EN' ? 'High' : '高い'}
                      </option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`mb-8 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
        >
          <span className="text-lg">
            {language === 'EN' 
              ? `Showing ${filteredPublications.length} of ${publicationsData.length} publications`
              : `${publicationsData.length}件中${filteredPublications.length}件の論文を表示`
            }
          </span>
        </motion.div>

        {/* Publications Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-8"
        >
          <AnimatePresence>
            {filteredPublications.map((publication, index) => (
              <PublicationCard
                key={`${publication.doi}-${index}`}
                publication={publication}
                index={index}
                language={language}
              />
            ))}
          </AnimatePresence>

          {filteredPublications.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-center py-20 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
            >
              <BookOpen size={64} className="mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-semibold mb-4">
                {language === 'EN' ? 'No publications found' : '論文が見つかりませんでした'}
              </h3>
              <p className="text-lg">
                {language === 'EN' 
                  ? 'Try adjusting your search criteria or filters'
                  : '検索条件やフィルターを調整してみてください'
                }
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};