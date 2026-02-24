import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  subtitle?: string;
  description: string;
  icon: LucideIcon;
}

export const Card = ({ title, subtitle, description, icon: Icon }: CardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-8 rounded-2xl flex flex-col gap-4 group transition-all duration-300 hover:bg-white/10"
  >
    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      {subtitle && <p className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-3">{subtitle}</p>}
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);
