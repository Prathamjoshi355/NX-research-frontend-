import { motion } from "motion/react";
import { HelpCircle, MessageSquare } from "lucide-react";

export default function EmpowermentSupport() {
  return (
    <section className="py-32 bg-bg-primary relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-12 md:p-20 rounded-[40px] border-neon-cyan/10"
        >
          <div className="w-16 h-16 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan mx-auto mb-8">
            <HelpCircle size={32} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6 uppercase tracking-tight">
            You don't know where to start?
          </h2>
          
          <p className="text-text-secondary text-lg mb-10 leading-relaxed font-heading font-normal">
            It's okay to be uncertain. Our advisors are here to help you navigate the ecosystem and find the path that best aligns with your goals.
          </p>

          <button className="group relative px-10 py-4 bg-neon-cyan text-bg-primary font-heading font-bold text-[14px] tracking-[2px] uppercase rounded-[6px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] flex items-center justify-center gap-3 mx-auto">
            <MessageSquare size={18} />
            Get Guidance
          </button>
        </motion.div>
      </div>
    </section>
  );
}
