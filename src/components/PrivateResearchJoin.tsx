import { motion } from "motion/react";
import { Users, Lightbulb } from "lucide-react";

export default function PrivateResearchJoin() {
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
            Ways to Join NX Private Research
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Join Projects */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative glass-panel rounded-[32px] overflow-hidden border-neon-cyan/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-12 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan mb-8 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all">
                <Users size={32} />
              </div>
              
              <h3 className="text-3xl font-display font-bold text-text-primary mb-6">Join Ongoing Projects</h3>
              
              <ul className="space-y-4 mb-12 flex-grow">
                <li className="flex items-center gap-3 text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  Join active research tracks
                </li>
                <li className="flex items-center gap-3 text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  Get assigned a role
                </li>
                <li className="flex items-center gap-3 text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  Start contributing immediately
                </li>
              </ul>

              <button className="w-full py-4 bg-neon-cyan text-bg-primary font-heading font-bold text-sm uppercase tracking-[2px] rounded-xl transition-all group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]">
                Join Projects
              </button>
            </div>
          </motion.div>

          {/* Suggest Idea */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative glass-panel rounded-[32px] overflow-hidden border-neon-purple/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-12 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple mb-8 group-hover:shadow-[0_0_30px_rgba(123,47,255,0.2)] transition-all">
                <Lightbulb size={32} />
              </div>
              
              <h3 className="text-3xl font-display font-bold text-text-primary mb-6">Suggest Your Idea</h3>
              
              <ul className="space-y-4 mb-12 flex-grow">
                <li className="flex items-center gap-3 text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                  Submit your innovation idea
                </li>
                <li className="flex items-center gap-3 text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                  Get evaluated by NX
                </li>
                <li className="flex items-center gap-3 text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                  Develop into research track
                </li>
              </ul>

              <button className="w-full py-4 bg-neon-purple text-text-primary font-heading font-bold text-sm uppercase tracking-[2px] rounded-xl transition-all group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(123,47,255,0.4)]">
                Suggest Idea
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
