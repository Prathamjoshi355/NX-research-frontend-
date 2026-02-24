import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

const steps = [
  { 
    title: "Idea Submission", 
    desc: "Share your concept",
    details: "Submit your research-backed idea through our portal. We look for systemic solutions and deep-tech innovations."
  },
  { 
    title: "Founder Interview", 
    desc: "Evaluate vision & fit",
    details: "A deep dive into your technical roadmap and long-term vision with our core research team."
  },
  { 
    title: "Selection", 
    desc: "Join the Circle",
    details: "Successful candidates receive full access to our ecosystem, including mentorship and research support."
  },
  { 
    title: "Start Building", 
    desc: "Grow with ecosystem",
    details: "Begin your journey with dedicated resources, peer support, and strategic guidance to scale your impact."
  },
];

export default function FounderCircleProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

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

        <div className="relative flex flex-col lg:flex-row items-start justify-between gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col lg:flex-row items-center gap-8 w-full lg:w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                className={`w-full lg:w-64 glass-panel p-8 rounded-xl border transition-all duration-300 text-center relative group cursor-pointer ${
                  activeStep === i ? "border-neon-cyan bg-neon-cyan/5" : "border-neon-cyan/10"
                }`}
              >
                <div className={`w-10 h-10 rounded-full font-mono text-xs font-bold flex items-center justify-center mx-auto mb-6 transition-colors ${
                  activeStep === i ? "bg-neon-cyan text-bg-primary" : "bg-neon-cyan/20 text-neon-cyan"
                }`}>
                  0{i + 1}
                </div>
                <h4 className="text-lg font-display font-bold text-text-primary mb-2">{step.title}</h4>
                <p className="text-text-secondary text-xs leading-relaxed mb-4">{step.desc}</p>
                
                <motion.div
                  animate={{ rotate: activeStep === i ? 180 : 0 }}
                  className="flex justify-center text-neon-cyan/40"
                >
                  <ChevronDown size={16} />
                </motion.div>

                <AnimatePresence>
                  {activeStep === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-[11px] text-text-secondary/80 leading-relaxed border-t border-white/5 pt-4">
                        {step.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-neon-cyan/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10" />
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
