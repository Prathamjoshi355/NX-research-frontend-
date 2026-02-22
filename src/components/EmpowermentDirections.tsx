import { motion } from "motion/react";
import { Microscope, Rocket, Users, Briefcase } from "lucide-react";

const options = [
  { title: "Researcher", icon: Microscope, desc: "Lead deep-tech and policy studies.", color: "neon-purple" },
  { title: "Startup Founder", icon: Rocket, desc: "Build and scale your own venture.", color: "gold" },
  { title: "Join a Startup", icon: Users, desc: "Become a co-founder or key hire.", color: "neon-cyan" },
  { title: "Professional", icon: Briefcase, desc: "Elite career placement in tech.", color: "teal" },
];

export default function EmpowermentDirections() {
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
            Direction Options
          </motion.h2>
          <p className="mt-4 text-text-secondary font-mono text-xs tracking-[4px] uppercase">Concrete Outcomes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-xl border-neon-cyan/5 hover:border-neon-cyan/20 transition-all group"
              >
                <div className={`mb-6 text-${opt.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-display font-bold text-text-primary mb-2">{opt.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{opt.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Section (Repeated as requested with subtle differences) */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-display font-bold text-text-primary uppercase tracking-widest">Advanced Pathways</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {options.map((opt, i) => (
              <motion.div
                key={`detailed-${opt.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 p-6 rounded-2xl bg-bg-primary/50 border border-white/5 hover:border-neon-cyan/10 transition-all"
              >
                <div className={`p-4 rounded-xl bg-${opt.color}/10 text-${opt.color}`}>
                  <opt.icon size={24} />
                </div>
                <div>
                  <h4 className="text-text-primary font-bold mb-1">{opt.title} Specialization</h4>
                  <p className="text-text-secondary text-xs leading-relaxed">Advanced mentorship and resource allocation for the {opt.title.toLowerCase()} track.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
