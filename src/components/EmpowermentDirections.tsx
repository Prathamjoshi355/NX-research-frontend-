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
    <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-bg-secondary">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-raleway font-bold text-text-primary uppercase tracking-tight sm:tracking-tighter leading-tight"
          >
            Direction Options
          </motion.h2>
          <p className="mt-3 sm:mt-4 md:mt-5 text-text-secondary font-mono text-[10px] sm:text-xs md:text-sm tracking-widest sm:tracking-[3px] md:tracking-[4px] uppercase">
            Concrete Outcomes
          </p>
        </div>

        {/* Grid Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {options.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-panel p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl border border-neon-cyan/5 hover:border-neon-cyan/20 transition-all duration-300 group h-full flex flex-col"
              >
                <div className={`mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-${opt.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-raleway font-bold text-text-primary mb-1 sm:mb-2 leading-snug">
                  {opt.title}
                </h3>
                <p className="text-text-secondary text-[11px] sm:text-xs md:text-sm leading-relaxed flex-1">
                  {opt.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Advanced Pathways Section - FULLY RESPONSIVE */}
        <div className="mt-12 sm:mt-16 md:mt-24 lg:mt-32 w-full">
          <div className="text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16 w-full">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-raleway font-bold text-text-primary uppercase tracking-tight sm:tracking-wide md:tracking-wider lg:tracking-widest leading-tight"
            >
              Advanced Pathways
            </motion.h3>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mx-auto px-0">
            {options.map((opt, i) => (
              <motion.div
                key={`detailed-${opt.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 p-4 sm:p-5 md:p-6 lg:p-7 rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-2xl bg-bg-primary/50 border border-white/5 hover:border-neon-cyan/10 transition-all duration-300 h-full"
              >
                <div className={`p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-xl bg-${opt.color}/10 text-${opt.color} flex-shrink-0 w-fit`}>
                  <opt.icon size={16} className="sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6" />
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <h4 className="text-sm sm:text-base md:text-base lg:text-lg text-text-primary font-raleway font-bold mb-1 sm:mb-1.5 md:mb-2 leading-snug">
                    {opt.title} Specialization
                  </h4>
                  <p className="text-text-secondary text-[11px] sm:text-xs md:text-xs lg:text-sm leading-relaxed">
                    Advanced mentorship and resource allocation for the {opt.title.toLowerCase()} track.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Raleway Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap');
        
        .font-raleway {
          font-family: 'Raleway', sans-serif;
        }

        /* Ensure proper mobile scaling */
        @media (max-width: 640px) {
          body {
            -webkit-text-size-adjust: 100%;
          }
        }
      `}</style>
    </section>
  );
}