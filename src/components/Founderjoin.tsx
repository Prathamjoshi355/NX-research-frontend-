/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Globe, 
  Rocket, 
  ArrowUpRight,
  Activity,
  Cpu,
  Network,
  Layers
} from 'lucide-react';

interface Pathway {
  id: string;
  title: string;
  description: string;
  icon: any;
  path: string;
}

const PATHWAYS: Pathway[] = [
  {
    id: 'direct',
    title: 'Direct Connection',
    description: 'For Individual Founders',
    icon: Zap,
    path: '/join?path=startup'
  },
  {
    id: 'fcc',
    title: 'FCC Pathway',
    description: 'For Institutional Partners',
    icon: Shield,
    path: '/join?path=startup'
  },
  {
    id: 'research',
    title: 'Gov & Research',
    description: 'For Research Entities',
    icon: Globe,
    path: '/join?path=research'
  },
  {
    id: 'initiatives',
    title: 'Strategic Initiatives',
    description: 'For High-Impact Startups',
    icon: Rocket,
    path: '/join?path=startup'
  }
];

const CircuitLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg width="100%" height="100%" className="opacity-20 md:opacity-30" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow-line">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left Side Connections */}
        <motion.path d="M 100 200 L 400 200 L 400 400" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <motion.path d="M 100 600 L 400 600 L 400 400" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        
        {/* Right Side Connections */}
        <motion.path d="M 1100 200 L 800 200 L 800 400" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <motion.path d="M 1100 600 L 800 600 L 800 400" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        
        <circle cx="400" cy="400" r="3" fill="#06b6d4" className="hidden md:block" />
        <circle cx="800" cy="400" r="3" fill="#06b6d4" className="hidden md:block" />
      </svg>
    </div>
  );
};

const BentoCard = ({ pathway, index, className = "" }: { pathway: Pathway; index: number; className?: string }) => {
  const Icon = pathway.icon;
  return (
    <Link to={pathway.path} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className={`relative group bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl md:rounded-2xl p-2 md:p-5 overflow-hidden hover:border-cyan-500/40 transition-all duration-500 h-full ${className}`}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-2 md:mb-4">
            <div className="p-1.5 md:p-2 rounded-lg md:rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform duration-500">
              <Icon size={14} className="md:w-[18px] md:h-[18px]" />
            </div>
            <div className="text-[6px] md:text-[8px] font-mono text-slate-500 uppercase tracking-[0.2em] pt-1">
              0{index + 1}
            </div>
          </div>
          
          <h3 className="text-[10px] md:text-base font-bold text-white mb-0.5 md:mb-1 tracking-tight group-hover:text-cyan-400 transition-colors leading-tight">
            {pathway.title}
          </h3>
          <p className="text-cyan-500/60 text-[7px] md:text-[9px] font-mono uppercase tracking-widest mb-2 md:mb-4">
            {pathway.description}
          </p>
          
          <div className="mt-auto pt-2 md:pt-3 border-t border-white/5 flex items-center justify-between group-hover:border-cyan-500/20 transition-colors">
            <span className="text-[6px] md:text-[8px] font-bold text-slate-500 uppercase tracking-widest">Connect</span>
            <ArrowUpRight size={10} className="md:w-[12px] md:h-[12px] text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function FoundersCirclejoin () {
  return (
    <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 md:gap-3 mb-3 md:mb-8"
        >
          <div className="h-[1px] w-4 md:w-8 bg-cyan-500/50"></div>
          <span className="text-[7px] md:text-[10px] font-mono text-cyan-500 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">
            NX Research Ecosystem
          </span>
          <div className="h-[1px] w-4 md:w-8 bg-cyan-500/50"></div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-7xl font-black text-white tracking-tighter leading-none mb-3 md:mb-8"
        >
          WAYS TO JOIN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-slate-500">
            THE FOUNDERS CIRCLE
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-2xl leading-relaxed text-[10px] md:text-lg px-2"
        >
          Select your entry protocol to initialize connection with our structured startup growth ecosystem.
        </motion.p>
      </div>

      {/* Structured Layout - Forced 3-Column for 'Same Layout' feel */}
      <div className="relative w-full">
        <CircuitLines />
        
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-1.5 md:gap-8 items-stretch relative z-10">
          
          {/* Left Column: 2 Pathways */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-1.5 md:gap-6">
            <BentoCard pathway={PATHWAYS[0]} index={0} />
            <BentoCard pathway={PATHWAYS[2]} index={2} />
          </div>

          {/* Middle Column: Main Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-2 lg:col-span-4 bg-gradient-to-b from-slate-900/80 to-black border border-white/10 rounded-xl md:rounded-[3rem] p-2.5 md:p-10 overflow-hidden relative group shadow-2xl shadow-cyan-500/5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent)]"></div>
            
            <div className="relative z-10 flex flex-col h-full text-center items-center">
              <div className="w-6 h-6 md:w-16 md:h-16 rounded-md md:rounded-[1.5rem] bg-cyan-500 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-2 md:mb-8 group-hover:scale-105 transition-transform duration-700">
                <Layers size={12} className="md:hidden" />
                <Layers size={32} className="hidden md:block" />
              </div>

              <h2 className="text-[10px] md:text-4xl font-bold text-white mb-1 md:mb-6 tracking-tight">
                Founders Circle
              </h2>
              
              <div className="text-slate-400 text-[7px] md:text-base max-w-lg mb-3 md:mb-8 space-y-0.5 md:space-y-4 leading-tight md:leading-relaxed">
                <p>
                  Founder’s Circle is the structured startup growth ecosystem within <span className="text-white font-semibold">NX Research</span>.
                </p>
                <p className="hidden md:block">
                  It brings together serious founders, innovators, and execution-focused teams to refine ideas, validate models, and build scalable ventures.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 2 Pathways */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-1.5 md:gap-6">
            <BentoCard pathway={PATHWAYS[1]} index={1} />
            <BentoCard pathway={PATHWAYS[3]} index={3} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-12 md:mt-24 pt-6 md:pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8"
      >
        <div className="flex items-center gap-6 md:gap-12">
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-0.5 md:mb-1">System Status</span>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-white font-bold text-[10px] md:text-sm">Operational</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-0.5 md:mb-1">Ecosystem Nodes</span>
            <span className="text-white font-bold text-[10px] md:text-sm">1,248 Active</span>
          </div>
        </div>
        
     
      </motion.div>
    </main>
  );
};
