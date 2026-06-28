import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';

// Clean, academic publication entry — title, authors, venue, link, optional
// abstract. No citation counts, impact badges, or nested boxes.
export const PublicationCard = ({ publication, language, isDark = true }) => {
  const [open, setOpen] = useState(false);

  const title = (publication.title && (publication.title[language] || publication.title.EN)) || '';
  const abstract = (publication.abstract && (publication.abstract[language] || publication.abstract.EN)) || '';
  const doiUrl =
    publication.link && publication.link !== '#'
      ? publication.link
      : publication.doi
      ? `https://doi.org/${publication.doi}`
      : '';

  const meta = [];
  if (publication.volume) {
    meta.push(`${publication.volume}${publication.issue ? `(${publication.issue})` : ''}${publication.pages ? `, ${publication.pages}` : ''}`);
  } else if (publication.pages) {
    meta.push(publication.pages);
  }
  if (publication.year) meta.push(String(publication.year));

  return (
    <article
      className={`rounded-xl border p-5 transition-colors sm:p-6 ${
        isDark ? 'bg-white/[0.02] border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      <h3 className={`text-base font-semibold leading-snug tracking-tight sm:text-[17px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h3>

      {publication.authors && (
        <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {publication.authors}
        </p>
      )}

      <p className="mt-1.5 text-sm">
        {publication.journal && <span className="font-medium italic text-orange-400">{publication.journal}</span>}
        {meta.length > 0 && (
          <span className="text-slate-500">
            {publication.journal ? ' · ' : ''}
            {meta.join(' · ')}
          </span>
        )}
      </p>

      <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2">
        {doiUrl && (
          <a
            href={doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 transition-colors hover:text-orange-300"
          >
            {language === 'EN' ? 'View paper' : '論文を見る'}
            <ExternalLink size={14} />
          </a>
        )}
        {abstract && (
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'EN' ? 'Abstract' : '要約'}
            <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && abstract && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className={`mt-4 border-t pt-4 text-sm leading-relaxed ${isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
              {abstract}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
