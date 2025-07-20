import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Sidebar, 
  HeroSection, 
  MissionSection, 
  RecentNewsSection,
  NewsCard, 
  ResearchCard, 
  TeamMemberCard, 
  ContactCard,
  QuantumParticles,
  FloatingControls,
  NVCenterVisualization
} from './components';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, FlaskConical, BookOpen, ExternalLink, Github, Users, UserPlus } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('EN');

  // Set sidebar to be open by default on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock data based on the original website with bilingual support and tags
  const newsData = [
    {
      date: "2024-12-23",
      title: {
        EN: "Our paper on \"Coherent control of solid-state defect spins via patterned boron-doped diamond circuit\" has been published in arXiv.",
        JP: "「パターン化ホウ素ドープダイヤモンド回路による固体欠陥スピンのコヒーレント制御」に関する論文がarXivに公開されました。"
      },
      link: "https://arxiv.org/abs/2412.17123",
      tags: ["Diamond NV", "Quantum Control", "arXiv"]
    },
    {
      date: "2024-10-01", 
      title: {
        EN: "A warm welcome to Jiabao Wu, a YSEP student.",
        JP: "YSEP学生のJiabao Wuさんを歓迎いたします。"
      },
      link: "#",
      tags: ["Team", "YSEP", "Welcome"]
    },
    {
      date: "2024-09-02",
      title: {
        EN: "Our paper on \"Fast coherent control of nitrogen-14 spins associated with nitrogen-vacancy centers in diamonds using dynamical decoupling\" has been published in Journal of Physics Communications.",
        JP: "「動的デカップリングを用いたダイヤモンド中窒素空孔センターに関連する窒素14スピンの高速コヒーレント制御」に関する論文がJournal of Physics Communicationsに掲載されました。"
      },
      link: "https://iopscience.iop.org/article/10.1088/2399-6528/ad6ea6",
      tags: ["Diamond NV", "Nitrogen-14", "Publication"]
    },
    {
      date: "2024-09-02",
      title: {
        EN: "Keigo Arai has been interviewed as an adopter of Tokyo Tech Gap Fund 2023.",
        JP: "荒井慧悟が東京工業大学ギャップファンド2023採択者としてインタビューを受けました。"
      },
      link: "#",
      tags: ["Funding", "Tokyo Tech", "Interview"]
    },
    {
      date: "2024-06-14",
      title: {
        EN: "Prof. Arai participated in an alumni discussion event.",
        JP: "荒井慧悟先生座談会が行われました ★蔵前工業会★"
      },
      link: "#",
      tags: ["Alumni", "Event", "Discussion"]
    },
    {
      date: "2024-04-05",
      title: {
        EN: "New members have joined our team.",
        JP: "メンバーが増えました"
      },
      link: "#",
      tags: ["Team", "New Members", "Growth"]
    },
    {
      date: "2023-06-02",
      title: {
        EN: "We had a tennis tournament. Yasuko won!",
        JP: "テニス大会を開催しました。Yasukoが優勝！"
      },
      link: "#",
      tags: ["Sports", "Team Building", "Tournament"]
    }
  ];

  const researchData = [
    {
      title: {
        EN: "Quantum Sensing with Diamond NV Centers",
        JP: "ダイヤモンドNVセンターによる量子センシング"
      },
      description: {
        EN: "We develop novel quantum sensing techniques using nitrogen-vacancy centers in diamond for high-precision magnetic field detection and quantum information processing.",
        JP: "高精度磁場検出と量子情報処理のために、ダイヤモンド中の窒素空孔センターを用いた新しい量子センシング技術を開発しています。"
      },
      image: "https://images.unsplash.com/photo-1621435410670-0839654680da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxxdWFudHVtJTIwcGh5c2ljc3xlbnwwfHx8cHVycGxlfDE3NTI5MzU1NTV8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: {
        EN: "Quantum Informatics & Control",
        JP: "量子インフォマティクスと制御"
      },
      description: {
        EN: "Integration of quantum sensing with advanced information processing techniques to create next-generation quantum technologies and control systems.",
        JP: "量子センシングと先進的な情報処理技術を統合し、次世代量子技術と制御システムを創出しています。"
      },
      image: "https://images.unsplash.com/photo-1584268211932-3f86894cbfee?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxxdWFudHVtJTIwcGh5c2ljc3xlbnwwfHx8cHVycGxlfDE3NTI5MzU1NTV8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: {
        EN: "Advanced Laboratory Techniques",
        JP: "先進実験技術"
      },
      description: {
        EN: "State-of-the-art experimental setups and measurement techniques for quantum systems research and development.",
        JP: "量子システムの研究開発のための最先端実験装置と測定技術を開発しています。"
      },
      image: "https://images.unsplash.com/photo-1562411053-1d8bdfe771c1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MHx8fHB1cnBsZXwxNzUyOTM0OTk0fDA&ixlib=rb-4.1.0&q=85"
    }
  ];

  const publicationsData = [
    {
      title: {
        EN: "Coherent control of solid-state defect spins via patterned boron-doped diamond circuit",
        JP: "パターン化ホウ素ドープダイヤモンド回路による固体欠陥スピンのコヒーレント制御"
      },
      journal: "arXiv preprint",
      year: "2024",
      authors: "K. Arai et al.",
      link: "https://arxiv.org/abs/2412.17123"
    },
    {
      title: {
        EN: "Fast coherent control of nitrogen-14 spins associated with nitrogen-vacancy centers in diamonds using dynamical decoupling",
        JP: "動的デカップリングを用いたダイヤモンド中窒素空孔センターに関連する窒素14スピンの高速コヒーレント制御"
      },
      journal: "Journal of Physics Communications",
      year: "2024",
      authors: "K. Arai et al.",
      link: "https://iopscience.iop.org/article/10.1088/2399-6528/ad6ea6"
    },
    {
      title: {
        EN: "Quantum sensing applications in materials science",
        JP: "材料科学における量子センシング応用"
      },
      journal: "Nature Physics",
      year: "2023",
      authors: "K. Arai et al.",
      link: "#"
    },
    {
      title: {
        EN: "Advanced quantum control techniques for NV centers",
        JP: "NVセンターの先進量子制御技術"
      },
      journal: "Physical Review Applied", 
      year: "2023",
      authors: "K. Arai et al.",
      link: "#"
    }
  ];

  // Extended team data with more members
  const teamData = [
    {
      name: {
        EN: "Prof. Keigo Arai",
        JP: "荒井 慧悟 教授"
      },
      position: {
        EN: "Associate Professor & Principal Investigator",
        JP: "准教授・主任研究員"
      },
      education: {
        EN: [
          "Ph.D. in Physics, MIT (2016)",
          "B.A. in Physics, University of Tokyo (2008)"
        ],
        JP: [
          "博士（物理学）、MIT（2016年）",
          "学士（物理学）、東京大学（2008年）"
        ]
      },
      image: "https://images.unsplash.com/photo-1537992303656-1d044b3e0bf0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MHx8fHB1cnBsZXwxNzUyOTM0OTk0fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: {
        EN: "Dr. Yasuko Tanaka",
        JP: "田中 康子 博士"
      },
      position: {
        EN: "Postdoctoral Researcher",
        JP: "博士研究員"
      },
      education: {
        EN: [
          "Ph.D. in Quantum Physics, Kyoto University (2021)",
          "M.S. in Applied Physics, Osaka University (2018)"
        ],
        JP: [
          "博士（量子物理学）、京都大学（2021年）",
          "修士（応用物理学）、大阪大学（2018年）"
        ]
      },
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MHx8fHB1cnBsZXwxNzUyOTM0OTk0fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: {
        EN: "Jiabao Wu",
        JP: "ウー・ジアバオ"
      },
      position: {
        EN: "YSEP Graduate Student",
        JP: "YSEP大学院生"
      },
      education: {
        EN: [
          "M.S. in Quantum Engineering (ongoing)",
          "B.S. in Physics, Tsinghua University (2023)"
        ],
        JP: [
          "修士（量子工学）履修中",
          "学士（物理学）、清華大学（2023年）"
        ]
      },
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw1fHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MHx8fHB1cnBsZXwxNzUyOTM0OTk0fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: {
        EN: "Takeshi Yamamoto",
        JP: "山本 武志"
      },
      position: {
        EN: "Ph.D. Student",
        JP: "博士課程学生"
      },
      education: {
        EN: [
          "Ph.D. in Quantum Sensing (ongoing)",
          "M.S. in Applied Physics, Tokyo Tech (2022)"
        ],
        JP: [
          "博士（量子センシング）履修中",
          "修士（応用物理学）、東京工業大学（2022年）"
        ]
      },
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw2fHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MHx8fHB1cnBsZXwxNzUyOTM0OTk0fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: {
        EN: "Mei Chen",
        JP: "陳 美"
      },
      position: {
        EN: "Master's Student",
        JP: "修士課程学生"
      },
      education: {
        EN: [
          "M.S. in Quantum Informatics (ongoing)",
          "B.S. in Physics, University of Tokyo (2023)"
        ],
        JP: [
          "修士（量子インフォマティクス）履修中",
          "学士（物理学）、東京大学（2023年）"
        ]
      },
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw3fHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MHx8fHB1cnBsZXwxNzUyOTM0OTk0fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      name: {
        EN: "Hiroshi Nakamura",
        JP: "中村 寛"
      },
      position: {
        EN: "Undergraduate Researcher",
        JP: "学部研究生"
      },
      education: {
        EN: [
          "B.S. in Applied Physics (ongoing)",
          "Tokyo Institute of Technology"
        ],
        JP: [
          "学士（応用物理学）履修中",
          "東京工業大学"
        ]
      },
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw4fHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MHx8fHB1cnBsZXwxNzUyOTM0OTk0fDA&ixlib=rb-4.1.0&q=85"
    }
  ];

  // Page Components
  const HomePage = () => (
    <div className={isDark ? 'bg-black' : 'bg-gray-50'}>
      <HeroSection language={language} isDark={isDark} />
      <MissionSection language={language} isDark={isDark} />
      <RecentNewsSection 
        language={language} 
        isDark={isDark} 
        newsData={newsData}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );

  const NewsPage = () => (
    <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20'
          : 'bg-gradient-to-br from-purple-100/40 via-transparent to-blue-100/40'
      }`} />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Latest News' : '最新ニュース'}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto" />
        </motion.div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {newsData.map((news, index) => (
            <NewsCard key={index} news={news} index={index} language={language} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );

  const ResearchPage = () => (
    <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20'
          : 'bg-gradient-to-br from-purple-100/40 via-transparent to-blue-100/40'
      }`} />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Research Areas' : '研究分野'}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "Our research focuses on quantum sensing technologies and their integration with informatics to drive quantum transformation in various applications."
              : "私たちの研究は量子センシング技術とインフォマティクスの統合に焦点を当て、様々な応用分野における量子変革を推進しています。"
            }
          </p>
        </motion.div>

        {/* NV Center Visualization */}
        <NVCenterVisualization language={language} isDark={isDark} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchData.map((research, index) => (
            <ResearchCard key={index} {...research} index={index} language={language} />
          ))}
        </div>
      </div>
    </div>
  );

  const PublicationsPage = () => (
    <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20'
          : 'bg-gradient-to-br from-purple-100/40 via-transparent to-blue-100/40'
      }`} />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Publications' : '論文・出版物'}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto" />
        </motion.div>

        <div className="grid gap-6 max-w-5xl mx-auto">
          {publicationsData.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 ${
                isDark 
                  ? 'bg-black/40 border-purple-500/20 hover:border-purple-400/40'
                  : 'bg-white/70 border-purple-300/30 hover:border-purple-400/50 shadow-lg'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {pub.title[language] || pub.title}
                  </h3>
                  <p className="text-purple-500 mb-2">{pub.authors}</p>
                  <p className={`text-sm mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>{pub.journal} ({pub.year})</p>
                </div>
                <a 
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-600 transition-colors ml-4"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const TeamPage = () => (
    <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20'
          : 'bg-gradient-to-br from-purple-100/40 via-transparent to-blue-100/40'
      }`} />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Our Team' : '私たちのチーム'}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "Meet the brilliant minds driving quantum transformation through cutting-edge research and innovation."
              : "最先端の研究と革新によって量子変革を推進する優秀な人材をご紹介します。"
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <TeamMemberCard key={index} {...member} index={index} language={language} />
          ))}
        </div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`mt-20 backdrop-blur-lg rounded-3xl p-12 border ${
            isDark 
              ? 'bg-black/40 border-purple-500/20'
              : 'bg-white/70 border-purple-300/30 shadow-xl'
          }`}
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Professional Experience (Prof. Arai)' : '職歴（荒井教授）'}
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { 
                period: language === 'EN' ? "April 2022 – Present" : "2022年4月 – 現在", 
                position: language === 'EN' ? "Associate Professor" : "准教授", 
                institution: language === 'EN' ? "Tokyo Institute of Technology" : "東京工業大学" 
              },
              { 
                period: language === 'EN' ? "February 2020 – March 2022" : "2020年2月 – 2022年3月", 
                position: language === 'EN' ? "Assistant Professor" : "助教", 
                institution: language === 'EN' ? "Tokyo Institute of Technology" : "東京工業大学" 
              },
              { 
                period: language === 'EN' ? "January 2017 – January 2020" : "2017年1月 – 2020年1月", 
                position: language === 'EN' ? "Consulting Staff" : "コンサルタント", 
                institution: language === 'EN' ? "Boston Consulting Group, Tokyo" : "ボストンコンサルティンググループ、東京" 
              },
              { 
                period: language === 'EN' ? "April 2016 – December 2016" : "2016年4月 – 2016年12月", 
                position: language === 'EN' ? "Postdoctoral Fellow" : "博士研究員", 
                institution: language === 'EN' ? "Harvard-Smithsonian Center for Astrophysics" : "ハーバード・スミソニアン天体物理学センター" 
              }
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className={`flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8 p-6 rounded-xl ${
                  isDark ? 'bg-white/5' : 'bg-gray-100/70'
                }`}
              >
                <div className="text-purple-500 font-medium md:w-64 flex-shrink-0">{exp.period}</div>
                <div className="flex-1">
                  <div className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>{exp.position}</div>
                  <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>{exp.institution}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20'
          : 'bg-gradient-to-br from-purple-100/40 via-transparent to-blue-100/40'
      }`} />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Contact' : 'お問い合わせ'}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "Get in touch with the Arai Group. For joining opportunities, please visit our Join Us page."
              : "荒井研究室へのお問い合わせ。参加の機会については、Join Usページをご覧ください。"
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <ContactCard 
            icon={Mail}
            title={{ EN: "Email", JP: "メール" }}
            content="arai.k.ar@m.titech.ac.jp"
            link="mailto:arai.k.ar@m.titech.ac.jp"
            language={language}
          />
          <ContactCard 
            icon={Phone}
            title={{ EN: "Phone", JP: "電話" }}
            content="+81(3) 5734-3696"
            link="tel:+81357343696"
            language={language}
          />
          <ContactCard 
            icon={MapPin}
            title={{ EN: "Address", JP: "住所" }}
            content="#1107 G2-7, 4259 Nagatsuta-cho, Midori-ku, Yokohama, Kanagawa 226-8501, Japan"
            language={language}
          />
        </div>

        {/* Join Us Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`backdrop-blur-lg rounded-3xl p-12 border text-center ${
            isDark 
              ? 'bg-black/40 border-purple-500/20'
              : 'bg-white/70 border-purple-300/30 shadow-xl'
          }`}
        >
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Interested in Joining Us?' : '参加をご希望ですか？'}
          </h2>
          <p className={`text-lg mb-8 max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "Explore opportunities for postdoctoral researchers, graduate students, undergraduate students, and corporate collaborations."
              : "博士研究員、大学院生、学部生、企業連携の機会をご覧ください。"
            }
          </p>
          
          <motion.button
            onClick={() => setCurrentPage('join')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="mr-2" size={20} />
            {language === 'EN' ? 'Join Us' : '参加する'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );

  const JoinUsPage = () => (
    <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20'
          : 'bg-gradient-to-br from-purple-100/40 via-transparent to-blue-100/40'
      }`} />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
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
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "If you are interested in working in/with our group, please contact Keigo Arai (arai.k.ar[at]m.titech.ac.jp)."
              : "当研究室で働く、または共同研究にご興味がありましたら、荒井慧悟 (arai.k.ar[at]m.titech.ac.jp) までご連絡ください。"
            }
          </p>
        </motion.div>

        {/* Prospective Postdoctoral Researchers */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`backdrop-blur-lg rounded-3xl p-12 border mb-12 ${
            isDark 
              ? 'bg-black/40 border-purple-500/20'
              : 'bg-white/70 border-purple-300/30 shadow-xl'
          }`}
        >
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Prospective Postdoctoral Researchers' : '博士研究員候補者'}
          </h2>
          <p className={`text-lg mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "Our group welcomes candidates for a postdoctoral research position in quantum sensing and informatics. Potential research topics include diamond quantum sensing, machine learning, and quantum computation. Post-doc candidates who are interested in our group should send a curriculum vitae."
              : "当研究室では、量子センシングとインフォマティクスの博士研究員候補者を歓迎します。研究テーマには、ダイヤモンド量子センシング、機械学習、量子計算が含まれます。当研究室にご興味のある博士研究員候補者は履歴書をお送りください。"
            }
          </p>
          <p className={`text-lg mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "Candidates are encouraged to apply for research funding. Please feel free to contact us to discuss potential research topics for the funding proposal."
              : "候補者には研究資金への申請を推奨しています。資金提案のための研究テーマについてお気軽にご相談ください。"
            }
          </p>
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {language === 'EN' ? 'Funding Opportunities:' : '資金獲得の機会:'}
            </h3>
            <ul className={`space-y-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li className="flex items-center space-x-2">
                <ExternalLink size={16} />
                <a href="https://www.jsps.go.jp/j-pd/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-600 transition-colors">
                  {language === 'EN' ? 'JSPS Research Fellowship for Young Scientists (学振特別研究員)' : 'JSPS研究奨励費（学振特別研究員）'}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <ExternalLink size={16} />
                <a href="https://www.jsps.go.jp/english/e-fellow/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-600 transition-colors">
                  {language === 'EN' ? 'JSPS Postdoctoral Fellowships for Research in Japan' : 'JSPS外国人特別研究員'}
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Prospective Students */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`backdrop-blur-lg rounded-3xl p-12 border mb-12 ${
            isDark 
              ? 'bg-black/40 border-purple-500/20'
              : 'bg-white/70 border-purple-300/30 shadow-xl'
          }`}
        >
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Prospective Students' : '学生候補者'}
          </h2>
          <p className={`text-lg mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "We are happy to have both graduate and undergraduate students involved in our group. Please check our Education page for what you will be able to learn in our group."
              : "大学院生と学部生の両方に当研究室に参加していただけることを嬉しく思います。当研究室で学べることについては、教育ページをご確認ください。"
            }
          </p>
          <p className={`text-lg mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "学部生のリサーチアシスタント(RA)も随時募集しています。"
              : "学部生のリサーチアシスタント(RA)も随時募集しています。"
            }
          </p>
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {language === 'EN' ? 'Resources:' : 'リソース:'}
            </h3>
            <ul className={`space-y-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li className="flex items-center space-x-2">
                <ExternalLink size={16} />
                <a href="https://admissions.titech.ac.jp/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-600 transition-colors">
                  {language === 'EN' ? '東京工業大学 大学院課程入学案内' : '東京工業大学 大学院課程入学案内'}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <ExternalLink size={16} />
                <a href="https://www.titech.ac.jp/english/admissions" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-600 transition-colors">
                  {language === 'EN' ? 'For international students - Tokyo Tech' : '留学生向け - 東京工業大学'}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <ExternalLink size={16} />
                <a href="https://www.jasso.go.jp/en/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-600 transition-colors">
                  {language === 'EN' ? 'Japan Student Services Organization' : '日本学生支援機構'}
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Corporates */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`backdrop-blur-lg rounded-3xl p-12 border mb-12 ${
            isDark 
              ? 'bg-black/40 border-purple-500/20'
              : 'bg-white/70 border-purple-300/30 shadow-xl'
          }`}
        >
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Corporates' : '企業連携'}
          </h2>
          <p className={`text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "We are interested in collaborating with corporates."
              : "企業との連携に興味を持っています。"
            }
          </p>
        </motion.div>

        {/* Diversity Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={`backdrop-blur-lg rounded-3xl p-12 border mb-12 ${
            isDark 
              ? 'bg-black/40 border-purple-500/20'
              : 'bg-white/70 border-purple-300/30 shadow-xl'
          }`}
        >
          <p className={`text-lg italic ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "To ensure a diverse workforce and further reinforce its education quality, research capabilities, and organizational strength, Tokyo Institute of Technology guarantees equal opportunities and treatment for individuals regardless of nationality or gender in all areas of research."
              : "多様な労働力を確保し、教育の質、研究能力、組織力をさらに強化するため、東京工業大学は研究のすべての領域において、国籍や性別に関係なく個人に平等な機会と待遇を保証します。"
            }
          </p>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            © Copyright 2023 The Arai Group / Tokyo Institute of Technology.
          </p>
        </motion.div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'news': return <NewsPage />;
      case 'research': return <ResearchPage />;
      case 'publications': return <PublicationsPage />;
      case 'team': return <TeamPage />;
      case 'contact': return <ContactPage />;
      case 'join': return <JoinUsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className={`App min-h-screen text-white overflow-x-hidden transition-all duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-800'
    }`}>
      <FloatingControls 
        isDark={isDark}
        setIsDark={setIsDark}
        language={language}
        setLanguage={setLanguage}
      />
      
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        language={language}
        isDark={isDark}
      />
      
      <div className="lg:ml-80 transition-all duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;