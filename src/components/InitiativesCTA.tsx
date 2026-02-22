import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function InitiativesCTA() {
  return (
    <section className="cta-banner">
      <div className="cta-glow" />
      <div className="cta-content">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Start Your Journey
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="cta-title"
        >
          Ready to Join an Initiative?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="cta-body"
        >
          Apply to a project, connect with a team, and start contributing to the NX Research ecosystem today.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="cta-btns"
        >
          <button className="btn-primary">Apply Now <ArrowRight size={16} /></button>
          <button className="btn-secondary">Talk to Us</button>
        </motion.div>
      </div>
    </section>
  );
}
