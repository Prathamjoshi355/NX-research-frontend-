

import { motion } from "motion/react";
import { Cpu, Microscope, Users, Palette, Building2 } from "lucide-react";

const areas = [
  {
    title: "Product & Technology",
    subtitle: "SCALABLE ARCHITECTURE",
    icon: Cpu,
    color: "text-[#00d4ff]",
    borderColor: "border-[#00d4ff]/30",
    bgColor: "bg-[#00d4ff]/5",
    glowColor: "bg-[#00d4ff]/5",
  },
  {
    title: "Research & Innovation",
    subtitle: "DEEP-TECH INTEGRATION",
    icon: Microscope,
    color: "text-[#bc13fe]",
    borderColor: "border-[#bc13fe]/30",
    bgColor: "bg-[#bc13fe]/5",
    glowColor: "bg-[#bc13fe]/5",
  },
  {
    title: "Team Building",
    subtitle: "ELITE TALENT ACQUISITION",
    icon: Users,
    color: "text-[#2dd4bf]",
    borderColor: "border-[#2dd4bf]/30",
    bgColor: "bg-[#2dd4bf]/5",
    glowColor: "bg-[#2dd4bf]/5",
  },
  {
    title: "Branding & Marketing",
    subtitle: "STRATEGIC POSITIONING",
    icon: Palette,
    color: "text-[#fbbf24]",
    borderColor: "border-[#fbbf24]/30",
    bgColor: "bg-[#fbbf24]/5",
    glowColor: "bg-[#fbbf24]/5",
  },
  {
    title: "Workspace & Infrastructure",
    subtitle: "GLOBAL OPERATIONS",
    icon: Building2,
    color: "text-[#3b82f6]",
    borderColor: "border-[#3b82f6]/30",
    bgColor: "bg-[#3b82f6]/5",
    glowColor: "bg-[#3b82f6]/5",
  },
];

export default function App() {
  return (
    <main className="min-h-screen bg-[#05070a] flex flex-col items-center pt-12 sm:pt-16 md:pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <section className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3"
          >
            <span className="font-mono text-[10px] sm:text-[11px] md:text-xs text-[#00d4ff] tracking-[4px] sm:tracking-[6px] md:tracking-[8px] uppercase">
              Collaboration Network
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase font-display leading-[1.1]"
          >
            OUR AREAS OF <br className="hidden sm:block" /> COLLABORATION
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {areas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative bg-[#0a0f16] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col items-start hover:border-white/10 transition-all group cursor-default h-full overflow-hidden"
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border ${area.borderColor} ${area.bgColor} flex items-center justify-center ${area.color} mb-8 sm:mb-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-300`}>
                  <Icon size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                {/* Content */}
                <div className="mt-auto w-full relative z-10">
                  <h3 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 leading-tight font-display">
                    {area.title}
                  </h3>
                  <p className="text-[#64748b] text-[9px] sm:text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">
                    {area.subtitle}
                  </p>
                </div>

                {/* Glow Effect */}
                <div className={`absolute -inset-1 ${area.glowColor} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />
                
                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/5 rounded-2xl transition-colors duration-500" />
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}