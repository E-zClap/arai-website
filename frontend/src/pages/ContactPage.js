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
      isDark ? 'bg-deep-navy-950' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-electric-blue-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-electric-blue-100/40'
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
          <div className="w-20 h-1 bg-gradient-to-r from-electric-blue-600 to-royal-indigo-500 mx-auto mb-8" />
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

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className={`backdrop-blur-lg rounded-3xl p-8 border ${
            isDark 
              ? 'bg-deep-navy-950/40 border-electric-blue-600/20'
              : 'bg-white/70 border-electric-blue-300/30 shadow-xl'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 text-center ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {language === 'EN' ? 'Our Location' : '所在地'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-electric-blue-600 to-royal-indigo-500 mx-auto mb-8" />
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Address Information */}
              <div className="space-y-6">
                <div className={`p-6 rounded-2xl border ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700/50'
                    : 'bg-slate-50/80 border-slate-200/50'
                }`}>
                  <h3 className={`text-xl font-semibold mb-4 flex items-center ${
                    isDark ? 'text-electric-blue-300' : 'text-electric-blue-700'
                  }`}>
                    <MapPin className="mr-2" size={20} />
                    {language === 'EN' ? 'Tokyo Institute of Technology' : '東京工業大学'}
                  </h3>
                  <div className={`text-base leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {language === 'EN' 
                      ? (
                          <div>
                            <div className="font-medium">Arai's Laboratory</div>
                            <div className="mt-2">Department of Electrical & Electronic Engineering</div>
                            <div className="mt-2">2-12-1 Ookayama, Meguro-ku</div>
                            <div>Tokyo 152-8552, Japan</div>
                          </div>
                        )
                      : (
                          <div>
                            <div className="font-medium">荒井研究室</div>
                            <div className="mt-2">電気電子系</div>
                            <div className="mt-2">〒152-8552</div>
                            <div>東京都目黒区大岡山2-12-1</div>
                          </div>
                        )
                    }
                  </div>
                </div>

                {/* Transportation Info */}
                <div className={`p-6 rounded-2xl border ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700/50'
                    : 'bg-slate-50/80 border-slate-200/50'
                }`}>
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {language === 'EN' ? 'Access Information' : 'アクセス情報'}
                  </h4>
                  <div className={`text-sm space-y-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {language === 'EN' 
                      ? (
                          <div>
                            <div>• Tokyu Meguro Line / Tokyu Oimachi Line</div>
                            <div className="ml-4">Ookayama Station (5 min walk)</div>
                            <div>• JR Keihin-Tohoku Line</div>
                            <div className="ml-4">Ishikawa-dai Station (10 min walk)</div>
                          </div>
                        )
                      : (
                          <div>
                            <div>• 東急目黒線・東急大井町線</div>
                            <div className="ml-4">大岡山駅より徒歩5分</div>
                            <div>• JR京浜東北線</div>
                            <div className="ml-4">石川台駅より徒歩10分</div>
                          </div>
                        )
                    }
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative">
                <div className={`rounded-2xl overflow-hidden border-2 ${
                  isDark ? 'border-electric-blue-600/30' : 'border-electric-blue-300/50'
                } shadow-lg`}>
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=139.6808%2C35.6050%2C139.6908%2C35.6120&layer=mapnik&marker=35.6085%2C139.6858"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-96"
                    title={language === 'EN' ? 'Tokyo Institute of Technology Location' : '東京工業大学の場所'}
                  />
                </div>
                
                {/* Map Controls */}
                <div className="mt-4 flex gap-3 justify-center">
                  <a
                    href="https://maps.google.com/?q=Tokyo+Institute+of+Technology,+Ookayama"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isDark 
                        ? 'bg-electric-blue-600/20 text-electric-blue-300 hover:bg-electric-blue-600/30 border border-electric-blue-600/30'
                        : 'bg-electric-blue-50 text-electric-blue-700 hover:bg-electric-blue-100 border border-electric-blue-200'
                    }`}
                  >
                    {language === 'EN' ? 'Open in Google Maps' : 'Googleマップで開く'}
                  </a>
                  <a
                    href="https://www.openstreetmap.org/?mlat=35.6085&mlon=139.6858#map=16/35.6085/139.6858"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isDark 
                        ? 'bg-slate-600/20 text-slate-300 hover:bg-slate-600/30 border border-slate-500/30'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {language === 'EN' ? 'View Larger Map' : '大きな地図で見る'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`text-center p-12 rounded-3xl backdrop-blur-lg border ${
            isDark 
              ? 'bg-deep-navy-950/40 border-electric-blue-600/20'
              : 'bg-white/70 border-electric-blue-300/30 shadow-xl'
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
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-electric-blue-600 to-royal-indigo-500 text-white rounded-2xl font-semibold text-lg hover:from-electric-blue-500 hover:to-royal-indigo-400 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {language === 'EN' ? 'Join Our Team' : '私たちのチームに参加'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};