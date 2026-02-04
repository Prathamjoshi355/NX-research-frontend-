
import React from 'react';
import { FileText, User, LayoutGrid, Info, CreditCard, Share2 } from 'lucide-react';
import { Step } from '../FCCtypes';

interface StepIndicatorProps {
  currentStep: Step;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const icons = [
    { icon: FileText, label: 'Protocols', step: Step.AGREEMENTS },
    { icon: User, label: 'Identity', step: Step.PERSONAL_INFO },
    { icon: LayoutGrid, label: 'Category', step: Step.SELECT_CATEGORY },
    { icon: Info, label: 'Track', step: Step.CATEGORY_DETAILS },
    { icon: Share2, label: 'Network', step: Step.ADDITIONAL_INFO },
    { icon: CreditCard, label: 'Verification', step: Step.PAYMENT },
  ];

  return (
    <div className="flex justify-between items-center mb-16 max-w-4xl mx-auto px-4 relative overflow-x-auto no-scrollbar py-4">
      <div className="absolute top-10 left-10 right-10 h-0.5 bg-slate-100 -z-0"></div>
      {icons.map((item, idx) => {
        const Icon = item.icon;
        const isCurrent = currentStep === item.step;
        const isPast = currentStep > item.step;
        const isActive = isCurrent || isPast;
        
        return (
          <div key={idx} className="flex flex-col items-center gap-3 group cursor-default relative z-10 shrink-0">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 ${
              isCurrent ? 'bg-[#0A2463] text-white border-white shadow-xl scale-110' : 
              isPast ? 'bg-[#06A77D] text-white border-white shadow-lg' : 
              'bg-white text-slate-300 border-slate-50'
            }`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className={`text-[8px] uppercase font-black tracking-[0.3em] transition-colors ${isActive ? 'text-[#0A2463]' : 'text-slate-300'}`}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
