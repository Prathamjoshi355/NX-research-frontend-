import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Search, Target, Briefcase, Globe } from 'lucide-react';

export const FCCNetworkVisual = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [radius, setRadius] = useState(220);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(140);
      } else {
        setRadius(220);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    
      


  const satellites = [
    { 
      id: 'founders', 
      title: 'FOUNDERS', 
      icon: Users, 
      angle: -135, 
      desc: 'FCC provides the foundation for visionary builders to scale.',
      color: 'emerald'
    },
    { 
      id: 'researchers', 
      title: 'RESEARCHERS', 
      icon: Search, 
      angle: -45, 
      desc: 'FCC bridges deep research with commercial execution.',
      color: 'purple'
    },
    { 
      id: 'investors', 
      title: 'INVESTORS', 
      icon: Target, 
      angle: 45, 
      desc: 'FCC identifies high-signal opportunities for strategic capital.',
      color: 'amber'
    },
    { 
      id: 'industry', 
      title: 'INDUSTRY LEADERS', 
      icon: Briefcase, 
      angle: 135, 
      desc: 'FCC integrates innovation into established market leaders.',
      color: 'cyan'
    },
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const maps: Record<string, any> = {
      emerald: {
        border: 'border-emerald-500/20 group-hover:border-emerald-500/50',
        bg: 'bg-emerald-500/10 group-hover:bg-emerald-900/30',
        active: 'scale-110 shadow-[0_0_40px_rgba(16,185,129,0.2)] border-emerald-500/50 bg-emerald-900/40',
        icon: isActive ? 'text-emerald-400' : 'text-emerald-500/50'
      },
      purple: {
        border: 'border-purple-500/20 group-hover:border-purple-500/50',
        bg: 'bg-purple-500/10 group-hover:bg-purple-900/30',
        active: 'scale-110 shadow-[0_0_40px_rgba(168,85,247,0.2)] border-purple-500/50 bg-purple-900/40',
        icon: isActive ? 'text-purple-400' : 'text-purple-500/50'
      },
      amber: {
        border: 'border-amber-500/20 group-hover:border-amber-500/50',
        bg: 'bg-amber-500/10 group-hover:bg-amber-900/30',
        active: 'scale-110 shadow-[0_0_40px_rgba(245,158,11,0.2)] border-amber-500/50 bg-amber-900/40',
        icon: isActive ? 'text-amber-400' : 'text-amber-500/50'
      },
      cyan: {
        border: 'border-cyan-500/20 group-hover:border-cyan-500/50',
        bg: 'bg-cyan-500/10 group-hover:bg-cyan-900/30',
        active: 'scale-110 shadow-[0_0_40px_rgba(6,182,212,0.2)] border-cyan-500/50 bg-cyan-900/40',
        icon: isActive ? 'text-cyan-400' : 'text-cyan-500/50'
      }
    };
    return maps[color] || maps.emerald;
  };

  return (
    <section className="py-8 md:py-18 px-6 bg-black flex flex-col items-center justify-center overflow-hidden relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">The Ecosystem</h2>

      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-blue-900/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      {/* The Nucleus Visualization */}
      <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center">
        
        {/* Central Core (FCC) */}
        <motion.div 
          className="relative z-20 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => setActiveNode('HUB')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-all duration-700" />
          <div className="relative w-28 h-28 md:w-56 md:h-56 rounded-full border-2 border-blue-500/30 bg-black/60 backdrop-blur-2xl flex flex-col items-center justify-center p-5 md:p-9 text-center shadow-[0_0_60px_rgba(37,99,235,0.1)]">
            <Globe className="w-5 h-5 md:w-9 md:h-9 text-blue-500 mb-1.5 md:mb-3.5 animate-[spin_10s_linear_infinite]" />
            <h3 className="text-2xl md:text-5xl font-bold tracking-tighter text-white">FCC</h3>
            <div className="h-px w-7 md:w-11 bg-blue-500/50 my-1.5 md:my-2.5" />
            <p className="text-[7px] md:text-[10px] font-mono tracking-[0.3em] text-blue-400 uppercase">The Core Ecosystem</p>
          </div>
          
          {/* Orbital Rings */}
          <div className="absolute -inset-3.5 md:-inset-5.5 border border-blue-500/10 rounded-full animate-[spin_15s_linear_infinite]" />
          <div className="absolute -inset-7 md:-inset-11 border border-blue-500/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
        </motion.div>

        {/* Satellite Nodes */}
        {satellites.map((sat, i) => {
          const rad = (sat.angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          const classes = getColorClasses(sat.color, activeNode === sat.id);

          return (
            <motion.div
              key={sat.id}
              className="absolute z-30 group"
              initial={{ 
                opacity: 0, 
                scale: 0,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%'
              }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              transition={{ 
                delay: 1 + (i * 0.1), 
                duration: 1.2,
                type: 'spring',
                damping: 15,
                stiffness: 80
              }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveNode(sat.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div className={`
                relative w-20 h-20 md:w-32 md:h-32 rounded-full 
                border border-white/10 backdrop-blur-xl
                flex flex-col items-center justify-center transition-all duration-500
                ${classes.border} ${classes.bg}
                ${activeNode === sat.id ? classes.active : ''}
              `}>
                <sat.icon className={`w-5 h-5 md:w-8 md:h-8 mb-1 md:mb-2 transition-colors duration-500 ${classes.icon}`} />
                <span className={`text-[7px] md:text-[10px] font-mono tracking-widest transition-colors duration-500 text-center px-1 md:px-2 ${activeNode === sat.id ? 'text-white' : 'text-zinc-400'}`}>
                  {sat.title}
                </span>
              </div>

              {/* Tooltip-style Description */}
              <AnimatePresence>
                {activeNode === sat.id && (
                  <motion.div
                    initial={{ opacity: 0, y: sat.angle > 0 ? -10 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: sat.angle > 0 ? -10 : 10 }}
                    className={`
                      absolute left-1/2 -translate-x-1/2 w-[140px] md:w-48 p-3 md:p-4 
                      bg-zinc-900/95 border border-white/10 rounded-xl md:rounded-2xl 
                      backdrop-blur-md text-center pointer-events-none z-50 shadow-2xl
                      ${sat.angle > 0 ? 'bottom-full mb-2 md:mb-4' : 'top-full mt-2 md:mt-4'}
                    `}
                  >
                    <p className="text-[10px] md:text-xs text-zinc-300 md:text-zinc-400 leading-relaxed font-medium">
                      {sat.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FCCNetworkVisual;