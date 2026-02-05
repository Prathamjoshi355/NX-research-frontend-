
import React from 'react';
import { SidebarTab } from '../Companytypes';

interface SidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: SidebarTab.OVERVIEW, icon: 'fa-table-cells-large' },
    { id: SidebarTab.SUBMIT_PROBLEM, icon: 'fa-circle-plus' },
    { id: SidebarTab.ACTIVE_PROBLEMS, icon: 'fa-circle-question' },
    { id: SidebarTab.ACTIVE_PROJECTS, icon: 'fa-flask' },
    { id: SidebarTab.DELIVERABLES, icon: 'fa-check-double' },
    { id: SidebarTab.COMPANY_PROFILE, icon: 'fa-user' },
    { id: SidebarTab.OUR_FOUNDERS, icon: 'fa-users-gear' },
    { id: SidebarTab.CHAT_AND_GROUP, icon: 'fa-comments' },
  ];

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70] animate-in fade-in duration-300"
          onClick={() => setIsOpen?.(false)}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 w-72 bg-[#121212] text-white flex flex-col h-screen shrink-0 transition-transform duration-300 z-[80]
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter text-white">NX INDUSTRY</h1>
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsOpen?.(false)}
            className="md:hidden w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar no-scrollbar">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen?.(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <i className={`fa-solid ${item.icon} w-6 text-sm ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}></i>
                  <span className="text-xs font-bold tracking-widest uppercase">{item.id}</span>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-8">
          <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors uppercase text-xs font-bold tracking-widest">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            LOGOUT
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
