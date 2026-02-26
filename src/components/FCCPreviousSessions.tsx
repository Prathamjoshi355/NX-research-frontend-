import React from "react";
import { motion } from "motion/react";
import { Cpu, FlaskConical, Globe, Scale, Briefcase } from "lucide-react";
import { Section } from "./ui/Section";

export const PreviousSessions = () => {
  const sessions = [
    { title: "AI & DeepTech Roundtable", subtitle: "Closed-Door Strategy Discussion", icon: Cpu },
    { title: "HealthTech Founder Dialogue", subtitle: "Research-Backed Expansion Planning", icon: FlaskConical },
    { title: "Climate Innovation Forum", subtitle: "Policy + Startup Alignment", icon: Globe },
    { title: "Infrastructure & Public Sector Connect", subtitle: "Execution & Funding Pathways", icon: Scale },
    { title: "Emerging Founders Pitch Meet", subtitle: "Strategic Feedback Session", icon: Briefcase },
  ];

  return (
    <div
      style={{
        backgroundColor: "#010E1D",
        borderTop: "1px solid #1A4A63",
        borderBottom: "1px solid #1A4A63",
      }}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div
        className="absolute -top-40 -left-40 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,183,201,0.05) 0%, transparent 70%)",
        }}
      />

      <Section>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "48px" }}
            viewport={{ once: true }}
            style={{ backgroundColor: "#00D4FF" }}
            className="h-1 mb-4"
          />
          <h2
            style={{ color: "#E6F1FF" }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
          >
            Previous Sessions
          </h2>
        </motion.div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session, i) => (
            <SessionCard key={i} session={session} index={i} />
          ))}
        </div>

        <div className="flex md:hidden gap-4 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar -mx-4 px-4">
          {sessions.map((session, i) => (
            <div key={i} className="min-w-[80vw] snap-start">
              <SessionCard session={session} index={i} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex md:hidden items-center justify-center gap-2 mt-4 mb-2"
        >
          {sessions.map((_, i) => (
            <div
              key={i}
              style={{ backgroundColor: i === 0 ? "#00D4FF" : "#1A4A63" }}
              className="w-1.5 h-1.5 rounded-full"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 md:mt-10"
        >
        </motion.div>
      </Section>
    </div>
  );
};

interface SessionCardProps {
  session: { title: string; subtitle: string; icon: React.ElementType };
  index: number;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, index }) => {
  const Icon = session.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{
        backgroundColor: "#030D17",
        border: "1px solid #071E2E",
        borderRadius: "1rem",
        padding: "1.5rem",
        transition: "border-color 0.25s, background-color 0.25s, box-shadow 0.25s",
        height: "100%",
        boxShadow: "0 4px 32px rgba(0, 5, 10, 0.95)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.backgroundColor = "#061525";
        el.style.borderColor = "#00D4FF";
        el.style.boxShadow = "0 0 28px rgba(0, 212, 255, 0.1), 0 4px 32px rgba(0, 5, 10, 0.99)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.backgroundColor = "#030D17";
        el.style.borderColor = "#071E2E";
        el.style.boxShadow = "0 4px 32px rgba(0, 5, 10, 0.95)";
      }}
    >
      {/* Icon tile */}
      <div
        style={{
          backgroundColor: "#020A12",
          border: "1px solid #0E3347",
          width: "44px",
          height: "44px",
          borderRadius: "0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
        }}
      >
        <Icon style={{ color: "#00D4FF" }} className="w-5 h-5" />
      </div>

      {/* Title */}
      <h3
        style={{ color: "#E6F1FF" }}
        className="text-base sm:text-lg font-bold mb-1 tracking-tight"
      >
        {session.title}
      </h3>

      {/* Subtitle */}
      <p
        style={{ color: "#00B7C9" }}
        className="text-xs sm:text-sm font-medium mb-3"
      >
        {session.subtitle}
      </p>

      {/* Divider */}
      <div
        style={{ backgroundColor: "#0E3347" }}
        className="h-px w-full mb-3"
      />

      {/* Description */}
      <p
        style={{ color: "#9FB7C9" }}
        className="text-xs sm:text-sm leading-relaxed"
      >
        Each session is curated around domain clarity and collaboration intent.
      </p>
    </motion.div>
  );
};