import { motion } from "motion/react";

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
  return (
    <section className="py-32 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            Ongoing Projects
          </motion.h2>
          <p className="mt-4 text-text-secondary font-mono text-xs tracking-[4px] uppercase">Active Innovation Tracks</p>
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
                <span className={`font-mono text-[10px] uppercase ${
                  project.status === "Active" ? "text-teal" : 
                  project.status === "Recruiting" ? "text-neon-purple" : "text-gold"
                }`}>
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
