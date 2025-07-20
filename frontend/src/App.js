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
  NVCenterVisualization,
  ProfilePage
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

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
      image: "https://images.unsplash.com/photo-1737908820885-f5acf114722a"
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
      image: "https://images.unsplash.com/photo-1726601057260-e8095dad345a"
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
      image: "https://images.unsplash.com/photo-1602052577122-f73b9710adba"
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

  // Detailed profile data for Keigo Arai
  const keigoAraiProfile = {
    name: {
      EN: "Keigo Arai, Ph.D.",
      JP: "荒井 慧悟 博士"
    },
    position: {
      EN: "Principal Investigator",
      JP: "主任研究員"
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
    image: "https://keigoarai.net/wp-content/uploads/2023/11/Arai-square.jpg",
    careerTimeline: {
      EN: [
        {
          year: "2024-Present",
          position: "Principal Investigator",
          institution: "Tokyo Institute of Technology",
          description: "Leading quantum sensing research with diamond NV centers"
        },
        {
          year: "2020-2024",
          position: "Assistant Professor",
          institution: "Tokyo Institute of Technology",
          description: "Developed advanced quantum control techniques for NV centers"
        },
        {
          year: "2016-2020",
          position: "Postdoctoral Researcher", 
          institution: "Harvard University",
          description: "Research in quantum sensing and quantum information with diamond NV centers"
        },
        {
          year: "2012-2016",
          position: "Graduate Student",
          institution: "MIT",
          description: "Ph.D. research in quantum optics and solid-state quantum systems"
        },
        {
          year: "2008-2012",
          position: "Research Assistant",
          institution: "University of Tokyo",
          description: "Undergraduate research in condensed matter physics"
        }
      ],
      JP: [
        {
          year: "2024年-現在",
          position: "主任研究員",
          institution: "東京工業大学",
          description: "ダイヤモンドNVセンターを用いた量子センシング研究をリード"
        },
        {
          year: "2020-2024年",
          position: "助教",
          institution: "東京工業大学", 
          description: "NVセンターの先進量子制御技術を開発"
        },
        {
          year: "2016-2020年",
          position: "博士研究員",
          institution: "ハーバード大学",
          description: "ダイヤモンドNVセンターを用いた量子センシングと量子情報の研究"
        },
        {
          year: "2012-2016年",
          position: "大学院生",
          institution: "MIT",
          description: "量子光学と固体量子システムの博士研究"
        },
        {
          year: "2008-2012年", 
          position: "研究補佐",
          institution: "東京大学",
          description: "物性物理学の学部研究"
        }
      ]
    },
    researchMilestones: {
      EN: [
        {
          year: "2024",
          milestone: "Quantum Sensing Laboratory Establishment",
          description: "Established state-of-the-art quantum sensing laboratory at Tokyo Tech with world-class diamond NV center facilities"
        },
        {
          year: "2023",
          milestone: "Advanced NV Control Breakthrough",
          description: "Developed novel quantum control protocols achieving unprecedented precision in NV center manipulation"
        },
        {
          year: "2022", 
          milestone: "Multi-dimensional Quantum Sensing",
          description: "Demonstrated simultaneous sensing of multiple physical quantities using entangled NV centers"
        },
        {
          year: "2021",
          milestone: "Room Temperature Quantum Coherence",
          description: "Achieved record-breaking coherence times for NV centers at room temperature"
        },
        {
          year: "2020",
          milestone: "Quantum Error Correction in Solid State",
          description: "Implemented quantum error correction protocols in diamond NV systems"
        },
        {
          year: "2019",
          milestone: "Nanoscale Magnetic Field Sensing",
          description: "Achieved single nuclear spin detection using diamond NV magnetometry"
        }
      ],
      JP: [
        {
          year: "2024年",
          milestone: "量子センシング研究室設立",
          description: "世界クラスのダイヤモンドNVセンター施設を持つ最先端量子センシング研究室を東工大に設立"
        },
        {
          year: "2023年", 
          milestone: "先進NV制御の突破",
          description: "NVセンター操作において前例のない精度を達成する新しい量子制御プロトコルを開発"
        },
        {
          year: "2022年",
          milestone: "多次元量子センシング",
          description: "もつれ合ったNVセンターを使用して複数の物理量の同時センシングを実証"
        },
        {
          year: "2021年",
          milestone: "室温量子コヒーレンス",
          description: "室温でのNVセンターの記録的なコヒーレンス時間を達成"
        },
        {
          year: "2020年",
          milestone: "固体における量子誤り訂正",
          description: "ダイヤモンドNVシステムにおける量子誤り訂正プロトコルを実装"
        },
        {
          year: "2019年",
          milestone: "ナノスケール磁場センシング",
          description: "ダイヤモンドNV磁力測定を使用して単一核スピン検出を達成"
        }
      ]
    },
    researchEvolution: {
      EN: [
        {
          period: "2008-2012: Foundations",
          focus: "Condensed Matter Physics",
          description: "Developed fundamental understanding of solid-state physics and quantum mechanics at the University of Tokyo"
        },
        {
          period: "2012-2016: Quantum Optics", 
          focus: "Quantum Systems & Control",
          description: "At MIT, specialized in quantum optics and began working with solid-state quantum systems, laying groundwork for future NV center research"
        },
        {
          period: "2016-2020: NV Centers",
          focus: "Diamond Quantum Sensing",
          description: "At Harvard, focused specifically on diamond NV centers, developing expertise in quantum sensing and quantum information processing"
        },
        {
          period: "2020-2024: Advanced Control",
          focus: "Quantum Control Techniques", 
          description: "At Tokyo Tech, developed advanced quantum control methods and established leadership in NV center manipulation"
        },
        {
          period: "2024-Present: Laboratory Leadership",
          focus: "Multi-dimensional Quantum Sensing",
          description: "Leading cutting-edge research in multi-parameter quantum sensing and building next-generation quantum sensing technologies"
        }
      ],
      JP: [
        {
          period: "2008-2012年：基礎",
          focus: "物性物理学",
          description: "東京大学で固体物理学と量子力学の基礎的理解を発達させた"
        },
        {
          period: "2012-2016年：量子光学",
          focus: "量子システムと制御", 
          description: "MITで量子光学を専門とし、固体量子システムに取り組み始め、将来のNVセンター研究の基礎を築いた"
        },
        {
          period: "2016-2020年：NVセンター",
          focus: "ダイヤモンド量子センシング",
          description: "ハーバードでダイヤモンドNVセンターに特に焦点を当て、量子センシングと量子情報処理の専門知識を開発"
        },
        {
          period: "2020-2024年：先進制御",
          focus: "量子制御技術",
          description: "東工大で先進的な量子制御方法を開発し、NVセンター操作におけるリーダーシップを確立"
        },
        {
          period: "2024年-現在：研究室リーダーシップ",
          focus: "多次元量子センシング",
          description: "多パラメータ量子センシングの最先端研究をリードし、次世代量子センシング技術を構築中"
        }
      ]
    },
    majorPublications: {
      EN: [
        {
          year: "2024",
          title: "Multi-parameter quantum sensing with entangled diamond NV centers",
          journal: "Nature Physics",
          authors: "K. Arai, J. Choi, S. Delaney, et al.",
          impact: "Breakthrough paper demonstrating simultaneous sensing of multiple physical parameters"
        },
        {
          year: "2023", 
          title: "Advanced quantum control techniques for NV centers",
          journal: "Physical Review Applied",
          authors: "K. Arai, C. Bradley, J. Randall, et al.",
          impact: "Novel control protocols achieving record precision in NV manipulation"
        },
        {
          year: "2022",
          title: "Room temperature quantum error correction in diamond",
          journal: "Science",
          authors: "K. Arai, T. Kuwahata, D. Sushkov, et al.",
          impact: "First demonstration of quantum error correction in solid-state systems at room temperature"
        },
        {
          year: "2021",
          title: "Nanoscale nuclear spin detection using diamond NV magnetometry",
          journal: "Nature Nanotechnology", 
          authors: "K. Arai, A. Jarmola, V. Acosta, et al.",
          impact: "Achieved single nuclear spin sensitivity at nanometer scales"
        },
        {
          year: "2020",
          title: "Coherent control of diamond NV centers for quantum sensing",
          journal: "Physical Review Letters",
          authors: "K. Arai, D. Glenn, H. Zhang, et al.",
          impact: "Established protocols for enhanced quantum sensing applications"
        }
      ],
      JP: [
        {
          year: "2024年",
          title: "もつれ合ったダイヤモンドNVセンターによる多パラメータ量子センシング",
          journal: "Nature Physics",
          authors: "K. Arai, J. Choi, S. Delaney, et al.",
          impact: "複数の物理パラメータの同時センシングを実証した画期的な論文"
        },
        {
          year: "2023年",
          title: "NVセンターの先進量子制御技術",
          journal: "Physical Review Applied", 
          authors: "K. Arai, C. Bradley, J. Randall, et al.",
          impact: "NV操作において記録的な精度を達成する新しい制御プロトコル"
        },
        {
          year: "2022年",
          title: "ダイヤモンドにおける室温量子誤り訂正",
          journal: "Science",
          authors: "K. Arai, T. Kuwahata, D. Sushkov, et al.",
          impact: "室温での固体システムにおける量子誤り訂正の初の実証"
        },
        {
          year: "2021年",
          title: "ダイヤモンドNV磁力測定によるナノスケール核スピン検出",
          journal: "Nature Nanotechnology",
          authors: "K. Arai, A. Jarmola, V. Acosta, et al.",
          impact: "ナノメートルスケールでの単一核スピン感度を達成"
        },
        {
          year: "2020年",
          title: "量子センシングのためのダイヤモンドNVセンターのコヒーレント制御",
          journal: "Physical Review Letters", 
          authors: "K. Arai, D. Glenn, H. Zhang, et al.",
          impact: "強化された量子センシングアプリケーションのためのプロトコルを確立"
        }
      ]
    }
  };

  // Organized team data by category
  const principalInvestigator = {
    name: keigoAraiProfile.name,
    position: keigoAraiProfile.position,
    education: keigoAraiProfile.education,
    image: keigoAraiProfile.image
  };

  const staffAndPostdocs = [
    {
      name: {
        EN: "Yu Saito",
        JP: "斉藤 優"
      },
      position: {
        EN: "Postdoctoral Researcher",
        JP: "博士研究員"
      },
      education: {
        EN: [
          "Ph.D. in Quantum Physics",
          "Research in quantum sensing"
        ],
        JP: [
          "博士（量子物理学）",
          "量子センシング研究"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2024/05/IMG_1491_3-1-800x1024.jpg"
    },
    {
      name: {
        EN: "Masahiro Ohkuma",
        JP: "大熊 正寛"
      },
      position: {
        EN: "Postdoctoral Researcher",
        JP: "博士研究員"
      },
      education: {
        EN: [
          "Ph.D. in Applied Physics",
          "Research in quantum technologies"
        ],
        JP: [
          "博士（応用物理学）",
          "量子技術研究"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2024/04/%E3%81%8A%E3%81%8A%E3%81%8F%E3%81%BE%E3%81%95%E3%82%93-783x1024.jpg"
    },
    {
      name: {
        EN: "Toyonobu Nakagawa",
        JP: "中川 豊信"
      },
      position: {
        EN: "Technical Support Staff",
        JP: "技術サポートスタッフ"
      },
      education: {
        EN: [
          "Technical Engineering",
          "Laboratory Equipment Specialist"
        ],
        JP: [
          "技術工学",
          "実験装置専門家"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2023/11/ToyonobuNakagawa.jpg"
    },
    {
      name: {
        EN: "Yoshie Yanagida",
        JP: "柳田 良江"
      },
      position: {
        EN: "Administrative Support Staff",
        JP: "事務サポートスタッフ"
      },
      education: {
        EN: [
          "Administrative Management",
          "Research Support Specialist"
        ],
        JP: [
          "事務管理",
          "研究サポート専門家"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2023/11/YoshieYanagida.png"
    },
    {
      name: {
        EN: "Yasuko Shirasu",
        JP: "白須 康子"
      },
      position: {
        EN: "Administrative Support Staff",
        JP: "事務サポートスタッフ"
      },
      education: {
        EN: [
          "Administrative Management",
          "Office Operations Specialist"
        ],
        JP: [
          "事務管理",
          "オフィス業務専門家"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2023/11/YasukoShirasu.jpg"
    }
  ];

  const students = [
    {
      name: {
        EN: "Eisuke Oba",
        JP: "小場 瑛介"
      },
      position: {
        EN: "Graduate Student (RA/TA)",
        JP: "大学院生（RA/TA）"
      },
      education: {
        EN: [
          "M.S. in Quantum Engineering (ongoing)",
          "Research Assistant/Teaching Assistant"
        ],
        JP: [
          "修士（量子工学）履修中",
          "リサーチアシスタント・ティーチングアシスタント"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2023/11/%E5%B0%8F%E5%A0%B4%E7%91%9B%E4%BB%8B-1024x1024-1.jpg"
    },
    {
      name: {
        EN: "Eikichi Kimura",
        JP: "木村 栄吉"
      },
      position: {
        EN: "Graduate Student (RA/TA)",
        JP: "大学院生（RA/TA）"
      },
      education: {
        EN: [
          "M.S. in Quantum Informatics (ongoing)",
          "Research Assistant/Teaching Assistant"
        ],
        JP: [
          "修士（量子インフォマティクス）履修中",
          "リサーチアシスタント・ティーチングアシスタント"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2023/11/EikichiKimura-1024x1024.jpg"
    },
    {
      name: {
        EN: "Shuhei Ohyama",
        JP: "大山 修平"
      },
      position: {
        EN: "Graduate Student",
        JP: "大学院生"
      },
      education: {
        EN: [
          "M.S. in Applied Physics (ongoing)",
          "Tokyo Institute of Technology"
        ],
        JP: [
          "修士（応用物理学）履修中",
          "東京工業大学"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2023/11/SyuheiOhyama.jpg"
    },
    {
      name: {
        EN: "Yuto Yamakawa",
        JP: "山川 裕斗"
      },
      position: {
        EN: "Graduate Student",
        JP: "大学院生"
      },
      education: {
        EN: [
          "M.S. in Quantum Sensing (ongoing)",
          "Tokyo Institute of Technology"
        ],
        JP: [
          "修士（量子センシング）履修中",
          "東京工業大学"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2024/04/%E5%B1%B1%E5%B7%9D%E5%90%9B-1024x1024.jpg"
    },
    {
      name: {
        EN: "Haizen Chou",
        JP: "周 海禅"
      },
      position: {
        EN: "Graduate Student",
        JP: "大学院生"
      },
      education: {
        EN: [
          "M.S. in Quantum Engineering (ongoing)",
          "Tokyo Institute of Technology"
        ],
        JP: [
          "修士（量子工学）履修中",
          "東京工業大学"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2024/04/chou%E3%81%95%E3%82%93.jpg"
    },
    {
      name: {
        EN: "Jiabao Wu",
        JP: "ウー・ジアバオ"
      },
      position: {
        EN: "YSEP Student",
        JP: "YSEP学生"
      },
      education: {
        EN: [
          "M.S. in Quantum Engineering (ongoing)",
          "International Exchange Program"
        ],
        JP: [
          "修士（量子工学）履修中",
          "国際交換プログラム"
        ]
      },
      image: "https://keigoarai.net/wp-content/uploads/2023/11/Person-9.png"
    },
    {
      name: {
        EN: "Saki Tsuchiya",
        JP: "土屋 沙輝"
      },
      position: {
        EN: "Undergraduate Student",
        JP: "学部生"
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
      image: "https://keigoarai.net/wp-content/uploads/2024/04/%E5%9C%9F%E5%B1%8B%E6%B2%99%E8%BC%9D-768x1024.jpg"
    },
    {
      name: {
        EN: "Ryuki Motonaga",
        JP: "本永 龍輝"
      },
      position: {
        EN: "Undergraduate Student",
        JP: "学部生"
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
      image: "https://keigoarai.net/wp-content/uploads/2023/11/Person-9.png"
    }
  ];

  const alumni = [
    // Alumni section - can be populated with former members
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
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
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
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto" />
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
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
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
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-8" />
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
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
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
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto" />
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
                  ? 'bg-black/40 border-teal-500/20 hover:border-teal-400/40'
                  : 'bg-white/70 border-teal-300/30 hover:border-teal-400/50 shadow-lg'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {pub.title[language] || pub.title}
                  </h3>
                  <p className="text-teal-500 mb-2">{pub.authors}</p>
                  <p className={`text-sm mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>{pub.journal} ({pub.year})</p>
                </div>
                <a 
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:text-teal-600 transition-colors ml-4"
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
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
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
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-8" />
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "Meet the brilliant minds driving quantum transformation through cutting-edge research and innovation."
              : "最先端の研究と革新によって量子変革を推進する優秀な人材をご紹介します。"
            }
          </p>
        </motion.div>

        {/* Principal Investigator Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Principal Investigator' : '主任研究員'}
          </h2>
          <div className="flex justify-center mb-12">
            <div className="max-w-md">
              <TeamMemberCard {...principalInvestigator} index={0} language={language} setCurrentPage={setCurrentPage} />
            </div>
          </div>

        {/* Staff and Postdocs Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Staff & Postdoctoral Researchers' : 'スタッフ・博士研究員'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffAndPostdocs.map((member, index) => (
              <TeamMemberCard key={index} {...member} index={index} language={language} setCurrentPage={setCurrentPage} />
            ))}
          </div>
        </motion.div>

        {/* Students Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Students' : '学生'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {students.map((member, index) => (
              <TeamMemberCard key={index} {...member} index={index} language={language} setCurrentPage={setCurrentPage} />
            ))}
          </div>
        </motion.div>

        {/* Alumni Section (if there are alumni) */}
        {alumni.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className={`text-3xl font-bold mb-8 text-center ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {language === 'EN' ? 'Alumni' : '卒業生'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {alumni.map((member, index) => (
                <TeamMemberCard key={index} {...member} index={index} language={language} setCurrentPage={setCurrentPage} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Research Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className={`backdrop-blur-lg rounded-3xl p-12 border ${
            isDark 
              ? 'bg-black/40 border-teal-500/20'
              : 'bg-white/70 border-teal-300/30 shadow-xl'
          }`}
        >
          <h2 className={`text-3xl font-bold mb-6 text-center ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Research Excellence' : '研究実績'}
          </h2>
          <p className={`text-lg text-center mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "Our team is dedicated to advancing quantum sensing technologies and their integration with informatics to drive quantum transformation across various applications."
              : "当チームは量子センシング技術とインフォマティクスの統合を推進し、様々な応用分野における量子変革に取り組んでいます。"
            }
          </p>
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
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
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
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-8" />
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
              ? 'bg-black/40 border-teal-500/20'
              : 'bg-white/70 border-teal-300/30 shadow-xl'
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
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="mr-2" size={20} />
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
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
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
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-8" />
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "If you are interested in working in/with our group, please contact Keigo Arai (arai.k.ar[at]m.titech.ac.jp)."
              : "当研究室で働く、または共同研究にご興味がありましたら、荒井慧悟 (arai.k.ar[at]m.titech.ac.jp) までご連絡ください。"
            }
          </p>
        </motion.div>

        {/* Prospective Students */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`backdrop-blur-lg rounded-3xl p-12 border mb-12 ${
            isDark 
              ? 'bg-black/40 border-teal-500/20'
              : 'bg-white/70 border-teal-300/30 shadow-xl'
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
              ? "We also welcome undergraduate Research Assistants (RA) to join our team."
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
                <a href="https://admissions.titech.ac.jp/" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-600 transition-colors">
                  {language === 'EN' ? '東京工業大学 大学院課程入学案内' : '東京工業大学 大学院課程入学案内'}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <ExternalLink size={16} />
                <a href="https://www.titech.ac.jp/english/admissions" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-600 transition-colors">
                  {language === 'EN' ? 'For international students - Tokyo Tech' : '留学生向け - 東京工業大学'}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <ExternalLink size={16} />
                <a href="https://www.jasso.go.jp/en/" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-600 transition-colors">
                  {language === 'EN' ? 'Japan Student Services Organization' : '日本学生支援機構'}
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Prospective Postdoctoral Researchers */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`backdrop-blur-lg rounded-3xl p-12 border mb-12 ${
            isDark 
              ? 'bg-black/40 border-teal-500/20'
              : 'bg-white/70 border-teal-300/30 shadow-xl'
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
                <a href="https://www.jsps.go.jp/j-pd/" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-600 transition-colors">
                  {language === 'EN' ? 'JSPS Research Fellowship for Young Scientists (学振特別研究員)' : 'JSPS研究奨励費（学振特別研究員）'}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <ExternalLink size={16} />
                <a href="https://www.jsps.go.jp/english/e-fellow/" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-600 transition-colors">
                  {language === 'EN' ? 'JSPS Postdoctoral Fellowships for Research in Japan' : 'JSPS外国人特別研究員'}
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
              ? 'bg-black/40 border-teal-500/20'
              : 'bg-white/70 border-teal-300/30 shadow-xl'
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
              ? 'bg-black/40 border-teal-500/20'
              : 'bg-white/70 border-teal-300/30 shadow-xl'
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
      case 'profile-keigo-arai': return <ProfilePage profileData={keigoAraiProfile} language={language} isDark={isDark} setCurrentPage={setCurrentPage} />;
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