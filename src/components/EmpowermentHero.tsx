import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmpowermentHero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPip, setIsPip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsPip(latest > 150);
  });

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
      className="relative min-h-[70dvh] sm:min-h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-bg-primary pt-16 pb-8 sm:pt-24 sm:pb-12"
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
            ? "fixed bottom-4 right-4 z-50 w-[200px] h-[112px] xs:w-[240px] xs:h-[135px] sm:w-[300px] sm:h-[150px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] bg-black"
            : "absolute inset-0 z-0 overflow-hidden bg-black"
        }
      >
        <video
          ref={videoRef}
          autoPlay
          loop={isMuted}
          muted={isMuted}
          playsInline
          className={`w-full h-full transition-[filter,brightness,object-fit] duration-700 ${
            isMuted && !isPip ? "object-cover object-center blur-[1px] brightness-[0.90]" : "object-contain blur-0 brightness-100"
          }`}
        >
          <source
            src="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1771707288/WhatsApp_Video_2026-02-21_at_1.59.15_AM_bfz1ju.mp4"
            type="video/mp4"
          />
        </video>

        {/* PiP Controls & Apply Now */}
        <AnimatePresence>
          {isPip && ( 
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 group-hover/pip:bg-black/60 transition-colors flex flex-col items-center justify-center gap-3"
            >
              <Link
                to="/join"
                className="px-4 py-1.5 bg-neon-cyan text-bg-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
              >
                Apply Now
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-neon-cyan hover:text-bg-primary transition-all"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Apply Now Button (Bottom Left) ── */}
      <AnimatePresence>
        {!isMuted && !isPip && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-8 left-8 z-30"
          >
            <Link
              to="/join"
              className="group relative flex items-center gap-3 px-6 py-3 bg-bg-primary/40 backdrop-blur-md border border-neon-cyan/50 text-neon-cyan font-bold uppercase tracking-[0.2em] text-xs rounded-full hover:bg-neon-cyan hover:text-bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
            >
              Apply Now
              <div className="w-2 h-2 rounded-full bg-neon-cyan group-hover:bg-bg-primary animate-pulse" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Gradient Overlay ── */}
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
        className="relative z-20 text-center px-4 xs:px-6 w-full max-w-4xl mx-auto flex flex-col items-center"
      >
        <AnimatePresence>
          {isMuted && (
            <>
           

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-[32px] xs:text-[40px] sm:text-4xl md:text-[64px] font-display font-black text-text-primary tracking-tighter mb-3 sm:mb-4 leading-[1.1] drop-shadow-[0_0_60px_rgba(0,212,255,0.3)] px-2"
              >
                Empowerment & Transformation
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-[16px] xs:text-[18px] sm:text-xl md:text-3xl font-display font-normal text-neon-cyan mb-8 sm:mb-10 tracking-[0.15em] xs:tracking-[0.2em] sm:tracking-widest uppercase drop-shadow-[0_0_30px_rgba(0,212,255,0.6)] px-2"
              >
                Foundation for Success
              </motion.p>
            </>
          )}
        </AnimatePresence>

        {/* ── Unmute row ── */}
        <div className="w-full flex items-center justify-center sm:justify-end gap-2 sm:gap-3 mb-5 sm:mb-6 px-2 sm:pr-4">
          <AnimatePresence>
            {isMuted && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 xs:gap-2"
              >
                <span className="text-neon-cyan font-mono text-[9px] xs:text-[10px] sm:text-[12px] font-bold tracking-[1px] sm:tracking-[2px] uppercase whitespace-nowrap">
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
              className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-[68px] sm:h-[68px] bg-bg-primary/60 backdrop-blur-2xl border-2 border-neon-cyan rounded-full flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-bg-primary transition-all duration-500 group shadow-[0_0_35px_rgba(0,212,255,0.35)] hover:shadow-[0_0_70px_rgba(0,212,255,0.75)] active:scale-95"
            >
              {isMuted ? (
                <VolumeX size={22} className="sm:hidden group-hover:scale-110 transition-transform" />
              ) : (
                <Volume2 size={22} className="sm:hidden group-hover:scale-110 transition-transform" />
              )}
              {isMuted ? (
                <VolumeX size={26} className="hidden sm:block group-hover:scale-110 transition-transform" />
              ) : (
                <Volume2 size={26} className="hidden sm:block group-hover:scale-110 transition-transform" />
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
              className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2 xs:px-4"
            >
              <Link
                to="/join"
                className="group relative w-full max-w-[320px] sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 bg-transparent border-[1.5px] border-neon-cyan text-neon-cyan font-heading font-semibold text-[11px] xs:text-[12px] sm:text-[14px] tracking-[2px] sm:tracking-[3px] uppercase rounded-[4px] transition-all duration-300 hover:bg-neon-cyan/15 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] active:scale-[0.98] text-center"
              >
                I Know My Path
              </Link>
              <Link
                to="/join?path=dont-know"
                className="group relative w-full max-w-[320px] sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 bg-transparent border-[1.5px] border-neon-cyan text-neon-cyan font-heading font-semibold text-[11px] xs:text-[12px] sm:text-[14px] tracking-[2px] sm:tracking-[3px] uppercase rounded-[4px] transition-all duration-300 hover:bg-neon-cyan/15 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] active:scale-[0.98] text-center"
              >
                I Don't Know
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}