import { motion } from "motion/react";
import { Zap, FlaskConical, Target, Scale } from "lucide-react";
import { Section } from "./ui/Section";

export const WhoCanAttend = () => {
  const attendees = [
    { 
      title: "Early & Growth Stage Founders'", 
      desc: "Building scalable ventures.", 
      icon: Zap,
      iconColor: "#FFD400",
      tag: "Startup"
    },
    { 
      title: "Problem Solvers and Innovators ", 
      desc: "Working on deep innovations or technology.", 
      icon: FlaskConical,
      iconColor: "#7C3AED",
      tag: "Deep Tech"
    },
    { 
      title: "Investors & Strategic Advisors", 
      desc: "Looking for aligned, structured access.", 
      icon: Target,
      iconColor: "#00D4FF",
      tag: "Strategic"
    },
    { 
      title: "Innovative and Dedecated Students", 
      desc: "Exploring implementation partnerships.", 
      icon: Scale,
      iconColor: "#00E0C6",
      tag: "Policy Focus"
    },
  ];

  return (
    <Section style={{ backgroundColor: "#00060D" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "#D6E8F5" }}
        >
          Who Can Attend?
        </h2>
        <p style={{ color: "#4A6A80" }}>Aligned Contributors</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {attendees.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="p-7 rounded-2xl flex flex-col gap-4 transition-all duration-300"
            style={{
              backgroundColor: "#010F1C",
              border: "1px solid #0F3348",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = "#041825";
              (e.currentTarget as HTMLDivElement).style.borderColor = "#1A4A63";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.backgroundColor = "#010F1C";
              (e.currentTarget as HTMLDivElement).style.borderColor = "#0F3348";
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "#000C17",
                  color: "#7A9DB5",
                  border: "1px solid #0F3348",
                }}
              >
                {item.tag}
              </span>
            </div>

            <item.icon
              className="w-7 h-7"
              style={{ color: item.iconColor }}
            />

            <h3
              className="text-base font-bold leading-snug"
              style={{ color: "#D6E8F5" }}
            >
              {item.title}
            </h3>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "#4A6A80" }}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex items-center justify-center gap-2"
      >
      </motion.div>
    </Section>
  );
};