// Comprehensive Research Themes - Arai Laboratory
export const researchData = [
  {
    number: 1,
    title: {
      EN: "Quantum Metrology & Machine Learning",
      JP: "量子計測と機械学習"
    },
    overview: {
      EN: "We combine cutting-edge machine learning with quantum measurement to build the next generation of intelligent quantum sensing systems. Rather than using ML as a general-purpose tool, we focus on where its impact is most significant: transforming complex quantum signals into calibrated physical insights, optimizing quantum control sequences, and creating adaptive measurement protocols that learn from data.",
      JP: "最先端の機械学習と量子測定を組み合わせ、次世代のインテリジェント量子センシングシステムを構築します。MLを汎用ツールとして使用するのではなく、その影響が最も大きい領域に焦点を当てています：複雑な量子信号を校正された物理的洞察に変換し、量子制御シーケンスを最適化し、データから学習する適応的測定プロトコルを作成します。"
    },
    description: {
      EN: "This flagship theme represents the core identity of our group: advancing quantum metrology through physics-informed machine learning and data-driven quantum control. We develop quantum metrology digital twins that predict sensor behavior under realistic conditions, design optimal measurement protocols using reinforcement learning and Bayesian optimization, and create robust estimators that turn noisy quantum signals into precise, uncertainty-quantified physical measurements. Our approach tightly integrates simulation, experiment, and deployment, continuously updating models with real sensor data from extreme and field environments.",
      JP: "このフラッグシップテーマは私たちのグループの核となるアイデンティティを表しています：物理情報機械学習とデータ駆動量子制御を通じた量子計測の進歩。現実的な条件下でセンサ動作を予測する量子計測デジタルツインを開発し、強化学習とベイズ最適化を使用して最適な測定プロトコルを設計し、ノイズの多い量子信号を正確で不確実性定量化された物理測定に変換するロバスト推定器を作成します。私たちのアプローチはシミュレーション、実験、展開を緊密に統合し、極限環境やフィールド環境からの実際のセンサデータでモデルを継続的に更新します。"
    },
    exampleTopics: {
      EN: [
        "Physics-informed neural networks for quantum spin dynamics and sensor response modeling",
        "Reinforcement learning and optimal experimental design for adaptive quantum sensing",
        "Bayesian inference and ML-based state estimation for NV-center metrology with uncertainty quantification",
        "Digital twin frameworks coupling first-principles models with real measurement data",
        "Automated calibration and drift compensation using domain adaptation and transfer learning",
        "Surrogate simulation models for rapid protocol optimization (CPT/EIT/QND-inspired sequences)"
      ],
      JP: [
        "量子スピンダイナミクスとセンサ応答モデリングのための物理情報ニューラルネットワーク",
        "適応量子センシングのための強化学習と最適実験設計",
        "不確実性定量化を伴うNVセンター計測のためのベイズ推論とMLベース状態推定",
        "第一原理モデルと実測データを結合するデジタルツインフレームワーク",
        "ドメイン適応と転移学習を使用した自動校正とドリフト補償",
        "迅速なプロトコル最適化のための代理シミュレーションモデル（CPT/EIT/QNDインスパイアシーケンス）"
      ]
    },
    category: "Flagship Research Theme",
    leadResearchers: {
      EN: "Led by Eikichi Kimura, Risei Abe, and research team",
      JP: "木村詠吉、阿部李星、研究チームが主導"
    }
  },
  {
    number: 2,
    title: {
      EN: "Quantum Control & Measurement Dynamics",
      JP: "量子制御と測定ダイナミクス"
    },
    overview: {
      EN: "We develop a quantum informatics view of controlled quantum systems: how information is generated, filtered, and stabilized through control and measurement. Our goal is to convert fragile coherence into a designable resource for quantum sensing and quantum technologies.",
      JP: "制御された量子システムの量子情報学的視点を開発：制御と測定を通じて情報がどのように生成、フィルタリング、安定化されるか。私たちの目標は、脆弱なコヒーレンスを量子センシングと量子技術のための設計可能なリソースに変換することです。"
    },
    description: {
      EN: "Key concepts include Coherent Population Trapping (CPT) and Electromagnetically Induced Transparency (EIT), which enable long-lived coherence and narrow spectral features even in dissipative environments. We also study Quantum Non-Demolition (QND) measurement and continuous measurement as foundations for precision metrology, feedback control, and quantum state estimation, connecting measurement directly to information flow and engineering utility.",
      JP: "主要な概念には、散逸環境でも長寿命コヒーレンスと狭いスペクトル特性を可能にするコヒーレント集団トラッピング（CPT）と電磁誘導透明性（EIT）が含まれます。精密計測、フィードバック制御、量子状態推定の基礎として量子非破壊（QND）測定と連続測定も研究し、測定を情報フローと工学的有用性に直接結びつけています。"
    },
    exampleTopics: {
      EN: [
        "Coherent control and narrow-line spectroscopy using CPT and EIT",
        "Optimal and robust control of quantum sensors and qubits",
        "QND and continuous measurements with measurement-based feedback control"
      ],
      JP: [
        "CPTとEITを使用したコヒーレント制御と狭線スペクトロスコピー",
        "量子センサとキュービットの最適かつロバストな制御",
        "測定ベースのフィードバック制御によるQNDおよび連続測定"
      ]
    },
    category: "Fundamental Quantum Physics"
  },
  {
    number: 3,
    title: {
      EN: "Diamond Quantum Electronics",
      JP: "ダイヤモンド量子エレクトロニクス"
    },
    overview: {
      EN: "We pursue a platform mission: establishing diamond as technological infrastructure for quantum devices that remain functional in realistic and extreme environments. By integrating dopants, defects, and quantum spins into engineered architectures, we connect materials → devices → measurement in a single stack.",
      JP: "プラットフォームミッション：現実的で極限的な環境で機能し続ける量子デバイスの技術インフラとしてダイヤモンドを確立すること。ドーパント、欠陥、量子スピンを工学的アーキテクチャに統合することで、材料→デバイス→測定を単一スタックで接続します。"
    },
    description: {
      EN: "This theme embodies \"robustness over ideality\" by design: diamond-based quantum electronics can be engineered for high temperature, high pressure, and harsh chemical conditions, expanding where quantum systems can operate and what they can measure.",
      JP: "このテーマは設計により「理想性よりも堅牢性」を体現しています：ダイヤモンドベースの量子エレクトロニクスは、高温、高圧、過酷な化学的条件に対応できるよう設計され、量子システムが動作できる場所と測定できる対象を拡大します。"
    },
    exampleTopics: {
      EN: [
        "Quantum circuits and devices based on boron-doped diamond (BDD) and spin defects",
        "Diamond quantum sensors robust against extreme environments",
        "Combining diamond surface electrochemistry with quantum measurements"
      ],
      JP: [
        "ホウ素ドープダイヤモンド（BDD）とスピン欠陥に基づく量子回路とデバイス",
        "極限環境に対して堅牢なダイヤモンド量子センサ",
        "ダイヤモンド表面電気化学と量子測定の組み合わせ"
      ]
    },
    category: "Quantum Materials & Devices"
  },
  {
    number: 4,
    title: {
      EN: "Quantum Materials Sensing & Extreme-Condition Physics",
      JP: "量子材料センシングと極限条件物理学"
    },
    overview: {
      EN: "Many quantum states of matter are \"invisible\" to conventional probes. We use quantum sensors to make the invisible visible by spatially resolving magnetic fields, currents, and spin order, turning quantum measurement into a direct window on quantum materials.",
      JP: "多くの量子物質状態は従来のプローブでは「見えません」。磁場、電流、スピン秩序を空間的に解決することで、量子センサを使用して見えないものを見えるようにし、量子測定を量子材料への直接の窓に変えています。"
    },
    description: {
      EN: "Our scope spans superconductors, magnetic materials, and defect physics under extreme conditions. By visualizing phase behavior and local structure (rather than only bulk averages), we aim to extract design principles for new materials and guidelines for quantum devices that must function in real environments.",
      JP: "私たちの範囲は、極限条件下での超伝導体、磁性材料、欠陥物理学に及びます。相挙動と局所構造を視覚化することで（バルク平均だけでなく）、新材料の設計原理と実環境で機能する必要がある量子デバイスのガイドラインを抽出することを目指しています。"
    },
    exampleTopics: {
      EN: [
        "Nanoscale magnetic-field imaging of superconductors and magnetic materials",
        "Local probing of high-temperature magnetic phase transitions (e.g., Curie transitions)",
        "High-temperature and high-pressure properties of defects in diamond, including spin and charge dynamics"
      ],
      JP: [
        "超伝導体と磁性材料のナノスケール磁場イメージング",
        "高温磁気相転移の局所プローブ（例：キュリー転移）",
        "スピンと電荷ダイナミクスを含むダイヤモンド中の欠陥の高温・高圧特性"
      ]
    },
    category: "Condensed Matter Physics"
  },
  {
    number: 5,
    title: {
      EN: "Quantum Environmental & Infrastructure Sensing",
      JP: "量子環境・インフラセンシング"
    },
    overview: {
      EN: "This theme is where our Mission becomes explicit: translating quantum measurement into societal monitoring infrastructure. Many critical systems (oceans, underground environments, industrial components) fail silently until damage is advanced. Quantum sensors can detect early, subtle signatures that conventional tools miss.",
      JP: "このテーマは私たちのミッションが明確になる場所です：量子測定を社会監視インフラに変換すること。多くの重要なシステム（海洋、地下環境、産業部品）は、損傷が進むまで静かに故障します。量子センサは、従来のツールが見逃す初期の微妙な兆候を検出できます。"
    },
    description: {
      EN: "We focus on deployable, interpretable measurement protocols that connect quantum signals to actionable diagnostics for environment and infrastructure health.",
      JP: "環境とインフラの健全性に対する実行可能な診断に量子信号を接続する、展開可能で解釈可能な測定プロトコルに焦点を当てています。"
    },
    exampleTopics: {
      EN: [
        "Quantum sensing of seawater pH and electrochemical processes",
        "Non-destructive detection of micro-defects and hydrogen embrittlement in metals",
        "Quantum sensing methods and measurement protocols for field deployment"
      ],
      JP: [
        "海水pHと電気化学プロセスの量子センシング",
        "金属中の微小欠陥と水素脆化の非破壊検出",
        "フィールド展開のための量子センシング方法と測定プロトコル"
      ]
    },
    category: "Applied Quantum Sensing"
  },
  {
    number: 6,
    title: {
      EN: "Quantum Probability & Social Informatics",
      JP: "量子確率と社会情報学"
    },
    overview: {
      EN: "To extend \"how we describe and understand the world\" beyond physical systems, we explore whether quantum probability provides a rigorous language for contextuality, order effects, and non-classical correlations in human judgment and social dynamics.",
      JP: "物理システムを超えて「世界を記述し理解する方法」を拡張するために、量子確率が人間の判断と社会的ダイナミクスにおける文脈性、順序効果、非古典的相関の厳密な言語を提供するかどうかを探求しています。"
    },
    description: {
      EN: "This theme contributes to intellectual infrastructure: a quantum-informatics-inspired framework for modeling decisions, organizations, and socio-economic systems, grounded in data and evaluated by predictive utility rather than analogy alone.",
      JP: "このテーマは知的インフラに貢献します：意思決定、組織、社会経済システムをモデル化するための量子情報学にインスパイアされたフレームワーク。データに基づき、類推だけでなく予測効用によって評価されます。"
    },
    exampleTopics: {
      EN: [
        "Quantum-probability models of judgment, bias, and context effects",
        "Quantum-like modeling of social correlations and information networks",
        "Applications to policy, finance, and organizational design"
      ],
      JP: [
        "判断、バイアス、文脈効果の量子確率モデル",
        "社会的相関と情報ネットワークの量子的モデリング",
        "政策、金融、組織設計への応用"
      ]
    },
    category: "Interdisciplinary Research"
  }
];
