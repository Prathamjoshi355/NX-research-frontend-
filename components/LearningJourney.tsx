
import React from 'react';

interface Module {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  progress: number;
  duration: string;
  topics: string[];
}

const modules: Module[] = [
  {
    id: 'm1',
    title: 'Foundations of AI',
    description: 'Core concepts, history, and the mathematical landscape of artificial intelligence.',
    status: 'completed',
    progress: 100,
    duration: '12 Hours',
    topics: ['History of AI', 'Probability', 'Linear Algebra'],
  },
  {
    id: 'm2',
    title: 'Machine Learning Basics',
    description: 'Supervised vs unsupervised learning, regression, and classification algorithms.',
    status: 'current',
    progress: 65,
    duration: '18 Hours',
    topics: ['Linear Regression', 'Decision Trees', 'Gradient Descent'],
  },
  {
    id: 'm3',
    title: 'Neural Networks & Deep Learning',
    description: 'Building multi-layer perceptrons and understanding backpropagation.',
    status: 'locked',
    progress: 0,
    duration: '24 Hours',
    topics: ['Activations', 'Backprop', 'Loss Functions'],
  },
  {
    id: 'm4',
    title: 'Computer Vision',
    description: 'CNNs, image processing, and object detection using modern frameworks.',
    status: 'locked',
    progress: 0,
    duration: '20 Hours',
    topics: ['CNN Architecture', 'YOLO v8', 'Image Segmentation'],
  },
];

interface LearningJourneyProps {
  onMenuClick: () => void;
}

const LearningJourney: React.FC<LearningJourneyProps> = ({ onMenuClick }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 sm:p-8 md:p-10 custom-scrollbar">
      {/* Header section */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2.5 bg-slate-50 rounded-xl text-[#0a1532] border border-slate-100 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1532] font-outfit uppercase tracking-tight">Learning Journey</h2>
            <p className="text-slate-400 font-bold text-[10px] tracking-widest uppercase mt-1">AI/ML Path • 2 Modules Remaining</p>
          </div>
        </div>

        {/* Global Progress Circle (Desktop) */}
        <div className="hidden sm:flex items-center gap-6 bg-[#f1f4f9] px-6 py-4 rounded-[2rem] border border-blue-50">
          <div className="relative w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path className="text-slate-200" strokeDasharray="100, 100" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="currentColor" />
              <path className="text-[#3b82f6]" strokeDasharray="42, 100" strokeWidth="3" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="currentColor" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#0a1532]">42%</div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">OVERALL PROGRESS</p>
            <p className="text-sm font-black text-[#0a1532]">MASTERING BASICS</p>
          </div>
        </div>
      </div>

      {/* Roadmap visualization */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[24px] md:left-[40px] top-0 bottom-0 w-1 bg-slate-100 hidden sm:block"></div>

        <div className="space-y-12 relative">
          {modules.map((module, index) => (
            <div key={module.id} className="flex flex-col sm:flex-row gap-8 items-start group">
              
              {/* Status Indicator Dot */}
              <div className="hidden sm:flex shrink-0 w-20 h-20 items-center justify-center relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                  module.status === 'completed' ? 'bg-green-500 text-white' :
                  module.status === 'current' ? 'bg-orange-500 text-white animate-pulse' :
                  'bg-white text-slate-300 border border-slate-100'
                }`}>
                  {module.status === 'completed' && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  )}
                  {module.status === 'current' && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
                  )}
                  {module.status === 'locked' && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  )}
                </div>
              </div>

              {/* Module Card */}
              <div className={`flex-1 bg-white rounded-[2rem] p-6 md:p-8 transition-all duration-300 border-2 ${
                module.status === 'current' ? 'border-[#3b82f6] shadow-xl shadow-blue-50' : 
                module.status === 'completed' ? 'border-transparent bg-[#f9fafb]' :
                'border-transparent opacity-60'
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase mb-3 inline-block ${
                      module.status === 'completed' ? 'bg-green-100 text-green-600' :
                      module.status === 'current' ? 'bg-blue-100 text-blue-600' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                      {module.status === 'completed' ? 'MODULE COMPLETED' : 
                       module.status === 'current' ? 'IN PROGRESS' : 'LOCKED'}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-[#0a1532] font-outfit">{module.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">ESTIMATED TIME</p>
                    <p className="font-black text-[#0a1532]">{module.duration}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-2xl">
                  {module.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {module.topics.map((topic, i) => (
                    <span key={i} className="px-4 py-2 bg-white rounded-xl text-[10px] font-bold text-slate-500 border border-slate-100 uppercase tracking-wider">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Progress & Action */}
                <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-slate-100">
                  <div className="flex-1 w-full">
                    <div className="flex justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">MODULE PROGRESS</span>
                      <span className="text-[10px] font-black text-[#0a1532] uppercase">{module.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          module.status === 'completed' ? 'bg-green-500' : 'bg-[#3b82f6]'
                        }`} 
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {module.status !== 'locked' && (
                    <button className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all ${
                      module.status === 'completed' ? 'bg-white text-[#0a1532] border border-slate-200 hover:bg-slate-50' :
                      'bg-[#0a1532] text-white hover:bg-[#14234a] shadow-lg shadow-blue-900/10'
                    }`}>
                      {module.status === 'completed' ? 'REVIEW MODULE' : 'CONTINUE LEARNING'}
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningJourney;
