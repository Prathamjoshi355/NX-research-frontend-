import React from "react";
import InitiativesHero from "../components/InitiativesHero";
import InitiativesImpact from "../components/InitiativesImpact";
import InitiativesWhatWeDo from "../components/InitiativesWhatWeDo";
import InitiativesProcess from "../components/InitiativesProcess";
import InitiativesOutcomes from "../components/InitiativesOutcomes";
import InitiativesWhy from "../components/InitiativesWhy";
import InitiativesCTA from "../components/InitiativesCTA";

export default function InitiativesPage() {
  return (
    <div className="initiatives-page">
      <style>{`
        .initiatives-page { position: relative; width: 100%; }

        /* Background Grid */
        .page-grid {
          position: fixed; inset: 0;
          background-image: linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none; z-index: 0;
        }

        .logo { font-weight: 800; font-size: 24px; letter-spacing: 4px; color: var(--color-neon-cyan); cursor: pointer; }

        /* Impact Counters */
        .impact-section { padding: 80px 24px; max-width: 1100px; margin: 0 auto; position: relative; z-index: 10; }
        .stats-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
          margin-bottom: 80px;
        }
        @media (min-width: 1024px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .stat-card {
          background: var(--color-bg-secondary); backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 212, 255, 0.12); border-radius: 16px;
          padding: 32px 24px; text-align: center; transition: all 0.3s;
        }
        .stat-card:hover { border-color: rgba(0,212,255,0.38); transform: translateY(-4px); }
        .stat-number {
          font-size: clamp(32px, 5vw, 48px); font-weight: 700; color: var(--color-neon-cyan);
          margin-bottom: 8px; position: relative; display: inline-block;
        }
        .stat-number::after {
          content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 2px;
          background: var(--color-neon-cyan); opacity: 0.3; border-radius: 2px;
        }
        .stat-label { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-secondary); letter-spacing: 3px; text-transform: uppercase; }

        /* Marquee */
        .marquee-container {
          width: 100%; overflow: hidden; position: relative; padding: 20px 0;
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .marquee-track { display: flex; width: max-content; gap: 16px; animation: scrollX 40s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes scrollX { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .startup-card {
          width: 180px; flex-shrink: 0; background: var(--color-bg-secondary); backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 212, 255, 0.12); border-radius: 12px; padding: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .startup-icon {
          width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center;
          justify-content: center; font-weight: 800; font-size: 14px;
        }
        .startup-info { display: flex; flex-direction: column; gap: 2px; }
        .startup-name { font-size: 12px; font-weight: 700; color: var(--color-text-primary); }
        .startup-tag { font-family: var(--font-mono); font-size: 9px; color: var(--color-text-secondary); }

        /* Common Section Styles */
        .section { padding: 80px 24px; max-width: 1100px; margin: 0 auto; position: relative; z-index: 10; }
        @media (min-width: 1024px) { .section { padding: 100px 48px; } }
        .section-header { margin-bottom: 60px; }
        .section-label {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 5px;
          color: var(--color-neon-cyan); text-transform: uppercase; display: flex;
          align-items: center; justify-content: center; gap: 12px; margin-bottom: 24px;
        }
        .section-label::before { content: ''; width: 28px; height: 1px; background: var(--color-neon-cyan); opacity: 0.5; }
        .section-title { font-size: clamp(24px, 4vw, 44px); font-weight: 800; letter-spacing: -1.5px; text-transform: uppercase; color: var(--color-text-primary); }

        /* What We Do Grid */
        .what-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) { .what-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .what-grid { grid-template-columns: repeat(3, 1fr); } }
        .what-card {
          background: var(--color-bg-secondary); backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 212, 255, 0.12); border-radius: 16px;
          padding: 32px; transition: all 0.3s;
        }
        .what-card:hover { border-color: rgba(0,212,255,0.38); transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,212,255,0.05); }
        .what-icon { color: var(--color-neon-cyan); margin-bottom: 20px; }
        .what-title { font-size: 14px; font-weight: 700; margin-bottom: 12px; color: var(--color-text-primary); }
        .what-desc { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-secondary); line-height: 1.75; }

        /* Process Timeline */
        .process-timeline { position: relative; margin-top: 60px; }
        
        /* Desktop Timeline */
        .desk-timeline { display: none; grid-template-columns: repeat(5, 1fr); grid-template-rows: 1fr 48px 20px 48px 1fr; min-height: 400px; position: relative; }
        @media (min-width: 1024px) { .desk-timeline { display: grid; } }
        .center-line { grid-column: 1 / -1; grid-row: 3; align-self: center; height: 2px; background: linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent); position: relative; }
        .line-dot { position: absolute; top: 50%; left: 0; width: 8px; height: 8px; background: var(--color-neon-cyan); border-radius: 50%; transform: translateY(-50%); box-shadow: 0 0 10px var(--color-neon-cyan); animation: travel 10s linear infinite; }
        @keyframes travel { 0% { left: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
        
        .step-card { background: var(--color-bg-secondary); border: 1px solid rgba(0, 212, 255, 0.12); border-radius: 12px; padding: 20px; text-align: center; backdrop-filter: blur(12px); }
        .step-num { font-family: var(--font-mono); font-size: 9px; color: rgba(0,212,255,0.3); margin-bottom: 8px; letter-spacing: 2px; }
        .step-title { font-size: 13px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 4px; }
        .step-desc { font-family: var(--font-mono); font-size: 9px; color: var(--color-text-secondary); }
        
        .stem { width: 1px; height: 100%; justify-self: center; }
        .stem-top { background: linear-gradient(to bottom, rgba(0,212,255,0.4), rgba(0,212,255,0.1)); grid-row: 2; }
        .stem-bot { background: linear-gradient(to top, rgba(0,212,255,0.4), rgba(0,212,255,0.1)); grid-row: 4; }
        .node-dot { width: 10px; height: 10px; background: var(--color-neon-cyan); border-radius: 50%; justify-self: center; align-self: center; grid-row: 3; box-shadow: 0 0 10px var(--color-neon-cyan); }

        /* Mobile Timeline */
        .mob-timeline { display: flex; flex-direction: column; gap: 0; }
        @media (min-width: 1024px) { .mob-timeline { display: none; } }
        .mob-step { display: flex; gap: 20px; position: relative; }
        .mob-left { display: flex; flex-direction: column; align-items: center; width: 32px; flex-shrink: 0; }
        .mob-circle { width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(0,212,255,0.3); background: var(--color-bg-primary); display: flex; align-items: center; justify-content: center; color: var(--color-neon-cyan); font-family: var(--font-mono); font-size: 10px; position: relative; z-index: 2; }
        .mob-line { width: 1px; flex-grow: 1; background: linear-gradient(to bottom, rgba(0,212,255,0.3), transparent); }
        .mob-content { padding-bottom: 40px; padding-top: 6px; }
        .mob-title { font-size: 14px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 4px; text-transform: uppercase; }
        .mob-desc { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-secondary); line-height: 1.6; }

        /* Outcomes Grid */
        .outcomes-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 640px) { .outcomes-grid { grid-template-columns: repeat(2, 1fr); } }
        .outcome-card {
          background: var(--color-bg-secondary); backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 212, 255, 0.12); border-radius: 16px;
          padding: 28px; display: flex; flex-direction: column; gap: 16px;
          transition: all 0.3s;
        }
        .outcome-card:hover { border-color: rgba(0,212,255,0.38); transform: translateY(-4px); }
        .outcome-icon { color: var(--color-neon-cyan); }
        .outcome-title { font-size: 13px; font-weight: 700; color: var(--color-text-primary); }
        .outcome-desc { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-secondary); line-height: 1.75; }

        /* Why Section */
        .why-layout { display: flex; flex-direction: column; gap: 40px; }
        @media (min-width: 1024px) { .why-layout { flex-direction: row; gap: 0; } }
        .why-col { flex: 1; display: flex; flex-direction: column; gap: 32px; }
        .why-divider { width: 1px; background: rgba(0,212,255,0.1); margin: 0 48px; display: none; }
        @media (min-width: 1024px) { .why-divider { display: block; } }
        .why-item { display: flex; gap: 16px; }
        .why-bullet { color: var(--color-neon-cyan); flex-shrink: 0; margin-top: 2px; }
        .why-item-title { font-size: 14px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 8px; }
        .why-item-desc { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-secondary); line-height: 1.75; }

        /* CTA Section */
        .cta-banner {
          width: 100%; padding: 100px 24px; background: rgba(8, 18, 32, 0.4);
          position: relative; overflow: hidden; text-align: center;
        }
        .cta-glow {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 800px; height: 800px; background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
          z-index: 0; pointer-events: none;
        }
        .cta-content { position: relative; z-index: 10; max-width: 600px; margin: 0 auto; }
        .cta-title { font-size: clamp(28px, 4vw, 44px); font-weight: 800; letter-spacing: -1.5px; text-transform: uppercase; color: var(--color-text-primary); margin-bottom: 24px; }
        .cta-body { font-family: var(--font-mono); font-size: 12px; color: var(--color-text-secondary); line-height: 1.75; margin-bottom: 40px; }
        .cta-btns { display: flex; flex-direction: column; gap: 16px; justify-content: center; align-items: center; }
        @media (min-width: 640px) { .cta-btns { flex-direction: row; } }
        .btn-primary {
          background: var(--color-neon-cyan); color: var(--color-bg-primary); border: none;
          padding: 16px 40px; border-radius: 4px; font-family: var(--font-mono);
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2px; cursor: pointer; transition: all 0.3s;
          display: flex; align-items: center; gap: 10px;
        }
        .btn-primary:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(0,212,255,0.4); }
        .btn-secondary {
          background: transparent; color: var(--color-neon-cyan); border: 1px solid var(--color-neon-cyan);
          padding: 16px 40px; border-radius: 4px; font-family: var(--font-mono);
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2px; cursor: pointer; transition: all 0.3s;
        }
        .btn-secondary:hover { background: rgba(0,212,255,0.1); }

      `}</style>

      <div className="page-grid" />

      <InitiativesHero />
      <InitiativesImpact />
      <InitiativesWhatWeDo />
      <InitiativesProcess />
      <InitiativesOutcomes />
      <InitiativesWhy />
      <InitiativesCTA />

    </div>
  );
}
