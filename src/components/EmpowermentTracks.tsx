import { motion } from "motion/react";
import { BookOpen, Search, Crown, Building2 } from "lucide-react";

const tracks = [
  { title: "Skill", icon: BookOpen, desc: "Master technical and creative capabilities.", color: "neon-cyan" },
  { title: "Research", icon: Search, desc: "Deep dive into data and policy innovation.", color: "neon-purple" },
  { title: "Founder", icon: Crown, desc: "Prepare for the venture building journey.", color: "gold" },
  { title: "Corporate", icon: Building2, desc: "Strategic transformation for organizations.", color: "teal" },
];

export default function EmpowermentTracks() {
  return (
    <section className="py-6 sm:py-10 md:py-16 lg:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap');
        
        .glass-panel {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 212, 255, 0.1);
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Select Your Path
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {tracks.map((track, i) => {
            const Icon = track.icon;
            const colorMap = {
              "neon-cyan": { hex: "#00d4ff", bg: "rgba(0, 212, 255, 0.1)", border: "rgba(0, 212, 255, 0.2)", glow: "rgba(0, 212, 255, 0.05)" },
              "neon-purple": { hex: "#a855f7", bg: "rgba(168, 85, 247, 0.1)", border: "rgba(168, 85, 247, 0.2)", glow: "rgba(168, 85, 247, 0.05)" },
              "gold": { hex: "#fbbf24", bg: "rgba(251, 191, 36, 0.1)", border: "rgba(251, 191, 36, 0.2)", glow: "rgba(251, 191, 36, 0.05)" },
              "teal": { hex: "#14b8a6", bg: "rgba(20, 184, 166, 0.1)", border: "rgba(20, 184, 166, 0.2)", glow: "rgba(20, 184, 166, 0.05)" },
            };
            const color = colorMap[track.color];
            
            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -12, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="group relative glass-panel p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-3xl border cursor-pointer overflow-hidden transition-all shadow-lg hover:shadow-2xl"
                style={{ borderColor: color.border }}
              >
                {/* Glow Background */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: color.glow }}
                />
                
                {/* Icon Container */}
                <motion.div 
                  className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-2xl border flex items-center justify-center mb-2 sm:mb-3 md:mb-4 lg:mb-6 group-hover:shadow-lg transition-all"
                  style={{
                    backgroundColor: color.bg,
                    borderColor: color.border,
                    color: color.hex
                  }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={24} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                </motion.div>
                
                {/* Title */}
                <motion.h3 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 md:mb-3 group-hover:text-cyan-300 transition-colors"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.1 }}
                >
                  {track.title}
                </motion.h3>

                {/* Description */}
                <motion.p 
                  className="text-gray-400 text-xs sm:text-sm md:text-sm lg:text-sm leading-relaxed"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.2 }}
                >
                  {track.desc}
                </motion.p>

                {/* Bottom Line Animation */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-1 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    background: `linear-gradient(to right, transparent, ${color.hex}, transparent)`
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}