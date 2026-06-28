import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { QuantumField } from '../components/animations/QuantumField';
import { PublicationCard } from '../components/ui/PublicationCard';
import { PageHeader } from '../components/ui/PageHeader';

// Publications as a clean academic list, grouped by year (newest first).
export const PublicationsPage = ({ language, isDark, publicationsData = [] }) => {
  const [q, setQ] = useState('');

  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = publicationsData;
    if (term) {
      list = list.filter((p) =>
        ((p.title && p.title.EN) || '').toLowerCase().includes(term) ||
        ((p.title && p.title.JP) || '').toLowerCase().includes(term) ||
        (p.authors || '').toLowerCase().includes(term) ||
        (p.journal || '').toLowerCase().includes(term)
      );
    }
    const sorted = [...list].sort((a, b) => (b.year || 0) - (a.year || 0));
    const byYear = new Map();
    for (const p of sorted) {
      const year = p.year || (language === 'EN' ? 'Other' : 'その他');
      if (!byYear.has(year)) byYear.set(year, []);
      byYear.get(year).push(p);
    }
    return Array.from(byYear.entries());
  }, [publicationsData, q, language]);

  const inputCls = isDark
    ? 'bg-white/5 border-white/10 text-white placeholder-slate-500'
    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400';

  return (
    <div className="relative min-h-screen overflow-hidden">
      <QuantumField density={0.9} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 sm:py-32">
        <PageHeader
          isDark={isDark}
          eyebrow={language === 'EN' ? 'Research output' : '研究成果'}
          title={language === 'EN' ? 'Publications' : '論文'}
          subtitle={
            language === 'EN'
              ? 'Peer-reviewed papers and preprints in quantum sensing and quantum information science.'
              : '量子センシングと量子情報科学における査読付き論文とプレプリント。'
          }
        />

        <div className="relative mb-14 max-w-md">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label={language === 'EN' ? 'Search publications' : '論文を検索'}
            placeholder={language === 'EN' ? 'Search publications…' : '論文を検索…'}
            className={`w-full rounded-xl border py-3 pl-11 pr-4 text-sm transition-colors focus:border-orange-500/40 focus:outline-none ${inputCls}`}
          />
        </div>

        <div className="space-y-14">
          {groups.map(([year, papers]) => (
            <section key={year}>
              <div className="mb-6 flex items-baseline gap-4">
                <h2 className={`text-2xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{year}</h2>
                <span className="text-sm text-slate-500">
                  {papers.length} {language === 'EN' ? (papers.length === 1 ? 'paper' : 'papers') : '件'}
                </span>
                <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
              </div>
              <div className="space-y-3">
                {papers.map((p, i) => (
                  <PublicationCard key={p.id ?? `${year}-${i}`} publication={p} language={language} isDark={isDark} />
                ))}
              </div>
            </section>
          ))}

          {groups.length === 0 && (
            <p className={`py-16 text-center text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              {language === 'EN' ? 'No publications match your search.' : '検索に一致する論文がありません。'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
