import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
  name: "Harsh Khandelwal",
  role: "Founder, Nexisparks Technology",
  quote: "We highly appreciate NX Research for creating a strong technology-focused ecosystem. Their structured approach, technical guidance, and collaborative support helped us accelerate IT project development and convert innovative concepts into scalable digital solutions.",
  img: "https://picsum.photos/seed/nexisparks/200/200",
},
{
  name: "Harsh Sahu",
  role: "Founder, Tastyaana",
  quote: "NX Research has been instrumental in refining our quick-service operations model. Their strategic mentorship and process optimization support helped us improve delivery efficiency, vehicle coordination, and overall service reliability.",
  img: "https://picsum.photos/seed/tastyaana/200/200",
},
{
  name: "Uday Choubey",
  role: "Founder , Event Dhara",
  quote: "Working with NX Research strengthened our operational systems and event-tech integrations. The ecosystem support enhanced our planning workflows and enabled us to manage large-scale events with better precision and scalability.",
  img: "https://picsum.photos/seed/eventdhara/200/200",
},
{
  name: "Hritik Jaiswal",
  role: "Founder, Vyorai",
  quote: "NX Research provided a collaborative and innovation-driven environment that helped us structure our product roadmap effectively. Their guidance accelerated our execution cycle and improved our go-to-market clarity.",
  img: "https://picsum.photos/seed/vyorai/200/200",
},
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="py-16 sm:py-32 bg-bg-secondary relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            What Founders <span className="text-neon-cyan">Say</span>
          </motion.h2>
        </div>

        <div className="relative min-h-[320px] sm:min-h-[380px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 }
              }}
              className="w-full"
            >
              <div className="glass-panel p-8 sm:p-16 rounded-[32px] border-white/5 relative group">
                {/* Quote Icon */}
                <div className="absolute -top-6 left-12 w-12 h-12 bg-bg-primary border border-white/10 rounded-2xl flex items-center justify-center text-neon-cyan shadow-xl">
                  <Quote size={24} fill="currentColor" className="opacity-20" />
                </div>

                <div className="flex flex-col items-center text-center">
                  <p className="text-text-primary text-base sm:text-xl md:text-2xl font-heading leading-relaxed mb-10 italic">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonials[currentIndex].img} 
                      alt={testimonials[currentIndex].name} 
                      className="w-14 h-14 rounded-full border-2 border-neon-cyan/30 p-0.5" 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                    />
                    <div className="text-left">
                      <h3 className="text-text-primary font-bold text-base sm:text-lg">{testimonials[currentIndex].name}</h3>
                      <p className="text-neon-cyan font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:block">
            <button
              onClick={prevSlide}
              className="absolute -left-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/40 transition-all bg-white/5 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/40 transition-all bg-white/5 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation & Dots */}
        <div className="flex flex-col items-center gap-8 mt-12">
          <div className="flex items-center gap-6 md:hidden">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-neon-cyan transition-all bg-white/5"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-neon-cyan transition-all bg-white/5"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? "w-8 bg-neon-cyan" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
