import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { QuantumField } from '../components/animations/QuantumField';
import { TeamMemberCard } from '../components/ui/TeamMemberCard';
import { AlumniCard } from '../components/ui/AlumniCard';

const SITE_URL = 'https://qig-lab.net';

// Build a schema.org Person from a member record so each member is an
// indexable entity tied to the lab (helps name searches find the site).
const toPerson = (m) => ({
  '@type': 'Person',
  name: (m && m.name && m.name.EN) || (m && m.name) || '',
  ...(m && m.name && m.name.JP ? { alternateName: m.name.JP } : {}),
  ...(m && m.position ? { jobTitle: m.position.EN || m.position } : {}),
  ...(m && m.image
    ? { image: String(m.image).startsWith('http') ? m.image : SITE_URL + m.image }
    : {}),
  worksFor: { '@type': 'EducationalOrganization', name: 'Institute of Science Tokyo' },
  memberOf: { '@type': 'ResearchOrganization', name: 'Quantum Informatics Group', url: SITE_URL },
});

// Team Page Component
export const TeamPage = ({ language, isDark, principalInvestigator, staffAndPostdocs, students, alumni, setCurrentPage }) => {
  const members = [
    principalInvestigator,
    ...(staffAndPostdocs || []),
    ...(students || []),
    ...(alumni || []),
  ].filter(Boolean);
  const membersSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Quantum Informatics Group — Members',
    itemListElement: members.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: toPerson(m),
    })),
  };

  return (
  <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
    isDark ? 'bg-dark-gray-950' : 'bg-gray-50'
  }`}>
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(membersSchema)}</script>
    </Helmet>
    <div className={`absolute inset-0 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-orange-900/20'
        : 'bg-gradient-to-br from-slate-100/40 via-transparent to-orange-100/40'
    }`} />
    <QuantumField density={0.9} />
    
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className={`text-6xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Our Team' : '私たちのチーム'}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-orange-500 mx-auto mb-8" />
        <p className={`text-xl max-w-3xl mx-auto ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {language === 'EN' 
            ? "Meet the brilliant minds driving quantum transformation through cutting-edge research and innovation."
            : "最先端の研究と革新によって量子変革を推進する優秀な人材をご紹介します。"
          }
        </p>
      </motion.div>

      {/* Principal Investigator Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className={`text-3xl font-bold mb-8 text-center ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Principal Investigator' : '主任研究員'}
        </h2>
        <div className="flex justify-center mb-12">
          <div className="max-w-md">
            <TeamMemberCard member={principalInvestigator} index={0} language={language} isDark={isDark} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </motion.div>

      {/* Staff and Postdocs Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className={`text-3xl font-bold mb-8 text-center ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Staff & Postdoctoral Researchers' : 'スタッフ・博士研究員'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staffAndPostdocs.map((member, index) => (
            <TeamMemberCard key={member.id ?? index} member={member} index={index} language={language} isDark={isDark} setCurrentPage={setCurrentPage} />
          ))}
        </div>
      </motion.div>

      {/* Students Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className={`text-3xl font-bold mb-8 text-center ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Students' : '学生'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((member, index) => (
            <TeamMemberCard key={member.id ?? index} member={member} index={index} language={language} isDark={isDark} setCurrentPage={setCurrentPage} />
          ))}
        </div>
      </motion.div>

      {/* Alumni Section (if there are alumni) */}
      {alumni.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Alumni' : '卒業生'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alumni.map((member, index) => (
              <AlumniCard key={member.id ?? index} member={member} index={index} language={language} isDark={isDark} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Research Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className={`backdrop-blur-lg rounded-3xl p-12 border ${
          isDark 
            ? 'bg-dark-gray-950/40 border-orange-600/20'
            : 'bg-white/70 border-orange-300/30 shadow-xl'
        }`}
      >
        <h2 className={`text-3xl font-bold mb-6 text-center ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {language === 'EN' ? 'Research Excellence' : '研究実績'}
        </h2>
        <p className={`text-lg text-center mb-6 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {language === 'EN' 
            ? "Our team is dedicated to advancing quantum sensing technologies and their integration with informatics to drive quantum transformation across various applications."
            : "当チームは量子センシング技術とインフォマティクスの統合を推進し、様々な応用分野における量子変革に取り組んでいます。"
          }
        </p>
      </motion.div>
    </div>
  </div>
  );
};