import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Lightbulb, 
  Handshake, 
  FlaskConical, 
  Cpu, 
  Target, 
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { Node } from '../FCtypes';

const ECOSYSTEM_NODES: Node[] = [
  { 
    id: 'mentors', 
    label: 'Mentors', 
    icon: <Lightbulb className="w-6 h-6" />, 
    iconColor: 'text-pink-400',
    description: 'Experienced industry leaders providing strategic guidance and wisdom.',
    color: 'from-pink-500 to-rose-500'
  },
  { 
    id: 'investors', 
    label: 'Investors', 
    icon: <Briefcase className="w-6 h-6" />, 
    iconColor: 'text-amber-400',
    description: 'Venture capitalists and angel investors fueling your growth capital.',
    color: 'from-amber-400 to-orange-500'
  },
  { 
    id: 'founders', 
    label: 'Peer Founders', 
    icon: <Users className="w-6 h-6" />, 
    iconColor: 'text-yellow-400',
    description: 'A community of fellow entrepreneurs sharing insights and support.',
    color: 'from-yellow-400 to-amber-500'
  },
  { 
    id: 'research', 
    label: 'Research Team', 
    icon: <FlaskConical className="w-6 h-6" />, 
    iconColor: 'text-emerald-400',
    description: 'Deep-tech experts and scientists pushing the boundaries of innovation.',
    color: 'from-emerald-400 to-teal-500'
  },
  { 
    id: 'tech', 
    label: 'Tech Experts', 
    icon: <Cpu className="w-6 h-6" />, 
    iconColor: 'text-blue-400',
    description: 'Specialized engineers and architects building your core infrastructure.',
    color: 'from-blue-400 to-indigo-500'
  },
  { 
    id: 'talent', 
    label: 'Talent Network', 
    icon: <Users className="w-6 h-6" />, 
    iconColor: 'text-violet-400',
    description: 'Access to top-tier professionals across all functional domains.',
    color: 'from-violet-400 to-purple-500'
  },
  { 
    id: 'advisors', 
    label: 'Advisors', 
    icon: <Target className="w-6 h-6" />, 
    iconColor: 'text-cyan-400',
    description: 'Subject matter experts offering tactical advice on specific challenges.',
    color: 'from-cyan-400 to-blue-500'
  },
  { 
    id: 'partners', 
    label: 'Strategic Partners', 
    icon: <Handshake className="w-6 h-6" />, 
    iconColor: 'text-blue-500',
    description: 'Corporate alliances and channel partners expanding your market reach.',
    color: 'from-blue-500 to-cyan-500'
  },
];

