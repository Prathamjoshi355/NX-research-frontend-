import { motion } from "motion/react";
import { Cpu, FlaskConical, Globe, Scale, Briefcase } from "lucide-react";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";

export const PreviousSessions = () => {
  const sessions = [
    { title: "AI & DeepTech Roundtable", subtitle: "Closed-Door Strategy Discussion", icon: Cpu },
    { title: "HealthTech Founder Dialogue", subtitle: "Research-Backed Expansion Planning", icon: FlaskConical },
    { title: "Climate Innovation Forum", subtitle: "Policy + Startup Alignment", icon: Globe },
    { title: "Infrastructure & Public Sector Connect", subtitle: "Execution & Funding Pathways", icon: Scale },
    { title: "Emerging Founders Pitch Meet", subtitle: "Strategic Feedback Session", icon: Briefcase },
  ];

  return (
    <div className="bg-zinc-900/50 py-24 border-y border-white/5">
      <Section>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Previous Sessions</h2>
            <p className="text-zinc-500">Curated around domain clarity and collaboration intent.</p>
          </div>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-12 snap-x no-scrollbar">
          {sessions.map((session, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="min-w-[280px] md:min-w-[400px] snap-start"
            >
              <Card 
                title={session.title}
                subtitle={session.subtitle}
                description="Each session is curated around domain clarity and collaboration intent."
                icon={session.icon}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-xs md:text-sm font-mono text-zinc-600 uppercase tracking-widest">
            Each session is curated around domain clarity and collaboration intent.
          </p>
        </motion.div>
      </Section>
    </div>
  );
};
