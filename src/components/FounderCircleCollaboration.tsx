import { motion } from "motion/react";
import { Cpu, Microscope, Users, Palette, Building2 } from "lucide-react";

const areas = [
  {
    title: "Product & Technology",
    subtitle: "Scalable Architecture",
    icon: Cpu,
    color: "text-neon-cyan",
    bgColor: "bg-neon-cyan/10",
    borderColor: "border-neon-cyan/20",
    glowColor: "bg-neon-cyan/5",
  },
  {
    title: "Research & Innovation",
    subtitle: "Deep-Tech Integration",
    icon: Microscope,
    color: "text-neon-purple",
    bgColor: "bg-neon-purple/10",
    borderColor: "border-neon-purple/20",
    glowColor: "bg-neon-purple/5",
  },
  {
    title: "Team Building",
    subtitle: "Elite Talent Acquisition",
    icon: Users,
    color: "text-teal",
    bgColor: "bg-teal/10",
    borderColor: "border-teal/20",
    glowColor: "bg-teal/5",
  },
  {
    title: "Branding & Marketing",
    subtitle: "Strategic Positioning",
    icon: Palette,
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/20",
    glowColor: "bg-gold/5",
  },
  {
    title: "Workspace & Infrastructure",
    subtitle: "Global Operations",
    icon: Building2,
    color: "text-neon-blue",
    bgColor: "bg-neon-blue/10",
    borderColor: "border-neon-blue/20",
    glowColor: "bg-neon-blue/5",
  },
];

export default function FounderCircleCollaboration() {
  return (
    <section className="py-14 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-[32px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            Our Areas of Collaboration
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {areas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative glass-panel p-5 rounded-xl border-neon-cyan/5 hover:border-neon-cyan/20 transition-all cursor-default"
              >
                <div className={`w-9 h-9 rounded-lg ${area.bgColor} border ${area.borderColor} flex items-center justify-center ${area.color} mb-4 group-hover:shadow-[0_0_14px_rgba(0,212,255,0.2)] transition-all`}>
                  <Icon size={18} />
                </div>
                <h3 className="text-xs font-display font-bold text-text-primary mb-1 group-hover:text-neon-cyan transition-colors">
                  {area.title}
                </h3>
                <p className="text-text-secondary text-[9px] uppercase tracking-widest font-mono">
                  {area.subtitle}
                </p>

                {/* Glow Effect */}
                <div className={`absolute inset-0 ${area.glowColor} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}