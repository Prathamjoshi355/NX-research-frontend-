
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, User, LogOut, Save } from 'lucide-react';
import { Card, Badge, Button, Input } from '../components/Common';

type DashboardView = 'home' | 'applications' | 'apply' | 'profile';

const Dashboard = () => {
  const [activeView, setActiveView] = useState<DashboardView>('home');
  const navigate = useNavigate();

  const applications = [
    { domain: 'Summit', date: '10 Feb 2024', status: 'Pending' },
    { domain: 'Student Initiative', date: '12 Feb 2024', status: 'Approved' }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'applications':
        return (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-2xl font-black text-[#1F2D2B] mb-8 uppercase tracking-tighter">My Applications</h2>
            <Card className="p-0 border-none shadow-xl rounded-[40px] overflow-hidden bg-white">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <tr>
                    <th className="px-8 py-4">Domain</th>
                    <th className="px-8 py-4">Submitted Date</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {applications.map((app, i) => (
                    <tr key={i} className="hover:bg-gray-50/30">
                      <td className="px-8 py-6 font-bold text-[#1F2D2B] text-sm uppercase">{app.domain}</td>
                      <td className="px-8 py-6 text-sm font-semibold text-gray-500">{app.date}</td>
                      <td className="px-8 py-6"><Badge status={app.status} /></td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-[#3FB998] font-bold text-[10px] uppercase tracking-widest hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        );
      case 'apply':
        return (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-2xl font-black text-[#1F2D2B] mb-8 uppercase tracking-tighter">Apply New</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Summit', 'Gov Research', 'Private Research', 'Student Initiative', 'Empowerment'].map(dom => (
                <Card key={dom} className="p-8 bg-white text-center">
                  <h3 className="font-black text-[#1F2D2B] uppercase text-sm mb-6">{dom}</h3>
                  <Link to={`/${dom.toLowerCase().replace(' ', '-')}`}>
                    <Button fullWidth variant="outline" size="sm" className="rounded-xl">Start Application</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="animate-in fade-in duration-300 max-w-2xl">
            <h2 className="text-2xl font-black text-[#1F2D2B] mb-8 uppercase tracking-tighter">My Profile</h2>
            <Card className="p-10 bg-white">
              <form className="space-y-6">
                <Input label="Name" defaultValue="Aakash Kumar" />
                <Input label="Email" defaultValue="aakash@example.com" disabled />
                <Input label="Phone" defaultValue="+91 9876543210" />
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">Security</h4>
                  <Input label="Change Password" type="password" placeholder="New Password" />
                </div>
                <Button className="rounded-xl space-x-2">
                  <Save size={18} />
                  <span>Save Changes</span>
                </Button>
              </form>
            </Card>
          </div>
        );
      default:
        return (
          <div className="animate-in fade-in duration-300">
            {/* QUICK APPLY CARDS */}
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
              {['Summit', 'Gov Research', 'Private Research', 'Initiative', 'Empowerment'].map(dom => (
                <Card key={dom} className="p-6 bg-white border-none shadow-sm flex flex-col items-center hover:scale-105 transition-transform cursor-pointer" onClick={() => setActiveView('apply')}>
                  <h4 className="text-[9px] font-black uppercase text-gray-400 mb-4 text-center leading-tight">{dom}</h4>
                  <div className="bg-[#1F2D2B] text-white p-2 rounded-lg"><PlusCircle size={16} /></div>
                </Card>
              ))}
            </div>

            {/* APPLICATIONS SUMMARY */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Recent Applications</h2>
              <button onClick={() => setActiveView('applications')} className="text-[10px] font-black uppercase text-[#3FB998] tracking-widest hover:underline">View All</button>
            </div>
            <Card className="p-0 border-none shadow-xl rounded-[40px] overflow-hidden bg-white">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <tr>
                    <th className="px-8 py-4">Domain</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {applications.map((app, i) => (
                    <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-6 font-bold text-[#1F2D2B] text-sm uppercase">{app.domain}</td>
                      <td className="px-8 py-6 text-sm font-semibold text-gray-500">{app.date}</td>
                      <td className="px-8 py-6"><Badge status={app.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        );
    }
  };

  const navItems = [
    { id: 'home', Icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'applications', Icon: FileText, label: 'My Applications' },
    { id: 'apply', Icon: PlusCircle, label: 'Apply New' },
    { id: 'profile', Icon: User, label: 'Profile' }
  ];

  return (
    <div className="flex min-h-screen bg-[#F7FAF9]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1F2D2B] text-white p-8 flex flex-col fixed h-full z-10">
        <div className="flex items-center space-x-2 mb-12">
          <div className="w-8 h-8 bg-[#3FB998] rounded-lg flex items-center justify-center font-black">N</div>
          <span className="font-black text-xl tracking-tighter">NX DASH</span>
        </div>
        <nav className="space-y-2 flex-grow">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as DashboardView)}
              className={`flex items-center space-x-3 w-full p-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeView === item.id ? 'bg-white text-[#1F2D2B] shadow-lg' : 'hover:bg-white/5 text-white/60'}`}
            >
              <item.Icon size={18} /> <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => navigate('/')} className="flex items-center space-x-3 w-full p-4 text-red-400 font-bold text-xs uppercase tracking-widest hover:bg-red-500/10 rounded-xl transition-colors mt-auto">
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-grow p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-[#1F2D2B] uppercase tracking-tighter">
              {activeView === 'home' ? 'Welcome, Aakash' : activeView.replace('-', ' ')}
            </h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
              Member Portal • {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[#1F2D2B]"><User size={16} /></div>
            <span className="font-black text-[#1F2D2B] text-xs uppercase tracking-widest">ID: 8921</span>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
