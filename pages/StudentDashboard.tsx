
import React, { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Microscope, Trophy, Users, Zap,
  Calendar, User, LogOut, ChevronRight, CheckCircle, Clock
} from 'lucide-react';
import { Card, Badge, Button, Input } from '../components/Common';
import { useNavigate } from 'react-router-dom';

type View = 'overview' | 'learning' | 'projects' | 'challenges' | 'mentorship' | 'credits' | 'outputs';

const StudentDashboard = () => {
  const [activeView, setActiveView] = useState<View>('overview');
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
    { id: 'learning', label: 'Learning Journey', Icon: BookOpen },
    { id: 'projects', label: 'Research Projects', Icon: Microscope },
    { id: 'challenges', label: 'Challenges', Icon: Trophy },
    { id: 'mentorship', label: 'Mentorship', Icon: Users },
    { id: 'credits', label: 'Learning Credits', Icon: Zap },
    { id: 'outputs', label: 'Outputs & Proof', Icon: CheckCircle },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'learning':
        return (
          <div className="space-y-8 animate-in fade-in">
            <h2 className="text-3xl font-black text-[#1F2D2B] uppercase tracking-tighter">My Learning Journey</h2>
            <Card className="p-10 bg-[#1F2D2B] text-white border-none rounded-[3rem]">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Active Track: Applied AI</h3>
                  <p className="text-blue-200/60 font-bold text-xs uppercase tracking-widest">Progress: 65% Complete</p>
                </div>
                <Badge status="Approved" />
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Neural Nets Foundations', status: 'Completed' },
                  { title: 'Data Processing Pipelines', status: 'In Progress' },
                  { title: 'Model Deployment', status: 'Locked' }
                ].map(mod => (
                  <div key={mod.title} className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10">
                    <span className="font-bold">{mod.title}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{mod.status}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      case 'overview':
      default:
        return (
          <div className="space-y-12 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[#3FB998] text-white p-8 border-none rounded-[2.5rem]">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Learning Credits</p>
                <h4 className="text-4xl font-black">1,240</h4>
              </Card>
              <Card className="bg-white p-8 border-none shadow-sm rounded-[2.5rem]">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-gray-400">Active Projects</p>
                <h4 className="text-4xl font-black text-[#1F2D2B]">03</h4>
              </Card>
              <Card className="bg-white p-8 border-none shadow-sm rounded-[2.5rem]">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-gray-400">Next Session</p>
                <h4 className="text-xl font-black text-[#1F2D2B]">Today, 4:00 PM</h4>
              </Card>
            </div>

            <div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <Card className="flex items-center justify-between p-6 bg-white border-none shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-xl text-[#1F2D2B]"><CheckCircle size={20} /></div>
                    <div>
                      <p className="font-black text-[#1F2D2B] text-sm uppercase">Assignment Submitted</p>
                      <p className="text-xs text-gray-400 font-bold uppercase">Urban Waste AI Challenge</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-300 uppercase">2h ago</span>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7FAF9]">
      <aside className="w-72 bg-[#1F2D2B] text-white p-8 flex flex-col fixed h-full z-10 border-r border-white/5">
        <div className="mb-16 flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#3FB998] rounded-xl flex items-center justify-center font-black text-xl">N</div>
          <span className="font-black text-2xl tracking-tighter uppercase">NX Portal</span>
        </div>
        <nav className="space-y-2 flex-grow">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={`flex items-center space-x-4 w-full p-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeView === item.id ? 'bg-white text-[#1F2D2B] shadow-2xl scale-105' : 'text-white/40 hover:bg-white/5'}`}
            >
              <item.Icon size={18} /> <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => navigate('/')} className="mt-auto flex items-center space-x-4 p-5 text-red-400 font-black text-xs uppercase tracking-widest hover:bg-red-500/10 rounded-2xl">
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </aside>

      <main className="ml-72 flex-grow p-16">
        <header className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-4xl font-black text-[#1F2D2B] uppercase tracking-tighter">Student Portal</h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Welcome back, Aakash • Track: AI/ML</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-[#3FB998]"><User size={20} /></div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;
