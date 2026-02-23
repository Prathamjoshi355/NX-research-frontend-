import { useState, useEffect, useRef } from "react";

const NODES = [
  { title: "Mentors",            angle: -90,  icon: "🧠", desc: "Seasoned founders & industry leaders who've been there, done that.", stat: "120+ Mentors",    color: "#00d4ff" },
  { title: "Investors",          angle: -45,  icon: "💰", desc: "Access to a curated network of angels, VCs, and family offices.",    stat: "$2B+ AUM",       color: "#ffd700" },
  { title: "Peer Founders",      angle: 0,    icon: "🤝", desc: "Battle-tested peers building alongside you, sharing wins & scars.", stat: "800+ Founders",  color: "#00d4ff" },
  { title: "Research Team",      angle: 45,   icon: "🔬", desc: "Dedicated analysts delivering market intelligence on demand.",       stat: "50+ Analysts",   color: "#ffd700" },
  { title: "Tech Experts",       angle: 90,   icon: "⚙️", desc: "CTOs, engineers, and architects available for deep dives.",          stat: "200+ Experts",   color: "#00d4ff" },
  { title: "Talent Network",     angle: 135,  icon: "🌟", desc: "Pre-vetted candidates across engineering, design, and growth.",      stat: "5K+ Candidates", color: "#ffd700" },
  { title: "Advisors",           angle: 180,  icon: "🎯", desc: "Domain experts who guide strategy and unlock key relationships.",    stat: "300+ Advisors",  color: "#00d4ff" },
  { title: "Strategic Partners", angle: -135, icon: "🔗", desc: "Corporate partners offering pilots, distribution, and co-selling.", stat: "80+ Partners",   color: "#ffd700" },
];

const toRad = (deg) => (deg * Math.PI) / 180;

