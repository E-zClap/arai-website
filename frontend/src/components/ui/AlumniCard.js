import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

// Simple Alumni Card Component - Name and Position Only
export const AlumniCard = ({ member, index, language }) => {
  // Ensure member data exists
  if (!member || !member.name) {
    return null;
  }

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="bg-white/[0.03] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-300 group"
      whileHover={{ y: -4 }}
    >
      <div className="space-y-4">
        {/* Name */}
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white text-center" style={{ fontFamily: '"Inter", system-ui' }}>
          {member.name && typeof member.name === 'object' ?
            (member.name[language] || member.name.EN) :
            (member.name || 'Alumni Member')
          }
        </h3>

        {/* Divider */}
        <div className="w-10 h-px bg-orange-500/40 mx-auto" />

        {/* Position */}
        <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
          <p className="text-slate-400 text-sm text-center leading-relaxed">
            {member.position && typeof member.position === 'object' ?
              (member.position[language] || member.position.EN) :
              (member.position || 'Former Member')
            }
          </p>
        </div>

        {/* Period */}
        {(member.joinDate || member.period) && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <Calendar size={14} className="text-orange-500" />
            <span className="text-slate-400 text-xs font-medium">
              {member.period ?
                (typeof member.period === 'object' ? member.period[language] || member.period.EN : member.period) :
                member.joinDate
              }
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
};
