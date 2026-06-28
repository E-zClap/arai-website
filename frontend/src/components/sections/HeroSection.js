import React, { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { QuantumField } from '../animations/QuantumField';

// Hero — the site's signature. An interactive (pointer-reactive) quantum field
// sits behind a clear academic title hierarchy and primary calls to action.
// Explicit min-heights are kept to avoid layout shift (CLS).
export const HeroSection = ({ language, isDark, setCurrentPage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) controls.start('visible');
  }, [controls, isInView]);

  const go = (page) => setCurrentPage && setCurrentPage(page);

  return (
    <section
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDark ? 'bg-transparent' : 'bg-gray-50'
      }`}
      style={{ minHeight: '100vh', contain: 'layout' }}
    >
      {/* Interactive signature field (pointer-reactive, perf/reduced-motion aware) */}
      <QuantumField density={1.1} interactive className={isDark ? 'opacity-90' : 'opacity-60'} />

      {/* Elegant radial overlay */}
      {isDark && (
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(234, 88, 12, 0.10) 0%, transparent 50%)',
            }}
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Institution badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border mb-10 ${
              isDark
                ? 'backdrop-blur-xl bg-white/5 border-white/10 text-slate-200'
                : 'bg-white border-slate-200/70 text-slate-700 shadow-lg backdrop-blur-sm'
            }`}
            style={{ minHeight: '44px' }}
          >
            <img
              src="/favicon-32.png"
              alt="Institute of Science Tokyo"
              width={18}
              height={18}
              className="w-[18px] h-[18px] object-contain"
              loading="eager"
            />
            <span className="text-xs sm:text-sm font-medium tracking-[0.18em] uppercase">
              {language === 'EN' ? 'Institute of Science Tokyo' : '東京科学大学'}
            </span>
          </motion.div>

          {/* Diamond mark with glow */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex justify-center mb-8"
            style={{ minHeight: '128px' }}
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} className="relative">
              <img
                src="/diam.svg"
                alt="Diamond NV-center logo"
                width={128}
                height={128}
                className="w-28 h-28 md:w-32 md:h-32 object-contain"
                style={{ filter: 'drop-shadow(0 8px 18px rgba(234, 88, 12, 0.45))' }}
                loading="eager"
              />
              <motion.div
                className="absolute inset-0 blur-2xl opacity-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(234, 88, 12, 0.55) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>

          {/* Title hierarchy */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="space-y-6"
          >
            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {language === 'EN' ? 'Quantum Informatics Group' : '量子情報学グループ'}
            </h1>

            <p className={`text-2xl sm:text-3xl lg:text-4xl font-light ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent font-semibold">
                {language === 'EN' ? 'Diamond NV Centers' : 'ダイヤモンドNVセンター'}
              </span>
              {language === 'EN' ? ' & Quantum Metrology' : ' ・量子計測'}
            </p>

            <p
              className={`max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed ${
                isDark ? 'text-slate-300/90' : 'text-slate-700'
              }`}
            >
              {language === 'EN'
                ? 'Pioneering quantum sensing with diamond nitrogen-vacancy centers, integrated with computational informatics to drive scientific innovation and real-world applications.'
                : 'ダイヤモンド窒素空孔センターによる量子センシングを開拓し、計算情報学と統合して科学革新と実用化を推進しています。'}
            </p>
          </motion.div>

          {/* Calls to action */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => go('research')}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-900/20 transition-transform hover:scale-[1.03]"
            >
              {language === 'EN' ? 'Explore our research' : '研究を見る'}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => go('team')}
              className={`inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold border transition-colors ${
                isDark
                  ? 'border-white/15 bg-white/5 text-slate-100 hover:bg-white/10'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 shadow-sm'
              }`}
            >
              {language === 'EN' ? 'Meet the team' : 'メンバー紹介'}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll affordance */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <ChevronDown size={26} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
      </motion.div>
    </section>
  );
};
