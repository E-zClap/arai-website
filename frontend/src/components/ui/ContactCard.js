import React from 'react';
import { motion } from 'framer-motion';

// Enhanced Professional Contact Card Component
export const ContactCard = ({ icon: Icon, title, content, link, language }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors text-center group"
    >
      {/* Icon Section */}
      <div className="mb-6">
        <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-center justify-center mx-auto">
          <Icon size={26} className="text-orange-500" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white mb-4" style={{ fontFamily: '"Inter", system-ui' }}>
        {title[language] || title}
      </h3>

      {/* Content Display */}
      <div className="space-y-4">
        {link ? (
          <a
            href={link}
            className="block p-4 bg-white/[0.02] rounded-xl border border-white/10 hover:border-orange-500/30 transition-colors"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.22em] mb-2 text-slate-500">
              {language === 'EN' ? 'Contact via' : '連絡先'}
            </div>
            <div className="font-medium break-all text-orange-500 group-hover:text-orange-400 transition-colors" style={{ fontFamily: '"Inter", system-ui' }}>
              {content}
            </div>
          </a>
        ) : (
          <div className="p-4 bg-white/[0.02] rounded-xl border border-white/10">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] mb-2 text-slate-500">
              {language === 'EN' ? 'Address' : '住所'}
            </div>
            <div className="text-slate-400 leading-relaxed" style={{ fontFamily: '"Inter", system-ui' }}>
              {content}
            </div>
          </div>
        )}

        {/* Availability Indicator */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
          <span className="text-slate-500 text-xs font-medium">
            {language === 'EN' ? 'Available for Contact' : '連絡可能'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
