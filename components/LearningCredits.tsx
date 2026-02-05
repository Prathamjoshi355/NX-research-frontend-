import React from 'react';

interface Reward {
  id: string;
  title: string;
  category: string;
  cost: number;
  availability: string;
  status: 'Available' | 'Locked';
  description: string;
  tags: string[];
}

const rewardData: Reward[] = [
  {
    id: 'r1',
    title: 'H100 GPU Cluster (10 Hours)',
    category: 'Infrastructure',
    cost: 500,
    availability: 'Instant Access',
    status: 'Available',
    description: 'High-performance computing time for training large-scale transformer models or complex simulations.',
    tags: ['NVIDIA', 'Compute', 'HPC']
  },
  {
    id: 'r2',
    title: 'Professional AI Certification',
    category: 'Credentials',
    cost: 1200,
    availability: 'Limited Supply',
    status: 'Available',
    description: 'Industry-recognized certificate verified by our partner research labs. Humne dekha aapne sahi kaam kiya hai.',
    tags: ['Certification', 'Verified', 'Career']
  }
];

interface LearningCreditsProps {
  onMenuClick: () => void;
}

const LearningCredits: React.FC<LearningCreditsProps> = ({ onMenuClick }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/30 p-4 sm:p-6 md:p-12 custom-scrollbar">
      {/* Professional Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-3 bg-white rounded-2xl text-[#0a1532] shadow-sm border border-slate-100 active:scale-95 transition-transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0a1532] font-outfit uppercase tracking-tighter leading-none">Learning Credits</h2>
            <p className="text-slate-400 font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Academic Wallet • 2,450 CR Available
            </p>
          </div>
        </div>
        
        <button className="flex items-center justify-center gap-3 px-8 py-4 bg-[#0a1532] text-white rounded-2xl font-black text-[11px] tracking-widest uppercase hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/10 active:scale-95">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Redeem Rewards
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Balance', val: '2,450' },
          { label: 'Lifetime Earned', val: '4,800' },
          { label: 'Redeemed', val: '2,350' },
          { label: 'Reward Tier', val: 'Gold' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
            <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase mb-2 font-outfit">{stat.label}</span>
            <span className="text-3xl md:text-4xl font-black text-[#0a1532] font-outfit leading-none">{stat.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Rewards List */}
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest font-outfit">Current Redemption Store</h3>
          </div>
          
          {rewardData.map((reward) => (
            <div key={reward.id} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="max-w-[80%]">
                  <h4 className="text-xl md:text-2xl font-black text-[#0a1532] font-outfit leading-tight mb-2 group-hover:text-blue-600 transition-colors">{reward.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full font-outfit">{reward.category}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full font-outfit ${
                      reward.status === 'Locked' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
                    }`}>
                      {reward.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1 font-outfit">Cost</p>
                  <p className="text-2xl font-black text-[#0a1532] font-outfit">{reward.cost} CR</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm text-slate-500 leading-relaxed font-outfit">
                  {reward.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {reward.tags.map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100 font-outfit">{tag}</span>
                ))}
              </div>

              {/* Status/Availability Info */}
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 flex gap-4 items-center">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-[12px] text-[#0a1532] font-semibold leading-relaxed font-outfit">
                    <span className="font-black text-blue-600 uppercase mr-2 text-[10px] tracking-widest font-outfit">Availability:</span>
                    {reward.availability}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Modules */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 font-outfit">Wallet Highlights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-orange-200 transition-colors">
                <span className="text-[12px] font-black text-[#0a1532] font-outfit">Last Earned</span>
                <span className="text-[9px] font-black text-green-600 bg-green-100 px-3 py-1.5 rounded-full uppercase tracking-widest font-outfit">+150 CR</span>
              </div>
              <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
                <span className="text-[12px] font-black text-[#0a1532] font-outfit">History Report</span>
                <span className="text-[9px] font-black text-slate-400 bg-slate-200 px-3 py-1.5 rounded-full uppercase tracking-widest font-outfit">Generated</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0a1532] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] -mr-24 -mt-24"></div>
            <h3 className="text-xl font-black font-outfit uppercase tracking-tight mb-8 relative z-10">Wallet Quick Status</h3>
            <div className="space-y-6 relative z-10">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Redemption Tier</p>
                <p className="text-2xl font-black font-outfit text-orange-400">GOLD STATUS</p>
              </div>
              <p className="text-[12px] text-slate-400 leading-relaxed font-outfit">
                Maintain 2,000+ CR balance to keep premium access to H100 GPU clusters and direct research referrals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCredits;