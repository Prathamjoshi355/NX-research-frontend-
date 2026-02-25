
import React from 'react';
import { FileText, User, LayoutGrid, Info, CreditCard, Plus } from 'lucide-react';
import { Step } from '../FCCtypes';

interface StepIndicatorProps {
  currentStep: Step;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const icons = [
    { icon: FileText, label: 'Agreements', step: Step.AGREEMENTS },
    { icon: User, label: 'Personal Info', step: Step.PERSONAL_INFO },
    { icon: LayoutGrid, label: 'Category', step: Step.SELECT_CATEGORY },
    { icon: Info, label: 'Details', step: Step.CATEGORY_DETAILS },
    { icon: Plus, label: 'Extra', step: Step.ADDITIONAL_INFO },
    { icon: CreditCard, label: 'Payment', step: Step.PAYMENT },
  ];

  return (
    <div className="flex justify-between items-center mb-8 sm:mb-12 max-w-2xl mx-auto px-2 sm:px-4 relative">
      {/* Connecting Line */}
      <div className="absolute top-6 sm:top-7 left-8 right-8 h-0.5 bg-white/5 -z-10 hidden sm:block" />
      
      {icons.map((item, idx) => {
        const Icon = item.icon;
        const isActive = currentStep >= item.step;
        return (
          <div key={idx} className="flex flex-col items-center gap-1.5 sm:gap-2 group cursor-default relative z-10">
            <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
              isActive ? 'bg-neon-cyan text-bg-primary shadow-lg shadow-neon-cyan/20 scale-110' : 'bg-white/5 text-text-dim'
            }`}>
              <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <span className={`text-[8px] sm:text-[10px] uppercase font-bold tracking-tighter sm:tracking-widest hidden xs:block ${isActive ? 'text-neon-cyan' : 'text-text-dim'}`}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
