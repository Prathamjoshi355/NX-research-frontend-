
import React from 'react';
import { Step } from '../FCCtypes';
import { CheckCircle, Circle } from 'lucide-react';

interface SidebarProps {
  currentStep: Step;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep }) => {
  const stepsList = [
    { id: Step.AGREEMENTS, label: 'Rules  ' },
    { id: Step.PERSONAL_INFO, label: 'personal Info' },
    { id: Step.SELECT_CATEGORY, label: 'Category' },
    { id: Step.CATEGORY_DETAILS, label: 'Professional' },
    { id: Step.ADDITIONAL_INFO, label: 'Social Media' },
    { id: Step.PAYMENT, label: 'Bill' },
  ];

  return (
    <div className="bg-[#0A2463] w-full md:w-80 min-h-screen p-10 hidden lg:flex flex-col sticky top-0 border-r border-white/5 shadow-2xl">
      

      <div className="space-y-12 flex-grow">
        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-8">Registration Path</p>
        <ul className="space-y-8">
          {stepsList.map((step, idx) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <li key={idx} className="flex items-center gap-6 group">
                <div className="relative flex items-center justify-center">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-[#06A77D]" />
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#FB8500] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FB8500] animate-pulse" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-white/10 group-hover:text-white/20 transition-colors" />
                  )}
                  {idx !== stepsList.length - 1 && (
                    <div className={`absolute top-5 left-1/2 -translate-x-1/2 w-px h-8 ${isCompleted ? 'bg-[#06A77D]/30' : 'bg-white/5'}`} />
                  )}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-white translate-x-1' : isCompleted ? 'text-white/60' : 'text-white/20'}`}>
                  {step.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

     
    </div>
  );
};

export default Sidebar;
