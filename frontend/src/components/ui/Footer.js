import React from 'react';

const NAV = [
  { id: 'about-us', label: { EN: 'About', JP: '概要' } },
  { id: 'research', label: { EN: 'Research', JP: '研究' } },
  { id: 'publications', label: { EN: 'Publications', JP: '論文' } },
  { id: 'team', label: { EN: 'Team', JP: 'メンバー' } },
  { id: 'news', label: { EN: 'News', JP: 'ニュース' } },
  { id: 'contact', label: { EN: 'Contact', JP: '連絡先' } },
  { id: 'join-us', label: { EN: 'Join us', JP: '参加' } },
];

export const Footer = ({ isDark = true, language = 'EN', setCurrentPage }) => {
  const year = new Date().getFullYear();
  return (
    <footer className={`relative z-10 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img
                src={isDark ? '/science-tokyo-white.png' : '/science-tokyo-navy.png'}
                alt=""
                width={22}
                height={22}
                className="w-[22px] h-[22px] object-contain"
              />
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {language === 'EN' ? 'Quantum Informatics Group' : '量子情報学グループ'}
              </span>
            </div>
            <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'EN'
                ? 'Diamond NV-center quantum sensing and metrology at the Institute of Science Tokyo.'
                : '東京科学大学におけるダイヤモンドNVセンター量子センシング・計測。'}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2.5" aria-label="Footer">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage && setCurrentPage(item.id)}
                className={`text-left text-sm transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label[language]}
              </button>
            ))}
          </nav>

          <div className="text-sm">
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              {language === 'EN' ? 'Institute of Science Tokyo' : '東京科学大学'}
            </p>
            <a
              href="mailto:arai.k.aa@m.titech.ac.jp"
              className="mt-2 inline-block text-orange-500 transition-colors hover:text-orange-400"
            >
              arai.k.aa@m.titech.ac.jp
            </a>
          </div>
        </div>

        <div
          className={`mt-10 border-t pt-6 text-xs ${
            isDark ? 'border-white/10 text-slate-500' : 'border-slate-200 text-slate-500'
          }`}
        >
          © {year} Quantum Informatics Group · Institute of Science Tokyo
        </div>
      </div>
    </footer>
  );
};

export default Footer;
