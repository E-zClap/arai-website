import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FlaskConical, Microscope, Laptop, Zap, Diamond, Magnet, Dna, TestTube } from 'lucide-react';

// Enhanced Professional Mission Section with Advanced Academic Layout
export const MissionSection = ({ language, isDark }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const missionText = {
    EN: "The Arai's Laboratory at Tokyo Institute of Technology was established in 2022 with quantum sensing as our core theme. Our research specializes in quantum sensing and uniquely integrates with computational informatics to pioneer transformative innovation we call 'Quantum Transformation' - a new paradigm where quantum physics applications drive technological advancement.",
    JP: "東京工業大学の荒井研究室は、量子センシングを中心テーマとして2022年に設立されました。私たちの研究は量子センシングに特化し、計算情報学と独自に統合することで、「クォンタム変革」と呼ぶ変革的イノベーションの開拓を目指しています。これは量子物理学応用が技術進歩を推進する新たなパラダイムです。"
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
      color: 'from-teal-600 to-cyan-600'
    },
    { 
      title: { EN: 'Quantum Informatics', JP: '量子インフォマティクス' },
      icon: Laptop,
      color: 'from-cyan-600 to-teal-600'
    },
    { 
      title: { EN: 'Quantum Computing', JP: '量子コンピューティング' },
      icon: Zap,
      color: 'from-cyan-700 to-emerald-700'
    }
  ];

  return (
    <section className={`py-32 px-8 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-slate-900/30' 
        : 'bg-gradient-to-br from-slate-50/60 via-white/80 to-slate-100/70'
    }`} ref={ref}>
      
      {/* Oscilloscope Sine Wave Background with Continuous Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg 
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Oscilloscope Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path 
                d="M 40 0 L 0 0 0 40" 
                fill="none" 
                stroke={isDark ? '#14b8a6' : '#0f766e'} 
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#14b8a6' : '#0f766e'} stopOpacity="0.8"/>
              <stop offset="50%" stopColor={isDark ? '#06b6d4' : '#0891b2'} stopOpacity="1"/>
              <stop offset="100%" stopColor={isDark ? '#10b981' : '#059669'} stopOpacity="0.8"/>
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#06b6d4' : '#0891b2'} stopOpacity="0.6"/>
              <stop offset="50%" stopColor={isDark ? '#10b981' : '#059669'} stopOpacity="0.9"/>
              <stop offset="100%" stopColor={isDark ? '#14b8a6' : '#0f766e'} stopOpacity="0.6"/>
            </linearGradient>
            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#10b981' : '#059669'} stopOpacity="0.4"/>
              <stop offset="50%" stopColor={isDark ? '#14b8a6' : '#0f766e'} stopOpacity="0.7"/>
              <stop offset="100%" stopColor={isDark ? '#06b6d4' : '#0891b2'} stopOpacity="0.4"/>
            </linearGradient>
          </defs>
          
          {/* Grid Background */}
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Continuously Moving Sine Waves */}
          <g>
            {/* Primary Wave - Smooth Continuous Motion */}
            <path
              d="M0,400 Q75,330 150,400 T300,400 T450,400 T600,400 T750,400 T900,400 T1050,400 T1200,400"
              fill="none"
              stroke="url(#waveGradient1)"
              strokeWidth="2.5"
              filter={`drop-shadow(0 0 10px ${isDark ? '#14b8a6' : '#0f766e'})`}
              style={{
                animation: 'oscilloscope-wave-1 6s linear infinite'
              }}
            />
            
            {/* Secondary Wave - Different Speed */}
            <path
              d="M0,350 Q100,280 200,350 T400,350 T600,350 T800,350 T1000,350 T1200,350"
              fill="none"
              stroke="url(#waveGradient2)"
              strokeWidth="2"
              filter={`drop-shadow(0 0 8px ${isDark ? '#06b6d4' : '#0891b2'})`}
              style={{
                animation: 'oscilloscope-wave-2 8s linear infinite'
              }}
            />
            
            {/* Tertiary Wave - Slower Continuous Motion */}
            <path
              d="M0,450 Q200,350 400,450 T800,450 T1200,450"
              fill="none"
              stroke="url(#waveGradient3)"
              strokeWidth="1.8"
              filter={`drop-shadow(0 0 6px ${isDark ? '#10b981' : '#059669'})`}
              style={{
                animation: 'oscilloscope-wave-3 12s linear infinite'
              }}
            />
            
            {/* High Frequency Quantum Wave */}
            <path
              d="M0,380 Q50,360 100,380 T200,380 T300,380 T400,380 T500,380 T600,380 T700,380 T800,380 T900,380 T1000,380 T1100,380 T1200,380"
              fill="none"
              stroke={isDark ? '#14b8a6' : '#0f766e'}
              strokeWidth="1.2"
              opacity="0.8"
              filter={`drop-shadow(0 0 4px ${isDark ? '#14b8a6' : '#0f766e'})`}
              style={{
                animation: 'oscilloscope-wave-4 4s linear infinite'
              }}
            />
            
            {/* Ultra Fast Detail Wave */}
            <path
              d="M0,420 Q25,410 50,420 T100,420 T150,420 T200,420 T250,420 T300,420 T350,420 T400,420 T450,420 T500,420 T550,420 T600,420 T650,420 T700,420 T750,420 T800,420 T850,420 T900,420 T950,420 T1000,420 T1050,420 T1100,420 T1150,420 T1200,420"
              fill="none"
              stroke={isDark ? '#06b6d4' : '#0891b2'}
              strokeWidth="0.8"
              opacity="0.6"
              filter={`drop-shadow(0 0 3px ${isDark ? '#06b6d4' : '#0891b2'})`}
              style={{
                animation: 'oscilloscope-wave-5 3s linear infinite'
              }}
            />
          </g>
          
          {/* Oscilloscope Center Lines */}
          <line x1="0" y1="400" x2="1200" y2="400" stroke={isDark ? '#14b8a6' : '#0f766e'} strokeWidth="0.5" opacity="0.4" strokeDasharray="5,5" />
          <line x1="600" y1="0" x2="600" y2="800" stroke={isDark ? '#14b8a6' : '#0f766e'} strokeWidth="0.5" opacity="0.4" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* CSS Animation Keyframes for Continuous Motion */}
      <style jsx>{`
        @keyframes oscilloscope-wave-1 {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(150px); }
        }
        
        @keyframes oscilloscope-wave-2 {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(200px); }
        }
        
        @keyframes oscilloscope-wave-3 {
          0% { transform: translateX(-400px); }
          100% { transform: translateX(400px); }
        }
        
        @keyframes oscilloscope-wave-4 {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(100px); }
        }
        
        @keyframes oscilloscope-wave-5 {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(50px); }
        }
      `}</style>

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
          <div className={`inline-flex items-center px-6 py-3 rounded-2xl border mb-8 ${
            isDark 
              ? 'backdrop-blur-sm bg-slate-900/60 border-teal-500/30 text-teal-300'
              : 'bg-white border-teal-200/50 text-teal-700 shadow-lg'
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
        <div className="grid xl:grid-cols-1 gap-12 items-start mb-20">
          {/* Main Mission Statement */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
              <div className="grid md:grid-cols-3 gap-6">
                {keyPrinciples.map((principle, index) => {
                  const IconComponent = principle.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className={`flex flex-col items-center text-center space-y-4 p-6 rounded-2xl ${
                        isDark ? 'bg-slate-800/40' : 'bg-slate-50/80'
                      }`}
                    >
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${principle.color}`}>
                        <IconComponent className="text-white" size={28} />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-lg mb-2 ${
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
        </div>

        {/* Enhanced Research Excellence Section */}
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
          <h3 className={`text-3xl font-bold mb-12 ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>
            {language === 'EN' ? 'Research Excellence Areas' : '研究卓越分野'}
          </h3>
          
          {/* Professional Grid Layout for Research Areas */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {researchTopics.map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className={`group p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-slate-900/60 border-slate-700/50 hover:border-teal-400/50 hover:bg-slate-800/70'
                      : 'bg-white/80 border-slate-200/50 hover:border-teal-300/70 hover:bg-white/95 shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Icon Section */}
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${topic.color} shadow-lg group-hover:shadow-teal-500/30 transition-all duration-300`}>
                      <IconComponent size={28} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Research Area Title */}
                  <h4 className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white group-hover:text-teal-300' : 'text-slate-800 group-hover:text-teal-700'
                  } transition-colors`}>
                    {topic.title[language]}
                  </h4>
                  
                  {/* Professional Status Indicator */}
                  <div className="flex items-center justify-center space-x-2 pt-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className={`text-xs font-medium ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {language === 'EN' ? 'Active Research' : 'アクティブ研究'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Professional Research Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className={`mt-12 p-8 rounded-3xl border backdrop-blur-xl ${
              isDark 
                ? 'bg-slate-900/40 border-teal-500/20'
                : 'bg-white/70 border-teal-200/30 shadow-xl'
            }`}
          >
            <p className={`text-lg italic font-light ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`} style={{ fontFamily: '"Inter", system-ui' }}>
              {language === 'EN' 
                ? '"Advancing the frontiers of quantum science through interdisciplinary excellence and innovative research methodologies."'
                : '「学際的な卓越性と革新的な研究手法を通じて量子科学の最前線を推進する。」'
              }
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-teal-500" />
              <span className={`text-sm font-medium ${
                isDark ? 'text-teal-400' : 'text-teal-600'
              }`}>
                {language === 'EN' ? 'Arai Laboratory' : '荒井研究室'}
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-teal-500" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};