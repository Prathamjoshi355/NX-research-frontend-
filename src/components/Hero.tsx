import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  videoSrc?: string;
}

export default function Hero({
  badge = "Innovation Ecosystem",
  title = "Future Support is here",
  subtitle = "Founder Circle",
  videoSrc = "https://res.cloudinary.com/dhy9pmo8s/video/upload/v1771707288/WhatsApp_Video_2026-02-21_at_1.59.15_AM_bfz1ju.mp4"
}: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPip, setIsPip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  // Track scroll to toggle PiP mode reactively
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsPip(latest > 150);
  });

  // PiP transform values (used when NOT in pip mode — for smooth scale-down animation)
  const pipScale = useTransform(scrollY, [0, 100, 400], [1, 1, 0.45]);
  const pipBorderRadius = useTransform(scrollY, [100, 400], [0, 20]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => setIsMuted(true);
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85dvh] w-full overflow-hidden flex items-center justify-center bg-bg-primary pt-20 pb-10"
    >
      {/* ── Video Container ── */}
      <motion.div
        style={
          isPip
            ? {}
            : {
                scale: pipScale,
                borderRadius: pipBorderRadius,
              }
        }
        className={
          isPip
            ? // PiP mode — fixed bottom-right, big enough to see
              "fixed bottom-6 right-6 z-50 w-[200px] sm:w-[300px] h-[112px] sm:h-[168px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-white/10 group/pip"
            : // Hero mode — full screen absolute
              "absolute inset-0 z-0 overflow-hidden"
        }
      >
        <video
          ref={videoRef}
          autoPlay
          loop={isMuted}
          muted={isMuted}
          playsInline
          className={`w-full h-full transition-all duration-700 ${
            isMuted && !isPip ? "object-cover blur-[4px] brightness-[0.35]" : "object-contain blur-0 brightness-100"
          }`}
        >
          <source
            src="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1771707288/WhatsApp_Video_2026-02-21_at_1.59.15_AM_bfz1ju.mp4"
            type="video/mp4"
          />
        </video>

        {/* PiP Controls */}
        <AnimatePresence>
          {isPip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 opacity-0 group-hover/pip:opacity-100 transition-opacity flex items-center justify-center"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-neon-cyan hover:text-bg-primary transition-all"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Gradient Overlay — fades when unmuted ── */}
      <AnimatePresence>
        {isMuted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-bg-primary/30 via-bg-primary/60 to-bg-primary/95"
          />
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 text-center px-6 w-full max-w-4xl mx-auto flex flex-col items-center"
      >
        <AnimatePresence>
          {isMuted && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-block px-4 py-1 border border-neon-cyan/40 rounded-full mb-4 sm:mb-6"
              >
                <span className="font-mono text-[10px] sm:text-[11px] text-neon-cyan tracking-[3px] sm:tracking-[6px] uppercase">
                  {badge}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl xs:text-2xl sm:text-4xl md:text-[64px] font-display font-black text-text-primary tracking-tighter mb-2 sm:mb-3 leading-tight drop-shadow-[0_0_60px_rgba(0,212,255,0.3)]"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-sm xs:text-base sm:text-xl md:text-3xl font-display font-normal text-neon-cyan mb-6 sm:mb-8 tracking-[0.15em] sm:tracking-widest drop-shadow-[0_0_30px_rgba(0,212,255,0.6)] px-4"
              >
                {subtitle}
              </motion.p>
            </>
          )}
        </AnimatePresence>

        {/* ── Unmute row — right aligned, above CTA ── */}
        <div className={`w-full flex items-center gap-2 sm:gap-3 mb-4 px-4 sm:pr-4 ${isMuted ? "justify-center sm:justify-end" : "justify-end"}`}>
          {/* Label — only when muted */}
          <AnimatePresence>
            {isMuted && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="text-neon-cyan font-mono text-[10px] sm:text-[12px] font-bold tracking-[1px] sm:tracking-[2px] uppercase whitespace-nowrap">
                  unmute for experience
                </span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="hidden xs:flex items-center gap-[2px]"
                >
                  <div className="w-4 h-[1.5px] bg-neon-cyan" />
                  <div
                    className="w-0 h-0"
                    style={{
                      borderTop: "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderLeft: "5px solid rgb(0,212,255)",
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mute Button */}
          <div className="relative flex-shrink-0">
            <AnimatePresence>
              {isMuted && (
                <>
                  <motion.span
                    key="r1"
                    animate={{ scale: [1, 1.65, 1], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-neon-cyan pointer-events-none"
                  />
                  <motion.span
                    key="r2"
                    animate={{ scale: [1, 2.3, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.35 }}
                    className="absolute inset-0 rounded-full border border-neon-cyan/30 pointer-events-none"
                  />
                </>
              )}
            </AnimatePresence>

            <button
              onClick={toggleMute}
              className="relative w-12 h-12 sm:w-[68px] sm:h-[68px] bg-bg-primary/60 backdrop-blur-2xl border-2 border-neon-cyan rounded-full flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-bg-primary transition-all duration-500 group shadow-[0_0_35px_rgba(0,212,255,0.35)] hover:shadow-[0_0_70px_rgba(0,212,255,0.75)]"
            >
              {isMuted ? (
                <VolumeX size={22} className="sm:size-[26px] group-hover:scale-110 transition-transform" />
              ) : (
                <Volume2 size={22} className="sm:size-[26px] group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* CTA */}
        <AnimatePresence>
          {isMuted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full flex justify-center px-4"
            >
              <Link
                to="/join"
                className="group relative w-full max-w-[240px] sm:w-auto px-6 sm:px-12 py-2.5 sm:py-4 bg-transparent border-[1.5px] border-neon-cyan text-neon-cyan font-heading font-semibold text-[11px] sm:text-[14px] tracking-[2px] sm:tracking-[3px] uppercase rounded-[4px] transition-all duration-300 hover:bg-neon-cyan/15 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] text-center"
              >
                Get Started
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}