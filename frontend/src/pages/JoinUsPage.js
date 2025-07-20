import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ExternalLink, Users, BookOpen, Mail } from 'lucide-react';
import { QuantumParticles } from '../components/animations/QuantumParticles';

// Join Us Page Component
export const JoinUsPage = ({ language, isDark }) => (
  <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
    isDark ? 'bg-black' : 'bg-gray-50'
  }`}>
    <div className={`absolute inset-0 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
        : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
    }`} />
    <QuantumParticles intensity={30} />
    
    <div className="max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className={`text-6xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Join Our Team' : '私たちのチームに参加'}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-8" />
        <p className={`text-xl max-w-3xl mx-auto ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {language === 'EN' 
            ? "Discover opportunities to join our quantum sensing research laboratory and contribute to groundbreaking scientific innovation."
            : "量子センシング研究室に参加し、画期的な科学革新に貢献する機会をご確認ください。"
          }
        </p>
      </motion.div>

      {/* Prospective Students Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-black/40 border-teal-500/20'
            : 'bg-white/70 border-teal-300/30 shadow-xl'
        }`}
      >
        <div className="flex items-center mb-6">
          <Users className="text-teal-500 mr-4" size={32} />
          <h2 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Prospective Students' : '将来の学生'}
          </h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isDark ? 'text-teal-300' : 'text-teal-700'
            }`}>
              {language === 'EN' ? 'Graduate Students (Master\'s & Ph.D.)' : '大学院生（修士・博士）'}
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN' 
                ? "We welcome graduate students passionate about quantum sensing, diamond NV centers, and quantum informatics. Our research program offers cutting-edge training in experimental quantum physics and computational methods."
                : "量子センシング、ダイヤモンドNVセンター、量子インフォマティクスに情熱を持つ大学院生を歓迎します。私たちの研究プログラムは、実験量子物理学と計算手法の最先端トレーニングを提供します。"
              }
            </p>
            
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {language === 'EN' ? 'Admission Information:' : '入学情報：'}
            </h4>
            <ul className={`space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN' 
                    ? "Applications through Tokyo Institute of Technology graduate admission process"
                    : "東京工業大学大学院入学プロセスを通じての申請"
                  }
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN' 
                    ? "Strong background in physics, electrical engineering, or related fields preferred"
                    : "物理学、電気工学、または関連分野の強固なバックグラウンドが望ましい"
                  }
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN' 
                    ? "Research Assistant (RA) and Teaching Assistant (TA) opportunities available"
                    : "リサーチアシスタント（RA）およびティーチングアシスタント（TA）の機会あり"
                  }
                </span>
              </li>
            </ul>
            
            <a
              href="https://admissions.titech.ac.jp/graduate/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium"
            >
              {language === 'EN' ? 'Graduate Admission Information' : '大学院入学情報'}
              <ExternalLink size={16} className="ml-2" />
            </a>
          </div>

          <div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isDark ? 'text-teal-300' : 'text-teal-700'
            }`}>
              {language === 'EN' ? 'Undergraduate Students' : '学部生'}
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN' 
                ? "Undergraduate research opportunities are available for motivated students interested in quantum sensing research. Join us through thesis research projects or summer research programs."
                : "量子センシング研究に興味を持つ意欲的な学生には、学部研究の機会があります。論文研究プロジェクトや夏季研究プログラムを通じてご参加ください。"
              }
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isDark ? 'text-teal-300' : 'text-teal-700'
            }`}>
              {language === 'EN' ? 'International Students' : '留学生'}
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN' 
                ? "We actively welcome international students through various programs including YSEP (Young Scientists Exchange Program) and other international exchange programs."
                : "YSEP（Young Scientists Exchange Program）およびその他の国際交換プログラムを通じて、留学生を積極的に歓迎しています。"
              }
            </p>
            
            <a
              href="https://www.titech.ac.jp/english/student_support/international_students"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium"
            >
              {language === 'EN' ? 'International Student Support' : '留学生サポート'}
              <ExternalLink size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Postdoctoral Researchers Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-black/40 border-teal-500/20'
            : 'bg-white/70 border-teal-300/30 shadow-xl'
        }`}
      >
        <div className="flex items-center mb-6">
          <BookOpen className="text-teal-500 mr-4" size={32} />
          <h2 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Prospective Postdoctoral Researchers' : '将来の博士研究員'}
          </h2>
        </div>
        
        <div className="space-y-6">
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'EN' 
              ? "We seek exceptional postdoctoral researchers to join our cutting-edge quantum sensing research program. Our lab offers a collaborative environment for advancing fundamental understanding and developing practical applications of quantum sensing technologies."
              : "最先端の量子センシング研究プログラムに参加する優秀な博士研究員を募集しています。私たちの研究室は、量子センシング技術の基礎的理解の推進と実用的応用の開発のための協力的な環境を提供します。"
            }
          </p>
          
          <div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isDark ? 'text-teal-300' : 'text-teal-700'
            }`}>
              {language === 'EN' ? 'Research Topics:' : '研究トピック：'}
            </h3>
            <ul className={`space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN' 
                    ? "Diamond nitrogen-vacancy center quantum sensing"
                    : "ダイヤモンド窒素空孔センター量子センシング"
                  }
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN' 
                    ? "Quantum control and quantum information processing"
                    : "量子制御と量子情報処理"
                  }
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN' 
                    ? "Computational quantum sensing and informatics"
                    : "計算量子センシングとインフォマティクス"
                  }
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isDark ? 'text-teal-300' : 'text-teal-700'
            }`}>
              {language === 'EN' ? 'Funding Opportunities:' : '資金機会：'}
            </h3>
            <ul className={`space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN' 
                    ? "JSPS Postdoctoral Fellowship for Research in Japan"
                    : "日本学術振興会特別研究員（外国人特別研究員）"
                  }
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN' 
                    ? "Project-funded research positions"
                    : "プロジェクト資金による研究ポジション"
                  }
                </span>
              </li>
            </ul>
            
            <a
              href="https://www.jsps.go.jp/english/e-pd/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium"
            >
              {language === 'EN' ? 'JSPS Fellowship Information' : 'JSPS フェローシップ情報'}
              <ExternalLink size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Corporate Collaboration Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-black/40 border-teal-500/20'
            : 'bg-white/70 border-teal-300/30 shadow-xl'
        }`}
      >
        <div className="flex items-center mb-6">
          <UserPlus className="text-teal-500 mr-4" size={32} />
          <h2 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Corporate Collaboration' : '企業との協力'}
          </h2>
        </div>
        
        <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {language === 'EN' 
            ? "We welcome collaborations with industry partners interested in quantum sensing technologies and their practical applications. Our laboratory can provide expertise in quantum sensing research and development."
            : "量子センシング技術とその実用的応用に興味を持つ産業パートナーとの協力を歓迎します。私たちの研究室は、量子センシング研究開発の専門知識を提供できます。"
          }
        </p>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className={`text-center p-12 rounded-3xl backdrop-blur-lg border ${
          isDark 
            ? 'bg-black/40 border-teal-500/20'
            : 'bg-white/70 border-teal-300/30 shadow-xl'
        }`}
      >
        <Mail className="text-teal-500 mx-auto mb-6" size={48} />
        <h2 className={`text-3xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Get in Touch' : 'お問い合わせ'}
        </h2>
        <p className={`text-lg mb-8 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {language === 'EN' 
            ? "Ready to join our quantum sensing research team? Contact us to discuss opportunities and learn more about our research program."
            : "量子センシング研究チームに参加する準備はできていますか？機会について話し合い、私たちの研究プログラムについてもっと学ぶためにお問い合わせください。"
          }
        </p>
        <a
          href="mailto:arai@ee.e.titech.ac.jp"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl font-semibold text-lg hover:from-teal-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Mail size={20} className="mr-2" />
          {language === 'EN' ? 'Contact Professor Arai' : '荒井教授にお問い合わせ'}
        </a>
      </motion.div>
    </div>
  </div>
);