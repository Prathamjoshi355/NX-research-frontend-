
import React, { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  Zap, 
  Users, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  MessageSquare,
  ClipboardCheck,
  Award,
  LayoutGrid,
  Trash2,
  Edit3,
  Save,
  X,
  Plus
} from 'lucide-react';
import { Challenge, ChallengeSubmission } from '../types';

interface ChallengesProps {
  challenges: Challenge[];
  submissions: ChallengeSubmission[];
  onAddChallenge: (challenge: Challenge) => void;
  onUpdateChallenge: (updated: Challenge) => void;
  onDeleteChallenge: (id: string) => void;
  onUpdateSubmission: (updated: ChallengeSubmission) => void;
  onDeleteSubmission: (id: string) => void;
}

const Challenges: React.FC<ChallengesProps> = ({ 
  challenges, 
  submissions, 
  onAddChallenge,
  onUpdateChallenge, 
  onDeleteChallenge,
  onUpdateSubmission,
  onDeleteSubmission
}) => {
  const [activeTab, setActiveTab] = useState<'openings' | 'applications'>('openings');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  
  // Edit State
  const [editingChallengeId, setEditingChallengeId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Challenge>>({});

  // Create State
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState<Partial<Challenge>>({
    title: '',
    prize: '',
    endsDate: '',
    status: 'PENDING',
    theme: 'ALL',
    description: ''
  });

  const filteredChallenges = challenges.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubmissions = submissions.filter(s => {
    const challenge = challenges.find(c => c.id === s.challengeId);
    return (
      s.teamLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge?.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const selectedSubmission = submissions.find(s => s.id === selectedSubmissionId);

  const handleStartEdit = (challenge: Challenge) => {
    setEditingChallengeId(challenge.id);
    setEditForm(challenge);
  };

  const handleCancelEdit = () => {
    setEditingChallengeId(null);
    setEditForm({});
  };

  const handleSaveEdit = () => {
    if (editingChallengeId && editForm) {
      onUpdateChallenge(editForm as Challenge);
      setEditingChallengeId(null);
    }
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setCreateForm({
      title: '',
      prize: '',
      endsDate: '',
      status: 'PENDING',
      theme: 'ALL',
      description: ''
    });
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const handleSaveCreate = () => {
    if (createForm.title && createForm.prize) {
      const newChallenge: Challenge = {
        id: `CH-${Date.now()}`,
        title: createForm.title || 'Untitled Challenge',
        status: createForm.status || 'PENDING',
        endsDate: createForm.endsDate || 'TBD',
        prize: createForm.prize || 'N/A',
        theme: createForm.theme || 'ALL',
        description: createForm.description || ''
      };
      onAddChallenge(newChallenge);
      setIsCreating(false);
    }
  };

  const handleSubmissionStatus = (id: string, newStatus: ChallengeSubmission['status']) => {
    const sub = submissions.find(s => s.id === id);
    if (sub) {
      onUpdateSubmission({ ...sub, status: newStatus });
    }
  };

  const statusColors = {
    'APPROVED': 'bg-[#D1FAE5] text-[#065F46] border-[#06A77D]/20',
    'PENDING': 'bg-[#FEF3C7] text-[#92400E] border-[#FB8500]/20',
    'CLOSED': 'bg-gray-100 text-gray-400 border-gray-200'
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-1">CHALLENGE TERMINAL</h2>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">Registry Control & Submission Intelligence</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder={activeTab === 'openings' ? "Search Challenges..." : "Search Applications..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-100 rounded-[20px] py-4 pl-12 pr-6 text-sm font-semibold w-full md:w-[320px] focus:outline-none focus:ring-2 focus:ring-[#FB8500]/10 shadow-sm"
            />
          </div>
          <button 
            onClick={() => setActiveTab(activeTab === 'openings' ? 'applications' : 'openings')}
            className="bg-[#0A2463] text-white px-8 h-14 rounded-[20px] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[#0A2463]/20 transition-all hover:scale-105"
          >
            {activeTab === 'openings' ? <ClipboardCheck size={18} /> : <LayoutGrid size={18} />}
            {activeTab === 'openings' ? 'Submissions' : 'Openings'}
          </button>
        </div>
      </div>

      {activeTab === 'openings' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white border border-gray-50 rounded-[56px] p-10 flex flex-col shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
              {editingChallengeId === challenge.id ? (
                // EDIT MODE
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Editing Registry Entry</span>
                    <button onClick={handleCancelEdit} className="p-2 text-gray-300 hover:text-red-500"><X size={18} /></button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Challenge Title</label>
                      <input 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black text-[#0A2463] uppercase focus:ring-2 focus:ring-[#FB8500]/20 outline-none"
                        value={editForm.title}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Prize Pool</label>
                        <input 
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-bold text-[#FB8500] uppercase focus:ring-2 focus:ring-[#FB8500]/20 outline-none"
                          value={editForm.prize}
                          onChange={(e) => setEditForm({...editForm, prize: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">End Date</label>
                        <input 
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-bold text-gray-500 uppercase focus:ring-2 focus:ring-[#FB8500]/20 outline-none"
                          value={editForm.endsDate}
                          onChange={(e) => setEditForm({...editForm, endsDate: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Status</label>
                      <select 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-[#FB8500]/20 outline-none appearance-none"
                        value={editForm.status}
                        onChange={(e) => setEditForm({...editForm, status: e.target.value as Challenge['status']})}
                      >
                        <option value="APPROVED">APPROVED</option>
                        <option value="PENDING">PENDING</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleSaveEdit}
                    className="w-full py-5 bg-[#06A77D] text-white rounded-[20px] font-black text-[11px] uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-lg shadow-[#06A77D]/20 transition-all hover:scale-[1.02]"
                  >
                    <Save size={16} /> Update Registry
                  </button>
                </div>
              ) : (
                // VIEW MODE
                <>
                  <div className="flex justify-between items-start mb-10">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border ${statusColors[challenge.status]}`}>
                      {challenge.status}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onDeleteChallenge(challenge.id)} 
                        className="p-2 text-gray-200 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-3xl font-[900] text-[#0A2463] uppercase tracking-tighter mb-4 leading-none">{challenge.title}</h3>
                  <div className="flex items-center gap-2 text-[#FB8500] mb-6">
                    <Zap size={16} fill="currentColor" />
                    <span className="text-sm font-black uppercase tracking-widest">PRIZE: {challenge.prize}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-10">ENDS: {challenge.endsDate}</p>

                  <button 
                    onClick={() => handleStartEdit(challenge)}
                    className="mt-auto w-full py-5 rounded-[20px] border border-gray-100 text-[#0A2463] font-black text-[11px] uppercase tracking-[0.15em] flex items-center justify-center gap-3 group-hover:bg-[#0A2463] group-hover:text-white transition-all"
                  >
                    EDIT DETAILS <Edit3 size={16} />
                  </button>
                </>
              )}
            </div>
          ))}

          {/* New Opening Card / Form */}
          {isCreating ? (
            <div className="bg-white border border-[#FB8500]/30 rounded-[56px] p-10 flex flex-col shadow-xl animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-[#FB8500] uppercase tracking-widest">Initialize New Opening</span>
                <button onClick={handleCancelCreate} className="p-2 text-gray-300 hover:text-red-500"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Challenge Title</label>
                  <input 
                    autoFocus
                    placeholder="E.G. QUANTUM OPTIMIZATION"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-black text-[#0A2463] uppercase focus:ring-2 focus:ring-[#FB8500]/20 outline-none"
                    value={createForm.title}
                    onChange={(e) => setCreateForm({...createForm, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Prize Pool</label>
                    <input 
                      placeholder="E.G. ₹50,000"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-bold text-[#FB8500] uppercase focus:ring-2 focus:ring-[#FB8500]/20 outline-none"
                      value={createForm.prize}
                      onChange={(e) => setCreateForm({...createForm, prize: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">End Date</label>
                    <input 
                      placeholder="E.G. 15 APR"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-bold text-gray-500 uppercase focus:ring-2 focus:ring-[#FB8500]/20 outline-none"
                      value={createForm.endsDate}
                      onChange={(e) => setCreateForm({...createForm, endsDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Description</label>
                  <textarea 
                    placeholder="BRIEF OVERVIEW OF THE CHALLENGE..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-bold text-[#0A2463] uppercase focus:ring-2 focus:ring-[#FB8500]/20 outline-none h-20 resize-none"
                    value={createForm.description}
                    onChange={(e) => setCreateForm({...createForm, description: e.target.value})}
                  />
                </div>
              </div>

              <button 
                onClick={handleSaveCreate}
                disabled={!createForm.title || !createForm.prize}
                className="mt-8 w-full py-5 bg-[#FB8500] text-white rounded-[20px] font-black text-[11px] uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-lg shadow-[#FB8500]/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:grayscale"
              >
                <Plus size={16} /> Deploy Challenge
              </button>
            </div>
          ) : (
            <button 
              onClick={handleStartCreate}
              className="border-4 border-dashed border-gray-100 rounded-[56px] p-10 flex flex-col items-center justify-center text-gray-300 hover:text-[#FB8500] hover:border-[#FB8500]/20 transition-all group min-h-[350px]"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy size={32} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">New Opening</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8">
            <div className="bg-white border border-gray-50 rounded-[40px] overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-[#F8F9FA] border-b border-gray-50">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Team Lead</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Challenge</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredSubmissions.map((sub) => {
                    const challenge = challenges.find(c => c.id === sub.challengeId);
                    return (
                      <tr 
                        key={sub.id} 
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedSubmissionId === sub.id ? 'bg-[#45B79B]/5' : ''}`}
                        onClick={() => setSelectedSubmissionId(sub.id)}
                      >
                        <td className="px-8 py-6">
                          <p className="text-sm font-black text-[#0A2463] uppercase">{sub.teamLead}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">Size: {sub.teamSize}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-xs font-bold text-gray-500 uppercase">{challenge?.title}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            sub.status === 'SHORTLISTED' ? 'bg-[#45B79B]/10 text-[#45B79B]' :
                            sub.status === 'REVIEWED' ? 'bg-blue-50 text-blue-600' :
                            sub.status === 'REJECTED' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <ChevronRight size={18} className="text-gray-300 inline" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="xl:col-span-4">
            {selectedSubmission ? (
              <div className="bg-white border border-gray-100 rounded-[56px] p-10 shadow-xl animate-in fade-in slide-in-from-right-8 duration-500 sticky top-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 rounded-3xl bg-[#45B79B]/10 flex items-center justify-center text-[#45B79B]">
                    <Users size={28} />
                  </div>
                  <button onClick={() => setSelectedSubmissionId(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-300"><XCircle size={24} /></button>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight mb-2">{selectedSubmission.teamLead}</h3>
                  <p className="text-[10px] font-black text-[#45B79B] uppercase tracking-widest">Approach submitted on {selectedSubmission.submissionDate}</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-[#F8F9FA] rounded-[32px] p-6 border border-gray-100">
                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Proposed Strategy</h4>
                    <p className="text-xs font-bold text-[#0A2463] leading-relaxed italic">"{selectedSubmission.approach}"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleSubmissionStatus(selectedSubmission.id, 'SHORTLISTED')} className="bg-[#45B79B] text-white rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-105">
                      <CheckCircle2 size={16} /> Shortlist
                    </button>
                    <button onClick={() => onDeleteSubmission(selectedSubmission.id)} className="bg-white border border-gray-100 text-red-500 rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-red-50">
                      <Trash2 size={16} /> Cut
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-dashed border-gray-100 rounded-[56px] p-12 text-center h-[500px] flex flex-col items-center justify-center">
                <ClipboardCheck size={32} className="text-gray-200 mb-6" />
                <h4 className="text-lg font-black text-[#0A2463] uppercase mb-2">Submission View</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select an entry to view detailed answers.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
