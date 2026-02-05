
import React, { useState } from 'react';

interface ResearchProject {
  id: string;
  title: string;
  phase: string;
  progress: number;
  tags: string[];
  humanInsight: string;
}

const initialProjects: ResearchProject[] = [
  {
    id: 'p1',
    title: 'Multi-Modal Neural Architecture Search',
    phase: 'Phase 3: Optimization',
    progress: 75,
    tags: ['Deep Learning', 'NAS', 'PyTorch'],
    humanInsight: 'Evaluating sparse attention mechanisms for efficiency based on team review.'
  },
  {
    id: 'p2',
    title: 'Autonomous Urban Waste Sorting via RL',
    phase: 'Phase 1: Simulation',
    progress: 30,
    tags: ['Reinforcement Learning', 'Robotics'],
    humanInsight: 'Integration with MuJoCo simulator planned for next sprint.'
  }
];

interface ResearchProjectsProps {
  onMenuClick: () => void;
}

const ResearchProjects: React.FC<ResearchProjectsProps> = ({ onMenuClick }) => {
  const [brainstormInput, setBrainstormInput] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([
    "Deepening our understanding of the manifold hypothesis allows us to navigate the abstract representations that drive state-of-the-art generative models."
  ]);

  const handleAddNote = () => {
    if (!brainstormInput.trim()) return;
    setSavedNotes([brainstormInput, ...savedNotes]);
    setBrainstormInput('');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/30 p-4 sm:p-6 md:p-12 custom-scrollbar">
      {/* Professional Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-3 bg-white rounded-2xl text-[#0a1532] shadow-sm border border-slate-100 active:scale-95 transition-transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0a1532] font-outfit uppercase tracking-tighter leading-none">Research Lab</h2>
            <p className="text-slate-400 font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Advanced AI Track • 2 Active Studies
            </p>
          </div>
        </div>
        
        <button className="flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-2xl font-black text-[11px] tracking-widest uppercase hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>

      {/* Stats Grid - Cleaner, more professional typography */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Papers Published', val: '04' },
          { label: 'Citations', val: '128' },
          { label: 'Lab Hours', val: '342' },
          { label: 'H-Index', val: '02' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
            <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase mb-2">{stat.label}</span>
            <span className="text-3xl md:text-4xl font-black text-[#0a1532] font-outfit leading-none">{stat.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Projects List - Refined sizing and spacing */}
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Research Projects</h3>
          </div>
          
          {initialProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="max-w-[80%]">
                  <h4 className="text-xl md:text-2xl font-black text-[#0a1532] font-outfit leading-tight mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">{project.phase}</span>
                  </div>
                </div>
                <button className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all active:scale-90">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </button>
              </div>

              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Research Progress</span>
                  <span className="text-[10px] font-black text-[#0a1532]">{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0a1532] rounded-full transition-all duration-1000 ease-out" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100">{tag}</span>
                ))}
              </div>

              {/* Refined Insight Section */}
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 flex gap-4 items-center">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                  <p className="text-[12px] text-[#0a1532] font-semibold leading-relaxed">
                    <span className="font-black text-blue-600 uppercase mr-2 text-[10px] tracking-widest">Team Insight:</span>
                    {project.humanInsight}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Brainstorming Module */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-[#0a1532] rounded-[3rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-black tracking-tighter uppercase mb-6 font-outfit flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                Research Brainstorm
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <textarea 
                    value={brainstormInput}
                    onChange={(e) => setBrainstormInput(e.target.value)}
                    placeholder="Document your next breakthrough idea..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-[13px] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[140px] resize-none leading-relaxed transition-all"
                  />
                  <button 
                    onClick={handleAddNote}
                    className="w-full py-5 rounded-2xl font-black text-[11px] tracking-widest uppercase transition-all flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20 active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                    </svg>
                    Save Hypothesis
                  </button>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                   <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Saved Research Notes</h5>
                  {savedNotes.map((note, i) => (
                    <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5 text-[12px] leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500 hover:bg-white/10 transition-colors">
                      <span className="font-black text-blue-400 uppercase block mb-2 text-[9px] tracking-widest">Proposal {savedNotes.length - i}</span>
                      <p className="text-slate-300 font-medium">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Upcoming Deadlines</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-orange-200 transition-colors">
                <span className="text-[12px] font-black text-[#0a1532]">Arxiv Submission</span>
                <span className="text-[9px] font-black text-orange-600 bg-orange-100 px-3 py-1.5 rounded-full uppercase tracking-widest">In 3 Days</span>
              </div>
              <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
                <span className="text-[12px] font-black text-[#0a1532]">Peer Review Feedback</span>
                <span className="text-[9px] font-black text-slate-400 bg-slate-200 px-3 py-1.5 rounded-full uppercase tracking-widest font-outfit">Oct 24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchProjects;
