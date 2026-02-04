
import React from 'react';
import { ProcessStep, COLORS } from '../constants';
import { BrainIcon, LightbulbIcon, ClipboardCheckIcon, TrendingUpIcon } from './Icons';

interface StepCardProps {
  step: ProcessStep;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({ step, index }) => {
  const renderIcon = () => {
    switch (step.icon) {
      case 'Brain': return <BrainIcon color={step.color} />;
      case 'Lightbulb': return <LightbulbIcon color={step.color} />;
      case 'ClipboardCheck': return <ClipboardCheckIcon color={step.color} />;
      case 'TrendingUp': return <TrendingUpIcon color={step.color} />;
      default: return null;
    }
  };

  return (
    <div 
      className={`
        relative group flex flex-col items-center p-8 rounded-3xl transition-all duration-500
        bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]
        hover:-translate-y-3 cursor-default opacity-0 animate-fade-in stagger-${index + 1}
        w-full max-w-[280px]
      `}
    >
      {/* Icon Container with Glass Effect */}
      <div 
        className="mb-8 p-6 rounded-full bg-opacity-10 transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundColor: `${step.color}1a` }} // 10% opacity hex
      >
        <div className="relative">
          {renderIcon()}
          {/* Subtle glow effect */}
          <div 
            className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"
            style={{ backgroundColor: step.color }}
          />
        </div>
      </div>

      <h3 
        className="text-xl font-bold mb-3 tracking-tight transition-colors"
        style={{ color: COLORS.strongCharcoal }}
      >
        {step.title}
      </h3>
      
      <p 
        className="text-center text-sm leading-relaxed opacity-60 px-2"
        style={{ color: COLORS.strongCharcoal }}
      >
        {step.description}
      </p>

      {/* Decorative colored bar at bottom */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full opacity-30 group-hover:w-32 group-hover:opacity-100 transition-all duration-500"
        style={{ backgroundColor: step.color }}
      />
    </div>
  );
};

export default StepCard;
