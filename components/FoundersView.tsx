
import React, { useState } from 'react';
import { Founder } from '../Companytypes';

const INITIAL_FOUNDERS: Founder[] = [
  {
    id: '1',
    name: 'Vikram Singh',
    role: 'Chief Executive Officer',
    bio: 'Visionary leader with 15+ years in industrial automation and AI. Leading the next wave of smart manufacturing with a focus on sustainable growth and technological integration.',
    email: 'vikram.s@nxindustry.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
    linkedin: 'linkedin.com/in/vikram-singh'
  },
  {
    id: '2',
    name: 'Ananya Sharma',
    role: 'Chief Technology Officer',
    bio: 'Pioneer in robotics and cloud infrastructure. Architecting the digital twin platforms of tomorrow. Expert in distributed systems and real-time industrial monitoring.',
    email: 'ananya.sharma@nxindustry.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    linkedin: 'linkedin.com/in/ananya-sharma'
  },
  {
    id: '3',
    name: 'Dr. Rahul Mehta',
    role: 'Chief Scientific Officer',
    bio: 'PhD in Materials Science. Focused on sustainable manufacturing processes and next-gen alloys. Leading the R&D division for breakthrough industrial materials.',
    email: 'rahul.mehta@nxindustry.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
    linkedin: 'linkedin.com/in/rahul-mehta'
  }
];

const GROUPS = [
  { id: 'g1', name: 'Executive Leadership', members: 3 },
  { id: 'g2', name: 'Strategic R&D Board', members: 5 },
  { id: 'g3', name: 'Product Steering Group', members: 4 },
  { id: 'g4', name: 'Compliance & Ethics', members: 2 },
];

interface FoundersViewProps {
  onAddSuccess?: (founder: Founder) => void;
}

