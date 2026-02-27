import React from 'react';
import { Step } from '../FCCtypes';
import { CheckCircle, Circle, ChevronUp } from 'lucide-react';

interface SidebarProps {
  currentStep: Step;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep }) => {
  const stepsList = [
    { id: Step.AGREEMENTS, label: 'Registration Notification' },
    { id: Step.AGREEMENTS, label: 'Privacy & Terms' },
    { id: Step.PERSONAL_INFO, label: 'Personal Information' },
    { id: Step.SELECT_CATEGORY, label: 'Category Selection' },
    { id: Step.CATEGORY_DETAILS, label: 'Category Details' },
    { id: Step.ADDITIONAL_INFO, label: 'Additional Information' },
    { id: Step.ADDITIONAL_INFO, label: 'Final Submission' },
  ];

  return (
    <div className="bg-nx-muted rounded-2xl border border-nx-steel/30 shadow-xl p-4 sm:p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base sm:text-lg font-bold text-nx-white">Registration Progress</h2>
        <ChevronUp className="w-5 h-5 text-nx-cyan" />
      </div>
      
      <ul className="space-y-3 sm:space-y-4">
        {stepsList.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <li key={idx} className="flex items-center gap-2 sm:gap-3">
              {isCompleted || (idx === 0) ? (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-nx-cyan flex-shrink-0" />
              ) : isActive ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-nx-cyan flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-nx-cyan" />
                </div>
              ) : (
                <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-nx-steel flex-shrink-0" />
              )}
              <span className={`text-xs sm:text-sm font-medium ${
                isActive 
                  ? 'text-nx-cyan font-bold' 
                  : isCompleted || (idx === 0)
                  ? 'text-nx-white' 
                  : 'text-nx-gray'
              }`}>
                {step.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;