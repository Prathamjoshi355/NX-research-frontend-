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
    <section className="py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            Incoming Projects
          </motion.h2>
          <p className="mt-4 text-text-secondary font-mono text-xs tracking-[4px] uppercase">Public Sector Challenges</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl border-neon-cyan/5 hover:border-neon-cyan/20 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan font-mono text-[10px] uppercase tracking-wider">
                  {project.sector}
                </span>
                <span className="text-text-dim font-mono text-[10px] uppercase">
                  {project.status}
                </span>
              </div>
              
              <h3 className="text-xl font-display font-bold text-text-primary mb-4 group-hover:text-neon-cyan transition-colors">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-8">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-text-dim border border-white/5 px-2 py-1 rounded">
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
