import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const whyItems = [
  { title: "Right Team Fit", desc: "Matched by skills, goals, and project needs — not just availability." },
  { title: "Faster Progress", desc: "Structured onboarding means you contribute from day one." },
  { title: "Reduced Failure Risk", desc: "Guided pathways reduce uncertainty for both teams and applicants." },
  { title: "Mentorship Access", desc: "Senior researchers and founders guide your journey." },
  { title: "Clear Direction", desc: "Every initiative has defined milestones and deliverables." },
];

export default function InitiativesWhy() {
  return (
    <section className="py-20 md:py-32 bg-bg-primary relative overflow-hidden font-sans">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 mb-6"
          >
            <ShieldCheck className="w-3 h-3 text-neon-cyan" />
            <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-widest">Why NX Initiatives</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 md:mb-6 tracking-tight uppercase leading-none">
            Guided <span className="text-neon-cyan">Connection</span>
          </h2>
        </div>

        {/* Responsive Layout - No Boxes, Centered Last Row */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-12 md:gap-x-12 md:gap-y-20">
          {whyItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-[calc(50%-12px)] lg:w-[calc(33.333%-32px)] flex flex-col items-start text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-neon-cyan/10 rounded-lg flex items-center justify-center border border-neon-cyan/20 shrink-0">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-neon-cyan" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-text-primary tracking-tight leading-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-[10px] md:text-base text-text-secondary leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
