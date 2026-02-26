
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
    // { 
    //   icon: BookOpen, 
    //   label: 'Academic\nInstitution',
    //   step: Step.SELECT_CATEGORY 
    // },
     { 
      icon: BookOpen, 
      label: 'Category\nSelection',
      step: Step.SELECT_CATEGORY 
    },

    { 
      icon: Lock, 
      label: 'Additional\nInformation',
      step: Step.CATEGORY_DETAILS 
    },
    { 
      icon: CheckCircle, 
      label: 'Payment',
      step: Step.PAYMENT 
    },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-start px-8">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          const isActive = currentStep === item.step;
          const isCompleted = currentStep > item.step;
          
          return (
            <div key={idx} className="flex flex-col items-center gap-3">
              {/* Circle */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                isActive 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                  : isCompleted
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                <Icon className="w-10 h-10" strokeWidth={1.5} />
              </div>
              
              {/* Label */}
              <span className={`text-sm font-semibold text-center whitespace-pre-line leading-tight max-w-[90px] transition-colors ${
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
