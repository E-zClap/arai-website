import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Search, 
  BarChart3, 
  PieChart, 
  Activity,
  Atom,
  Diamond,
  Microscope,
  Cpu,
  Globe,
  Users2,
  BookMarked
} from 'lucide-react';
import { ResearchCard } from '../ui/ResearchCard';

// Interactive Research Dashboard Component
export const InteractiveResearchDashboard = ({ language, isDark, researchData }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Research categories for filtering
  const categories = [
    { id: 'all', label: { EN: 'All Research', JP: '全研究分野' }, icon: Globe },
    { id: 'quantum-sensing', label: { EN: 'Quantum Sensing', JP: '量子センシング' }, icon: Atom },
    { id: 'diamond-physics', label: { EN: 'Diamond Physics', JP: 'ダイヤモンド物理学' }, icon: Diamond },
    { id: 'nv-centers', label: { EN: 'NV Centers', JP: 'NVセンター' }, icon: Microscope },
    { id: 'informatics', label: { EN: 'Informatics', JP: 'インフォマティクス' }, icon: Cpu }
  ];

  // Research impact metrics
  const researchMetrics = {
    activeProjects: 12,
    collaborations: 8,
    publications: 42,
    citations: 1256,
    fundingAmount: '¥85M',
    teamSize: 15
  };

  // Filter research data based on search and category
  const filteredResearch = researchData.filter(research => {
    const matchesSearch = searchTerm === '' || 
      research.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      research.description[language].toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedFilter === 'all' || 
      research.category === selectedFilter ||
      research.tags?.includes(selectedFilter);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="mb-16"
    >
      {/* Dashboard Header */}
      <div className="mb-12">
        <h2 className={`text-4xl font-bold mb-8 text-center ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Interactive Research Dashboard' : 'インタラクティブ研究ダッシュボード'}
        </h2>

        {/* Research Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { key: 'projects', value: researchMetrics.activeProjects, label: { EN: 'Active Projects', JP: 'アクティブプロジェクト' }, icon: Activity, color: 'teal' },
            { key: 'collaborations', value: researchMetrics.collaborations, label: { EN: 'Collaborations', JP: '共同研究' }, icon: Users2, color: 'cyan' },
            { key: 'publications', value: researchMetrics.publications, label: { EN: 'Publications', JP: '論文数' }, icon: BookMarked, color: 'emerald' },
            { key: 'citations', value: researchMetrics.citations, label: { EN: 'Citations', JP: '被引用数' }, icon: BarChart3, color: 'blue' },
            { key: 'funding', value: researchMetrics.fundingAmount, label: { EN: 'Funding', JP: '研究資金' }, icon: PieChart, color: 'purple' },
            { key: 'team', value: researchMetrics.teamSize, label: { EN: 'Team Size', JP: 'チーム規模' }, icon: Users2, color: 'indigo' }
          ].map((metric, index) => (
            <motion.div
              key={metric.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                p-4 rounded-xl border text-center backdrop-blur-sm
                ${isDark 
                  ? 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-900/70' 
                  : 'bg-white/80 border-gray-200/80 hover:bg-white shadow-lg'
                }
                transition-all duration-300 hover:scale-105 group
              `}
            >
              <metric.icon 
                size={24} 
                className={`mx-auto mb-2 text-${metric.color}-500 group-hover:text-${metric.color}-400 transition-colors`} 
              />
              <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {metric.value}
              </div>
              <div className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                {metric.label[language]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12 space-y-6"
      >
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search 
            size={20} 
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-slate-400' : 'text-gray-400'
            }`} 
          />
          <input
            type="text"
            placeholder={language === 'EN' ? 'Search research areas...' : '研究分野を検索...'}
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

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedFilter === category.id
                  ? (isDark 
                      ? 'bg-teal-500/30 text-teal-300 border border-teal-400/50'
                      : 'bg-teal-100 text-teal-700 border border-teal-300'
                    )
                  : (isDark
                      ? 'bg-slate-800/50 text-slate-300 border border-slate-600/50 hover:bg-slate-700/50'
                      : 'bg-white/70 text-gray-600 border border-gray-300 hover:bg-white hover:text-gray-800'
                    )
                }
                focus:outline-none focus:ring-2 focus:ring-teal-500/50
              `}
            >
              <category.icon size={16} className="mr-2" />
              {category.label[language]}
            </motion.button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center">
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            {language === 'EN' 
              ? `Showing ${filteredResearch.length} research area${filteredResearch.length !== 1 ? 's' : ''}`
              : `${filteredResearch.length}件の研究分野を表示`
            }
          </p>
        </div>
      </motion.div>

      {/* Research Grid */}
      <motion.div 
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredResearch.map((research, index) => (
          <motion.div
            key={`${research.title[language]}-${index}`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ResearchCard 
              {...research} 
              index={index} 
              language={language} 
              isDark={isDark}
              enhanced={true}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* No Results Message */}
      {filteredResearch.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className={`text-6xl mb-4 ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>
            🔬
          </div>
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            {language === 'EN' 
              ? 'No research areas found matching your search.'
              : '検索に一致する研究分野が見つかりません。'
            }
          </p>
          <motion.button
            onClick={() => {
              setSearchTerm('');
              setSelectedFilter('all');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              mt-4 px-6 py-2 rounded-lg font-medium transition-all duration-200
              ${isDark 
                ? 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
                : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
              }
              focus:outline-none focus:ring-2 focus:ring-teal-500/50
            `}
          >
            {language === 'EN' ? 'Clear Filters' : 'フィルターをクリア'}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};