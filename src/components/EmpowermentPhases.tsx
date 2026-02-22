import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";

const phases = [
  {
    title: "Entry & Clarity",
    subtitle: "Foundation Journey",
    desc: "Clarity Call / Start → Observe & Learn",
    color: "neon-cyan",
  },
  {
    title: "Track Selection",
    subtitle: "Specialization",
    desc: "Skill / Research / Founder / Corporate",
    color: "neon-purple",
  },
  {
    title: "Capability Score",
    subtitle: "Readiness Check",
    desc: "Assessment & Feedback Loop",
    color: "teal",
  },
  {
    title: "Direction Selection",
    subtitle: "Outcome Focus",
    desc: "Research / Startup / Professional",
    color: "gold",
  },
  {
    title: "Ecosystem Integration",
    subtitle: "Full Access",
    desc: "Join the Global Network",
    color: "neon-blue",
  },
];

export default function EmpowermentPhases() {
  return (
    <section className="py-32 bg-bg-secondary relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            Phases During the Journey
          </motion.h2>
        </div>

        {/* Desktop: Horizontal Snake Flow */}
        <div className="hidden lg:flex flex-wrap justify-center gap-y-24 gap-x-4 relative">
          {phases.map((phase, i) => (
            <div key={phase.title} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-64 glass-panel p-8 rounded-2xl border-neon-cyan/10 relative group"
              >
                <div className={`w-10 h-10 rounded-lg bg-${phase.color}/10 border border-${phase.color}/30 flex items-center justify-center mb-6 text-${phase.color}`}>
                  <span className="font-mono text-xs font-bold">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-text-primary mb-2">{phase.title}</h3>
                <p className={`text-xs font-mono text-${phase.color} uppercase tracking-widest mb-4`}>{phase.subtitle}</p>
                <p className="text-text-secondary text-xs leading-relaxed">{phase.desc}</p>
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-${phase.color}/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
              </motion.div>

              {i < phases.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  whileInView={{ opacity: 1, width: 40 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center justify-center"
                >
                  <ArrowRight className="text-text-dim" size={24} />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Vertical Stacked Pathway */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          {phases.map((phase, i) => (
            <div key={phase.title} className="flex flex-col items-center w-full max-w-sm">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full glass-panel p-8 rounded-2xl border-neon-cyan/10"
              >
                <div className={`w-10 h-10 rounded-lg bg-${phase.color}/10 border border-${phase.color}/30 flex items-center justify-center mb-6 text-${phase.color}`}>
                  <span className="font-mono text-xs font-bold">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-text-primary mb-2">{phase.title}</h3>
                <p className={`text-xs font-mono text-${phase.color} uppercase tracking-widest mb-4`}>{phase.subtitle}</p>
                <p className="text-text-secondary text-xs leading-relaxed">{phase.desc}</p>
              </motion.div>
              
              {i < phases.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: 32 }}
                  viewport={{ once: true }}
                  className="py-4"
                >
                  <ArrowDown className="text-text-dim" size={24} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
