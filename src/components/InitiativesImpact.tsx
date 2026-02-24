import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Rocket, Activity, ShieldCheck, Brain, Zap, Link2, Map } from "lucide-react";

const Counter = ({ value, label, color }: { value: string, label: string, color: string }) => {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract numeric part (including decimals) and non-numeric part
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
  { name: "AeroFlow", tag: "#deeptech", icon: <Rocket size={16} />, color: "#00d4ff" },
  { name: "BioSync", tag: "#health", icon: <Activity size={16} />, color: "#00ffcc" },
  { name: "CyberNode", tag: "#security", icon: <ShieldCheck size={16} />, color: "#7b2fff" },
  { name: "DataMesh", tag: "#ai", icon: <Brain size={16} />, color: "#ffd700" },
  { name: "EcoGrid", tag: "#energy", icon: <Zap size={16} />, color: "#00d4ff" },
  { name: "FinLink", tag: "#fintech", icon: <Link2 size={16} />, color: "#00ffcc" },
  { name: "GeoMap", tag: "#spatial", icon: <Map size={16} />, color: "#7b2fff" },
  { name: "HydroGen", tag: "#sustainability", icon: <Activity size={16} />, color: "#ffd700" },
];

export default function InitiativesImpact() {
  return (
    <section className="relative z-10">
      <div className="border-y border-white/5 bg-bg-secondary/50 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Learners", value: "5000+", color: "text-neon-cyan" },
              { label: "Founders", value: "250+", color: "text-teal" },
              { label: "Startups", value: "200+", color: "text-gold" },
              { label: "Investors", value: "300+", color: "text-neon-purple" },
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

      {/* Project Marquee */}
      <div className="py-8 bg-bg-primary/50 overflow-hidden border-b border-white/5">
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center px-6"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                  <span style={{ color: item.color }}>{item.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary uppercase tracking-wider">{item.name}</span>
                  <span className="text-[9px] font-mono text-text-secondary uppercase tracking-[0.2em]">{item.tag}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
