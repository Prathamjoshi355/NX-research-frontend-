import { motion } from "motion/react";
import { HelpCircle, MessageSquare } from "lucide-react";

export default function EmpowermentSupport() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-bg-primary relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-neon-cyan/5 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-panel p-6 sm:p-10 md:p-16 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border-neon-cyan/10"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan mx-auto mb-4 sm:mb-6 md:mb-8">
            <HelpCircle size={28} className="sm:w-8 sm:h-8 md:w-8 md:h-8" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4 md:mb-6 uppercase tracking-tight" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}>
            You don't know where to start?
          </h2>
          
          <p className="text-text-secondary text-base sm:text-lg md:text-lg mb-6 sm:mb-8 md:mb-10 leading-relaxed" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400 }}>
            It's okay to be uncertain. Our advisors are here to help you navigate the ecosystem and find the path that best aligns with your goals.
          </p>

          <button className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-4 bg-neon-cyan text-bg-primary font-bold text-xs sm:text-sm md:text-[14px] tracking-[1.5px] sm:tracking-[2px] uppercase rounded-[4px] sm:rounded-[6px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] flex items-center justify-center gap-2 sm:gap-3 mx-auto whitespace-nowrap" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}>
            <MessageSquare size={16} className="sm:w-5 sm:h-5" />
            <span>Get Guidance</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}