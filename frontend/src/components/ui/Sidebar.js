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
  X,
  ChevronRight
} from 'lucide-react';

// Ultra-Professional Sidebar with Premium Academic Design
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
      {/* Enhanced Mobile Menu Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 left-6 z-50 lg:hidden p-4 rounded-2xl transition-all duration-300 backdrop-blur-2xl border ${
          isDark 
            ? 'bg-slate-900/90 text-white border-electric-blue-600/30 shadow-2xl shadow-electric-blue-600/10' 
            : 'bg-white/90 text-slate-800 shadow-2xl border-electric-blue-200/50'
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
              ? 'bg-slate-900/95 backdrop-blur-3xl border-r border-electric-blue-500/20 shadow-2xl shadow-electric-blue-500/5' 
              : 'bg-white/95 backdrop-blur-3xl border-r border-electric-blue-200/50 shadow-2xl'
          }`}
        >
          {/* Premium Academic Header */}
          <motion.div 
            className="p-8 border-b border-slate-700/30"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-electric-blue-600 via-royal-indigo-500 to-electric-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-electric-blue-600/30"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(30, 64, 175, 0.4)"
                }}
                animate={{
                  boxShadow: [
                    "0 10px 20px rgba(30, 64, 175, 0.2)",
                    "0 15px 30px rgba(30, 64, 175, 0.3)",
                    "0 10px 20px rgba(30, 64, 175, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FlaskConical size={24} className="text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {language === 'EN' ? "Arai's Laboratory" : '荒井研究室'}
                </motion.h1>
                <motion.p 
                  className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {language === 'EN' ? 'Quantum Sensing' : '量子センシング'}
                </motion.p>
              </div>
            </div>
            
            {/* Premium Institution Information */}
            <motion.div 
              className={`mt-4 p-4 rounded-2xl border backdrop-blur-sm ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700/50 shadow-xl shadow-slate-900/20' 
                  : 'bg-slate-50/80 border-slate-200/50 shadow-lg'
              }`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>
                {language === 'EN' ? 'Tokyo Institute of Technology' : '東京工業大学'}
              </div>
              <motion.a 
                href="https://www.titech.ac.jp/english/academics/schools/school-of-engineering/electrical-and-electronic-engineering"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs flex items-center gap-2 group ${
                  isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                } transition-all duration-300`}
                whileHover={{ x: 2 }}
              >
                {language === 'EN' ? 'Department of Electrical & Electronic Engineering' : '電気電子系'}
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ExternalLink size={12} />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Premium Navigation with Advanced Design */}
          <nav className="p-6 space-y-3 flex-1 overflow-y-auto">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? (isDark 
                          ? 'bg-gradient-to-r from-teal-600/40 to-cyan-600/30 border-2 border-teal-400/50 text-teal-200 shadow-2xl shadow-teal-500/20' 
                          : 'bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-300/60 text-teal-800 shadow-xl')
                      : (isDark 
                          ? 'hover:bg-slate-800/70 text-slate-300 hover:text-white hover:border-slate-600/60 border-2 border-transparent hover:shadow-xl hover:shadow-slate-900/20' 
                          : 'hover:bg-slate-50/90 text-slate-600 hover:text-slate-800 hover:border-slate-300/60 border-2 border-transparent hover:shadow-lg')
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  whileHover={{ 
                    scale: 1.02,
                    x: 4
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Advanced Active Indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b from-teal-400 via-cyan-400 to-emerald-400 rounded-r-full shadow-lg shadow-teal-400/50"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Effect Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 rounded-2xl"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div 
                      className={`p-3 rounded-2xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-2xl shadow-teal-500/30' 
                          : (isDark 
                              ? 'bg-slate-700/60 group-hover:bg-slate-600/80 text-slate-300 group-hover:text-white' 
                              : 'bg-slate-100 group-hover:bg-slate-200 text-slate-600 group-hover:text-slate-700')
                      }`}
                      whileHover={{ rotate: 5 }}
                      animate={isActive ? {
                        boxShadow: [
                          "0 10px 20px rgba(20, 184, 166, 0.3)",
                          "0 15px 30px rgba(6, 182, 212, 0.4)",
                          "0 10px 20px rgba(20, 184, 166, 0.3)"
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon size={20} />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="font-bold text-base tracking-wide">
                        {item.label[language]}
                      </div>
                      <div className={`text-sm mt-1 ${
                        isActive 
                          ? (isDark ? 'text-teal-200' : 'text-teal-600')
                          : (isDark ? 'text-slate-500' : 'text-slate-500')
                      }`}>
                        {item.description[language]}
                      </div>
                    </div>
                    
                    <motion.div
                      className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                        isActive ? 'opacity-100' : ''
                      }`}
                      animate={isActive ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight size={18} />
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </nav>

          {/* Premium Footer */}
          <motion.div 
            className={`mt-auto p-8 border-t ${
              isDark ? 'border-slate-700/50' : 'border-slate-200/50'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className={`text-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <motion.div 
                className="mb-3 font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {language === 'EN' 
                  ? '© 2022 Quantum Sensing Laboratory' 
                  : '© 2022 量子センシング研究室'
                }
              </motion.div>
              <div className="text-xs opacity-80">
                {language === 'EN' ? 'Tokyo Institute of Technology' : '東京工業大学'}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};