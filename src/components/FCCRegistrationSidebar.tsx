
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
    { id: Step.CATEGORY_DETAILS, label: 'Category Details' },
    { id: Step.ADDITIONAL_INFO, label: 'Additional Info' },
    { id: Step.PAYMENT, label: 'Payment' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="bg-bg-secondary border-r border-white/5 w-80 min-h-screen p-8 hidden lg:block sticky top-0">
        <h2 className="text-xl font-bold text-text-primary mb-8 uppercase tracking-wider">Registration Progress</h2>
        <ul className="space-y-6">
          {stepsList.map((step, idx) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <li key={idx} className="flex items-center gap-4">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-neon-cyan" />
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full border-2 border-neon-cyan flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-text-dim" />
                )}
                <span className={`text-sm font-medium ${isActive ? 'text-neon-cyan font-bold' : isCompleted ? 'text-text-primary' : 'text-text-dim'}`}>
                  {step.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile/Tablet Header Progress */}
      <div className="lg:hidden bg-bg-secondary border-b border-white/5 sticky top-0 z-20 px-4 py-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 min-w-max">
          {stepsList.map((step, idx) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            if (idx > 0 && stepsList[idx-1].id === step.id) return null; // Avoid duplicate IDs in mobile view
            
            return (
              <div key={idx} className="flex items-center gap-2">
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-neon-cyan" />
                ) : isActive ? (
                  <div className="w-4 h-4 rounded-full border-2 border-neon-cyan flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  </div>
                ) : (
                  <Circle className="w-4 h-4 text-text-dim" />
                )}
                <span className={`text-xs font-bold whitespace-nowrap ${isActive ? 'text-neon-cyan' : 'text-text-dim'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
