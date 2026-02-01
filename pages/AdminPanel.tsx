
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, Globe, Briefcase, Trophy, 
  Settings, LogOut, CheckCircle, Clock, Plus, Filter, UserCheck, 
  Mail, ShieldCheck, PieChart, FileText, Bell, Lock
} from 'lucide-react';
import { Card, Badge, Button, Input } from '../components/Common';
import { useNavigate } from 'react-router-dom';

type AdminView = 'master' | 'users' | 'learning' | 'govt' | 'industry' | 'challenges' | 'mentors' | 'startups' | 'events' | 'onboarding' | 'outcomes' | 'settings';

const AdminPanel = () => {
  const [activeView, setActiveView] = useState<AdminView>('master');
  const navigate = useNavigate();

  const navGroups = [
    { label: 'Core', items: [
      { id: 'master', label: 'Dashboard', Icon: LayoutDashboard },
      { id: 'users', label: 'Users & Roles', Icon: Users },
      { id: 'onboarding', label: 'Onboarding', Icon: UserCheck }
    ]},
    { label: 'Systems', items: [
      { id: 'learning', label: 'Learning System', Icon: BookOpen },
      { id: 'govt', label: 'Gov Research', Icon: Globe },
      { id: 'industry', label: 'Industry Research', Icon: Briefcase },
      { id: 'challenges', label: 'Challenges', Icon: Trophy }
    ]},
    { label: 'Community', items: [
      { id: 'mentors', label: 'Mentors', Icon: ShieldCheck },
      { id: 'startups', label: 'Startups', Icon: Rocket },
      { id: 'events', label: 'Events', Icon: Calendar }
    ]},
    { label: 'Platform', items: [
      { id: 'outcomes', label: 'Impact', Icon: PieChart },
      { id: 'settings', label: 'Settings', Icon: Settings }
    ]}
  ];

  const renderContent = () => {
    switch(activeView) {
      case 'users':
        return (
          <div className="space-y-8 animate-in slide-in-from-right">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black text-[#0A2463] uppercase tracking-tighter">User Management</h2>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline">Export CSV</Button>
                <Button size="sm"><Plus size={16} /> Invite User</Button>
              </div>
            </div>
            <Card className="p-0 border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
              <div className="p-8 border-b border-gray-50 flex space-x-4">
                <Input label="" placeholder="Search users..." className="mb-0 flex-grow" />
                <div className="flex items-center bg-gray-50 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <Filter size={14}/> Filter
                </div>
              </div>
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <tr>
                    <th className="px-10 py-5">User</th>
                    <th className="px-10 py-5">Role</th>
                    <th className="px-10 py-5">Status</th>
                    <th className="px-10 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Aakash Kumar', email: 'aakash@nx.com', role: 'Student', status: 'Approved' },
                    { name: 'Dr. Sarah', email: 'sarah@nx.com', role: 'Mentor', status: 'Pending' }
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-gray-50/20 transition-colors">
                      <td className="px-10 py-8">
                        <p className="font-black text-[#0A2463] uppercase text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400 font-bold">{user.email}</p>
                      </td>
                      <td className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-gray-400">{user.role}</td>
                      <td className="px-10 py-8"><Badge status={user.status} /></td>
                      <td className="px-10 py-8 text-right">
                        <button className="text-[10px] font-black uppercase text-[#FB8500] tracking-widest hover:underline">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        );
      case 'master':
      default:
        return (
          <div className="space-y-12 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Active Students', val: '1,280', color: '#0A2463' },
                { label: 'Open Research', val: '32', color: '#FB8500' },
                { label: 'Pending Apps', val: '45', color: '#FFB703' },
                { label: 'Monthly Growth', val: '+12%', color: '#06A77D' }
              ].map(stat => (
                <Card key={stat.label} className="p-8 border-none shadow-sm rounded-[2.5rem] bg-white">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{stat.label}</p>
                  <h4 className="text-4xl font-black" style={{ color: stat.color }}>{stat.val}</h4>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <Card className="p-10 border-none shadow-xl rounded-[3rem] bg-white">
                <h3 className="font-black text-[#0A2463] uppercase text-sm mb-8 tracking-tighter">Research Monitoring</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Urban Waste AI', type: 'Gov', status: '75%' },
                    { name: 'Solar Grid Opt.', type: 'Industry', status: '40%' }
                  ].map(proj => (
                    <div key={proj.name} className="flex items-center space-x-6">
                      <div className="flex-grow">
                        <div className="flex justify-between mb-2">
                          <span className="font-bold text-sm">{proj.name}</span>
                          <span className="text-xs font-black opacity-40">{proj.status}</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#FB8500] h-full" style={{ width: proj.status }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-10 border-none shadow-xl rounded-[3rem] bg-[#1E1E1E] text-white">
                <h3 className="font-black uppercase text-sm mb-8 tracking-tighter">System Logs</h3>
                <div className="space-y-4 font-mono text-[10px] opacity-60">
                  <p> User [ID: 892] registered track: AI_ML</p>
                  <p> Admin [ID: 001] approved 5 student_apps</p>
                  <p> New research_call added: Transport_Dept</p>
                </div>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <aside className="w-72 bg-[#1E1E1E] text-white p-8 flex flex-col fixed h-full z-10 overflow-y-auto">
        <div className="mb-12 flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#FB8500] rounded-lg flex items-center justify-center font-black">N</div>
          <span className="font-black text-xl tracking-tighter uppercase">NX Admin</span>
        </div>
        <div className="space-y-10 flex-grow">
          {navGroups.map(group => (
            <div key={group.label}>
              <h5 className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] mb-4 pl-4">{group.label}</h5>
              <div className="space-y-1">
                {group.items.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveView(item.id as AdminView)}
                    className={`flex items-center space-x-4 w-full p-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeView === item.id ? 'bg-[#FB8500] text-white' : 'text-white/40 hover:bg-white/5'}`}
                  >
                    <item.Icon size={14} /> <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/')} className="mt-12 flex items-center space-x-4 p-4 text-red-400 font-black text-[10px] uppercase tracking-widest hover:bg-red-500/10 rounded-xl">
          <LogOut size={14} /> <span>Exit Console</span>
        </button>
      </aside>

      <main className="ml-72 flex-grow p-16">
        <header className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter">Master Terminal</h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-2 tracking-[0.2em]">NX Organization Admin Panel</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#0A2463] transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

import { Calendar, Rocket } from 'lucide-react';
export default AdminPanel;
