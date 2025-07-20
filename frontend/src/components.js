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

// Enhanced Professional Quantum Particles Animation
export const QuantumParticles = ({ intensity = 30 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < intensity; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
          opacity: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2,
          type: Math.random() > 0.7 ? 'energy' : 'particle' // Different types for variety
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [intensity]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute ${
            particle.type === 'energy' 
              ? 'bg-gradient-to-r from-cyan-400 to-teal-400' 
              : 'bg-gradient-to-r from-teal-400 to-emerald-400'
          } shadow-lg`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            borderRadius: particle.type === 'energy' ? '50%' : '2px',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.type === 'energy' ? 'rgba(20, 184, 166, 0.6)' : 'rgba(16, 185, 129, 0.6)'}`
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [particle.opacity, particle.opacity * 0.4, particle.opacity],
            rotate: particle.type === 'energy' ? [0, 360] : [0, 180, 360],
            x: [0, Math.sin(particle.phase) * 20, 0],
            y: [0, Math.cos(particle.phase) * 20, 0]
          }}
          transition={{
            duration: 4 + particle.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.1
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Professional Quantum Network Animation
export const QuantumNetwork = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      for (let i = 0; i < 20; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 85 + 7.5, // Keep nodes away from edges
          y: Math.random() * 85 + 7.5,
          size: Math.random() * 8 + 6, // Larger, more varied sizes
          energy: Math.random(),
          type: Math.random() > 0.6 ? 'quantum' : 'classical'
        });
      }
      setNodes(newNodes);

      // Generate more sophisticated connections
      const newConnections = [];
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = i + 1; j < newNodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(newNodes[i].x - newNodes[j].x, 2) + 
            Math.pow(newNodes[i].y - newNodes[j].y, 2)
          );
          
          // Create connections based on distance and quantum properties
          if (distance < 35 && Math.random() > 0.4) {
            const strength = Math.max(0.1, 1 - distance / 35);
            const isQuantumLink = newNodes[i].type === 'quantum' || newNodes[j].type === 'quantum';
            
            newConnections.push({
              id: `${i}-${j}`,
              x1: newNodes[i].x,
              y1: newNodes[i].y,
              x2: newNodes[j].x,
              y2: newNodes[j].y,
              opacity: strength,
              strength: strength,
              type: isQuantumLink ? 'quantum' : 'classical',
              phase: Math.random() * Math.PI * 2
            });
          }
        }
      }
      setConnections(newConnections);
    };

    generateNodes();
  }, []);

  return (
    <div className="absolute inset-0 opacity-15">
      <svg className="w-full h-full">
        {/* Enhanced connection lines with quantum effects */}
        {connections.map(conn => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke={conn.type === 'quantum' ? "url(#quantumGradient)" : "url(#classicalGradient)"}
            strokeWidth={conn.strength * 2 + 0.5}
            opacity={conn.opacity}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: conn.opacity,
              strokeDasharray: conn.type === 'quantum' ? [5, 5] : [0, 0]
            }}
            transition={{ 
              duration: 2 + conn.strength, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: conn.phase
            }}
          />
        ))}
        
        {/* Enhanced gradient definitions for quantum effects */}
        <defs>
          <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="classicalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e7490" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      
      {/* Enhanced nodes with quantum properties */}
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className={`absolute rounded-full shadow-lg ${
            node.type === 'quantum' 
              ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400' 
              : 'bg-gradient-to-r from-teal-500 to-cyan-500'
          }`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            transform: 'translate(-50%, -50%)',
            boxShadow: node.type === 'quantum' 
              ? `0 0 ${node.size}px rgba(20, 184, 166, 0.6)` 
              : `0 0 ${node.size * 0.5}px rgba(14, 116, 144, 0.4)`,
            filter: 'url(#glow)'
          }}
          animate={{
            scale: node.type === 'quantum' ? [1, 1.4, 1] : [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
            rotate: node.type === 'quantum' ? [0, 360] : [0, 180, 0]
          }}
          transition={{
            duration: node.type === 'quantum' ? 3 + node.energy : 4 + node.energy,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.id * 0.15
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Professional Theme and Language Controls
export const FloatingControls = ({ isDark, setIsDark, language, setLanguage }) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col space-y-3">
      {/* Theme Toggle - Professional Design */}
      <motion.button
        onClick={() => setIsDark(!isDark)}
        className={`p-4 backdrop-blur-xl rounded-2xl border transition-all duration-300 shadow-lg ${
          isDark
            ? 'bg-slate-900/80 border-teal-500/20 text-teal-400 hover:bg-slate-800/90 hover:border-teal-400/40'
            : 'bg-white/90 border-teal-200/30 text-teal-600 hover:bg-white/95 hover:border-teal-300/50 shadow-xl'
        }`}
        whileHover={{ scale: 1.05, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        title={language === 'EN' ? (isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode') : (isDark ? 'ライトモードに切替' : 'ダークモードに切替')}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      {/* Language Toggle - Enhanced Academic Style */}
      <motion.button
        onClick={() => setLanguage(language === 'EN' ? 'JP' : 'EN')}
        className={`px-4 py-3 backdrop-blur-xl rounded-2xl border transition-all duration-300 shadow-lg min-w-[64px] ${
          isDark
            ? 'bg-slate-900/80 border-cyan-500/20 text-cyan-400 hover:bg-slate-800/90 hover:border-cyan-400/40'
            : 'bg-white/90 border-cyan-200/30 text-cyan-600 hover:bg-white/95 hover:border-cyan-300/50 shadow-xl'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={language === 'EN' ? 'Switch to Japanese' : '英語に切替'}
      >
        <div className="flex items-center justify-center space-x-2">
          <Globe size={16} />
          <span className="text-sm font-bold tracking-wider">{language}</span>
        </div>
      </motion.button>

      {/* Professional Institution Badge */}
      <motion.div
        className={`px-3 py-2 backdrop-blur-xl rounded-2xl border text-center shadow-lg ${
          isDark
            ? 'bg-slate-900/60 border-slate-700/30 text-slate-400'
            : 'bg-white/80 border-slate-200/30 text-slate-500 shadow-xl'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="text-xs font-medium tracking-wider">
          {language === 'EN' ? 'Tokyo Tech' : '東工大'}
        </div>
        <div className="text-[10px] opacity-60 mt-0.5">
          {language === 'EN' ? 'Est. 1881' : '創立1881年'}
        </div>
      </motion.div>
    </div>
  );
};

// Sidebar Navigation Component - Enhanced Professional Academic Design
export const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen, language, isDark }) => {
  const menuItems = [
    { id: 'home', label: { EN: 'HOME', JP: 'ホーム' }, icon: Atom },
    { id: 'news', label: { EN: 'NEWS', JP: 'ニュース' }, icon: Calendar },
    { id: 'research', label: { EN: 'RESEARCH', JP: '研究' }, icon: FlaskConical },
    { id: 'publications', label: { EN: 'PUBLICATIONS', JP: '論文' }, icon: BookOpen },
    { id: 'team', label: { EN: 'TEAM', JP: 'メンバー' }, icon: Users },
    { id: 'join', label: { EN: 'JOIN US', JP: '参加' }, icon: UserPlus },
    { id: 'contact', label: { EN: 'CONTACT', JP: '連絡先' }, icon: Mail }
  ];

  return (
    <>
      {/* Mobile Menu Button - Professional Design */}
      <button
        className={`lg:hidden fixed top-6 left-6 z-50 p-3 backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
          isDark 
            ? 'bg-slate-900/80 border-teal-500/20 text-white hover:bg-slate-800/80'
            : 'bg-white/90 border-teal-200/30 text-slate-800 shadow-xl hover:bg-white/95'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-center">
          <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </div>
      </button>

      {/* Enhanced Professional Sidebar */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -400 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-full w-96 backdrop-blur-2xl border-r z-40 ${
          isDark
            ? 'bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95 border-teal-500/20'
            : 'bg-gradient-to-b from-white/98 via-slate-50/95 to-white/98 border-teal-200/30 shadow-2xl'
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          {/* Enhanced Tokyo Tech Institutional Header */}
          <div className="mb-10">
            {/* Tokyo Tech Official Logo */}
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${
                isDark 
                  ? 'bg-teal-600/20 border-teal-500/30' 
                  : 'bg-teal-100 border-teal-200'
              }`}>
                <img 
                  src="https://www.titech.ac.jp/english/0/english/images/emblem.svg" 
                  alt="Tokyo Tech"
                  className="w-10 h-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className={`hidden w-10 h-10 text-lg font-bold items-center justify-center ${
                  isDark ? 'text-teal-400' : 'text-teal-600'
                }`}>
                  東工大
                </div>
              </div>
              <div className="flex-1">
                <div className={`text-xs font-medium tracking-widest uppercase mb-1 ${
                  isDark ? 'text-teal-400' : 'text-teal-600'
                }`}>
                  {language === 'EN' ? 'TOKYO INSTITUTE OF TECHNOLOGY' : '東京工業大学'}
                </div>
                <div className={`text-sm font-light ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {language === 'EN' ? 'National University Corporation' : '国立大学法人'}
                </div>
              </div>
            </div>
            
            {/* Department Information */}
            <div className={`p-4 rounded-2xl border ${
              isDark 
                ? 'bg-slate-800/40 border-slate-700/50' 
                : 'bg-slate-50/80 border-slate-200/50'
            }`}>
              <div className={`text-sm font-medium mb-1 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                {language === 'EN' 
                  ? 'Department of Electrical & Electronic Engineering'
                  : '電気電子系'
                }
              </div>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {language === 'EN' ? 'School of Engineering' : '工学院'}
              </div>
            </div>
            
            {/* Laboratory Identity */}
            <div className="mt-6">
              <h1 className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`} style={{ fontFamily: '"Inter", system-ui' }}>
                {language === 'EN' ? 'Arai Laboratory' : '荒井研究室'}
              </h1>
              <div className={`text-sm font-medium ${
                isDark ? 'text-teal-300' : 'text-teal-600'
              }`}>
                {language === 'EN' ? 'Quantum Sensing & Informatics' : '量子センシング・情報科学'}
              </div>
            </div>
            
            {/* Professional Accent Line */}
            <div className="mt-6 w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" />
          </div>

          {/* Enhanced Navigation Menu */}
          <nav className="space-y-1 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center space-x-4 group ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg transform scale-[1.02]'
                      : isDark
                        ? 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                        : 'text-slate-600 hover:bg-teal-50/80 hover:text-teal-700'
                  }`}
                  whileHover={{ scale: currentPage === item.id ? 1.02 : 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="font-medium text-sm tracking-wide" style={{ fontFamily: '"Inter", system-ui' }}>
                    {item.label[language]}
                  </span>
                  {currentPage === item.id && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-lg" />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Enhanced Footer with Professional Credentials */}
          <div className={`mt-8 pt-6 border-t space-y-4 ${
            isDark ? 'border-slate-700/50' : 'border-slate-200/50'
          }`}>
            {/* Quick Links */}
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium tracking-wide ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {language === 'EN' ? 'OFFICIAL LINKS' : '公式リンク'}
              </span>
              <div className="flex space-x-3">
                <a 
                  href="https://www.titech.ac.jp/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'text-teal-400 hover:text-white hover:bg-slate-800/50' : 'text-teal-500 hover:text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            
            {/* Academic Credentials */}
            <div className={`text-xs leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`} style={{ fontFamily: '"Inter", system-ui' }}>
              <div className="font-medium mb-1">
                © 2025 {language === 'EN' ? 'Arai Laboratory' : '荒井研究室'}
              </div>
              <div className="opacity-80">
                {language === 'EN' 
                  ? 'Tokyo Institute of Technology • National University Corporation'
                  : '東京工業大学・国立大学法人'
                }
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section Component - Enhanced Professional Academic Design
export const HeroSection = ({ language, isDark }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional Academic Background */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      }`} />
      
      {/* Subtle Scientific Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#14b8a6' : '#0f766e'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Enhanced Quantum Particles with Scientific Precision */}
      <QuantumParticles intensity={25} />
      
      {/* Professional Quantum Network */}
      <div className="absolute inset-0 opacity-8">
        <QuantumNetwork />
      </div>

      {/* Academic Content Layout */}
      <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
        {/* Institutional Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          {/* Tokyo Tech Institutional Badge */}
          <div className={`inline-flex items-center px-6 py-3 rounded-2xl border backdrop-blur-sm mb-6 ${
            isDark 
              ? 'bg-slate-900/80 border-teal-500/30 text-teal-300'
              : 'bg-white/90 border-teal-200/50 text-teal-700 shadow-lg'
          }`}>
            <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center ${
              isDark ? 'bg-teal-600/20' : 'bg-teal-100'
            }`}>
              <span className={`text-sm font-bold ${
                isDark ? 'text-teal-400' : 'text-teal-600'
              }`}>東工大</span>
            </div>
            <span className="text-sm font-medium tracking-wide">
              {language === 'EN' ? 'TOKYO INSTITUTE OF TECHNOLOGY' : '東京工業大学'}
            </span>
          </div>
          
          {/* Laboratory Title with Academic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h2 className={`text-2xl md:text-4xl font-light tracking-wide mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`} style={{ fontFamily: '"Inter", "Noto Sans", system-ui' }}>
              {language === 'EN' ? 'Arai Laboratory' : '荒井研究室'}
            </h2>
            <div className={`text-sm font-medium tracking-widest uppercase ${
              isDark ? 'text-teal-400' : 'text-teal-600'
            }`}>
              {language === 'EN' 
                ? 'Department of Electrical & Electronic Engineering'
                : '電気電子系'
              }
            </div>
          </motion.div>
        </motion.div>

        {/* Main Scientific Titles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        >
          <motion.h1 
            className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ 
              fontFamily: '"Inter", system-ui',
              textShadow: isDark ? '0 0 40px rgba(20, 184, 166, 0.3)' : '0 0 40px rgba(15, 118, 110, 0.1)'
            }}
            animate={{
              textShadow: [
                isDark ? '0 0 40px rgba(20, 184, 166, 0.3)' : '0 0 40px rgba(15, 118, 110, 0.1)',
                isDark ? '0 0 60px rgba(20, 184, 166, 0.5)' : '0 0 60px rgba(15, 118, 110, 0.2)',
                isDark ? '0 0 40px rgba(20, 184, 166, 0.3)' : '0 0 40px rgba(15, 118, 110, 0.1)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              {language === 'EN' ? 'Quantum Sensing' : '量子センシング'}
            </span>
          </motion.h1>
          
          {/* Academic Subtitle with Professional Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-8"
          >
            <h2 className={`text-2xl md:text-4xl font-light mb-4 ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`} style={{ fontFamily: '"Inter", system-ui' }}>
              {language === 'EN' ? '& Informatics for' : 'と情報科学による'}
            </h2>
            
            <div className="relative inline-block">
              <h3 className={`text-3xl md:text-5xl font-bold tracking-wide ${
                isDark ? 'text-white' : 'text-slate-900'
              }`} style={{ fontFamily: '"Inter", system-ui' }}>
                <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  {language === 'EN' ? 'Quantum Transformation' : 'クォンタム変革'}
                </span>
              </h3>
              {/* Professional underline accent */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
            </div>
          </motion.div>

          {/* Scientific Research Focus Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className={`max-w-4xl mx-auto text-lg md:text-xl font-light leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
            style={{ fontFamily: '"Inter", system-ui' }}
          >
            {language === 'EN' 
              ? 'Pioneering quantum sensing technologies and information science integration to drive revolutionary advances in quantum physics applications'
              : '量子センシング技術と情報科学の統合により、量子物理学応用における革新的な進歩を推進'
            }
          </motion.div>
        </motion.div>

        {/* Professional Academic Navigation Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className={`text-xs tracking-wider uppercase ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {language === 'EN' ? 'Explore Research' : '研究を探索'}
            </span>
            <ChevronDown 
              size={24} 
              className={`animate-bounce ${
                isDark ? 'text-teal-400' : 'text-teal-500'
              }`}
            />
          </div>
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
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-8" />
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
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg"
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
// Enhanced Professional Mission Section Component  
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
    EN: "The Arai Laboratory at Tokyo Institute of Technology was established in April 2022 with the central theme of advancing quantum technologies. Our research concentrates on quantum sensing, uniquely integrated with computational informatics to pioneer transformative innovations in what we term 'Quantum Transformation' — a paradigm shift in how quantum physics applications drive technological advancement.",
    JP: "東京工業大学荒井研究室は2022年4月に量子技術の発展を中心テーマとして設立されました。私たちの研究は量子センシングに特化し、計算情報学と独自に統合することで、「クォンタム変革」と呼ぶ変革的イノベーションの開拓を目指しています。これは量子物理学応用が技術進歩を推進する新たなパラダイムです。"
  };

  const keyPrinciples = [
    { 
      title: { EN: 'Quantum Sensing Excellence', JP: '量子センシング最適化' },
      icon: Microscope,
      description: { 
        EN: 'Pioneering high-precision quantum measurement technologies',
        JP: '高精度量子測定技術の先駆的研究'
      },
      color: 'from-teal-500 to-cyan-500'
    },
    { 
      title: { EN: 'Computational Integration', JP: '計算統合' },
      icon: Laptop,
      description: { 
        EN: 'Advanced informatics and quantum computing convergence',
        JP: '先進情報学と量子コンピューティングの融合'
      },
      color: 'from-cyan-500 to-emerald-500'
    },
    { 
      title: { EN: 'Transformative Innovation', JP: '変革的イノベーション' },
      icon: Zap,
      description: { 
        EN: 'Revolutionary applications across multiple scientific domains',
        JP: '複数の科学領域における革新的応用'
      },
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const researchTopics = [
    { 
      title: { EN: 'Diamond NV Centers', JP: 'ダイヤモンドNVセンター' },
      icon: Diamond,
      color: 'from-teal-600 to-cyan-600'
    },
    { 
      title: { EN: 'Quantum Magnetometry', JP: '量子磁気測定' },
      icon: Magnet,
      color: 'from-cyan-600 to-emerald-600'
    },
    { 
      title: { EN: 'Biomedical Applications', JP: '生体医学応用' },
      icon: Dna,
      color: 'from-emerald-600 to-teal-600'
    },
    { 
      title: { EN: 'Material Characterization', JP: '材料特性解析' },
      icon: TestTube,
      color: 'from-teal-700 to-slate-600'
    },
    { 
      title: { EN: 'Quantum Informatics', JP: '量子インフォマティクス' },
      icon: Laptop,
      color: 'from-slate-600 to-cyan-700'
    }
  ];

  return (
    <section className={`py-32 px-8 relative overflow-hidden ${
      isDark ? 'bg-gradient-to-b from-slate-900/30 to-slate-800/20' : 'bg-gradient-to-b from-slate-50/80 to-white/95'
    }`} ref={ref}>
      
      {/* Scientific Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 35%, ${isDark ? '#14b8a6' : '#0f766e'} 35%, ${isDark ? '#14b8a6' : '#0f766e'} 65%, transparent 65%), linear-gradient(-45deg, transparent 35%, ${isDark ? '#06b6d4' : '#0891b2'} 35%, ${isDark ? '#06b6d4' : '#0891b2'} 65%, transparent 65%)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Academic Header */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className={`inline-flex items-center px-6 py-3 rounded-2xl border backdrop-blur-sm mb-8 ${
            isDark 
              ? 'bg-slate-900/60 border-teal-500/30 text-teal-300'
              : 'bg-white/80 border-teal-200/50 text-teal-700 shadow-lg'
          }`}>
            <FlaskConical className="mr-3" size={20} />
            <span className="text-sm font-medium tracking-wider uppercase">
              {language === 'EN' ? 'RESEARCH MISSION' : '研究ミッション'}
            </span>
          </div>
          
          <h2 className={`text-6xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`} style={{ fontFamily: '"Inter", system-ui' }}>
            {language === 'EN' ? 'Our Scientific Mission' : '私たちの科学的使命'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        {/* Enhanced Mission Content with Academic Layout */}
        <div className="grid xl:grid-cols-3 gap-12 items-start mb-20">
          {/* Main Mission Statement */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="xl:col-span-2"
          >
            <div className={`backdrop-blur-xl rounded-3xl p-10 border ${
              isDark 
                ? 'bg-slate-900/60 border-teal-500/20' 
                : 'bg-white/90 border-teal-200/30 shadow-2xl'
            }`}>
              <div className={`text-lg md:text-xl leading-relaxed mb-8 ${
                isDark ? 'text-slate-200' : 'text-slate-700'
              }`} style={{ fontFamily: '"Inter", system-ui' }}>
                {missionText[language]}
              </div>
              
              {/* Key Principles Grid */}
              <div className="grid gap-6">
                {keyPrinciples.map((principle, index) => {
                  const IconComponent = principle.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className={`flex items-center space-x-4 p-5 rounded-2xl ${
                        isDark ? 'bg-slate-800/40' : 'bg-slate-50/80'
                      }`}
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${principle.color}`}>
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold text-lg mb-1 ${
                          isDark ? 'text-white' : 'text-slate-800'
                        }`}>
                          {principle.title[language]}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {principle.description[language]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Research Highlights Sidebar */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            <div className={`backdrop-blur-xl rounded-3xl p-8 border ${
              isDark 
                ? 'bg-slate-900/60 border-teal-500/20' 
                : 'bg-white/90 border-teal-200/30 shadow-xl'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                {language === 'EN' ? 'Core Research Areas' : '主要研究分野'}
              </h3>
              
              <div className="space-y-3">
                {[
                  { icon: Diamond, title: { EN: 'NV Centers', JP: 'NVセンター' } },
                  { icon: Magnet, title: { EN: 'Magnetometry', JP: '磁気測定' } },
                  { icon: Dna, title: { EN: 'Biosensing', JP: 'バイオセンシング' } },
                  { icon: TestTube, title: { EN: 'Materials', JP: '材料科学' } },
                  { icon: Laptop, title: { EN: 'Informatics', JP: '情報科学' } }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDark 
                          ? 'bg-slate-800/40 hover:bg-slate-700/50' 
                          : 'bg-slate-50/80 hover:bg-teal-50/90'
                      }`}
                    >
                      <div className="flex justify-center items-center w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500">
                        <IconComponent className="text-white" size={18} />
                      </div>
                      <span className={`text-sm font-medium ${
                        isDark ? 'text-slate-200' : 'text-slate-700'
                      }`}>
                        {item.title[language]}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Research Excellence Badges */}
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
          <h3 className={`text-3xl font-bold mb-10 ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>
            {language === 'EN' ? 'Quantum Research Specializations' : '量子研究専門分野'}
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
                  className={`group px-6 py-4 rounded-2xl bg-gradient-to-r ${topic.color} text-white font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={20} />
                  <span>{topic.title[language]}</span>
                  <div className="w-2 h-2 bg-white/50 rounded-full group-hover:bg-white/80 transition-colors" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Professional News Card Component
export const NewsCard = ({ news, index, language, isDark = true }) => {
  const tags = news.tags || [];
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 group ${
        isDark 
          ? 'bg-slate-900/60 border-teal-500/20 hover:border-teal-400/40 hover:bg-slate-800/70'
          : 'bg-white/80 border-teal-200/30 hover:border-teal-300/50 shadow-lg hover:shadow-xl'
      }`}
    >
      <div className="flex items-start space-x-6">
        {/* Enhanced Visual Indicator */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg" />
          <div className={`w-0.5 h-16 mt-2 ${
            isDark ? 'bg-slate-700' : 'bg-slate-200'
          }`} />
        </div>
        
        <div className="flex-1 space-y-4">
          {/* Enhanced Date and Source */}
          <div className="flex items-center justify-between">
            <div className={`text-sm flex items-center ${
              isDark ? 'text-teal-300' : 'text-teal-600'
            }`}>
              <Calendar size={16} className="mr-2" />
              <time dateTime={news.date} className="font-medium">
                {new Date(news.date).toLocaleDateString(language === 'EN' ? 'en-US' : 'ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            {/* Publication Type Badge */}
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
              isDark
                ? 'bg-slate-800/50 text-slate-300 border border-slate-600/30'
                : 'bg-slate-100 text-slate-600 border border-slate-200/50'
            }`}>
              {language === 'EN' ? 'Academic News' : 'アカデミック・ニュース'}
            </span>
          </div>
          
          {/* Enhanced Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                    isDark
                      ? 'bg-teal-900/40 text-teal-300 border border-teal-500/30 hover:bg-teal-800/50'
                      : 'bg-teal-50 text-teal-700 border border-teal-200/50 hover:bg-teal-100'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Enhanced Title */}
          <h3 className={`text-xl font-semibold leading-relaxed transition-colors ${
            isDark 
              ? 'text-white group-hover:text-teal-300' 
              : 'text-slate-900 group-hover:text-teal-700'
          }`} style={{ fontFamily: '"Inter", system-ui' }}>
            {news.title[language] || news.title}
          </h3>
          
          {/* Enhanced Read More Link */}
          <div className="pt-2">
            <a 
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                isDark 
                  ? 'text-teal-400 hover:text-white hover:bg-teal-600/20 border border-teal-500/30 hover:border-teal-400/50'
                  : 'text-teal-600 hover:text-teal-800 hover:bg-teal-50 border border-teal-200/50 hover:border-teal-300/70'
              }`}
            >
              <span>{language === 'EN' ? 'Read Full Article' : '全文を読む'}</span>
              <ExternalLink size={14} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Research Card Component
export const ResearchCard = ({ title, description, image, index, language }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-black/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-teal-500/20 hover:border-teal-400/40 transition-all duration-300 group"
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
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors">
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
      className="bg-black/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-teal-500/20 hover:border-teal-400/40 transition-all duration-300 group text-center"
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
        <p className="text-teal-400 font-semibold mb-4">{position[language] || position}</p>
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
      className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-teal-500/20 hover:border-teal-400/40 transition-all duration-300 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">{title[language] || title}</h3>
      {link ? (
        <a 
          href={link}
          className="text-teal-300 hover:text-teal-200 transition-colors"
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
          ? 'bg-black/40 border-teal-500/20'
          : 'bg-white/70 border-teal-300/30 shadow-xl'
      }`}
    >
      {/* Header */}
      <div className="p-8 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl ${
              isDark ? 'bg-teal-600/20' : 'bg-teal-100'
            }`}>
              <Diamond className={`${
                isDark ? 'text-teal-400' : 'text-teal-600'
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
                ? 'bg-teal-600/20 text-teal-400 hover:bg-teal-600/30'
                : 'bg-teal-100 text-teal-600 hover:bg-teal-200'
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
              isDark ? 'text-cyan-400' : 'text-cyan-600'
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
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
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
            className="absolute top-6 right-6 z-10 p-3 bg-teal-600/20 text-teal-400 hover:bg-teal-600/30 rounded-xl transition-all duration-300"
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