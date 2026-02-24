import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Section } from "./ui/Section";

export const PostEventConnect = () => {
  const steps = [
    { step: "01", title: "Submit Collaboration Intent", desc: "Define your goals and what you bring to the table." },
    { step: "02", title: "Structured Match Review", desc: "Our team evaluates alignment with other participants." },
    { step: "03", title: "Founder Approval", desc: "Both parties review and approve the connection." },
    { step: "04", title: "Scheduled Strategic Introduction", desc: "A curated meeting is set up for high-clarity discussion." },
  ];

  return (
    <Section>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Post-Session Connection</h2>
        <p className="text-zinc-500">How we facilitate strategic introductions after the event.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0 origin-left" 
        />
        
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            whileHover={{ y: -10 }}
            className="relative z-10 glass p-8 rounded-2xl group hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 + 0.3 }}
              className="text-5xl font-bold font-mono text-white/5 group-hover:text-white/20 transition-colors mb-6 block"
            >
              {step.step}
            </motion.span>
            <h3 className="text-lg font-bold mb-3 group-hover:text-white transition-colors">{step.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-24 text-center glass p-8 md:p-16 rounded-3xl max-w-4xl mx-auto border border-white/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <h3 className="text-2xl md:text-3xl font-bold mb-6 relative z-10">Ready to connect with alignment?</h3>
        <p className="text-zinc-400 mb-10 max-w-xl mx-auto relative z-10 text-sm md:text-base">
          Post-event connections are evaluated based on alignment, seriousness, and mutual value.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto bg-white text-black px-6 sm:px-12 py-4 md:py-5 rounded-full font-bold flex items-center justify-center gap-2 sm:gap-3 mx-auto hover:bg-zinc-200 transition-all relative z-10 shadow-xl shadow-white/5 text-sm sm:text-base"
        >
          Request Post-Event Introduction
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </motion.div>
    </Section>
  );
};
