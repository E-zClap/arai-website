import React, { useState, useEffect } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

// Import UI Components
import { Sidebar } from './components/ui/Sidebar';
import { FloatingControls } from './components/ui/FloatingControls';
import { QuantumParticles } from './components/animations/QuantumParticles';

// Import Page Components
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';
import { ResearchPage } from './pages/ResearchPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { JoinUsPage } from './pages/JoinUsPage';
import { ProfilePage } from './pages/ProfilePage';

// Import Data
import { newsData } from './data/newsData';
import { researchData } from './data/researchData';
import { publicationsData } from './data/publicationsData';
import { principalInvestigator, staffAndPostdocs, students, alumni } from './data/teamData';
import { keigoAraiProfile } from './data/profileData';

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

  // Page rendering logic
  const renderPage = () => {
    const commonProps = { language, isDark, setCurrentPage };
    
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            {...commonProps}
            newsData={newsData}
          />
        );
      case 'news':
        return (
          <NewsPage 
            {...commonProps}
            newsData={newsData}
          />
        );
      case 'research':
        return (
          <ResearchPage 
            {...commonProps}
            researchData={researchData}
          />
        );
      case 'publications':
        return (
          <PublicationsPage 
            {...commonProps}
            publicationsData={publicationsData}
          />
        );
      case 'team':
        return (
          <TeamPage 
            {...commonProps}
            principalInvestigator={principalInvestigator}
            staffAndPostdocs={staffAndPostdocs}
            students={students}
            alumni={alumni}
          />
        );
      case 'contact':
        return <ContactPage {...commonProps} />;
      case 'join-us':
        return <JoinUsPage {...commonProps} />;
      case 'profile-keigo-arai':
        return (
          <ProfilePage 
            {...commonProps}
            profileData={keigoAraiProfile}
          />
        );
      default:
        return <HomePage {...commonProps} newsData={newsData} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Background Particles */}
      <QuantumParticles intensity={20} />
      
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        language={language}
        isDark={isDark}
      />

      {/* Floating Controls */}
      <FloatingControls 
        isDark={isDark}
        setIsDark={setIsDark}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-80' : 'ml-0'
      }`}>
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
      </main>
    </div>
  );
}

export default App;e={{ EN: "Email", JP: "メール" }}
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