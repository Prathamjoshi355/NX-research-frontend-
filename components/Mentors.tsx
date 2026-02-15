
import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  Star, 
  Mail, 
  ChevronRight, 
  X,
  ExternalLink,
  Settings,
  MoreVertical,
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import { Mentor, Student } from '../types';

interface MentorsProps {
  mentors: Mentor[];
  allStudents: Student[];
  onUpdateMentor: (updated: Mentor) => void;
}

const Mentors: React.FC<MentorsProps> = ({ mentors, allStudents, onUpdateMentor }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);

  const filteredMentors = mentors.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMentor = mentors.find(m => m.id === selectedMentorId);
  const mentoredStudents = allStudents.filter(s => selectedMentor?.assignedStudentIds.includes(s.id));

  const handleStatusChange = (id: string, newStatus: Mentor['status']) => {
    const mentor = mentors.find(m => m.id === id);
    if (mentor) {
      onUpdateMentor({ ...mentor, status: newStatus });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-1">MENTOR NETWORK</h2>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">Advisor Registry • Student Allocation Terminal</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Mentors or Specialty..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-gray-100 rounded-[20px] py-4 pl-12 pr-6 text-sm font-semibold w-full md:w-[320px] focus:outline-none focus:ring-2 focus:ring-[#FB8500]/10 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Mentors List */}
        <div className="xl:col-span-2 space-y-4">
          {filteredMentors.map((mentor) => (
            <div 
              key={mentor.id}
              onClick={() => setSelectedMentorId(mentor.id)}
              className={`bg-white border border-gray-50 rounded-[40px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:shadow-xl hover:shadow-[#0A2463]/5 cursor-pointer group ${selectedMentorId === mentor.id ? 'ring-2 ring-[#FB8500]/20 border-[#FB8500]/20 bg-[#F8F9FA]' : ''}`}
            >
              <div className="flex items-center gap-6 flex-1">
                <div className="w-20 h-20 rounded-[28px] bg-[#0A2463] text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-[#0A2463]/20 group-hover:scale-105 transition-transform">
                  {mentor.avatar}
                </div>
                <div>
                  <h4 className="text-2xl font-black text-[#0A2463] uppercase tracking-tight mb-1 group-hover:text-[#FB8500] transition-colors">{mentor.name}</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-[#F8F9FA] border border-gray-100 rounded-lg text-[9px] font-black text-gray-400 uppercase tracking-widest">{mentor.specialty}</span>
                    <div className="flex items-center gap-1 text-[#FFB703]">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] font-black">{mentor.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="text-right">
                  <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Mentees</p>
                  <p className="text-lg font-black text-[#0A2463]">{mentor.assignedStudentIds.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Availability</p>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                    mentor.status === 'Active' ? 'bg-[#D1FAE5] text-[#065F46]' :
                    mentor.status === 'Available' ? 'bg-[#E0F2FE] text-[#0369A1]' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {mentor.status}
                  </span>
                </div>
                <ChevronRight size={24} className="text-gray-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Mentor & Student Detail Panel */}
        <div className="space-y-8">
          {selectedMentor ? (
            <div className="bg-white border border-gray-100 rounded-[56px] p-10 shadow-2xl animate-in slide-in-from-right-10 duration-500 sticky top-10">
              <div className="flex justify-between items-start mb-10">
                <div className="w-20 h-20 rounded-[32px] bg-[#FB8500] text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-[#FB8500]/20">
                  {selectedMentor.avatar}
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#0A2463] transition-colors"><Settings size={20} /></button>
                  <button onClick={() => setSelectedMentorId(null)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-colors"><X size={20} /></button>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight mb-2">{selectedMentor.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                  <Mail size={14} className="text-[#FB8500]" /> {selectedMentor.email}
                </p>
                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                  <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-3">Mentor Bio / Credentials</p>
                  <p className="text-xs font-bold text-[#0A2463] leading-relaxed italic">"{selectedMentor.bio}"</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-[11px] font-black text-[#0A2463] uppercase tracking-widest flex items-center gap-2">
                    <Users size={18} className="text-[#FB8500]" /> Assigned Students ({mentoredStudents.length})
                  </h4>
                  <button className="text-[9px] font-black text-[#FB8500] uppercase tracking-widest hover:underline">Manage All</button>
                </div>

                <div className="space-y-4">
                  {mentoredStudents.length > 0 ? mentoredStudents.map(student => (
                    <div key={student.id} className="bg-[#F8F9FA] border border-gray-100 rounded-[28px] p-5 flex items-center justify-between hover:bg-white hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#0A2463] text-white flex items-center justify-center font-black text-xs">{student.avatar}</div>
                        <div>
                          <p className="text-xs font-black text-[#0A2463] uppercase">{student.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-12 bg-gray-200 h-1 rounded-full overflow-hidden">
                              <div className="bg-[#06A77D] h-full" style={{ width: '65%' }} />
                            </div>
                            <span className="text-[8px] font-black text-gray-400 uppercase">Tracked</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-gray-300 hover:text-[#FB8500] transition-colors"><ExternalLink size={14} /></button>
                    </div>
                  )) : (
                    <div className="text-center py-10 border border-dashed border-gray-100 rounded-3xl">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No students assigned to this mentor.</p>
                    </div>
                  )}
                </div>

                <button className="w-full mt-10 py-5 bg-[#0A2463] text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-[#0A2463]/20 transition-all hover:scale-105 active:scale-95">
                  <GraduationCap size={18} /> Assign New Student
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-100 rounded-[56px] p-12 text-center h-[600px] flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} className="text-gray-200" />
              </div>
              <h4 className="text-lg font-black text-[#0A2463] uppercase mb-2">Mentor Terminal</h4>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-loose max-w-[200px]">Select an advisor to view student assignments and performance metrics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
