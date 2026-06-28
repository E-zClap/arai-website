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
import { PageHeader } from '../components/ui/PageHeader';
import { getPublicationCategories, getPublicationMetrics } from '../data/publicationsData';

// Ultra-Professional Publications Page with Advanced Filtering
export const PublicationsPage = ({ language, isDark, publicationsData = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Categories (with counts) and headline metrics derived from the live data.
  const publicationCategories = useMemo(
    () => getPublicationCategories(publicationsData),
    [publicationsData]
  );
  const publicationMetrics = useMemo(
    () => getPublicationMetrics(publicationsData),
    [publicationsData]
  );

  // Get unique years from publications
  const years = useMemo(() => {
    const yearSet = new Set(publicationsData.map(pub => pub.year));
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [publicationsData]);

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
  }, [searchTerm, selectedCategory, selectedYear, selectedImpact, publicationsData, publicationCategories]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedYear('all');
    setSelectedImpact('all');
  };

  // Shared surface + control styles for the Refined Dark system.
  const cardSurface = isDark
    ? 'bg-white/[0.03] border border-white/10'
    : 'bg-white border border-slate-200 shadow-sm';
  const controlSurface = isDark
    ? 'bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-orange-500/40'
    : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-orange-500/40';

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-28 sm:py-32 relative z-10">
        {/* Editorial page header */}
        <PageHeader
          isDark={isDark}
          eyebrow={language === 'EN' ? 'Research output' : '研究成果'}
          title={language === 'EN' ? 'Publications' : '論文'}
          subtitle={language === 'EN'
            ? 'Peer-reviewed publications and research contributions in quantum sensing and quantum information science'
            : '量子センシングと量子情報科学における査読付き論文と研究貢献'
          }
        />

        {/* Publication Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div
            className={`p-6 rounded-2xl transition-colors ${cardSurface} ${isDark ? 'hover:border-white/20' : 'hover:shadow-md hover:border-slate-300'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <BookOpen size={22} className="text-orange-500" />
              <BarChart3 size={18} className="text-slate-500" />
            </div>
            <div className={`text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {publicationMetrics.totalPublications}
            </div>
            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'EN' ? 'Total Publications' : '総論文数'}
            </div>
          </motion.div>

          <motion.div
            className={`p-6 rounded-2xl transition-colors ${cardSurface} ${isDark ? 'hover:border-white/20' : 'hover:shadow-md hover:border-slate-300'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <TrendingUp size={22} className="text-orange-500" />
              <Users size={18} className="text-slate-500" />
            </div>
            <div className={`text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {publicationMetrics.totalCitations}
            </div>
            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'EN' ? 'Total Citations' : '総引用数'}
            </div>
          </motion.div>

          <motion.div
            className={`p-6 rounded-2xl transition-colors ${cardSurface} ${isDark ? 'hover:border-white/20' : 'hover:shadow-md hover:border-slate-300'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <Award size={22} className="text-orange-500" />
              <Calendar size={18} className="text-slate-500" />
            </div>
            <div className={`text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {publicationMetrics.hIndex}
            </div>
            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'EN' ? 'H-Index' : 'Hインデックス'}
            </div>
          </motion.div>

          <motion.div
            className={`p-6 rounded-2xl transition-colors ${cardSurface} ${isDark ? 'hover:border-white/20' : 'hover:shadow-md hover:border-slate-300'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <BookOpen size={22} className="text-orange-500" />
              <TrendingUp size={18} className="text-slate-500" />
            </div>
            <div className={`text-3xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
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
          className={`p-6 sm:p-8 rounded-2xl mb-12 ${cardSurface}`}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              aria-label={language === 'EN' ? 'Search publications' : '論文を検索'}
              placeholder={language === 'EN' ? 'Search publications...' : '論文を検索...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-4 pl-12 rounded-xl transition-colors text-base ${controlSurface} focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
            />
            <Search size={20} className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`} />
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-colors ${
                isDark
                  ? 'border-white/15 bg-white/5 hover:bg-white/10 text-white'
                  : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <Filter size={18} className="text-orange-500" />
              <span>
                {language === 'EN' ? 'Advanced Filters' : '詳細フィルター'}
              </span>
              <motion.div
                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-slate-500"
              >
                <Filter size={14} />
              </motion.div>
            </motion.button>

            {/* Clear Filters Button */}
            {(searchTerm || selectedCategory !== 'all' || selectedYear !== 'all' || selectedImpact !== 'all') && (
              <motion.button
                onClick={clearFilters}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                  isDark
                    ? 'border-white/15 bg-white/5 hover:bg-white/10 text-slate-300'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <X size={14} />
                <span>
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
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`mt-6 pt-6 border-t overflow-hidden ${isDark ? 'border-white/10' : 'border-slate-200'}`}
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
                      className={`w-full p-3 rounded-xl transition-colors ${controlSurface} focus:outline-none`}
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
                      className={`w-full p-3 rounded-xl transition-colors ${controlSurface} focus:outline-none`}
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
                      className={`w-full p-3 rounded-xl transition-colors ${controlSurface} focus:outline-none`}
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
          className={`mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
        >
          <span className="text-base">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-20 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
            >
              <BookOpen size={56} className="mx-auto mb-6 text-slate-500 opacity-60" />
              <h3 className={`text-lg sm:text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {language === 'EN' ? 'No publications found' : '論文が見つかりませんでした'}
              </h3>
              <p className="text-base">
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