export default function FounderCircleEcosystem() {
  const [active, setActive]   = useState(null);
  const [hovered, setHovered] = useState(null);
  const [size, setSize]       = useState(500);
  const wrapRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        const containerWidth = wrapRef.current.offsetWidth;
        setSize(Math.min(containerWidth, 560));
      }
    };
    update();
    const observer = new ResizeObserver(update);
    if (wrapRef.current) observer.observe(wrapRef.current);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const cx     = size / 2;
  const cy     = size / 2;
  const R      = size * 0.36;
  const HUB_R  = size * 0.115;
  const NODE_R = size * 0.082;

  const hi = active ?? hovered;

  return (
    <div className="py-24 px-4 flex flex-col items-center bg-[#07080e] overflow-hidden">

      <style>{`
        @keyframes pulse-out {
          0%   { r: ${HUB_R}; opacity: 0.55; }
          100% { r: ${HUB_R * 2.6}; opacity: 0; }
        }
        @keyframes beam-in {
          0%   { stroke-dashoffset: 500; opacity: 0;   }
          10%  {                         opacity: 1;   }
          88%  {                         opacity: 0.9; }
          100% { stroke-dashoffset: 0;   opacity: 0;   }
        }
        @keyframes float-y {
          0%,100% { transform: translateY(0);   }
          50%     { transform: translateY(-6px); }
        }
        @keyframes fade-up {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0);   }
        }
        .orb-node {
          cursor: pointer;
        }
        .orb-node:hover circle.node-circle {
          opacity: 1;
        }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: 28, maxWidth: 560, width: "100%" }}>
        <div style={{
          display: "inline-block", fontSize: 10, letterSpacing: 5, color: "#00d4ff",
          textTransform: "uppercase", marginBottom: 12, padding: "4px 14px",
          border: "1px solid rgba(0,212,255,0.3)", borderRadius: 2,
        }}>◈ Ecosystem Map</div>
        <h2 style={{
          fontSize: "clamp(20px, 5.5vw, 40px)", fontWeight: 800,
          color: "#eef0ff", letterSpacing: "-0.5px", textTransform: "uppercase",
          lineHeight: 1.15, margin: "0 0 8px",
        }}>
          The Founder Circle<br />
          <span style={{ color: "#00d4ff" }}>Support Ecosystem</span>
        </h2>
        <p style={{ color: "#2a3a4e", fontSize: 10, letterSpacing: 2, margin: 0 }}>
          HOVER OR CLICK ANY NODE TO EXPLORE
        </p>
      </div>

      {/* ── DIAGRAM ── */}
      <div ref={wrapRef} style={{ width: "100%", maxWidth: 560 }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size} height={size}
          style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
        >
          <defs>
            <filter id="glow-hub" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-node" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="hub-bg" cx="35%" cy="35%">
              <stop offset="0%"   stopColor="#182035"/>
              <stop offset="100%" stopColor="#07080e"/>
            </radialGradient>
            {NODES.map((n, i) => (
              <radialGradient key={i} id={`ng${i}`} cx="30%" cy="30%">
                <stop offset="0%"   stopColor={n.color} stopOpacity={hi?.title === n.title ? "0.28" : "0.07"}/>
                <stop offset="100%" stopColor="#07080e" stopOpacity="1"/>
              </radialGradient>
            ))}
          </defs>

          {/* ── Background rings ── */}
          <circle cx={cx} cy={cy} r={R + NODE_R + 8}
            fill="none" stroke="rgba(0,212,255,0.035)" strokeWidth="1" strokeDasharray="2 14"/>
          <circle cx={cx} cy={cy} r={R}
            fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="1"/>

          {/* ── Beams: FROM node TO center ── */}
          {NODES.map((node, i) => {
            const nx  = cx + Math.cos(toRad(node.angle)) * R;
            const ny  = cy + Math.sin(toRad(node.angle)) * R;
            const isOn = hi?.title === node.title;
            return (
              <g key={`beam-${i}`}>
                {/* static dashed guide */}
                <line
                  x1={nx} y1={ny} x2={cx} y2={cy}
                  stroke={node.color} strokeWidth="0.5"
                  strokeDasharray="3 11"
                  opacity={isOn ? 0.4 : 0.08}
                  style={{ transition: "opacity 0.35s" }}
                />
                {/* travelling beam: node → hub */}
                <line
                  x1={nx} y1={ny} x2={cx} y2={cy}
                  stroke={node.color}
                  strokeWidth={isOn ? 2.2 : 1.2}
                  strokeLinecap="round"
                  strokeDasharray={`14 ${R + 30}`}
                  style={{
                    animation: `beam-in ${2.2 + i * 0.08}s linear infinite`,
                    animationDelay: `${i * 0.3}s`,
                    opacity: isOn ? 1 : 0.3,
                    transition: "stroke-width 0.3s, opacity 0.3s",
                  }}
                />
              </g>
            );
          })}

          {/* ── HUB ── */}
          <g filter="url(#glow-hub)" onClick={() => setActive(null)} style={{ cursor: "pointer" }}>
            {/* pulse rings */}
            {[0, 1].map(k => (
              <circle key={k} cx={cx} cy={cy} r={HUB_R}
                fill="none"
                stroke={k === 0 ? "rgba(0,212,255,0.55)" : "rgba(0,212,255,0.25)"}
                strokeWidth="1"
                style={{
                  animation: "pulse-out 3s ease-out infinite",
                  animationDelay: k === 0 ? "0s" : "1.5s",
                  transformOrigin: `${cx}px ${cy}px`,
                }}
              />
            ))}
            <circle cx={cx} cy={cy} r={HUB_R}
              fill="url(#hub-bg)"
              stroke="#00d4ff" strokeWidth="1.5"
            />
            <text x={cx} y={cy - HUB_R * 0.28} textAnchor="middle"
              fill="#00d4ff" fontSize={HUB_R * 0.24}
              fontFamily="system-ui" fontWeight="700" letterSpacing="2">
              HUB
            </text>
            <text x={cx} y={cy + HUB_R * 0.1} textAnchor="middle" dominantBaseline="middle"
              fill="#eef0ff" fontSize={HUB_R * 0.3}
              fontFamily="system-ui" fontWeight="800" letterSpacing="-0.3">
              Your
            </text>
            <text x={cx} y={cy + HUB_R * 0.5} textAnchor="middle" dominantBaseline="middle"
              fill="#eef0ff" fontSize={HUB_R * 0.3}
              fontFamily="system-ui" fontWeight="800" letterSpacing="-0.3">
              Startup
            </text>
          </g>

          {/* ── ORBIT NODES ── */}
          {NODES.map((node, i) => {
            const nx    = cx + Math.cos(toRad(node.angle)) * R;
            const ny    = cy + Math.sin(toRad(node.angle)) * R;
            const isSel = active?.title === node.title;
            const isOn  = hi?.title === node.title;
            const words = node.title.split(" ");

            return (
              <g
                key={node.title}
                className="orb-node"
                onClick={() => setActive(isSel ? null : node)}
                onMouseEnter={() => setHovered(node)}
                onMouseLeave={() => setHovered(null)}
                filter={isOn ? "url(#glow-node)" : undefined}
                style={{
                  animation: `float-y ${3.6 + i * 0.35}s ease-in-out infinite`,
                  animationDelay: `${i * 0.45}s`,
                  transformOrigin: `${nx}px ${ny}px`,
                }}
              >
                {/* selected ring */}
                {isSel && (
                  <circle cx={nx} cy={ny} r={NODE_R + 4}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1"
                    opacity="0.5"
                  />
                )}
                {/* node bg */}
                <circle
                  className="node-circle"
                  cx={nx} cy={ny} r={NODE_R}
                  fill={`url(#ng${i})`}
                  stroke={isOn ? node.color : "rgba(255,255,255,0.1)"}
                  strokeWidth={isOn ? 1.5 : 0.8}
                  opacity={isOn ? 1 : 0.85}
                  style={{ transition: "stroke 0.3s, opacity 0.3s, stroke-width 0.3s" }}
                />
                {/* icon */}
                <text
                  x={nx} y={ny - NODE_R * 0.15}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={NODE_R * 0.5}
                >
                  {node.icon}
                </text>
                {/* label — split into tspan lines */}
                {words.map((word, wi) => (
                  <text key={wi}
                    x={nx}
                    y={ny + NODE_R * 0.42 + wi * (NODE_R * 0.26)}
                    textAnchor="middle"
                    fill={isOn ? node.color : "#5a6a7e"}
                    fontSize={Math.max(7.5, NODE_R * 0.215)}
                    fontFamily="system-ui" fontWeight="700"
                    letterSpacing="0.2"
                    style={{ transition: "fill 0.3s" }}
                  >
                    {word.toUpperCase()}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── INFO PANEL ── */}
      <div style={{ width: "100%", maxWidth: 540, marginTop: 6, minHeight: 90 }}>
        {hi ? (
          <div style={{
            background: "linear-gradient(135deg, rgba(12,16,26,0.98), rgba(16,22,38,0.96))",
            border: `1px solid ${hi.color}35`,
            borderLeft: `3px solid ${hi.color}`,
            borderRadius: 8, padding: "16px 20px",
            boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 28px ${hi.color}15`,
            animation: "fade-up 0.22s ease",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 11 }}>
              <span style={{ fontSize: 26 }}>{hi.icon}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#eef0ff", textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {hi.title}
                </div>
                <div style={{ fontSize: 9, color: hi.color, letterSpacing: 3, textTransform: "uppercase", marginTop: 2 }}>
                  {hi.stat}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#7a8a9e", lineHeight: 1.75, margin: 0, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 11 }}>
              {hi.desc}
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "18px 0" }}>
            <p style={{ fontSize: "clamp(12px,2vw,14px)", fontStyle: "italic", color: "#1c2a38", lineHeight: 1.75, margin: 0 }}>
              "When one startup needs support, the entire ecosystem responds."
            </p>
          </div>
        )}
      </div>
    </div>
  );
}