import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO, TechFlow",
    quote: "NX Research transformed our approach to scaling. The Founder Circle network is unmatched.",
    thumbnail: "https://picsum.photos/seed/sarah/800/600",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Founder, GreenGrid",
    quote: "The mentorship provided here is world-class. We went from prototype to series A in 8 months.",
    thumbnail: "https://picsum.photos/seed/marcus/800/600",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "CTO, InnovateAI",
    quote: "Research and innovation are at the heart of NX. They truly understand the future of tech.",
    thumbnail: "https://picsum.photos/seed/elena/800/600",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="testimonials" className="py-32 bg-bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
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
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative bg-panel-bg/80 border border-neon-cyan/8 rounded-[20px] overflow-hidden backdrop-blur-[20px] transition-all duration-300 hover:border-neon-cyan/30 hover:shadow-[0_20px_60px_rgba(0,212,255,0.1)]"
            >
              {/* Thumbnail Area */}
              <div className="relative h-[220px] overflow-hidden bg-gradient-to-br from-bg-primary to-bg-secondary">
                <img 
                  src={t.thumbnail} 
                  alt={t.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Play Button */}
                <button 
                  onClick={() => setActiveVideo(t.videoUrl)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-neon-cyan/15 border-2 border-neon-cyan rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-neon-cyan animate-ping opacity-20" />
                  <Play fill="white" size={20} className="ml-1" />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <p className="font-heading font-normal italic text-[15px] text-text-secondary mb-8 leading-[1.7]">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-heading font-semibold text-[16px] text-text-primary mb-1">{t.name}</h4>
                  <p className="font-mono text-[12px] text-neon-cyan uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg-primary/95 backdrop-blur-xl"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 text-text-primary hover:text-neon-cyan transition-colors drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]"
            >
              <X size={40} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-[800px] aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-neon-cyan/10"
            >
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
