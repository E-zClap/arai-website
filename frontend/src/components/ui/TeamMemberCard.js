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
import { ProfilePlaceholder } from './ProfilePlaceholder';

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
      className="bg-white/[0.03] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-300 group"
      whileHover={{ y: -4 }}
    >
      {/* Premium Image Section */}
      <div className="relative h-80 bg-cover bg-center overflow-hidden">
        {member.image && !member.image.includes('unsplash.com') ? (
          <>
            <motion.img
              src={member.image}
              alt={`${(member.name && typeof member.name === 'object' ? member.name[language] || member.name.EN : member.name) || 'Team Member'} - ${(member.position && typeof member.position === 'object' ? member.position[language] || member.position.EN : member.position) || 'Position'}`}
              className="w-full h-full object-cover"
              width={384}
              height={320}
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6 }}
              onError={(e) => {
                // Hide image and show placeholder on error
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={{ display: 'none' }}>
              <ProfilePlaceholder name={member.name} position={member.position} size="large" />
            </div>
          </>
        ) : (
          <ProfilePlaceholder name={member.name} position={member.position} size="large" />
        )}
        {/* Professional Status Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-orange-500/10 backdrop-blur-md rounded-full px-3 py-1 border border-orange-500/30">
            <span className="text-orange-400 text-xs font-semibold tracking-wide">
              {member.position && typeof member.position === 'object' ?
                (member.position[language] || member.position.EN) :
                (member.position || 'Team Member')
              }
            </span>
          </div>
        </div>

      </div>

      {/* Enhanced Content Section */}
      <div className="p-6 space-y-6">
        {/* Name and Title */}
        <div className="text-center space-y-3">
          {isKeigoArai && setCurrentPage ? (
            <button
              onClick={handleNameClick}
              className="group/name text-lg sm:text-xl font-semibold tracking-tight text-white hover:text-orange-400 transition-colors duration-300 cursor-pointer inline-flex items-center justify-center gap-2"
              style={{ fontFamily: '"Inter", system-ui' }}
            >
              <span>
                {member.name && typeof member.name === 'object' ?
                  (member.name[language] || member.name.EN) :
                  (member.name || 'Team Member')
                }
              </span>
              <ExternalLink size={16} className="text-orange-500 opacity-70 group-hover/name:opacity-100 transition-opacity" />
            </button>
          ) : (
            <h3
              className="text-lg sm:text-xl font-semibold tracking-tight text-white"
              style={{ fontFamily: '"Inter", system-ui' }}
            >
              {member.name && typeof member.name === 'object' ?
                (member.name[language] || member.name.EN) :
                (member.name || 'Team Member')
              }
            </h3>
          )}
        </div>
        
        {/* Academic Background / Expertise / Responsibilities Preview */}
        {(member.education || member.expertise || member.responsibilities || member.researchActivities) && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <GraduationCap size={16} className="text-orange-500" />
              <h4 className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em]">
                {member.education
                  ? (language === 'EN' ? 'Academic Background' : '学術的背景')
                  : member.expertise
                  ? (language === 'EN' ? 'Expertise' : '専門知識')
                  : member.responsibilities
                  ? (language === 'EN' ? 'Responsibilities' : '責任')
                  : (language === 'EN' ? 'Research Activities' : '研究活動')
                }
              </h4>
            </div>

            {/* Show first 2 entries as preview */}
            <div className="space-y-3">
              {(() => {
                const dataSource = member.education || member.expertise || member.responsibilities || member.researchActivities;
                const items = typeof dataSource === 'object' && dataSource[language] ? dataSource[language] : dataSource;
                return items.slice(0, 2).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-slate-400 text-sm leading-relaxed" style={{ fontFamily: '"Inter", system-ui' }}>
                      {item}
                    </p>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Professional Status Indicator */}
        <div className="flex justify-center">
          <div className="inline-flex items-center px-3 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/30">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2.5" />
            <span className="text-orange-400 text-xs font-semibold tracking-wide">
              {language === 'EN' ? 'Active Researcher' : 'アクティブ研究者'}
            </span>
          </div>
        </div>

        {/* Expandable Details Section */}
        <div className="border-t border-white/10 pt-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(prev => !prev);
            }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-300 group/toggle"
          >
            <div className="flex items-center space-x-3">
              <div
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease-in-out'
                }}
              >
                <ChevronDown size={18} className="text-orange-500" />
              </div>
              <span className="text-white text-sm font-semibold">
                {language === 'EN' ? 'Full Profile' : '完全プロフィール'}
              </span>
            </div>
            <ChevronRight size={18} className="text-slate-500 group-hover/toggle:text-orange-500 transition-colors" />
          </button>

          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                key="expanded-content"
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={{ opacity: 1, maxHeight: 2000 }}
                exit={{ opacity: 0, maxHeight: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-6 space-y-6">
                {/* Complete Education / Expertise / Responsibilities */}
                {(() => {
                  const dataSource = member.education || member.expertise || member.responsibilities || member.researchActivities;
                  if (!dataSource) return null;
                  const items = typeof dataSource === 'object' && dataSource[language] ? dataSource[language] : dataSource;
                  if (items.length <= 2) return null;
                  
                  return (
                    <div
                      className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <GraduationCap size={18} className="text-orange-500" />
                        <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                          {member.education
                            ? (language === 'EN' ? 'Complete Education' : '完全な教育歴')
                            : member.expertise
                            ? (language === 'EN' ? 'Complete Expertise' : '完全な専門知識')
                            : member.responsibilities
                            ? (language === 'EN' ? 'All Responsibilities' : 'すべての責任')
                            : (language === 'EN' ? 'All Research Activities' : 'すべての研究活動')
                          }
                        </h4>
                      </div>
                      <div className="space-y-3">
                        {items.slice(2).map((item, idx) => (
                          <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-slate-400 text-sm leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Research Interests */}
                {member.researchInterests && (
                  <div
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Target size={18} className="text-orange-500" />
                      <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                        {language === 'EN' ? 'Research Interests' : '研究関心'}
                      </h4>
                    </div>
                    <div className="grid gap-2">
                      {(() => {
                        const interests = typeof member.researchInterests === 'object' && member.researchInterests[language]
                          ? member.researchInterests[language]
                          : member.researchInterests;
                        return interests.map((interest, idx) => (
                          <div key={idx} className="flex items-center space-x-2 p-2 rounded-lg bg-white/[0.02]">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            <span className="text-slate-400 text-sm">{interest}</span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {/* Research Focus */}
                {member.researchFocus && (
                  <div
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Target size={18} className="text-orange-500" />
                      <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                        {language === 'EN' ? 'Research Focus' : '研究焦点'}
                      </h4>
                    </div>
                    <div className="grid gap-2">
                      {(() => {
                        const focus = typeof member.researchFocus === 'object' && member.researchFocus[language]
                          ? member.researchFocus[language]
                          : member.researchFocus;
                        return focus.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2 p-2 rounded-lg bg-white/[0.02]">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            <span className="text-slate-400 text-sm">{item}</span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {member.achievements && (
                  <div
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Award size={18} className="text-orange-500" />
                      <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                        {language === 'EN' ? 'Achievements' : '業績'}
                      </h4>
                    </div>
                    <div className="grid gap-3">
                      {(() => {
                        const achievements = typeof member.achievements === 'object' && member.achievements[language]
                          ? member.achievements[language]
                          : member.achievements;
                        return achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                            <Award size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300 text-sm leading-relaxed">{achievement}</span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {member.skills && (
                  <div
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <User size={18} className="text-orange-500" />
                      <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                        {language === 'EN' ? 'Skills & Expertise' : 'スキル・専門性'}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        const skills = typeof member.skills === 'object' && member.skills[language]
                          ? member.skills[language]
                          : member.skills;
                        return skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full border border-orange-500/30">
                            {skill}
                          </span>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                {member.contact && (
                  <div
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Mail size={18} className="text-orange-500" />
                      <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                        {language === 'EN' ? 'Contact' : '連絡先'}
                      </h4>
                    </div>
                    <a
                      href={`mailto:${typeof member.contact === 'object' && member.contact[language] ? member.contact[language] : member.contact}`}
                      className="text-orange-500 hover:text-orange-400 transition-colors text-sm"
                    >
                      {typeof member.contact === 'object' && member.contact[language] ? member.contact[language] : member.contact}
                    </a>
                  </div>
                )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};