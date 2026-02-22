import React from "react";
import { motion } from "motion/react";
import { Users, FolderOpen, Globe, TrendingUp } from "lucide-react";

const outcomes = [
  { icon: <Users size={24} />, title: "Join Real Teams", desc: "Work alongside active researchers & founders." },
  { icon: <FolderOpen size={24} />, title: "Build Your Portfolio", desc: "Document real contributions to live projects." },
  { icon: <Globe size={24} />, title: "Access Ecosystem", desc: "Tools, mentors, network all in one place." },
  { icon: <TrendingUp size={24} />, title: "Accelerate Growth", desc: "Faster learning curve through structured collaboration." },
];

export default function InitiativesOutcomes() {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-label">After You Connect</div>
        <h2 className="section-title">Long-term Outcomes</h2>
      </div>
      <div className="outcomes-grid">
        {outcomes.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="outcome-card"
          >
            <div className="outcome-icon">{item.icon}</div>
            <h3 className="outcome-title">{item.title}</h3>
            <p className="outcome-desc">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
