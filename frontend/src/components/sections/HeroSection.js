import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { QuantumNetwork } from '../animations/QuantumNetwork';

// Enhanced Professional Hero Section with Academic Hierarchy
export const HeroSection = ({ language, isDark }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section 
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDark ? 'bg-black' : 'bg-gray-50'
      }`}
    >
      {/* Enhanced Quantum Background */}
      <QuantumNetwork />
      
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${isDark ? '#14b8a6' : '#0f766e'} 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${isDark ? '#06b6d4' : '#0891b2'} 0%, transparent 50%)`,
          backgroundSize: '200px 200px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Professional Institution Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`inline-flex items-center px-8 py-4 rounded-3xl border mb-12 ${
              isDark 
                ? 'backdrop-blur-2xl bg-slate-900/60 border-electric-blue-600/30 text-electric-blue-300'
                : 'bg-white border-electric-blue-200/50 text-electric-blue-700 shadow-2xl backdrop-blur-sm'
            }`}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-electric-blue-600 to-royal-indigo-500 rounded-full mr-4" />
            <span className="text-sm font-medium tracking-wider uppercase">
              {language === 'EN' ? 'Tokyo Institute of Technology' : '東京工業大学'}
            </span>
          </motion.div>

          {/* Enhanced Academic Title Hierarchy */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h1 className={`text-7xl lg:text-8xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`} style={{ fontFamily: '"Inter", system-ui' }}>
                {language === 'EN' ? "Arai's Laboratory" : '荒井研究室'}
              </h1>
              
              {/* Professional Academic Subtitle */}
              <div className={`text-3xl lg:text-4xl font-light mb-8 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`} style={{ fontFamily: '"Inter", system-ui' }}>
                <span className="bg-gradient-to-r from-electric-blue-600 to-royal-indigo-500 bg-clip-text text-transparent font-semibold">
                  {language === 'EN' ? 'Quantum Sensing' : '量子センシング'}
                </span>
                {language === 'EN' ? ' & Informatics' : ' & インフォマティクス'}
              </div>
            </div>

            {/* Enhanced Scientific Focus Statement */}
            <div className={`max-w-4xl mx-auto text-xl lg:text-2xl leading-relaxed ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`} style={{ fontFamily: '"Inter", system-ui' }}>
              <p className="mb-6">
                {language === 'EN' 
                  ? 'Pioneering the frontier of quantum sensing technologies through diamond nitrogen-vacancy centers, integrated with advanced computational informatics to drive scientific innovation and practical applications.'
                  : 'ダイヤモンド窒素空孔センターを通じた量子センシング技術の最前線を開拓し、先進的な計算情報学と統合して科学革新と実用的応用を推進しています。'
                }
              </p>
              
              {/* Professional Research Emphasis with Different Styling */}
              <div className={`inline-flex items-center px-8 py-4 rounded-full border-2 ${
                isDark 
                  ? 'bg-gradient-to-r from-electric-blue-900/40 to-royal-indigo-900/40 border-electric-blue-400/50' 
                  : 'bg-gradient-to-r from-electric-blue-50/80 to-royal-indigo-50/80 border-electric-blue-400/60 shadow-xl'
              }`}>
                <div className={`w-3 h-3 rounded-full mr-4 animate-pulse ${
                  isDark ? 'bg-gradient-to-r from-electric-blue-400 to-royal-indigo-400' : 'bg-gradient-to-r from-electric-blue-600 to-royal-indigo-500'
                }`} />
                <span className={`text-xl font-bold tracking-wide ${
                  isDark ? 'text-electric-blue-100' : 'text-electric-blue-800'
                }`}>
                  {language === 'EN' ? 'Quantum Transformation Research' : '量子変革研究'}
                </span>
                <div className={`w-3 h-3 rounded-full ml-4 animate-pulse ${
                  isDark ? 'bg-gradient-to-r from-royal-indigo-400 to-electric-blue-400' : 'bg-gradient-to-r from-royal-indigo-500 to-electric-blue-600'
                }`} style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </motion.div>

          {/* Enhanced Professional Action Area */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            {/* Removed metrics display as requested */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};