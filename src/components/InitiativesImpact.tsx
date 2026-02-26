import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Rocket, Activity, ShieldCheck, Brain, Zap, Link2, Map } from "lucide-react";

const Counter = ({ value, label, color }: { value: string, label: string, color: string }) => {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const target = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const hasDecimal = value.includes('.');

  useEffect(() => {
    if (isInView && !isNaN(target)) {
      const duration = 2000;
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const current = easeOutExpo * target;
        
        setCount(hasDecimal ? current.toFixed(1) : Math.floor(current).toString());

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }
  }, [isInView, target, hasDecimal]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center cursor-default group">
      <span className={`text-3xl md:text-4xl font-black ${color} tracking-tighter transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]`}>
        {count}{suffix}
      </span>
      <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mt-1 group-hover:text-text-primary transition-colors">
        {label}
      </span>
    </div>
  );
};

const marqueeItems = [
  { name: "NexisparkX Technologies", tag: "Tech", icon: <Rocket size={16} />, color: "#00d4ff" },
  { name: "Tastyaana", tag: "Quick Commerce", icon: <Activity size={16} />, color: "#00ffcc" },
  { name: "Event Dhara", tag: "Event Management", icon: <ShieldCheck size={16} />, color: "#7b2fff" },
  { name: "Vyorai", tag: "AI Development", icon: <Brain size={16} />, color: "#ffd700" },
];

export default function InitiativesImpact() {
  return (
    <section className="relative z-10">
      {/* Keyframe injection */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 28s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="border-y border-white/5 bg-bg-secondary/50 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Learners", value: "30+", color: "text-neon-cyan" },
              { label: "Founders", value: "8", color: "text-teal" },
              { label: "Startups", value: "4", color: "text-gold" },
              { label: "Investors", value: "6", color: "text-neon-purple" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Counter value={stat.value} label={stat.label} color={stat.color} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Seamless Infinite Marquee */}
      <div className="py-8 bg-bg-primary/50 overflow-hidden border-b border-white/5">
        {/*
          Key trick for seamless loop:
          - Render the list TWICE side by side inside .marquee-track
          - Animate translateX from 0 → -50% (exactly one copy width)
          - CSS resets to 0 instantly → visually seamless, no jump
        */}
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-default mx-10">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                <span style={{ color: item.color }}>{item.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-primary uppercase tracking-wider">{item.name}</span>
                <span className="text-[9px] font-mono text-text-secondary uppercase tracking-[0.2em]">{item.tag}</span>
              </div>
              {/* Subtle divider between items */}
              <span className="ml-8 text-white/10 select-none">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}