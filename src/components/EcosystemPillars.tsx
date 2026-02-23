import React from "react";
import { motion } from "motion/react";
import { Lightbulb, Zap, Shield, Briefcase, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    name: "Initiatives",
    icon: Lightbulb,
    desc: "Identifying core problems and opportunities to drive meaningful impact.",
    step: "01",
    href: "/initiatives",
  },
  {
    name: "Empowerment & Transformation",
    icon: Zap,
    desc: "Equipping builders with tools and knowledge for lasting change.",
    step: "02",
    href: "/empowerment",
  },
  {
    name: "Government Research",
    icon: Shield,
    desc: "Deep diving into data and policy-driven innovation.",
    step: "03",
    href: "/gov-research",
  },
  {
    name: "Private Research",
    icon: Briefcase,
    desc: "Unlocking insights through advanced analytical frameworks.",
    step: "04",
    href: "/private-research",
  },
  {
    name: "Founder Circle",
    icon: Crown,
    desc: "Joining the elite network of visionary builders.",
    step: "05",
    href: "/founder-circle",
  },
];

export default function EcosystemPillars() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .nx-wrap {
          background: #060a10;
          position: relative;
          overflow: hidden;
          padding: 80px 24px 100px;
          font-family: 'Syne', sans-serif;
        }
        .nx-wrap::before {
          content: '';
          position: absolute;
          top: -10%; left: 50%;
          transform: translateX(-50%);
          width: 900px; height: 500px;
          background: radial-gradient(ellipse, rgba(0,212,255,0.055) 0%, transparent 70%);
          pointer-events: none;
        }
        .nx-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .nx-inner {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* HEADER */
        .nx-tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px; letter-spacing: 5px;
          color: #00d4ff; text-transform: uppercase;
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 12px;
        }
        .nx-tag::before {
          content: ''; width: 28px; height: 1px;
          background: #00d4ff; opacity: 0.5;
        }
        .nx-title {
          font-size: clamp(28px, 5vw, 50px);
          font-weight: 800; color: #e8f4f8;
          letter-spacing: -2px; text-transform: uppercase;
          line-height: 1; margin-bottom: 0;
        }
        .nx-title span {
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,212,255,0.4);
        }

        /* CARD */
        .nx-card {
          background: rgba(8, 18, 32, 0.85);
          border: 1px solid rgba(0,212,255,0.12);
          border-radius: 14px; padding: 22px 18px;
          backdrop-filter: blur(12px);
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          position: relative; overflow: hidden;
        }
        .nx-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,212,255,0.05) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .nx-card:hover {
          border-color: rgba(0,212,255,0.38);
          box-shadow: 0 0 36px rgba(0,212,255,0.1), inset 0 0 16px rgba(0,212,255,0.03);
          transform: translateY(-4px);
        }
        .nx-card:hover::before { opacity: 1; }
        .nx-card-step {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 3px;
          color: rgba(0,212,255,0.3); margin-bottom: 12px;
        }
        .nx-icon {
          color: #00d4ff; margin-bottom: 14px;
          transition: transform 0.3s, filter 0.3s;
        }
        .nx-card:hover .nx-icon {
          transform: scale(1.15);
          filter: brightness(1.3) drop-shadow(0 0 6px rgba(0,212,255,0.6));
        }
        .nx-card-name {
          font-size: 13.5px; font-weight: 700; color: #e8f4f8;
          letter-spacing: -0.3px; line-height: 1.3; margin-bottom: 8px;
        }
        .nx-card-desc {
          font-family: 'Space Mono', monospace;
          font-size: 10px; color: rgba(160,200,215,0.5); line-height: 1.8;
        }

        /* ═══════════════════════════════════════════════
           DESKTOP TIMELINE  (≥ 768px)
           
           Grid: 3 rows × 5 cols
           Row 1 (top-zone):  top cards sit here
           Row 2 (mid-zone):  center line + dots + stems
           Row 3 (bot-zone):  bottom cards sit here
        ═══════════════════════════════════════════════ */
        .nx-timeline { display: none; }

        @media (min-width: 768px) {
          .nx-timeline {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            /* top-cards | stem-top | dot-row | stem-bot | bottom-cards */
            grid-template-rows: 1fr 48px 20px 48px 1fr;
            margin-top: 80px;
            min-height: 460px;
            position: relative;
          }

          /* THE CENTER LINE spans all 5 cols on row 3 */
          .nx-center-line {
            grid-column: 1 / -1;
            grid-row: 3;
            align-self: center;
            height: 2px;
            background: linear-gradient(
              to right,
              transparent 0%,
              rgba(0,212,255,0.12) 4%,
              rgba(0,212,255,0.45) 50%,
              rgba(0,212,255,0.12) 96%,
              transparent 100%
            );
            position: relative;
            z-index: 1;
          }
          .nx-line-pulse {
            position: absolute;
            top: 50%; left: -60px;
            width: 60px; height: 2px;
            background: linear-gradient(to right, transparent, #00d4ff, transparent);
            transform: translateY(-50%);
            box-shadow: 0 0 12px 3px rgba(0,212,255,0.45);
            animation: linePulse 3.5s ease-in-out infinite;
          }
          @keyframes linePulse {
            0%   { left: -60px; opacity: 0; }
            8%   { opacity: 1; }
            92%  { opacity: 1; }
            100% { left: calc(100% + 60px); opacity: 0; }
          }

          /* Each pillar col */
          .nx-col {
            display: contents; /* children placed in grid directly */
          }

          /* TOP card: row 1, align to bottom of that row */
          .nx-top-card {
            grid-row: 1;
            align-self: end;
            padding: 0 8px;
            z-index: 2;
          }

          /* TOP stem: row 2 */
          .nx-top-stem {
            grid-row: 2;
            justify-self: center;
            width: 1px;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0,212,255,0.45), rgba(0,212,255,0.15));
          }

          /* DOT: row 3, centered */
          .nx-dot {
            grid-row: 3;
            justify-self: center;
            align-self: center;
            width: 10px; height: 10px;
            border-radius: 50%;
            background: #00d4ff;
            box-shadow: 0 0 0 4px rgba(0,212,255,0.12), 0 0 14px rgba(0,212,255,0.5);
            z-index: 2;
          }

          /* BOTTOM stem: row 4 */
          .nx-bot-stem {
            grid-row: 4;
            justify-self: center;
            width: 1px;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0,212,255,0.15), rgba(0,212,255,0.45));
          }

          /* BOTTOM card: row 5, align to top of that row */
          .nx-bot-card {
            grid-row: 5;
            align-self: start;
            padding: 0 8px;
            z-index: 2;
          }

          /* Empty spacer cells for top slots (no bottom card) */
          .nx-empty-bot { grid-row: 4 / 6; }
          /* Empty spacer cells for bottom slots (no top card) */
          .nx-empty-top { grid-row: 1 / 3; }
        }

        /* MOBILE GRID */
        .nx-mobile {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 48px;
        }
        @media (min-width: 480px) {
          .nx-mobile {
            grid-template-columns: 1fr 1fr;
          }
        }
        .nx-mobile .nx-card { height: 100%; }
        .nx-mobile-item:last-child { grid-column: 1 / -1; }
        @media (min-width: 768px) { .nx-mobile { display: none; } }

        /* Footer */
        .nx-foot {
          margin-top: 56px;
          display: flex; align-items: center; gap: 14px;
        }
        .nx-foot-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 4px;
          color: rgba(0,212,255,0.22);
          text-transform: uppercase; white-space: nowrap;
        }
        .nx-foot-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, rgba(0,212,255,0.18), transparent);
        }
      `}</style>

      <section className="nx-wrap">
        <div className="nx-grid" />
        <div className="nx-inner">

          {/* Header */}
          <motion.div className="nx-tag"
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}>
            Our Pillars
          </motion.div>
          <motion.h2 className="nx-title"
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}>
            The NX <span>Ecosystem</span>
          </motion.h2>

          {/* ── DESKTOP TIMELINE ── */}
          <div className="nx-timeline">

            {/* Center line (row 3, spans all cols) */}
            <div className="nx-center-line" style={{ gridColumn: "1 / -1" }}>
              <div className="nx-line-pulse" />
            </div>

            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const isTop = i % 2 === 0; // 01,03,05 = top | 02,04 = bottom
              const col = i + 1;
              const delay = i * 0.12;

              return (
                <React.Fragment key={pillar.name}>
                  {isTop ? (
                    <>
                      {/* Card sits ABOVE the line */}
                      <motion.div
                        id={pillar.href.includes("#") ? pillar.href.split("#")[1] : undefined}
                        className="nx-top-card"
                        style={{ gridColumn: col }}
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay, duration: 0.65, ease: [0.16,1,0.3,1] }}
                      >
                        <Link to={pillar.href} className="nx-card" style={{ display: 'block', textDecoration: 'none' }}>
                          <div className="nx-card-step">{pillar.step}</div>
                          <div className="nx-icon"><Icon size={26} /></div>
                          <h3 className="nx-card-name">{pillar.name}</h3>
                          <p className="nx-card-desc">{pillar.desc}</p>
                        </Link>
                      </motion.div>

                      {/* Stem top → dot */}
                      <motion.div className="nx-top-stem" style={{ gridColumn: col }}
                        initial={{ scaleY: 0, transformOrigin: "bottom" }}
                        whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                        transition={{ delay: delay + 0.35, duration: 0.35 }} />

                      {/* Dot on line */}
                      <motion.div className="nx-dot" style={{ gridColumn: col }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                        transition={{ delay: delay + 0.55, duration: 0.28 }} />

                      {/* Empty bottom half */}
                      <div className="nx-empty-bot" style={{ gridColumn: col }} />
                    </>
                  ) : (
                    <>
                      {/* Empty top half */}
                      <div className="nx-empty-top" style={{ gridColumn: col }} />

                      {/* Dot on line */}
                      <motion.div className="nx-dot" style={{ gridColumn: col }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                        transition={{ delay: delay + 0.55, duration: 0.28 }} />

                      {/* Stem dot → card */}
                      <motion.div className="nx-bot-stem" style={{ gridColumn: col }}
                        initial={{ scaleY: 0, transformOrigin: "top" }}
                        whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                        transition={{ delay: delay + 0.35, duration: 0.35 }} />

                      {/* Card sits BELOW the line */}
                      <motion.div
                        id={pillar.href.includes("#") ? pillar.href.split("#")[1] : undefined}
                        className="nx-bot-card"
                        style={{ gridColumn: col }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay, duration: 0.65, ease: [0.16,1,0.3,1] }}
                      >
                        <Link to={pillar.href} className="nx-card" style={{ display: 'block', textDecoration: 'none' }}>
                          <div className="nx-card-step">{pillar.step}</div>
                          <div className="nx-icon"><Icon size={26} /></div>
                          <h3 className="nx-card-name">{pillar.name}</h3>
                          <p className="nx-card-desc">{pillar.desc}</p>
                        </Link>
                      </motion.div>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* ── MOBILE 2x2+1 GRID ── */}
          <div className="nx-mobile">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.name} className="nx-mobile-item">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16,1,0.3,1] }}>
                    <Link to={pillar.href} className="nx-card" style={{ display: 'block', textDecoration: 'none' }}>
                      <div className="nx-card-step">{pillar.step}</div>
                      <div className="nx-icon"><Icon size={22} /></div>
                      <h3 className="nx-card-name">{pillar.name}</h3>
                      <p className="nx-card-desc">{pillar.desc}</p>
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <motion.div className="nx-foot"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.6 }}>
            <span className="nx-foot-label">Sequential Growth Framework</span>
            <div className="nx-foot-line" />
          </motion.div>

        </div>
      </section>
    </>
  );
}