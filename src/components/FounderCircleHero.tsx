import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";

export default function FounderCircleHero() {
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
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-bg-primary pt-24 pb-12"
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
              "fixed bottom-8 right-8 z-50 w-[300px] h-[150px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
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
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            isMuted ? "blur-[4px] brightness-[0.35]" : "blur-0 brightness-100"
          }`}
        >
          <source
            src="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1771958328/Founder_Circle_msjyn2.mp4"
            type="video/mp4"
          />
        </video>

        {/* PiP close button */}
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
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-[64px] font-display font-black text-text-primary tracking-tighter mb-4 leading-tight drop-shadow-[0_0_60px_rgba(0,212,255,0.3)]"
              >
                Founder Circle
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-base xs:text-lg sm:text-xl md:text-3xl font-display font-normal text-neon-cyan mb-16 tracking-[0.2em] sm:tracking-widest uppercase drop-shadow-[0_0_30px_rgba(0,212,255,0.6)] px-4"
              >
                Exclusive High-Level Support
              </motion.p>
            </>
          )}
        </AnimatePresence>

      {/* ── Unmute row — Fixed at bottom right ── */}
      <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 flex items-center gap-3">
        {/* Label — only when muted */}
        <AnimatePresence>
          {isMuted && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="text-neon-cyan font-sans text-[10px] sm:text-[12px] font-bold tracking-[2px] uppercase whitespace-nowrap drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
                unmute for experience
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="hidden xs:flex items-center gap-[3px]"
              >
                <div className="w-6 h-[1.5px] bg-neon-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
                <div
                  className="w-0 h-0"
                  style={{
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "6px solid rgb(0,212,255)",
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
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-neon-cyan pointer-events-none"
                />
                <motion.span
                  key="r2"
                  animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                  className="absolute inset-0 rounded-full border border-neon-cyan/40 pointer-events-none"
                />
              </>
            )}
          </AnimatePresence>

          <button
            onClick={toggleMute}
            className="relative w-14 h-14 sm:w-[72px] sm:h-[72px] bg-bg-primary/40 backdrop-blur-3xl border-2 border-neon-cyan rounded-full flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-bg-primary transition-all duration-500 group shadow-[0_0_40px_rgba(0,212,255,0.4)] hover:shadow-[0_0_80px_rgba(0,212,255,0.8)]"
          >
            {isMuted ? (
              <VolumeX size={28} className="group-hover:scale-110 transition-transform" />
            ) : (
              <Volume2 size={28} className="group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
        <AnimatePresence>
          {isMuted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
            <Link
                to="/join?path=startup"
                className="group relative w-full max-w-[280px] sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-transparent border-[1.5px] border-neon-cyan text-neon-cyan font-heading font-semibold text-[12px] sm:text-[14px] tracking-[2px] sm:tracking-[3px] uppercase rounded-[4px] transition-all duration-300 hover:bg-neon-cyan/15 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] text-center"
              >
                Apply to Join
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
