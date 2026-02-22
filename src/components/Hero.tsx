import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
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

  // Handle "play once" logic for focused state
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
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-bg-primary">
      {/* Background Video */}
      <motion.div
        animate={isFocused ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          autoPlay
          loop={!isFocused}
          muted={isMuted}
          playsInline
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isFocused ? "blur-0 brightness-80 z-20" : "blur-[2px] brightness-[0.35] z-0"
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
                Innovation Ecosystem
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-[64px] font-display font-black text-text-primary tracking-tighter mb-4 leading-tight drop-shadow-[0_0_60px_rgba(0,212,255,0.3)]">
              Future Support is here
            </h1>
            <p className="text-xl md:text-3xl font-display font-normal text-neon-cyan mb-12 tracking-widest uppercase drop-shadow-[0_0_30px_rgba(0,212,255,0.6)]">
              Founder Circle
            </p>
            
            <button className="group relative px-12 py-4 bg-transparent border-[1.5px] border-neon-cyan text-neon-cyan font-heading font-semibold text-[14px] tracking-[3px] uppercase rounded-[4px] transition-all duration-300 hover:bg-neon-cyan/15 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Controls (Only when focused) */}
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

      {/* Unmute / Focus Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-bg-primary/40 backdrop-blur-xl border border-neon-cyan/20 rounded-full flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-bg-primary transition-all duration-300 group shadow-[0_0_20px_rgba(0,212,255,0.1)] hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
      >
        {isMuted ? (
          <VolumeX size={20} className="group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 size={20} className="group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Close Focus Button (Only visible when focused) */}
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
