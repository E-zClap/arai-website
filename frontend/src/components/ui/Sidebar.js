import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  FlaskConical,
  Mail,
  Menu,
  X,
  Info,
  Home,
  Newspaper,
  FileText
} from 'lucide-react';

// Ultra-Professional Sidebar with Premium Academic Design
export const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen, language, isDark }) => {
  const location = useLocation();
  
  const navigationItems = [
    { 
      id: 'home',
      path: '/',
      icon: Home,
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
      icon: Newspaper,
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
      icon: FileText,
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
              ? 'bg-gradient-to-b from-[#0e0f14]/95 to-[#0a0b0e]/95 backdrop-blur-xl border-r border-white/[0.08]'
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
                style={{ filter: 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.5))' }}
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
            {navigationItems.map((item) => {
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
                  className={`group relative flex items-center gap-3.5 rounded-lg px-3.5 py-2.5 transition-all duration-200 ${
                    isActive
                      ? (isDark
                          ? 'bg-white/[0.06] text-white ring-1 ring-inset ring-white/10'
                          : 'bg-slate-100 text-slate-900 ring-1 ring-inset ring-slate-200')
                      : (isDark
                          ? 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-100'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-orange-500"
                    />
                  )}
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className={`shrink-0 transition-colors ${
                      isActive
                        ? 'text-orange-400'
                        : isDark
                        ? 'text-slate-500 group-hover:text-slate-300'
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="text-[15px] font-medium tracking-tight">{item.label[language]}</span>
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