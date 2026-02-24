import { motion } from "motion/react";
import { Zap, FlaskConical, Target, Scale, ShieldCheck } from "lucide-react";
import { Section } from "./ui/Section";

export const WhoCanAttend = () => {
  const attendees = [
    { 
      title: "Early & Growth Stage Founders", 
      desc: "Building scalable ventures.", 
      icon: Zap 
    },
    { 
      title: "Research‑Driven Innovators", 
      desc: "Working on deep research or technology.", 
      icon: FlaskConical 
    },
    { 
      title: "Investors & Strategic Advisors", 
      desc: "Looking for aligned, structured access.", 
      icon: Target 
    },
    { 
      title: "Policy & Government Contributors", 
      desc: "Exploring implementation partnerships.", 
      icon: Scale 
    },
  ];

  return (
    <Section>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Can Attend?</h2>
        <p className="text-zinc-500">Structured access for aligned contributors.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendees.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass p-8 rounded-2xl border-l-4 border-l-white/20 hover:border-l-white transition-all duration-300"
          >
            <item.icon className="w-8 h-8 mb-6 text-zinc-400" />
            <h3 className="text-lg font-bold mb-3">{item.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex items-center justify-center gap-2 text-zinc-600"
      >
        <ShieldCheck className="w-4 h-4" />
        <p className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-center">
          Attendance is curated and approval-based to maintain ecosystem quality.
        </p>
      </motion.div>
    </Section>
  );
};
