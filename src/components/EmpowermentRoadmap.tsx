"use client";

import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Flag, Zap, Target, Compass, Network, LucideIcon, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Milestone {
  id: number;
  title: string;
  icon: LucideIcon;
  desc: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const milestones: Milestone[] = [
  {
    id: 1,
    title: "Entry & Clarity",
    icon: Flag,
    desc: "Foundation Journey",
    color: "#00d4ff",
  },
  {
    id: 2,
    title: "Track Selection",
    icon: Zap,
    desc: "Specialization",
    color: "#00ffb3",
  },
  {
    id: 3,
    title: "Capability Score",
    icon: Target,
    desc: "Readiness Check",
    color: "#ff6b6b",
  },
  {
    id: 4,
    title: "Direction Selection",
    icon: Compass,
    desc: "Outcome Focus",
    color: "#ffd93d",
  },
  {
    id: 5,
    title: "Ecosystem Integration",
    icon: Network,
    desc: "Full Access",
    color: "#c77dff",
  },
];

// ─── Hook: detect desktop ─────────────────────────────────────────────────────

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

// ─── VERTICAL LAYOUT (Mobile) ─────────────────────────────────────────────────

function VerticalRoadmap() {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Ghost line */}
      <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-px bg-[rgba(0,212,255,0.1)]" />
      {/* Animated line */}
      <motion.div
        className="absolute left-5 sm:left-8 top-0 w-px origin-top"
        style={{
          scaleY: lineScaleY,
          height: "100%",
          background: "linear-gradient(to bottom, #00d4ff, #00ffb3, #ff6b6b, #ffd93d, #c77dff)",
          filter: "drop-shadow(0 0 6px rgba(0,212,255,0.55))",
        }}
      />

      <div className="flex flex-col">
        {milestones.map((m, i) => {
          const Icon = m.icon;
          const isActive = active === m.id;

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-14 sm:pl-20 pb-6 sm:pb-10"
            >
              {/* Node button */}
              <motion.button
                onClick={() => setActive(isActive ? null : m.id)}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 top-0 w-12 sm:w-16 h-12 sm:h-16 rounded-full border flex items-center justify-center cursor-pointer focus:outline-none transition-all duration-300"
                style={{
                  background: isActive ? `${m.color}18` : "#0a141e",
                  borderColor: isActive ? m.color : "rgba(0,212,255,0.22)",
                  color: isActive ? m.color : "#00d4ff",
                  boxShadow: isActive ? `0 0 20px ${m.color}40` : "none",
                }}
                aria-label={`Toggle ${m.title}`}
              >
                <Icon size={18} strokeWidth={1.5} className="sm:w-[22px] sm:h-[22px]" />
                <span
                  className="absolute -top-1 sm:-top-1.5 -right-1 sm:-right-1.5 w-4 sm:w-5 h-4 sm:h-5 rounded-full font-mono text-[7px] sm:text-[9px] font-bold flex items-center justify-center text-[#050a0f]"
                  style={{ background: m.color }}
                >
                  {String(m.id).padStart(2, "0")}
                </span>
              </motion.button>

              {/* Text + expand */}
              <button
                onClick={() => setActive(isActive ? null : m.id)}
                className="text-left w-full cursor-pointer focus:outline-none pt-1"
              >
                <div className="flex items-center gap-1">
                  <h3
                    className="font-['Raleway'] text-xs sm:text-base font-bold uppercase tracking-wider transition-colors duration-200"
                    style={{ color: isActive ? m.color : "#f0f4f8" }}
                  >
                    {m.title}
                  </h3>
                  <motion.span animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronRight size={11} className="sm:w-[13px] sm:h-[13px]" style={{ color: "#6b8899" }} />
                  </motion.span>
                </div>
                <p className="font-['Raleway'] font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[#6b8899] mt-1">
                  {m.desc}
                </p>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-xs sm:text-sm font-['Raleway'] text-[#7a9bb5] leading-relaxed border-l-2 border-neon-cyan/20 pl-2 sm:pl-4 py-1">
                        Detailed information about {m.title.toLowerCase()} and how it fits into your progressive pathway at NX Research.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── HORIZONTAL LAYOUT (Desktop) ─────────────────────────────────────────────

interface HorizontalLineProps {
  progress: MotionValue<number>;
}

function HorizontalLine({ progress }: HorizontalLineProps) {
  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] overflow-visible pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(to right, rgba(0,212,255,0.12) 0px, rgba(0,212,255,0.12) 10px, transparent 10px, transparent 20px)",
        }}
      />
      <motion.div
        className="absolute left-0 top-0 h-full"
        style={{
          width: "100%",
          scaleX: progress,
          transformOrigin: "left center",
          background: "linear-gradient(to right, #00d4ff, #00ffb3, #ff6b6b, #ffd93d, #c77dff)",
          filter: "drop-shadow(0 0 5px rgba(0,212,255,0.6))",
        }}
      />
    </div>
  );
}

interface HorizontalNodeProps {
  milestone: Milestone;
  index: number;
  isActive: boolean;
  onSelect: (id: number) => void;
  key?: any;
}

function HorizontalNode({ milestone, index, isActive, onSelect }: HorizontalNodeProps) {
  const Icon = milestone.icon;
  const isAbove = index % 2 === 0;

  return (
    <div className="flex flex-col items-center flex-1 relative">
      {/* Label above (even) */}
      <div className={`h-20 flex flex-col justify-end pb-3 ${isAbove ? "" : "invisible"}`}>
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          className="text-center"
        >
          <p
            className="font-['Raleway'] text-[12px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-200"
            style={{ color: isActive ? milestone.color : "#f0f4f8" }}
          >
            {milestone.title}
          </p>
          <p className="font-['Raleway'] text-[8px] uppercase tracking-[0.14em] text-[#6b8899] mt-0.5">
            {milestone.desc}
          </p>
        </motion.div>
      </div>

      {/* Node */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(milestone.id)}
        className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center cursor-pointer focus:outline-none transition-all duration-300 flex-shrink-0"
        style={{
          background: isActive ? `${milestone.color}20` : "#0a141e",
          borderColor: isActive ? milestone.color : "rgba(0,212,255,0.22)",
          color: isActive ? milestone.color : "#00d4ff",
          boxShadow: isActive ? `0 0 24px ${milestone.color}44` : "none",
        }}
        aria-label={milestone.title}
      >
        <Icon size={20} strokeWidth={1.5} className="sm:w-[22px] sm:h-[22px]" />
        <span
          className="absolute -top-1 sm:-top-1.5 -right-1 sm:-right-1.5 w-4 sm:w-5 h-4 sm:h-5 rounded-full font-mono text-[7px] sm:text-[9px] font-bold flex items-center justify-center text-[#050a0f]"
          style={{ background: milestone.color }}
        >
          {String(milestone.id).padStart(2, "0")}
        </span>
      </motion.button>

      {/* Label below (odd) */}
      <div className={`h-20 flex flex-col justify-start pt-3 ${!isAbove ? "" : "invisible"}`}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          className="text-center"
        >
          <p
            className="font-['Raleway'] text-[12px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-200"
            style={{ color: isActive ? milestone.color : "#f0f4f8" }}
          >
            {milestone.title}
          </p>
          <p className="font-['Raleway'] text-[8px] uppercase tracking-[0.14em] text-[#6b8899] mt-0.5">
            {milestone.desc}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function HorizontalRoadmap() {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "center center"] });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const activeMilestone = milestones.find((m) => m.id === active) ?? null;

  return (
    <div ref={containerRef}>
      {/* Track row */}
      <div className="relative flex items-center px-4">
        <HorizontalLine progress={lineProgress} />
        {milestones.map((m, i) => (
          <HorizontalNode
            key={m.id}
            milestone={m}
            index={i}
            isActive={active === m.id}
            onSelect={(id) => setActive((prev) => (prev === id ? null : id))}
          />
        ))}
      </div>

      {/* Detail panel */}
      <div className="mt-6 sm:mt-12 min-h-[80px] sm:min-h-[120px]">
        <AnimatePresence mode="wait">
          {activeMilestone && (
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-3 sm:p-8 rounded-lg sm:rounded-2xl border-white/5 flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                <div className="w-7 sm:w-10 h-7 sm:h-10 rounded-full flex items-center justify-center" style={{ background: `${activeMilestone.color}20`, color: activeMilestone.color }}>
                  <activeMilestone.icon size={16} className="sm:w-[20px] sm:h-[20px]" />
                </div>
                <h3 className="text-base sm:text-2xl font-['Raleway'] font-bold uppercase tracking-tight text-white">{activeMilestone.title}</h3>
              </div>
              <p className="max-w-2xl text-[11px] sm:text-sm font-['Raleway'] text-text-secondary leading-relaxed">
                Detailed information about {activeMilestone.title.toLowerCase()}. This stage focuses on {activeMilestone.desc.toLowerCase()}, ensuring you have the right foundation and resources to progress effectively through the NX Research ecosystem.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function EmpowermentRoadmap() {
  const isDesktop = useIsDesktop();

  return (
    <section
      className="relative py-8 sm:py-12 md:py-20 lg:py-32 overflow-hidden"
      style={{ background: "#050a0f" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-[60px] font-bold uppercase tracking-tighter text-[#f0f4f8] leading-tight sm:leading-none"
          >
            How We Work Here
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-1.5 sm:mt-3 font-['Raleway'] text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[#6b8899]"
          >
            The Progressive Pathway
          </motion.p>
        </div>

        {/* Layout switcher */}
        {isDesktop ? <HorizontalRoadmap /> : <VerticalRoadmap />}
      </div>
    </section>
  );
}