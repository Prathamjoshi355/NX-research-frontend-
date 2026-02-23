import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const steps = [
  { title: "Idea Submission", desc: "Share your concept" },
  { title: "Founder Interview", desc: "Evaluate vision & fit" },
  { title: "Selection", desc: "Join the Circle" },
  { title: "Start Building", desc: "Grow with ecosystem" },
];

export default function FounderCircleProcess() {
  return (
    <section className="py-32 bg-bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            How It Works
          </motion.h2>
          <p className="mt-4 text-text-secondary font-mono text-xs tracking-[4px] uppercase">Admission Process</p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col lg:flex-row items-center gap-8 w-full lg:w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full lg:w-64 glass-panel p-8 rounded-xl border-neon-cyan/10 text-center relative group"
              >
                <div className="w-10 h-10 rounded-full bg-neon-cyan/20 text-neon-cyan font-mono text-xs font-bold flex items-center justify-center mx-auto mb-6">
                  0{i + 1}
                </div>
                <h4 className="text-lg font-display font-bold text-text-primary mb-2">{step.title}</h4>
                <p className="text-text-secondary text-xs leading-relaxed">{step.desc}</p>
                
                <div className="absolute inset-0 bg-neon-cyan/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="hidden lg:block"
                >
                  <ArrowRight className="text-neon-cyan/40" size={24} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
