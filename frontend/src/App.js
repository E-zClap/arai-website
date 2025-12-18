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
import { AboutUsPage } from './pages/AboutUsPage';
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
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'text-white' : 'bg-gray-50 text-gray-900'
      }`}
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #0a0a0a 0%, #0f1a2e 25%, #0d1117 50%, #1a1a1a 75%, #0a0a0a 100%)'
          : undefined
      }}
    >
      {/* Sophisticated Scientific Background Layers */}
      {isDark && (
        <>
          {/* Layer 1: Animated Gradient Mesh */}
          <div className="fixed inset-0 opacity-40 pointer-events-none">
            <div 
              className="absolute inset-0 animate-gradient-shift"
              style={{
                background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(234, 88, 12, 0.12) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 20s ease infinite'
              }}
            />
          </div>
          
          {/* Layer 2: Hexagonal Diamond Lattice Pattern */}
          <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>
          
          {/* Layer 3: Subtle Quantum Grid */}
          <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(rgba(234, 88, 12, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 88, 12, 0.3) 1px, transparent 1px)',
                backgroundSize: '100px 100px'
              }}
            />
          </div>
          
          {/* Layer 4: Radial Glow Effects */}
          <div className="fixed inset-0 opacity-20 pointer-events-none">
            <div 
              className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
                animation: 'pulse-glow 8s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(234, 88, 12, 0.3) 0%, transparent 70%)',
                animation: 'pulse-glow 10s ease-in-out infinite reverse'
              }}
            />
          </div>
        </>
      )}
      
      {/* Background Particles - Reduced for better performance */}
      <QuantumParticles intensity={15} />
      
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