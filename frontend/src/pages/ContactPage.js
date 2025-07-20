import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { QuantumParticles } from '../components/animations/QuantumParticles';
import { ContactCard } from '../components/ui/ContactCard';

// Contact Page Component
export const ContactPage = ({ language, isDark, setCurrentPage }) => {
  const contactData = [
    {
      icon: Mail,
      title: {
        EN: "Email",
        JP: "メール"
      },
      content: "arai@ee.e.titech.ac.jp",
      link: "mailto:arai@ee.e.titech.ac.jp"
    },
    {
      icon: Phone,
      title: {
        EN: "Phone",
        JP: "電話"
      },
      content: "+81-3-5734-3434",
      link: "tel:+81-3-5734-3434"
    },
    {
      icon: MapPin,
      title: {
        EN: "Address",
        JP: "住所"
      },
      content: language === 'EN' 
        ? "2-12-1 Ookayama, Meguro-ku, Tokyo 152-8552, Japan"
        : "〒152-8552 東京都目黒区大岡山2-12-1",
      link: null
    }
  ];

  return (
    <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-teal-100/40'
      }`} />
      <QuantumParticles intensity={30} />
      
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
            {language === 'EN' ? 'Contact' : 'お問い合わせ'}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-8" />
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "Get in touch with the Arai Group. For joining opportunities, please visit our Join Us page."
              : "荒井研究室へのお問い合わせ。参加の機会については、Join Usページをご覧ください。"
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactData.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ContactCard {...contact} language={language} />
            </motion.div>
          ))}
        </div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`text-center p-12 rounded-3xl backdrop-blur-lg border ${
            isDark 
              ? 'bg-black/40 border-teal-500/20'
              : 'bg-white/70 border-teal-300/30 shadow-xl'
          }`}
        >
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {language === 'EN' ? 'Interested in Joining Our Team?' : 'チームへの参加に興味がありますか？'}
          </h2>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {language === 'EN' 
              ? "Explore opportunities for postdoctoral researchers, graduate students, and research collaborations."
              : "博士研究員、大学院生、研究協力の機会をご確認ください。"
            }
          </p>
          <button
            onClick={() => setCurrentPage('join-us')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl font-semibold text-lg hover:from-teal-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {language === 'EN' ? 'Join Our Team' : '私たちのチームに参加'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};