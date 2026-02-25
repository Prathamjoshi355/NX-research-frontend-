import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import { useRef } from "react";
import {
  Lightbulb,
  Users,
  FileText,
  Rocket,
  Building2,
} from "lucide-react";

/* ─── Data ─── */
const STAGES = [
  { id: "01", title: "IDEA SELECTION",      description: "Identifying high-impact policy problems and distilling them into actionable research mandates.", icon: Lightbulb  },
  { id: "02", title: "TEAM FORMATION",      description: "Assembling cross-disciplinary research units drawn from academia, industry, and civil service.", icon: Users      },
  { id: "03", title: "PROPOSAL DEVELOPMENT",description: "Drafting strategic implementation frameworks with measurable KPIs and risk mitigation plans.",   icon: FileText   },
  { id: "04", title: "EXECUTION / PILOT",   description: "Deploying real-world testing and validation phases with iterative feedback loops.",              icon: Rocket     },
  { id: "05", title: "STARTUP CREATION",    description: "Spinning off successful pilots into independent, government-backed ventures.",                  icon: Building2  },
];

/* ─── Per-stage animated card ─── */
interface StageCardProps {
  key?: string | number;
  stage: any;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
}

const StageCard = ({ stage, index, total, smoothProgress }: StageCardProps) => {
  const Icon = stage.icon;
  const start = index / total;
  const end   = (index + 1) / total;

  // Tightened ranges for snappier transitions
  const opacity = useTransform(smoothProgress,
    [start - 0.1, start + 0.02, end - 0.02, end + 0.1],
    [0, 1, 1, 0]);

  const scale = useTransform(smoothProgress,
    [start - 0.1, start + 0.02, end - 0.02, end + 0.1],
    [0.85, 1, 1, 0.85]);

  const y = useTransform(smoothProgress,
    [start - 0.1, start + 0.02, end - 0.02, end + 0.1],
    [60, 0, 0, -60]);

  const display = useTransform(smoothProgress, (v: number) =>
    v >= start - 0.15 && v <= end + 0.15 ? "flex" : "none");

  return (
    <motion.div
      style={{ opacity, scale, y, display }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-16 w-full px-4 sm:px-6 max-w-5xl">

        {/* ── Left: Number + Icon Node ── */}
        <div className="relative flex flex-col items-center flex-shrink-0">
          {/* Ghost number */}
          <motion.span 
            style={{ 
              y: useTransform(smoothProgress, [start, end], [20, -20]),
              opacity: useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [0, 0.05, 0.05, 0])
            }}
            className="font-display font-black text-6xl xs:text-8xl md:text-[14rem] text-neon-cyan absolute top-[-30%] select-none pointer-events-none whitespace-nowrap tracking-tighter"
          >
            {stage.id}
          </motion.span>

          {/* Icon circle */}
          <div className="w-16 h-16 xs:w-20 xs:h-20 md:w-32 md:h-32 rounded-full bg-bg-secondary border-2 border-neon-cyan flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(0,212,255,0.3)]">
            <div className="absolute inset-0 rounded-full bg-neon-cyan/5 blur-xl" />
            <Icon size={28} className="xs:size-[32px] md:size-[40px] text-neon-cyan relative z-10" strokeWidth={1.5} />
          </div>
        </div>

        {/* ── Right: Content Card ── */}
        <div className="glass-panel p-5 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl md:rounded-3xl max-w-lg w-full relative z-10 border-neon-cyan/20">
          {/* Stage label row */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="font-mono text-[8px] xs:text-[9px] sm:text-[10px] font-bold text-neon-cyan uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
              Stage {stage.id}
            </span>
            <div className="flex-1 h-px bg-neon-cyan/10" />
          </div>

          <h2 className="font-display font-black text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-text-primary tracking-tight mb-2 sm:mb-4 leading-tight uppercase italic text-glow-cyan line-clamp-2">
            {stage.title}
          </h2>

          <p className="font-sans text-xs xs:text-sm md:text-base text-text-secondary leading-relaxed font-light line-clamp-4 md:line-clamp-none">
            {stage.description}
          </p>

          {/* Decorative corner accent */}
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-6 sm:w-8 h-6 sm:h-8 border-b border-r border-neon-cyan/20" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Side progress rail ─── */
interface ProgressRailProps {
  key?: string | number;
  total: number;
  smoothProgress: MotionValue<number>;
}

function ProgressRail({ total, smoothProgress }: ProgressRailProps) {
  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-3 z-50">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = useTransform(smoothProgress, (v: number) => {
          const s = i / total, e = (i + 1) / total;
          return v >= s && v < e ? 1 : 0.2;
        });
        
        return (
          <motion.div 
            key={i}
            style={{ opacity: isActive }}
            className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]"
          />
        );
      })}
    </div>
  );
}

/* ─── Main Component ─── */
export default function GovResearchRoadmap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 1, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-bg-primary">
      {/* Blueprint grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-1">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.15, 0.05], y: [0, -40, 0] }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 rounded-full bg-neon-cyan/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Sticky viewport */}
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10">

        {/* Header */}
        <div className="absolute top-16 sm:top-20 md:top-24 text-center z-30 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[8px] xs:text-[9px] sm:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.4em] text-neon-cyan/40 uppercase mb-2 sm:mb-3">
              Strategic Pathway
            </p>
            <h1 className="font-display font-black text-xl xs:text-2xl sm:text-3xl md:text-5xl text-text-primary tracking-tighter uppercase italic px-2">
              Government Research <span className="text-neon-cyan">Roadmap</span>
            </h1>
          </motion.div>
        </div>

        {/* Stage cards area */}
        <div className="relative w-full max-w-7xl h-[60vh] flex items-center justify-center mt-12 sm:mt-16 md:mt-20">
          {STAGES.map((stage, i) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={i}
              total={STAGES.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>

   

      </section>

      {/* Side rail */}
      <ProgressRail total={STAGES.length} smoothProgress={smoothProgress} />
    </div>
  );
}