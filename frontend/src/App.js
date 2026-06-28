import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './App.css';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { fetchNews, fetchPublications, fetchTeam } from './api/content';
import { RequireAuth } from './pages/admin/RequireAuth';
import { usePerformanceSettings } from './hooks/usePerformanceSettings';

// Import UI Components - Sidebar and FloatingControls are essential, load immediately
import { Sidebar } from './components/ui/Sidebar';
import { FloatingControls } from './components/ui/FloatingControls';
import { Footer } from './components/ui/Footer';

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
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Lazy load Admin pages - only fetched when visiting /admin
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const perf = usePerformanceSettings();

  // Language is reflected in the URL (?lang=ja) so Japanese has a crawlable
  // URL and we can emit hreflang alternates for SEO.
  const language = searchParams.get('lang') === 'ja' ? 'JP' : 'EN';
  const setLanguage = (lang) => {
    const next = new URLSearchParams(searchParams);
    if (lang === 'JP') next.set('lang', 'ja');
    else next.delete('lang');
    setSearchParams(next, { replace: true });
  };

  // Live content from the API, seeded with the bundled static data so the site
  // always renders instantly and still works if the API is unavailable.
  const [content, setContent] = useState({
    news: newsData,
    publications: publicationsData,
    team: { principalInvestigator, staffAndPostdocs, students, alumni },
  });

  useEffect(() => {
    let active = true;
    Promise.allSettled([fetchNews(), fetchPublications(), fetchTeam()]).then(
      ([n, p, t]) => {
        if (!active) return;
        setContent((prev) => ({
          news:
            n.status === 'fulfilled' && Array.isArray(n.value) && n.value.length
              ? n.value
              : prev.news,
          publications:
            p.status === 'fulfilled' && Array.isArray(p.value) && p.value.length
              ? p.value
              : prev.publications,
          team:
            t.status === 'fulfilled' && t.value && t.value.principalInvestigator
              ? {
                  principalInvestigator: t.value.principalInvestigator,
                  staffAndPostdocs: t.value.staffAndPostdocs || [],
                  students: t.value.students || [],
                  alumni: t.value.alumni || [],
                }
              : prev.team,
        }));
      }
    );
    return () => {
      active = false;
    };
  }, []);

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

  // Admin area is a self-contained app (no public sidebar / SEO chrome).
  if (location.pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'text-white' : 'bg-gray-50 text-gray-900'
      }`}
      style={{
        background: isDark
          ? 'radial-gradient(1100px 520px at 82% -8%, rgba(234,88,12,0.07), transparent 60%), #0a0a0c'
          : '#f7f8fa'
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-orange-600 focus:px-4 focus:py-2 focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      {/* Single subtle, static diamond-lattice texture (no animation, no glow) */}
      {isDark && (
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.022]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      )}
      
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
      <main
        id="main-content"
        tabIndex={-1}
        className={`outline-none transition-all duration-150 ${
          sidebarOpen ? 'lg:ml-80' : 'ml-0'
        }`}
      >
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
                    <HomePage {...commonProps} newsData={content.news} />
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
                    <NewsPage {...commonProps} newsData={content.news} />
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
                    <PublicationsPage {...commonProps} publicationsData={content.publications} />
                  </>
                } />
                <Route path="/team" element={
                  <>
                    <SEO page="team" language={language} />
                    <TeamPage
                      {...commonProps}
                      principalInvestigator={content.team.principalInvestigator}
                      staffAndPostdocs={content.team.staffAndPostdocs}
                      students={content.team.students}
                      alumni={content.team.alumni}
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
                {/* 404 — distinct noindex page, not a soft-200 homepage */}
                <Route path="*" element={<NotFoundPage {...commonProps} />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      <div className={sidebarOpen ? 'lg:ml-80 transition-all duration-150' : 'ml-0'}>
        <Footer isDark={isDark} language={language} setCurrentPage={setCurrentPage} />
      </div>
    </div>
    </MotionConfig>
  );
}

export default App;
