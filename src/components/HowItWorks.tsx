import React from "react";
import { motion } from "motion/react";
import {
  Lightbulb,
  Zap,
  Search,
  Crown,
  Rocket,
} from "lucide-react";

const stages = [
  {
    title: "Initiatives",
    desc: "Identifying core problems and opportunities.",
    icon: Lightbulb,
  },
  {
    title: "Empowerment",
    desc: "Equipping builders with tools and knowledge.",
    icon: Zap,
  },
  {
    title: "Research",
    desc: "Deep diving into data and innovation.",
    icon: Search,
  },
  {
    title: "Founder Circle",
    desc: "Joining the elite network of builders.",
    icon: Crown,
  },
  {
    title: "Startup Launch",
    desc: "Bringing ventures to the real world.",
    icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <>
      <style>{`
        /* ── MOBILE vertical timeline ── */
        .mob-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }

        .mob-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          position: relative;
        }

        /* vertical line running through left column */
        .mob-item:not(:last-child) .mob-left::after {
          content: '';
          position: absolute;
          top: 40px;        /* below the circle */
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          bottom: -8px;
          background: linear-gradient(to bottom, rgba(0,212,255,0.4), rgba(0,212,255,0.08));
        }

        .mob-left {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 40px;
        }

        .mob-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,212,255,0.3);
          background: #060a10;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00d4ff;
          position: relative;
          flex-shrink: 0;
        }

        .mob-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00d4ff;
          color: #060a10;
          font-size: 8px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          box-shadow: 0 0 8px rgba(0,212,255,0.5);
        }

        .mob-content {
          padding-bottom: 24px;
          padding-top: 6px;
        }

        .mob-title {
          font-size: 13px;
          font-weight: 700;
          color: #e8f4f8;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 3px;
          font-family: 'Syne', sans-serif;
        }

        .mob-desc {
          font-size: 10px;
          color: rgba(160,200,215,0.5);
          line-height: 1.65;
          font-family: 'Space Mono', monospace;
          max-width: 220px;
        }

        @media (min-width: 1024px) {
          .mob-list { display: none; }
        }
        @media (min-width: 1024px) {
          .desk-block { display: flex !important; }
        }
        .desk-block { display: none; }
      `}</style>

      <section
        id="how-it-works"
        className="py-20 lg:py-32 overflow-hidden"
        style={{ background: "#060a10" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-16 lg:mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(26px, 5vw, 52px)",
                fontWeight: 800,
                color: "#e8f4f8",
                textTransform: "uppercase",
                letterSpacing: "-1.5px",
              }}
            >
              How NX Research Works
            </motion.h2>
          </div>

          {/* ═══════════════ MOBILE vertical timeline ═══════════════ */}
          <div className="mob-list lg:hidden">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.title}
                  className="mob-item"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Left: circle + vertical line */}
                  <div className="mob-left">
                    <motion.div
                      className="mob-circle"
                      whileInView={{
                        borderColor: [
                          "rgba(0,212,255,0.2)",
                          "rgba(0,212,255,0.9)",
                          "rgba(0,212,255,0.2)",
                        ],
                        boxShadow: [
                          "0 0 0px rgba(0,212,255,0)",
                          "0 0 14px rgba(0,212,255,0.4)",
                          "0 0 0px rgba(0,212,255,0)",
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <Icon size={18} />
                      <span className="mob-badge">{index + 1}</span>
                    </motion.div>
                  </div>

                  {/* Right: text */}
                  <div className="mob-content">
                    <div className="mob-title">{stage.title}</div>
                    <div className="mob-desc">{stage.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ═══════════════ DESKTOP wave layout ═══════════════ */}
          <div
            className="desk-block relative min-h-[400px] items-center"
            style={{ display: "none" }}
          >
            {/* Curved path */}
            <div className="absolute inset-0 z-0">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1200 400"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 100 200 Q 300 50 600 200 T 1100 200"
                  stroke="#00d4ff"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                  strokeDasharray="10 10"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                <motion.circle
                  r="4"
                  fill="#00d4ff"
                  initial={{ offsetDistance: "0%" } as any}
                  animate={{ offsetDistance: "100%" } as any}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{
                    offsetPath: "path('M 100 200 Q 300 50 600 200 T 1100 200')",
                  } as any}
                />
              </svg>
            </div>

            <div className="flex flex-row items-center justify-between gap-0 relative z-10 w-full">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.3, duration: 0.5, ease: "easeOut" }}
                    className={`flex flex-col items-center text-center group ${
                      index % 2 === 0 ? "lg:-translate-y-16" : "lg:translate-y-16"
                    }`}
                  >
                    <div className="relative mb-6">
                      <motion.div
                        whileInView={{
                          borderColor: [
                            "rgba(0,212,255,0.2)",
                            "rgba(0,212,255,1)",
                            "rgba(0,212,255,0.2)",
                          ],
                          boxShadow: [
                            "0 0 0px rgba(0,212,255,0)",
                            "0 0 20px rgba(0,212,255,0.4)",
                            "0 0 0px rgba(0,212,255,0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          border: "2px solid rgba(0,212,255,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#060a10",
                          color: "#00d4ff",
                          position: "relative",
                        }}
                      >
                        <Icon size={28} />
                      </motion.div>
                      <div
                        style={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: "#00d4ff",
                          color: "#060a10",
                          fontSize: 11,
                          fontWeight: 800,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Space Mono', monospace",
                          boxShadow: "0 0 10px rgba(0,212,255,0.5)",
                        }}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <h3
                      style={{
                        color: "#e8f4f8",
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 600,
                        fontSize: 14,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: 8,
                      }}
                    >
                      {stage.title}
                    </h3>
                    <p
                      style={{
                        color: "rgba(160,200,215,0.5)",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 11,
                        lineHeight: 1.75,
                        maxWidth: 140,
                      }}
                    >
                      {stage.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}