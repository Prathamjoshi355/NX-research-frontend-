import { motion } from "motion/react";
import { Target, Grid, Share2 } from "lucide-react";

const stages = [
  {
    step: "01",
    tag: "IDEATION",
    title: "Idea to Structured Research",
    items: [
      { text: "Individuals & teams submit real-world ideas", detail: "Open submission portal with guided templates" },
      { text: "Research direction structured with clear objectives", detail: "OKR-based framing with milestone checkpoints" },
      { text: "Technical validation framework is defined", detail: "Peer-reviewed criteria and feasibility scoring" },
    ],
    icon: Target,
    color: "neon-cyan",
  },
  {
    step: "02",
    tag: "VALIDATION",
    title: "Validation & Expert Development",
    items: [
      { text: "Technical feasibility assessment", detail: "Engineering review by domain specialists" },
      { text: "Market analysis & opportunity evaluation", detail: "TAM/SAM analysis with competitive landscape" },
      { text: "Expert mentorship and refinement", detail: "1-on-1 sessions with industry veterans" },
      { text: "Research outcomes prepared for integration", detail: "Documented IP-ready deliverables" },
    ],
    icon: Grid,
    color: "neon-purple",
  },
  {
    step: "03",
    tag: "LAUNCH",
    title: "Founder Circle Integration",
    items: [
      { text: "Validated innovations enter Founder Circle ecosystem", detail: "Curated network of 200+ active founders" },
      { text: "Strategic incubation & business modeling", detail: "Revenue modeling, GTM strategy, cap table setup" },
      { text: "Transformation into scalable startups", detail: "Series-A readiness program with investor access" },
    ],
    icon: Share2,
    color: "teal",
  },
];

export default function PrivateResearchRoadmap() {
  return (
    <section className="py-24 md:py-32 bg-bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#bd00ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 border border-neon-purple/30 rounded-full mb-6"
          >
            <span className="font-mono text-[10px] text-neon-purple tracking-[4px] uppercase">
              Innovation Lifecycle
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-[56px] font-display font-bold text-text-primary uppercase tracking-tighter"
          >
            How Private Research Works
          </motion.h2>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple/50 via-neon-purple/20 to-transparent -translate-x-1/2" />

          <div className="space-y-16 md:space-y-32">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const isEven = i % 2 === 0;
              
              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Icon/Circle on the line */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <div className="w-12 h-12 rounded-full bg-bg-primary border-2 border-neon-purple flex items-center justify-center shadow-[0_0_20px_rgba(189,0,255,0.3)]">
                      <Icon size={20} className="text-neon-purple" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="relative">
                      <span className="font-mono text-[10px] text-neon-purple/60 mb-2 block tracking-widest uppercase">{stage.tag} — {stage.step}</span>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-6 uppercase tracking-tight">
                        {stage.title}
                      </h3>
                      
                      <div className={`space-y-4 ${isEven ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                        {stage.items.map((item, ii) => (
                          <div key={ii} className={`relative ${isEven ? 'md:pr-4' : 'md:pl-4'}`}>
                            <h4 className="text-sm font-heading font-semibold text-text-primary mb-1">
                              {item.text}
                            </h4>
                            <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
                              {item.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
