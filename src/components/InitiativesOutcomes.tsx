import { motion } from "motion/react";
import { Users, FolderOpen, Globe, TrendingUp } from "lucide-react";

const outcomes = [
  { icon: <Users size={24} />, title: "Join Real Teams", desc: "Work alongside active researchers & founders." },
  { icon: <FolderOpen size={24} />, title: "Build Your Portfolio", desc: "Document real contributions to live projects." },
  { icon: <Globe size={24} />, title: "Access Ecosystem", desc: "Tools, mentors, network all in one place." },
  { icon: <TrendingUp size={24} />, title: "Accelerate Growth", desc: "Faster learning curve through structured collaboration." },
];

export default function InitiativesOutcomes() {
  return (
    <section className="py-20 md:py-32 bg-bg-primary relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/5 mb-6"
          >
            <TrendingUp className="w-3 h-3 text-neon-purple" />
            <span className="text-[10px] font-bold text-neon-purple uppercase tracking-widest">After You Connect</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 md:mb-6 tracking-tight uppercase leading-none">
            Long-term <span className="text-neon-purple">Outcomes</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {outcomes.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square p-4 md:p-8 bg-bg-secondary/50 backdrop-blur-md rounded-2xl md:rounded-[2rem] border border-white/5 shadow-sm hover:border-neon-purple/30 transition-all duration-500 group flex flex-col items-center justify-center text-center"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 bg-neon-purple/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 border border-neon-purple/20 group-hover:bg-neon-purple/20 transition-colors shrink-0">
                <div className="text-neon-purple scale-75 md:scale-100">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-[10px] md:text-xl font-bold text-text-primary mb-1 md:mb-3 tracking-tight uppercase leading-tight">{item.title}</h3>
              <p className="text-[8px] md:text-sm text-text-secondary leading-tight font-light line-clamp-2 md:line-clamp-none">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
