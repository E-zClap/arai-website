import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  ExternalLink, 
  Users, 
  BookOpen, 
  Mail, 
  GraduationCap,
  Target,
  TrendingUp,
  Globe,
  Award,
  MessageCircle,
  HelpCircle,
  Briefcase,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { QuantumParticles } from '../components/animations/QuantumParticles';

// Join Us Page Component
export const JoinUsPage = ({ language, isDark }) => (
  <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
    isDark ? 'bg-dark-gray-950' : 'bg-gray-50'
  }`}>
    <div className={`absolute inset-0 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-orange-900/20'
        : 'bg-gradient-to-br from-slate-100/40 via-transparent to-orange-100/40'
    }`} />
    <QuantumParticles intensity={30} />
    
    <div className="max-w-5xl mx-auto relative z-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className={`text-6xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Join Us' : '参加する'}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-orange-500 mx-auto mb-8" />
        <p className={`text-2xl font-semibold max-w-4xl mx-auto mb-6 ${
          isDark ? 'text-orange-400' : 'text-orange-600'
        }`}>
          {language === 'EN' 
            ? "Build quantum science into real-world infrastructure"
            : "量子科学を実世界のインフラに組み込む"
          }
        </p>
        <p className={`text-lg max-w-4xl mx-auto leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {language === 'EN' 
            ? "The Arai Group is driven by one guiding question: How can quantum science be transformed from a fragile laboratory curiosity into a shared intellectual and technological infrastructure for society? Our lab works at the intersection of fundamental physics, quantum devices, materials, and real-world applications, pushing quantum science toward robust, deployable, and impactful outcomes."
            : "荒井グループは一つの指針となる質問に導かれています：量子科学を脆弱な研究室の好奇心から、社会のための共有された知的および技術的インフラへと変革するにはどうすればよいか？私たちの研究室は、基礎物理学、量子デバイス、材料、実世界の応用の交差点で活動し、堅牢で展開可能で影響力のある成果に向けて量子科学を推進しています。"
          }
        </p>
        <div className={`mt-6 p-4 rounded-xl ${
          isDark ? 'bg-dark-gray-900/60 border border-orange-600/20' : 'bg-white/70 border border-orange-300/30'
        }`}>
          <p className={`text-base italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'EN'
              ? "We are a publicly funded research group. What ultimately matters is not internal activity, but what we deliver to science and society."
              : "私たちは公的資金による研究グループです。最終的に重要なのは内部活動ではなく、科学と社会に何を提供するかです。"
            }
          </p>
        </div>
      </motion.div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-dark-gray-950/40 border-orange-600/20'
            : 'bg-white/70 border-orange-300/30 shadow-xl'
        }`}
      >
        <h2 className={`text-3xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Who we are looking for and why you should choose the Arai Group' : '私たちが求める人物と荒井グループを選ぶべき理由'}
        </h2>
        <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {language === 'EN'
            ? "We are selective, not by credentials alone, but by how you think, act, and take responsibility. At the same time, we believe that ambitious people deserve an environment that genuinely accelerates them. Below, we describe who we are looking for and what you gain by choosing the Arai Group at each career stage."
            : "私たちは選抜的です。資格だけでなく、あなたがどのように考え、行動し、責任を取るかによって。同時に、野心的な人々は彼らを真に加速させる環境に値すると信じています。以下では、各キャリア段階で私たちが求めている人物と、荒井グループを選ぶことで何を得られるかを説明します。"
          }
        </p>
      </motion.div>

      {/* Undergraduate Students Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-dark-gray-950/40 border-orange-600/20'
            : 'bg-white/70 border-orange-300/30 shadow-xl'
        }`}
      >
        <div className="flex items-center mb-6">
          <GraduationCap className="text-orange-600 mr-4" size={36} />
          <div>
            <h2 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {language === 'EN' ? 'Undergraduate Students (BSc, Engineering)' : '学部生（理学士、工学）'}
            </h2>
            <p className={`text-lg ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
              {language === 'EN' ? 'Full-spectrum research training' : '全範囲の研究トレーニング'}
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-semibold mb-3 flex items-center ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              <Target className="mr-2" size={24} />
              {language === 'EN' ? 'Who we are looking for' : '私たちが求める人物'}
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN'
                ? "We do not require top grades. We value research potential, integrity, and intellectual curiosity."
                : "トップの成績は必要ありません。私たちは研究の可能性、誠実さ、知的好奇心を重視します。"
              }
            </p>
            <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p className="font-semibold mb-2">
                {language === 'EN' ? 'We welcome students who:' : '以下のような学生を歓迎します：'}
              </p>
              <ul className="space-y-2">
                {(language === 'EN' ? [
                  'Ask fundamental questions and enjoy deep thinking',
                  'Persist through failures and keep clean records',
                  'Like building, testing, and analyzing things',
                  'Care about reproducibility and intellectual honesty'
                ] : [
                  '根本的な質問をし、深い思考を楽しむ',
                  '失敗を乗り越え、きれいな記録を保つ',
                  '構築、テスト、分析が好き',
                  '再現性と知的誠実さを大切にする'
                ]).map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="text-orange-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`p-4 rounded-xl ${
              isDark ? 'bg-orange-900/20 border border-orange-600/30' : 'bg-orange-50 border border-orange-200'
            }`}>
              <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                {language === 'EN' ? 'Not a fit if you think:' : '以下のように考える場合は適していません：'}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'EN'
                  ? '"I pay tuition, so I should be trained as a service."'
                  : '「授業料を払っているから、サービスとしてトレーニングを受けるべきだ」'
                }
              </p>
              <p className={`text-sm mt-2 font-semibold ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                {language === 'EN' ? 'We want:' : '私たちが求めるもの：'}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'EN'
                  ? '"I will contribute outcomes; I will grow in order to do so."'
                  : '「成果に貢献します；そのために成長します」'
                }
              </p>
            </div>
          </div>

          <div>
            <h3 className={`text-xl font-semibold mb-3 flex items-center ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              <TrendingUp className="mr-2" size={24} />
              {language === 'EN' ? 'What you gain here' : 'ここで得られるもの'}
            </h3>
            <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {(language === 'EN' ? [
                'Full research-cycle experience: theory → numerical simulation → setup/build → experiment → data analysis → interpretation → presentation',
                'Top-level quantum understanding beyond standard coursework, connected directly to real measurements, devices, and physical limits',
                'Hands-on build-and-test culture: instrumentation, coding, data handling, and reproducibility habits from day one',
                'High-caliber lab environment through close interaction with motivated graduate students and postdocs'
              ] : [
                '完全な研究サイクル経験：理論 → 数値シミュレーション → セットアップ/構築 → 実験 → データ分析 → 解釈 → プレゼンテーション',
                '標準的なコースワークを超えたトップレベルの量子理解、実際の測定、デバイス、物理的限界に直接接続',
                '実践的な構築とテストの文化：初日から計測、コーディング、データ処理、再現性の習慣',
                'モチベーションの高い大学院生やポスドクとの緊密な交流を通じた高水準な研究室環境'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Master Students Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-dark-gray-950/40 border-orange-600/20'
            : 'bg-white/70 border-orange-300/30 shadow-xl'
        }`}
      >
        <div className="flex items-center mb-6">
          <BookOpen className="text-orange-600 mr-4" size={36} />
          <div>
            <h2 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {language === 'EN' ? 'Master Students (MSc, Engineering)' : '修士学生（工学修士）'}
            </h2>
            <p className={`text-lg ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
              {language === 'EN' ? 'Research with industry and business interfaces' : '産業およびビジネスインターフェースを持つ研究'}
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-semibold mb-3 flex items-center ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              <Target className="mr-2" size={24} />
              {language === 'EN' ? 'Who we are looking for' : '私たちが求める人物'}
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN'
                ? "We are looking for students who take research seriously, and who see a Master's degree as more than a credential."
                : "研究を真剣に受け止め、修士号を単なる資格以上のものと見なす学生を求めています。"
              }
            </p>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {(language === 'EN' ? [
                'Want to produce visible, publishable outcomes',
                'Prefer output-based progress over vague activity',
                'Can commit to improving English communication and scientific storytelling'
              ] : [
                '目に見える、出版可能な成果を生み出したい',
                '曖昧な活動よりも成果ベースの進捗を好む',
                '英語コミュニケーションと科学的ストーリーテリングの向上に取り組める'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="text-orange-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN'
                ? 'We particularly value students considering a PhD (Engineering) track.'
                : '博士課程（工学）を検討している学生を特に評価します。'
              }
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-semibold mb-3 flex items-center ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              <TrendingUp className="mr-2" size={24} />
              {language === 'EN' ? 'What you gain here' : 'ここで得られるもの'}
            </h3>
            <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {(language === 'EN' ? [
                'Consulting-inspired project management, grounded in issue definition, hypotheses, milestones, and KPIs',
                'Publication-level research skills: turning figures into logic, logic into story, and story into papers',
                'Direct interfaces with industry and startups (Japan and abroad): semiconductor and quantum companies, deep-tech startups, and spin-off ecosystems',
                'Cross-stack competence connecting physics, devices/materials, and data-driven methods within one coherent project'
              ] : [
                'コンサルティングに着想を得たプロジェクト管理、課題定義、仮説、マイルストーン、KPIに基づく',
                '出版レベルの研究スキル：図を論理に、論理をストーリーに、ストーリーを論文に変える',
                '産業およびスタートアップとの直接的なインターフェース（日本および海外）：半導体および量子企業、ディープテックスタートアップ、スピンオフエコシステム',
                '物理学、デバイス/材料、データ駆動型手法を1つのコヒーレントなプロジェクト内で接続するクロススタック能力'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Doctoral Students Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-dark-gray-950/40 border-orange-600/20'
            : 'bg-white/70 border-orange-300/30 shadow-xl'
        }`}
      >
        <div className="flex items-center mb-6">
          <Award className="text-orange-600 mr-4" size={36} />
          <div>
            <h2 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {language === 'EN' ? 'Doctoral Students (PhD, Engineering)' : '博士課程学生（博士、工学）'}
            </h2>
            <p className={`text-lg ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
              {language === 'EN' ? 'International platform + world-class output' : '国際的なプラットフォーム + 世界クラスの成果'}
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-semibold mb-3 flex items-center ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              <Target className="mr-2" size={24} />
              {language === 'EN' ? 'Who we are looking for' : '私たちが求める人物'}
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN'
                ? "A PhD in our lab is for those who aim high."
                : "私たちの研究室での博士号は、高い目標を持つ人のためのものです。"
              }
            </p>
            <ul className={`space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {(language === 'EN' ? [
                'Want to define ambitious, original research questions',
                'Are willing to compete at the level of top international groups',
                'Can operate independently with high scientific rigor'
              ] : [
                '野心的でオリジナルな研究課題を定義したい',
                'トップの国際的なグループのレベルで競争する意欲がある',
                '高い科学的厳密さで独立して活動できる'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="text-orange-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {language === 'EN'
                ? 'A PhD here is not about steady output. It is about producing signature, world-class results.'
                : 'ここでの博士号は安定した成果についてではありません。署名的で世界クラスの結果を生み出すことです。'
              }
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-semibold mb-3 flex items-center ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              <TrendingUp className="mr-2" size={24} />
              {language === 'EN' ? 'What you gain here' : 'ここで得られるもの'}
            </h3>
            <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {(language === 'EN' ? [
                'International research experience: collaborations, visits, joint projects, and research stays—regardless of nationality',
                'Top-journal-oriented research themes, structured to aim for decisive contributions rather than incremental publications',
                'Career optionality beyond academia, including interaction with national research institutes and internship opportunities at deep-tech startups (Japan and abroad)',
                'High-caliber research environment: daily interaction with some of the strongest students in Japan, and direct interaction with leading researchers from top international institutions'
              ] : [
                '国際的な研究経験：国籍を問わず、コラボレーション、訪問、共同プロジェクト、研究滞在',
                'トップジャーナル指向の研究テーマ、段階的な出版ではなく決定的な貢献を目指すように構造化',
                'アカデミアを超えたキャリアオプション、国立研究機関との交流やディープテックスタートアップでのインターンシップの機会（日本および海外）',
                '高水準な研究環境：日本で最も強力な学生たちとの日常的な交流、トップ国際機関のリーディング研究者との直接的な交流'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {language === 'EN'
                ? 'The goal is to graduate with international credibility, mobility, and visibility.'
                : '目標は、国際的な信頼性、機動性、可視性を持って卒業することです。'
              }
            </p>
          </div>
        </div>
      </motion.div>

      {/* Postdoctoral Researchers Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-dark-gray-950/40 border-orange-600/20'
            : 'bg-white/70 border-orange-300/30 shadow-xl'
        }`}
      >
        <div className="flex items-center mb-6">
          <Users className="text-orange-600 mr-4" size={36} />
          <div>
            <h2 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {language === 'EN' ? 'Postdoctoral Researchers' : 'ポスドク研究員'}
            </h2>
            <p className={`text-lg ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
              {language === 'EN' ? 'PI-track launchpad' : 'PI（Principal Investigator）トラック発射台'}
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-semibold mb-3 flex items-center ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              <Target className="mr-2" size={24} />
              {language === 'EN' ? 'Who we are looking for' : '私たちが求める人物'}
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN'
                ? "We recruit postdocs who genuinely aim to become independent PIs."
                : "独立したPIになることを真に目指すポスドクを採用します。"
              }
            </p>
            <ul className={`space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {(language === 'EN' ? [
                'Launch semi-independent research directions',
                'Build coherent strategies rather than isolated results',
                'Lead students and drive execution',
                'Think strategically about publications, funding, and visibility'
              ] : [
                '半独立的な研究方向を立ち上げる',
                '孤立した結果ではなく一貫した戦略を構築する',
                '学生をリードし、実行を推進する',
                '出版、資金調達、可視性について戦略的に考える'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="text-orange-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {language === 'EN'
                ? 'A postdoc here is not extended technical labor. It is a transition to independence.'
                : 'ここでのポスドクは延長された技術労働ではありません。独立への移行です。'
              }
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-semibold mb-3 flex items-center ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              <TrendingUp className="mr-2" size={24} />
              {language === 'EN' ? 'What you gain here' : 'ここで得られるもの'}
            </h3>
            <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {(language === 'EN' ? [
                'Strategic support for next careers, including PI-track positions in Japan and overseas academic markets',
                'Strong grant-writing support: structure, narrative, and positioning for fellowships and major funding—not just proofreading',
                'Hands-on exposure to lab and project management, including mentoring students, budgeting, resource allocation, and priority management',
                'A high-output collaboration ecosystem: ambitious themes, strong domestic and international partners, and a student environment that supports top-level work'
              ] : [
                '日本および海外の学術市場でのPIトラックポジションを含む、次のキャリアへの戦略的サポート',
                '強力な助成金執筆サポート：フェローシップおよび主要資金調達のための構造、ナラティブ、ポジショニング—校正だけではない',
                '学生の指導、予算編成、資源配分、優先順位管理を含む、研究室およびプロジェクト管理への実践的な露出',
                '高出力のコラボレーションエコシステム：野心的なテーマ、強力な国内外のパートナー、トップレベルの仕事をサポートする学生環境'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {language === 'EN'
                ? 'Our goal is simple: when you leave, you should be ready to operate as a PI.'
                : '私たちの目標はシンプルです：あなたが去るとき、PIとして活動する準備ができているべきです。'
              }
            </p>
          </div>
        </div>
      </motion.div>

      {/* International Applicants Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-dark-gray-950/40 border-orange-600/20'
            : 'bg-white/70 border-orange-300/30 shadow-xl'
        }`}
      >
        <div className="flex items-center mb-6">
          <Globe className="text-orange-600 mr-4" size={36} />
          <h2 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'For International Applicants' : '国際出願者の方へ'}
          </h2>
        </div>
        
        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {language === 'EN'
            ? "We actively welcome international students and researchers."
            : "留学生や研究者を積極的に歓迎します。"
          }
        </p>

        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              {language === 'EN' ? 'Graduate admission (MSc / PhD, Engineering)' : '大学院入学（修士/博士、工学）'}
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN'
                ? "Many international students join via the International Graduate Program (IGP) – Science and Engineering at Institute of Science Tokyo."
                : "多くの留学生は、東京科学大学の国際大学院プログラム（IGP）– 理工学を通じて参加しています。"
              }
            </p>
            <ul className={`space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN'
                    ? 'English-based admission (no Japanese required at entry)'
                    : '英語ベースの入学（入学時に日本語は不要）'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN'
                    ? 'Entry at MSc or PhD level (Engineering degree)'
                    : '修士または博士レベルでの入学（工学学位）'
                  }
                </span>
              </li>
            </ul>
            <a
              href="https://admissions.isct.ac.jp/en/013/graduate/programs/science-and-engineering"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-600 hover:text-orange-500 font-medium mb-4"
            >
              {language === 'EN' ? 'Program information' : 'プログラム情報'}
              <ExternalLink size={16} className="ml-2" />
            </a>
            <p className={`mt-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {language === 'EN'
                ? 'We strongly recommend contacting us in advance to discuss research fit before applying.'
                : '申請前に研究の適合性について議論するため、事前にご連絡いただくことを強くお勧めします。'
              }
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              {language === 'EN' ? 'Scholarships for PhD students' : '博士課程学生のための奨学金'}
            </h3>
            <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN'
                ? "Common funding routes include:"
                : "一般的な資金調達ルートには以下が含まれます："
              }
            </p>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {(language === 'EN' ? [
                'MEXT Scholarship (embassy or university recommendation)',
                'University-level scholarships and tuition waivers',
                'Project-based RA support (depending on timing and match)'
              ] : [
                'MEXT奨学金（大使館または大学推薦）',
                '大学レベルの奨学金と授業料免除',
                'プロジェクトベースのRAサポート（タイミングとマッチングによる）'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN'
                ? 'We are happy to discuss realistic funding strategies individually.'
                : '現実的な資金調達戦略について個別に議論させていただきます。'
              }
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-semibold mb-3 ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              {language === 'EN' ? 'Postdoctoral fellowships' : 'ポスドクフェローシップ'}
            </h3>
            <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN'
                ? "A major route for international postdocs is:"
                : "国際的なポスドクの主要なルートは："
              }
            </p>
            <ul className={`space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                <span>
                  {language === 'EN'
                    ? 'JSPS Postdoctoral Fellowship for Foreign Researchers (学振 外国人特別研究員)'
                    : 'JSPS外国人特別研究員（学振 外国人特別研究員）'
                  }
                </span>
              </li>
            </ul>
            <a
              href="https://www.jsps.go.jp/english/e-pd/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-600 hover:text-orange-500 font-medium mb-4"
            >
              {language === 'EN' ? 'JSPS Fellowship Information' : 'JSPSフェローシップ情報'}
              <ExternalLink size={16} className="ml-2" />
            </a>
            <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'EN'
                ? 'This fellowship is competitive and requires early preparation. Please contact us several months in advance.'
                : 'このフェローシップは競争力があり、早期の準備が必要です。数ヶ月前にご連絡ください。'
              }
            </p>
          </div>
        </div>
      </motion.div>

      {/* How to Reach Out Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-dark-gray-950/40 border-orange-600/20'
            : 'bg-white/70 border-orange-300/30 shadow-xl'
        }`}
      >
        <div className="flex items-center mb-6">
          <MessageCircle className="text-orange-600 mr-4" size={36} />
          <h2 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'How to reach out / apply' : '連絡方法 / 申請方法'}
          </h2>
        </div>
        
        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {language === 'EN'
            ? "We welcome informal contact before formal application."
            : "正式な申請の前に非公式な連絡を歓迎します。"
          }
        </p>

        <div className="space-y-4">
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              {language === 'EN' ? 'Please email with:' : 'メールに以下を含めてください：'}
            </h3>
            <ul className={`space-y-2 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {(language === 'EN' ? [
                'Your CV (any format)',
                'A short note (5–10 lines): what you want to build or achieve, and why our lab',
                '(Optional) writing, code, slides, or a paper you like and why'
              ] : [
                'あなたのCV（どんな形式でも）',
                '短いメモ（5〜10行）：何を構築または達成したいか、なぜ私たちの研究室か',
                '（オプション）執筆、コード、スライド、または好きな論文とその理由'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-3 ${
              isDark ? 'text-orange-300' : 'text-orange-700'
            }`}>
              {language === 'EN' ? 'We typically arrange:' : '通常、以下を手配します：'}
            </h3>
            <ul className={`space-y-2 mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {(language === 'EN' ? [
                'Short chat (15–30 min)',
                'Research discussion',
                'Lab fit conversation'
              ] : [
                '短い会話（15〜30分）',
                '研究ディスカッション',
                '研究室適合性の会話'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="mailto:arai@ee.e.titech.ac.jp"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl font-semibold text-lg hover:from-orange-500 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Mail size={20} className="mr-2" />
            {language === 'EN' ? 'Contact Professor Arai' : '荒井教授にお問い合わせ'}
          </a>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className={`backdrop-blur-lg rounded-3xl p-8 border mb-12 ${
          isDark 
            ? 'bg-dark-gray-950/40 border-orange-600/20'
            : 'bg-white/70 border-orange-300/30 shadow-xl'
        }`}
      >
        <div className="flex items-center mb-6">
          <HelpCircle className="text-orange-600 mr-4" size={36} />
          <h2 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'FAQ' : 'よくある質問'}
          </h2>
        </div>
        
        <div className="space-y-6">
          {(language === 'EN' ? [
            { q: 'Do I need prior quantum experience?', a: 'Not necessarily. What matters most is your ability to learn fast, think clearly, and execute with integrity.' },
            { q: 'Can I explore before committing to a thesis topic?', a: 'Yes. We often start with a structured onboarding project to build research habits and identify a strong direction.' },
            { q: 'How much independence is expected?', a: 'Increasingly so with seniority. Undergraduates receive close guidance; PhD students and postdocs are expected to drive their own projects.' },
            { q: 'How is progress evaluated?', a: 'By clarity of questions, quality of data, logic of interpretation, and concrete outputs—not by time spent in the lab.' },
            { q: 'Is collaboration encouraged or competitive?', a: 'Collaboration is strongly encouraged. We value shared progress, transparent communication, and collective success.' },
            { q: 'What matters most for success here?', a: 'Ownership, honest data practices, and the will to deliver outcomes to both academia and society.' }
          ] : [
            { q: '事前の量子経験は必要ですか？', a: '必ずしも必要ではありません。最も重要なのは、速く学び、明確に考え、誠実に実行する能力です。' },
            { q: '論文トピックにコミットする前に探索できますか？', a: 'はい。研究習慣を構築し、強力な方向性を特定するために、構造化されたオンボーディングプロジェクトから始めることがよくあります。' },
            { q: 'どのくらいの独立性が期待されますか？', a: '年功序列とともに増加します。学部生は密接な指導を受けます；博士課程学生とポスドクは自分のプロジェクトを推進することが期待されます。' },
            { q: '進捗はどのように評価されますか？', a: '質問の明確さ、データの質、解釈の論理、具体的な成果によって—研究室で過ごした時間ではありません。' },
            { q: 'コラボレーションは奨励されますか、それとも競争的ですか？', a: 'コラボレーションは強く奨励されます。私たちは共有された進捗、透明なコミュニケーション、集団的成功を重視します。' },
            { q: 'ここでの成功に最も重要なことは何ですか？', a: 'オーナーシップ、正直なデータプラクティス、アカデミアと社会の両方に成果を提供する意志です。' }
          ]).map((faq, idx) => (
            <div key={idx}>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDark ? 'text-orange-300' : 'text-orange-700'
              }`}>
                Q: {faq.q}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                A: {faq.a}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);
