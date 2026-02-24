import React from "react";
import { motion } from "motion/react";

const startups = [
  "NeuralMesh", "QuantumLedger", "BioForge", "EcoSphere", "AstroLink", 
  "CyberShield", "Smart Agri-Grid", "HealthConnect", "UrbanFlow", "EduLink",
  "GreenEnergy", "SecureGov"
];

export default function FounderCircleStartups() {
  return (
    <section className="py-12 bg-bg-primary overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono text-neon-cyan tracking-[0.4em] uppercase"
        >
          Our Startup
        </motion.h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-12 items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* First set of startups */}
          {startups.map((startup, i) => (
            <div
              key={i}
              className="text-2xl md:text-4xl font-display font-black text-white/20 hover:text-neon-cyan transition-colors cursor-default uppercase tracking-tighter"
            >
              {startup}
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {startups.map((startup, i) => (
            <div
              key={`dup-${i}`}
              className="text-2xl md:text-4xl font-display font-black text-white/20 hover:text-neon-cyan transition-colors cursor-default uppercase tracking-tighter"
            >
              {startup}
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
