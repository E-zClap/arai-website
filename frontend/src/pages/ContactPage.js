import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { QuantumField } from '../components/animations/QuantumField';
import { ContactCard } from '../components/ui/ContactCard';
import { PageHeader } from '../components/ui/PageHeader';

// Contact Page Component
export const ContactPage = ({ language, isDark, setCurrentPage }) => {
  const contactData = [
    {
      icon: Mail,
      title: {
        EN: "Email",
        JP: "メール"
      },
      content: "arai.k.835f [at] m.isct.ac.jp",
      link: "mailto:arai.k.835f@m.isct.ac.jp"
    },
    {
      icon: Phone,
      title: {
        EN: "Phone",
        JP: "電話"
      },
      content: "+81-45-924-5030",
      link: "tel:+81-45-924-5030"
    },
    {
      icon: MapPin,
      title: {
        EN: "Address",
        JP: "住所"
      },
      content: language === 'EN'
        ? "Arai Lab. 5030 Post No. G2-7, 4259 Nagatsuta-cho, Midori-ku, Yokohama, Kanagawa 226-8501 JAPAN"
        : "〒226-8501 神奈川県横浜市緑区長津田町4259 G2-7 荒井研究室 5030",
      link: null
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <QuantumField density={0.9} />

      <div className="max-w-6xl mx-auto px-6 py-28 sm:py-32 relative z-10">
        <PageHeader
          isDark={isDark}
          eyebrow={language === 'EN' ? 'Get in touch' : 'お問い合わせ'}
          title={language === 'EN' ? 'Contact' : 'お問い合わせ'}
          subtitle={language === 'EN'
            ? "Get in touch with the Arai Group. For joining opportunities, please visit our Join Us page."
            : "荒井研究室へのお問い合わせ。参加機会については、参加ページをご覧ください。"
          }
        />

        <div className="grid md:grid-cols-3 gap-6 mb-16">
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
          <div className={`rounded-2xl p-8 border ${
            isDark
              ? 'bg-white/[0.03] border-white/10'
              : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.22em] mb-3">
              {language === 'EN' ? 'Find us' : 'アクセス'}
            </p>
            <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-8 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {language === 'EN' ? 'Our Location' : '所在地'}
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Address Information */}
              <div className="space-y-6">
                <div className={`p-6 rounded-2xl border ${
                  isDark
                    ? 'bg-white/[0.03] border-white/10'
                    : 'bg-white border-slate-200'
                }`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-4 flex items-center ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    <MapPin className="mr-2 text-orange-500" size={20} />
                    {language === 'EN' ? 'Institute of Science Tokyo' : '東京科学大学'}
                  </h3>
                  <div className={`text-base leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {language === 'EN'
                      ? (
                          <div>
                            <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Arai Lab. 5030</div>
                            <div className="mt-2">Post No. G2-7</div>
                            <div className="mt-2">Department of Electrical & Electronic Engineering</div>
                            <div className="mt-2">4259 Nagatsuta-cho</div>
                            <div>Midori-ku, Yokohama, Kanagawa 226-8501 JAPAN</div>
                          </div>
                        )
                      : (
                          <div>
                            <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>荒井研究室 5030</div>
                            <div className="mt-2">郵便番号 G2-7</div>
                            <div className="mt-2">電気電子系</div>
                            <div className="mt-2">〒226-8501</div>
                            <div>神奈川県横浜市緑区長津田町4259</div>
                          </div>
                        )
                    }
                  </div>
                </div>

                {/* Transportation Info */}
                <div className={`p-6 rounded-2xl border ${
                  isDark
                    ? 'bg-white/[0.03] border-white/10'
                    : 'bg-white border-slate-200'
                }`}>
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {language === 'EN' ? 'Access Information' : 'アクセス情報'}
                  </h4>
                  <div className={`text-sm space-y-2 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {language === 'EN'
                      ? (
                          <div>
                            <div>• Tokyu Den-en-toshi Line</div>
                            <div className="ml-4">Suzukakedai Station (10 min walk)</div>
                          </div>
                        )
                      : (
                          <div>
                            <div>• 東急田園都市線</div>
                            <div className="ml-4">すずかけ台駅より徒歩10分</div>
                          </div>
                        )
                    }
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative">
                <div className={`rounded-2xl overflow-hidden border ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=139.4820037%2C35.5107769%2C139.4870037%2C35.5147769&layer=mapnik&marker=35.5127769%2C139.4845037"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-96"
                    title={language === 'EN' ? 'Laboratory Location Map - G2 Building, Suzukakedai Campus' : '研究室の場所マップ - G2棟、すずかけ台キャンパス'}
                  />
                </div>

                {/* Map Controls */}
                <div className="mt-4 flex gap-3">
                  <a
                    href="https://www.google.com/maps/place/G2+Building,+Nagatsutach%C5%8D,+Midori+Ward,+Yokohama,+Kanagawa+226-0026/@35.512827,139.4840208,111m/data=!3m2!1e3!5s0x6018f88bbc801309:0x13d16913bdbd2a75!4m14!1m7!3m6!1s0x6018f531c8956e75:0xad027204cc33e6f9!2sTokyo+Institute+of+Technology+Suzukakedai+Campus!8m2!3d35.51438!4d139.4838937!16s%2Fm%2F0ctww6v!3m5!1s0x6018f8897dc07de1:0xa0e3e6a9e5a9b2fe!8m2!3d35.5127769!4d139.4845037!16s%2Fg%2F11c1fkct78"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isDark
                        ? 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border border-orange-500/30'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    {language === 'EN' ? 'Open in Google Maps' : 'Googleマップで開く'}
                  </a>
                  <a
                    href="https://www.openstreetmap.org/?mlat=35.5127769&mlon=139.4845037#map=18/35.5127769/139.4845037"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isDark
                        ? 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/15'
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
          className={`p-8 sm:p-10 rounded-2xl border ${
            isDark
              ? 'bg-white/[0.03] border-white/10'
              : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {language === 'EN' ? 'Interested in Joining Our Team?' : 'チームへの参加に興味がありますか？'}
          </h2>
          <p className={`text-base leading-relaxed mb-8 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {language === 'EN'
              ? "Explore opportunities for postdoctoral researchers, graduate students, and research collaborations."
              : "博士研究員、大学院生、研究協力の機会をご確認ください。"
            }
          </p>
          <button
            onClick={() => setCurrentPage('join-us')}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors"
          >
            {language === 'EN' ? 'Join Our Team' : '私たちのチームに参加'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};
