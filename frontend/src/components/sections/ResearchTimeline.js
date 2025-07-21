import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Award, 
  BookOpen, 
  Users, 
  Zap, 
  FlaskConical,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Research Timeline Component
export const ResearchTimeline = ({ language, isDark }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const timelineData = [
    {
      id: 1,
      year: '2022',
      title: {
        EN: 'Laboratory Establishment',
        JP: '研究室設立'
      },
      description: {
        EN: 'Arai\'s Laboratory officially established at Tokyo Institute of Technology, focusing on quantum sensing with diamond NV centers.',
        JP: '東京工業大学にアライ研究室が正式設立。ダイヤモンドNVセンターによる量子センシングに焦点を当てる。'
      },
      type: 'milestone',
      icon: FlaskConical,
      color: 'emerald',
      achievements: [
        { EN: 'State-of-the-art quantum sensing lab setup', JP: '最先端量子センシング実験室の構築' },
        { EN: 'Initial team formation with 3 researchers', JP: '3名の研究者による初期チーム編成' },
        { EN: 'First quantum sensing experiments conducted', JP: '最初の量子センシング実験実施' }
      ]
    },
    {
      id: 2,
      year: '2023',
      title: {
        EN: 'Quantum Control Breakthrough',
        JP: '量子制御技術の突破'
      },
      description: {
        EN: 'Developed advanced quantum control techniques for nitrogen-14 spins in diamond NV centers, achieving unprecedented coherence times.',
        JP: 'ダイヤモンドNVセンター内の窒素14スピンに対する先進的量子制御技術を開発し、前例のないコヒーレンス時間を達成。'
      },
      type: 'research',
      icon: Zap,
      color: 'cyan',
      achievements: [
        { EN: '2 high-impact publications in Nature Physics and Physical Review Applied', JP: 'Nature PhysicsとPhysical Review Appliedに2本の高インパクト論文発表' },
        { EN: 'International collaboration with Harvard University initiated', JP: 'ハーバード大学との国際共同研究開始' },
        { EN: 'Novel dynamical decoupling sequences demonstrated', JP: '新しい動的デカップリングシーケンスの実証' }
      ]
    },
    {
      id: 3,
      year: '2024',
      title: {
        EN: 'Diamond Circuit Innovation',
        JP: 'ダイヤモンド回路技術革新'
      },
      description: {
        EN: 'Pioneered patterned boron-doped diamond circuits for coherent control of solid-state defect spins, opening new avenues for quantum applications.',
        JP: 'パターン化ホウ素ドープダイヤモンド回路による固体欠陥スピンのコヒーレント制御を先駆的に開発し、量子応用の新たな道筋を開拓。'
      },
      type: 'innovation',
      icon: Target,
      color: 'teal',
      achievements: [
        { EN: 'arXiv preprint published with significant attention', JP: '大きな注目を集めるarXivプレプリントを発表' },
        { EN: 'Patent application submitted for diamond circuit technology', JP: 'ダイヤモンド回路技術に関する特許出願' },
        { EN: 'Team expanded to 8+ researchers and students', JP: '研究チームを研究者・学生8名以上に拡大' }
      ]
    },
    {
      id: 4,
      year: '2025',
      title: {
        EN: 'Future Quantum Transformation',
        JP: '未来の量子変革'
      },
      description: {
        EN: 'Ongoing research towards practical quantum sensing applications in materials science, medical diagnostics, and quantum information processing.',
        JP: '材料科学、医療診断、量子情報処理における実用的な量子センシング応用に向けた継続的研究。'
      },
      type: 'future',
      icon: TrendingUp,
      color: 'purple',
      achievements: [
        { EN: 'Multiple high-impact journal submissions in progress', JP: '複数の高インパクト学術誌への投稿進行中' },
        { EN: 'Industry partnerships for quantum technology transfer', JP: '量子技術移転のための産業界パートナーシップ' },
        { EN: 'International recognition and awards expected', JP: '国際的な認知と賞の受賞予定' }
      ]
    }
  ];

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-16"
    >
      <h2 className={`text-4xl font-bold mb-12 text-center ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        {language === 'EN' ? 'Research Timeline & Milestones' : '研究タイムライン・マイルストーン'}
      </h2>

      <div className="relative">
        {/* Timeline Line */}
        <div className={`absolute left-8 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 ${
          isDark ? 'bg-gradient-to-b from-teal-400 to-purple-400' : 'bg-gradient-to-b from-teal-500 to-purple-500'
        }`} />

        {/* Timeline Items */}
        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <div className={`
                absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 
                w-16 h-16 rounded-full border-4 flex items-center justify-center
                ${isDark 
                  ? `bg-${item.color}-900 border-${item.color}-400 text-${item.color}-300` 
                  : `bg-${item.color}-100 border-${item.color}-500 text-${item.color}-600`
                }
                z-10
              `}>
                <item.icon size={24} />
              </div>

              {/* Timeline Content */}
              <div className={`
                ml-28 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}
              `}>
                <motion.div
                  className={`
                    p-8 rounded-2xl border backdrop-blur-sm
                    ${isDark 
                      ? 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-900/70' 
                      : 'bg-white/80 border-gray-200/80 hover:bg-white shadow-lg'
                    }
                    transition-all duration-300 group
                  `}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Year Badge */}
                  <div className={`
                    inline-block px-4 py-2 rounded-full text-sm font-bold mb-4
                    ${item.type === 'future' 
                      ? (isDark ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-100 text-purple-600')
                      : (isDark ? 'bg-teal-900/40 text-teal-300' : 'bg-teal-100 text-teal-600')
                    }
                  `}>
                    {item.year}
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {item.title[language]}
                  </h3>

                  {/* Description */}
                  <p className={`text-lg leading-relaxed mb-6 ${
                    isDark ? 'text-slate-300' : 'text-gray-600'
                  }`}>
                    {item.description[language]}
                  </p>

                  {/* Expand/Collapse Button */}
                  <motion.button
                    onClick={() => toggleExpanded(item.id)}
                    className={`
                      flex items-center text-sm font-medium transition-colors duration-200
                      ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'}
                      focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded px-2 py-1
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {expandedItems.has(item.id) ? (
                      <>
                        {language === 'EN' ? 'Show Less' : '詳細を隠す'}
                        <ChevronUp size={16} className="ml-1" />
                      </>
                    ) : (
                      <>
                        {language === 'EN' ? 'Show Achievements' : '成果を表示'}
                        <ChevronDown size={16} className="ml-1" />
                      </>
                    )}
                  </motion.button>

                  {/* Achievements */}
                  {expandedItems.has(item.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-6 pt-6 border-t border-slate-700/30"
                    >
                      <h4 className={`text-lg font-semibold mb-4 ${
                        isDark ? 'text-teal-300' : 'text-teal-600'
                      }`}>
                        {language === 'EN' ? 'Key Achievements:' : '主な成果:'}
                      </h4>
                      <ul className="space-y-3">
                        {item.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className={`flex items-start text-sm ${
                              isDark ? 'text-slate-300' : 'text-gray-600'
                            }`}
                          >
                            <div className={`
                              w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0
                              bg-gradient-to-r from-teal-500 to-cyan-500
                            `} />
                            {achievement[language]}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};