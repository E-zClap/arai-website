import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  ChevronDown, 
  ChevronRight, 
  User, 
  GraduationCap, 
  Target,
  Award,
  Calendar,
  Globe,
  BookOpen,
  Mail
} from 'lucide-react';

// Ultra-Professional Team Member Card with Expandable Profile
export const TeamMemberCard = ({ member, index, language, setCurrentPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Ensure member data exists
  if (!member || !member.name) {
    return null;
  }
  
  // Check if this is Keigo Arai's card
  const memberName = typeof member.name === 'string' ? member.name : (member.name.EN || member.name);
  const isKeigoArai = memberName === "Keigo Arai, Ph.D." || 
                     (member.name.JP && member.name.JP === "荒井 慧悟 博士");
  
  const handleNameClick = () => {
    if (isKeigoArai && setCurrentPage) {
      setCurrentPage('profile-keigo-arai');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl overflow-hidden border border-electric-blue-600/20 hover:border-electric-blue-500/50 transition-all duration-700 group shadow-2xl hover:shadow-electric-blue-500/20"
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Premium Image Section */}
      <div className="relative h-80 bg-cover bg-center overflow-hidden">
        <motion.img 
          src={member.image} 
          alt={`${(member.name && typeof member.name === 'object' ? member.name[language] || member.name.EN : member.name) || 'Team Member'} - ${(member.position && typeof member.position === 'object' ? member.position[language] || member.position.EN : member.position) || 'Position'}`}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8 }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        {/* Professional Status Badge */}
        <motion.div 
          className="absolute top-6 right-6"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-gradient-to-r from-electric-blue-600/90 to-royal-indigo-500/90 backdrop-blur-xl rounded-2xl px-4 py-2 border border-white/20 shadow-2xl">
            <span className="text-white text-xs font-bold tracking-wider">
              {member.position && typeof member.position === 'object' ? 
                (member.position[language] || member.position.EN) : 
                (member.position || 'Team Member')
              }
            </span>
          </div>
        </motion.div>

        {/* Join Date or Academic Status */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl px-4 py-3 border border-electric-blue-500/30">
            <div className="flex items-center justify-between">
              {member.joinDate && (
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-electric-blue-500" />
                  <span className="text-electric-blue-300 text-sm font-medium">
                    {language === 'EN' ? 'Since' : '着任'} {member.joinDate}
                  </span>
                </div>
              )}
              {(member.publications || member.yearsOfExperience) && (
                <div className="flex items-center space-x-2">
                  <BookOpen size={14} className="text-royal-indigo-400" />
                  <span className="text-royal-indigo-300 text-sm font-medium">
                    {member.publications ? 
                      `${member.publications} ${language === 'EN' ? 'Publications' : '論文'}` :
                      `${member.yearsOfExperience} ${language === 'EN' ? 'Years' : '年間'}`
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Content Section */}
      <div className="p-8 space-y-6">
        {/* Name and Title */}
        <div className="text-center space-y-3">
          {isKeigoArai && setCurrentPage ? (
            <motion.button
              onClick={handleNameClick}
              className="group text-2xl font-bold text-electric-blue-300 hover:text-electric-blue-200 transition-all duration-500 cursor-pointer flex items-center justify-center gap-3"
              style={{ fontFamily: '"Inter", system-ui' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="border-b-2 border-electric-blue-500/50 group-hover:border-electric-blue-300 pb-1">
                {member.name && typeof member.name === 'object' ? 
                  (member.name[language] || member.name.EN) : 
                  (member.name || 'Team Member')
                }
              </span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ExternalLink size={20} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </motion.button>
          ) : (
            <motion.h3 
              className="text-2xl font-bold text-white"
              style={{ fontFamily: '"Inter", system-ui' }}
              whileHover={{ scale: 1.02 }}
            >
              {member.name && typeof member.name === 'object' ? 
                (member.name[language] || member.name.EN) : 
                (member.name || 'Team Member')
              }
            </motion.h3>
          )}
        </div>
        
        {/* Academic Background Preview */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <GraduationCap size={18} className="text-electric-blue-500" />
            <h4 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
              {language === 'EN' ? 'Academic Background' : '学術的背景'}
            </h4>
          </div>
          
          {/* Show first 2 education entries as preview */}
          <div className="space-y-3">
            {(member.education[language] || member.education).slice(0, 2).map((edu, idx) => (
              <motion.div
                key={idx}
                className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/30 hover:border-electric-blue-500/40 transition-all duration-300"
                whileHover={{ scale: 1.01, backgroundColor: "rgba(30, 64, 175, 0.05)" }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-royal-indigo-400 to-electric-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed" style={{ fontFamily: '"Inter", system-ui' }}>
                  {edu}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Professional Status Indicator */}
        <div className="flex justify-center">
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800/60 to-slate-700/40 rounded-full border border-slate-600/40"
            animate={{
              boxShadow: [
                "0 0 20px rgba(20, 184, 166, 0.1)",
                "0 0 30px rgba(20, 184, 166, 0.2)",
                "0 0 20px rgba(20, 184, 166, 0.1)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div 
              className="w-2.5 h-2.5 bg-electric-blue-400 rounded-full mr-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-slate-300 text-sm font-medium">
              {language === 'EN' ? 'Active Researcher' : 'アクティブ研究者'}
            </span>
          </motion.div>
        </div>

        {/* Expandable Details Section */}
        <motion.div className="border-t border-slate-700/50 pt-6">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-slate-600/30 hover:border-teal-500/40 transition-all duration-300 group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className="text-teal-400" />
              </motion.div>
              <span className="text-white font-semibold">
                {language === 'EN' ? 'Full Profile' : '完全プロフィール'}
              </span>
            </div>
            <ChevronRight size={18} className="text-slate-400 group-hover:text-teal-400 transition-colors" />
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="mt-6 space-y-6 overflow-hidden"
              >
                {/* Complete Education */}
                {(member.education[language] || member.education).length > 2 && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <GraduationCap size={18} className="text-electric-blue-500" />
                      <h4 className="text-lg font-semibold text-white">
                        {language === 'EN' ? 'Complete Education' : '完全な教育歴'}
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {(member.education[language] || member.education).slice(2).map((edu, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/30">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-slate-300 text-sm leading-relaxed">{edu}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Research Interests */}
                {member.researchInterests && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Target size={18} className="text-cyan-400" />
                      <h4 className="text-lg font-semibold text-white">
                        {language === 'EN' ? 'Research Interests' : '研究関心'}
                      </h4>
                    </div>
                    <div className="grid gap-2">
                      {(member.researchInterests[language] || member.researchInterests).map((interest, idx) => (
                        <div key={idx} className="flex items-center space-x-2 p-2 rounded-lg bg-slate-700/30">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          <span className="text-slate-300 text-sm">{interest}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Research Focus */}
                {member.researchFocus && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Target size={18} className="text-yellow-400" />
                      <h4 className="text-lg font-semibold text-white">
                        {language === 'EN' ? 'Research Focus' : '研究焦点'}
                      </h4>
                    </div>
                    <div className="grid gap-2">
                      {(member.researchFocus[language] || member.researchFocus).map((focus, idx) => (
                        <div key={idx} className="flex items-center space-x-2 p-2 rounded-lg bg-slate-700/30">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                          <span className="text-slate-300 text-sm">{focus}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Achievements */}
                {member.achievements && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border border-teal-500/30"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Award size={18} className="text-teal-400" />
                      <h4 className="text-lg font-semibold text-white">
                        {language === 'EN' ? 'Achievements' : '業績'}
                      </h4>
                    </div>
                    <div className="grid gap-3">
                      {(member.achievements[language] || member.achievements).map((achievement, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-teal-900/20 border border-teal-500/20">
                          <Award size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-200 text-sm leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Skills */}
                {member.skills && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <User size={18} className="text-emerald-400" />
                      <h4 className="text-lg font-semibold text-white">
                        {language === 'EN' ? 'Skills & Expertise' : 'スキル・専門性'}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(member.skills[language] || member.skills).map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-emerald-900/30 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Contact Information */}
                {member.contact && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Mail size={18} className="text-cyan-400" />
                      <h4 className="text-lg font-semibold text-white">
                        {language === 'EN' ? 'Contact' : '連絡先'}
                      </h4>
                    </div>
                    <a 
                      href={`mailto:${member.contact[language] || member.contact}`}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                    >
                      {member.contact[language] || member.contact}
                    </a>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.article>
  );
};