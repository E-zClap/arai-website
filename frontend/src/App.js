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
      isDark ? 'bg-deep-navy-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Background Particles */}
      <QuantumParticles intensity={50} />
      
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
      <main className={`transition-all duration-150 ${
        sidebarOpen ? 'lg:ml-80' : 'ml-0'
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;