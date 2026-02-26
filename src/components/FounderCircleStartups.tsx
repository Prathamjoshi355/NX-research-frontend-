import React from "react";
import { motion } from "motion/react";

const startups = [
  "Nexisparkx Technologies", "Tastyaana", "Vyorai", "Event Dhara", "Nexisparkx Technologies", "Tastyaana", "Vyorai", "Event Dhara"
];

function StartupMarquee() {
  return (
    <section className="py-2 md:py-4 bg-bg-primary overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-1 md:mb-2 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[9px] md:text-xs font-mono text-neon-cyan tracking-[0.3em] md:tracking-[0.4em] uppercase"
        >
          Our Startups
        </motion.h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-4 md:gap-10 items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {/* First set of startups */}
          {startups.map((startup, i) => (
            <div
              key={i}
              className="text-base sm:text-lg md:text-3xl lg:text-4xl font-display font-black text-white/14 hover:text-neon-cyan transition-colors duration-500 cursor-default uppercase tracking-tighter"
            >
              {startup}
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {startups.map((startup, i) => (
            <div
              key={`dup-${i}`}
              className="text-base sm:text-lg md:text-3xl lg:text-4xl font-display font-black text-white/14 hover:text-neon-cyan transition-colors duration-500 cursor-default uppercase tracking-tighter"
            >
              {startup}
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-6 md:w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-6 md:w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="bg-bg-primary">
      <StartupMarquee />
    </main>
  );
}
