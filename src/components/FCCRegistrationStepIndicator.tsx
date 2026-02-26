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
    <div className="w-full mb-8 overflow-x-auto">
      <div className="flex justify-between items-start px-4 sm:px-8 min-w-[600px]">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          const isActive = currentStep === item.step;
          const isCompleted = currentStep > item.step;
          
          return (
            <div key={idx} className="flex flex-col items-center gap-2 sm:gap-3">
              {/* Circle */}
              <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                isActive 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                  : isCompleted
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                <Icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
              </div>
              
              {/* Label */}
              <span className={`text-xs sm:text-sm font-semibold text-center whitespace-pre-line leading-tight max-w-[80px] sm:max-w-[90px] transition-colors ${
                isActive || isCompleted
                  ? 'text-blue-600' 
                  : 'text-gray-400'
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