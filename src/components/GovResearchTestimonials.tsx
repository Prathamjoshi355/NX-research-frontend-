import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

const testimonials = [
  {
    name: "Dr. Aris Thorne",
    role: "Lead Researcher",
    type: "Research Contributor",
    quote:
      "The structured approach at NX allowed us to take a complex policy problem and build a working pilot in record time.",
    img: "https://picsum.photos/seed/aris/200/200",
  },
  {
    name: "James Kalu",
    role: "Founder, UrbanFlow",
    type: "Startup Evolved",
    quote:
      "Starting as a project lead gave me the domain expertise and network needed to launch UrbanFlow with confidence.",
    img: "https://picsum.photos/seed/james/200/200",
  },
  {
    name: "Sarah Chen",
    role: "Innovation Owner",
    type: "Project Lead",
    quote:
      "Bridging the gap between government needs and private sector agility is where NX truly shines.",
    img: "https://picsum.photos/seed/sarahc/200/200",
  },
];

const SLIDE_INTERVAL = 4000;

export default function GovResearchTestimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActive((prev) =>
        (prev + dir + testimonials.length) % testimonials.length
      );
    },
    []
  );

  const goTo = useCallback((idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  // Auto-scroll
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(1), SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, go]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!paused) {
      timerRef.current = setInterval(() => go(1), SLIDE_INTERVAL);
    }
  };

  const handlePrev = () => { go(-1); resetTimer(); };
  const handleNext = () => { go(1); resetTimer(); };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -60 }),
  };

  return (
    <section className="py-24 md:py-32 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-14 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            Credibility in Action
          </motion.h2>
        </div>

        {/* ── Desktop: 3-column static grid ── */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-10 rounded-3xl border border-neon-cyan/5 hover:border-neon-cyan/20 transition-all group"
            >
              <div className="flex items-center gap-4 mb-8">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-neon-cyan/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-text-primary font-bold text-sm">{t.name}</h4>
                  <p className="text-neon-cyan font-mono text-[10px] uppercase tracking-wider">
                    {t.role}
                  </p>
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

        {/* ── Mobile: auto-scroll carousel ── */}
        <div
          className="md:hidden relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Card */}
          <div className="relative overflow-hidden min-h-[280px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="glass-panel p-8 rounded-3xl border border-neon-cyan/5"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonials[active].img}
                    alt={testimonials[active].name}
                    className="w-12 h-12 rounded-full border border-neon-cyan/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-text-primary font-bold text-sm">
                      {testimonials[active].name}
                    </h4>
                    <p className="text-neon-cyan font-mono text-[10px] uppercase tracking-wider">
                      {testimonials[active].role}
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm italic leading-relaxed mb-6">
                  "{testimonials[active].quote}"
                </p>
                <div className="pt-5 border-t border-white/5">
                  <span className="text-text-dim font-mono text-[9px] uppercase tracking-widest">
                    Path: {testimonials[active].type}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-6 px-1">
            {/* Prev arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8L10 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); resetTimer(); }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 bg-neon-cyan"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={handleNext}
              aria-label="Next"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Auto-progress bar */}
          {!paused && (
            <motion.div
              key={active + "-bar"}
              className="mt-4 h-px bg-neon-cyan/30 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}