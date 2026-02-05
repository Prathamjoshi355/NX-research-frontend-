
import React, { useState } from 'react';
import { RoadmapStep } from '../Companytypes';

const ROADMAP: (RoadmapStep & { details: string[], date: string })[] = [
  { id: 1, title: 'Requirement Gathering', status: 'COMPLETED', date: 'Jan - Feb 2024', details: ['Stakeholder Interviews', 'Technical Site Survey', 'Legacy System Audit', 'Requirement Document V1.2'] },
  { id: 2, title: 'Prototype V1 Design', status: 'IN PROGRESS', date: 'Mar - Apr 2024', details: ['UI/UX Wireframing', 'Cloud Infrastructure Setup', 'Edge Node Configuration', 'API Specification'] },
  { id: 3, title: 'Testing & Validation', status: 'PENDING', date: 'May - Jun 2024', details: ['Unit Testing Modules', 'Integration Stress Test', 'Safety Compliance Audit', 'Beta Partner Selection'] },
];

const RoadmapView: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(2);

  return (
    <div className="p-4 sm:p-8 animate-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-24 lg:pb-8">
      <div className="mb-8 lg:mb-12 px-2">
        <h2 className="text-3xl lg:text-4xl font-black text-[#002B5B] tracking-tight uppercase">Project Lifecycle</h2>
        <p className="text-gray-400 font-medium text-xs lg:text-sm mt-1 uppercase tracking-widest">Tracking research development milestones</p>
      </div>
      
      <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-6 sm:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="hidden sm:block absolute top-0 right-0 p-8">
           <div className="bg-slate-50 px-5 py-2 rounded-2xl border border-slate-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Monitoring</span>
           </div>
        </div>

        <div className="relative pl-8 sm:pl-12 space-y-8 sm:space-y-10">
          {/* Timeline bar */}
          <div className="absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[2px] sm:w-[3px] bg-slate-50 rounded-full"></div>
          
          {ROADMAP.map((step) => {
            const isExpanded = expandedId === step.id;
            return (
              <div 
                key={step.id} 
                onClick={() => setExpandedId(isExpanded ? null : step.id)}
                className={`relative group cursor-pointer transition-all duration-500 ${isExpanded ? 'bg-slate-50/80 -ml-4 sm:-ml-4 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100' : 'hover:translate-x-2'}`}
              >
                {/* Status Indicator */}
                <div className={`absolute -left-[32px] sm:-left-[46px] ${isExpanded ? 'top-6 sm:top-10' : 'top-2'} w-5 h-5 sm:w-7 sm:h-7 rounded-full border-[3px] sm:border-4 border-white shadow-lg ring-4 z-10 transition-all ${
                  step.status === 'COMPLETED' ? 'bg-emerald-500 ring-emerald-500/10' : 
                  step.status === 'IN PROGRESS' ? 'bg-orange-500 ring-orange-500/20 animate-pulse' : 
                  'bg-slate-200 ring-slate-100'
                }`}></div>
                
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xl sm:text-2xl font-black tracking-tight leading-tight transition-colors ${isExpanded ? 'text-orange-600' : 'text-[#002B5B] group-hover:text-orange-500'}`}>
                      {step.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                       <span className={`font-black text-[9px] sm:text-[10px] tracking-[0.2em] uppercase ${
                        step.status === 'COMPLETED' ? 'text-emerald-600' : 
                        step.status === 'IN PROGRESS' ? 'text-blue-500' : 
                        'text-gray-300'
                      }`}>
                        {step.status}
                      </span>
                      <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-200"></span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.date}</span>
                    </div>
                  </div>
                  <div className={`text-slate-200 group-hover:text-orange-500 transition-all pt-1 ${isExpanded ? 'rotate-180 text-orange-500' : ''}`}>
                    <i className="fa-solid fa-chevron-down text-sm sm:text-base"></i>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="space-y-4">
                       <h5 className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Phase Objectives</h5>
                       <ul className="space-y-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-600">
                               <i className={`fa-solid ${step.status === 'COMPLETED' ? 'fa-check-circle text-emerald-500' : 'fa-circle text-[5px] sm:text-[6px] text-slate-300'} shrink-0`}></i>
                               {detail}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100">
                       <h5 className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Phase Progress</h5>
                       <div className="w-full h-2.5 sm:h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${step.status === 'COMPLETED' ? 'w-full bg-emerald-500' : step.status === 'IN PROGRESS' ? 'w-1/2 bg-blue-500' : 'w-0'}`}
                          ></div>
                       </div>
                       <div className="flex justify-between text-[9px] sm:text-[10px] font-black uppercase text-slate-400">
                          <span>0%</span>
                          <span className="text-[#002B5B]">{step.status === 'COMPLETED' ? '100%' : step.status === 'IN PROGRESS' ? '50%' : '0%'}</span>
                          <span>100%</span>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoadmapView;
