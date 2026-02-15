
import React from 'react';
import { ResearchItem } from '../types';

interface ResearchMonitoringProps {
  items: ResearchItem[];
}

const ResearchMonitoring: React.FC<ResearchMonitoringProps> = ({ items }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[56px] p-10 md:p-14 shadow-sm">
      <h3 className="font-black text-sm uppercase tracking-[0.2em] text-[#0A2463] mb-12">
        RESEARCH MONITORING
      </h3>
      
      <div className="space-y-12">
        {items.map((item, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-center mb-4">
              <span className="font-extrabold text-[#1E1E1E] text-lg tracking-tight">
                {item.title}
              </span>
              <span className="text-gray-400 font-black text-sm tracking-tighter">
                {item.progress}%
              </span>
            </div>
            <div className="w-full bg-[#F8F9FA] rounded-full h-4 overflow-hidden p-1 border border-gray-100">
              <div 
                className="h-full bg-[#06A77D] rounded-full transition-all duration-[1500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:bg-[#058e6a] shadow-sm"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchMonitoring;
