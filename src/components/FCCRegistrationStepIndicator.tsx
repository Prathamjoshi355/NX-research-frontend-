import React from 'react';
import { FileText, User, Lock, BookOpen, CheckCircle } from 'lucide-react';
import { Step } from '../FCCtypes';

interface StepIndicatorProps {
  currentStep: Step;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { 
      icon: FileText, 
      label: 'Program\nAgreements',
      step: Step.AGREEMENTS 
    },
    { 
      icon: User, 
      label: 'Personal\nInformation',
      step: Step.PERSONAL_INFO 
    },
    { 
      icon: BookOpen, 
      label: 'Category\nSelection',
      step: Step.SELECT_CATEGORY 
    },
    { 
      icon: CheckCircle, 
      label: 'Category\nDetails',
      step: Step.CATEGORY_DETAILS 
    },
    { 
      icon: CheckCircle, 
      label: 'Final\nSubmission',
      step: Step.ADDITIONAL_INFO 
    },
  ];

  return (
    <div className="w-full mb-12 overflow-x-auto no-scrollbar">
      <div className="flex justify-between items-start px-4 sm:px-8 min-w-[600px]">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          const isActive = currentStep === item.step;
          const isCompleted = currentStep > item.step;
          
          return (
            <div key={idx} className="flex flex-col items-center gap-2 sm:gap-4 relative group">
              {/* Circle */}
              <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                isActive 
                  ? 'bg-nx-cyan border-nx-cyan text-nx-navy shadow-lg shadow-nx-cyan/30 scale-110' 
                  : isCompleted
                  ? 'bg-nx-cyan/20 border-nx-cyan text-nx-cyan'
                  : 'bg-nx-muted border-nx-steel text-nx-gray'
              }`}>
                <Icon className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={2} />
              </div>
              
              {/* Label */}
              <span className={`text-[10px] sm:text-xs font-bold text-center whitespace-pre-line leading-tight max-w-[80px] sm:max-w-[100px] transition-colors uppercase tracking-tighter ${
                isActive || isCompleted
                  ? 'text-nx-cyan' 
                  : 'text-nx-gray'
              }`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;