import React from "react";
import InitiativesHero from "../components/InitiativesHero";
import InitiativesImpact from "../components/InitiativesImpact";
import InitiativesWhatWeDo from "../components/InitiativesWhatWeDo";
import InitiativesProcess from "../components/InitiativesProcess";
import InitiativesOutcomes from "../components/InitiativesOutcomes";
import InitiativesWhy from "../components/InitiativesWhy";
import SEO from "../components/SEO";
// import InitiativesCTA from "../components/InitiativesCTA";

export default function InitiativesPage() {
  return (
    <div className="initiatives-page">
      <SEO 
        title="Initiatives" 
        description="Explore NX Research initiatives focused on venture building, strategic innovation, and ecosystem development."
      />
      <style>{`
        /* Common Section Styles */
        .section { padding: 80px 24px; max-width: 1200px; margin: 0 auto; position: relative; z-index: 10; }
        @media (min-width: 1024px) { .section { padding: 120px 48px; } }
        .section-header { margin-bottom: 60px; text-align: center; }
        .section-label {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 6px;
          color: var(--color-neon-cyan); text-transform: uppercase; display: flex;
          align-items: center; justify-content: center; gap: 16px; margin-bottom: 24px;
        }
        .section-label::before, .section-label::after { content: ''; width: 32px; height: 1px; background: var(--color-neon-cyan); opacity: 0.3; }
        .section-title { font-size: clamp(28px, 5vw, 48px); font-weight: 800; letter-spacing: -2px; text-transform: uppercase; color: var(--color-text-primary); }

        /* What We Do Grid */
        .what-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) { .what-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .what-grid { grid-template-columns: repeat(3, 1fr); } }
        .what-card {
          background: var(--color-bg-secondary); backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 212, 255, 0.08); border-radius: 20px;
          padding: 40px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative; overflow: hidden;
        }
        .what-card::before {
          content: ''; position: absolute; inset: 0; background: radial-gradient(circle at top right, rgba(0,212,255,0.05), transparent 70%);
          opacity: 0; transition: opacity 0.4s;
        }
        .what-card:hover { border-color: rgba(0,212,255,0.3); transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .what-card:hover::before { opacity: 1; }
        .what-icon { color: var(--color-neon-cyan); margin-bottom: 24px; }
        .what-title { font-size: 18px; font-weight: 700; margin-bottom: 16px; color: var(--color-text-primary); }
        .what-desc { font-family: var(--font-sans); font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; }

        /* Outcomes Grid */
        .outcomes-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 640px) { .outcomes-grid { grid-template-columns: repeat(2, 1fr); } }
        .outcome-card {
          background: var(--color-bg-secondary); backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 212, 255, 0.08); border-radius: 20px;
          padding: 32px; display: flex; flex-direction: column; gap: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .outcome-card:hover { border-color: rgba(0,212,255,0.3); transform: translateY(-4px); }
        .outcome-icon { color: var(--color-neon-cyan); }
        .outcome-title { font-size: 16px; font-weight: 700; color: var(--color-text-primary); }
        .outcome-desc { font-family: var(--font-sans); font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; }

        /* Why Section */
        .why-layout { display: flex; flex-direction: column; gap: 48px; }
        @media (min-width: 1024px) { .why-layout { flex-direction: row; gap: 0; } }
        .why-col { flex: 1; display: flex; flex-direction: column; gap: 40px; }
        .why-divider { width: 1px; background: rgba(0,212,255,0.1); margin: 0 64px; display: none; }
        @media (min-width: 1024px) { .why-divider { display: block; } }
        .why-item { display: flex; gap: 20px; }
        .why-bullet { color: var(--color-neon-cyan); flex-shrink: 0; margin-top: 4px; }
        .why-item-title { font-size: 16px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 8px; }
        .why-item-desc { font-family: var(--font-sans); font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; }

        /* CTA Section */
        .cta-banner {
          width: 100%; padding: 120px 24px; background: var(--color-bg-secondary);
          position: relative; overflow: hidden; text-align: center;
          border-top: 1px solid rgba(0,212,255,0.05);
        }
        .cta-glow {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 1000px; height: 1000px; background: radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%);
          z-index: 0; pointer-events: none;
        }
        .cta-content { position: relative; z-index: 10; max-width: 800px; margin: 0 auto; }
        .cta-title { font-size: clamp(32px, 6vw, 56px); font-weight: 800; letter-spacing: -2px; text-transform: uppercase; color: var(--color-text-primary); margin-bottom: 32px; }
        .cta-body { font-family: var(--font-sans); font-size: 16px; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 48px; }
        .cta-btns { display: flex; flex-direction: column; gap: 20px; justify-content: center; align-items: center; }
        @media (min-width: 640px) { .cta-btns { flex-direction: row; } }
        .btn-primary {
          background: var(--color-neon-cyan); color: var(--color-bg-primary); border: none;
          padding: 18px 48px; border-radius: 8px; font-family: var(--font-mono);
          font-size: 13px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 3px; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex; align-items: center; gap: 12px;
        }
        .btn-primary:hover { transform: scale(1.05); box-shadow: 0 0 40px rgba(0,212,255,0.4); }
        .btn-secondary {
          background: transparent; color: var(--color-neon-cyan); border: 1px solid rgba(0,212,255,0.3);
          padding: 18px 48px; border-radius: 8px; font-family: var(--font-mono);
          font-size: 13px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 3px; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-secondary:hover { background: rgba(0,212,255,0.1); border-color: var(--color-neon-cyan); }

      `}</style>

      <div className="page-grid" />

      <InitiativesHero />
      <InitiativesImpact />
      <InitiativesWhatWeDo />
      <InitiativesProcess />
      <InitiativesOutcomes />
      <InitiativesWhy />
      

    </div>
  );
}
