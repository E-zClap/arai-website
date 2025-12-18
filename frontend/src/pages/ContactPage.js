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
        ? "#1107 G2-7, 4259 Nagatsuta-cho, Midori-ku, Yokohama, Kanagawa 226-8501 JAPAN"
        : "〒226-8501 神奈川県横浜市緑区長津田町4259 G2-7 #1107",
      link: null
    }
  ];

  return (
    <div className={`min-h-screen py-24 px-6 relative overflow-hidden ${
      isDark ? 'bg-dark-gray-950' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900/20 via-transparent to-orange-900/20'
          : 'bg-gradient-to-br from-slate-100/40 via-transparent to-orange-100/40'
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
          <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-orange-500 mx-auto mb-8" />
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
              ? 'bg-dark-gray-950/40 border-orange-600/20'
              : 'bg-white/70 border-orange-300/30 shadow-xl'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 text-center ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {language === 'EN' ? 'Our Location' : '所在地'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-orange-500 mx-auto mb-8" />
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Address Information */}
              <div className="space-y-6">
                <div className={`p-6 rounded-2xl border ${
                  isDark 
                    ? 'bg-dark-gray-850/50 border-dark-gray-700/50'
                    : 'bg-slate-50/80 border-slate-200/50'
                }`}>
                  <h3 className={`text-xl font-semibold mb-4 flex items-center ${
                    isDark ? 'text-orange-300' : 'text-orange-700'
                  }`}>
                    <MapPin className="mr-2" size={20} />
                    {language === 'EN' ? 'Institute of Science Tokyo' : '東京科学大学'}
                  </h3>
                  <div className={`text-base leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {language === 'EN' 
                      ? (
                          <div>
                            <div className="font-medium">Arai's Laboratory</div>
                            <div className="mt-2">Department of Electrical & Electronic Engineering</div>
                            <div className="mt-2">#1107 G2-7, 4259 Nagatsuta-cho</div>
                            <div>Midori-ku, Yokohama, Kanagawa 226-8501 JAPAN</div>
                          </div>
                        )
                      : (
                          <div>
                            <div className="font-medium">荒井研究室</div>
                            <div className="mt-2">電気電子系</div>
                            <div className="mt-2">〒226-8501</div>
                            <div>神奈川県横浜市緑区長津田町4259 G2-7 #1107</div>
                          </div>
                        )
                    }
                  </div>
                </div>

                {/* Transportation Info */}
                <div className={`p-6 rounded-2xl border ${
                  isDark 
                    ? 'bg-dark-gray-850/50 border-dark-gray-700/50'
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
                            <div>• JR Yokohama Line / Tokyu Den-en-toshi Line</div>
                            <div className="ml-4">Nagatsuta Station (5 min walk)</div>
                          </div>
                        )
                      : (
                          <div>
                            <div>• JR横浜線・東急田園都市線</div>
                            <div className="ml-4">長津田駅より徒歩5分</div>
                          </div>
                        )
                    }
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative">
                <div className={`rounded-2xl overflow-hidden border-2 ${
                  isDark ? 'border-orange-600/30' : 'border-orange-300/50'
                } shadow-lg`}>
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=139.5022%2C35.5401%2C139.5122%2C35.5471&layer=mapnik&marker=35.5436%2C139.5072"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-96"
                    title={language === 'EN' ? 'Laboratory Location Map' : '研究室の場所マップ'}
                  />
                </div>
                
                {/* Map Controls */}
                <div className="mt-4 flex gap-3 justify-center">
                  <a
                    href="https://maps.google.com/?q=4259+Nagatsuta-cho,+Midori-ku,+Yokohama,+Kanagawa+226-8501,+Japan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isDark 
                        ? 'bg-orange-600/20 text-orange-300 hover:bg-orange-600/30 border border-orange-600/30'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    {language === 'EN' ? 'Open in Google Maps' : 'Googleマップで開く'}
                  </a>
                  <a
                    href="https://www.openstreetmap.org/?mlat=35.5436&mlon=139.5072#map=16/35.5436/139.5072"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isDark 
                        ? 'bg-slate-600/20 text-slate-300 hover:bg-slate-600/30 border border-dark-gray-500/30'
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
              ? 'bg-dark-gray-950/40 border-orange-600/20'
              : 'bg-white/70 border-orange-300/30 shadow-xl'
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
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl font-semibold text-lg hover:from-orange-500 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {language === 'EN' ? 'Join Our Team' : '私たちのチームに参加'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};