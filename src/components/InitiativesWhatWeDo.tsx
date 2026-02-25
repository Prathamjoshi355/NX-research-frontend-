import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link2, Zap, Map, Rocket, Brain } from "lucide-react";

const whatWeDo = [
  { icon: <Link2 size={24} />, title: "Connect Talent", desc: "Match builders with real active projects inside NX Research." },
  { icon: <Zap size={24} />, title: "Enable Collaboration", desc: "Break silos — bring researchers, founders, and learners together." },
  { icon: <Map size={24} />, title: "Structured Pathways", desc: "No random networking. Every connection has purpose and direction." },
  { icon: <Rocket size={24} />, title: "Fuel Innovation", desc: "Fast-track ideas from concept to execution through team support." },
  { icon: <Brain size={24} />, title: "Develop Skills", desc: "Learn by doing — contribute to live projects and grow your portfolio." },
];

export default function InitiativesWhatWeDo() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % whatWeDo.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 md:py-20 bg-bg-primary relative overflow-hidden font-sans border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Header Info */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 mb-4"
            >
              <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest">What We Do</span>
            </motion.div>
            <h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight leading-tight">
              Bridging <br className="hidden md:block" />
              <span className="text-neon-cyan">the Gap</span>
            </h2>
          </div>

          {/* Slider Area - No Boxes */}
          <div className="w-full md:w-2/3 relative h-48 md:h-40 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-start gap-6 md:gap-8"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-neon-cyan/10 rounded-2xl flex items-center justify-center border border-neon-cyan/20 shrink-0">
                  <div className="text-neon-cyan">
                    {whatWeDo[current].icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2 tracking-tight">
                    {whatWeDo[current].title}
                  </h3>
                  <p className="text-sm md:text-lg text-text-secondary leading-relaxed font-light max-w-xl">
                    {whatWeDo[current].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Dots */}
            <div className="absolute bottom-0 left-0 flex gap-2">
              {whatWeDo.map((_, i) => (
                <div 
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    current === i ? "w-8 bg-neon-cyan" : "w-2 bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
