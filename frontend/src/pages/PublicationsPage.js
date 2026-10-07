import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { QuantumField } from '../components/animations/QuantumField';
import { PublicationEntry, kindOf } from '../components/ui/PublicationEntry';
import { PageHeader } from '../components/ui/PageHeader';

const RESEARCHMAP = 'https://researchmap.jp/keigoarai';

// The list mirrors Prof. Arai's researchmap: published_papers -> Published,
// misc -> Preprints (and Other for the non-preprint items there).
const TABS = [
  { id: 'published', kind: 'published', EN: 'Published', JP: '査読付き論文', unit: ['paper', 'papers'] },
  { id: 'preprints', kind: 'preprint', EN: 'Preprints', JP: 'プレプリント', unit: ['preprint', 'preprints'] },
  { id: 'other', kind: 'other', EN: 'Other', JP: 'その他', unit: ['item', 'items'] },
];

const NOTES = {
  preprints: {
    EN: 'Preprints are shared before peer review. Once a paper is published it moves to Published, with a link to its arXiv version.',
    JP: 'プレプリントは査読前に公開された論文です。出版後は「査読付き論文」に移り、arXiv版へのリンクが付きます。',
  },
  other: {
    EN: 'Review articles, conference proceedings and other writing.',
    JP: '解説記事・学会予稿など。',
  },
};

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

// Publications: published papers, preprints and other writing on separate
// tabs, each an academic list grouped by year.
export const PublicationsPage = ({ language, isDark, publicationsData = [] }) => {
  const en = language === 'EN';
  const lang = en ? 'EN' : 'JP';
  const [q, setQ] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const lists = useMemo(
    () => Object.fromEntries(TABS.map((t) => [t.id, numbered(publicationsData.filter((p) => kindOf(p) === t.kind))])),
    [publicationsData]
  );
  const tabs = TABS.filter((t) => t.id !== 'other' || lists.other.length > 0);
  const requested = searchParams.get('view');
  const view = tabs.some((t) => t.id === requested) ? requested : 'published';
  const current = tabs.find((t) => t.id === view);

  const setView = (next) => {
    const params = new URLSearchParams(searchParams);
    if (next === 'published') params.delete('view');
    else params.set('view', next);
    setSearchParams(params, { replace: true });
  };

  const term = q.trim().toLowerCase();
  const visible = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(lists).map(([id, list]) => [id, term ? list.filter(({ p }) => matches(p, term)) : list])
      ),
    [lists, term]
  );
  const groups = useMemo(() => byYear(visible[view]), [visible, view]);
  const elsewhere = tabs.find((t) => t.id !== view && visible[t.id].length > 0);
  const equalContribution = visible[view].some(({ p }) => (p.authors || '').includes('*'));
  const unit = (n) => (en ? `${n} ${current.unit[n === 1 ? 0 : 1]}` : `${n}件`);

  const panel = isDark
    ? 'border-white/10 bg-[#0c0c0f]/85 divide-white/[0.06]'
    : 'border-slate-200 bg-white divide-slate-100';
  const sourceLink = 'inline-flex items-center gap-0.5 text-orange-400 transition-colors hover:text-orange-300';

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
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors sm:px-4 ${
                    active
                      ? isDark
                        ? 'bg-white/[0.08] text-white'
                        : 'bg-slate-900 text-white'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t[lang]}
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

        {NOTES[view] && <p className="-mt-4 mb-10 max-w-2xl text-sm leading-relaxed text-slate-500">{NOTES[view][lang]}</p>}

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
                    ? `No ${current.unit[1]} match “${q.trim()}”.`
                    : `「${q.trim()}」に一致する論文はありません。`
                  : en
                  ? 'Nothing here yet.'
                  : 'まだありません。'}
              </p>
              {term && elsewhere && (
                <button onClick={() => setView(elsewhere.id)} className="mt-3 font-medium text-orange-400 hover:text-orange-300">
                  {en
                    ? `Show ${visible[elsewhere.id].length} in ${elsewhere.EN} →`
                    : `${elsewhere.JP}の${visible[elsewhere.id].length}件を表示 →`}
                </button>
              )}
            </div>
          )}

          <div className="space-y-2 text-xs text-slate-500 md:pl-[9rem]">
            {equalContribution && <p>{en ? '* Equal contribution' : '* 同等貢献'}</p>}
            <p>
              {en ? 'Source: researchmap — ' : '出典: researchmap — '}
              <a href={`${RESEARCHMAP}/published_papers`} target="_blank" rel="noopener noreferrer" className={sourceLink}>
                {en ? 'published papers' : '論文'}
                <ArrowUpRight size={12} />
              </a>
              {' · '}
              <a href={`${RESEARCHMAP}/misc`} target="_blank" rel="noopener noreferrer" className={sourceLink}>
                {en ? 'misc & preprints' : 'MISC・プレプリント'}
                <ArrowUpRight size={12} />
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
