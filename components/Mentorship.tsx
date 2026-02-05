
import React from 'react';

interface Mentor {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  availability: string;
  rating: number;
  image: string;
}

const mentors: Mentor[] = [
  {
    id: 'm1',
    name: 'Sarah Jenkins',
    role: 'Senior AI Researcher',
    expertise: ['NLP', 'Transformer Architectures', 'PyTorch'],
    availability: 'Available Today',
    rating: 4.9,
    image: 'SJ'
  },
  {
    id: 'm2',
    name: 'Dr. Aris Thorne',
    role: 'Computer Vision Expert',
    expertise: ['CNNs', 'Object Detection', 'TensorFlow'],
    availability: 'Next: Monday',
    rating: 5.0,
    image: 'AT'
  },
  {
    id: 'm3',
    name: 'Elena Rodriguez',
    role: 'Lead ML Engineer',
    expertise: ['RL', 'Robotics', 'Edge AI'],
    availability: 'Available Tomorrow',
    rating: 4.8,
    image: 'ER'
  }
];

interface MentorshipProps {
  onMenuClick: () => void;
}

const Mentorship: React.FC<MentorshipProps> = ({ onMenuClick }) => {
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
            <h2 className="text-3xl md:text-5xl font-black text-[#0a1532] font-outfit uppercase tracking-tighter leading-none">Mentorship Hub</h2>
            <p className="text-slate-400 font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase mt-3 flex items-center gap-2 font-outfit">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Expert Connections • 1 Scheduled Session
            </p>
          </div>
        </div>
        
        <button className="flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-2xl font-black text-[11px] tracking-widest uppercase hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95 font-outfit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
          Book New Session
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Sessions', val: '24' },
          { label: 'Mentors', val: '08' },
          { label: 'Avg Rating', val: '4.9' },
          { label: 'Skills Verified', val: '12' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
            <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase mb-2 font-outfit">{stat.label}</span>
            <span className="text-3xl md:text-4xl font-black text-[#0a1532] font-outfit leading-none">{stat.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Available Mentors List */}
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest font-outfit">Featured Mentors</h3>
          </div>
          
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center text-[#0a1532] font-black text-2xl font-outfit shadow-inner border border-white">
                    {mentor.image}
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-black text-[#0a1532] font-outfit leading-tight mb-1 group-hover:text-blue-600 transition-colors">{mentor.name}</h4>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">{mentor.role}</p>
                    <div className="flex items-center gap-2 mt-2">
                       <div className="flex items-center gap-0.5 text-orange-500">
                         {[...Array(5)].map((_, i) => (
                           <svg key={i} className={`w-3 h-3 ${i < Math.floor(mentor.rating) ? 'fill-current' : 'text-slate-200'}`} viewBox="0 0 20 20">
                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                           </svg>
                         ))}
                       </div>
                       <span className="text-[10px] font-black text-slate-400 tracking-widest">{mentor.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full md:w-auto px-8 py-4 bg-[#0a1532] text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-blue-900 transition-all shadow-lg active:scale-95 font-outfit">
                  Request Connect
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {mentor.expertise.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100 font-outfit">{skill}</span>
                ))}
              </div>

              {/* Status Section */}
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <p className="text-[12px] text-[#0a1532] font-semibold font-outfit">
                    <span className="font-black text-blue-600 uppercase mr-2 text-[10px] tracking-widest font-outfit">Next Slot:</span>
                    {mentor.availability}
                  </p>
                </div>
                <button className="text-slate-400 hover:text-[#0a1532] transition-colors p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Modules - Sessions & Schedule */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 font-outfit">Upcoming Schedule</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-orange-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-black text-[#0a1532] font-outfit">1:1 with Sarah J.</span>
                  <span className="text-[9px] font-black text-orange-600 bg-orange-100 px-3 py-1.5 rounded-full uppercase tracking-widest font-outfit">Today</span>
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase">4:00 PM - 5:00 PM • Google Meet</p>
                <button className="mt-4 w-full py-3 bg-[#0a1532] text-white rounded-xl text-[9px] font-black tracking-widest uppercase hover:bg-blue-900 transition-all font-outfit">
                  Join Call
                </button>
              </div>
              <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors">
                <span className="text-[12px] font-black text-[#0a1532] font-outfit">Career Roadmap Review</span>
                <span className="text-[9px] font-black text-slate-400 bg-slate-200 px-3 py-1.5 rounded-full uppercase tracking-widest font-outfit">Oct 30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