export const EcosystemHub = () => {
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // cycle through nodes every 2 seconds clockwise
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % ECOSYSTEM_NODES.length;
        setActiveNode(ECOSYSTEM_NODES[next]);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 sm:py-24 sm:px-6 bg-[#080808] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6">
            The Startup Core
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base">
            Your startup doesn't exist in a vacuum. It's the center of a complex, 
            interconnected web of expertise and capital.
          </p>
        </div>

        {/* ─── DESKTOP: orbital hub layout ─── */}
        <div className="hidden lg:flex relative items-center justify-center gap-20 min-h-[700px]">
          
          {/* The Hub Visualization */}
          <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
            
            {/* Background Rings */}
            <div className="absolute inset-0 border border-white/5 rounded-full" />
            <div className="absolute inset-[15%] border border-white/5 rounded-full" />
            <div className="absolute inset-[30%] border border-white/5 rounded-full" />
            
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              {ECOSYSTEM_NODES.map((_, index) => {
                const angle = (index / ECOSYSTEM_NODES.length) * 2 * Math.PI;
                const x2 = 50 + 40 * Math.cos(angle);
                const y2 = 50 + 40 * Math.sin(angle);
                return (
                  <line 
                    key={index}
                    x1="50%" y1="50%" 
                    x2={`${x2}%`} y2={`${y2}%`} 
                    stroke="white" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                  />
                );
              })}
            </svg>

            {/* Central Hub */}
            <motion.div 
              className="relative z-10 w-40 h-40 md:w-48 md:h-48 rounded-full bg-black border-2 border-cyan-500/50 flex flex-col items-center justify-center text-center p-4 hub-glow"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-cyan-400 font-bold text-xs tracking-[0.2em] uppercase mb-1">Hub</span>
              <span className="text-xl md:text-2xl font-display font-bold leading-tight">Your<br />Startup</span>
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" />
            </motion.div>

            {/* Orbiting Nodes */}
            {ECOSYSTEM_NODES.map((node, index) => {
              const angle = (index / ECOSYSTEM_NODES.length) * 2 * Math.PI;
              const radius = 42;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);

              return (
                <motion.button
                  key={node.id}
                  className={`absolute w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all z-20
                    ${activeNode?.id === node.id ? 'scale-125 ring-4 ring-white/10' : 'hover:scale-110'}
                  `}
                  style={{ 
                    left: `${x}%`, 
                    top: `${y}%`,
                    background: `radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 100%)`,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                  onMouseEnter={() => setActiveNode(node)}
                  onMouseLeave={() => setActiveNode(null)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`${node.iconColor ?? 'text-white/80'} ${activeNode?.id === node.id ? 'text-cyan-400' : ''}`}>
                    {node.icon}
                  </div>
                  
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40">
                      {node.label}
                    </span>
                  </div>

                  {activeNode?.id === node.id && (
                    <motion.div 
                      layoutId="node-glow"
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${node.color} opacity-20 blur-xl`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Desktop Info Panel */}
          <div className="w-full max-w-md lg:h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeNode && (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-8"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeNode.color} flex items-center justify-center mb-6`}>
                    {activeNode.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{activeNode.label}</h3>
                  <p className="text-white/60 leading-relaxed mb-6">
                    {activeNode.description}
                  </p>
                  <button className="flex items-center gap-2 text-cyan-400 font-bold text-sm hover:gap-3 transition-all">
                    Explore Network <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── MOBILE / TABLET: compact hub + scrollable cards ─── */}
        <div className="lg:hidden flex flex-col items-center gap-8">

          {/* Mini Hub */}
          <div className="relative w-[280px] sm:w-[340px] aspect-square flex items-center justify-center">
            
            {/* Background Rings */}
            <div className="absolute inset-0 border border-white/5 rounded-full" />
            <div className="absolute inset-[18%] border border-white/5 rounded-full" />

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
              {ECOSYSTEM_NODES.map((_, index) => {
                const angle = (index / ECOSYSTEM_NODES.length) * 2 * Math.PI;
                const x2 = 50 + 40 * Math.cos(angle);
                const y2 = 50 + 40 * Math.sin(angle);
                return (
                  <line 
                    key={index}
                    x1="50%" y1="50%" 
                    x2={`${x2}%`} y2={`${y2}%`} 
                    stroke="white" 
                    strokeWidth="1" 
                    strokeDasharray="3 3"
                  />
                );
              })}
            </svg>

            {/* Central Hub */}
            <motion.div 
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-black border-2 border-cyan-500/50 flex flex-col items-center justify-center text-center p-3 hub-glow"
            >
              <span className="text-cyan-400 font-bold text-[9px] tracking-[0.15em] uppercase mb-0.5">Hub</span>
              <span className="text-sm sm:text-base font-display font-bold leading-tight">Your<br />Startup</span>
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" />
            </motion.div>

            {/* Orbiting Node Buttons (icon only, tap to select) */}
            {ECOSYSTEM_NODES.map((node, index) => {
              const angle = (index / ECOSYSTEM_NODES.length) * 2 * Math.PI;
              const radius = 40;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);

              return (
                <motion.button
                  key={node.id}
                  className={`absolute w-12 h-12 sm:w-14 sm:h-14 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-20 transition-all
                    ${activeNode?.id === node.id 
                      ? 'ring-2 ring-cyan-400/60 scale-110' 
                      : 'active:scale-95'}
                  `}
                  style={{ 
                    left: `${x}%`, 
                    top: `${y}%`,
                    background: activeNode?.id === node.id
                      ? `radial-gradient(circle at center, rgba(6,182,212,0.2) 0%, rgba(0,0,0,0.9) 100%)`
                      : `radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.8) 100%)`,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                  onClick={() => setActiveNode(activeNode?.id === node.id ? null : node)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className={`${activeNode?.id === node.id ? 'text-cyan-400' : node.iconColor ?? 'text-white/70'}`}>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 [&>svg]:w-full [&>svg]:h-full">
                      {node.icon}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Info Card */}
          <div className="w-full max-w-sm min-h-[180px]">
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="glass-card p-5 sm:p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeNode.color} flex items-center justify-center flex-shrink-0`}>
                      {activeNode.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold">{activeNode.label}</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {activeNode.description}
                  </p>
                  <button className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs sm:text-sm">
                    Explore Network <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-5 sm:p-6 flex items-center justify-center"
                >
                  <p className="text-white/30 text-sm text-center">
                    Tap any node to explore
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile: horizontal scroll node list as quick-access pills */}
          <div className="w-full overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 w-max">
              {ECOSYSTEM_NODES.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(activeNode?.id === node.id ? null : node)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all
                    ${activeNode?.id === node.id
                      ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                      : 'bg-white/5 border border-white/10 text-white/50 active:scale-95'}
                  `}
                >
                  <span className={`${node.iconColor} [&>svg]:w-3 [&>svg]:h-3`}>{node.icon}</span>
                  {node.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};