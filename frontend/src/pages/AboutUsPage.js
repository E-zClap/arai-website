import React from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Compass,
  Users,
  Lightbulb,
  TrendingUp,
  Heart,
  Microscope,
  Search,
  Network,
  Building,
  GraduationCap,
  Zap,
  Clock,
  UserCheck,
  MessageCircle,
  Shield,
  Battery
} from 'lucide-react';
import { QuantumField } from '../components/animations/QuantumField';
import { PageHeader } from '../components/ui/PageHeader';

// About Us Page Component
export const AboutUsPage = ({ language, isDark }) => {
  // Vision Research Directions
  const visionDirections = [
    {
      icon: Eye,
      title: {
        EN: "Making the invisible visible through quantum sensing and treating quantum as resources",
        JP: "量子センシングで見えないものを可視化し、量子を資源として扱う"
      },
      description: {
        EN: "Use quantum sensing to measure spins, defects, nanoscale magnetic fields, chemical potentials, and extreme environments, thereby expanding the horizon of phenomena to which humanity has direct access. Regard entanglement, quantum correlations, and precision quantum measurements as new types of resources, not just phenomena, and design novel quantum applications in devices, networks, and information processing.",
        JP: "量子センシングを用いてスピン、欠陥、ナノスケール磁場、化学ポテンシャル、極限環境を測定し、人類が直接観測できる現象の範囲を拡大します。量子もつれ、量子相関、精密量子測定を単なる現象ではなく新しい種類の資源として位置づけ、デバイス、ネットワーク、情報処理における革新的な量子応用を設計します。"
      }
    },
    {
      icon: Users,
      title: {
        EN: "Extending quantum concepts to society and information",
        JP: "量子概念を社会と情報に拡張する"
      },
      description: {
        EN: "Apply quantum-native concepts (superposition, measurement, noise, feedback, and beyond) to cognition, economics, policy, and organizations, offering a quantum informatics perspective on complex social systems.",
        JP: "重ね合わせ、測定、ノイズ、フィードバックなどの量子固有の概念を認知、経済、政策、組織に適用し、複雑な社会システムに対する量子情報学的視点を提供します。"
      }
    }
  ];

  // Mission Lines of Action
  const missionActions = [
    {
      icon: Microscope,
      number: 1,
      title: {
        EN: "Pioneering frontiers in quantum science and technology",
        JP: "量子科学技術の最前線を開拓する"
      },
      description: {
        EN: "Create next-generation foundational technologies in quantum sensing, quantum metrology, quantum devices, and quantum information processing, by integrating experiment, theory, and data-driven methods. (Diamond quantum electronics is one of the core themes within this broader agenda.)",
        JP: "実験、理論、データ駆動型手法を統合し、量子センシング、量子計測、量子デバイス、量子情報処理における次世代基盤技術を創出します（ダイヤモンド量子エレクトロニクスは、この広範な研究課題における中核テーマの一つです）。"
      }
    },
    {
      icon: TrendingUp,
      number: 2,
      title: {
        EN: "Issue-driven research and professional researcher development",
        JP: "課題駆動型研究と専門研究者の育成"
      },
      description: {
        EN: "Design all projects around clear issues, hypotheses, and KPIs, and enable students and postdocs to own the entire cycle from hypothesis and experiment design to data analysis and storytelling, cultivating self-driven, professional researchers.",
        JP: "すべてのプロジェクトを明確な課題、仮説、KPIを中心に設計し、学生やポスドクが仮説・実験設計からデータ解析・成果の物語化まで、研究サイクル全体を主体的に担えるようにすることで、自律的で専門性の高い研究者を育成します。"
      }
    },
    {
      icon: Network,
      number: 3,
      title: {
        EN: "Building and expanding international research networks",
        JP: "国際研究ネットワークの構築と拡大"
      },
      description: {
        EN: "Develop equal-footing collaborations and researcher exchanges with leading institutions worldwide, so that Japan-originated themes and experimental capabilities can play central roles in international projects.",
        JP: "世界の主要機関と対等な共同研究体制や研究者交流を構築し、日本発の研究テーマや実験技術が国際プロジェクトにおいて中心的役割を果たせるようにします。"
      }
    },
    {
      icon: Building,
      number: 4,
      title: {
        EN: "Bridging industry, policy, and public value creation",
        JP: "産業、政策、公共価値創造の橋渡し"
      },
      description: {
        EN: "Work with companies, government, and local authorities to extract real-world issues for quantum technologies, and feed them back into our research agenda. As a publicly funded laboratory, we emphasize accountability and value creation for Japanese society and its citizens.",
        JP: "企業、政府、地方自治体と連携して量子技術に関する実社会の課題を抽出し、研究アジェンダに還元します。公的資金による研究室として、日本社会と市民に対する説明責任と価値創出を重視します。"
      }
    },
    {
      icon: GraduationCap,
      number: 5,
      title: {
        EN: "Providing outreach and learning opportunities",
        JP: "アウトリーチと学習機会の提供"
      },
      description: {
        EN: "Create opportunities for children, students, citizens, and companies to experience the excitement and potential of quantum technologies in an accessible way, and to think about quantum as something directly relevant to their own future.",
        JP: "子供、学生、市民、企業が量子技術の魅力と可能性を身近に体験し、量子を自分たちの未来に直接関わるものとして考えられる機会を創出します。"
      }
    }
  ];

  // Values
  const values = [
    {
      icon: Target,
      title: { EN: "Issue-Driven", JP: "課題駆動型" },
      description: {
        EN: "Start from the issue: define the key question and what will be decided by its answer before launching experiments, simulations, or analyses.",
        JP: "課題から始める：実験、シミュレーション、分析を開始する前に、核となる問いとその答えが何を決定するかを明確にする。"
      }
    },
    {
      icon: Zap,
      title: { EN: "Outcome-Oriented", JP: "成果志向" },
      description: {
        EN: "Value the speed and depth of hypothesis–test cycles and the concrete impact on science, education, and society, rather than the sheer number of hours spent.",
        JP: "単純に費やした時間数ではなく、仮説検証サイクルの速度と深さ、そして科学、教育、社会への具体的な影響を重視します。"
      }
    },
    {
      icon: UserCheck,
      title: { EN: "Client First & Professionalism", JP: "クライアント第一と専門性" },
      description: {
        EN: "Treat Japanese society, its citizens, and our research partners as our 'clients,' use resources responsibly, and aim to exceed expectations in the value we deliver. Honor time, commitments, and quality, and respect the constraints of our counterparts.",
        JP: "日本社会、市民、研究パートナーを「クライアント」として扱い、リソースを責任を持って使用し、提供する価値で期待を超えることを目指します。時間、コミットメント、品質を尊重し、相手の制約を尊重します。"
      }
    },
    {
      icon: Heart,
      title: { EN: "Ownership & Self-Drive", JP: "オーナーシップと自主性" },
      description: {
        EN: "Treat each project not as an assigned task but as one's own initiative. Make decisions and move forward even under uncertainty, proactively changing the situation rather than waiting for others.",
        JP: "各プロジェクトを割り当てられたタスクとしてではなく、自分自身のイニシアチブとして扱います。不確実性の下でも決定を下して前進し、他者を待つのではなく積極的に状況を変えます。"
      }
    },
    {
      icon: Users,
      title: { EN: "Diversity & Collaboration", JP: "多様性と協力" },
      description: {
        EN: "Respect differences in expertise, background, and values, and combine diverse perspectives to create new insights and solutions.",
        JP: "専門知識、背景、価値観の違いを尊重し、多様な視点を組み合わせて新しい洞察と解決策を創出します。"
      }
    },
    {
      icon: MessageCircle,
      title: { EN: "Transparency & Open Communication", JP: "透明性とオープンなコミュニケーション" },
      description: {
        EN: "Share successes, failures, and progress openly, for example through daily To-Do and Progress updates. Give and receive candid feedback focused on outputs and processes, not on personalities.",
        JP: "例えば毎日のTo-Doと進捗更新を通じて、成功、失敗、進捗をオープンに共有します。個人ではなく、成果とプロセスに焦点を当てた率直なフィードバックを与え、受け取ります。"
      }
    },
    {
      icon: Battery,
      title: { EN: "Sustainable High Performance", JP: "持続可能な高パフォーマンス" },
      description: {
        EN: "Favor long-term, sustainable high performance over short-term heroics. Working hard, resting well, and having a life outside the lab are all treated as essential investments in being a better researcher.",
        JP: "短期的な英雄的行為よりも、長期的で持続可能な高パフォーマンスを重視します。一生懸命働き、十分に休息し、研究室外での生活を持つことは、より良い研究者になるための本質的な投資として扱われます。"
      }
    }
  ];

  // Refined Dark surfaces
  const cardSurface = isDark
    ? 'bg-white/[0.03] border border-white/10 hover:border-white/20'
    : 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300';
  const panelSurface = isDark
    ? 'bg-white/[0.03] border border-white/10'
    : 'bg-white border border-slate-200 shadow-sm';
  const headingColor = isDark ? 'text-white' : 'text-slate-900';
  const bodyColor = isDark ? 'text-slate-400' : 'text-slate-600';
  const eyebrowClass = 'text-orange-500 text-xs font-semibold uppercase tracking-[0.22em] mb-3';
  const iconChip = isDark ? 'bg-orange-500/10' : 'bg-orange-100';

  return (
    <div className="relative min-h-screen overflow-hidden">
      <QuantumField density={0.9} />

      <div className="max-w-4xl mx-auto px-6 py-28 sm:py-32 relative z-10">
        {/* Page Header */}
        <PageHeader
          isDark={isDark}
          eyebrow={language === 'EN' ? 'Who we are' : '私たちについて'}
          title={language === 'EN' ? 'About Us' : '私たちについて'}
          subtitle={language === 'EN'
            ? "We are a quantum informatics research group dedicated to transforming quantum science from a laboratory curiosity into a technological and intellectual infrastructure for society."
            : "私たちは、量子科学を研究室内の探求から社会の技術的・知的インフラストラクチャへと変革することを目指す量子インフォマティクス研究グループです。"
          }
        />

        {/* Purpose Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <p className={eyebrowClass}>{language === 'EN' ? 'Purpose' : '目的'}</p>
          <div className="flex items-center gap-3 mb-8">
            <Target className="text-orange-500" size={24} />
            <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${headingColor}`}>
              {language === 'EN' ? 'Why we exist' : '私たちが存在する理由'}
            </h2>
          </div>

          <div className={`rounded-2xl p-8 ${panelSurface}`}>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-5 text-orange-500">
              {language === 'EN'
                ? 'Unlocking the potential of quantum science.'
                : '量子科学の可能性を解き放つ。'
              }
            </h3>

            <p className={`text-base leading-relaxed mb-6 ${headingColor}`}>
              {language === 'EN'
                ? "To capture quantum properties that humanity has not yet fully harnessed, and to release their power to change how we see and shape the world."
                : "人類がまだ十分に活用していない量子特性を捉え、世界の見方や形作り方を変える力を解き放つこと。"
              }
            </p>

            <div className={`pl-6 border-l-2 border-orange-500/30 space-y-4 ${bodyColor}`}>
              <p className="text-base leading-relaxed">
                {language === 'EN'
                  ? 'By advancing quantum sensing, quantum metrology, and quantum information processing, we aim to access "invisible" quantities and complexities that were previously out of reach.'
                  : "量子センシング、量子計測、量子情報処理を発展させることで、これまで到達できなかった「見えない」量や複雑性へのアクセスを目指しています。"
                }
              </p>
              <p className="text-base leading-relaxed">
                {language === 'EN'
                  ? "Our purpose is to turn quantum science from a niche for specialists into a shared intellectual and technological infrastructure for future society."
                  : "私たちの目的は、量子科学を専門家の領域から、未来社会の共有された知的・技術的インフラストラクチャへと変えることです。"
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-20"
        >
          <p className={eyebrowClass}>{language === 'EN' ? 'Vision' : 'ビジョン'}</p>
          <div className="flex items-center gap-3 mb-8">
            <Eye className="text-orange-500" size={24} />
            <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${headingColor}`}>
              {language === 'EN' ? 'Where we want to go' : '私たちが目指す場所'}
            </h2>
          </div>

          <div className={`rounded-2xl p-8 mb-8 ${panelSurface}`}>
            <h3 className={`text-lg sm:text-xl font-semibold tracking-tight mb-4 ${headingColor}`}>
              {language === 'EN'
                ? 'To extend how we describe and understand the world, from a quantum informatics perspective.'
                : '量子インフォマティクスの視点から、世界を記述し理解する方法を拡張すること。'
              }
            </h3>
            <p className={`text-base leading-relaxed ${bodyColor}`}>
              {language === 'EN'
                ? 'We pursue this vision along two research directions:'
                : 'このビジョンを2つの研究方向に沿って追求しています：'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {visionDirections.map((direction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`rounded-2xl p-6 transition-colors ${cardSurface}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${iconChip}`}>
                  <direction.icon className="text-orange-500" size={24} />
                </div>

                <h4 className={`text-lg font-semibold tracking-tight mb-3 ${headingColor}`}>
                  {direction.title[language]}
                </h4>

                <p className={`text-base leading-relaxed ${bodyColor}`}>
                  {direction.description[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <p className={eyebrowClass}>{language === 'EN' ? 'Mission' : 'ミッション'}</p>
          <div className="flex items-center gap-3 mb-8">
            <Compass className="text-orange-500" size={24} />
            <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${headingColor}`}>
              {language === 'EN' ? 'What we do' : '私たちが行うこと'}
            </h2>
          </div>

          <div className={`rounded-2xl p-8 mb-8 ${panelSurface}`}>
            <h3 className={`text-lg sm:text-xl font-semibold tracking-tight mb-4 ${headingColor}`}>
              {language === 'EN'
                ? 'To practice research and education in quantum informatics that help lead the next-generation society.'
                : '次世代社会をリードするための量子インフォマティクスの研究と教育を実践すること。'
              }
            </h3>
            <p className={`text-base leading-relaxed ${bodyColor}`}>
              {language === 'EN'
                ? 'We translate this mission into five lines of action:'
                : 'このミッションを5つの行動方針に展開します：'
              }
            </p>
          </div>

          <div className="space-y-5">
            {missionActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
                className={`rounded-2xl p-6 transition-colors ${cardSurface}`}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-semibold bg-orange-500/10 text-orange-500">
                    {action.number}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <action.icon className="text-orange-500" size={22} />
                      <h4 className={`text-lg font-semibold tracking-tight ${headingColor}`}>
                        {action.title[language]}
                      </h4>
                    </div>

                    <p className={`text-base leading-relaxed ${bodyColor}`}>
                      {action.description[language]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-20"
        >
          <p className={eyebrowClass}>{language === 'EN' ? 'Values' : '価値観'}</p>
          <div className="flex items-center gap-3 mb-8">
            <Heart className="text-orange-500" size={24} />
            <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${headingColor}`}>
              {language === 'EN' ? 'How we behave' : '私たちの行動規範'}
            </h2>
          </div>

          <div className={`rounded-2xl p-8 mb-8 ${panelSurface}`}>
            <p className={`text-base leading-relaxed ${bodyColor}`}>
              {language === 'EN'
                ? 'We commit to the following seven values as our code of conduct:'
                : '次の7つの価値観を行動規範として約束します：'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 + index * 0.05 }}
                className={`rounded-2xl p-6 transition-colors ${cardSurface}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconChip}`}>
                  <value.icon className="text-orange-500" size={22} />
                </div>

                <h4 className={`text-lg font-semibold tracking-tight mb-3 ${headingColor}`}>
                  {value.title[language]}
                </h4>

                <p className={`text-sm leading-relaxed ${bodyColor}`}>
                  {value.description[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className={`rounded-2xl p-8 ${panelSurface}`}
        >
          <Lightbulb className="text-orange-500 mb-5" size={28} />
          <p className={`text-base leading-relaxed ${headingColor}`}>
            {language === 'EN'
              ? "Together, we are building a future where quantum science serves as a foundation for understanding and shaping our world."
              : "私たちは共に、量子科学が世界を理解し形作るための基盤となる未来を築いています。"
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
};
