import React from 'react';
import { motion } from 'framer-motion';

// Enhanced Professional Research Card Component
export const ResearchCard = ({ title, description, image, index, language }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-slate-900/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-teal-500/20 hover:border-teal-400/40 transition-all duration-500 group shadow-2xl hover:shadow-teal-500/10"
    >
      {/* Enhanced Image Section with Scientific Overlay */}
      <div className="relative h-64 bg-cover bg-center overflow-hidden">
        <img 
          src={image} 
          alt={`${title[language] || title} - Research Area`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/20 to-transparent" />
        
        {/* Scientific Research Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-3 py-1 border border-teal-500/30">
            <span className="text-teal-400 text-xs font-medium tracking-wider">
              {language === 'EN' ? 'RESEARCH AREA' : '研究分野'}
            </span>
          </div>
        </div>

        {/* Research Category Indicator */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse" />
            <span className="text-teal-300 text-sm font-medium">
              {language === 'EN' ? 'Active Research' : 'アクティブ研究'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Content Section */}
      <div className="p-8 space-y-6">
        {/* Research Title */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300" style={{ fontFamily: '"Inter", system-ui' }}>
            {title[language] || title}
          </h3>
          
          {/* Professional Underline */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full group-hover:w-24 transition-all duration-500" />
        </div>
        
        {/* Research Description */}
        <p className="text-slate-300 leading-relaxed text-lg" style={{ fontFamily: '"Inter", system-ui' }}>
          {description[language] || description}
        </p>
        
        {/* Research Metrics/Indicators */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-slate-400 text-sm">
                {language === 'EN' ? 'Ongoing' : '進行中'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              <span className="text-slate-400 text-sm">
                {language === 'EN' ? 'Quantum Tech' : '量子技術'}
              </span>
            </div>
          </div>
          
          {/* Research Excellence Badge */}
          <div className="bg-gradient-to-r from-teal-600/20 to-cyan-600/20 rounded-full px-4 py-2 border border-teal-500/30">
            <span className="text-teal-300 text-xs font-medium">
              {language === 'EN' ? 'Core Focus' : 'コア・フォーカス'}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};