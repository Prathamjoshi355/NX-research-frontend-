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
    <section className="py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            Select Your Path
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tracks.map((track, i) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative glass-panel p-10 rounded-[24px] border-neon-cyan/5 cursor-pointer overflow-hidden"
              >
                {/* Glow Background */}
                <div className={`absolute inset-0 bg-${track.color}/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-${track.color}/10 border border-${track.color}/20 flex items-center justify-center mb-8 text-${track.color} group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all`}>
                  <Icon size={32} />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-text-primary mb-4 group-hover:text-neon-cyan transition-colors">
                  {track.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {track.desc}
                </p>

                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${track.color} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
