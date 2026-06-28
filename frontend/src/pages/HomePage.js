import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { MissionSection } from '../components/sections/MissionSection';
import { RecentNewsSection } from '../components/sections/RecentNewsSection';

// Home Page Component - Optimized with React.memo
export const HomePage = React.memo(({ language, isDark, newsData, setCurrentPage }) => (
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
));