
import React, { useState } from 'react';
import { SidebarTab } from '../Companytypes';

interface OverviewViewProps {
  setActiveTab: (tab: SidebarTab) => void;
}

const OverviewView: React.FC<OverviewViewProps> = ({ setActiveTab }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stats = [
    { label: 'Total Projects', value: '12', icon: 'fa-flask', color: 'bg-blue-500', tab: SidebarTab.ACTIVE_PROJECTS },
    { label: 'Completed', value: '08', icon: 'fa-check-circle', color: 'bg-emerald-500', tab: SidebarTab.DELIVERABLES },
    { label: 'Team Members', value: '24', icon: 'fa-users', color: 'bg-orange-500', tab: SidebarTab.OUR_FOUNDERS },
    { label: 'Problems Solved', value: '45', icon: 'fa-lightbulb', color: 'bg-purple-500', tab: SidebarTab.ACTIVE_PROBLEMS },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleActivityClick = (msg: string) => {
    if (msg.includes('deliverable')) setActiveTab(SidebarTab.DELIVERABLES);
    else if (msg.includes('Founder')) setActiveTab(SidebarTab.OUR_FOUNDERS);
    else if (msg.includes('Project')) setActiveTab(SidebarTab.ACTIVE_PROJECTS);
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-3xl font-black text-[#002B5B] tracking-tight uppercase">Dashboard Overview</h2>
           <p className="text-gray-400 text-sm font-medium">Real-time performance metrics and system health.</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all active:scale-90"
        >
          <i className={`fa-solid fa-arrows-rotate ${isRefreshing ? 'fa-spin text-orange-500' : ''}`}></i>
        </button>
      </div>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 transition-all duration-300 ${isRefreshing ? 'opacity-50 scale-95 blur-[2px]' : 'opacity-100 scale-100'}`}>
        {stats.map((stat, i) => (
          <div 
            key={i} 
            onClick={() => setActiveTab(stat.tab)}
            className="bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-5 hover:scale-[1.05] hover:shadow-2xl hover:border-orange-200 transition-all cursor-pointer active:scale-95 group"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white text-xl shadow-lg group-hover:rotate-12 transition-transform`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-[#002B5B] group-hover:text-orange-500 transition-colors">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-[#002B5B] tracking-tight uppercase">Recent Activity</h3>
          <button className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          {[
            { msg: 'New deliverable uploaded for Project X', time: '2 hours ago', icon: 'fa-file-arrow-up' },
            { msg: 'Team meeting scheduled for Monday', time: '5 hours ago', icon: 'fa-calendar-days' },
            { msg: 'Founder profile updated', time: '1 day ago', icon: 'fa-user-pen' }
          ].map((activity, i) => (
            <div 
              key={i} 
              onClick={() => handleActivityClick(activity.msg)}
              className="flex items-center gap-4 p-5 hover:bg-orange-50/50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-orange-100 group active:scale-[0.99]"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                <i className={`fa-solid ${activity.icon} text-sm`}></i>
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-[#002B5B] group-hover:text-orange-600 transition-colors">{activity.msg}</p>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1.5 flex items-center gap-2">
                  <i className="fa-regular fa-clock"></i>
                  {activity.time}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent group-hover:bg-white group-hover:shadow-sm transition-all">
                <i className="fa-solid fa-chevron-right text-gray-300 text-xs group-hover:text-orange-500 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewView;
