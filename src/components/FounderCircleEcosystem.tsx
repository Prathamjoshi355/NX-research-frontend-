/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

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

const toRad = (deg: number) => (deg * Math.PI) / 180;

export default function App() {
  const [active, setActive]   = useState<any>(null);
  const [hovered, setHovered] = useState<any>(null);
  const [size, setSize]       = useState(500);
  const wrapRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen py-24 px-4 flex flex-col items-center bg-[#07080e] overflow-hidden font-sans">

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
        .orb-node {
          cursor: pointer;
        }
        .orb-node:hover circle.node-circle {
          opacity: 1;
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="text-center mb-8 max-w-[560px] w-full">
        <div className="inline-block text-[10px] tracking-[5px] text-neon-cyan uppercase mb-3 px-[14px] py-1 border border-neon-cyan/30 rounded-[2px]">
          ◈ Ecosystem Map
        </div>
        <h2 className="text-[clamp(24px,5.5vw,40px)] font-extrabold text-[#eef0ff] tracking-[-0.5px] uppercase leading-[1.15] mb-2">
          The Founder Circle<br />
          <span className="text-neon-cyan">Support Ecosystem</span>
        </h2>
        <p className="text-[#2a3a4e] text-[10px] tracking-[2px] uppercase">
          HOVER OR CLICK ANY NODE TO EXPLORE
        </p>
      </div>

      {/* ── DIAGRAM ── */}
      <div ref={wrapRef} className="w-full max-w-[560px]">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size} height={size}
          className="block w-full h-auto overflow-visible"
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
          <g filter="url(#glow-hub)" onClick={() => setActive(null)} className="cursor-pointer">
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
              className="font-sans font-bold tracking-[2px]">
              HUB
            </text>
            <text x={cx} y={cy + HUB_R * 0.1} textAnchor="middle" dominantBaseline="middle"
              fill="#eef0ff" fontSize={HUB_R * 0.3}
              className="font-sans font-extrabold tracking-[-0.3px]">
              Your
            </text>
            <text x={cx} y={cy + HUB_R * 0.5} textAnchor="middle" dominantBaseline="middle"
              fill="#eef0ff" fontSize={HUB_R * 0.3}
              className="font-sans font-extrabold tracking-[-0.3px]">
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
                    className="font-sans font-bold tracking-[0.2px]"
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
      <div className="w-full max-w-[540px] mt-2 min-h-[90px]">
        <AnimatePresence mode="wait">
          {hi ? (
            <motion.div 
              key={hi.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-gradient-to-br from-[#0c101a]/98 to-[#101626]/96 border border-white/5 border-l-[3px] rounded-lg p-4 md:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_28px_rgba(0,212,255,0.05)]"
              style={{ borderLeftColor: hi.color }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{hi.icon}</span>
                <div>
                  <div className="font-extrabold text-sm text-[#eef0ff] uppercase tracking-[0.5px]">
                    {hi.title}
                  </div>
                  <div className="text-[9px] tracking-[3px] uppercase mt-0.5" style={{ color: hi.color }}>
                    {hi.stat}
                  </div>
                </div>
              </div>
              <p className="text-[13px] text-[#7a8a9e] leading-[1.75] border-t border-white/5 pt-3">
                {hi.desc}
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <p className="text-[clamp(12px,2vw,14px)] italic text-[#1c2a38] leading-[1.75]">
                "When one startup needs support, the entire ecosystem responds."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
