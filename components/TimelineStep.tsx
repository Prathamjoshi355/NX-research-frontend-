
import React from 'react';
import { ProcessStep } from '../constants';
import { BrainIcon, LightbulbIcon, ClipboardCheckIcon, TrendingUpIcon } from './Icons';

interface TimelineStepProps {
  step: ProcessStep;
  index: number;
  isTop: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, index, isTop }) => {
  const renderIcon = () => {
    const iconProps = { color: step.color };
    switch (step.icon) {
      case 'Brain': return <BrainIcon {...iconProps} />;
      case 'Lightbulb': return <LightbulbIcon {...iconProps} />;
      case 'ClipboardCheck': return <ClipboardCheckIcon {...iconProps} />;
      case 'TrendingUp': return <TrendingUpIcon {...iconProps} />;
      default: return null;
    }
  };

  /**
   * SEQUENTIAL TIMING LOGIC
   * Each full step takes ~1.5s (0.5 branch + 0.5 node + 0.5 label)
   * We start with a base delay so the horizontal line has time to start drawing.
   */
  const stepBaseDelay = 0.5 + (index * 1.5);
  const branchDelay = stepBaseDelay;
  const nodeDelay = stepBaseDelay + 0.5;
  const labelDelay = stepBaseDelay + 1.0;

  return (
    <div className="relative flex flex-col items-center" style={{ width: '25%' }}>
      {/* Vertical Branch Line - This comes FIRST */}
      <div 
        className={`absolute w-1 bg-gray-200 animate-grow ${isTop ? 'bottom-0 h-16 origin-bottom' : 'top-0 h-16 origin-top'}`}
        style={{ 
          animationDelay: `${branchDelay}s`, 
          backgroundColor: `${step.color}80`,
          boxShadow: `0 0 10px ${step.color}20`
        }}
      />

      {/* Node and Label - These come SECOND and THIRD */}
      <div 
        className={`absolute flex flex-col items-center w-48 ${isTop ? 'bottom-full mb-16' : 'top-full mt-16'}`}
      >
        {/* Label - Positioned according to Top/Bottom placement */}
        {isTop && (
          <div 
            className="mb-6 animate-fade text-center"
            style={{ animationDelay: `${labelDelay}s` }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1 block">Step 0{index + 1}</span>
            <h3 className="text-xl font-bold tracking-tight" style={{ color: step.color }}>{step.title}</h3>
            <p className="text-[10px] font-medium opacity-60 leading-tight mt-1 px-4">{step.description}</p>
          </div>
        )}

        {/* Circular Node */}
        <div 
          className="relative group cursor-pointer animate-pop"
          style={{ animationDelay: `${nodeDelay}s` }}
        >
          <div 
            className="w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 z-20 relative"
            style={{ border: `4px solid ${step.color}` }}
          >
            <div className="scale-90 transform transition-transform duration-500 group-hover:rotate-12">
              {renderIcon()}
            </div>
          </div>
          {/* Node Glow/Aura */}
          <div 
            className="absolute inset-0 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10"
            style={{ backgroundColor: step.color }}
          />
        </div>

        {!isTop && (
          <div 
            className="mt-6 animate-fade text-center"
            style={{ animationDelay: `${labelDelay}s` }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1 block">Step 0{index + 1}</span>
            <h3 className="text-xl font-bold tracking-tight" style={{ color: step.color }}>{step.title}</h3>
            <p className="text-[10px] font-medium opacity-60 leading-tight mt-1 px-4">{step.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineStep;
