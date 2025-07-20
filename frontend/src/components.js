import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Calendar,
  Users,
  UserPlus,
  BookOpen,
  FlaskConical,
  Atom,
  Sparkles,
  Github,
  Scholar,
  Sun,
  Moon,
  Globe,
  Microscope,
  Magnet,
  Diamond,
  Zap,
  Laptop,
  Dna,
  TestTube,
  Maximize2,
  Info
} from 'lucide-react';

// Quantum Particle Animation Component
export const QuantumParticles = ({ intensity = 50 }) => {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < intensity; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 2 + 0.5
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: (particle.y + particle.speed * 0.1) % 100,
          x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.02
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-teal-400 to-cyan-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Quantum Network Animation
export const QuantumNetwork = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      for (let i = 0; i < 15; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
          size: Math.random() * 8 + 4
        });
      }
      setNodes(newNodes);

      const newConnections = [];
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = i + 1; j < newNodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(newNodes[i].x - newNodes[j].x, 2) + 
            Math.pow(newNodes[i].y - newNodes[j].y, 2)
          );
          if (distance < 30 && Math.random() > 0.6) {
            newConnections.push({
              id: `${i}-${j}`,
              x1: newNodes[i].x,
              y1: newNodes[i].y,
              x2: newNodes[j].x,
              y2: newNodes[j].y,
              opacity: Math.max(0.1, 1 - distance / 30)
            });
          }
        }
      }
      setConnections(newConnections);
    };

    generateNodes();
  }, []);

  return (
    <div className="absolute inset-0 opacity-20">
      <svg className="w-full h-full">
        {connections.map(conn => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="url(#gradient)"
            strokeWidth="1"
            opacity={conn.opacity}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#0e7490" />
          </linearGradient>
        </defs>
      </svg>
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.id * 0.2
          }}
        />
      ))}
    </div>
  );
};

// Theme and Language Toggle Buttons
export const FloatingControls = ({ isDark, setIsDark, language, setLanguage }) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex space-x-3">
      {/* Theme Toggle */}
      <motion.button
        onClick={() => setIsDark(!isDark)}
        className="p-3 bg-black/20 backdrop-blur-md rounded-xl border border-teal-500/20 text-white hover:bg-teal-500/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      {/* Language Toggle */}
      <motion.button
        onClick={() => setLanguage(language === 'EN' ? 'JP' : 'EN')}
        className="p-3 bg-black/20 backdrop-blur-md rounded-xl border border-teal-500/20 text-white hover:bg-cyan-500/20 transition-all duration-300 min-w-[50px]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center space-x-1">
          <Globe size={16} />
          <span className="text-sm font-medium">{language}</span>
        </div>
      </motion.button>
    </div>
  );
};

