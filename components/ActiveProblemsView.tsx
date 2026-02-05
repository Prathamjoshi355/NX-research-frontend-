
import React, { useState, useMemo } from 'react';
import { SidebarTab } from '../Companytypes';

interface Problem {
  id: string;
  title: string;
  description: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  author: string;
  authorImage: string;
  time: string;
  timestamp: number;
}

interface ActiveProblemsViewProps {
  setActiveTab: (tab: SidebarTab) => void;
}

const MOCK_PROBLEMS: Problem[] = [
  {
    id: 'p1',
    title: 'Az SQL DB performance issues in production environment',
    description: 'Query latency differs across environments (Dev vs UAT) – same stored procedure, different performance. I’m facing a performance issue where the same stored procedure and identical query logic behave inconsistently when scaled to high traffic loads.',
    votes: 12,
    answers: 0,
    views: 142,
    tags: ['sql', 'azure', 'performance'],
    author: 'Kotha Hemanth',
    authorImage: 'https://i.pravatar.cc/150?u=kotha',
    time: 'asked 1 min ago',
    timestamp: Date.now() - 60000
  },
  {
    id: 'p2',
    title: 'How can I inspect a website from Chrome android via remote debugging?',
    description: 'In Chrome desktop I use cmd+option+c for mac to inspect a website. I want to know the shortcut or a way to do the same in android. I have tried enabling developer options but cannot see the device.',
    votes: 45,
    answers: 2,
    views: 1205,
    tags: ['javascript', 'chrome-devtools', 'android'],
    author: 'Syed Tanvir',
    authorImage: 'https://i.pravatar.cc/150?u=syed',
    time: 'asked 5 mins ago',
    timestamp: Date.now() - 300000
  },
  {
    id: 'p3',
    title: 'Bug for Animating against FocusState of TextField in SwiftUI 5.0',
    description: 'Here is the view, which has an "Sort Button" and "Cancel" Button on trailing edge of an textfield. When it is focused, I want it to animate the button moving in and out with a spring effect.',
    votes: 28,
    answers: 1,
    views: 456,
    tags: ['ios', 'swiftui', 'animation'],
    author: 'ARG 33',
    authorImage: 'https://i.pravatar.cc/150?u=arg',
    time: 'asked 21 mins ago',
    timestamp: Date.now() - 1260000
  },
  {
    id: 'p4',
    title: 'Why for altering tables, to add column we keyed in "ADD *Column name*" but to remove?',
    description: 'For example: ALTER TABLE tbl_student ADD student_email VARCHAR(20); However, when I try to drop a column the syntax seems inconsistent across different engines like PostgreSQL and MySQL.',
    votes: -3,
    answers: 3,
    views: 890,
    tags: ['database', 'mysql', 'sql-syntax'],
    author: 'Maria Garcia',
    authorImage: 'https://i.pravatar.cc/150?u=maria',
    time: 'asked 1 hour ago',
    timestamp: Date.now() - 3600000
  }
];

const TRENDING_TAGS = ['sql', 'react', 'azure', 'swiftui', 'performance', 'security', 'api-design'];

