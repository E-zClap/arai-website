import React from 'react';
import { motion } from 'framer-motion';

// Enhanced Professional Contact Card Component
export const ContactCard = ({ icon: Icon, title, content, link, language }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-dark-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-orange-600/20 hover:border-orange-500/40 transition-all duration-500 text-center group shadow-xl hover:shadow-2xl hover:shadow-orange-500/10"
    >
      {/* Enhanced Icon Section */}
      <div className="relative mb-6">
        <div className="w-18 h-18 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300">
          <Icon size={28} className="text-white" />
        </div>
        {/* Professional Glow Effect */}
        <div className="absolute inset-0 w-18 h-18 mx-auto bg-gradient-to-r from-orange-600/30 to-orange-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
      </div>
      
      {/* Enhanced Title */}
      <h3 className="text-xl font-semibold text-white mb-4 tracking-wide" style={{ fontFamily: '"Inter", system-ui' }}>
        {title[language] || title}
      </h3>
      
      {/* Professional Content Display */}
      <div className="space-y-4">
        {link ? (
          <a 
            href={link}
            className="block p-4 bg-dark-gray-850/40 rounded-2xl border border-dark-gray-700/50 hover:border-orange-500/40 text-orange-300 hover:text-white transition-all duration-300 group-hover:bg-dark-gray-800/50"
          >
            <div className="text-sm font-medium mb-1 text-slate-400">
              {language === 'EN' ? 'Contact via' : '連絡先'}
            </div>
            <div className="font-medium break-all" style={{ fontFamily: '"Inter", system-ui' }}>
              {content}
            </div>
          </a>
        ) : (
          <div className="p-4 bg-dark-gray-850/40 rounded-2xl border border-dark-gray-700/50">
            <div className="text-sm font-medium mb-1 text-slate-400">
              {language === 'EN' ? 'Address' : '住所'}
            </div>
            <div className="text-slate-300 leading-relaxed" style={{ fontFamily: '"Inter", system-ui' }}>
              {content}
            </div>
          </div>
        )}
        
        {/* Professional Availability Indicator */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
          <span className="text-slate-400 text-xs font-medium">
            {language === 'EN' ? 'Available for Contact' : '連絡可能'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};