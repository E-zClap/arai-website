// Comprehensive Research Themes - Arai Laboratory
export const researchData = [
  {
    number: 1,
    title: {
      EN: "Quantum Metrology, Control & Machine Learning",
      JP: "量子計測、制御と機械学習"
    },
    overview: {
      EN: "We develop advanced quantum measurement and control techniques combined with machine learning to push the boundaries of precision sensing. This flagship theme integrates quantum control theory, nanoscale magnetometry, and data-driven modeling to transform quantum sensors from laboratory demonstrations into reliable, field-deployable measurement tools, converting fragile quantum coherence into designable resources.",
      JP: "機械学習と組み合わせた先進的な量子測定・制御技術を開発し、精密センシングの限界を押し広げます。本テーマでは、量子制御理論、ナノスケール磁気測定、データ駆動型モデリングを統合することで、量子センサを実験室レベルから実用的な測定ツールへと発展させ、脆弱な量子コヒーレンスを設計可能な資源に変換します。"
    },
    description: {
      EN: "This flagship theme represents the core identity of our group: building practical quantum metrology systems where measurement physics, quantum control, and intelligent algorithms work together. We focus on NV-center quantum sensors for magnetic field, temperature, and strain measurements at the nanoscale, while developing physics-informed machine learning frameworks that optimize protocols, calibrate sensors, and extract quantitative information from complex quantum signals. Key concepts include Coherent Population Trapping (CPT) and Electromagnetically Induced Transparency (EIT), which enable long-lived coherence and narrow spectral features even in dissipative environments. We also study Quantum Non-Demolition (QND) measurement and continuous measurement as foundations for precision metrology, feedback control, and quantum state estimation. Our approach spans fundamental measurement theory, quantum control dynamics, experimental implementation, and computational methods.",
      JP: "本テーマは、私たちの研究グループの中核的なアイデンティティを示すものです。測定物理学、量子制御、知的アルゴリズムが連携する実用的な量子計測システムの構築を目指しています。ナノスケールにおける磁場・温度・歪み測定のためのNVセンター量子センサの開発に注力しつつ、物理学に基づく機械学習フレームワークを用いてプロトコルの最適化、センサ校正、複雑な量子信号からの定量情報抽出を行います。主要な概念として、散逸環境下でも長寿命コヒーレンスと狭線幅スペクトルを実現するコヒーレント集団捕獲（CPT）や電磁誘導透明化（EIT）があります。また、精密計測、フィードバック制御、量子状態推定の基盤となる量子非破壊（QND）測定や連続測定についても研究しています。我々のアプローチは、測定理論の基礎から量子制御のダイナミクス、実験実装、計算手法まで幅広く展開されています。"
    },
    exampleTopics: {
      EN: [
        "Precision quantum sensing with NV centers: magnetic field imaging, thermometry, strain sensing",
        "Coherent control and narrow-line spectroscopy using CPT and EIT",
        "Optimal and robust quantum control sequences and measurement protocols for enhanced sensitivity",
        "QND and continuous measurements with measurement-based feedback control",
        "Physics-informed ML models for sensor calibration and signal processing",
        "Bayesian inference and uncertainty quantification for quantum measurements",
        "Adaptive sensing strategies using real-time feedback and optimization",
        "Integration of quantum metrology with real-world applications and field deployment"
      ],
      JP: [
        "NVセンターを用いた精密量子センシング：磁場イメージング、温度測定、歪みセンシング",
        "CPTとEITを使用したコヒーレント制御と狭線スペクトロスコピー",
        "感度向上のための最適かつロバストな量子制御シーケンスと測定プロトコル",
        "測定ベースのフィードバック制御によるQNDおよび連続測定",
        "センサ校正と信号処理のための物理情報MLモデル",
        "量子測定のためのベイズ推論と不確実性定量化",
        "リアルタイムフィードバックと最適化を使用する適応センシング戦略",
        "量子計測と実世界アプリケーションおよびフィールド展開の統合"
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
      EN: "Diamond Quantum Electronics",
      JP: "ダイヤモンド量子エレクトロニクス"
    },
    overview: {
      EN: "We pursue a platform mission: establishing diamond as technological infrastructure for quantum devices that remain functional in realistic and extreme environments. By integrating dopants, defects, and quantum spins into engineered architectures, we connect materials → devices → measurement in a single stack.",
      JP: "プラットフォームとしての使命：現実的かつ極限的な環境下でも機能する量子デバイスの技術基盤としてダイヤモンドを確立することです。ドーパント、欠陥、量子スピンを工学的に設計されたアーキテクチャに統合することで、材料・デバイス・測定を単一のスタックで結びつけます。"
    },
    description: {
      EN: "This theme embodies \"robustness over ideality\" by design: diamond-based quantum electronics can be engineered for high temperature, high pressure, and harsh chemical conditions, expanding where quantum systems can operate and what they can measure.",
      JP: "本テーマは「理想性よりも堅牢性」を設計理念としています。ダイヤモンドベースの量子エレクトロニクスは、高温・高圧・過酷な化学環境に対応できるよう設計されており、量子システムの適用範囲と測定対象を拡大します。"
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
    number: 3,
    title: {
      EN: "Quantum Materials Sensing & Extreme-Condition Physics",
      JP: "量子材料センシングと極限条件物理学"
    },
    overview: {
      EN: "Many quantum states of matter are \"invisible\" to conventional probes. We use quantum sensors to make the invisible visible by spatially resolving magnetic fields, currents, and spin order, turning quantum measurement into a direct window on quantum materials.",
      JP: "多くの物質の量子状態は、従来の測定手法では「見えません」。量子センサを用いて磁場、電流、スピン秩序を空間的に解析することで、見えないものを可視化し、量子測定を量子材料への直接的な観測窓に変えます。"
    },
    description: {
      EN: "Our scope spans superconductors, magnetic materials, and defect physics under extreme conditions. By visualizing phase behavior and local structure (rather than only bulk averages), we aim to extract design principles for new materials and guidelines for quantum devices that must function in real environments.",
      JP: "研究範囲は、極限条件下での超伝導体、磁性材料、欠陥物理学にわたります。相挙動と局所構造を可視化することで（バルク平均だけでなく）、新材料の設計原理と、実環境で機能する量子デバイスの指針を導き出すことを目指しています。"
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
    number: 4,
    title: {
      EN: "Quantum Environmental & Infrastructure Sensing",
      JP: "量子環境・インフラセンシング"
    },
    overview: {
      EN: "This theme is where our Mission becomes explicit: translating quantum measurement into societal monitoring infrastructure. Many critical systems (oceans, underground environments, industrial components) fail silently until damage is advanced. Quantum sensors can detect early, subtle signatures that conventional tools miss.",
      JP: "本テーマでは、私たちのミッションが明確になります：量子測定を社会の監視インフラに応用することです。多くの重要システム（海洋、地下環境、産業部品）は、損傷が深刻化するまで静かに劣化します。量子センサは、従来の手法では見逃されていた初期の微細な兆候を検出できます。"
    },
    description: {
      EN: "We focus on deployable, interpretable measurement protocols that connect quantum signals to actionable diagnostics for environment and infrastructure health.",
      JP: "環境とインフラの健全性評価のため、量子信号を実用的な診断情報に変換する、展開可能で解釈しやすい測定プロトコルの開発に注力しています。"
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
    number: 5,
    title: {
      EN: "Quantum Probability & Social Informatics",
      JP: "量子確率と社会情報学"
    },
    overview: {
      EN: "To extend \"how we describe and understand the world\" beyond physical systems, we explore whether quantum probability provides a rigorous language for contextuality, order effects, and non-classical correlations in human judgment and social dynamics.",
      JP: "物理システムを超えて「世界を記述し理解する方法」を拡張するため、量子確率が人間の判断や社会動態における文脈依存性、順序効果、非古典的相関を厳密に記述する言語となり得るかを探求しています。"
    },
    description: {
      EN: "This theme contributes to intellectual infrastructure: a quantum-informatics-inspired framework for modeling decisions, organizations, and socio-economic systems, grounded in data and evaluated by predictive utility rather than analogy alone.",
      JP: "本テーマは知的インフラの構築に貢献します：意思決定、組織、社会経済システムをモデル化するための量子情報学に着想を得たフレームワークを、データに基づき、単なる類推ではなく予測的有用性によって評価します。"
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
