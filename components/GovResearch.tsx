
import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Users, 
  Globe, 
  ChevronRight, 
  ShieldAlert,
  FileText,
  Settings,
  X,
  CheckCircle2,
  Plus,
  Trash2,
  Zap,
  Target,
  FlaskConical
} from 'lucide-react';
import { GovEntity, EntityType } from '../types';

interface GovResearchProps {
  entities: GovEntity[];
  onUpdateEntity: (updated: GovEntity) => void;
  onAddEntity: (newEntity: GovEntity) => void;
  onDeleteEntity: (id: string) => void;
}

const GovResearch: React.FC<GovResearchProps> = ({ 
  entities, 
  onUpdateEntity, 
  onAddEntity, 
  onDeleteEntity 
}) => {
  const [activeType, setActiveType] = useState('RESEARCHER');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    department: '',
    type: 'RESEARCHER'
  });

  const filteredEntities = entities.filter(e => 
    e.type === activeType && 
    (e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     e.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedEntity = entities.find(e => e.id === selectedEntityId);

  const handleStatusChange = (id, newStatus) => {
    const entity = entities.find(e => e.id === id);
    if (entity) {
      onUpdateEntity({ ...entity, status: newStatus });
    }
  };

  const handleEnlist = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `GOV-${Math.floor(1000 + Math.random() * 9000)}`;
    const initials = addForm.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    
    const newEntity: GovEntity = {
      id,
      name: addForm.name,
      email: addForm.email,
      type: addForm.type as EntityType,
      status: 'Pending',
      department: addForm.department,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      avatar: initials || 'NX',
      submissionData: {
        researchFocus: 'Awaiting initialization',
        clearanceLevel: 'Level 1 (Basic)',
        primaryProject: 'Pending Assignment'
      },
      assignedProjects: []
    };
    
    onAddEntity(newEntity);
    setIsAdding(false);
    setAddForm({ name: '', email: '', department: '', type: 'RESEARCHER' });
    setSelectedEntityId(id);
  };

  const addProject = () => {
    if (!selectedEntity || !newProjectName.trim()) return;
    const updated = {
      ...selectedEntity,
      assignedProjects: [...selectedEntity.assignedProjects, newProjectName.trim()]
    };
    onUpdateEntity(updated);
    setNewProjectName('');
  };

  const removeProject = (project) => {
    if (!selectedEntity) return;
    const updated = {
      ...selectedEntity,
      assignedProjects: selectedEntity.assignedProjects.filter(p => p !== project)
    };
    onUpdateEntity(updated);
  };

  const statusColors = {
    'Verified': 'bg-[#06A77D]/10 text-[#06A77D]',
    'Pending': 'bg-[#FFB703]/10 text-[#92400E]',
    'Security Cleared': 'bg-[#0A2463]/10 text-[#0A2463]',
    'Blocked': 'bg-red-50 text-red-600'
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-1">GOV RESEARCH CONTROL</h2>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">Tactical Access • High-Security Personnel Registry</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter database..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-100 rounded-[20px] py-4 pl-12 pr-6 text-sm font-bold w-full md:w-[280px] focus:outline-none focus:ring-4 focus:ring-[#FB8500]/5 shadow-sm transition-all"
            />
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-[#FB8500] text-white h-14 px-6 rounded-[20px] flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[#FB8500]/20 hover:bg-[#e67a00] transition-all"
          >
            <Plus size={18} strokeWidth={3} /> Enlist Personnel
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        {['RESEARCHER', 'MENTOR', 'STUDENT', 'PARTNER'].map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
              activeType === type 
                ? 'bg-[#0A2463] text-white shadow-xl shadow-[#0A2463]/20' 
                : 'bg-white border border-gray-50 text-gray-400 hover:bg-gray-50'
            }`}
          >
            {type === 'RESEARCHER' && <FlaskConical size={16} />}
            {type === 'MENTOR' && <ShieldCheck size={16} />}
            {type === 'STUDENT' && <Users size={16} />}
            {type === 'PARTNER' && <Globe size={16} />}
            {type}S
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-4">
          {filteredEntities.length > 0 ? (
            filteredEntities.map((entity) => (
              <div 
                key={entity.id}
                onClick={() => setSelectedEntityId(entity.id)}
                className={`group bg-white border border-gray-50 rounded-[40px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:shadow-xl hover:shadow-[#0A2463]/5 cursor-pointer ${selectedEntityId === entity.id ? 'ring-2 ring-[#FB8500]/20 border-[#FB8500]/20 bg-[#F8F9FA]' : ''}`}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[24px] bg-[#0A2463] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[#0A2463]/10">
                    {entity.avatar}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#0A2463] uppercase tracking-tight mb-1 group-hover:text-[#FB8500] transition-colors">{entity.name}</h4>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${entity.status === 'Verified' || entity.status === 'Security Cleared' ? 'bg-[#06A77D]' : 'bg-[#FFB703]'}`} />
                      {entity.id} • {entity.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Projects</p>
                    <p className="text-sm font-black text-[#0A2463]">{entity.assignedProjects.length}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${statusColors[entity.status]}`}>
                      {entity.status}
                    </span>
                  </div>
                  <ChevronRight size={20} className="text-gray-200 group-hover:text-[#FB8500] transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-32 bg-white border border-dashed border-gray-100 rounded-[56px] text-center">
              <ShieldAlert size={48} className="text-gray-200 mb-6" />
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">No personnel matching active filter.</p>
            </div>
          )}
        </div>

        <div className="xl:col-span-4">
          {selectedEntity ? (
            <div className="bg-[#0A2463] rounded-[56px] p-10 text-white shadow-2xl animate-in slide-in-from-right-10 duration-500 sticky top-10 overflow-hidden">
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="w-20 h-20 rounded-[32px] bg-white/10 flex items-center justify-center text-3xl font-black text-[#FB8500] border border-white/10 shadow-xl">
                  {selectedEntity.avatar}
                </div>
                <button 
                  onClick={() => setSelectedEntityId(null)}
                  className="p-3 hover:bg-white/10 rounded-2xl text-white/40 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-10 relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{selectedEntity.name}</h3>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">{selectedEntity.email}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/5">DEPT: {selectedEntity.department}</span>
                  <span className="px-3 py-1 bg-[#FB8500] rounded-lg text-[8px] font-black uppercase tracking-widest">TACTICAL POOL</span>
                </div>
              </div>

              <div className="space-y-10 relative z-10">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Research Focus</p>
                    <Settings size={14} className="text-white/20" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    {Object.entries(selectedEntity.submissionData).map(([key, value]) => (
                      <div key={key} className="mb-4 last:mb-0">
                        <p className="text-[8px] font-black text-[#FB8500] uppercase tracking-[0.2em] mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-xs font-bold text-white/80 leading-relaxed italic">"{value || 'N/A'}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2"><Target size={14} className="text-[#FB8500]" /> Assigned Projects</p>
                  </div>
                  <div className="space-y-3">
                    {selectedEntity.assignedProjects.length > 0 ? selectedEntity.assignedProjects.map((proj, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl group/proj">
                        <span className="text-[10px] font-black uppercase tracking-widest">{proj}</span>
                        <button 
                          onClick={() => removeProject(proj)}
                          className="opacity-0 group-hover/proj:opacity-100 p-1 text-red-400 hover:bg-red-400/20 rounded transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )) : (
                      <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest text-center py-4 border border-dashed border-white/10 rounded-2xl">No active assignments</p>
                    )}
                    
                    <div className="flex gap-2 mt-4">
                      <input 
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-bold outline-none focus:bg-white/10 transition-all" 
                        placeholder="Add Project Code..."
                        value={newProjectName}
                        onChange={e => setNewProjectName(e.target.value)}
                      />
                      <button 
                        onClick={addProject}
                        className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl flex items-center justify-center transition-all"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleStatusChange(selectedEntity.id, 'Security Cleared')}
                    className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 text-[9px] font-black uppercase flex flex-col items-center gap-2 border border-white/5 transition-all active:scale-95"
                  >
                    <ShieldCheck size={18} className="text-[#06A77D]" />
                    Clearance
                  </button>
                  <button 
                    onClick={() => handleStatusChange(selectedEntity.id, 'Verified')}
                    className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 text-[9px] font-black uppercase flex flex-col items-center gap-2 border border-white/5 transition-all active:scale-95"
                  >
                    <CheckCircle2 size={18} className="text-blue-400" />
                    Verify
                  </button>
                  <button 
                    onClick={() => window.confirm(`REVOKE ALL ACCESS FOR ${selectedEntity.name}?`) && onDeleteEntity(selectedEntity.id)}
                    className="col-span-2 bg-red-500/10 hover:bg-red-500/30 text-red-400 rounded-2xl py-4 font-black text-[10px] uppercase flex items-center justify-center gap-3 border border-red-500/20 transition-all active:scale-95"
                  >
                    <Zap size={16} /> Revoke Tactical Access
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-100 rounded-[56px] p-12 text-center h-[600px] flex flex-col items-center justify-center shadow-sm">
              <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-8">
                <FileText size={40} className="text-gray-200" />
              </div>
              <h4 className="text-xl font-[900] text-[#0A2463] uppercase tracking-tight mb-3">Tactical Auditor</h4>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-loose max-w-[240px] mx-auto">
                Select a personnel record from the database to inspect intelligence, clearance levels, and active project matrix.
              </p>
            </div>
          )}
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A2463]/40 backdrop-blur-md" onClick={() => setIsAdding(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[48px] shadow-2xl animate-in zoom-in-95 duration-200 p-12">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-3xl font-[900] text-[#0A2463] uppercase tracking-tight">Personnel Enlistment</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">New Database Entry Protocol</p>
              </div>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEnlist} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Full Name</label>
                  <input 
                    required 
                    className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-5 px-8 text-sm font-black uppercase focus:outline-none focus:ring-4 focus:ring-[#FB8500]/5 transition-all"
                    value={addForm.name}
                    onChange={e => setAddForm({...addForm, name: e.target.value})}
                    placeholder="E.G. BRUCE WAYNE"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Email / Secure Identifier</label>
                  <input 
                    required 
                    type="email"
                    className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-5 px-8 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#FB8500]/5 transition-all"
                    value={addForm.email}
                    onChange={e => setAddForm({...addForm, email: e.target.value})}
                    placeholder="WAYNE@NX-SYSTEMS.IO"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Entity Pool</label>
                    <select 
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-5 px-6 text-xs font-black uppercase appearance-none cursor-pointer outline-none"
                      value={addForm.type}
                      onChange={e => setAddForm({...addForm, type: e.target.value as EntityType})}
                    >
                      <option value="RESEARCHER">Researcher</option>
                      <option value="MENTOR">Mentor</option>
                      <option value="STUDENT">Student</option>
                      <option value="PARTNER">Partner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Department</label>
                    <input 
                      required 
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-5 px-8 text-xs font-black uppercase focus:outline-none focus:ring-4 focus:ring-[#FB8500]/5 transition-all"
                      value={addForm.department}
                      onChange={e => setAddForm({...addForm, department: e.target.value})}
                      placeholder="NX-CYBERNETICS"
                    />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-[#0A2463] text-white font-black text-[11px] uppercase tracking-[0.2em] py-6 rounded-3xl shadow-xl shadow-[#0A2463]/20 mt-8 active:scale-95 transition-all hover:bg-[#071946]">
                Deploy Enlistment Protocol
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovResearch;
