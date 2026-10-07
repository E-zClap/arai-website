import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { QuantumField } from '../components/animations/QuantumField';
import { PublicationEntry, isPreprint } from '../components/ui/PublicationEntry';
import { PageHeader } from '../components/ui/PageHeader';

const matches = (p, term) =>
  [p.title && p.title.EN, p.title && p.title.JP, p.authors, p.journal, p.doi, p.year && String(p.year)].some((v) =>
    (v || '').toLowerCase().includes(term)
  );

// Group [{ p, n }] by year, newest year first; order within a year is the API's.
const byYear = (items) => {
  const groups = new Map();
  for (const item of [...items].sort((a, b) => (b.p.year || 0) - (a.p.year || 0))) {
    const year = item.p.year || '—';
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(item);
  }
  return Array.from(groups.entries());
};

// Number each list once, newest = highest, so numbers stay put while searching.
const numbered = (list) =>
  [...list].sort((a, b) => (b.year || 0) - (a.year || 0)).map((p, i, all) => ({ p, n: all.length - i }));

// Publications: published papers and preprints on separate tabs, each an
// academic list grouped by year.
export const PublicationsPage = ({ language, isDark, publicationsData = [] }) => {
  const en = language === 'EN';
  const [q, setQ] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') === 'preprints' ? 'preprints' : 'published';

  const setView = (next) => {
    const params = new URLSearchParams(searchParams);
    if (next === 'preprints') params.set('view', 'preprints');
    else params.delete('view');
    setSearchParams(params, { replace: true });
  };

  const lists = useMemo(
    () => ({
      published: numbered(publicationsData.filter((p) => !isPreprint(p))),
      preprints: numbered(publicationsData.filter(isPreprint)),
    }),
    [publicationsData]
  );

  const term = q.trim().toLowerCase();
  const visible = useMemo(
    () => ({
      published: term ? lists.published.filter(({ p }) => matches(p, term)) : lists.published,
      preprints: term ? lists.preprints.filter(({ p }) => matches(p, term)) : lists.preprints,
    }),
    [lists, term]
  );
  const groups = useMemo(() => byYear(visible[view]), [visible, view]);
  const equalContribution = visible[view].some(({ p }) => (p.authors || '').includes('*'));

  const tabs = [
    { id: 'published', label: en ? 'Published' : '査読付き論文' },
    { id: 'preprints', label: en ? 'Preprints' : 'プレプリント' },
  ];
  const other = tabs.find((t) => t.id !== view);
  const unit = (n) =>
    en ? `${n} ${view === 'preprints' ? 'preprint' : 'paper'}${n === 1 ? '' : 's'}` : `${n}件`;

  const panel = isDark
    ? 'border-white/10 bg-[#0c0c0f]/85 divide-white/[0.06]'
    : 'border-slate-200 bg-white divide-slate-100';

  return (
    <div className="relative min-h-screen overflow-hidden">
      <QuantumField density={0.9} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-28 sm:py-32">
        <PageHeader
          isDark={isDark}
          eyebrow={en ? 'Research output' : '研究成果'}
          title={en ? 'Publications' : '論文'}
          subtitle={
            en
              ? 'Journal papers and preprints in quantum sensing and quantum information science.'
              : '量子センシングと量子情報科学に関する論文とプレプリント。'
          }
        />

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label={en ? 'Publication type' : '論文の種類'}
            className={`inline-flex self-start rounded-xl border p-1 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-white'}`}
          >
            {tabs.map((t) => {
              const active = view === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setView(t.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? isDark
                        ? 'bg-white/[0.08] text-white'
                        : 'bg-slate-900 text-white'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                  <span className={`tabular-nums text-xs ${active ? 'text-orange-400' : 'text-slate-500'}`}>
                    {visible[t.id].length}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label={en ? 'Search publications' : '論文を検索'}
              placeholder={en ? 'Search title, author, journal…' : 'タイトル・著者・雑誌で検索…'}
              className={`w-full rounded-xl border py-2.5 pl-10 pr-9 text-sm transition-colors focus:border-orange-500/40 focus:outline-none ${
                isDark ? 'border-white/10 bg-white/[0.03] text-white placeholder-slate-500' : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400'
              }`}
            />
            {q && (
              <button
                onClick={() => setQ('')}
                aria-label={en ? 'Clear search' : '検索をクリア'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:text-slate-300"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {view === 'preprints' && (
          <p className="-mt-4 mb-10 max-w-2xl text-sm leading-relaxed text-slate-500">
            {en
              ? 'Preprints are shared before peer review. Once a paper is published it moves to Published, with a link to its arXiv version.'
              : 'プレプリントは査読前に公開された論文です。出版後は「査読付き論文」に移り、arXiv版へのリンクが付きます。'}
          </p>
        )}

        <motion.div
          key={view}
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-10"
        >
          {groups.map(([year, items]) => (
            <section key={year} className="md:grid md:grid-cols-[7rem_1fr] md:gap-8">
              <div className="mb-4 flex items-baseline gap-3 md:sticky md:top-24 md:mb-0 md:block md:self-start md:pt-5">
                <h2 className={`text-2xl font-semibold tracking-tight tabular-nums md:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {year}
                </h2>
                <p className="text-sm text-slate-500 md:mt-1">{unit(items.length)}</p>
              </div>
              <div className={`divide-y overflow-hidden rounded-2xl border ${panel}`}>
                {items.map(({ p, n }) => (
                  <PublicationEntry key={p.id ?? `${view}-${n}`} publication={p} number={n} language={language} isDark={isDark} />
                ))}
              </div>
            </section>
          ))}

          {groups.length === 0 && (
            <div className="py-16 text-center text-sm text-slate-500">
              <p>
                {term
                  ? en
                    ? `No ${view === 'preprints' ? 'preprints' : 'papers'} match “${q.trim()}”.`
                    : `「${q.trim()}」に一致する論文はありません。`
                  : en
                  ? 'Nothing here yet.'
                  : 'まだありません。'}
              </p>
              {term && visible[other.id].length > 0 && (
                <button onClick={() => setView(other.id)} className="mt-3 font-medium text-orange-400 hover:text-orange-300">
                  {en
                    ? `Show ${visible[other.id].length} in ${other.label} →`
                    : `${other.label}の${visible[other.id].length}件を表示 →`}
                </button>
              )}
            </div>
          )}

          {equalContribution && (
            <p className="text-xs text-slate-500 md:pl-[9rem]">{en ? '* Equal contribution' : '* 同等貢献'}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
