
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color, trend }) => {
  // Enhanced logic to determine if the trend is positive
  const isPositive = trend?.startsWith('+') || 
                     ['APPROVED', 'ACTIVE', 'SUCCESS', 'VERIFIED'].includes(trend?.toUpperCase() || '');

  return (
    <div className="bg-white border border-gray-100 rounded-[48px] p-8 flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-[#0A2463]/5 hover:-translate-y-1 relative group overflow-hidden shadow-sm h-full">
      <div className="flex justify-between items-start gap-2 mb-6">
        <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase truncate flex-1 min-w-0">
          {label}
        </span>
        {trend && (
          <div className={`flex items-center gap-1 shrink-0 text-[10px] font-black uppercase tracking-tight ${isPositive ? 'text-[#06A77D]' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownRight size={12} strokeWidth={3} />}
            <span className="whitespace-nowrap">{trend}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between mt-auto">
        <span className={`text-4xl font-[900] tracking-tighter ${color}`}>
          {value}
        </span>
        {/* Simple Sparkline Representation */}
        <div className="flex items-end gap-1 mb-1">
          {[4, 7, 5, 8, 6, 10].map((h, i) => (
            <div 
              key={i} 
              className={`w-1 rounded-full transition-all duration-500 group-hover:h-${h*2} ${isPositive ? 'bg-[#06A77D]/20' : 'bg-red-400/20'}`} 
              style={{ height: `${h * 2}px` }} 
            />
          ))}
        </div>
      </div>
      
      {/* Subtle brand highlights */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#0A2463]/5 rounded-full blur-2xl group-hover:bg-[#FB8500]/10 transition-all"></div>
    </div>
  );
};

export default StatCard;
