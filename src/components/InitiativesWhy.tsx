import React from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function InitiativesWhy() {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-label">Why NX Initiatives</div>
        <h2 className="section-title">Guided Connection</h2>
      </div>
      <div className="why-layout">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="why-col"
        >
          <div className="why-item">
            <CheckCircle2 size={18} className="why-bullet" />
            <div>
              <div className="why-item-title">Right Team Fit</div>
              <div className="why-item-desc">Matched by skills, goals, and project needs — not just availability.</div>
            </div>
          </div>
          <div className="why-item">
            <CheckCircle2 size={18} className="why-bullet" />
            <div>
              <div className="why-item-title">Faster Progress</div>
              <div className="why-item-desc">Structured onboarding means you contribute from day one.</div>
            </div>
          </div>
          <div className="why-item">
            <CheckCircle2 size={18} className="why-bullet" />
            <div>
              <div className="why-item-title">Reduced Failure Risk</div>
              <div className="why-item-desc">Guided pathways reduce uncertainty for both teams and applicants.</div>
            </div>
          </div>
        </motion.div>
        
        <div className="why-divider" />

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="why-col"
        >
          <div className="why-item">
            <CheckCircle2 size={18} className="why-bullet" />
            <div>
              <div className="why-item-title">Mentorship Access</div>
              <div className="why-item-desc">Senior researchers and founders guide your journey.</div>
            </div>
          </div>
          <div className="why-item">
            <CheckCircle2 size={18} className="why-bullet" />
            <div>
              <div className="why-item-title">Clear Direction</div>
              <div className="why-item-desc">Every initiative has defined milestones and deliverables.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
