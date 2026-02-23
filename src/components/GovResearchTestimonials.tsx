import { motion } from "motion/react";

const testimonials = [
  {
    name: "Dr. Aris Thorne",
    role: "Lead Researcher",
    type: "Research Contributor",
    quote: "The structured approach at NX allowed us to take a complex policy problem and build a working pilot in record time.",
    img: "https://picsum.photos/seed/aris/200/200",
  },
  {
    name: "James Kalu",
    role: "Founder, UrbanFlow",
    type: "Startup Evolved",
    quote: "Starting as a project lead gave me the domain expertise and network needed to launch UrbanFlow with confidence.",
    img: "https://picsum.photos/seed/james/200/200",
  },
  {
    name: "Sarah Chen",
    role: "Innovation Owner",
    type: "Project Lead",
    quote: "Bridging the gap between government needs and private sector agility is where NX truly shines.",
    img: "https://picsum.photos/seed/sarahc/200/200",
  },
];

export default function GovResearchTestimonials() {
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
            Credibility in Action
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-10 rounded-3xl border-neon-cyan/5 hover:border-neon-cyan/20 transition-all group"
            >
              <div className="flex items-center gap-4 mb-8">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border border-neon-cyan/20" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-text-primary font-bold text-sm">{t.name}</h4>
                  <p className="text-neon-cyan font-mono text-[10px] uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
              
              <p className="text-text-secondary text-sm italic leading-relaxed mb-8">
                "{t.quote}"
              </p>
              
              <div className="pt-6 border-t border-white/5">
                <span className="text-text-dim font-mono text-[9px] uppercase tracking-widest">
                  Path: {t.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
