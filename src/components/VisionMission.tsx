import { motion } from "motion/react";

export default function VisionMission() {
  const missionPoints = [
    "Empowering founders with deep research and technical expertise.",
    "Building a sustainable ecosystem for long-term venture success.",
    "Bridging the gap between government research and private innovation.",
    "Fostering a global community of elite builders and innovators.",
    "Driving technological advancement for social and economic impact."
  ];

  return (
    <section id="vision-mission" className="py-32 bg-gradient-to-b from-bg-secondary to-bg-primary overflow-hidden">
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
            className="p-12 md:p-20 flex flex-col justify-center"
          >
            <span className="font-mono text-[11px] text-neon-cyan tracking-[6px] uppercase mb-6">
              Vision
            </span>
            <h2 className="text-3xl md:text-[32px] font-display font-semibold text-text-primary mb-6 leading-[1.5]">
              To be the world's most impactful research-driven ecosystem, 
              where the boldest ideas find the support they need to redefine the future.
            </h2>
            <p className="font-heading font-normal text-text-secondary text-lg">
              We envision a world where innovation is not just a buzzword, but a structured journey from concept to global impact.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-12 md:p-20 flex flex-col justify-center"
          >
            <span className="font-mono text-[11px] text-gold tracking-[6px] uppercase mb-6">
              Mission
            </span>
            <h2 className="text-2xl font-heading font-semibold text-text-primary mb-10">
              Accelerating the transition from research to reality.
            </h2>
            <motion.ul 
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {missionPoints.map((point, i) => (
                <motion.li 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0 }
                  }}
                  className="flex items-start gap-5 text-text-secondary"
                >
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0 shadow-[0_0_10px_#00ffcc]" />
                  <span className="font-heading font-normal text-[15px]">{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
