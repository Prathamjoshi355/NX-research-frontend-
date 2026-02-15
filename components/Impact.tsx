
import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Zap, 
  Leaf, 
  Award, 
  ArrowUpRight, 
  Briefcase, 
  Lightbulb, 
  ShieldCheck,
  ChevronRight,
  Target
} from 'lucide-react';

const Impact: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'ECON' | 'SOCIAL' | 'RESEARCH'>('ALL');

  const mainKPIs = [
    { label: 'TOTAL ECOSYSTEM VALUE', value: '₹42.8 Cr', growth: '+12%', color: 'text-[#0A2463]', icon: <TrendingUp size={24} /> },
    { label: 'RESEARCH IPs FILED', value: '184', growth: '+8%', color: 'text-[#FB8500]', icon: <Lightbulb size={24} /> },
    { label: 'PUBLIC UTILITY REACH', value: '1.2M', growth: '+24%', color: 'text-[#06A77D]', icon: <Globe size={24} /> },
    { label: 'TALENT PLACEMENT', value: '85%', growth: '+5%', color: 'text-[#0A2463]', icon: <Users size={24} /> },
  ];

  const milestones = [
    { date: 'JAN 2024', title: 'Urban Waste AI Deployment', desc: 'Optimized waste routes for 3 major municipalities, reducing fuel consumption by 22%.', tag: 'SOCIAL' },
    { date: 'MAR 2024', title: 'Nexus BioLabs Breakthrough', desc: 'Successful synthetic protein synthesis milestone achieved in lab conditions.', tag: 'RESEARCH' },
    { date: 'APR 2024', title: 'Seed Fund Round Alpha', desc: 'Raised ₹15Cr for incubated startups within the NX Ecosystem.', tag: 'ECON' },
  ];

  const categories = [
    { id: 'ALL', label: 'Ecosystem Wide' },
    { id: 'ECON', label: 'Economic Data' },
    { id: 'SOCIAL', label: 'Social Utility' },
    { id: 'RESEARCH', label: 'Intellectual IP' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Strategic Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
        <div>
          <h2 className="text-5xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-2">IMPACT TERMINAL</h2>
          <p className="text-gray-400 text-[11px] font-black tracking-[0.25em] uppercase">Quantifiable Growth Metrics & Global Contributions</p>
        </div>
        
        <div className="flex bg-white border border-gray-100 p-2 rounded-3xl shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeFilter === cat.id 
                  ? 'bg-[#0A2463] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-[#0A2463] hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
        {mainKPIs.map((kpi, idx) => (
          <div key={idx} className="bg-white border border-gray-50 rounded-[56px] p-10 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#0A2463] mb-6 group-hover:scale-110 group-hover:bg-[#0A2463] group-hover:text-white transition-all duration-500">
              {kpi.icon}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 leading-relaxed max-w-[120px]">
              {kpi.label}
            </p>
            <div className="flex flex-col items-center">
              <span className={`text-4xl font-[900] tracking-tighter mb-2 ${kpi.color}`}>
                {kpi.value}
              </span>
              <span className="text-[10px] font-black text-[#06A77D] uppercase tracking-widest flex items-center gap-1">
                <ArrowUpRight size={12} strokeWidth={3} /> {kpi.growth}
              </span>
            </div>
            {/* Subtle decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Strategic Roadmap / Milestones */}
        <div className="xl:col-span-8 space-y-8">
          <div className="bg-white border border-gray-50 rounded-[56px] p-12 shadow-sm">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FB8500]/10 rounded-2xl flex items-center justify-center text-[#FB8500]">
                  <Award size={24} />
                </div>
                <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight">Key Milestones 2024</h3>
              </div>
              <button className="text-[10px] font-black text-[#FB8500] uppercase tracking-[0.2em] border-b-2 border-[#FB8500]/20 hover:border-[#FB8500] transition-all">
                Full Roadmap
              </button>
            </div>

            <div className="space-y-8 relative">
              {/* Timeline Bar */}
              <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-gray-50" />
              
              {milestones.map((ms, idx) => (
                <div key={idx} className="flex gap-10 relative group">
                  <div className="w-14 h-14 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center z-10 shadow-sm group-hover:border-[#FB8500]/30 transition-all">
                    <div className="w-3 h-3 rounded-full bg-[#0A2463]" />
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-[32px] p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-[#0A2463]/5 border border-transparent hover:border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black text-[#FB8500] uppercase tracking-[0.2em]">{ms.date}</span>
                      <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[8px] font-black text-gray-400 uppercase tracking-widest">{ms.tag}</span>
                    </div>
                    <h4 className="text-xl font-black text-[#0A2463] uppercase tracking-tight mb-3">{ms.title}</h4>
                    <p className="text-sm font-bold text-gray-500 leading-relaxed italic">"{ms.desc}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reach & Contribution Metrics */}
        <div className="xl:col-span-4 space-y-10">
          <div className="bg-[#0A2463] rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden group">
            <h3 className="text-2xl font-[900] uppercase tracking-tight mb-8 relative z-10">Systemic Reach</h3>
            <div className="space-y-10 relative z-10">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Economic Penetration</span>
                  <span className="text-sm font-black">74%</span>
                </div>
                <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-1 border border-white/5">
                  <div className="h-full bg-[#FB8500] rounded-full group-hover:scale-x-105 transition-transform origin-left" style={{ width: '74%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Gov Optimization</span>
                  <span className="text-sm font-black">92%</span>
                </div>
                <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-1 border border-white/5">
                  <div className="h-full bg-[#06A77D] rounded-full group-hover:scale-x-105 transition-transform origin-left" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Research Maturity</span>
                  <span className="text-sm font-black">58%</span>
                </div>
                <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-1 border border-white/5">
                  <div className="h-full bg-[#6366F1] rounded-full group-hover:scale-x-105 transition-transform origin-left" style={{ width: '58%' }} />
                </div>
              </div>
            </div>
            
            <button className="w-full mt-12 py-5 bg-white text-[#0A2463] rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">
              Download Impact Report (PDF)
            </button>
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-24 -mt-24" />
          </div>

          <div className="bg-white border border-gray-100 rounded-[56px] p-10 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#06A77D]/10 rounded-2xl flex items-center justify-center text-[#06A77D] mb-6">
              <Leaf size={32} />
            </div>
            <h4 className="text-lg font-[900] text-[#0A2463] uppercase tracking-tight mb-2">Sustainable Impact</h4>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-loose">
              Every initiative contributes to a net-positive environmental footprint across smart cities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
