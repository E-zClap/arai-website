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
      className="bg-dark-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-orange-600/10 hover:border-orange-500/30 transition-all duration-500 group shadow-lg hover:shadow-orange-500/10"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="space-y-4">
        {/* Name */}
        <h3 className="text-xl font-bold text-white text-center" style={{ fontFamily: '"Inter", system-ui' }}>
          {member.name && typeof member.name === 'object' ? 
            (member.name[language] || member.name.EN) : 
            (member.name || 'Alumni Member')
          }
        </h3>
        
        {/* Divider */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
        
        {/* Position */}
        <div className="bg-dark-gray-850/50 rounded-xl p-4 border border-dark-gray-700/30">
          <p className="text-slate-300 text-sm text-center leading-relaxed">
            {member.position && typeof member.position === 'object' ? 
              (member.position[language] || member.position.EN) : 
              (member.position || 'Former Member')
            }
          </p>
        </div>
        
        {/* Period */}
        {(member.joinDate || member.period) && (
          <div className="flex items-center justify-center space-x-2 pt-2">
            <Calendar size={14} className="text-orange-400" />
            <span className="text-orange-300 text-xs font-medium">
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
