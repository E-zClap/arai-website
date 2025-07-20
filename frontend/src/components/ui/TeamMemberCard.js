import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// Enhanced Professional Team Member Card
export const TeamMemberCard = ({ name, position, education, image, index, language, setCurrentPage }) => {
  // Check if this is Keigo Arai's card
  const isKeigoArai = name.EN === "Keigo Arai, Ph.D." || name.JP === "荒井 慧悟 博士";
  
  const handleNameClick = () => {
    if (isKeigoArai && setCurrentPage) {
      setCurrentPage('profile-keigo-arai');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-slate-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-teal-500/20 hover:border-teal-400/40 transition-all duration-500 group shadow-2xl hover:shadow-teal-500/10"
    >
      {/* Professional Image Section */}
      <div className="relative h-80 bg-cover bg-center overflow-hidden">
        <img 
          src={image} 
          alt={`${name[language] || name} - ${position[language] || position}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
        
        {/* Professional Overlay Badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-teal-500/30">
            <div className="text-teal-400 text-xs font-medium tracking-wider">
              {position[language] || position}
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Content Section */}
      <div className="p-8 space-y-6">
        {/* Name and Title */}
        <div className="text-center space-y-3">
          {isKeigoArai && setCurrentPage ? (
            <button
              onClick={handleNameClick}
              className="group text-2xl font-bold text-teal-300 hover:text-teal-200 transition-all duration-300 cursor-pointer underline decoration-teal-400/50 hover:decoration-teal-300 underline-offset-4 transform hover:scale-105 flex items-center justify-center gap-2"
              style={{ fontFamily: '"Inter", system-ui' }}
            >
              {name[language] || name}
              <ExternalLink size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            </button>
          ) : (
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: '"Inter", system-ui' }}>
              {name[language] || name}
            </h3>
          )}
          
          {/* Removed redundant position display since section headers already indicate roles */}
        </div>
        
        {/* Academic Credentials */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-300 tracking-wider uppercase border-b border-slate-700 pb-2">
            {language === 'EN' ? 'Academic Background' : '学術的背景'}
          </h4>
          
          <div className="space-y-2">
            {(education[language] || education).map((edu, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-teal-500/30 transition-colors"
              >
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed" style={{ fontFamily: '"Inter", system-ui' }}>
                  {edu}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Contact Hint */}
        <div className="pt-4 text-center">
          <div className="inline-flex items-center px-3 py-2 bg-slate-800/30 rounded-full border border-slate-600/30">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
            <span className="text-slate-400 text-xs">
              {language === 'EN' ? 'Research Team Member' : '研究チームメンバー'}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};