import { motion } from "motion/react";
import { Users, Search, Target, Scale, Briefcase } from "lucide-react";
import { Section } from "./ui/Section";
import { useState, useEffect } from "react";

export const NetworkVisual = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const multiplier = isMobile ? 0.5 : 1;

  const items = [
    { label: "Founders", icon: Users, x: -300 * multiplier, y: isMobile ? 200 : 300 },
    { label: "Researchers", icon: Search, x: -150 * multiplier, y: isMobile ? 250 : 350 },
    { label: "Investors", icon: Target, x: 0, y: isMobile ? 280 : 380 },
    { label: "Policy Experts", icon: Scale, x: 150 * multiplier, y: isMobile ? 250 : 350 },
    { label: "Industry Leaders", icon: Briefcase, x: 300 * multiplier, y: isMobile ? 200 : 300 },
  ];

  return (
    <Section className="relative overflow-hidden min-h-[700px] md:min-h-[900px] flex flex-col justify-start pt-20 md:pt-32">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-32"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">The Ecosystem</h2>
        <p className="text-zinc-500 font-mono text-[10px] md:text-sm uppercase tracking-widest">Intentional Conversations • Structured Outcomes</p>
      </motion.div>

      <div className="relative h-[400px] md:h-[600px] flex items-start justify-center">
        {/* Central Hub - FC Node */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-blue-600/20 border-2 border-blue-400/50 flex flex-col items-center justify-center z-20 shadow-[0_0_60px_rgba(59,130,246,0.4)] relative"
        >
          <div className="absolute inset-0 rounded-full bg-blue-400/10 animate-pulse" />
          <span className="text-xl md:text-3xl font-bold text-white relative z-10">FCC</span>
          <span className="text-[8px] md:text-xs font-mono text-blue-300/70 mt-1 md:mt-2 relative z-10 uppercase tracking-widest">Founder Circle</span>
          <span className="text-[8px] md:text-xs font-mono text-blue-300/70 mt-1 md:mt-2 relative z-10 uppercase tracking-widest">Connect</span>
        </motion.div>

        {/* Connection Lines and Particles */}
        <svg className="absolute top-0 left-1/2 w-px h-full pointer-events-none overflow-visible">
          <defs>
            <filter id="blueGlow">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {items.map((item, i) => {
            const targetY = isMobile ? 48 : 80; 
            return (
              <g key={`connection-${i}`}>
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1 + i * 0.1 }}
                  d={`M ${item.x} ${item.y} Q ${item.x / 2} ${item.y / 2} 0 ${targetY}`}
                  fill="none"
                  stroke="url(#blueGradient)"
                  strokeWidth={isMobile ? "1" : "2"}
                  strokeDasharray="6 6"
                />
                
                <motion.circle
                  r={isMobile ? "3" : "5"}
                  fill="#60a5fa"
                  filter="url(#blueGlow)"
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{ 
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                  style={{
                    offsetPath: `path('M ${item.x} ${item.y} Q ${item.x / 2} ${item.y / 2} 0 ${targetY}')`,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Category Nodes */}
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 0 }}
            whileInView={{ x: item.x, y: item.y, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1, duration: 1, type: "spring", bounce: 0.3 }}
            className="absolute z-10 flex flex-col items-center gap-2 md:gap-4"
          >
            <motion.div 
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(59,130,246,0.6)" }}
              className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center group transition-all duration-300 cursor-default shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            >
              <item.icon className="w-4 h-4 md:w-8 md:h-8 text-blue-400 group-hover:text-white transition-colors" />
            </motion.div>
            <span className="text-[8px] md:text-xs font-mono font-bold text-blue-200/80 uppercase tracking-widest text-center max-w-[60px] md:max-w-[100px] leading-tight">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
        className="text-center mt-12 md:mt-24"
      >
        <p className="text-zinc-400 max-w-md mx-auto leading-relaxed text-xs md:text-base italic px-4">
          A focused ecosystem where conversations are intentional and outcomes are structured.
        </p>
      </motion.div>
    </Section>
  );
};
