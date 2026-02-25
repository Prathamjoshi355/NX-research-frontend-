
import React from 'react';
import { FileText, User, LayoutGrid, Info, CreditCard } from 'lucide-react';
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
    { icon: CreditCard, label: 'Payment', step: Step.PAYMENT },
  ];

  return (
    <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto px-4">
      {icons.map((item, idx) => {
        const Icon = item.icon;
        const isActive = currentStep >= item.step;
        return (
          <div key={idx} className="flex flex-col items-center gap-2 group cursor-default">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
              isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110' : 'bg-slate-100 text-slate-400'
            }`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
