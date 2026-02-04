
import React, { useState } from 'react';
import { LayoutDashboard, Users, Microscope, MessageSquare, Calendar, User, LogOut, Star } from 'lucide-react';
import { Card, Badge, Button, Input } from '../components/Common';
import { useNavigate } from 'react-router-dom';

const MentorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F7FAF9]">
      <aside className="w-64 bg-[#1F2D2B] text-white p-8 flex flex-col fixed h-full z-10">
        <div className="mb-12 font-black text-2xl uppercase tracking-tighter">NX Mentor</div>
        <nav className="space-y-2 flex-grow">
          {[
            { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
            { id: 'students', label: 'My Students', Icon: Users },
            { id: 'projects', label: 'Research', Icon: Microscope },
            { id: 'feedback', label: 'Reviews', Icon: MessageSquare },
            { id: 'schedule', label: 'Schedule', Icon: Calendar }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center space-x-3 w-full p-4 rounded-xl font-bold text-xs uppercase tracking-widest ${activeTab === item.id ? 'bg-[#3FB998]' : 'hover:bg-white/5'}`}>
              <item.Icon size={18} /> <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button onClick={() => navigate('/')} className="mt-auto flex items-center space-x-3 p-4 text-red-400 font-bold text-xs uppercase"><LogOut size={18} /> Logout</button>
      </aside>
      <main className="ml-64 flex-grow p-16">
        <h1 className="text-3xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-12">Mentor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-white border-none shadow-sm rounded-[2rem]">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Active Mentees</h3>
            <div className="space-y-4">
              {['Aakash Kumar', 'Priya Singh'].map(name => (
                <div key={name} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                  <span className="font-bold">{name}</span>
                  <Button size="sm" variant="outline">Profile</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;
