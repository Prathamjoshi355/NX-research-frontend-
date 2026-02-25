import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";

const phases = [
   {
    title: "Capability Check",
    subtitle: "Assessing Your Readiness",
    desc: "Skills and readiness evaluation",
    color: "neon-cyan",
  },
  {
    title: "Observation & Learning",
    subtitle: "Understanding Before Action",
    desc: "Observe processes and learn deeply",
    color: "neon-purple",
  },
  {
    title: "Real‐World Exposure",
    subtitle: "Learning Through Experience",
    desc: "Work on real challenges",
    color: "teal",
  },
  {
    title: "Responsibility",
    subtitle: "Leading with Accountability",
    desc: "Own tasks and deliver outcomes",
    color: "gold",
  },
];

export default function EmpowermentPhases() {
  return (
    <section className="py-16 sm:py-20 md:py-32 bg-bg-secondary relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter leading-tight"
          >
            Phases During the Journey
          </motion.h2>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-5 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan/50 via-neon-cyan/20 to-transparent -translate-x-1/2" />

          <div className="space-y-10 sm:space-y-12 md:space-y-20">
            {phases.map((phase, i) => {
              const isEven = i % 2 === 0;
              
              return (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Circle on the line */}
                  <div className="absolute left-5 sm:left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-bg-secondary border-2 border-${phase.color} flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)]`}>
                      <span className={`font-mono text-xs font-bold text-${phase.color}`}>0{i + 1}</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className={`w-full md:w-[45%] pl-16 sm:pl-20 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="relative">
                      <p className={`text-[9px] sm:text-[10px] font-mono text-${phase.color} uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 opacity-80`}>{phase.subtitle}</p>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-text-primary mb-2 uppercase tracking-tight leading-snug">
                        {phase.title}
                      </h3>
                      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-heading max-w-sm ml-0 md:ml-auto">
                        {phase.desc}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}