import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ currentPage, setCurrentPage, language, isDark }) => {
  // Breadcrumb mapping for all pages
  const breadcrumbMap = {
    'home': {
      path: [{ key: 'home', label: { EN: 'Home', JP: 'ホーム' }, icon: Home }]
    },
    'news': {
      path: [
        { key: 'home', label: { EN: 'Home', JP: 'ホーム' }, icon: Home },
        { key: 'news', label: { EN: 'News', JP: 'ニュース' } }
      ]
    },
    'research': {
      path: [
        { key: 'home', label: { EN: 'Home', JP: 'ホーム' }, icon: Home },
        { key: 'research', label: { EN: 'Research', JP: '研究' } }
      ]
    },
    'publications': {
      path: [
        { key: 'home', label: { EN: 'Home', JP: 'ホーム' }, icon: Home },
        { key: 'publications', label: { EN: 'Publications', JP: '論文' } }
      ]
    },
    'team': {
      path: [
        { key: 'home', label: { EN: 'Home', JP: 'ホーム' }, icon: Home },
        { key: 'team', label: { EN: 'Team', JP: 'チーム' } }
      ]
    },
    'contact': {
      path: [
        { key: 'home', label: { EN: 'Home', JP: 'ホーム' }, icon: Home },
        { key: 'contact', label: { EN: 'Contact', JP: 'お問い合わせ' } }
      ]
    },
    'join-us': {
      path: [
        { key: 'home', label: { EN: 'Home', JP: 'ホーム' }, icon: Home },
        { key: 'join-us', label: { EN: 'Join Us', JP: '参加' } }
      ]
    },
    'profile-keigo-arai': {
      path: [
        { key: 'home', label: { EN: 'Home', JP: 'ホーム' }, icon: Home },
        { key: 'team', label: { EN: 'Team', JP: 'チーム' } },
        { key: 'profile-keigo-arai', label: { EN: 'Keigo Arai', JP: '荒井 圭悟' } }
      ]
    }
  };

  const currentBreadcrumb = breadcrumbMap[currentPage] || breadcrumbMap['home'];

  const handleBreadcrumbClick = (pageKey) => {
    if (pageKey !== currentPage) {
      setCurrentPage(pageKey);
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={`
        mb-6 lg:mb-8 px-6 py-3
        ${isDark 
          ? 'bg-slate-900/30 border-slate-700/50' 
          : 'bg-white/80 border-gray-200/80'
        }
        backdrop-blur-sm rounded-lg border
        shadow-lg shadow-teal-500/10
      `}
      aria-label="Breadcrumb navigation"
    >
      <ol className="flex items-center space-x-2 text-sm font-medium">
        {currentBreadcrumb.path.map((item, index) => {
          const isLast = index === currentBreadcrumb.path.length - 1;
          const IconComponent = item.icon;
          
          return (
            <li key={item.key} className="flex items-center">
              {/* Breadcrumb Item */}
              {isLast ? (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`
                    flex items-center space-x-1.5 px-2 py-1 rounded-md font-semibold
                    ${isDark 
                      ? 'text-teal-300 bg-teal-900/30' 
                      : 'text-teal-700 bg-teal-50'
                    }
                  `}
                  aria-current="page"
                >
                  {IconComponent && (
                    <IconComponent size={16} className="flex-shrink-0" />
                  )}
                  <span>{item.label[language]}</span>
                </motion.span>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBreadcrumbClick(item.key)}
                  className={`
                    flex items-center space-x-1.5 px-2 py-1 rounded-md
                    transition-all duration-200 font-medium
                    ${isDark 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                    focus:outline-none focus:ring-2 focus:ring-teal-500/50
                  `}
                  aria-label={`Navigate to ${item.label[language]}`}
                >
                  {IconComponent && (
                    <IconComponent size={16} className="flex-shrink-0" />
                  )}
                  <span>{item.label[language]}</span>
                </motion.button>
              )}
              
              {/* Separator */}
              {!isLast && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: (index + 0.5) * 0.1 }}
                  className="mx-2"
                  aria-hidden="true"
                >
                  <ChevronRight 
                    size={14} 
                    className={`
                      ${isDark ? 'text-slate-500' : 'text-gray-400'}
                    `} 
                  />
                </motion.div>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
};