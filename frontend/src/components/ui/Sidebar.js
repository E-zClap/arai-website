import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  BookOpen, 
  FlaskConical, 
  Mail, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

// Enhanced Professional Sidebar with Academic Branding
export const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen, language, isDark }) => {
  const navigationItems = [
    { 
      id: 'home', 
      icon: FlaskConical, 
      label: { EN: 'Home', JP: 'ホーム' },
      description: { EN: 'Laboratory Overview', JP: '研究室概要' }
    },
    { 
      id: 'news', 
      icon: BookOpen, 
      label: { EN: 'News', JP: 'ニュース' },
      description: { EN: 'Latest Updates', JP: '最新情報' }
    },
    { 
      id: 'research', 
      icon: FlaskConical, 
      label: { EN: 'Research', JP: '研究' },
      description: { EN: 'Research Areas', JP: '研究分野' }
    },
    { 
      id: 'publications', 
      icon: BookOpen, 
      label: { EN: 'Publications', JP: '論文' },
      description: { EN: 'Academic Papers', JP: '学術論文' }
    },
    { 
      id: 'team', 
      icon: Users, 
      label: { EN: 'Team', JP: 'チーム' },
      description: { EN: 'Research Team', JP: '研究チーム' }
    },
    { 
      id: 'contact', 
      icon: Mail, 
      label: { EN: 'Contact', JP: 'お問い合わせ' },
      description: { EN: 'Get in Touch', JP: 'お問い合わせ' }
    },
    { 
      id: 'join-us', 
      icon: UserPlus, 
      label: { EN: 'Join Us', JP: '参加' },
      description: { EN: 'Opportunities', JP: '参加機会' }
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 left-6 z-50 lg:hidden p-3 rounded-xl transition-all duration-300 ${
          isDark 
            ? 'bg-white text-slate-800' 
            : 'bg-white text-slate-800 shadow-lg'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Professional Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: isOpen ? 0 : -320 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={`fixed left-0 top-0 h-full w-80 z-40 lg:translate-x-0 ${
            isDark 
              ? 'bg-slate-900/98 backdrop-blur-2xl border-r border-teal-500/20' 
              : 'bg-white backdrop-blur-2xl border-r border-teal-200/50 shadow-xl'
          }`}
        >
          {/* Enhanced Academic Header */}
          <div className="p-8 border-b border-slate-700/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FlaskConical size={24} className="text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {language === 'EN' ? "Arai's Laboratory" : '荒井研究室'}
                </h1>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {language === 'EN' ? 'Quantum Sensing' : '量子センシング'}
                </p>
              </div>
            </div>
            
            {/* Professional Institution Information */}
            <div className={`mt-4 p-3 rounded-xl border ${
              isDark 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-slate-50/80 border-slate-200/50'
            }`}>
              <div className={`text-xs font-semibold mb-1 ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>
                {language === 'EN' ? 'Tokyo Institute of Technology' : '東京工業大学'}
              </div>
              <div className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <a 
                  href="https://www.titech.ac.jp/english/academics/schools/school-of-engineering/electrical-and-electronic-engineering"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline flex items-center gap-1 ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                  } transition-colors`}
                >
                  {language === 'EN' ? 'Dept. of EE Engineering' : '電気電子系'}
                  <ExternalLink size={10} />
                </a>
              </div>
              <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {language === 'EN' 
                  ? 'School of Engineering' 
                  : '工学院'
                }
              </div>
            </div>
          </div>

          {/* Enhanced Navigation with Professional Design */}
          <nav className="p-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    // Only close sidebar on mobile devices (screen width < 1024px)
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group relative ${
                    isActive
                      ? (isDark 
                          ? 'bg-gradient-to-r from-teal-600/30 to-cyan-600/20 border border-teal-400/40 text-teal-300 shadow-lg shadow-teal-500/10' 
                          : 'bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200/50 text-teal-700 shadow-md')
                      : (isDark 
                          ? 'hover:bg-slate-800/60 text-slate-300 hover:text-white hover:border-slate-600/50 border border-transparent' 
                          : 'hover:bg-slate-50/80 text-slate-600 hover:text-slate-800 hover:border-slate-200/50 border border-transparent')
                  }`}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Professional Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg' 
                        : (isDark ? 'bg-slate-700/50 group-hover:bg-slate-600/70' : 'bg-slate-100 group-hover:bg-slate-200')
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-base tracking-wide">
                        {item.label[language]}
                      </div>
                      <div className={`text-xs mt-0.5 ${
                        isActive 
                          ? (isDark ? 'text-teal-200' : 'text-teal-600')
                          : (isDark ? 'text-slate-500' : 'text-slate-500')
                      }`}>
                        {item.description[language]}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </nav>

          {/* Professional Footer */}
          <div className={`absolute bottom-0 left-0 right-0 p-6 border-t ${
            isDark ? 'border-slate-700/50' : 'border-slate-200/50'
          }`}>
            <div className={`text-center text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              <div className="mb-2">
                {language === 'EN' 
                  ? '© 2022 Quantum Sensing Laboratory' 
                  : '© 2022 量子センシング研究室'
                }
              </div>
              <div className="text-xs opacity-70">
                {language === 'EN' ? 'Tokyo Institute of Technology' : '東京工業大学'}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};