
import React from 'react';
import { Step } from '../FCCtypes';
import { CheckCircle, Circle } from 'lucide-react';

interface SidebarProps {
  currentStep: Step;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep }) => {
  const stepsList = [
    { id: Step.AGREEMENTS, label: 'Registration Notification' },
    { id: Step.AGREEMENTS, label: 'Privacy & Terms' },
    { id: Step.PERSONAL_INFO, label: 'Personal Information' },
    { id: Step.SELECT_CATEGORY, label: 'Select Category' },
    { id: Step.CATEGORY_DETAILS, label: 'Additional Information' },
    { id: Step.ADDITIONAL_INFO, label: 'Online Influence & Network' },
    { id: Step.PAYMENT, label: 'Payment' },
  ];

  return (
    <div className="bg-white border-r border-slate-200 w-80 min-h-screen p-8 hidden lg:block sticky top-0">
      <h2 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-wider">Registration Progress</h2>
      <ul className="space-y-6">
        {stepsList.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <li key={idx} className="flex items-center gap-4">
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-indigo-600" />
              ) : isActive ? (
                <div className="w-5 h-5 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>
              ) : (
                <Circle className="w-5 h-5 text-slate-300" />
              )}
              <span className={`text-sm font-medium ${isActive ? 'text-indigo-600 font-bold' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
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
