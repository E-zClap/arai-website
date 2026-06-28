import React from 'react';
import { SEO } from '../components/seo/SEO';

// Distinct, noindex 404 page (not a soft-200 homepage).
export const NotFoundPage = ({ language = 'EN', isDark = true, setCurrentPage }) => (
  <div
    className={`min-h-screen flex items-center justify-center px-6 ${
      isDark ? '' : 'bg-gray-50'
    }`}
  >
    <SEO page="home" language={language} noindex customTitle="Page not found | Quantum Informatics Group" />
    <div className="text-center max-w-lg">
      <p className="text-7xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
        404
      </p>
      <h1 className={`mt-4 text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {language === 'EN' ? 'Page not found' : 'ページが見つかりません'}
      </h1>
      <p className={`mt-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {language === 'EN'
          ? 'The page you are looking for may have moved or no longer exists.'
          : 'お探しのページは移動したか、存在しない可能性があります。'}
      </p>
      <button
        onClick={() => setCurrentPage && setCurrentPage('home')}
        className="mt-8 inline-flex items-center rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105"
      >
        {language === 'EN' ? 'Back to home' : 'ホームに戻る'}
      </button>
    </div>
  </div>
);

export default NotFoundPage;
