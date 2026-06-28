import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  BookOpen, 
  FlaskConical, 
  Mail, 
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Info
} from 'lucide-react';

// Ultra-Professional Sidebar with Premium Academic Design
export const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen, language, isDark }) => {
  const location = useLocation();
  
  const navigationItems = [
    { 
      id: 'home', 
      path: '/',
      icon: FlaskConical, 
      label: { EN: 'Home', JP: 'ホーム' },
      description: { EN: 'Laboratory Overview', JP: '研究室について' }
    },
    { 
      id: 'about-us', 
      path: '/about-us',
      icon: Info, 
      label: { EN: 'About Us', JP: '私たちについて' },
      description: { EN: 'Our Mission & Values', JP: 'ミッションと理念' }
    },
    { 
      id: 'news', 
      path: '/news',
      icon: BookOpen, 
      label: { EN: 'News', JP: 'ニュース' },
      description: { EN: 'Latest Updates', JP: '最新情報' }
    },
    { 
      id: 'research', 
      path: '/research',
      icon: FlaskConical, 
      label: { EN: 'Research', JP: '研究' },
      description: { EN: 'Research Areas', JP: '研究テーマ' }
    },
    { 
      id: 'publications', 
      path: '/publications',
      icon: BookOpen, 
      label: { EN: 'Publications', JP: '論文' },
      description: { EN: 'Academic Papers', JP: '研究業績' }
    },
    { 
      id: 'team', 
      path: '/team',
      icon: Users, 
      label: { EN: 'Team', JP: 'チーム' },
      description: { EN: 'Research Team', JP: 'メンバー' }
    },
    { 
      id: 'contact', 
      path: '/contact',
      icon: Mail, 
      label: { EN: 'Contact', JP: 'お問い合わせ' },
      description: { EN: 'Get in Touch', JP: '連絡先' }
    },
    { 
      id: 'join-us', 
      path: '/join-us',
      icon: UserPlus, 
      label: { EN: 'Join Us', JP: '参加' },
      description: { EN: 'Opportunities', JP: '募集情報' }
    }
  ];

  return (
    <>
      {/* Enhanced Mobile Menu Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="primary-sidebar"
        className={`fixed top-6 left-6 z-50 lg:hidden p-4 rounded-2xl transition-all duration-300 backdrop-blur-2xl border ${
          isDark 
            ? 'bg-dark-gray-900/90 text-white border-orange-600/30 shadow-2xl shadow-orange-600/10' 
            : 'bg-white/90 text-slate-800 shadow-2xl border-orange-200/50'
        }`}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Enhanced Backdrop with Blur Effect */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Ultra-Professional Sidebar */}
      <AnimatePresence>
        <motion.div
          id="primary-sidebar"
          initial={{ x: -400, opacity: 0 }}
          animate={{
            x: isOpen ? 0 : -400,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ 
            type: "spring", 
            damping: 30, 
            stiffness: 300,
            opacity: { duration: 0.2 }
          }}
          className={`fixed left-0 top-0 h-full w-80 z-40 lg:translate-x-0 lg:opacity-100 flex flex-col ${
            isDark
              ? 'bg-[#0c0d11]/95 backdrop-blur-xl border-r border-white/10'
              : 'bg-white/95 backdrop-blur-xl border-r border-slate-200'
          }`}
        >
          {/* Header */}
          <div className={`p-6 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <img
                src="/diam.svg"
                alt="Quantum Informatics Group — diamond NV-center logo"
                width={44}
                height={44}
                className="w-11 h-11 object-contain"
                style={{ filter: 'drop-shadow(0 4px 10px rgba(234, 88, 12, 0.4))' }}
              />
              <div>
                <p className={`text-sm font-semibold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'EN' ? 'Quantum Informatics Group' : '量子情報学グループ'}
                </p>
                <p className={`mt-0.5 text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {language === 'EN' ? 'Quantum Sensing' : '量子センシング'}
                </p>
              </div>
            </div>
            <a
              href="https://www.titech.ac.jp/english/academics/schools/school-of-engineering/electrical-and-electronic-engineering"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block"
            >
              <span className="text-orange-500 text-xs font-semibold uppercase tracking-[0.15em]">
                {language === 'EN' ? 'Institute of Science Tokyo' : '東京科学大学'}
              </span>
              <span className={`mt-1 block text-xs ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'} transition-colors`}>
                {language === 'EN' ? 'Dept. of Electrical & Electronic Engineering' : '電気電子系'}
              </span>
            </a>
          </div>

          {/* Premium Navigation with Advanced Design - SEO-friendly with real <a> links */}
          <nav className="px-4 py-4 space-y-1 flex-1 overflow-y-auto" aria-label="Main navigation">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                    isActive
                      ? (isDark ? 'bg-orange-500/10 text-white' : 'bg-orange-50 text-slate-900')
                      : (isDark
                          ? 'text-slate-400 hover:bg-white/5 hover:text-white'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-orange-500"
                    />
                  )}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isActive
                        ? 'bg-orange-500/15 text-orange-400'
                        : isDark
                        ? 'bg-white/5 text-slate-400 group-hover:text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{item.label[language]}</span>
                    <span
                      className={`block text-xs ${
                        isActive ? (isDark ? 'text-orange-300/80' : 'text-orange-600') : 'text-slate-500'
                      }`}
                    >
                      {item.description[language]}
                    </span>
                  </span>
                  <ChevronRight
                    size={16}
                    className={`shrink-0 transition-opacity ${
                      isActive ? 'text-orange-400 opacity-100' : 'text-slate-500 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Compact Footer */}
          <motion.div 
            className={`mt-auto p-4 border-t ${
              isDark ? 'border-dark-gray-700/50' : 'border-slate-200/50'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <div className="mb-1">
                {language === 'EN' 
                  ? `© ${new Date().getFullYear()} Quantum Informatics Group` 
                  : `© ${new Date().getFullYear()} 量子情報学グループ`
                }
              </div>
              <div className="text-xs opacity-80">
                {language === 'EN' ? 'Institute of Science Tokyo' : '東京科学大学'}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};