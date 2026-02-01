
import React, { useState } from 'react';
import { LayoutDashboard, Users, Globe, Briefcase, PlusSquare, UserCheck, LogOut, Filter, Check, X, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, Badge, Button, Input } from '../components/Common';
import { useNavigate } from 'react-router-dom';

type AdminView = 'dashboard' | 'applications' | 'summits' | 'gov' | 'private' | 'programs' | 'users';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [filter, setFilter] = useState('All');

  const stats = [
    { label: 'Total Users', value: '452' },
    { label: 'Applications', value: '128' },
    { label: 'Pending', value: '45' },
    { label: 'Approved', value: '83' }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'users':
        return (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-2xl font-black text-[#0A2463] mb-8 uppercase tracking-tighter">User Management</h2>
            <Card className="p-0 border-none shadow-xl rounded-[40px] bg-white overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <tr>
                    <th className="px-8 py-4">Name</th>
                    <th className="px-8 py-4">Email</th>
                    <th className="px-8 py-4">Role</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Aakash Kumar', email: 'aakash@example.com', role: 'Member' },
                    { name: 'Priya Sharma', email: 'priya@example.com', role: 'Member' },
                    { name: 'Admin One', email: 'admin@nx.res', role: 'Admin' }
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-gray-50/30">
                      <td className="px-8 py-6 font-bold text-[#0A2463] text-sm uppercase">{user.name}</td>
                      <td className="px-8 py-6 text-sm font-semibold text-gray-500">{user.email}</td>
                      <td className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400">{user.role}</td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        );
      case 'summits':
        return (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-[#0A2463] uppercase tracking-tighter">Summit Management</h2>
              <Button size="sm" className="rounded-xl">+ Create Summit</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-8 bg-white border-none shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-black text-[#0A2463] uppercase">Startup Summit 2024</h3>
                  <Badge status="Approved" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Participants: 124</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 rounded-xl">Edit</Button>
                  <Button size="sm" className="flex-1 rounded-xl">Participants</Button>
                </div>
              </Card>
            </div>
          </div>
        );
      default:
        return (
          <div className="animate-in fade-in duration-300">
            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {stats.map(stat => (
                <Card key={stat.label} className="p-8 bg-white border-none shadow-sm">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h4 className="text-3xl font-black text-[#0A2463]">{stat.value}</h4>
                </Card>
              ))}
            </div>

            {/* APPLICATIONS TABLE */}
            <Card className="p-0 border-none shadow-xl rounded-[40px] overflow-hidden bg-white">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-black text-[#0A2463] uppercase tracking-tighter">Recent Applications</h3>
                <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl">
                  <Filter size={14} className="text-gray-400" />
                  <select className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none">
                    <option>All Domains</option>
                    <option>Summit</option>
                  </select>
                </div>
              </div>
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <tr>
                    <th className="px-8 py-4">Name</th>
                    <th className="px-8 py-4">Domain</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Aakash', domain: 'Summit', status: 'Pending' },
                    { name: 'Priya', domain: 'Initiative', status: 'Approved' }
                  ].map((app, i) => (
                    <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-6 font-bold text-[#0A2463] text-sm uppercase">{app.name}</td>
                      <td className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">{app.domain}</td>
                      <td className="px-8 py-6"><Badge status={app.status} /></td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors"><Check size={16} /></button>
                          <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"><X size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1E1E1E] text-white p-8 flex flex-col fixed h-full z-10">
        <div className="flex items-center space-x-2 mb-12">
          <div className="w-8 h-8 bg-[#FB8500] rounded-lg flex items-center justify-center font-black">N</div>
          <span className="font-black text-xl tracking-tighter">NX ADMIN</span>
        </div>
        <nav className="space-y-1 flex-grow">
          {[
            { id: 'dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
            { id: 'summits', icon: <Globe size={18} />, label: 'Summits' },
            { id: 'gov', icon: <PlusSquare size={18} />, label: 'Gov Res' },
            { id: 'private', icon: <Briefcase size={18} />, label: 'Private Res' },
            { id: 'users', icon: <UserCheck size={18} />, label: 'Users' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveView(item.id as AdminView)}
              className={`flex items-center space-x-3 w-full p-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeView === item.id ? 'bg-white/10 text-[#FB8500]' : 'text-white/40 hover:bg-white/5'}`}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => navigate('/')} className="flex items-center space-x-3 w-full p-4 text-red-400 font-bold text-[10px] uppercase tracking-widest mt-auto hover:bg-red-500/10 rounded-xl">
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-grow p-12">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter">
            Admin: {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
          </h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1 tracking-[0.2em]">Management Terminal</p>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;
