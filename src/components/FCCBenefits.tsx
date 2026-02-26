import React, { useRef } from "react";
import { motion } from "motion/react";
import { Section } from "./ui/Section";
import { 
  Users, 
  Search, 
  Target, 
  Briefcase, 
  Globe, 
  Scale, 
  Cpu, 
  Layout, 
  Code, 
  BarChart3, 
  ShieldCheck,
  Zap,
  Network
} from "lucide-react";

const BENEFIT_DATA = [
  {
    id: "01",
    title: "Get Opportunity to Work with Startups.",
    description: "Collaborate with founders, build in-demand skills, and accelerate your career in a fast-paced environment where your contributions truly matter.",
    imageUrl: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1772101107/b1.final_eu8pzt.png",
    color: "cyan",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute left-4 lg:left-0 top-1/2 -translate-y-1/2 space-y-4 z-20">
          <motion.div 
            className="backdrop-blur-2xl p-4 md:p-6 rounded-3xl flex items-center gap-4 md:gap-6 shadow-2xl"
            style={{ background: '#0A2E41', border: '1px solid #1A4A63' }}
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-black shadow-[0_0_30px_rgba(0,212,255,0.3)]"
                 style={{ background: '#00D4FF', color: '#010E1D' }}>MATCH</div>
            <div className="space-y-1">
              <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest" style={{ color: '#00D4FF' }}>Alignment</div>
              <div className="text-xs md:text-sm font-bold" style={{ color: '#E8F0F8' }}>Strategic Fit</div>
            </div>
          </motion.div>
          <motion.div 
            className="backdrop-blur-2xl p-4 md:p-6 rounded-3xl flex items-center gap-4 md:gap-6 shadow-2xl"
            style={{ background: '#032235', border: '1px solid #1A4A63' }}
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-black"
                 style={{ background: '#0A2E41', color: '#A9C0D4' }}>INTENT</div>
            <div className="space-y-1">
              <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest" style={{ color: '#6F8FA6' }}>Verification</div>
              <div className="text-xs md:text-sm font-bold" style={{ color: '#E8F0F8' }}>Verified Goal</div>
            </div>
          </motion.div>
        </div>
        
        <div className="w-[85%] h-[85%] backdrop-blur-sm rounded-[2.5rem] p-6 md:p-10 ml-12 lg:ml-24 shadow-2xl relative"
             style={{ background: '#021F2F', border: '1px solid #1A4A63' }}>
          <div className="flex gap-2.5 mb-8">
            <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(239,68,68,0.3)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(234,179,8,0.3)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(34,197,94,0.3)' }} />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4 space-y-4">
              <div className="h-20 md:h-28 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1A4A63' }} />
              <div className="h-28 md:h-40 rounded-2xl flex items-center justify-center"
                   style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }}>
                <Users className="w-8 h-8 md:w-12 md:h-12" style={{ color: 'rgba(0,212,255,0.4)' }} />
              </div>
            </div>
            <div className="col-span-8 space-y-6">
              <div className="h-6 md:h-8 w-1/2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="h-3 md:h-4 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="h-3 md:h-4 w-3/4 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="h-32 md:h-48 rounded-3xl relative overflow-hidden"
                   style={{ background: 'linear-gradient(135deg, #0A2E41, transparent)', border: '1px solid #1A4A63' }}>
                <motion.div 
                  animate={{ x: [-100, 300], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-40"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "02",
    title: "Discover Passionate and Skilled Minds through the Ecosystem.",
    description: "Connect with a diverse community of passionate, skilled individuals ready to collaborate, innovate, and build impactful solutions. Discover talent, exchange ideas, and form meaningful partnerships within a thriving ecosystem designed for growth.",
    imageUrl: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1772101107/b2_final_cn0bzr.png",
    color: "cyan",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-48 md:w-64 h-80 md:h-[28rem] backdrop-blur-md rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
             style={{ background: '#021F2F', border: '10px solid #032235' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 md:w-32 h-6 md:h-8 rounded-b-3xl z-20"
               style={{ background: '#032235' }} />
          <div className="p-6 md:p-10 pt-12 md:pt-20 space-y-6 md:space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center"
                   style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}>
                <Search className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#00D4FF' }} />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-20 md:w-28 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="h-2 w-12 md:w-16 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
              </div>
            </div>
            <div className="h-32 md:h-48 w-full rounded-3xl flex items-center justify-center relative overflow-hidden"
                 style={{ background: 'linear-gradient(180deg, #0A2E41, #032235)', border: '1px solid #1A4A63' }}>
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Network className="w-10 h-10 md:w-14 md:h-14" style={{ color: 'rgba(0,212,255,0.2)' }} />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(to top, rgba(0,212,255,0.08), transparent)' }} />
            </div>
            <div className="h-10 md:h-14 w-full rounded-2xl flex items-center justify-center text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg"
                 style={{ background: '#00D4FF', color: '#010E1D', boxShadow: '0 8px 30px rgba(0,212,255,0.25)' }}>Connect</div>
          </div>
        </div>
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 md:top-12 right-0 md:-right-8 backdrop-blur-xl p-4 md:p-6 rounded-3xl shadow-2xl flex items-center gap-4 z-30"
          style={{ background: '#0A2E41', border: '1px solid #1A4A63' }}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
               style={{ background: 'rgba(0,224,198,0.1)', border: '1px solid rgba(0,224,198,0.3)' }}>
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#00E0C6' }} />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-16 md:w-24 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <div className="h-1.5 w-10 md:w-16 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: "03",
    title: "Learn Directly from Founders' and Understand real-world Problem Solving.",
    description: "Learn directly from experienced founders and gain insights into how real businesses solve real-world challenges. Understand practical decision-making, execution strategies, and the mindset required to build and scale successful ventures.",
    imageUrl: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1772101106/b3_final_qoskiq.png",
    color: "purple",
    visual: (
      <div className="w-full h-full backdrop-blur-md rounded-[2.5rem] md:rounded-[3.5rem] font-mono text-[10px] md:text-xs shadow-2xl flex flex-col"
           style={{ background: '#010E1D', border: '1px solid #1A4A63' }}>
        <div className="px-6 md:px-10 py-4 md:py-6 flex items-center justify-between"
             style={{ background: '#021F2F', borderBottom: '1px solid #1A4A63' }}>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-lg flex items-center justify-center"
                 style={{ background: 'rgba(124,58,237,0.2)' }}>
              <Code className="w-2.5 h-2.5 md:w-3 md:h-3" style={{ color: '#7C3AED' }} />
            </div>
            <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase" style={{ color: '#6F8FA6' }}>strategic_sync.ts</span>
          </div>
        </div>
        <div className="p-8 md:p-12 space-y-4 md:space-y-6 flex-1"
             style={{ background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.03))' }}>
          <div className="flex gap-4 md:gap-6">
            <span style={{ color: '#1A4A63' }}>01</span>
            <span style={{ color: '#00D4FF' }}>interface</span>
            <span style={{ color: '#FFD400' }}>StrategicAlignment</span>
            <span style={{ color: '#E8F0F8' }}>{"{"}</span>
          </div>
          <div className="flex gap-4 md:gap-6 pl-8 md:pl-12">
            <span style={{ color: '#1A4A63' }}>02</span>
            <span style={{ color: '#A9C0D4' }}>matchScore:</span>
            <span style={{ color: '#00E0C6' }}>0.98;</span>
          </div>
          <div className="flex gap-4 md:gap-6 pl-8 md:pl-12">
            <span style={{ color: '#1A4A63' }}>03</span>
            <span style={{ color: '#A9C0D4' }}>intentVerified:</span>
            <span style={{ color: '#00E0C6' }}>true;</span>
          </div>
          <div className="flex gap-4 md:gap-6">
            <span style={{ color: '#1A4A63' }}>04</span>
            <span style={{ color: '#E8F0F8' }}>{"}"}</span>
          </div>
        </div>
        <div className="p-6 md:p-8 flex justify-between items-center px-8 md:px-12"
             style={{ background: 'rgba(0,212,255,0.03)', borderTop: '1px solid #1A4A63' }}>
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00E0C6', boxShadow: '0 0 10px rgba(0,224,198,0.5)' }} />
            <div className="h-2 w-32 md:w-56 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>
          <Zap className="w-4 h-4 md:w-5 md:h-5 animate-pulse" style={{ color: '#00D4FF' }} />
        </div>
      </div>
    )
  },
  {
    id: "04",
    title: "Build Relationship with Founders.",
    description: "Build meaningful relationships with startup founders and gain access to valuable mentorship, guidance, and opportunities. Strong connections can open doors to collaborations, career growth, and future ventures within the startup ecosystem.",
    imageUrl: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1772101107/b4_final_a9ljua.png",
    color: "yellow",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative z-10 grid grid-cols-3 gap-4 md:gap-8">
          {[Briefcase, Globe, Scale, Target, Cpu, Layout].map((Icon, i) => (
            <motion.div
              key={i}
              className="w-16 h-16 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center group transition-all duration-500 shadow-2xl"
              style={{ background: '#032235', border: '1px solid #1A4A63' }}
            >
              <Icon className="w-6 h-6 md:w-10 md:h-10 transition-colors duration-500 group-hover:text-yellow-400"
                    style={{ color: '#245B77' }} />
            </motion.div>
          ))}
        </div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{ border: '1px dashed rgba(255,212,0,0.06)' }}
        />
      </div>
    )
  },
  {
    id: "05",
    title: "From Product Development to Market Strategy.",
    description: "Gain end-to-end exposure to the startup journey, from building products to shaping effective market strategies. Understand how ideas evolve into scalable solutions through real execution, user feedback, and strategic growth planning.",
    imageUrl: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1772101108/b5_final_eyf1bk.png",
    color: "cyan",
    visual: (
      <div className="w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 flex flex-col gap-6 md:gap-10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative"
           style={{ background: '#010E1D', border: '1px solid #1A4A63' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px]"
             style={{ background: 'rgba(0,212,255,0.04)' }} />
        <div className="flex justify-between items-end relative z-10">
          <div className="space-y-2 md:space-y-3">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#1A4A63' }}>Growth Metrics</span>
            <div className="text-3xl md:text-5xl font-bold flex items-center gap-3" style={{ color: '#E8F0F8' }}>
              +142.8%
              <div className="w-2 md:w-3 h-2 md:h-3 rounded-full"
                   style={{ background: '#00E0C6', boxShadow: '0 0 20px rgba(0,224,198,0.6)' }} />
            </div>
          </div>
          <div className="flex items-end gap-1.5 md:gap-2 h-16 md:h-24">
            {[0.4, 0.7, 0.5, 0.9, 0.6, 1, 0.8].map((h, i) => (
              <div key={i} className="w-2 md:w-4 rounded-t-lg"
                   style={{ height: `${h * 100}%`, background: 'rgba(0,212,255,0.7)', boxShadow: '0 0 20px rgba(0,212,255,0.15)' }} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-8 flex-1 relative z-10">
          <div className="rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 flex flex-col justify-between group transition-all duration-500"
               style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1A4A63' }}>
            <div className="flex justify-between items-start">
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest" style={{ color: '#6F8FA6' }}>Active Syncs</span>
              <BarChart3 className="w-4 h-4 md:w-6 md:h-6 transition-colors" style={{ color: 'rgba(0,212,255,0.4)' }} />
            </div>
            <span className="text-2xl md:text-4xl font-bold" style={{ color: '#E8F0F8' }}>124</span>
          </div>
          <div className="rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 flex flex-col justify-between shadow-2xl group hover:scale-[1.02] transition-transform duration-500"
               style={{ background: '#00D4FF', boxShadow: '0 20px 60px rgba(0,212,255,0.2)' }}>
            <div className="flex justify-between items-start">
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(1,14,29,0.7)' }}>Success Rate</span>
              <Zap className="w-4 h-4 md:w-6 md:h-6" style={{ color: 'rgba(1,14,29,0.8)' }} />
            </div>
            <span className="text-2xl md:text-4xl font-bold" style={{ color: '#010E1D' }}>98.4%</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "06",
    title: "Connect with Founders', Teams, and Future Collaborators.",
    description: "Network with founders, core teams, and like-minded professionals who are shaping the future. Build valuable connections that can lead to collaborations, opportunities, and long-term partnerships.",
    imageUrl: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1772101107/b6_final_vqfjkj.png",
    color: "teal",
    visual: (
      <div className="w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 shadow-2xl relative flex flex-col justify-center"
           style={{ background: '#010E1D', border: '1px solid #1A4A63' }}>
        <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.04) 0%, transparent 60%)' }} />
        </div>
        <div className="flex items-center justify-between mb-8 md:mb-12 relative z-10">
          <div className="space-y-3">
            <div className="h-6 md:h-10 w-32 md:w-56 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="h-2 md:h-3 w-20 md:w-32 rounded-full" style={{ background: 'rgba(255,255,255,0.03)' }} />
          </div>
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center"
               style={{ background: 'rgba(0,224,198,0.1)', border: '1px solid rgba(0,224,198,0.3)', boxShadow: '0 0 40px rgba(0,224,198,0.1)' }}>
            <ShieldCheck className="w-6 h-6 md:w-10 md:h-10" style={{ color: '#00E0C6' }} />
          </div>
        </div>
        <div className="space-y-6 md:space-y-10 relative z-10">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col items-center gap-3"
                   style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1A4A63' }}>
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-2xl flex items-center justify-center"
                     style={{ background: '#032235' }}>
                  <Users className="w-5 h-5 md:w-8 md:h-8" style={{ color: 'rgba(0,212,255,0.4)' }} />
                </div>
                <div className="h-1.5 md:h-2 w-10 md:w-16 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: "07",
    title: "Discover High-Growth Investment Opportunities Early.",
    description: "Gain early access to high-potential startups and emerging innovations before they scale. Connect directly with founders, evaluate opportunities closely, and invest where real growth is being built.",
    imageUrl: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1772101107/b7_final_rwr5dq.png",
    color: "teal",
    visual: (
      <div className="w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 flex flex-col gap-6 md:gap-10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative"
           style={{ background: '#010E1D', border: '1px solid #1A4A63' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px]"
             style={{ background: 'rgba(0,224,198,0.04)' }} />
        <div className="flex justify-between items-center relative z-10">
          <div className="space-y-2">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#1A4A63' }}>Growth Alignment</span>
            <div className="text-3xl md:text-5xl font-bold" style={{ color: '#E8F0F8' }}>Context Matched</div>
          </div>
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
               style={{ background: 'rgba(0,224,198,0.08)', border: '1px solid rgba(0,224,198,0.2)' }}>
            <Target className="w-8 h-8" style={{ color: '#00E0C6' }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-6 flex-1 relative z-10">
          {['Pilot Programs', 'Policy Integration', 'Validation Support', 'Strategic Capital'].map((item, i) => (
            <div key={i} className="rounded-2xl p-4 flex flex-col justify-center gap-2 group transition-all"
                 style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1A4A63' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#00E0C6' }} />
              <span className="text-xs font-bold transition-colors" style={{ color: '#6F8FA6' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
];

export const Benefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const check = () => {
      if (started) return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setStarted(true);
      }
    };
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [started]);

  React.useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % BENEFIT_DATA.length);
      }, 2000);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [started]);

  return (
    <div 
      ref={sectionRef} 
      className="relative"
      style={{ background: '#010E1D', color: '#E8F0F8' }}
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#A9C0D4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="pt-8 md:pt-16 px-6 md:px-12 z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="font-mono text-[10px] uppercase tracking-[0.4em]"
                style={{ color: '#00D4FF' }}
              >
                Core Value Proposition
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter" style={{ color: '#E8F0F8' }}>
                Key Strategic Benefits
              </h2>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-6 h-px w-full" style={{ background: '#1A4A63' }} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[2px] hidden md:block"
               style={{ background: '#1A4A63' }}>
            <motion.div 
              animate={{ scaleY: (currentIndex + 1) / BENEFIT_DATA.length }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 origin-top"
              style={{ background: '#00D4FF' }}
            />
            <motion.div 
              animate={{ top: `${((currentIndex + 1) / BENEFIT_DATA.length) * 100}%` }}
              transition={{ duration: 0.6 }}
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10 -mt-1.5"
              style={{ background: '#E8F0F8', border: '2px solid #00D4FF', boxShadow: '0 0 15px rgba(0,212,255,0.5)' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
            
            {/* Left Side: Text Content */}
            <div className="relative h-[350px] flex items-center perspective-1000">
              {BENEFIT_DATA.map((item, index) => {
                const isActive = index === currentIndex;
                const isPrev = index === (currentIndex - 1 + BENEFIT_DATA.length) % BENEFIT_DATA.length;
                const isNext = index === (currentIndex + 1) % BENEFIT_DATA.length;
                
                let opacity = 0;
                let yValue = 0;
                
                if (isActive) {
                  opacity = 1;
                  yValue = 0;
                } else if (isPrev) {
                  opacity = 0;
                  yValue = 100;
                } else if (isNext) {
                  opacity = 0;
                  yValue = -100;
                }

                return (
                  <motion.div
                    key={item.id}
                    animate={{ opacity, y: yValue }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col justify-center space-y-6"
                  >
                    <div className="space-y-4">
                      <motion.div className="flex items-center gap-4"
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                      >
                        <span className="font-mono font-bold text-lg tracking-widest block" style={{ color: '#00D4FF' }}>
                          {item.id}
                        </span>
                        <div className="h-px w-10" style={{ background: 'rgba(0,212,255,0.3)' }} />
                      </motion.div>
                      <motion.h3 
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
                        style={{ color: '#E8F0F8' }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p 
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-base md:text-lg leading-relaxed max-w-xl"
                        style={{ color: '#A9C0D4' }}
                      >
                        {item.description}
                      </motion.p>
                    </div>

                    <motion.div 
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 50 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      className="flex items-center gap-4"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Right Side: Visual Content */}
            <div className="relative aspect-[16/10] w-full perspective-2000">
              {BENEFIT_DATA.map((item, index) => {
                const isActive = index === currentIndex;
                const isPrev = index === (currentIndex - 1 + BENEFIT_DATA.length) % BENEFIT_DATA.length;
                const isNext = index === (currentIndex + 1) % BENEFIT_DATA.length;
                
                let opacity = 0;
                let yValue = 0;
                let scaleValue = 0.7;
                
                if (isActive) {
                  opacity = 1;
                  yValue = 0;
                  scaleValue = 1;
                } else if (isPrev) {
                  opacity = 0;
                  yValue = 200;
                  scaleValue = 0.7;
                } else if (isNext) {
                  opacity = 0;
                  yValue = -200;
                  scaleValue = 0.7;
                }

                return (
                  <motion.div
                    key={item.id}
                    animate={{ opacity, y: yValue, scale: scaleValue }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group"
                    style={{ background: '#021F2F', border: '1px solid #1A4A63' }}
                  >
                    {/* Image Background */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #021F2F, rgba(2,31,47,0.3), transparent)' }} />
                      <div className="absolute inset-0" style={{ background: 'rgba(1,14,29,0.3)' }} />
                    </div>
                    
                    <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, transparent 60%)' }} />
                    
                    <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 z-20">
                      <motion.div
                        animate={{ y: isActive ? 0 : 40 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full"
                      >
                        {item.visual}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to allow scrolling */}
      <div style={{ height: '800vh' }} />
    </div>
  );
};