const ActiveProblemsView: React.FC<ActiveProblemsViewProps> = ({ setActiveTab }) => {
  const [filter, setFilter] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProblems = useMemo(() => {
    let result = [...MOCK_PROBLEMS].filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    switch (filter) {
      case 'Active':
        result.sort((a, b) => (b.answers + b.views/100) - (a.answers + a.views/100));
        break;
      case 'Answered':
        result = result.filter(p => p.answers > 0);
        result.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case 'Unanswered':
        result = result.filter(p => p.answers === 0);
        result.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case 'Newest':
      default:
        result.sort((a, b) => b.timestamp - a.timestamp);
        break;
    }

    return result;
  }, [filter, searchQuery]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto overflow-x-hidden relative pb-20 md:pb-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 lg:mb-10">
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase">Active Problems</h2>
          <p className="text-slate-500 font-medium flex items-center gap-2 text-sm sm:text-base">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span>Solving hurdles across the ecosystem</span>
          </p>
        </div>
        <button 
          onClick={() => setActiveTab(SidebarTab.SUBMIT_PROBLEM)}
          className="w-full sm:w-auto bg-[#0074cc] hover:bg-[#0063ad] text-white px-6 sm:px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95"
        >
          <i className="fa-solid fa-plus"></i>
          Ask Problem
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xl shadow-gray-200/50 border border-slate-100 flex flex-col xl:flex-row gap-4">
            <div className="relative flex-1 group">
              <i className={`fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? 'text-blue-500' : 'text-slate-400 group-focus-within:text-blue-500'}`}></i>
              <input 
                type="text"
                placeholder="Search..."
                className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-[10px]"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
            
            <div className="flex gap-2 w-full xl:w-auto overflow-x-auto no-scrollbar pb-1 xl:pb-0">
              <div className="flex flex-nowrap rounded-2xl bg-slate-50 p-1.5 border border-slate-100">
                {['Newest', 'Active', 'Answered', 'Unanswered'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                      filter === t 
                        ? 'bg-white text-[#0074cc] shadow-md shadow-blue-500/5' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredProblems.length > 0 ? filteredProblems.map((problem) => (
              <div 
                key={problem.id} 
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
              >
                <div className="flex flex-col sm:flex-row p-5 sm:p-6 gap-5 sm:gap-6">
                  <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4 sm:w-24 shrink-0 sm:border-r sm:border-slate-50 sm:pr-6">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-black text-slate-900 leading-none">{problem.votes}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">votes</div>
                    </div>
                    
                    <div className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl border w-24 sm:w-full transition-all ${
                      problem.answers > 0 
                        ? 'bg-emerald-50 border-emerald-500/20 text-emerald-600' 
                        : 'bg-slate-50 border-transparent text-slate-400'
                    }`}>
                      <div className="text-lg sm:text-xl font-black leading-none">{problem.answers}</div>
                      <div className="text-[9px] font-bold uppercase tracking-widest mt-1">answers</div>
                    </div>

                    <div className="text-center opacity-40">
                      <div className="text-xs sm:text-sm font-black text-slate-900 leading-none">{problem.views}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">views</div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 
                      onClick={() => setSelectedProblem(problem)}
                      className="text-lg sm:text-xl font-black text-[#0074cc] hover:text-[#005ea3] cursor-pointer mb-3 leading-tight transition-colors"
                    >
                      {problem.title}
                    </h3>
                    <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed line-clamp-2 mb-4 sm:mb-5">
                      {problem.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map(tag => (
                          <button 
                            key={tag} 
                            onClick={() => handleTagClick(tag)}
                            className="px-3 py-1 bg-[#e1ecf4] text-[#39739d] rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-[#d0e3f1] transition-all"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-3 bg-slate-50/80 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors self-start sm:self-auto cursor-pointer">
                        <img src={problem.authorImage} alt={problem.author} className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-sm ring-2 ring-white" />
                        <div className="flex flex-col">
                          <span className="text-[10px] sm:text-[11px] font-black text-[#0074cc]">{problem.author}</span>
                          <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest">{problem.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-white rounded-[2.5rem] p-10 sm:p-20 text-center border-2 border-dashed border-slate-100">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 text-slate-200">
                  <i className="fa-solid fa-magnifying-glass-chart text-2xl sm:text-4xl"></i>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 uppercase">No results</h4>
                <p className="text-slate-500 text-sm sm:text-lg max-w-xs mx-auto font-medium">Try different filters or keywords.</p>
                <button onClick={() => {setSearchQuery(''); setFilter('Newest');}} className="mt-6 sm:mt-8 text-blue-500 font-black uppercase text-[10px] lg:text-xs tracking-widest hover:underline">Clear filters</button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          <div className="bg-[#121212] rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 lg:mb-8 relative z-10">Vitality</h4>
            
            <div className="space-y-6 lg:space-y-8 relative z-10">
              {[
                { label: 'Resolved', value: '1.2M+', icon: 'fa-circle-check', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { label: 'Experts', value: '45.2K', icon: 'fa-user-group', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Live', value: '2.4k', icon: 'fa-bolt', color: 'text-orange-500', bg: 'bg-orange-500/10' },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4 lg:gap-5 hover:translate-x-1 transition-transform cursor-pointer">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.bg} rounded-xl lg:rounded-2xl flex items-center justify-center ${stat.color} border border-white/5`}>
                    <i className={`fa-solid ${stat.icon} text-sm lg:text-base`}></i>
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl font-black tracking-tighter leading-none">{stat.value}</p>
                    <p className="text-[9px] lg:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 shadow-xl p-6 lg:p-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5 lg:mb-6">Trending</h4>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TAGS.map(tag => (
                <button 
                  key={tag} 
                  onClick={() => handleTagClick(tag)}
                  className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg lg:rounded-xl text-[9px] lg:text-[10px] font-black uppercase tracking-widest hover:bg-[#0074cc] hover:text-white transition-all border border-slate-100 active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProblem && (
        <div className="fixed inset-y-0 right-0 left-0 md:left-72 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-4xl rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl flex flex-col max-h-[95vh] md:max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-5 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-3 sm:gap-4">
                    <img src={selectedProblem.authorImage} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ring-2 ring-white shadow-sm" />
                    <div>
                       <p className="text-[10px] sm:text-xs font-black text-[#0074cc] uppercase tracking-widest">{selectedProblem.author}</p>
                       <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tight">{selectedProblem.time}</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => setSelectedProblem(null)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 transition-all"
                 >
                    <i className="fa-solid fa-xmark"></i>
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                 <div className="mb-8 lg:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-5 lg:mb-6">{selectedProblem.title}</h2>
                    <div className="p-6 sm:p-8 bg-slate-50 rounded-[1.5rem] lg:rounded-[2rem] border border-slate-100 text-slate-700 leading-relaxed font-medium text-base lg:text-lg">
                       {selectedProblem.description}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Responses ({selectedProblem.answers})</h4>
                    {selectedProblem.answers > 0 ? (
                      <div className="p-6 sm:p-8 border border-emerald-100 bg-emerald-50/30 rounded-[1.5rem] lg:rounded-[2rem]">
                         <div className="flex items-center gap-3 mb-4">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] sm:text-xs"><i className="fa-solid fa-check"></i></div>
                            <span className="text-[10px] sm:text-xs font-black text-emerald-600 uppercase tracking-widest">Verified Solution</span>
                         </div>
                         <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">Ensure Query Store is enabled. Check parameter sniffing issues. We recommend RECOMPILE hints if performance varies between scale units.</p>
                      </div>
                    ) : (
                      <div className="p-10 lg:p-12 text-center border-2 border-dashed border-slate-100 rounded-[1.5rem] lg:rounded-[2rem]">
                         <i className="fa-solid fa-comments text-slate-100 text-3xl sm:text-4xl mb-4"></i>
                         <p className="text-slate-400 font-black uppercase text-[9px] lg:text-[10px] tracking-widest">No answers yet.</p>
                      </div>
                    )}
                 </div>
              </div>
              <div className="p-5 sm:p-8 bg-white border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                 <input 
                  type="text" 
                  placeholder="Type expert solution..." 
                  className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 font-medium text-sm"
                 />
                 <button className="px-6 py-3.5 sm:px-8 sm:py-4 bg-blue-500 text-white rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-blue-600 shadow-lg active:scale-95 transition-all">
                    Post Answer
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ActiveProblemsView;
