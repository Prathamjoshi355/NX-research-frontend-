
import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight, 
  Users, 
  Target, 
  Cpu, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import StatCard from './StatCard';
import ResearchMonitoring from './ResearchMonitoring';

interface DashboardTerminalProps {
  stats: { label: string; value: string | number; color: string; trend: string }[];
  recentActivity: { id: string; type: string; title: string; time: string; status: 'Success' | 'Warning' | 'Info' }[];
  activeProjects: { name: string; health: number; team: string; type: string }[];
}

const DashboardTerminal: React.FC<DashboardTerminalProps> = ({ stats, recentActivity, activeProjects }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Top Tactical Row: Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Intelligence & Projects */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* Active Venture Matrix */}
          <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm overflow-hidden relative group">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FB8500]/10 rounded-2xl flex items-center justify-center text-[#FB8500]">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-[900] text-[#0A2463] uppercase tracking-tight">Active Venture Matrix</h3>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">High-Priority Development Track</p>
                </div>
              </div>
              <button className="bg-gray-50 hover:bg-gray-100 p-3 rounded-2xl transition-all">
                <Plus size={20} className="text-[#0A2463]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeProjects.map((proj, idx) => (
                <div key={idx} className="bg-[#F8F9FA] border border-gray-100 rounded-[32px] p-6 hover:bg-white hover:shadow-xl hover:shadow-[#0A2463]/5 transition-all group/card border-transparent hover:border-gray-200">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-black text-[#FB8500] uppercase tracking-widest px-3 py-1 bg-white rounded-lg shadow-sm">{proj.type}</span>
                    <ArrowUpRight size={20} className="text-gray-200 group-hover/card:text-[#0A2463] transition-colors" />
                  </div>
                  <h4 className="text-xl font-black text-[#0A2463] uppercase tracking-tighter mb-4">{proj.name}</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase">
                      <span>Vitality Index</span>
                      <span className="text-[#06A77D]">{proj.health}%</span>
                    </div>
                    <div className="w-full bg-white h-2 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-[#06A77D] rounded-full transition-all duration-1000" style={{ width: `${proj.health}%` }} />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="w-6 h-6 rounded-full bg-[#0A2463] flex items-center justify-center text-[8px] font-bold text-white uppercase">{proj.team[0]}</div>
                      <span className="text-[9px] font-black text-gray-400 uppercase">Lead: {proj.team}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research & Network Health - Adjusted to take full width of column */}
          <div className="w-full">
            <ResearchMonitoring items={[
              { title: 'Portfolio Health Status', progress: 84 },
              { title: 'Strategic Network Expansion', progress: 62 },
              { title: 'Cross-Domain Synergy Index', progress: 45 }
            ]} />
          </div>
        </div>

        {/* Right Column: Signal Intelligence Feed */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-[900] text-[#0A2463] uppercase tracking-tight">Signal Intelligence</h3>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Live Terminal Events</p>
                </div>
              </div>
              <button className="text-gray-300 hover:text-[#0A2463]">
                <MoreHorizontal size={24} />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto max-h-[600px] pr-2 sidebar-scroll">
              {recentActivity.map((act) => (
                <div key={act.id} className="relative pl-8 pb-8 last:pb-0 group">
                  {/* Timeline Line */}
                  <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-gray-50 group-last:hidden" />
                  {/* Status Dot */}
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-125 ${
                    act.status === 'Success' ? 'bg-[#06A77D]' : 
                    act.status === 'Warning' ? 'bg-[#FB8500]' : 'bg-blue-400'
                  }`} />
                  
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[11px] font-black text-[#0A2463] uppercase tracking-widest">{act.title}</h4>
                      <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{act.time}</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{act.type}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-50">
              <div className="bg-gray-50 rounded-3xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#06A77D] rounded-xl flex items-center justify-center text-white">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#0A2463] uppercase tracking-widest">Platform Status</p>
                    <p className="text-[9px] font-bold text-[#06A77D] uppercase">All Nodes Operational</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-1.5 h-3 bg-[#06A77D] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTerminal;
