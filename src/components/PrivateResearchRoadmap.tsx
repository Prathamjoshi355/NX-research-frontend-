import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Target, Cpu, BarChart3 } from "lucide-react";

const stages = [
  {
    id: "01",
    title: "Connect & Set Goals",
    points: [
      "Define interests, skills, or problems to solve",
      "Choose research direction",
    ],
    icon: Target,
    color: "neon-cyan",
  },
  {
    id: "02",
    title: "AI / System Assists & Structures",
    points: [
      "Opportunity evaluation",
      "Task assignment",
      "Team alignment",
    ],
    icon: Cpu,
    color: "neon-purple",
  },
  {
    id: "03",
    title: "Review, Control & Improve",
    points: [
      "Monitor progress",
      "Refine approach",
      "Prepare outcomes",
    ],
    icon: BarChart3,
    color: "teal",
  },
];

export default function PrivateResearchRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            How Private Research Works
          </motion.h2>
          <p className="mt-4 text-text-secondary font-mono text-xs tracking-[4px] uppercase">Guided Innovation System</p>
        </div>

        <div className="relative flex flex-col items-center">
          {/* SVG Path */}
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-full pointer-events-none z-0"
            viewBox="0 0 400 1000"
            fill="none"
          >
            <motion.path
              d="M 200 0 Q 350 250 200 500 T 200 1000"
              stroke="var(--color-neon-cyan)"
              strokeWidth="2"
              strokeOpacity="0.1"
              strokeDasharray="10 10"
            />
            <motion.path
              d="M 200 0 Q 350 250 200 500 T 200 1000"
              stroke="var(--color-neon-cyan)"
              strokeWidth="2"
              style={{ pathLength }}
              className="drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]"
            />
          </svg>

          <div className="space-y-48 relative z-10 w-full">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col md:flex-row items-center gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${stage.color}/10 border border-${stage.color}/20 text-${stage.color} mb-6`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-4 uppercase tracking-wide">
                      <span className="text-text-dim mr-2">{stage.id} —</span> {stage.title}
                    </h3>
                    <ul className={`space-y-3 ${i % 2 === 0 ? "md:items-end" : "md:items-start"} flex flex-col`}>
                      {stage.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-text-secondary text-sm">
                          <div className={`w-1 h-1 rounded-full bg-${stage.color}`} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative">
                    <motion.div
                      whileInView={{
                        boxShadow: ["0 0 0px rgba(0,212,255,0)", "0 0 20px rgba(0,212,255,0.4)", "0 0 0px rgba(0,212,255,0)"],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className={`w-10 h-10 rounded-full bg-bg-primary border-2 border-${stage.color} flex items-center justify-center text-${stage.color} z-10 relative`}
                    >
                      <div className={`w-2 h-2 rounded-full bg-${stage.color}`} />
                    </motion.div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
