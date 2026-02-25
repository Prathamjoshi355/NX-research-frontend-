import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";

const steps = [
  { title: "Research Contributor", desc: "Joining a project unit." },
  { title: "Project Leader", desc: "Managing research milestones." },
  { title: "Innovation Owner", desc: "Defining implementation strategy." },
  { title: "Startup Formation", desc: "Spinning off the research." },
  { title: "Founder Circle Entry", desc: "Joining the elite network." },
];

export default function GovResearchTransformation() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-[48px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            Conversion to Founder Circle
          </motion.h2>
          <p className="mt-4 text-text-secondary font-mono text-xs tracking-[4px] uppercase">
            The Transformation Flow
          </p>
        </div>

        {/* Steps — vertical on mobile, horizontal on lg+ */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-4 xl:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col lg:flex-row items-center w-full lg:w-auto gap-0 lg:gap-4 xl:gap-8"
            >
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full max-w-sm sm:max-w-xs lg:w-44 xl:w-56 glass-panel p-5 xl:p-6 rounded-xl border border-neon-cyan/10 text-center relative group"
              >
                <div className="w-8 h-8 rounded-full bg-neon-cyan/20 text-neon-cyan font-mono text-xs font-bold flex items-center justify-center mx-auto mb-3 xl:mb-4">
                  {i + 1}
                </div>
                <h4 className="text-xs xl:text-sm font-display font-bold text-text-primary mb-2">
                  {step.title}
                </h4>
                <p className="text-text-secondary text-[10px] leading-relaxed">{step.desc}</p>

                <div className="absolute inset-0 bg-neon-cyan/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </motion.div>

              {/* Arrow — down on mobile/tablet, right on desktop */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center justify-center py-3 lg:py-0"
                >
                  {/* Mobile/tablet: down arrow */}
                  <ArrowDown className="block lg:hidden text-neon-cyan/40" size={22} />
                  {/* Desktop: right arrow */}
                  <ArrowRight className="hidden lg:block text-neon-cyan/40 flex-shrink-0" size={22} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}