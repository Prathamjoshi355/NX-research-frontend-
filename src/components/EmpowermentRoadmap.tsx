import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Flag, Zap, Target, Compass, Network, Trophy } from "lucide-react";

const milestones = [
  { title: "Start", icon: Flag, desc: "Begin your journey" },
  { title: "Development", icon: Zap, desc: "Skill enhancement" },
  { title: "Capability", icon: Target, desc: "Readiness check" },
  { title: "Direction", icon: Compass, desc: "Path selection" },
  { title: "Integration", icon: Network, desc: "Ecosystem entry" },
  { title: "Success", icon: Trophy, desc: "Venture launch" },
];

export default function EmpowermentRoadmap() {
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
            How We Work Here
          </motion.h2>
          <p className="mt-4 text-text-secondary font-mono text-sm tracking-widest uppercase">The Progressive Pathway</p>
        </div>

        <div className="relative min-h-[600px] flex flex-col items-center">
          {/* SVG Path */}
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-full pointer-events-none z-0"
            viewBox="0 0 400 800"
            fill="none"
          >
            <motion.path
              d="M 200 0 Q 350 200 200 400 T 200 800"
              stroke="var(--color-neon-cyan)"
              strokeWidth="2"
              strokeOpacity="0.2"
              strokeDasharray="10 10"
            />
            <motion.path
              d="M 200 0 Q 350 200 200 400 T 200 800"
              stroke="var(--color-neon-cyan)"
              strokeWidth="2"
              style={{ pathLength }}
              className="drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]"
            />
          </svg>

          {/* Milestones */}
          <div className="relative z-10 w-full flex flex-col gap-32">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center gap-8 ${
                    i % 2 === 0 ? "flex-row self-start ml-[10%] md:ml-[20%]" : "flex-row-reverse self-end mr-[10%] md:mr-[20%]"
                  }`}
                >
                  <div className="relative">
                    <motion.div
                      whileInView={{
                        boxShadow: ["0 0 0px rgba(0,212,255,0)", "0 0 20px rgba(0,212,255,0.4)", "0 0 0px rgba(0,212,255,0)"],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-bg-secondary border border-neon-cyan/30 flex items-center justify-center text-neon-cyan"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-neon-cyan text-bg-primary font-mono text-[10px] font-bold flex items-center justify-center">
                      0{i + 1}
                    </div>
                  </div>
                  <div className={`${i % 2 === 0 ? "text-left" : "text-right"}`}>
                    <h3 className="text-xl font-display font-bold text-text-primary uppercase tracking-wider">{m.title}</h3>
                    <p className="text-text-secondary font-mono text-[11px] uppercase tracking-widest">{m.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
