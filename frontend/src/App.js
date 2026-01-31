import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

// Import UI Components - Sidebar and FloatingControls are essential, load immediately
import { Sidebar } from './components/ui/Sidebar';
import { FloatingControls } from './components/ui/FloatingControls';

// Lazy load heavy animation component for better initial load
const QuantumParticles = lazy(() => 
  import('./components/animations/QuantumParticles').then(module => ({ 
    default: module.QuantumParticles 
  }))
);

// Import SEO Component - Small, load immediately
import { SEO } from './components/seo/SEO';

// Lazy load Page Components for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then(m => ({ default: m.NewsPage })));
const ResearchPage = lazy(() => import('./pages/ResearchPage').then(m => ({ default: m.ResearchPage })));
const PublicationsPage = lazy(() => import('./pages/PublicationsPage').then(m => ({ default: m.PublicationsPage })));
const TeamPage = lazy(() => import('./pages/TeamPage').then(m => ({ default: m.TeamPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const JoinUsPage = lazy(() => import('./pages/JoinUsPage').then(m => ({ default: m.JoinUsPage })));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage').then(m => ({ default: m.AboutUsPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));

// Import Data - These are small, keep synchronous
import { newsData } from './data/newsData';
import { researchData } from './data/researchData';
import { publicationsData } from './data/publicationsData';
import { principalInvestigator, staffAndPostdocs, students, alumni } from './data/teamData';
import { keigoAraiProfile } from './data/profileData';

// Loading fallback component - minimal to reduce LCP
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-orange-500 text-xl">Loading...</div>
  </div>
);

// Route to page mapping for sidebar active state
const routeToPage = {
  '/': 'home',
  '/about-us': 'about-us',
  '/news': 'news',
  '/research': 'research',
  '/publications': 'publications',
  '/team': 'team',
  '/contact': 'contact',
  '/join-us': 'join-us',
  '/profile-keigo-arai': 'profile-keigo-arai'
};

// Page to route mapping for navigation
const pageToRoute = {
  'home': '/',
  'about-us': '/about-us',
  'news': '/news',
  'research': '/research',
  'publications': '/publications',
  'team': '/team',
  'contact': '/contact',
  'join-us': '/join-us',
  'profile-keigo-arai': '/profile-keigo-arai'
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('EN');

  // Get current page from URL
  const currentPage = routeToPage[location.pathname] || 'home';

  // Navigation function that uses React Router
  const setCurrentPage = (page) => {
    const route = pageToRoute[page] || '/';
    navigate(route);
  };

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
  }, [location.pathname]);

  // Common props for all pages
  const commonProps = { language, isDark, setCurrentPage };

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
      
      {/* Background Particles - Lazy loaded and reduced for better performance */}
      <Suspense fallback={null}>
        <QuantumParticles intensity={10} />
      </Suspense>
      
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

      {/* Main Content with URL-based Routing - Wrapped in Suspense for code splitting */}
      <main className={`transition-all duration-150 ${
        sidebarOpen ? 'lg:ml-80' : 'ml-0'
      }`}>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <Routes>
                <Route path="/" element={
                  <>
                    <SEO page="home" language={language} />
                    <HomePage {...commonProps} newsData={newsData} />
                  </>
                } />
                <Route path="/about-us" element={
                  <>
                    <SEO page="about-us" language={language} />
                    <AboutUsPage {...commonProps} />
                  </>
                } />
                <Route path="/news" element={
                  <>
                    <SEO page="news" language={language} />
                    <NewsPage {...commonProps} newsData={newsData} />
                  </>
                } />
                <Route path="/research" element={
                  <>
                    <SEO page="research" language={language} />
                    <ResearchPage {...commonProps} researchData={researchData} />
                  </>
                } />
                <Route path="/publications" element={
                  <>
                    <SEO page="publications" language={language} />
                    <PublicationsPage {...commonProps} publicationsData={publicationsData} />
                  </>
                } />
                <Route path="/team" element={
                  <>
                    <SEO page="team" language={language} />
                    <TeamPage 
                      {...commonProps}
                      principalInvestigator={principalInvestigator}
                      staffAndPostdocs={staffAndPostdocs}
                      students={students}
                      alumni={alumni}
                    />
                  </>
                } />
                <Route path="/contact" element={
                  <>
                    <SEO page="contact" language={language} />
                    <ContactPage {...commonProps} />
                  </>
                } />
                <Route path="/join-us" element={
                  <>
                    <SEO page="join-us" language={language} />
                    <JoinUsPage {...commonProps} />
                  </>
                } />
                <Route path="/profile-keigo-arai" element={
                  <>
                    <SEO page="profile-keigo-arai" language={language} />
                    <ProfilePage {...commonProps} profileData={keigoAraiProfile} />
                  </>
                } />
                {/* 404 fallback - redirect to home */}
                <Route path="*" element={
                  <>
                    <SEO page="home" language={language} />
                    <HomePage {...commonProps} newsData={newsData} />
                  </>
                } />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