const FoundersView: React.FC<FoundersViewProps> = ({ onAddSuccess }) => {
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);
  const [showGroups, setShowGroups] = useState(false);
  const [addedToGroup, setAddedToGroup] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddToGroup = (groupName: string) => {
    setAddedToGroup(groupName);
    setTimeout(() => {
      setAddedToGroup(null);
      setShowGroups(false);
    }, 2000);
  };

  const handleOpenRequest = () => {
    setIsRequesting(true);
  };

  const handleSubmitRequest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRequesting(false);
      setRequestSent(true);
      setCustomMessage('');
      if (onAddSuccess && selectedFounder) {
        onAddSuccess(selectedFounder);
      }
    }, 1500);
  };

  const resetModal = () => {
    setSelectedFounder(null);
    setIsRequesting(false);
    setRequestSent(false);
    setCustomMessage('');
    setShowGroups(false);
  };

  return (
    <div className="p-4 sm:p-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-24 md:pb-8">
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-[#002B5B] tracking-tight uppercase">Our Founders</h2>
        <p className="text-gray-500 mt-1 font-medium text-sm sm:text-base">Manage core leadership and founding team members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
        {INITIAL_FOUNDERS.map((founder) => (
          <div 
            key={founder.id}
            onClick={() => { setSelectedFounder(founder); setShowGroups(false); setRequestSent(false); setIsRequesting(false); }}
            className="group bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-transparent hover:border-orange-200 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden mb-6 ring-8 ring-gray-50 group-hover:ring-orange-50 transition-all shadow-inner">
              <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#002B5B] tracking-tight truncate w-full">{founder.name}</h3>
            <p className="text-orange-500 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mt-2">{founder.role}</p>
          </div>
        ))}
      </div>

      {selectedFounder && (
        <div className="fixed inset-y-0 right-0 left-0 md:left-72 z-[100] flex items-center justify-center p-4 sm:p-10 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.35)] relative border border-white/40 flex flex-col max-h-[95vh] md:max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="absolute top-0 right-0 left-0 p-4 sm:p-6 flex justify-end z-30 pointer-events-none">
              <button 
                onClick={resetModal}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-md hover:bg-orange-50 hover:text-orange-500 text-gray-400 transition-all pointer-events-auto border border-gray-100"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-12 lg:p-16">
              {!showGroups ? (
                <div className="animate-in slide-in-from-bottom-8 duration-500 pb-4">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12 lg:gap-20 text-center sm:text-left">
                    <div className="shrink-0">
                      <img 
                        src={selectedFounder.image} 
                        alt={selectedFounder.name} 
                        className="w-32 h-32 sm:w-48 lg:w-60 sm:h-48 lg:h-60 rounded-[2rem] lg:rounded-[2.5rem] object-cover shadow-2xl ring-8 ring-gray-50 mx-auto"
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <div className="inline-block bg-orange-500 text-white px-3 py-1 lg:px-4 lg:py-1.5 rounded-lg font-black text-[8px] lg:text-[9px] uppercase tracking-[0.1em] mb-4 shadow-sm">
                        FOUNDING PARTNER
                      </div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002B5B] tracking-tight leading-tight mb-2">
                        {selectedFounder.name}
                      </h2>
                      <p className="text-gray-400 font-bold uppercase text-[9px] lg:text-xs tracking-[0.15em] mb-6 sm:mb-8">
                        {selectedFounder.role}
                      </p>
                      
                      <div className="p-5 lg:p-8 bg-slate-50/80 rounded-[1.5rem] lg:rounded-[2.5rem] border border-slate-100 mb-6 lg:mb-8">
                        <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 lg:mb-4">EXECUTIVE SUMMARY</h4>
                        <p className="text-slate-600 leading-relaxed font-medium text-sm sm:text-base">
                          {selectedFounder.bio}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-8 lg:mb-10">
                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                          <i className="fa-solid fa-envelope text-orange-500 shrink-0"></i>
                          <span className="text-[11px] lg:text-sm font-bold text-gray-500 truncate">{selectedFounder.email}</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                          <i className="fa-brands fa-linkedin-in text-blue-500 shrink-0"></i>
                          <span className="text-[11px] lg:text-sm font-bold text-gray-500 truncate">{selectedFounder.linkedin}</span>
                        </div>
                      </div>

                      <div className="space-y-4 mb-4">
                        {isRequesting && !requestSent && (
                          <div className="animate-in slide-in-from-top-4 duration-300 space-y-4">
                            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest">Personal Message (Optional)</label>
                            <textarea 
                              value={customMessage}
                              onChange={(e) => setCustomMessage(e.target.value)}
                              placeholder="Write a brief message..."
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/30 transition-all font-medium text-sm resize-none h-24 lg:h-28"
                            />
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                          <button 
                            onClick={isRequesting ? handleSubmitRequest : handleOpenRequest}
                            disabled={requestSent || isSubmitting}
                            className={`flex-1 px-6 py-4 lg:px-8 lg:py-5 rounded-2xl font-black uppercase text-[10px] lg:text-[11px] tracking-[0.15em] transition-all flex items-center justify-center gap-3 ${
                              requestSent 
                                ? 'bg-emerald-500 text-white cursor-default shadow-lg shadow-emerald-500/20' 
                                : isSubmitting
                                  ? 'bg-orange-400 text-white cursor-wait'
                                  : 'bg-[#121212] text-white hover:bg-black shadow-xl shadow-black/10 active:scale-95'
                            }`}
                          >
                            {isSubmitting ? (
                              <><i className="fa-solid fa-circle-notch fa-spin"></i> SUBMITTING...</>
                            ) : requestSent ? (
                              <><i className="fa-solid fa-check-double"></i> REQUEST SENT</>
                            ) : isRequesting ? (
                              <><i className="fa-solid fa-paper-plane"></i> CONFIRM</>
                            ) : (
                              <><i className="fa-solid fa-user-plus"></i> SEND REQUEST</>
                            )}
                          </button>
                          
                          {!isRequesting && (
                            <button 
                              onClick={() => setShowGroups(true)}
                              className="flex-1 px-6 py-4 lg:px-8 lg:py-5 border-2 border-gray-200 text-[#121212] rounded-2xl font-black uppercase text-[10px] lg:text-[11px] tracking-[0.15em] hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                              <i className="fa-solid fa-layer-group"></i> GROUP
                            </button>
                          )}
                        </div>
                        
                        {isRequesting && (
                          <button 
                            onClick={() => setIsRequesting(false)}
                            className="w-full text-center text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-orange-500 transition-colors py-2"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-in slide-in-from-right-8 duration-500 pb-4">
                  <div className="mb-8 lg:mb-10">
                    <button 
                      onClick={() => setShowGroups(false)} 
                      className="text-orange-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-4 hover:translate-x-[-4px] transition-transform"
                    >
                      <i className="fa-solid fa-arrow-left"></i> BACK TO PROFILE
                    </button>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#002B5B] tracking-tight">Assign Group</h2>
                    <p className="text-gray-400 font-medium text-sm mt-1">Place {selectedFounder.name} in a strategic group.</p>
                  </div>
                  
                  <div className="space-y-3 pr-2">
                    {GROUPS.map((group) => (
                      <button
                        key={group.id}
                        onClick={() => handleAddToGroup(group.name)}
                        disabled={!!addedToGroup}
                        className={`w-full text-left p-5 lg:p-6 rounded-[1.5rem] border transition-all flex items-center justify-between ${
                          addedToGroup === group.name 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-600' 
                            : 'bg-gray-50 border-gray-100 hover:border-orange-500 hover:bg-white shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div>
                           <p className="font-black text-[#002B5B] uppercase text-[10px] tracking-widest">{group.name}</p>
                           <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{group.members} Members</p>
                        </div>
                        {addedToGroup === group.name ? (
                          <i className="fa-solid fa-check-circle text-lg animate-in zoom-in"></i>
                        ) : (
                          <i className="fa-solid fa-plus text-gray-300"></i>
                        )}
                      </button>
                    ))}
                  </div>

                  {addedToGroup && (
                     <div className="mt-8 p-5 lg:p-6 bg-emerald-50 text-emerald-600 rounded-2xl lg:rounded-3xl border border-emerald-100 flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                        <i className="fa-solid fa-circle-check text-xl shrink-0"></i>
                        <p className="text-[10px] lg:text-xs font-black uppercase tracking-widest">Added to {addedToGroup}</p>
                     </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoundersView;
