import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Section } from "./ui/Section";

export const Benefits = () => {
  const benefits = [
    "Structured introductions (no random networking)",
    "Direct access to aligned domain experts",
    "Research-backed strategic conversations",
    "Opportunity discovery across sectors",
    "Cross-sector collaboration facilitation",
    "Validation & visibility within curated ecosystem"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <div className="bg-white text-black py-32 relative overflow-hidden">
      {/* Decorative Background Element */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -right-64 -top-64 w-[800px] h-[800px] rounded-full border-[60px] border-black/5 pointer-events-none"
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              className="h-1.5 bg-black mb-8"
            />
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Why Join <br /> 
              <span className="text-zinc-400">Founder Circle</span> <br /> 
              Connect?
            </h2>
            <p className="text-zinc-600 text-xl md:text-2xl mb-10 leading-relaxed max-w-md">
              Every session is designed for <span className="text-black font-semibold">clarity</span>, not chaos. We bridge the gap between potential and partnership.
            </p>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="h-px bg-black/10 w-full mb-10 origin-left" 
            />
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="w-2 h-12 bg-black" />
              <p className="font-bold text-xl italic leading-tight">
                "Every session is designed <br /> for clarity, not chaos."
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 p-6 rounded-2xl hover:bg-zinc-50 transition-colors group cursor-default border border-transparent hover:border-zinc-200"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-black/20"
                >
                  <CheckCircle2 className="w-6 h-6" />
                </motion.div>
                <span className="text-lg md:text-xl font-medium tracking-tight">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
    </div>
  );
};
