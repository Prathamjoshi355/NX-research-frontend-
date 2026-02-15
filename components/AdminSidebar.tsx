
import React from 'react';
import { 
  Users, 
  UserPlus, 
  BookOpen, 
  Globe, 
  Briefcase, 
  Trophy, 
  ShieldCheck, 
  Rocket, 
  Calendar,
  LayoutGrid,
  PieChart,
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab }) => {
  const sections = [
    {
      title: 'CORE',
      items: [
        { id: 'dashboard', label: 'DASHBOARD', icon: <LayoutGrid size={20} /> },
        { id: 'users', label: 'USERS & ROLES', icon: <Users size={20} /> },
        { id: 'onboarding', label: 'ONBOARDING', icon: <UserPlus size={20} /> },
      ]
    },
    {
      title: 'SYSTEMS',
      items: [
        { id: 'learning', label: 'LEARNING SYSTEM', icon: <BookOpen size={20} /> },
        { id: 'gov', label: 'GOV RESEARCH', icon: <Globe size={20} /> },
        { id: 'industry', label: 'INDUSTRY RESEARCH', icon: <Briefcase size={20} /> },
        { id: 'challenges', label: 'CHALLENGES', icon: <Trophy size={20} /> },
      ]
    },
    {
      title: 'COMMUNITY',
      items: [
        { id: 'mentors', label: 'MENTORS', icon: <ShieldCheck size={20} /> },
        { id: 'startups', label: 'STARTUPS', icon: <Rocket size={20} /> },
        { id: 'events', label: 'EVENTS', icon: <Calendar size={20} /> },
      ]
    },
    {
      title: 'PLATFORM',
      items: [
        { id: 'impact', label: 'IMPACT', icon: <PieChart size={20} /> },
        { id: 'settings', label: 'SETTINGS', icon: <Settings size={20} /> },
      ]
    }
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0A2463] text-white transition-transform duration-300 ease-in-out transform
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0 border-r border-white/10 flex flex-col
    `}>
      {/* Fixed Header */}
      <div className="p-8 pb-4 shrink-0">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-[#FB8500] rounded-xl flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-[#FB8500]/20">
            N
          </div>
          <span className="text-xl font-extrabold tracking-tight">NX ADMIN</span>
        </div>
      </div>

      {/* Scrollable Navigation Body */}
      <nav className="flex-1 overflow-y-auto px-8 pb-6 sidebar-scroll">
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[10px] font-black text-white/40 tracking-[0.2em] mb-8 uppercase">
                {section.title}
              </h3>
              <ul className="space-y-5">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`
                        flex items-center gap-4 w-full px-1 py-1 rounded-xl font-bold text-[13px] tracking-tight transition-all group
                        ${activeTab === item.id 
                          ? 'text-white' 
                          : 'text-white/60 hover:text-white'
                        }
                      `}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${
                        activeTab === item.id 
                        ? 'bg-[#FB8500] text-white shadow-md shadow-[#FB8500]/20' 
                        : 'bg-white/5 group-hover:bg-white/10'
                      }`}>
                        {item.icon}
                      </div>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-8 pt-4 border-t border-white/5 shrink-0">
        <button 
          className="flex items-center gap-4 w-full px-1 py-1 font-bold text-[13px] tracking-tight text-[#D62828] hover:opacity-80 transition-opacity uppercase group"
          onClick={() => console.log('Exiting console...')}
        >
          <div className="p-2 rounded-lg bg-[#D62828]/10">
            <LogOut size={20} />
          </div>
          EXIT CONSOLE
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
