import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export default function JoinHero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [showHighlight, setShowHighlight] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (showHighlight) setShowHighlight(false);
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    
    if (!nextMuted) {
      setIsFocused(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    } else {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (isFocused) {
        setIsFocused(false);
        setIsMuted(true);
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [isFocused]);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-bg-primary">
      {/* Background Video */}
      <motion.div
        animate={isFocused ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full bg-black"
      >
        <video
          ref={videoRef}
          autoPlay
          loop={!isFocused}
          muted={isMuted}
          playsInline
          className={`w-full h-full transition-all duration-1000 object-center ${
            isFocused 
              ? "blur-0 brightness-100 z-20 object-contain md:object-cover" 
              : "blur-[4px] brightness-[0.35] z-0 object-cover"
          }`}
        >
          <source src="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1771707288/WhatsApp_Video_2026-02-21_at_1.59.15_AM_bfz1ju.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-bg-primary/30 via-bg-primary/60 to-bg-primary/95" />

      {/* Overlay Content */}
      <AnimatePresence>
        {!isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 text-center px-6"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1 border border-neon-cyan/40 rounded-full mb-8"
            >
              <span className="font-mono text-[11px] text-neon-cyan tracking-[6px] uppercase">
                Join the Ecosystem
              </span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-[64px] font-display font-black text-text-primary tracking-tighter mb-4 leading-tight drop-shadow-[0_0_60px_rgba(0,212,255,0.3)]">
              Start Your Journey
            </h1>
            <p className="text-lg sm:text-xl md:text-3xl font-display font-normal text-neon-cyan mb-12 tracking-widest uppercase drop-shadow-[0_0_30px_rgba(0,212,255,0.6)]">
              Apply to NX Research
            </p>
            
            <button 
              onClick={() => document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-12 py-4 bg-transparent border-[1.5px] border-neon-cyan text-neon-cyan font-heading font-semibold text-[14px] tracking-[3px] uppercase rounded-[4px] transition-all duration-300 hover:bg-neon-cyan/15 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              Begin Application
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Controls */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-10 left-10 right-10 z-30 flex items-center justify-between pointer-events-none"
          >
            <div className="flex items-center gap-4 pointer-events-auto">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
              <span className="text-text-primary/50 font-mono text-[10px] font-bold uppercase tracking-widest">Live Cinematic Stream</span>
            </div>
            <div className="h-[2px] flex-1 mx-10 bg-white/10 rounded-full overflow-hidden pointer-events-auto">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 15, ease: "linear" }}
                className="h-full bg-neon-cyan"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <AnimatePresence>
          {showHighlight && isMuted && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.8, 1.2], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-neon-cyan pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none"
              >
                <span className="text-neon-cyan font-mono text-[10px] font-bold tracking-[3px] uppercase bg-bg-primary/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-neon-cyan/30 shadow-[0_0_20px_rgba(0,212,255,0.2)] whitespace-nowrap">
                  Unmute for Experience
                </span>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center"
                >
                  <div className="w-6 h-[1px] bg-neon-cyan" />
                  <div className="w-1.5 h-1.5 border-t border-r border-neon-cyan rotate-45 -ml-1.5" />
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <button
          onClick={toggleMute}
          className="relative w-12 h-12 bg-bg-primary/40 backdrop-blur-xl border border-neon-cyan/20 rounded-full flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-bg-primary transition-all duration-300 group shadow-[0_0_20px_rgba(0,212,255,0.1)] hover:shadow-[0_0_30_rgba(0,212,255,0.3)]"
        >
          {isMuted ? (
            <VolumeX size={20} className="group-hover:scale-110 transition-transform" />
          ) : (
            <Volume2 size={20} className="group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {isFocused && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => { setIsFocused(false); setIsMuted(true); }}
          className="fixed top-24 right-8 z-40 px-6 py-2 bg-bg-primary/40 backdrop-blur-md border border-neon-cyan/30 rounded-full text-text-primary font-heading font-bold text-xs uppercase tracking-widest hover:bg-neon-cyan hover:text-bg-primary transition-all"
        >
          Exit View
        </motion.button>
      )}
    </section>
  );
}
