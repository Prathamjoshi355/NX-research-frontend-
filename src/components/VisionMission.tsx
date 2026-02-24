import { motion } from "motion/react";

export default function VisionMission() {
  return (
    <section id="vision-mission" className="py-20 md:py-32 bg-gradient-to-b from-bg-secondary to-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Center Divider */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-neon-cyan/0 via-neon-cyan/60 to-neon-cyan/0">
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute w-px h-20 bg-neon-cyan shadow-[0_0_10px_#00d4ff]"
            />
          </div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-20 flex flex-col justify-center"
          >
            <span className="font-mono text-[11px] text-neon-cyan tracking-[6px] uppercase mb-6">
              Vision
            </span>
            <h2 className="text-2xl md:text-[28px] font-display font-semibold text-text-primary mb-6 leading-[1.6]">
              To create a global network where maximum startups are connected through NX Research, 
              enabling every founder to access the support, guidance, and ecosystem needed to build and scale successfully.
            </h2>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-20 flex flex-col justify-center"
          >
            <span className="font-mono text-[11px] text-gold tracking-[6px] uppercase mb-6">
              Mission
            </span>
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
              Empowering the next generation of founders.
            </h2>
            <p className="font-heading font-normal text-text-secondary text-base leading-relaxed mb-6">
              NX Research empowers students and early innovators to transform ideas into real startups by offering mentorship, technical guidance, research opportunities, collaborations, and strategic support.
            </p>
            <p className="font-heading font-normal text-text-secondary text-base leading-relaxed">
              Our mission is to remove the common barriers — resources, funding, direction, and network — so that every passionate founder gets the confidence and ecosystem needed to build and scale.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
