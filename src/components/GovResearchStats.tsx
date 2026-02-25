import { motion, animate } from "motion/react";
import { useEffect, useState, useRef } from "react";
import {
  BarChart3,
  Activity,
  Users,
  Rocket,
  CheckCircle2,
} from "lucide-react";

function Counter({ value, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        setDisplayValue(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value]);

  return (
    <span ref={nodeRef}>
      {displayValue}{suffix}
    </span>
  );
}

function StatCard({ label, value, suffix, icon: Icon, accentColor, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex-1 flex flex-col gap-3 p-3 sm:p-5 rounded-2xl cursor-pointer overflow-hidden"
      style={{
        minWidth: "0",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, ${accentColor}18 0%, transparent 70%)`,
        }}
      />

      {/* Top shimmer line on hover */}
      <div
        className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)` }}
      />

      {/* Icon — smaller */}
      <div
        className="relative z-10 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500"
        style={{ background: `${accentColor}18`, color: accentColor }}
      >
        <Icon size={13} />
      </div>

      {/* Number + Label */}
      <div className="relative z-10 flex flex-col gap-0.5">
        <span
          className="text-[1.4rem] sm:text-[2rem] leading-none font-bold tracking-tight text-white"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <Counter value={value} suffix={suffix} />
        </span>
        <span
          className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] leading-snug transition-colors duration-300"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

const stats = [
  { label: "Total Projects",         value: 47,  suffix: "",  icon: BarChart3,    accentColor: "#22d3ee" },
  { label: "Active Projects",        value: 11,  suffix: "",  icon: Activity,     accentColor: "#2dd4bf" },
  { label: "Students & Researchers", value: 849, suffix: "+", icon: Users,        accentColor: "#c084fc" },
  { label: "Startups Evolved",       value: 14,  suffix: "",  icon: Rocket,       accentColor: "#fbbf24" },
  { label: "Projects Implemented",   value: 23,  suffix: "",  icon: CheckCircle2, accentColor: "#60a5fa" },
];

export default function GovResearchStats() {
  return (
    <div
      className="flex items-center justify-center p-0 sm:p-6 lg:p-8"
      style={{ background: "#07090f" }}
    >
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-[160px]"
          style={{ top: "-20%", left: "-10%", width: "45%", height: "45%", background: "rgba(34,211,238,0.06)" }}
        />
        <div
          className="absolute rounded-full blur-[160px]"
          style={{ bottom: "-20%", right: "-10%", width: "45%", height: "45%", background: "rgba(192,132,252,0.06)" }}
        />
      </div>

      {/* Stats container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl"
      >
        <div
          className="w-full rounded-none sm:rounded-3xl p-2 sm:p-4"
          style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 40px 100px -20px rgba(0,0,0,0.9)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* 5 cards — no scroll, flex wraps tight on mobile */}
          <div className="flex gap-1.5 sm:gap-3">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                icon={stat.icon}
                accentColor={stat.accentColor}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}