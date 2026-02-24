import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Lightbulb, Zap, Shield, Briefcase, Crown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    name: "Initiatives",
    icon: Lightbulb,
    desc: "Identifying core problems and opportunities to drive meaningful impact.",
    step: "01",
    href: "/initiatives",
    accent: "#00d4ff", // neon-cyan
  },
  {
    name: "Empowerment & Transformation",
    icon: Zap,
    desc: "Equipping builders with tools and knowledge for lasting change.",
    step: "02",
    href: "/empowerment",
    accent: "#bd00ff", // neon-purple
  },
  {
    name: "Government Research",
    icon: Shield,
    desc: "Deep diving into data and policy-driven innovation.",
    step: "03",
    href: "/gov-research",
    accent: "#00ffcc", // teal
  },
  {
    name: "Private Research",
    icon: Briefcase,
    desc: "Unlocking insights through advanced analytical frameworks.",
    step: "04",
    href: "/private-research",
    accent: "#ffcc00", // gold
  },
  {
    name: "Founder Circle",
    icon: Crown,
    desc: "Structured startup growth ecosystem for serious founders to refine, validate, and build scalable ventures.",
    step: "05",
    href: "/founder-circle",
    accent: "#00d4ff", // neon-cyan
    featured: true,
  },
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

function TiltCard({ children, className = "", style = {}, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  function handleMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", ...style }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function EcosystemPillars() {
  const featured = pillars.find((p) => p.featured);
  const grid = pillars.filter((p) => !p.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg: #0B0C0E;
          --surface: #111316;
          --border: rgba(255,255,255,0.07);
          --neon-cyan: #00d4ff;
          --neon-purple: #bd00ff;
          --teal: #00ffcc;
          --gold: #ffcc00;
          --text: #E8E6E0;
          --muted: rgba(232,230,224,0.38);
        }

        .ep-root {
          background: var(--bg);
          min-height: 100vh;
          padding: 80px 32px 120px;
          font-family: 'DM Sans', sans-serif;
          perspective: 1200px;
          position: relative;
          overflow: hidden;
        }

        /* Noise texture overlay */
        .ep-root::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.5;
        }

        .ep-inner {
          max-width: 1160px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* ── HEADER ── */
        .ep-header {
          margin-bottom: 64px;
        }
        .ep-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 6px;
          text-transform: uppercase;
          color: var(--neon-cyan);
          margin-bottom: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .ep-eyebrow::after {
          content: '';
          width: 48px; height: 1px;
          background: var(--neon-cyan); opacity: 0.4;
        }
        .ep-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(56px, 9vw, 110px);
          color: var(--text);
          line-height: 0.9;
          letter-spacing: 1px;
          margin: 0;
        }
        .ep-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px var(--neon-cyan);
        }
        .ep-subtitle {
          margin-top: 20px;
          font-size: 14px;
          color: var(--muted);
          max-width: 360px;
          line-height: 1.7;
        }

        /* ── BENTO GRID ── */
        .ep-bento {
          display: grid;
          gap: 14px;
        }

        /* Desktop: image-matching layout — featured LEFT (tall), 2x2 RIGHT */
        @media (min-width: 768px) {
          .ep-bento {
            grid-template-columns: 1.15fr 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .ep-featured-wrap {
            grid-column: 1;
            grid-row: 1 / 3;
          }
          .ep-grid-wrap {
            grid-column: 2 / 4;
            grid-row: 1 / 3;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 14px;
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .ep-featured-wrap { margin-bottom: 14px; }
          .ep-grid-wrap {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
        }

        /* ── CARD BASE ── */
        .ep-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          display: block;
          transition: border-color 0.3s;
        }
        .ep-card:hover {
          border-color: rgba(255,255,255,0.14);
        }

        /* Hover glow */
        .ep-card-glow {
          position: absolute;
          inset: -1px; border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .ep-card:hover .ep-card-glow { opacity: 1; }

        /* Corner accent mark */
        .ep-card-corner {
          position: absolute;
          top: 20px; right: 20px;
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transform: scale(0.7);
          transition: opacity 0.3s, transform 0.3s;
        }
        .ep-card:hover .ep-card-corner {
          opacity: 1; transform: scale(1);
        }

        /* Step number */
        .ep-step {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; letter-spacing: 4px;
          color: var(--muted);
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 8px;
        }
        .ep-step::before {
          content: ''; width: 16px; height: 1px;
          background: currentColor; opacity: 0.4;
        }

        /* Icon */
        .ep-icon-wrap {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          transition: transform 0.3s;
        }
        .ep-card:hover .ep-icon-wrap { transform: scale(1.1) rotate(-3deg); }

        .ep-card-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          color: var(--text);
          letter-spacing: 0.5px;
          line-height: 1;
          margin: 0 0 10px;
        }
        .ep-card-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.75;
          margin: 0;
        }

        /* ── FEATURED CARD extras ── */
        .ep-featured {
          height: 100%;
          min-height: 480px;
          display: flex; flex-direction: column;
          justify-content: space-between;
        }
        .ep-featured .ep-card-name {
          font-size: 48px;
          line-height: 0.95;
        }
        .ep-featured .ep-card-desc {
          font-size: 13px;
          max-width: 240px;
        }

        /* Big decorative number */
        .ep-big-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 160px;
          line-height: 1;
          color: transparent;
          position: absolute;
          bottom: -16px; right: -8px;
          pointer-events: none;
          user-select: none;
          transition: opacity 0.3s;
        }

        /* CTA pill */
        .ep-cta {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 28px;
          padding: 10px 20px;
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase;
          border: 1px solid;
          transition: all 0.25s;
          width: fit-content;
        }
        .ep-card:hover .ep-cta {
          padding-right: 24px;
        }

        /* Small cards height */
        .ep-small-card {
          height: 100%;
        }

        /* ── FOOTER ── */
        .ep-footer {
          margin-top: 56px;
          display: flex; align-items: center; gap: 20px;
        }
        .ep-footer-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; letter-spacing: 5px;
          color: rgba(255,255,255,0.12);
          text-transform: uppercase; white-space: nowrap;
        }
        .ep-footer-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0.07), transparent);
        }
        .ep-footer-count {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; letter-spacing: 3px;
          color: rgba(255,255,255,0.1);
        }
      `}</style>

      <section className="ep-root">
        <div className="ep-inner">

          {/* Header */}
          <motion.div className="ep-header"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="ep-eyebrow">Our Pillars</div>
            <h2 className="ep-title">
              The NX<br /><em>Ecosystem</em>
            </h2>
            <p className="ep-subtitle">Five interconnected pillars driving systemic change across sectors.</p>
          </motion.div>

          {/* Bento Grid */}
          <div className="ep-bento">

            {/* ── FEATURED: Founder Circle (tall left card) ── */}
            <motion.div className="ep-featured-wrap"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
              <TiltCard style={{ height: "100%" }}>
                <Link
                  to={featured.href}
                  className="ep-card ep-featured"
                  style={{ background: "#0F1408" }}
                >
                  {/* Glow */}
                  <div className="ep-card-glow"
                    style={{ background: `radial-gradient(ellipse at 30% 20%, ${featured.accent}18, transparent 60%)`, boxShadow: `inset 0 0 0 1px ${featured.accent}22` }} />

                  {/* Corner */}
                  <div className="ep-card-corner" style={{ background: featured.accent }}>
                    <ArrowUpRight size={14} color="#000" />
                  </div>

                  <div>
                    <div className="ep-step">{featured.step}</div>
                    <div className="ep-icon-wrap" style={{ background: `${featured.accent}18` }}>
                      <featured.icon size={22} color={featured.accent} />
                    </div>
                    <h3 className="ep-card-name">{featured.name}</h3>
                    <p className="ep-card-desc">{featured.desc}</p>
                    <div className="ep-cta" style={{ color: featured.accent, borderColor: `${featured.accent}40` }}>
                      Explore <ArrowUpRight size={10} />
                    </div>
                  </div>

                  {/* Decorative big number */}
                  <div className="ep-big-num"
                    style={{ WebkitTextStroke: `1px ${featured.accent}22` }}>
                    05
                  </div>
                </Link>
              </TiltCard>
            </motion.div>

            {/* ── 2×2 GRID: other 4 pillars ── */}
            <div className="ep-grid-wrap">
              {grid.map((pillar, i) => (
                <motion.div key={pillar.name}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}>
                  <TiltCard style={{ height: "100%" }}>
                    <Link to={pillar.href} className="ep-card ep-small-card">
                      {/* Glow */}
                      <div className="ep-card-glow"
                        style={{ background: `radial-gradient(ellipse at 20% 10%, ${pillar.accent}14, transparent 55%)`, boxShadow: `inset 0 0 0 1px ${pillar.accent}18` }} />

                      {/* Corner */}
                      <div className="ep-card-corner" style={{ background: pillar.accent }}>
                        <ArrowUpRight size={12} color="#000" />
                      </div>

                      <div className="ep-step">{pillar.step}</div>
                      <div className="ep-icon-wrap" style={{ background: `${pillar.accent}15` }}>
                        <pillar.icon size={20} color={pillar.accent} />
                      </div>
                      <h3 className="ep-card-name" style={{ fontSize: "20px" }}>{pillar.name}</h3>
                      <p className="ep-card-desc">{pillar.desc}</p>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Footer */}
          <motion.div className="ep-footer"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.6 }}>
            <span className="ep-footer-text">Sequential Growth Framework</span>
            <div className="ep-footer-line" />
            <span className="ep-footer-count">05 / 05</span>
          </motion.div>

        </div>
      </section>
    </>
  );
}