import React from 'react';
import { motion } from 'framer-motion';

// Editorial page header: small orange eyebrow, refined left-aligned title,
// muted subtitle. Used across all pages for a consistent, professional feel.
export const PageHeader = ({ isDark = true, eyebrow, title, subtitle, align = 'left' }) => (
  <motion.header
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`max-w-3xl mb-14 ${align === 'center' ? 'mx-auto text-center' : ''}`}
  >
    {eyebrow && (
      <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em] mb-4">
        {eyebrow}
      </p>
    )}
    <h1
      className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}
    >
      {title}
    </h1>
    {subtitle && (
      <p className={`mt-5 text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {subtitle}
      </p>
    )}
  </motion.header>
);

export default PageHeader;
