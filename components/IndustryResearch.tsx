
import React, { useState } from 'react';
import { 
  Search, 
  Briefcase, 
  Trash2, 
  Building2, 
  ChevronRight,
  X,
  Plus,
  Zap,
  Cpu,
  Users,
  Wallet,
  Globe,
  FileText,
  ShieldCheck,
  Settings,
  MoreVertical,
  Activity,
  Edit2,
  Save
} from 'lucide-react';
import { IndustryEntity } from '../types';

interface IndustryResearchProps {
  entities: IndustryEntity[];
  onUpdate: (updated: IndustryEntity) => void;
  onAdd: (newEntity: IndustryEntity) => void;
  onDelete: (id: string) => void;
}

const IndustryResearch: React.FC<IndustryResearchProps> = ({ entities, onUpdate, onAdd, onDelete }) => {
  const [activeTab, setActiveTab] = useState<IndustryEntity['type']>('RESEARCHER');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Local edit states for sidepanel
  const [isEditingIntel, setIsEditingIntel] = useState(false);
  const [newIntelKey, setNewIntelKey] = useState('');
  const [newIntelValue, setNewIntelValue] = useState('');

  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    company: '',
    type: 'RESEARCHER' as IndustryEntity['type'],
    contractValue: '$0'
  });

  const filtered = entities.filter(e => 
    e.type === activeTab && 
    (e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     e.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedEntity = entities.find(e => e.id === selectedId);

  const handleEnlist = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `IND-${Math.floor(1000 + Math.random() * 9000)}`;
    const initials = addForm.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    
    const newEntity: IndustryEntity = {
      id,
      name: addForm.name,
      email: addForm.email,
      company: addForm.company,
      type: addForm.type,
      status: 'Active',
      contractValue: addForm.contractValue,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      avatar: initials || 'IX',
      intelData: {
        primaryStack: 'TBD',
        partnershipTier: 'Standard',
        ipPortfolio: 'None'
      }
    };
    
    onAdd(newEntity);
    setIsAdding(false);
    setAddForm({ name: '', email: '', company: '', type: 'RESEARCHER', contractValue: '$0' });
    setSelectedId(id);
  };

  const updateIntel = (key: string, value: string) => {
    if (!selectedEntity) return;
    const updated = {
      ...selectedEntity,
      intelData: { ...selectedEntity.intelData, [key]: value }
    };
    onUpdate(updated);
  };

  const removeIntel = (key: string) => {
    if (!selectedEntity) return;
    const newIntel = { ...selectedEntity.intelData };
    delete newIntel[key];
    onUpdate({ ...selectedEntity, intelData: newIntel });
  };

  const addNewIntel = () => {
    if (newIntelKey && newIntelValue) {
      updateIntel(newIntelKey, newIntelValue);
      setNewIntelKey('');
      setNewIntelValue('');
    }
  };

  const statusColors = {
    'Active': 'bg-[#06A77D]/10 text-[#06A77D]',
    'Under Review': 'bg-[#FB8500]/10 text-[#FB8500]',
    'On Hold': 'bg-gray-100 text-gray-400',
    'Contracted': 'bg-[#0A2463]/10 text-[#0A2463]'
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Strategic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-1">INDUSTRY HUB</h2>
          <p className="text-gray-400 text-[10px] font-black tracking-[0.2em] uppercase">Corporate Strategic Partnerships & Tech Alliances</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Alliance..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-100 rounded-[20px] py-4 pl-12 pr-6 text-sm font-bold w-full md:w-[280px] focus:outline-none focus:ring-4 focus:ring-[#0A2463]/5 shadow-sm transition-all"
            />
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-[#0A2463] text-white h-14 px-6 rounded-[20px] flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[#0A2463]/20 hover:bg-[#071946] transition-all"
          >
            <Plus size={18} strokeWidth={3} /> Initialize Partnership
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-10">
        {[
          { id: 'RESEARCHER', label: 'RESEARCHERS', icon: <Users size={16} /> },
          { id: 'TECH_LEAD', label: 'TECH LEADS', icon: <Cpu size={16} /> },
          { id: 'PARTNER', label: 'CORPORATE PARTNERS', icon: <Building2 size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as IndustryEntity['type'])}
            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
              activeTab === tab.id 
                ? 'bg-[#0A2463] text-white shadow-xl shadow-[#0A2463]/20' 
                : 'bg-white border border-gray-50 text-gray-400 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Partnership Directory */}
        <div className="xl:col-span-8 space-y-4">
          {filtered.length > 0 ? filtered.map((entity) => (
            <div 
              key={entity.id}
              onClick={() => setSelectedId(entity.id)}
              className={`group bg-white border border-gray-50 rounded-[40px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:shadow-xl hover:shadow-[#0A2463]/5 cursor-pointer ${selectedId === entity.id ? 'ring-2 ring-[#0A2463]/10 bg-[#F8F9FA] border-[#0A2463]/10' : ''}`}
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[24px] bg-gray-50 text-[#0A2463] flex items-center justify-center font-black text-xl border border-gray-100 group-hover:scale-110 transition-transform">
                  {entity.avatar}
                </div>
                <div>
                  <h4 className="text-xl font-black text-[#0A2463] uppercase tracking-tight mb-1">{entity.name}</h4>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Building2 size={12} className="text-[#FB8500]" /> {entity.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Contract</p>
                  <p className="text-sm font-black text-[#0A2463]">{entity.contractValue}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${statusColors[entity.status]}`}>
                    {entity.status}
                  </span>
                </div>
                <ChevronRight size={20} className="text-gray-200 group-hover:text-[#0A2463] transition-all" />
              </div>
            </div>
          )) : (
            <div className="py-32 flex flex-col items-center justify-center bg-white border border-dashed border-gray-100 rounded-[56px] text-center">
              <Briefcase size={48} className="text-gray-100 mb-6" />
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">No records found in active alliance database.</p>
            </div>
          )}
        </div>

        {/* Corporate Auditor Panel */}
        <div className="xl:col-span-4">
          {selectedEntity ? (
            <div className="bg-white border border-gray-100 rounded-[56px] p-10 shadow-2xl animate-in slide-in-from-right-10 duration-500 sticky top-10 overflow-hidden">
              <div className="flex justify-between items-start mb-10">
                <div className="w-20 h-20 rounded-[32px] bg-[#0A2463] text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-[#0A2463]/20">
                  {selectedEntity.avatar}
                </div>
                <button 
                  onClick={() => setSelectedId(null)}
                  className="p-3 hover:bg-gray-100 rounded-2xl text-gray-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight mb-2">{selectedEntity.name}</h3>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">{selectedEntity.company}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[8px] font-black text-gray-400 uppercase tracking-widest">TYPE: {selectedEntity.type}</span>
                  <span className="px-3 py-1 bg-[#06A77D]/10 text-[#06A77D] rounded-lg text-[8px] font-black uppercase tracking-widest">ALLIANCE SECURED</span>
                </div>
              </div>

              <div className="space-y-10">
                {/* Intel Matrix */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <FileText size={14} className="text-[#FB8500]" /> Intelligence Matrix
                    </p>
                    <button 
                      onClick={() => setIsEditingIntel(!isEditingIntel)}
                      className="text-[9px] font-black text-[#0A2463] uppercase tracking-widest hover:underline"
                    >
                      {isEditingIntel ? 'Lock Matrix' : 'Audit Data'}
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(selectedEntity.intelData).map(([key, value]) => (
                      <div key={key} className="p-5 bg-gray-50 border border-gray-100 rounded-3xl group/intel">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-[9px] font-black text-[#0A2463] uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</p>
                          {isEditingIntel && (
                            <button onClick={() => removeIntel(key)} className="text-red-400 hover:text-red-600">
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                        {isEditingIntel ? (
                          <input 
                            className="w-full bg-white border border-gray-200 rounded-xl p-2 text-xs font-bold text-[#0A2463] focus:outline-none"
                            value={value}
                            onChange={(e) => updateIntel(key, e.target.value)}
                          />
                        ) : (
                          <p className="text-xs font-bold text-gray-500 italic leading-relaxed">"{value}"</p>
                        )}
                      </div>
                    ))}

                    {isEditingIntel && (
                      <div className="p-5 border-2 border-dashed border-gray-100 rounded-3xl space-y-3">
                        <input 
                          placeholder="Intel Key (e.g. techStack)"
                          className="w-full bg-transparent text-[10px] font-black uppercase outline-none"
                          value={newIntelKey}
                          onChange={e => setNewIntelKey(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <input 
                            placeholder="Insight Value..."
                            className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-2 text-xs font-bold outline-none"
                            value={newIntelValue}
                            onChange={e => setNewIntelValue(e.target.value)}
                          />
                          <button 
                            onClick={addNewIntel}
                            className="bg-[#0A2463] text-white px-3 rounded-xl hover:bg-[#FB8500] transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Economic Matrix */}
                <div className="bg-[#0A2463] rounded-[32px] p-8 text-white shadow-xl shadow-[#0A2463]/10">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Financial Audit</p>
                    <Wallet size={16} className="text-[#FB8500]" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white/60 uppercase">Contract Value</span>
                      <span className="text-xl font-black tracking-tight">{selectedEntity.contractValue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white/60 uppercase">Fiscal Sync</span>
                      <span className="text-[10px] font-black text-[#06A77D] uppercase">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => onUpdate({ ...selectedEntity, status: 'Contracted' })}
                    className="flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-white border border-gray-100 rounded-2xl py-4 transition-all hover:shadow-lg active:scale-95"
                  >
                    <ShieldCheck size={18} className="text-[#06A77D]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#0A2463]">Contract</span>
                  </button>
                  <button 
                    onClick={() => onUpdate({ ...selectedEntity, status: 'Under Review' })}
                    className="flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-white border border-gray-100 rounded-2xl py-4 transition-all hover:shadow-lg active:scale-95"
                  >
                    <Activity size={18} className="text-[#FB8500]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#0A2463]">Review</span>
                  </button>
                  <button 
                    onClick={() => confirm(`CUT ALL CORPORATE TIES WITH ${selectedEntity.name}?`) && onDelete(selectedEntity.id)}
                    className="col-span-2 mt-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95"
                  >
                    <Zap size={16} /> Termination Protocol
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-100 rounded-[56px] p-12 text-center h-[600px] flex flex-col items-center justify-center shadow-sm">
              <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center mb-8">
                <Globe size={40} className="text-gray-200" />
              </div>
              <h4 className="text-xl font-[900] text-[#0A2463] uppercase tracking-tight mb-3">Partnership Auditor</h4>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-loose max-w-[240px] mx-auto">
                Select a corporate entity or researcher to inspect alliances, economic value, and tech intelligence matrix.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Initialize Partnership Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A2463]/40 backdrop-blur-md" onClick={() => setIsAdding(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[48px] shadow-2xl animate-in zoom-in-95 duration-200 p-12">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-3xl font-[900] text-[#0A2463] uppercase tracking-tight">Alliance Entry</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Corporate Strategic Enlistment</p>
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
                  <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Corporate Entity</label>
                  <input 
                    required 
                    className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-5 px-8 text-sm font-black uppercase focus:outline-none focus:ring-4 focus:ring-[#FB8500]/5 transition-all"
                    value={addForm.company}
                    onChange={e => setAddForm({...addForm, company: e.target.value})}
                    placeholder="WAYNE ENTERPRISES"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Partner Type</label>
                    <select 
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-5 px-6 text-xs font-black uppercase appearance-none outline-none"
                      value={addForm.type}
                      onChange={e => setAddForm({...addForm, type: e.target.value as IndustryEntity['type']})}
                    >
                      <option value="RESEARCHER">Researcher</option>
                      <option value="TECH_LEAD">Tech Lead</option>
                      <option value="PARTNER">Corporate Partner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#0A2463] uppercase tracking-[0.2em] mb-3 ml-1">Contract Valuation</label>
                    <input 
                      required 
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-5 px-8 text-xs font-black uppercase focus:outline-none focus:ring-4 focus:ring-[#FB8500]/5 transition-all"
                      value={addForm.contractValue}
                      onChange={e => setAddForm({...addForm, contractValue: e.target.value})}
                      placeholder="₹1.5Cr"
                    />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-[#0A2463] text-white font-black text-[11px] uppercase tracking-[0.2em] py-6 rounded-3xl shadow-xl shadow-[#0A2463]/20 mt-8 active:scale-95 transition-all hover:bg-[#071946]">
                Authorize Partnership Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryResearch;
