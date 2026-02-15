
import React, { useState } from 'react';
import { Rocket, CheckCircle2, Circle, Clock, MoreHorizontal, UserPlus, X, ChevronRight, Briefcase, GraduationCap, Zap } from 'lucide-react';

interface OnboardingTask {
  id: string;
  label: string;
  completed: boolean;
}

interface OnboardingProcess {
  id: string;
  name: string;
  role: string;
  department: string;
  mentor: string;
  startDate: string;
  progress: number;
  tasks: OnboardingTask[];
  avatar: string;
}

const initialOnboarding: OnboardingProcess[] = [
  {
    id: '1',
    name: 'Dr. Sarah Connor',
    role: 'AI Researcher',
    department: 'NX Cybernetics',
    mentor: 'Aris Thorne',
    startDate: 'Oct 12, 2023',
    progress: 65,
    avatar: 'SC',
    tasks: [
      { id: 't1', label: 'Security Clearance', completed: true },
      { id: 't2', label: 'Workstation Setup', completed: true },
      { id: 't3', label: 'Bio-Sync Calibration', completed: false },
      { id: 't4', label: 'Department Briefing', completed: false },
    ]
  },
  {
    id: '2',
    name: 'Leo Maxwell',
    role: 'Quantum Tech',
    department: 'Energy Lab 4',
    mentor: 'Elena Vance',
    startDate: 'Oct 15, 2023',
    progress: 25,
    avatar: 'LM',
    tasks: [
      { id: 't1', label: 'Identity Verification', completed: true },
      { id: 't2', label: 'Lab Safety Protocol', completed: false },
      { id: 't3', label: 'Asset Allocation', completed: false },
    ]
  }
];

const Onboarding: React.FC = () => {
  const [processes, setProcesses] = useState<OnboardingProcess[]>(initialOnboarding);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecruit, setNewRecruit] = useState({
    name: '',
    role: '',
    department: '',
    mentor: ''
  });

  const handleAddTask = (processId: string, taskLabel: string) => {
    setProcesses(prev => prev.map(p => {
      if (p.id === processId) {
        const newTasks = [...p.tasks, { id: Date.now().toString(), label: taskLabel, completed: false }];
        return { ...p, tasks: newTasks, progress: Math.round((newTasks.filter(t => t.completed).length / newTasks.length) * 100) };
      }
      return p;
    }));
  };

  const toggleTask = (processId: string, taskId: string) => {
    setProcesses(prev => prev.map(p => {
      if (p.id === processId) {
        const newTasks = p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
        const newProgress = Math.round((newTasks.filter(t => t.completed).length / newTasks.length) * 100);
        return { ...p, tasks: newTasks, progress: newProgress };
      }
      return p;
    }));
  };

  const startNewOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = newRecruit.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const process: OnboardingProcess = {
      id: Date.now().toString(),
      ...newRecruit,
      startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      progress: 0,
      avatar: initials || 'NX',
      tasks: [
        { id: 't1', label: 'Account Activation', completed: false },
        { id: 't2', label: 'HR Documents', completed: false },
      ]
    };
    setProcesses([process, ...processes]);
    setNewRecruit({ name: '', role: '', department: '', mentor: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-1">Recruit Onboarding</h2>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">Pipeline Management & Entry Protocols</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FB8500] text-white px-8 h-14 rounded-[20px] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] hover:bg-[#e67a00] transition-all shadow-lg shadow-[#FB8500]/20 active:scale-95 shrink-0"
        >
          <Zap size={18} fill="currentColor" />
          Initialize Recruit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {processes.map((p, idx) => (
          <div key={p.id} className="bg-white border border-gray-50 rounded-[40px] p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-[#0A2463]/5">
            <div className="flex items-start justify-between mb-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#0A2463]/5 flex items-center justify-center text-xl font-black text-[#0A2463]">
                  {p.avatar}
                </div>
                <div>
                  <h4 className="text-xl font-black text-[#0A2463] uppercase tracking-tight mb-1">{p.name}</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={12} /> {p.role} • {p.department}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Onboarding Score</p>
                <div className="text-2xl font-black text-[#FB8500]">{p.progress}%</div>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-[#0A2463] uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} className="text-[#FB8500]" /> Started {p.startDate}
                </span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Mentor: {p.mentor}
                </span>
              </div>
              <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden p-0.5 border border-gray-100">
                <div 
                  className="h-full bg-[#FB8500] rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-4">Sequence Progress</p>
              {p.tasks.map(task => (
                <button 
                  key={task.id}
                  onClick={() => toggleTask(p.id, task.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    task.completed ? 'bg-[#06A77D]/5 border-[#06A77D]/10' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {task.completed ? (
                      <CheckCircle2 size={18} className="text-[#06A77D]" />
                    ) : (
                      <Circle size={18} className="text-gray-300" />
                    )}
                    <span className={`text-xs font-bold ${task.completed ? 'text-[#065F46] line-through' : 'text-[#0A2463]'}`}>
                      {task.label}
                    </span>
                  </div>
                  <ChevronRight size={14} className={task.completed ? 'text-[#06A77D]' : 'text-gray-300'} />
                </button>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <button className="flex-1 py-4 rounded-2xl bg-[#0A2463] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#071946] transition-all shadow-md active:scale-95">
                Send Notification
              </button>
              <button className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#0A2463] transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Initialize Recruit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A2463]/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-200 p-10">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight">New Recruit</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Initialize onboarding sequence</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={startNewOnboarding} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Recruit Name"
                    className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FB8500]/20"
                    value={newRecruit.name}
                    onChange={e => setNewRecruit({...newRecruit, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Role</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Lead Dev"
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FB8500]/20"
                      value={newRecruit.role}
                      onChange={e => setNewRecruit({...newRecruit, role: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Department</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Core Tech"
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FB8500]/20"
                      value={newRecruit.department}
                      onChange={e => setNewRecruit({...newRecruit, department: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Assigned Mentor</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Mentor Name"
                    className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FB8500]/20"
                    value={newRecruit.mentor}
                    onChange={e => setNewRecruit({...newRecruit, mentor: e.target.value})}
                  />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-[#0A2463] text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-[#0A2463]/20 mt-8 active:scale-95 transition-transform">
                Deploy Onboarding Protocol
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
