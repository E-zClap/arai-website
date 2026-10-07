import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const PREPRINT_VENUE = /arxiv|biorxiv|medrxiv|chemrxiv|techrxiv|research square|ssrn/i;
const ARXIV_ID = /arxiv[./:](?:org\/abs\/)?(\d{4}\.\d{4,5})/i;
// Prof. Arai as he appears in author lists: "K. Arai", "K. Arai*", "Keigo Arai".
const PI_NAME = /((?:K\.\s?|Keigo\s)Arai\*?)/;

// The API flags preprints; the bundled fallback data does not, so infer it.
export const isPreprint = (p) =>
  p.preprint ??
  (/preprint/i.test(p.type || '') || /^10\.48550\/arxiv/i.test(p.doi || '') || PREPRINT_VENUE.test(p.journal || ''));

const arxivId = (...values) => {
  for (const v of values) {
    const m = ARXIV_ID.exec(v || '');
    if (m) return m[1];
  }
  return '';
};

const Authors = ({ authors, isDark }) =>
  authors.split(PI_NAME).map((part, i) =>
    i % 2 ? (
      <span key={i} className={`font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        {part}
      </span>
    ) : (
      part
    )
  );

const Pill = ({ href, children, isDark }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
      isDark
        ? 'border-white/10 text-slate-300 hover:border-orange-400/40 hover:bg-orange-500/[0.06] hover:text-orange-300'
        : 'border-slate-200 text-slate-600 hover:border-orange-400/60 hover:text-orange-600'
    }`}
  >
    {children}
    <ArrowUpRight size={13} />
  </a>
);

// One entry of the academic publication list: number, linked title, authors
// (Prof. Arai highlighted), venue in physics citation style, and links.
export const PublicationEntry = ({ publication: p, number, language, isDark = true }) => {
  const [open, setOpen] = useState(false);
  const en = language === 'EN';

  const title = (p.title && (p.title[language] || p.title.EN)) || '';
  const abstract = (p.abstract && (p.abstract[language] || p.abstract.EN)) || '';
  const preprint = isPreprint(p);
  const ownArxiv = preprint ? arxivId(p.doi, p.link) : '';
  const linkedArxiv = arxivId(p.preprint_link);
  const paperUrl = ownArxiv
    ? `https://arxiv.org/abs/${ownArxiv}`
    : p.link && p.link !== '#'
    ? p.link
    : p.doi
    ? `https://doi.org/${p.doi}`
    : '';

  const muted = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <article
      className={`grid grid-cols-[1.75rem_1fr] gap-x-3 px-5 py-6 transition-colors sm:grid-cols-[2.5rem_1fr] sm:gap-x-4 sm:px-7 ${
        isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'
      }`}
    >
      <span className={`pt-0.5 text-right text-sm tabular-nums ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
        {number}
      </span>

      <div className="min-w-0">
        <h3 className={`text-[15px] font-semibold leading-snug tracking-tight sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {paperUrl ? (
            <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange-400">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>

        {p.authors && (
          <p className={`mt-2 text-sm leading-relaxed ${muted}`}>
            <Authors authors={p.authors} isDark={isDark} />
          </p>
        )}

        <p className={`mt-1.5 text-sm ${muted}`}>
          {ownArxiv ? (
            <span className={isDark ? 'text-orange-300/90' : 'text-orange-700'}>arXiv:{ownArxiv}</span>
          ) : (
            <>
              {p.journal && <span className={`italic ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>{p.journal}</span>}
              {p.volume && <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}> {p.volume}</span>}
              {p.pages && <span>, {p.pages.replace('-', '–')}</span>}
            </>
          )}
          {p.year && <span> ({p.year})</span>}
        </p>

        {(paperUrl || linkedArxiv || abstract) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {paperUrl && (
              <Pill href={paperUrl} isDark={isDark}>
                {ownArxiv ? 'arXiv' : en ? 'Journal' : '論文'}
              </Pill>
            )}
            {ownArxiv && (
              <Pill href={`https://arxiv.org/pdf/${ownArxiv}`} isDark={isDark}>
                PDF
              </Pill>
            )}
            {linkedArxiv && (
              <Pill href={`https://arxiv.org/abs/${linkedArxiv}`} isDark={isDark}>
                arXiv
              </Pill>
            )}
            {abstract && (
              <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {en ? 'Abstract' : '要旨'}
                <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        )}

        <AnimatePresence initial={false}>
          {open && abstract && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p
                className={`mt-4 border-l-2 pl-4 text-sm leading-relaxed ${
                  isDark ? 'border-orange-500/30 text-slate-400' : 'border-orange-400/40 text-slate-600'
                }`}
              >
                {abstract}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};
