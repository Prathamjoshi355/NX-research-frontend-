import React from "react";
import { motion } from "motion/react";
import { Link2, Zap, Map, Rocket, Brain } from "lucide-react";

const whatWeDo = [
  { icon: <Link2 size={24} />, title: "Connect Talent", desc: "Match builders with real active projects inside NX Research." },
  { icon: <Zap size={24} />, title: "Enable Collaboration", desc: "Break silos — bring researchers, founders, and learners together." },
  { icon: <Map size={24} />, title: "Structured Pathways", desc: "No random networking. Every connection has purpose and direction." },
  { icon: <Rocket size={24} />, title: "Fuel Innovation", desc: "Fast-track ideas from concept to execution through team support." },
  { icon: <Brain size={24} />, title: "Develop Skills", desc: "Learn by doing — contribute to live projects and grow your portfolio." },
];

export default function InitiativesWhatWeDo() {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-label">What We Do</div>
        <h2 className="section-title">Bridging the Gap</h2>
      </div>
      <div className="what-grid">
        {whatWeDo.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="what-card"
          >
            <div className="what-icon">{item.icon}</div>
            <h3 className="what-title">{item.title}</h3>
            <p className="what-desc">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
