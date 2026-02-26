import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function FounderCirclePreview() {
  const highlights = [
    "Mentorship & Guidance",
    "Founders' Collaboration",
    "Scaling Support",
    "Investor Access",
  ];

  return (
    <section
      className="py-12 md:py-24 bg-gradient-to-br from-bg-secondary via-[#0a1020] to-[#06080f] relative overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#00d4ff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-[24px] p-6 md:p-16 flex flex-col items-center text-center"
        >
          {/* ───── Content ───── */}
          <div className="max-w-3xl">


            <h2 className="text-xl sm:text-3xl md:text-[40px] font-display font-bold text-text-primary mb-4 sm:mb-8 leading-tight">
              Founders' Circle — <br />
              <span className="text-neon-cyan">Structured Growth Ecosystem</span>
            </h2>

            <p className="font-heading font-normal text-text-secondary text-sm sm:text-lg mb-6 sm:mb-10 leading-[1.6] sm:leading-[1.8]">
              Founders' Circle is the structured startup growth ecosystem within
              NX Research. It brings together serious founders, innovators, and
              execution-focused teams to refine ideas, validate models, and
              build scalable ventures. Through collaborative reviews, strategic
              guidance, and ecosystem support, startups receive structured
              direction and milestone-based growth tracking.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-8 sm:mb-12 text-left">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-text-primary border-l-2 border-teal/30 pl-3 sm:pl-4"
                >
                  <CheckCircle2 size={14} className="text-teal" />
                  <span className="font-heading font-medium text-[12px] sm:text-[14px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/join?path=startup"
              className="inline-block px-6 py-2.5 sm:px-10 sm:py-4 bg-gradient-to-r from-neon-cyan to-neon-blue text-bg-primary font-heading font-bold text-[12px] sm:text-[14px] rounded-[6px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              Apply to Join
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
