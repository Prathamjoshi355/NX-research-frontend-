import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export default function GovResearchHeroPreview() {
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
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-slate-950 pt-16 sm:pt-24 pb-6 sm:pb-12"
    >
      {/* Video Container */}
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
            ? "fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 w-[280px] sm:w-[300px] h-[140px] sm:h-[150px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            : "absolute inset-0 z-0 overflow-hidden"
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
            src="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1771958409/Goverment_n4uysb.mp4"
            type="video/mp4"
          />
        </video>

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
                className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-cyan-400 hover:text-slate-950 transition-all"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Gradient Overlay */}
      <AnimatePresence>
        {isMuted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950/95"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 text-center px-4 sm:px-6 w-full max-w-4xl mx-auto flex flex-col items-center"
      >
        <AnimatePresence>
          {isMuted && (
            <>
       

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 sm:mb-4 leading-tight drop-shadow-[0_0_60px_rgba(34,211,238,0.3)]"
              >
                Government Research
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xs xs:text-sm sm:text-lg md:text-2xl font-normal text-cyan-400 mb-6 sm:mb-10 tracking-[0.15em] sm:tracking-widest drop-shadow-[0_0_30px_rgba(34,211,238,0.6)] px-2 sm:px-4"
              >
                Transforming Policy into Reality
              </motion.p>
            </>
          )}
        </AnimatePresence>

        {/* Unmute row */}
        <div className="w-full flex flex-col xs:flex-row items-center justify-center sm:justify-end gap-3 sm:gap-4 mb-4 sm:mb-6 px-2 sm:px-4 sm:pr-4">
          <AnimatePresence>
            {isMuted && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="text-cyan-400 font-mono text-[9px] sm:text-[12px] font-bold tracking-[1px] sm:tracking-[2px] uppercase whitespace-nowrap">
                  unmute for experience
                </span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="hidden xs:flex items-center gap-[2px]"
                >
                  <div className="w-4 h-[1.5px] bg-cyan-400" />
                  <div
                    className="w-0 h-0"
                    style={{
                      borderTop: "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderLeft: "5px solid rgb(34,211,238)",
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
                    className="absolute inset-0 rounded-full border-2 border-cyan-400 pointer-events-none"
                  />
                  <motion.span
                    key="r2"
                    animate={{ scale: [1, 2.3, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.35 }}
                    className="absolute inset-0 rounded-full border border-cyan-400/30 pointer-events-none"
                  />
                </>
              )}
            </AnimatePresence>

            <button
              onClick={toggleMute}
              className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-[68px] sm:h-[68px] bg-slate-950/60 backdrop-blur-2xl border-2 border-cyan-400 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all duration-500 group shadow-[0_0_35px_rgba(34,211,238,0.35)] hover:shadow-[0_0_70px_rgba(34,211,238,0.75)]"
            >
              {isMuted ? (
                <VolumeX size={22} className="xs:size-[26px] group-hover:scale-110 transition-transform" />
              ) : (
                <Volume2 size={22} className="xs:size-[26px] group-hover:scale-110 transition-transform" />
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
              className="w-full flex justify-center px-3 sm:px-4"
            >
              <button
                className="group relative w-full max-w-xs xs:max-w-[280px] sm:w-auto px-6 xs:px-8 sm:px-12 py-2.5 xs:py-3 sm:py-4 bg-transparent border-[1.5px] border-cyan-400 text-cyan-400 font-semibold text-[11px] xs:text-[12px] sm:text-[14px] tracking-[1.5px] xs:tracking-[2px] sm:tracking-[3px] uppercase rounded-[4px] transition-all duration-300 hover:bg-cyan-400/15 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] text-center"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}