import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Rocket, Activity, ShieldCheck, Brain, Zap, Link2, Map } from "lucide-react";

const Counter = ({ value, label }: { value: string, label: string }) => {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract numeric part (including decimals) and non-numeric part
  const target = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const hasDecimal = value.includes('.');

  useEffect(() => {
    if (isInView && !isNaN(target)) {
      let start = 0;
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
    <div ref={ref} className="stat-card">
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
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
    <section className="impact-section">
      <div className="stats-grid">
        <Counter value="120+" label="Startups" />
        <Counter value="340+" label="Founders" />
        <Counter value="2.8K+" label="Learners" />
        <Counter value="80+" label="Investors" />
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="startup-card">
              <div className="startup-icon" style={{ background: `${item.color}20`, color: item.color }}>
                {item.icon}
              </div>
              <div className="startup-info">
                <div className="startup-name">{item.name}</div>
                <div className="startup-tag">{item.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
