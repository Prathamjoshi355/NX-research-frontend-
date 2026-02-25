import { motion } from "motion/react";

const projects = [
  {
    title: "Smart Agri-Grid",
    sector: "Agriculture",
    status: "Research Phase",
    desc: "Optimizing irrigation through AI-driven sensor networks.",
    tags: ["Open for contributors", "Data-heavy"],
  },
  {
    title: "HealthConnect",
    sector: "Health",
    status: "Proposal Phase",
    desc: "Decentralized patient record system for rural clinics.",
    tags: ["Policy Focus", "Blockchain"],
  },
  {
    title: "UrbanFlow",
    sector: "Infrastructure",
    status: "Pilot Phase",
    desc: "Real-time traffic management using edge computing.",
    tags: ["Implementation", "Smart City"],
  },
  {
    title: "EduLink",
    sector: "Education",
    status: "Research Phase",
    desc: "Personalized learning pathways for vocational training.",
    tags: ["Social Impact", "AI"],
  },
  {
    title: "GreenEnergy",
    sector: "Energy",
    status: "Proposal Phase",
    desc: "Community-led microgrid management systems.",
    tags: ["Sustainability", "Open Source"],
  },
  {
    title: "SecureGov",
    sector: "Cybersecurity",
    status: "Pilot Phase",
    desc: "Quantum-resistant encryption for public data.",
    tags: ["Deep Tech", "Security"],
  },
];

export default function GovResearchProjects() {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-display font-bold text-text-primary uppercase tracking-tighter leading-none"
          >
            Incoming Projects
          </motion.h2>
          <p className="mt-3 sm:mt-4 text-text-secondary font-mono text-[10px] sm:text-xs tracking-[3px] sm:tracking-[5px] uppercase">
            Public Sector Challenges
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel flex flex-col p-5 sm:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-neon-cyan/5 hover:border-neon-cyan/20 transition-all duration-300 group"
            >
              {/* Top row: sector badge + status */}
              <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
                <span className="shrink-0 px-2.5 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">
                  {project.sector}
                </span>
                <span className="text-text-dim font-mono text-[9px] sm:text-[10px] uppercase tracking-wide text-right">
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-display font-bold text-text-primary mb-2 sm:mb-3 group-hover:text-neon-cyan transition-colors duration-200 leading-snug">
                {project.title}
              </h3>

              {/* Description — grows to fill space */}
              <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5 sm:mb-6">
                {project.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] sm:text-[10px] font-mono text-text-dim border border-white/10 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}