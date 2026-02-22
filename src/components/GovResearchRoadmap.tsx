import { motion } from "motion/react";
import { Lightbulb, Users, FileText, Rocket, Building } from "lucide-react";

const levels = [
  { title: "Idea Selection", icon: Lightbulb, desc: "Identifying high-impact policy problems." },
  { title: "Team Formation", icon: Users, desc: "Assembling cross-disciplinary research units." },
  { title: "Proposal Development", icon: FileText, desc: "Drafting strategic implementation frameworks." },
  { title: "Execution / Pilot", icon: Rocket, desc: "Deploying real-world testing and validation." },
  { title: "Startup Creation", icon: Building, desc: "Spinning off successful pilots into ventures." },
];

export default function GovResearchRoadmap() {
  return (
    <section className="py-32 bg-bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            How Government Research Works
          </motion.h2>
          <p className="mt-4 text-text-secondary font-mono text-xs tracking-[4px] uppercase">Strategic Pathway</p>
        </div>

        <div className="relative">
          {/* Desktop/Tablet Horizontal Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/40 to-neon-cyan/0 hidden md:block -translate-y-1/2" />
          
          {/* Mobile Vertical Connector Line */}
          <div className="absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-neon-cyan/0 via-neon-cyan/40 to-neon-cyan/0 md:hidden" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 relative z-10">
            {levels.map((level, i) => {
              const Icon = level.icon;
              return (
                <motion.div
                  key={level.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex flex-row md:flex-col items-center md:items-center gap-6 md:gap-8 w-full md:w-1/5 group"
                >
                  {/* Icon Node */}
                  <div className="relative shrink-0">
                    <motion.div
                      whileInView={{
                        boxShadow: ["0 0 0px rgba(0,212,255,0)", "0 0 20px rgba(0,212,255,0.4)", "0 0 0px rgba(0,212,255,0)"],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-bg-primary border border-neon-cyan/30 flex items-center justify-center text-neon-cyan z-10 relative group-hover:border-neon-cyan transition-colors"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-neon-cyan text-bg-primary font-mono text-[10px] font-bold flex items-center justify-center z-20">
                      0{i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-left md:text-center">
                    <h3 className="text-lg font-display font-bold text-text-primary mb-2 uppercase tracking-wide group-hover:text-neon-cyan transition-colors">
                      {level.title}
                    </h3>
                    <p className="text-text-secondary text-xs leading-relaxed max-w-[200px] md:mx-auto">
                      {level.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
