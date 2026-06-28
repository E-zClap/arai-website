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
    EN: "The Arai's Laboratory at Institute of Science Tokyo was established in 2022 with quantum sensing as our core theme. Our research specializes in quantum sensing and uniquely integrates with computational informatics to pioneer transformative innovation we call 'Quantum Transformation' - a new paradigm where quantum physics applications drive technological advancement.",
    JP: "東京科学大学の荒井研究室は、量子センシングを中心テーマとして2022年に設立されました。私たちの研究は量子センシングに特化し、計算情報学と独自に統合することで、「クォンタム変革」と呼ぶ変革的イノベーションの開拓を目指しています。これは量子物理学応用が技術進歩を推進する新たなパラダイムです。"
  };

  const keyPrinciples = [
    {
      title: { EN: 'Quantum Sensing Excellence', JP: '量子センシング最適化' },
      icon: Microscope,
      description: {
        EN: 'Pioneering high-precision quantum measurement technologies',
        JP: '高精度量子測定技術の先駆的研究'
      },
      color: 'from-orange-600 to-orange-500'
    },
    {
      title: { EN: 'Computational Integration', JP: '計算統合' },
      icon: Laptop,
      description: {
        EN: 'Advanced informatics and quantum computing convergence',
        JP: '先進情報学と量子コンピューティングの融合'
      },
      color: 'from-orange-500 to-orange-500'
    },
    {
      title: { EN: 'Transformative Innovation', JP: '変革的イノベーション' },
      icon: Zap,
      description: {
        EN: 'Revolutionary applications across multiple scientific domains',
        JP: '複数の科学領域における革新的応用'
      },
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const researchTopics = [
    {
      title: { EN: 'Diamond NV Centers', JP: 'ダイヤモンドNVセンター' },
      icon: Diamond,
      color: 'from-orange-700 to-orange-700'
    },
    {
      title: { EN: 'Quantum Magnetometry', JP: '量子磁気測定' },
      icon: Magnet,
      color: 'from-orange-700 to-orange-600'
    },
    {
      title: { EN: 'Biomedical Applications', JP: '生体医学応用' },
      icon: Dna,
      color: 'from-orange-600 to-orange-700'
    },
    {
      title: { EN: 'Material Characterization', JP: '材料特性解析' },
      icon: TestTube,
      color: 'from-orange-700 to-orange-700'
    },
    {
      title: { EN: 'Quantum Informatics', JP: '量子インフォマティクス' },
      icon: Laptop,
      color: 'from-orange-700 to-orange-700'
    },
    {
      title: { EN: 'Quantum Computing', JP: '量子コンピューティング' },
      icon: Zap,
      color: 'from-orange-800 to-orange-800'
    }
  ];

  return (
    <section className={`py-32 px-8 relative ${
      isDark ? '' : 'bg-slate-50'
    }`} ref={ref}>

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
          <div className="inline-flex items-center gap-2 mb-5 text-orange-500 text-xs font-semibold uppercase tracking-[0.22em]">
            <FlaskConical size={16} />
            <span>
              {language === 'EN' ? 'Research Mission' : '研究ミッション'}
            </span>
          </div>

          <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`} style={{ fontFamily: '"Inter", system-ui' }}>
            {language === 'EN' ? 'Our Scientific Mission' : '私たちの科学的使命'}
          </h2>
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
            <div className={`rounded-2xl p-8 border transition-colors ${
              isDark
                ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
            }`}>
              <div className={`text-base leading-relaxed mb-8 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
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
                      className={`flex flex-col items-center text-center space-y-4 p-6 rounded-2xl border ${
                        isDark ? 'bg-white/[0.03] border-white/10' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                        <IconComponent className="text-orange-500" size={24} />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-lg sm:text-xl tracking-tight mb-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
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
          <h3 className={`text-lg sm:text-xl font-semibold tracking-tight mb-12 ${
            isDark ? 'text-white' : 'text-slate-900'
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
                  className={`group p-6 rounded-2xl border transition-colors ${
                    isDark
                      ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                  }`}
                >
                  {/* Icon Section */}
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                      <IconComponent size={24} className="text-orange-500" />
                    </div>
                  </div>

                  {/* Research Area Title */}
                  <h4 className={`text-lg font-semibold tracking-tight mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {topic.title[language]}
                  </h4>

                  {/* Professional Status Indicator */}
                  <div className="flex items-center justify-center space-x-2 pt-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span className={`text-xs font-medium ${
                      isDark ? 'text-slate-500' : 'text-slate-500'
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
            className={`mt-12 p-8 rounded-2xl border ${
              isDark
                ? 'bg-white/[0.03] border-white/10'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <p className={`text-base leading-relaxed italic ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`} style={{ fontFamily: '"Inter", system-ui' }}>
              {language === 'EN'
                ? '"Advancing the frontiers of quantum science through interdisciplinary excellence and innovative research methodologies."'
                : '「学際的な卓越性と革新的な研究手法を通じて量子科学の最前線を推進する。」'
              }
            </p>
            <div className="mt-4 flex items-center justify-center space-x-3">
              <div className="w-8 h-px bg-orange-500/40" />
              <span className="text-sm font-medium text-orange-500">
                {language === 'EN' ? 'Arai Laboratory' : '荒井研究室'}
              </span>
              <div className="w-8 h-px bg-orange-500/40" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
