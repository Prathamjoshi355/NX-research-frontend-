import { motion } from "motion/react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Researcher",
    quote: "The collaboration tools and AI assistance at NX allowed me to focus entirely on the core innovation.",
    img: "https://picsum.photos/seed/alex/200/200",
  },
  {
    name: "Maya Patel",
    role: "Founder, NeuralMesh",
    quote: "Starting as a private research track was the best decision for our startup. The ecosystem support is incredible.",
    img: "https://picsum.photos/seed/maya/200/200",
  },
  {
    name: "David Kim",
    role: "Contributor",
    quote: "I joined an ongoing project and within months I was leading a sub-track. The growth here is exponential.",
    img: "https://picsum.photos/seed/david/200/200",
  },
];

export default function Testimonials() {
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
            What Founders Say
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
              
              <p className="text-text-secondary text-sm italic leading-relaxed">
                "{t.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