// Sidebar Navigation Component
export const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen, language, isDark }) => {
  const menuItems = [
    { id: 'home', label: { EN: 'TOP', JP: 'トップ' }, icon: Atom },
    { id: 'news', label: { EN: 'News', JP: 'ニュース' }, icon: Calendar },
    { id: 'research', label: { EN: 'Research', JP: '研究' }, icon: FlaskConical },
    { id: 'publications', label: { EN: 'Publications', JP: '論文' }, icon: BookOpen },
    { id: 'team', label: { EN: 'Team', JP: 'メンバー' }, icon: Users },
    { id: 'join', label: { EN: 'Join Us', JP: '参加する' }, icon: UserPlus },
    { id: 'contact', label: { EN: 'Contact', JP: '連絡先' }, icon: Mail }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className={`lg:hidden fixed top-6 left-6 z-50 p-3 backdrop-blur-md rounded-xl border transition-all ${
          isDark 
            ? 'bg-black/20 border-purple-500/20 text-white'
            : 'bg-white/80 border-purple-300/30 text-gray-800 shadow-lg'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-center">
          <span className={`block h-0.5 w-6 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-all mt-1 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-all mt-1 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </div>
      </button>

      {/* Sidebar - Always visible on desktop */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -320 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-full w-80 backdrop-blur-xl border-r z-40 ${
          isDark
            ? 'bg-gradient-to-b from-black/90 via-slate-900/80 to-black/90 border-teal-500/20'
            : 'bg-gradient-to-b from-white/95 via-slate-50/90 to-white/95 border-teal-200/30 shadow-2xl'
        }`}
      >
        <div className="p-8">
          {/* Tokyo Tech Logo */}
          <div className="mb-8 flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              isDark ? 'bg-teal-600' : 'bg-teal-100'
            }`}>
              <img 
                src="https://www.titech.ac.jp/english/0/english/images/emblem.svg" 
                alt="Tokyo Tech"
                className="w-12 h-12"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className={`hidden text-2xl font-bold ${
                isDark ? 'text-white' : 'text-teal-600'
              }`}>
                TIT
              </div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {language === 'EN' ? 'Arai\'s Laboratory' : '荒井研究室'}
              </h1>
              <p className={`text-sm ${
                isDark ? 'text-teal-300' : 'text-teal-600'
              }`}>
                {language === 'EN' ? 'Tokyo Institute of Technology' : '東京工業大学'}
              </p>
              <p className={`text-xs mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {language === 'EN' 
                  ? 'Dept. of Electrical & Electronic Engineering' 
                  : '電気電子系'
                }
              </p>
            </div>
          </div>
          
          <div className="w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mb-8" />

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 group ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : isDark
                        ? 'text-purple-200 hover:bg-white/10 hover:text-white'
                        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className="font-medium">{item.label[language]}</span>
                </motion.button>
              );
            })}
          </nav>

          <div className={`mt-16 pt-8 border-t ${
            isDark ? 'border-purple-500/20' : 'border-purple-200/40'
          }`}>
            <div className="flex space-x-4">
              <a href="https://www.titech.ac.jp/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${
                isDark ? 'text-purple-300 hover:text-white' : 'text-purple-500 hover:text-purple-700'
              }`}>
                <ExternalLink size={16} />
              </a>
            </div>
            <p className={`text-xs mt-4 ${
              isDark ? 'text-purple-400' : 'text-gray-500'
            }`}>
              © 2025 {language === 'EN' ? 'Arai\'s Laboratory' : '荒井研究室'}<br />
              {language === 'EN' ? 'Tokyo Institute of Technology' : '東京工業大学'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section Component - Updated without orange and with new background
export const HeroSection = ({ language, isDark }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Clean Gradient Background */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-black via-purple-900/40 to-blue-900/60' 
          : 'bg-gradient-to-br from-white via-blue-100/80 to-purple-200/60'
      }`} />
      
      {/* Quantum Particles */}
      <QuantumParticles intensity={40} />
      
      {/* Quantum Network - More subtle */}
      <div className="absolute inset-0 opacity-10">
        <QuantumNetwork />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Laboratory Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h3 className={`text-2xl md:text-3xl font-semibold ${
              isDark ? 'text-purple-300' : 'text-purple-600'
            }`}>
              {language === 'EN' ? 'Arai\'s Laboratory' : '荒井研究室'}
            </h3>
            <p className={`text-lg mt-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {language === 'EN' ? 'Tokyo Institute of Technology' : '東京工業大学'}
            </p>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {language === 'EN' ? 'Quantum Sensing' : '量子センシング'}
          </motion.h1>
          
          <motion.h2 
            className={`text-3xl md:text-5xl font-semibold mb-8 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {language === 'EN' ? 'and Informatics for' : 'と情報科学による'}
          </motion.h2>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h3 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text">
              {language === 'EN' ? 'Quantum Transformation' : 'クォンタム変革'}
            </h3>
            <div className={`absolute -inset-1 bg-gradient-to-r ${
              isDark ? 'from-blue-400/20 to-purple-500/20' : 'from-blue-300/30 to-purple-400/30'
            } blur-xl`} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <ChevronDown 
            size={32} 
            className={`animate-bounce mx-auto ${
              isDark ? 'text-white/70' : 'text-gray-600/70'
            }`}
          />
        </motion.div>
      </div>
    </section>
  );
};

// Recent News Section Component
export const RecentNewsSection = ({ language, isDark, newsData, setCurrentPage }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className={`py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-black/10' : 'bg-gray-50'
    }`} ref={ref}>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Recent News' : '最新ニュース'}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
        </motion.div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {newsData.slice(0, 3).map((news, index) => (
            <NewsCard key={index} news={news} index={index} language={language} isDark={isDark} />
          ))}
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => setCurrentPage('news')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === 'EN' ? 'View All News' : '全てのニュースを見る'}
            <ExternalLink className="ml-2" size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};  
// Mission Section Component  
export const MissionSection = ({ language, isDark }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const missionText = {
    EN: "The Arai group at the Tokyo Institute of Technology was established in April 2022 with the theme of quantum technology. Among the many quantum technologies, we focus on quantum sensing. By combining it with information science (informatics), we aim to create an innovation called 'quantum transformation'.",
    JP: "東京工業大学荒井研究室は2022年4月に量子技術をテーマとして設立されました。多くの量子技術の中でも、私たちは量子センシングに焦点を当てています。これを情報科学（インフォマティクス）と組み合わせることで、「クォンタム変革」と呼ばれるイノベーションの創出を目指しています。"
  };

  const researchTopics = [
    { 
      title: { EN: 'Quantum Physics', JP: '量子物理学' },
      icon: Microscope,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      title: { EN: 'Nanoscale Magnetometry', JP: 'ナノスケール磁気測定' },
      icon: Magnet,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      title: { EN: 'Diamond Science', JP: 'ダイヤモンド科学' },
      icon: Diamond,
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      title: { EN: 'Biomedical Sensing', JP: '生体医学センシング' },
      icon: Dna,
      color: 'from-green-500 to-teal-500'
    },
    { 
      title: { EN: 'Material Analysis', JP: '材料解析' },
      icon: TestTube,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className={`py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-gray-800/20' : 'bg-white/90'
    }`} ref={ref}>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Our Mission' : '私たちの使命'}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
        </motion.div>

        {/* Enhanced Mission Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={`backdrop-blur-lg rounded-3xl p-8 border ${
              isDark 
                ? 'bg-gray-800/40 border-purple-500/30' 
                : 'bg-white/90 border-purple-300/30 shadow-xl'
            }`}>
              <p className={`text-lg leading-relaxed mb-6 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {missionText[language]}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  <span className={isDark ? 'text-purple-300' : 'text-purple-600'}>
                    {language === 'EN' ? 'Quantum Sensing Technologies' : '量子センシング技術'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <span className={isDark ? 'text-blue-300' : 'text-blue-600'}>
                    {language === 'EN' ? 'Information Science Integration' : '情報科学との統合'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                  <span className={isDark ? 'text-pink-300' : 'text-pink-600'}>
                    {language === 'EN' ? 'Quantum Transformation Innovation' : 'クォンタム変革イノベーション'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: Microscope, title: { EN: 'Quantum Sensing', JP: '量子センシング' } },
              { icon: Laptop, title: { EN: 'Quantum Informatics', JP: '量子インフォマティクス' } },
              { icon: Zap, title: { EN: 'Quantum Transformation', JP: 'クォンタム変革' } },
              { icon: Magnet, title: { EN: 'Magnetometry', JP: '磁気測定' } },
              { icon: Diamond, title: { EN: 'Diamond NV', JP: 'ダイヤモンドNV' } },
              { icon: Dna, title: { EN: 'Biosensing', JP: 'バイオセンシング' } },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className={`p-4 rounded-2xl text-center backdrop-blur-lg border ${
                    isDark 
                      ? 'bg-gray-700/40 border-purple-400/30 hover:bg-gray-600/50'
                      : 'bg-white/80 border-purple-200/30 hover:bg-purple-50/90'
                  } transition-all duration-300 hover:scale-105`}
                >
                  <div className="flex justify-center mb-2">
                    <IconComponent className="text-purple-400" size={24} />
                  </div>
                  <p className={`text-sm font-medium ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {item.title[language]}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Research Topics */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className={`text-3xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Research Topics along Quantum' : '量子に沿った研究トピック'}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {researchTopics.map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className={`px-6 py-3 rounded-full bg-gradient-to-r ${topic.color} text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center`}
                  whileHover={{ scale: 1.05 }}
                >
                  <IconComponent className="mr-2" size={18} />
                  {topic.title[language]}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// News Card Component
export const NewsCard = ({ news, index, language, isDark = true }) => {
  const tags = news.tags || [];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 group ${
        isDark 
          ? 'bg-black/40 border-purple-500/20 hover:border-purple-400/40'
          : 'bg-white/70 border-purple-300/30 hover:border-purple-400/50 shadow-lg'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2" />
        </div>
        <div className="flex-1">
          <div className={`text-sm mb-3 flex items-center ${
            isDark ? 'text-purple-300' : 'text-purple-600'
          }`}>
            <Calendar size={14} className="mr-2" />
            {news.date}
          </div>
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-2 py-1 text-xs rounded-full ${
                    isDark
                      ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30'
                      : 'bg-purple-100 text-purple-700 border border-purple-300/50'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h3 className={`text-lg font-semibold mb-4 transition-colors ${
            isDark 
              ? 'text-white group-hover:text-purple-300' 
              : 'text-gray-800 group-hover:text-purple-600'
          }`}>
            {news.title[language] || news.title}
          </h3>
          <a 
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors inline-flex items-center text-sm ${
              isDark 
                ? 'text-purple-400 hover:text-purple-300'
                : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            {language === 'EN' ? 'Read more' : '続きを読む'}
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Research Card Component
export const ResearchCard = ({ title, description, image, index, language }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-black/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group"
    >
      <div className="h-64 bg-cover bg-center relative overflow-hidden">
        <img 
          src={image} 
          alt={title[language] || title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
          {title[language] || title}
        </h3>
        <p className="text-gray-300 leading-relaxed">
          {description[language] || description}
        </p>
      </div>
    </motion.div>
  );
};

// Team Member Card
export const TeamMemberCard = ({ name, position, education, image, index, language }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-black/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group text-center"
    >
      <div className="h-80 bg-cover bg-center relative overflow-hidden">
        <img 
          src={image} 
          alt={name[language] || name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-2">{name[language] || name}</h3>
        <p className="text-purple-400 font-semibold mb-4">{position[language] || position}</p>
        <div className="space-y-2 text-gray-300 text-sm">
          {(education[language] || education).map((edu, idx) => (
            <p key={idx}>{edu}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Contact Info Card
export const ContactCard = ({ icon: Icon, title, content, link, language }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">{title[language] || title}</h3>
      {link ? (
        <a 
          href={link}
          className="text-purple-300 hover:text-purple-200 transition-colors"
        >
          {content}
        </a>
      ) : (
        <p className="text-gray-300">{content}</p>
      )}
    </motion.div>
  );
};

// NV Center Visualization Component
export const NVCenterVisualization = ({ language, isDark }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Choose the appropriate HTML file based on theme
  const nvCenterUrl = isDark ? "/nv_center_dark.html" : "/nv_center_light.html";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`backdrop-blur-lg rounded-3xl border overflow-hidden mb-16 ${
        isDark 
          ? 'bg-black/40 border-purple-500/20'
          : 'bg-white/70 border-purple-300/30 shadow-xl'
      }`}
    >
      {/* Header */}
      <div className="p-8 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl ${
              isDark ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <Diamond className={`${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`} size={24} />
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {language === 'EN' 
                  ? 'Nitrogen-Vacancy Center in Diamond' 
                  : 'ダイヤモンド中の窒素空孔センター'
                }
              </h2>
              <p className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {language === 'EN' 
                  ? 'Interactive 3D Structure Visualization' 
                  : 'インタラクティブ3D構造可視化'
                }
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isDark 
                ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30'
                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Maximize2 size={20} />
          </motion.button>
        </div>
        
        {/* Description */}
        <div className={`p-6 rounded-2xl mb-6 ${
          isDark ? 'bg-gray-800/40' : 'bg-gray-100/80'
        }`}>
          <div className="flex items-start space-x-4">
            <Info className={`${
              isDark ? 'text-blue-400' : 'text-blue-600'
            } flex-shrink-0 mt-1`} size={20} />
            <div className="space-y-2">
              <p className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                {language === 'EN' 
                  ? 'The nitrogen-vacancy (NV) center is a point defect in diamond consisting of a nitrogen atom (N) adjacent to a vacancy (V) in the crystal lattice. This quantum defect serves as the foundation for our quantum sensing research.'
                  : '窒素空孔（NV）センターは、結晶格子内の空孔（V）に隣接する窒素原子（N）からなるダイヤモンドの点欠陥です。この量子欠陥は、私たちの量子センシング研究の基礎となっています。'
                }
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isDark ? 'bg-gray-500' : 'bg-gray-600'
                  }`}></div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {language === 'EN' ? 'Carbon atoms' : '炭素原子'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {language === 'EN' ? 'Nitrogen atom' : '窒素原子'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {language === 'EN' ? 'Vacancy' : '空孔'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visualization */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black/95' : 'relative'}`}>
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 z-10 p-3 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 rounded-xl transition-all duration-300"
          >
            <Maximize2 size={20} />
          </button>
        )}
        <div className={`${
          isFullscreen 
            ? 'w-full h-full p-8' 
            : 'h-96 md:h-[500px] lg:h-[600px]'
        }`}>
          <iframe
            src={nvCenterUrl}
            title="NV Center Visualization"
            className="w-full h-full border-0 rounded-xl"
            style={{ 
              minHeight: isFullscreen ? '100vh' : '400px'
            }}
          />
        </div>
      </div>
      
      {/* Controls/Info */}
      {!isFullscreen && (
        <div className="p-6 pt-0">
          <div className={`text-sm text-center ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? 'Click and drag to rotate • Scroll to zoom • Click fullscreen for detailed view'
              : 'クリックしてドラッグで回転 • スクロールでズーム • フルスクリーンで詳細表示'
            }
          </div>
        </div>
      )}
    </motion.div>
  );
};