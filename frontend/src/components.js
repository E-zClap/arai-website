import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Calendar,
  Users,
  BookOpen,
  FlaskConical,
  Atom,
  Sparkles,
  Github,
  Scholar
} from 'lucide-react';

// Quantum Particle Animation Component
export const QuantumParticles = ({ intensity = 50 }) => {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < intensity; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 2 + 0.5
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: (particle.y + particle.speed * 0.1) % 100,
          x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.02
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-400 to-blue-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Quantum Network Animation
export const QuantumNetwork = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      for (let i = 0; i < 15; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
          size: Math.random() * 8 + 4
        });
      }
      setNodes(newNodes);

      const newConnections = [];
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = i + 1; j < newNodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(newNodes[i].x - newNodes[j].x, 2) + 
            Math.pow(newNodes[i].y - newNodes[j].y, 2)
          );
          if (distance < 30 && Math.random() > 0.6) {
            newConnections.push({
              id: `${i}-${j}`,
              x1: newNodes[i].x,
              y1: newNodes[i].y,
              x2: newNodes[j].x,
              y2: newNodes[j].y,
              opacity: Math.max(0.1, 1 - distance / 30)
            });
          }
        }
      }
      setConnections(newConnections);
    };

    generateNodes();
  }, []);

  return (
    <div className="absolute inset-0 opacity-30">
      <svg className="w-full h-full">
        {connections.map(conn => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="url(#gradient)"
            strokeWidth="1"
            opacity={conn.opacity}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.id * 0.2
          }}
        />
      ))}
    </div>
  );
};

// Sidebar Navigation Component
export const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'home', label: 'TOP', icon: Atom },
    { id: 'news', label: 'News', icon: Calendar },
    { id: 'research', label: 'Research', icon: FlaskConical },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-black/20 backdrop-blur-md rounded-xl border border-purple-500/20 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-center">
          <span className={`block h-0.5 w-6 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-all mt-1 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-all mt-1 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </div>
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-black/90 via-purple-900/80 to-black/90 backdrop-blur-xl border-r border-purple-500/20 z-40 lg:translate-x-0"
      >
        <div className="p-8">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-white mb-2">Arai Group</h1>
            <p className="text-purple-300 text-sm">Tokyo Institute of Technology</p>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mt-4" />
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 group ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-purple-200 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          <div className="mt-16 pt-8 border-t border-purple-500/20">
            <div className="flex space-x-4">
              <a href="https://www.titech.ac.jp/" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white transition-colors">
                <ExternalLink size={16} />
              </a>
            </div>
            <p className="text-xs text-purple-400 mt-4">
              © 2025 The Arai Group<br />
              Tokyo Institute of Technology
            </p>
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section Component
export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1659092836100-f854337c7c27?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwcGh5c2ljc3xlbnwwfHx8cHVycGxlfDE3NTI5MzU1NTV8MA&ixlib=rb-4.1.0&q=85)'
        }}
      />
      
      {/* Quantum Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/60 to-blue-900/70" />
      
      {/* Quantum Particles */}
      <QuantumParticles intensity={60} />
      
      {/* Quantum Network */}
      <QuantumNetwork />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Quantum Sensing
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-semibold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            and Informatics for
          </motion.h2>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h3 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text">
              Quantum Transformation
            </h3>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-xl" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <ChevronDown 
            size={32} 
            className="text-white/70 animate-bounce mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

// Mission Section Component  
export const MissionSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={ref}>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1621435410670-0839654680da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxxdWFudHVtJTIwcGh5c2ljc3xlbnwwfHx8cHVycGxlfDE3NTI5MzU1NTV8MA&ixlib=rb-4.1.0&q=85)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/50" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">Our Mission</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/20"
        >
          <p className="text-xl text-gray-200 leading-relaxed text-center max-w-4xl mx-auto">
            The Arai group at the Tokyo Institute of Technology was established in April 2022 with the theme of quantum technology. 
            Among the many quantum technologies, we focus on <span className="text-purple-400 font-semibold">quantum sensing</span>. 
            By combining it with information science (informatics), we aim to create an innovation called 
            <span className="text-orange-400 font-semibold"> 'quantum transformation'</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// News Card Component
export const NewsCard = ({ news, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-purple-300 mb-3 flex items-center">
            <Calendar size={14} className="mr-2" />
            {news.date}
          </div>
          <h3 className="text-white text-lg font-semibold mb-4 group-hover:text-purple-300 transition-colors">
            {news.title}
          </h3>
          <a 
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center text-sm"
          >
            Read more
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Research Card Component
export const ResearchCard = ({ title, description, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-black/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group"
      whileHover={{ scale: 1.03 }}
    >
      <div className="h-64 bg-cover bg-center relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Team Member Card
export const TeamMemberCard = ({ name, position, education, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-black/40 backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group text-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="h-80 bg-cover bg-center relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-purple-400 font-semibold mb-4">{position}</p>
        <div className="space-y-2 text-gray-300 text-sm">
          {education.map((edu, idx) => (
            <p key={idx}>{edu}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Contact Info Card
export const ContactCard = ({ icon: Icon, title, content, link }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      {link ? (
        <a 
          href={link}
          className="text-purple-300 hover:text-purple-200 transition-colors"
        >
          {content}
        </a>
      ) : (
        <p className="text-gray-300">{content}</p>
      )}
    </motion.div>
  );
};