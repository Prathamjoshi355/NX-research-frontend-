import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Laptop, Users, Network, Rocket, UserCircle2 } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "START WITH EMPOWERMENT",
    subtitle: "Learn • Explore • Build Foundation",
    description:
      "Establish a powerful base of knowledge. We provide the tools and environment to explore your potential and build a solid foundation for your future ventures.",
    icon: Laptop,
  },
  {
    id: "02",
    title: "EXECUTE REAL RESEARCH",
    subtitle: "Hands-on • Projects • Publication",
    description:
      "Theory meets practice. Engage in rigorous, hands-on research projects that lead to real-world insights and high-impact publications.",
    icon: Users,
  },
  {
    id: "03",
    title: "GROW THROUGH INITIATIVES",
    subtitle: "Connect • Collaborate • Visibility",
    description:
      "Expand your reach. Our initiatives are designed to connect you with the right people and provide the visibility needed to scale your ideas.",
    icon: Network,
  },
  {
    id: "04",
    title: "TURN IDEAS INTO STARTUPS",
    subtitle: "Build • Validate • Launch",
    description:
      "From concept to company. We guide you through the critical stages of building, validating, and launching your startup into the market.",
    icon: Rocket,
  },
  {
    id: "05",
    title: "JOIN FOUNDERS' CIRCLE",
    subtitle: "Scale • Lead • Impact",
    description:
      "The ultimate destination. Join an elite network of founders where you can scale your impact, lead industries, and create lasting change.",
    icon: UserCircle2,
  },
];

const CYCLE_TIME = 5000;

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextStep, CYCLE_TIME);
    return () => clearInterval(interval);
  }, [nextStep, activeStep]);

  const handleManualStep = (index: number) => {
    setActiveStep(index);
  };

  const Icon = steps[activeStep].icon;

  return (
    <section className="min-h-screen bg-bg-primary text-text-primary relative overflow-hidden flex items-center justify-center py-10 px-4 sm:py-20 sm:px-6">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(0,212,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]" />
      </div>

      {/* Decorative Glows */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.4em] text-neon-cyan/60 uppercase mb-2 sm:mb-3">
            The Journey
          </p>
          <h2 className="font-display text-xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase">
            How It <span className="text-neon-cyan text-glow-cyan">Works</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-24 items-center">
          {/* Left: Visual */}
          <div className="flex justify-center items-center">
            <div className="relative w-44 h-44 sm:w-64 sm:h-64 md:w-80 md:h-80">
              {/* Glowing Rings */}
              <motion.div
                key={activeStep + "-ring-outer"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 rounded-full border border-neon-cyan/20 shadow-[0_0_50px_rgba(0,212,255,0.1)]"
              />
              <motion.div
                key={activeStep + "-ring-inner"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-4 rounded-full border border-neon-cyan/10"
              />

              {/* Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/5"
                />
                <motion.circle
                  key={activeStep}
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="100 100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: CYCLE_TIME / 1000, ease: "linear" }}
                  className="text-neon-cyan"
                />
              </svg>

              {/* Icon Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.2)]">
                    <Icon size={24} className="sm:size-[40px] md:size-[48px] text-neon-cyan" strokeWidth={1.5} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Phase Badge */}
              <motion.div
                key={activeStep + "-badge"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-neon-cyan/20 border border-neon-cyan/40 rounded px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-mono text-neon-cyan font-bold tracking-widest"
              >
                PHASE {steps[activeStep].id}
              </motion.div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="min-h-[220px] sm:min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-neon-cyan/50 uppercase mb-2 sm:mb-4">
                  Step {steps[activeStep].id}
                </p>
                <h3 className="font-display text-base sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-3 leading-tight uppercase">
                  {steps[activeStep].title}
                </h3>
                <p className="text-[9px] sm:text-xs font-mono tracking-widest text-neon-cyan mb-3 sm:mb-6 uppercase">
                  {steps[activeStep].subtitle}
                </p>
                <p className="text-text-secondary text-xs sm:text-sm md:text-base leading-relaxed max-w-md">
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-10 sm:mt-16">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <motion.button
                key={step.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleManualStep(index)}
                className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold border rounded transition-all duration-300 ${
                  isActive
                    ? "bg-neon-cyan text-bg-primary border-neon-cyan shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                    : "bg-white/5 text-neon-cyan/60 border-white/10 hover:border-neon-cyan/40"
                }`}
              >
                {step.id}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}