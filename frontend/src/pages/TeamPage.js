import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { QuantumField } from '../components/animations/QuantumField';
import { TeamMemberCard } from '../components/ui/TeamMemberCard';
import { AlumniCard } from '../components/ui/AlumniCard';
import { PageHeader } from '../components/ui/PageHeader';

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
  <div className="relative min-h-screen overflow-hidden">
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(membersSchema)}</script>
    </Helmet>
    <QuantumField density={0.9} />

    <div className="max-w-6xl mx-auto px-6 py-28 sm:py-32 relative z-10">
      <PageHeader
        isDark={isDark}
        eyebrow={language === 'EN' ? 'People' : 'メンバー'}
        title={language === 'EN' ? 'Our Team' : '私たちのチーム'}
        subtitle={
          language === 'EN'
            ? 'The researchers and students advancing diamond quantum sensing and metrology.'
            : 'ダイヤモンド量子センシング・計測を進める研究者と学生たち。'
        }
      />

      {/* Principal Investigator Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-8 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {language === 'EN' ? 'Principal Investigator' : '主任研究員'}
        </h2>
        <div className="mb-12 max-w-md">
          <TeamMemberCard member={principalInvestigator} index={0} language={language} isDark={isDark} setCurrentPage={setCurrentPage} />
        </div>
      </motion.div>

      {/* Staff and Postdocs Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-8 ${
          isDark ? 'text-white' : 'text-slate-900'
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
        <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-8 ${
          isDark ? 'text-white' : 'text-slate-900'
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
          <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-8 ${
            isDark ? 'text-white' : 'text-slate-900'
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

    </div>
  </div>
  );
};