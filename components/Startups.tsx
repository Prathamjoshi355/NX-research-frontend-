
import React, { useState } from 'react';
import { 
  Rocket, 
  Search, 
  Filter, 
  Users, 
  ChevronRight, 
  X, 
  Plus, 
  TrendingUp, 
  Briefcase, 
  User, 
  DollarSign, 
  Edit3, 
  Trash2, 
  Target,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Startup } from '../types';

interface StartupsProps {
  startups: Startup[];
  onAddStartup: (startup: Startup) => void;
  onUpdateStartup: (updated: Startup) => void;
  onDeleteStartup: (id: string) => void;
}

const Startups: React.FC<StartupsProps> = ({ 
  startups, 
  onAddStartup, 
  onUpdateStartup, 
  onDeleteStartup 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStartupId, setSelectedStartupId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState<Partial<Startup>>({
    status: 'Pending',
    progress: 0,
    industry: 'Technology',
    funding: '$0'
  });

  const filteredStartups = startups.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStartup = startups.find(s => s.id === selectedStartupId);

  const handleStatusChange = (id: string, newStatus: Startup['status']) => {
    const startup = startups.find(s => s.id === id);
    if (startup) {
      onUpdateStartup({ ...startup, status: newStatus });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name || !newForm.founder) return;

    const startup: Startup = {
      id: `S-${Date.now()}`,
      name: newForm.name || 'Untitled Startup',
      industry: newForm.industry || 'General',
      founder: newForm.founder || 'Unknown',
      teamLeads: newForm.teamLeads || [],
      status: newForm.status as Startup['status'] || 'Pending',
      launchDate: newForm.launchDate || 'TBD',
      description: newForm.description || '',
      funding: newForm.funding || '$0',
      avatar: newForm.name?.[0].toUpperCase() || 'S',
      progress: newForm.progress || 0
    };

    onAddStartup(startup);
    setIsAdding(false);
    setNewForm({ status: 'Pending', progress: 0, industry: 'Technology', funding: '$0' });
  };

  const statusColors = {
    'Working': 'bg-[#D1FAE5] text-[#065F46] border-[#06A77D]/20',
    'Pending': 'bg-[#FEF3C7] text-[#92400E] border-[#FB8500]/20',
    'Launched': 'bg-[#E0F2FE] text-[#0369A1] border-[#0A2463]/20',
    'On Hold': 'bg-gray-100 text-gray-500 border-gray-200'
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Strategic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-1">STARTUP ACCELERATOR</h2>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">Venture Portfolio & Development Terminal</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by Venture or Founder..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-100 rounded-[20px] py-4 pl-12 pr-6 text-sm font-semibold w-full md:w-[280px] focus:outline-none focus:ring-2 focus:ring-[#FB8500]/10 shadow-sm transition-all"
            />
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-[#0A2463] text-white px-8 h-14 rounded-[20px] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[#0A2463]/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={18} strokeWidth={3} />
            Initialize Venture
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Startup Portfolio List */}
        <div className="xl:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStartups.map((startup) => (
              <div 
                key={startup.id}
                onClick={() => setSelectedStartupId(startup.id)}
                className={`bg-white border border-gray-50 rounded-[48px] p-8 flex flex-col shadow-sm transition-all cursor-pointer hover:shadow-xl hover:shadow-[#0A2463]/5 relative group ${selectedStartupId === startup.id ? 'ring-2 ring-[#FB8500]/20 border-[#FB8500]/20 bg-[#F8F9FA]' : ''}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-[24px] bg-[#0A2463] text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-[#0A2463]/20 transition-transform group-hover:scale-110">
                    {startup.avatar}
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[startup.status]}`}>
                    {startup.status}
                  </span>
                </div>

                <div className="mb-8">
                  <h4 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight mb-2 group-hover:text-[#FB8500] transition-colors">{startup.name}</h4>
                  <div className="flex items-center gap-2 text-gray-400">
                    <TrendingUp size={14} className="text-[#06A77D]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{startup.industry}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex -space-x-3">
                    {/* Founder Avatar Placeholder */}
                    <div className="w-8 h-8 rounded-full bg-[#FB8500] border-2 border-white flex items-center justify-center text-[10px] font-black text-white" title={startup.founder}>
                      {startup.founder[0]}
                    </div>
                    {startup.teamLeads.slice(0, 2).map((lead, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-gray-400" title={lead}>
                        {lead[0]}
                      </div>
                    ))}
                    {startup.teamLeads.length > 2 && (
                      <div className="w-8 h-8 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[8px] font-black text-gray-300">
                        +{startup.teamLeads.length - 2}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Health</p>
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${startup.progress > 70 ? 'bg-[#06A77D]' : startup.progress > 40 ? 'bg-[#FFB703]' : 'bg-red-400'}`} 
                        style={{ width: `${startup.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={24} className="text-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venture Inspector Sidepanel */}
        <div className="xl:col-span-4">
          {selectedStartup ? (
            <div className="bg-white border border-gray-100 rounded-[56px] p-10 shadow-2xl animate-in slide-in-from-right-10 duration-500 sticky top-10">
              <div className="flex justify-between items-start mb-10">
                <div className="w-20 h-20 rounded-[32px] bg-[#FB8500] text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-[#FB8500]/20">
                  {selectedStartup.avatar}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedStartupId(null)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="mb-10">
                <p className="text-[10px] font-black text-[#FB8500] uppercase tracking-[0.2em] mb-2">Ref: {selectedStartup.id}</p>
                <h3 className="text-3xl font-[900] text-[#0A2463] uppercase tracking-tight mb-2 leading-none">{selectedStartup.name}</h3>
                <div className="flex items-center gap-4 mt-4">
                   <div className="flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] rounded-lg">
                      <Briefcase size={12} className="text-gray-400" />
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{selectedStartup.industry}</span>
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] rounded-lg">
                      <DollarSign size={12} className="text-[#06A77D]" />
                      <span className="text-[9px] font-black text-[#06A77D] uppercase tracking-widest">{selectedStartup.funding}</span>
                   </div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Venture Core Brief</p>
                  <p className="text-sm font-bold text-[#0A2463] leading-relaxed italic">
                    "{selectedStartup.description || 'No formal briefing provided.'}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-3 flex items-center gap-2"><User size={12} /> Founder</p>
                    <p className="text-xs font-black text-[#0A2463] uppercase">{selectedStartup.founder}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-3 flex items-center gap-2"><Target size={12} /> Launch</p>
                    <p className="text-xs font-black text-[#0A2463] uppercase">{selectedStartup.launchDate}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Team Command</p>
                    <button className="text-[9px] font-black text-[#FB8500] uppercase tracking-widest hover:underline">+ Assign</button>
                  </div>
                  <div className="space-y-3">
                    {selectedStartup.teamLeads.map((lead, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-[#F8F9FA] border border-gray-100 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#0A2463] text-white flex items-center justify-center font-black text-[10px]">{lead[0]}</div>
                          <span className="text-xs font-black text-[#0A2463] uppercase">{lead}</span>
                        </div>
                        <span className="text-[8px] font-black text-gray-300 uppercase">LEAD ROLE</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-50 grid grid-cols-2 gap-3">
                   <button 
                    onClick={() => handleStatusChange(selectedStartup.id, 'Working')}
                    className="flex flex-col items-center justify-center gap-2 bg-[#D1FAE5] text-[#065F46] rounded-2xl py-4 font-black text-[9px] uppercase tracking-widest border border-[#06A77D]/10 transition-all hover:scale-105"
                   >
                     <CheckCircle2 size={16} /> Mark Working
                   </button>
                   <button 
                    onClick={() => handleStatusChange(selectedStartup.id, 'Launched')}
                    className="flex flex-col items-center justify-center gap-2 bg-[#E0F2FE] text-[#0369A1] rounded-2xl py-4 font-black text-[9px] uppercase tracking-widest border border-[#0A2463]/10 transition-all hover:scale-105"
                   >
                     <Rocket size={16} /> Mark Launched
                   </button>
                   <button 
                    onClick={() => confirm(`Cut venture ${selectedStartup.name}?`) && onDeleteStartup(selectedStartup.id)}
                    className="col-span-2 mt-2 bg-red-50 text-red-500 rounded-2xl py-4 font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                   >
                     <Trash2 size={16} /> Revoke Venture License
                   </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-100 rounded-[56px] p-12 text-center h-[600px] flex flex-col items-center justify-center shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Rocket size={32} className="text-gray-200" />
              </div>
              <h4 className="text-lg font-black text-[#0A2463] uppercase mb-2">Venture Analysis</h4>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-loose max-w-[200px]">Select a venture from the portfolio to audit operations and personnel metrics.</p>
            </div>
          )}
        </div>
      </div>

      {/* Initialize Venture Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A2463]/40 backdrop-blur-md" onClick={() => setIsAdding(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-200 p-10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight">New Venture</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Accelerate your portfolio</p>
              </div>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Venture Name</label>
                <input 
                  required 
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold" 
                  value={newForm.name || ''} 
                  onChange={e => setNewForm({...newForm, name: e.target.value})} 
                  placeholder="e.g. Nexus Bio-Tech"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Industry</label>
                  <input 
                    required 
                    className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold" 
                    value={newForm.industry || ''} 
                    onChange={e => setNewForm({...newForm, industry: e.target.value})} 
                    placeholder="e.g. AI / Web3"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Primary Founder</label>
                  <input 
                    required 
                    className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold" 
                    value={newForm.founder || ''} 
                    onChange={e => setNewForm({...newForm, founder: e.target.value})} 
                    placeholder="e.g. Jane Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Venture Briefing</label>
                <textarea 
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold h-24 resize-none" 
                  value={newForm.description || ''} 
                  onChange={e => setNewForm({...newForm, description: e.target.value})} 
                  placeholder="Accelerating neural interfaces for..."
                />
              </div>
              <button type="submit" className="w-full bg-[#0A2463] text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-[#0A2463]/20 transition-all hover:scale-105 active:scale-95">
                Register & Initialize
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Startups;
