import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Sidebar, 
  HeroSection, 
  MissionSection, 
  NewsCard, 
  ResearchCard, 
  TeamMemberCard, 
  ContactCard,
  QuantumParticles 
} from './components';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, FlaskConical, BookOpen, ExternalLink, Github } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data based on the original website
  const newsData = [
    {
      date: "2024-12-23",
      title: "Our paper on \"Coherent control of solid-state defect spins via patterned boron-doped diamond circuit\" has been published in arXiv.",
      link: "https://arxiv.org/abs/2412.17123"
    },
    {
      date: "2024-10-01", 
      title: "A warm welcome to Jiabao Wu, a YSEP student.",
      link: "#"
    },
    {
      date: "2024-09-02",
      title: "Our paper on \"Fast coherent control of nitrogen-14 spins associated with nitrogen-vacancy centers in diamonds using dynamical decoupling\" has been published in Journal of Physics Communications.",
      link: "https://iopscience.iop.org/article/10.1088/2399-6528/ad6ea6"
    },
    {
      date: "2024-09-02",
      title: "Keigo Arai has been interviewed as an adopter of Tokyo Tech Gap Fund 2023.",
      link: "#"
    },
    {
      date: "2024-06-14",
      title: "荒井慧悟先生座談会が行われました ★蔵前工業会★",
      link: "#"
    },
    {
      date: "2024-04-05",
      title: "メンバーが増えました",
      link: "#"
    },
    {
      date: "2023-06-02",
      title: "We had a tennis tournament. Yasuko won!",
      link: "#"
    }
  ];

  const researchData = [
    {
      title: "Quantum Sensing with Diamond NV Centers",
      description: "We develop novel quantum sensing techniques using nitrogen-vacancy centers in diamond for high-precision magnetic field detection and quantum information processing.",
      image: "https://images.unsplash.com/photo-1621435410670-0839654680da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxxdWFudHVtJTIwcGh5c2ljc3xlbnwwfHx8cHVycGxlfDE3NTI5MzU1NTV8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Quantum Informatics & Control",
      description: "Integration of quantum sensing with advanced information processing techniques to create next-generation quantum technologies and control systems.",
      image: "https://images.unsplash.com/photo-1584268211932-3f86894cbfee?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxxdWFudHVtJTIwcGh5c2ljc3xlbnwwfHx8cHVycGxlfDE3NTI5MzU1NTV8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Advanced Laboratory Techniques",
      description: "State-of-the-art experimental setups and measurement techniques for quantum systems research and development.",
      image: "https://images.unsplash.com/photo-1562411053-1d8bdfe771c1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MHx8fHB1cnBsZXwxNzUyOTM0OTk0fDA&ixlib=rb-4.1.0&q=85"
    }
  ];

  const publicationsData = [
    {
      title: "Coherent control of solid-state defect spins via patterned boron-doped diamond circuit",
      journal: "arXiv preprint",
      year: "2024",
      authors: "K. Arai et al.",
      link: "https://arxiv.org/abs/2412.17123"
    },
    {
      title: "Fast coherent control of nitrogen-14 spins associated with nitrogen-vacancy centers in diamonds using dynamical decoupling",
      journal: "Journal of Physics Communications",
      year: "2024",
      authors: "K. Arai et al.",
      link: "https://iopscience.iop.org/article/10.1088/2399-6528/ad6ea6"
    },
    {
      title: "Quantum sensing applications in materials science",
      journal: "Nature Physics",
      year: "2023",
      authors: "K. Arai et al.",
      link: "#"
    },
    {
      title: "Advanced quantum control techniques for NV centers",
      journal: "Physical Review Applied", 
      year: "2023",
      authors: "K. Arai et al.",
      link: "#"
    }
  ];

  const teamData = [
    {
      name: "Prof. Keigo Arai",
      position: "Associate Professor & Principal Investigator",
      education: [
        "Ph.D. in Physics, MIT (2016)",
        "B.A. in Physics, University of Tokyo (2008)"
      ],
      image: "https://images.unsplash.com/photo-1537992303656-1d044b3e0bf0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxsYWJvcmF0b3J5JTIwcmVzZWFyY2h8ZW58MHx8fHB1cnBsZXwxNzUyOTM0OTk0fDA&ixlib=rb-4.1.0&q=85"
    }
  ];

  // Page Components
  const HomePage = () => (
    <div>
      <HeroSection />
      <MissionSection />
    </div>
  );

  const NewsPage = () => (
    <div className="min-h-screen py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6">Latest News</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto" />
        </motion.div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {newsData.map((news, index) => (
            <NewsCard key={index} news={news} index={index} />
          ))}
        </div>
      </div>
    </div>
  );

  const ResearchPage = () => (
    <div className="min-h-screen py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6">Research Areas</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our research focuses on quantum sensing technologies and their integration with informatics 
            to drive quantum transformation in various applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchData.map((research, index) => (
            <ResearchCard key={index} {...research} index={index} />
          ))}
        </div>
      </div>
    </div>
  );

  const PublicationsPage = () => (
    <div className="min-h-screen py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6">Publications</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto" />
        </motion.div>

        <div className="grid gap-6 max-w-5xl mx-auto">
          {publicationsData.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">{pub.title}</h3>
                  <p className="text-purple-300 mb-2">{pub.authors}</p>
                  <p className="text-gray-400 text-sm mb-4">{pub.journal} ({pub.year})</p>
                </div>
                <a 
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors ml-4"
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
    <div className="min-h-screen py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6">Our Team</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the brilliant minds driving quantum transformation through cutting-edge research and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <TeamMemberCard key={index} {...member} index={index} />
          ))}
        </div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Experience</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { period: "April 2022 – Present", position: "Associate Professor", institution: "Tokyo Institute of Technology" },
              { period: "February 2020 – March 2022", position: "Assistant Professor", institution: "Tokyo Institute of Technology" },
              { period: "January 2017 – January 2020", position: "Consulting Staff", institution: "Boston Consulting Group, Tokyo" },
              { period: "April 2016 – December 2016", position: "Postdoctoral Fellow", institution: "Harvard-Smithsonian Center for Astrophysics" }
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8 p-6 bg-white/5 rounded-xl"
              >
                <div className="text-purple-300 font-medium md:w-64 flex-shrink-0">{exp.period}</div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{exp.position}</div>
                  <div className="text-gray-400">{exp.institution}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <QuantumParticles intensity={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6">Contact & Openings</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our research team and contribute to the quantum transformation. We welcome passionate researchers 
            and students interested in quantum sensing and informatics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <ContactCard 
            icon={Mail}
            title="Email"
            content="arai.k.ar@m.titech.ac.jp"
            link="mailto:arai.k.ar@m.titech.ac.jp"
          />
          <ContactCard 
            icon={Phone}
            title="Phone"
            content="+81(3) 5734-3696"
            link="tel:+81357343696"
          />
          <ContactCard 
            icon={MapPin}
            title="Address"
            content="#1107 G2-7, 4259 Nagatsuta-cho, Midori-ku, Yokohama, Kanagawa 226-8501, Japan"
          />
        </div>

        {/* Openings Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Research Openings</h2>
          <p className="text-gray-300 text-lg text-center mb-8 max-w-3xl mx-auto">
            当研究室では、メンバーを随時募集しています。量子センシングと情報科学の融合研究に興味のある方は、
            ぜひお気軽にお問い合わせください。
          </p>
          
          <div className="text-center">
            <motion.a
              href="mailto:arai.k.ar@m.titech.ac.jp"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="mr-2" size={20} />
              Get in Touch
            </motion.a>
          </div>
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
      default: return <HomePage />;
    }
  };

  return (
    <div className="App bg-black min-h-screen text-white overflow-x-hidden">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
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