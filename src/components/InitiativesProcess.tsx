import React from "react";
import { motion } from "motion/react";

const processSteps = [
  { step: "01", title: "Apply", desc: "Submit your profile and interests." },
  { step: "02", title: "Screening", desc: "Initial review of skills and fit." },
  { step: "03", title: "Selection", desc: "Interview with project leads." },
  { step: "04", title: "Assignment", desc: "Onboarding to a specific team." },
  { step: "05", title: "Contribution", desc: "Start building and impacting." },
];

export default function InitiativesProcess() {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-label">The Process</div>
        <h2 className="section-title">Your Journey to Impact</h2>
      </div>
      
      <div className="process-timeline">
        {/* Desktop Timeline */}
        <div className="desk-timeline">
          <div className="center-line">
            <div className="line-dot" />
          </div>
          {processSteps.map((step, i) => {
            const isTop = i % 2 === 0;
            const col = i + 1;
            return (
              <React.Fragment key={i}>
                {isTop ? (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      style={{ gridColumn: col, gridRow: 1 }}
                    >
                      <div className="step-card">
                        <div className="step-num">{step.step}</div>
                        <div className="step-title">{step.title}</div>
                        <div className="step-desc">{step.desc}</div>
                      </div>
                    </motion.div>
                    <div className="stem stem-top" style={{ gridColumn: col }} />
                    <div className="node-dot" style={{ gridColumn: col }} />
                  </>
                ) : (
                  <>
                    <div className="node-dot" style={{ gridColumn: col }} />
                    <div className="stem stem-bot" style={{ gridColumn: col }} />
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      style={{ gridColumn: col, gridRow: 5 }}
                    >
                      <div className="step-card">
                        <div className="step-num">{step.step}</div>
                        <div className="step-title">{step.title}</div>
                        <div className="step-desc">{step.desc}</div>
                      </div>
                    </motion.div>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Timeline */}
        <div className="mob-timeline">
          {processSteps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="mob-step"
            >
              <div className="mob-left">
                <div className="mob-circle">{step.step}</div>
                <div className="mob-line" />
              </div>
              <div className="mob-content">
                <div className="mob-title">{step.title}</div>
                <div className="mob-desc">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
