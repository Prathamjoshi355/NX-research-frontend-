import { motion, animate } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { 
  BarChart3, 
  Activity, 
  Users, 
  Rocket, 
  CheckCircle2,
  LucideIcon
} from "lucide-react";

// Counter Component
interface CounterProps {
  value: number;
  suffix?: string;
}

function Counter({ value, suffix = "" }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        setDisplayValue(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value]);

  return (
    <span ref={nodeRef}>
      {displayValue}{suffix}
    </span>
  );
}

// StatCard Component
interface StatCardProps {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  index: number;
  key?: string | number;
}

function StatCard({ 
  label, 
  value, 
  suffix, 
  icon: Icon, 
  color, 
  bg, 
  border, 
  index 
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`relative group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.02] border ${border} backdrop-blur-xl overflow-hidden`}
    >
      {/* Hover Background Glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${bg} to-transparent`} />
      
      <div className="relative z-10">
        <div className={`${bg} ${color} w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        
        <div className="space-y-1 md:space-y-2">
          <div className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
            <Counter value={value} suffix={suffix} />
          </div>
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors duration-300">
            {label}
          </p>
        </div>
      </div>

      {/* Decorative Corner Accent */}
      <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-30 transition-opacity duration-500`}>
        <div className={`absolute top-4 right-4 w-1 h-1 rounded-full ${color.replace('text-', 'bg-')}`} />
      </div>
    </motion.div>
  );
}

const stats = [
  {
    label: "Total Projects",
    value: 47,
    suffix: "",
    icon: BarChart3,
    color: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
    border: "border-neon-cyan/20",
  },
  {
    label: "Active Projects",
    value: 11,
    suffix: "",
    icon: Activity,
    color: "text-teal",
    bg: "bg-teal/10",
    border: "border-teal/20",
  },
  {
    label: "Students & Researchers",
    value: 849,
    suffix: "+",
    icon: Users,
    color: "text-neon-purple",
    bg: "bg-neon-purple/10",
    border: "border-neon-purple/20",
  },
  {
    label: "Startups Evolved",
    value: 14,
    suffix: "",
    icon: Rocket,
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    label: "Projects Implemented",
    value: 23,
    suffix: "",
    icon: CheckCircle2,
    color: "text-neon-blue",
    bg: "bg-neon-blue/10",
    border: "border-neon-blue/20",
  },
];

export default function GovResearchStats() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans selection:bg-neon-cyan/30 overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-purple/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12 md:py-20">
        {/* Horizontal Stats Section */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                icon={stat.icon}
                color={stat.color}
                bg={stat.bg}
                border={stat.border}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 md:mt-24 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-text-secondary/40 px-4 text-center"
        >
          <span className="hover:text-neon-cyan cursor-pointer transition-colors whitespace-nowrap">Explore Projects</span>
          <div className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
          <span className="hover:text-neon-cyan cursor-pointer transition-colors whitespace-nowrap">Researcher Portal</span>
          <div className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
          <span className="hover:text-neon-cyan cursor-pointer transition-colors whitespace-nowrap">Startup Network</span>
        </motion.div>
      </main>
    </div>
  );
}
