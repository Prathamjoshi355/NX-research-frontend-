
import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, Microscope, CheckCircle, MessageSquare, User, LogOut } from 'lucide-react';
import { Card, Button, Input, Badge } from '../components/Common';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F7FAF9]">
      <aside className="w-64 bg-[#1F2D2B] text-white p-8 flex flex-col fixed h-full z-10">
        <div className="mb-12 font-black text-2xl uppercase tracking-tighter">NX Industry</div>
        <nav className="space-y-2 flex-grow">
          {[
            { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
            { id: 'submit', label: 'Submit Problem', Icon: PlusCircle },
            { id: 'active', label: 'Active Projects', Icon: Microscope },
            { id: 'deliverables', label: 'Deliverables', Icon: CheckCircle },
            { id: 'profile', label: 'Company Profile', Icon: User }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center space-x-3 w-full p-4 rounded-xl font-bold text-[10px] uppercase tracking-widest ${activeTab === item.id ? 'bg-[#3FB998]' : 'hover:bg-white/5'}`}>
              <item.Icon size={16} /> <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => navigate('/')} className="mt-auto flex items-center space-x-3 p-4 text-red-400 font-bold text-[10px] uppercase"><LogOut size={16} /> Logout</button>
      </aside>
      <main className="ml-64 flex-grow p-16">
        <h1 className="text-3xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-12">Industry Partner Panel</h1>
        <div className="grid grid-cols-1 gap-8">
          <Card className="p-12 bg-white border-none shadow-sm rounded-[3rem]">
            <h3 className="text-xl font-black text-[#1F2D2B] mb-8 uppercase">Active Research Roadmap</h3>
            <div className="relative border-l-2 border-gray-100 ml-4 space-y-12">
              {[
                { step: 'Requirement Gathering', status: 'Completed' },
                { step: 'Prototype V1 Design', status: 'In Progress' },
                { step: 'Testing & Validation', status: 'Pending' }
              ].map((s, i) => (
                <div key={i} className="relative pl-10">
                  <div className={`absolute -left-[11px] w-5 h-5 rounded-full border-4 border-white ${s.status === 'Completed' ? 'bg-[#3FB998]' : 'bg-gray-200'}`}></div>
                  <h4 className="font-bold mb-1">{s.step}</h4>
                  <p className="text-[10px] font-black uppercase text-gray-400">{s.status}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
