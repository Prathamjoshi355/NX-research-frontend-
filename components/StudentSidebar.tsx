
import React from 'react';
import { OverviewIcon, JourneyIcon, ResearchIcon, ChallengeIcon, MentorshipIcon, CreditsIcon, ProofIcon, LogoutIcon } from './StudentIcons';
import { SidebarItem as SidebarItemType } from '../Studenttypes';

const sidebarItems: SidebarItemType[] = [
  { id: 'overview', label: 'OVERVIEW', icon: <OverviewIcon /> },
  { id: 'journey', label: 'LEARNING JOURNEY', icon: <JourneyIcon /> },
  { id: 'research', label: 'RESEARCH PROJECTS', icon: <ResearchIcon /> },
  { id: 'challenges', label: 'CHALLENGES', icon: <ChallengeIcon /> },
  { id: 'mentorship', label: 'MENTORSHIP', icon: <MentorshipIcon /> },
  { id: 'credits', label: 'LEARNING CREDITS', icon: <CreditsIcon /> },
  { id: 'proof', label: 'OUTPUTS & PROOF', icon: <ProofIcon /> },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={`
        fixed md:relative z-50 w-72 bg-[#0a1532] h-screen flex flex-col p-6 text-white shrink-0
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-xl">N</div>
            <h1 className="text-2xl font-bold font-outfit tracking-wider">NX PORTAL</h1>
          </div>
          {/* Close button for mobile */}
          <button onClick={onClose} className="md:hidden p-2 text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose(); // Auto-close on mobile selection
              }}
              className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-white text-[#0a1532]' 
                  : 'text-slate-400 hover:text-white hover:bg-[#14234a]'
              }`}
            >
              <span className={activeTab === item.id ? 'text-[#0a1532]' : 'text-slate-400 group-hover:text-white'}>
                {item.icon}
              </span>
              <span className="font-bold text-xs tracking-widest text-left">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="mt-auto flex items-center gap-4 px-6 py-4 text-orange-400 font-bold text-xs tracking-widest hover:text-orange-300 transition-colors">
          <LogoutIcon />
          LOGOUT
        </button>
      </div>
    </>
  );
};

export default Sidebar;
