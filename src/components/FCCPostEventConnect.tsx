import { motion } from "motion/react";

export const PostEventConnect = () => {
  const steps = [
    { step: "01", title: "Network and Collaboration", desc: "Define your goals and what you bring to the table.", accent: "#00D4FF" },
    { step: "02", title: "Structured Match Review", desc: "Our team evaluates alignment with other participants.", accent: "#7C3AED" },
    { step: "03", title: "Founder Approval", desc: "Both parties review and approve the connection.", accent: "#FFD400" },
    { step: "04", title: "Scheduled Strategic Introduction", desc: "A curated meeting is set up for high-clarity discussion.", accent: "#00E0C6" },
  ];

  return (
    <section style={{ backgroundColor: "#00060D", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
      
      {/* Deep ambient background glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,255,0.04) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 80% 100%, rgba(124,58,237,0.05) 0%, transparent 60%)",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <h2 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            marginBottom: "12px",
            color: "#C8DCF0",
            letterSpacing: "-0.02em",
          }}>
            Post-Session Connection
          </h2>
          <p style={{ color: "#3D6278", fontSize: "0.95rem" }}>
            How we facilitate connections after the event.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", position: "relative" }}>
          
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
            style={{
              display: "none",
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #0D2E3F, #0D2E3F, transparent)",
              transform: "translateY(-50%)",
              transformOrigin: "left",
              zIndex: 0,
            }}
            className="lg-line"
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              style={{ position: "relative", zIndex: 1 }}
            >
              <div
                style={{
                  backgroundColor: "#010B14",
                  border: "1px solid #0C2233",
                  borderRadius: "20px",
                  padding: "32px 28px",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.backgroundColor = "#030F1C";
                  el.style.borderColor = "#142D40";
                  el.style.boxShadow = `0 0 40px -10px ${step.accent}22, 0 20px 60px -20px #000`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.backgroundColor = "#010B14";
                  el.style.borderColor = "#0C2233";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Accent top line */}
                <div style={{
                  position: "absolute", top: 0, left: "24px", right: "24px",
                  height: "2px", borderRadius: "0 0 4px 4px",
                  background: `linear-gradient(90deg, transparent, ${step.accent}80, transparent)`,
                }} />

                {/* Faint inner corner glow */}
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: "80px", height: "80px", pointerEvents: "none",
                  background: `radial-gradient(circle at top right, ${step.accent}10, transparent 70%)`,
                }} />

                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  style={{
                    display: "block",
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    fontFamily: "monospace",
                    color: "#071520",
                    marginBottom: "20px",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {step.step}
                </motion.span>

                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                  color: "#C8DCF0",
                  lineHeight: 1.3,
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: "0.83rem",
                  lineHeight: 1.7,
                  color: "#2E5266",
                }}>
                  {step.desc}
                </p>

                {/* Bottom accent dot */}
                <div style={{
                  position: "absolute", bottom: "20px", right: "20px",
                  width: "6px", height: "6px", borderRadius: "50%",
                  backgroundColor: step.accent,
                  opacity: 0.4,
                  boxShadow: `0 0 8px 2px ${step.accent}`,
                }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA removed */}
      </div>
    </section>
  );
};