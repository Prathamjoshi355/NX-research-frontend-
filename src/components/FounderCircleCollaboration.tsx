import { motion } from "motion/react";
import { Cpu, Microscope, Users, Palette, Building2 } from "lucide-react";

const areas = [
  {
    title: "Product & Technology",
    subtitle: "Scalable Architecture",
    icon: Cpu,
    color: "neon-cyan",
  },
  {
    title: "Research & Innovation",
    subtitle: "Deep-Tech Integration",
    icon: Microscope,
    color: "neon-purple",
  },
  {
    title: "Team Building",
    subtitle: "Elite Talent Acquisition",
    icon: Users,
    color: "teal",
  },
  {
    title: "Branding & Marketing",
    subtitle: "Strategic Positioning",
    icon: Palette,
    color: "gold",
  },
  {
    title: "Workspace & Infrastructure",
    subtitle: "Global Operations",
    icon: Building2,
    color: "neon-blue",
  },
];

export default function FounderCircleCollaboration() {
  return (
    <section className="py-32 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            Our Areas of Collaboration
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {areas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative glass-panel p-8 rounded-2xl border-neon-cyan/5 hover:border-neon-cyan/20 transition-all cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-${area.color}/10 border border-${area.color}/20 flex items-center justify-center text-${area.color} mb-6 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-sm font-display font-bold text-text-primary mb-2 group-hover:text-neon-cyan transition-colors">
                  {area.title}
                </h3>
                <p className="text-text-secondary text-[10px] uppercase tracking-widest font-mono">
                  {area.subtitle}
                </p>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-${area.color}/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
