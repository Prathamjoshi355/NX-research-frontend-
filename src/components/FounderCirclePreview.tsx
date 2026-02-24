import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function FounderCirclePreview() {
  const highlights = [
    "Mentorship & Guidance",
    "Founder Collaboration",
    "Scaling Support",
    "Investor Access",
  ];

  const founders = [
    {
      src: "/images/founder1.jpg",
      top: "0%",
      left: "0%",
      rotate: "-4deg",
      delay: 0,
    },
    {
      src: "/images/founder2.jpg",
      top: "0%",
      left: "52%",
      rotate: "4deg",
      delay: 0.3,
    },
    {
      src: "/images/founder3.jpg",
      top: "52%",
      left: "22%",
      rotate: "-2deg",
      delay: 0.6,
    },
    {
      src: "/images/founder4.jpg",
      top: "52%",
      left: "30%",
      rotate: "-2deg",
      delay: 0.6,
    },
  ];

  return (
    <section
      id="fcc"
      className="py-24 bg-gradient-to-br from-bg-secondary via-[#0a1020] to-[#06080f] relative overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#00d4ff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-[24px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16"
        >
          {/* ───── Left Side ───── */}
          <div className="lg:w-[55%]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-[11px] text-gold tracking-[5px] uppercase">
                Exclusive Program
              </span>
            </div>

            <h2 className="text-4xl md:text-[40px] font-display font-bold text-text-primary mb-8 leading-tight">
              Founder Circle — <br />
              <span className="text-neon-cyan">Structured Growth Ecosystem</span>
            </h2>

            <p className="font-heading font-normal text-text-secondary text-lg mb-10 leading-[1.8] max-w-2xl">
              Founder's Circle is the structured startup growth ecosystem within
              NX Research. It brings together serious founders, innovators, and
              execution-focused teams to refine ideas, validate models, and
              build scalable ventures. Through collaborative reviews, strategic
              guidance, and ecosystem support, startups receive structured
              direction and milestone-based growth tracking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 text-text-primary border-l-2 border-teal/30 pl-4"
                >
                  <CheckCircle2 size={18} className="text-teal" />
                  <span className="font-heading font-medium text-[14px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/join?path=startup"
              className="inline-block px-10 py-4 bg-gradient-to-r from-neon-cyan to-neon-blue text-bg-primary font-heading font-bold text-[14px] rounded-[6px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              Apply to Join
            </Link>
          </div>

          {/* ───── Right Side — Founder Cards ───── */}
          <div className="lg:w-[45%] w-full">

            {/* MOBILE: vertical stack */}
            <div className="flex lg:hidden flex-col gap-5">
              {founders.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: f.delay }}
                  className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,212,255,0.15)] relative"
                >
                  <img
                    src={f.src}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">

                  </div>
                </motion.div>
              ))}
            </div>

            {/* DESKTOP: scattered floating cards */}
            <div className="hidden lg:block relative h-[420px]">
              {/* Glow blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon-cyan/10 blur-[90px] rounded-full pointer-events-none" />

              {founders.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: f.delay, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    top: f.top,
                    left: f.left,
                    rotate: f.rotate,
                    zIndex: founders.length - i,
                  }}
                  className="w-[178px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(0,212,255,0.2)] hover:scale-105 hover:z-10 transition-transform duration-300"
                >
                  <img
                    src={f.src}
                    className="w-full h-[210px] object-cover"
                  />
                  <div className="bg-[#0a1020]/90 backdrop-blur-md px-3 py-2 border-t border-white/10">
                   
                  </div>
                </motion.div>
              ))}

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [-10, -70],
                    x: Math.random() * 30 - 15,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                  className="absolute w-1 h-1 bg-neon-cyan/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: `${10 + Math.random() * 30}%`,
                  }}
                />
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}