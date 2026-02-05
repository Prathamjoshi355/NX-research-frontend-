
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/StudentDashboard';
import LearningJourney from '../components/LearningJourney';
import ResearchProjects from '../components/ResearchProjects';
import Challenges from '../components/StudentChallenges';
import Mentorship from '../components/Mentorship';
import LearningCredits from '../components/LearningCredits';
import OutputsAndProof from '../components/OutputsAndProof';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Dashboard onMenuClick={() => setIsSidebarOpen(true)} />;
      case 'journey':
        return <LearningJourney onMenuClick={() => setIsSidebarOpen(true)} />;
      case 'research':
        return <ResearchProjects onMenuClick={() => setIsSidebarOpen(true)} />;
      case 'challenges':
        return <Challenges onMenuClick={() => setIsSidebarOpen(true)} />;
      case 'mentorship':
        return <Mentorship onMenuClick={() => setIsSidebarOpen(true)} />;
      case 'credits':
        return <LearningCredits onMenuClick={() => setIsSidebarOpen(true)} />;
      case 'proof':
        return <OutputsAndProof onMenuClick={() => setIsSidebarOpen(true)} />;
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
            {/* Soft background glow for attractiveness */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 text-center p-10 md:p-16 bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-xl border border-white w-full">
              {/* Mobile Menu Toggle for Placeholder Pages */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden absolute top-8 left-8 p-2.5 bg-slate-50 rounded-xl shadow-sm text-[#0a1532] border border-slate-100 active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-[#0a1532] mb-4 uppercase tracking-tight font-outfit">
                Under Development
              </h2>
              
              <p className="text-sm md:text-lg text-slate-500 mb-10 leading-relaxed px-4">
                The <span className="font-black text-[#0a1532] uppercase">{activeTab.replace('_', ' ')}</span> module is being optimized with AI integrations.
              </p>

              <button 
                onClick={() => setActiveTab('overview')}
                className="w-full sm:w-auto px-10 py-4 bg-[#0a1532] text-white rounded-2xl font-black tracking-[0.2em] text-[10px] md:text-xs hover:bg-[#14234a] hover:shadow-xl hover:shadow-blue-900/10 active:scale-95 transition-all uppercase"
              >
                Return to Overview
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-outfit">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 relative flex flex-col min-w-0 bg-white">
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;
