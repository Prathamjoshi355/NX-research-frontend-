import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "NeuralMesh",
    sector: "AI & Robotics",
    status: "Active",
    desc: "Developing decentralized swarm intelligence for industrial automation.",
    tags: ["Deep Tech", "Recruiting"],
  },
  {
    title: "QuantumLedger",
    sector: "Fintech",
    status: "Recruiting",
    desc: "Next-gen encryption protocols for institutional asset management.",
    tags: ["Security", "Open for contributors"],
  },
  {
    title: "BioForge",
    sector: "HealthTech",
    status: "Prototype",
    desc: "Synthetic biology frameworks for personalized medicine delivery.",
    tags: ["Biotech", "Research Phase"],
  },
  {
    title: "EcoSphere",
    sector: "Sustainability",
    status: "Active",
    desc: "Carbon sequestration monitoring using satellite data and AI.",
    tags: ["Climate", "Data-heavy"],
  },
  {
    title: "AstroLink",
    sector: "SpaceTech",
    status: "Recruiting",
    desc: "Low-latency communication arrays for orbital infrastructure.",
    tags: ["Aerospace", "Open for contributors"],
  },
  {
    title: "CyberShield",
    sector: "Security",
    status: "Active",
    desc: "Autonomous threat detection systems for critical infrastructure.",
    tags: ["Cyber", "Deep Tech"],
  },
];

export default function PrivateResearchProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + projects.length) % projects.length);
  };

  return (
    <section className="py-12 sm:py-20 bg-bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4">
          <div className="text-center sm:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl sm:text-3xl font-display font-bold text-text-primary uppercase tracking-tighter"
            >
              Ongoing Projects
            </motion.h2>
            <p className="mt-1 text-text-secondary font-mono text-[9px] tracking-[2px] uppercase">Active Innovation Tracks</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              className="w-8 h-8 rounded-full border border-neon-cyan/20 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/10 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-8 h-8 rounded-full border border-neon-cyan/20 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/10 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="relative h-[280px] sm:h-[260px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-xl glass-panel p-5 sm:p-6 rounded-xl border-neon-cyan/5 hover:border-neon-cyan/20 transition-all group">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan font-mono text-[9px] uppercase tracking-wider">
                    {projects[currentIndex].sector}
                  </span>
                  <span className={`font-mono text-[9px] uppercase ${
                    projects[currentIndex].status === "Active" ? "text-teal" : 
                    projects[currentIndex].status === "Recruiting" ? "text-neon-purple" : "text-gold"
                  }`}>
                    {projects[currentIndex].status}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-display font-bold text-text-primary mb-2 sm:mb-3 group-hover:text-neon-cyan transition-colors">
                  {projects[currentIndex].title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {projects[currentIndex].desc}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {projects[currentIndex].tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono text-text-dim border border-white/5 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIndex ? "w-6 bg-neon-cyan" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
