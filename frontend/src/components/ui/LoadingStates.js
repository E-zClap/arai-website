import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, AtomIcon, FlaskConical } from 'lucide-react';

// Loading spinner for general use
export const LoadingSpinner = ({ size = 24, isDark = true, className = "" }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={className}
    >
      <Loader2 
        size={size} 
        className={`${isDark ? 'text-teal-400' : 'text-teal-600'}`}
      />
    </motion.div>
  );
};

// Scientific loading animation with quantum particles
export const QuantumLoader = ({ isDark = true, text, language = 'EN' }) => {
  const loadingText = {
    EN: text || 'Loading quantum data...',
    JP: text || '量子データを読み込み中...'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center p-8 space-y-6"
    >
      {/* Quantum Atom Animation */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <AtomIcon 
            size={64} 
            className={`${isDark ? 'text-teal-400' : 'text-teal-600'}`}
          />
        </motion.div>
        
        {/* Orbiting particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2 + i * 0.5, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 0.2 
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `rotate(${i * 120}deg)`
            }}
          >
            <motion.div
              className={`
                w-2 h-2 rounded-full absolute
                ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}
              `}
              style={{
                top: '10px',
                left: '50%',
                marginLeft: '-4px'
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`
          text-lg font-medium tracking-wide
          ${isDark ? 'text-slate-300' : 'text-slate-700'}
        `}
      >
        {loadingText[language]}
      </motion.p>

      {/* Progress Dots */}
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            className={`
              w-2 h-2 rounded-full
              ${isDark ? 'bg-teal-400' : 'bg-teal-600'}
            `}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Skeleton loader for content
export const ContentSkeleton = ({ isDark = true, lines = 3 }) => {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(lines)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, width: "0%" }}
          animate={{ opacity: 1, width: `${60 + Math.random() * 40}%` }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`
            h-4 rounded
            ${isDark ? 'bg-slate-700' : 'bg-gray-200'}
          `}
        />
      ))}
    </div>
  );
};

// Card skeleton loader
export const CardSkeleton = ({ isDark = true, count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={`
            p-6 rounded-lg border animate-pulse
            ${isDark 
              ? 'bg-slate-900/50 border-slate-700/50' 
              : 'bg-white border-gray-200'
            }
          `}
        >
          <div className={`h-32 mb-4 rounded ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`} />
          <div className={`h-6 mb-2 rounded ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`} />
          <div className={`h-4 mb-2 rounded w-3/4 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`} />
          <div className={`h-4 rounded w-1/2 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`} />
        </motion.div>
      ))}
    </div>
  );
};

// Page transition loader
export const PageTransitionLoader = ({ isDark = true }) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`
        fixed top-0 left-0 right-0 h-1 z-50 origin-left
        bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500
      `}
    />
  );
};

// Research data loading component
export const ResearchDataLoader = ({ isDark = true, language = 'EN' }) => {
  const loadingTexts = {
    EN: [
      'Analyzing quantum states...',
      'Processing diamond lattice data...',
      'Calculating NV center dynamics...',
      'Optimizing control sequences...'
    ],
    JP: [
      '量子状態を解析中...',
      'ダイヤモンド格子データを処理中...',
      'NVセンターダイナミクスを計算中...',
      '制御シーケンスを最適化中...'
    ]
  };

  const [currentText, setCurrentText] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts[language].length);
    }, 2000);

    return () => clearInterval(interval);
  }, [language]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-12 space-y-6"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FlaskConical 
            size={48} 
            className={`${isDark ? 'text-teal-400' : 'text-teal-600'}`}
          />
        </motion.div>
        
        {/* Glowing effect */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-teal-500/20 blur-xl"
        />
      </div>

      <motion.p
        key={currentText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className={`
          text-lg font-medium text-center max-w-md
          ${isDark ? 'text-slate-300' : 'text-slate-700'}
        `}
      >
        {loadingTexts[language][currentText]}
      </motion.p>
    </motion.div>
  );
};