
import React, { useState } from 'react';
import { 
  BookOpen, 
  User, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  ChevronRight, 
  Search,
  X,
  Filter,
  ArrowUpRight,
  ClipboardList,
  Target,
  Link2,
  Users,
  Settings,
  MoreVertical,
  Briefcase,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { Student, Course } from '../types';

interface LearningSystemProps {
  students: Student[];
  onUpdateStudent: (updatedStudent: Student) => void;
  // Fixed: Added missing props passed from App.tsx
  onAddStudent: (newStudent: Student) => void;
  onDeleteStudent: (id: string) => void;
}

const LearningSystem: React.FC<LearningSystemProps> = ({ 
  students, 
  onUpdateStudent,
  onAddStudent,
  onDeleteStudent
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'curriculum' | 'assessment'>('assessment');
  const [showDirectory, setShowDirectory] = useState(false);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handleStatusChange = (courseId: string, newStatus: Course['status']) => {
    const updatedCourses = selectedStudent.courses.map(c => 
      c.id === courseId ? { ...c, status: newStatus } : c
    );
    onUpdateStudent({ ...selectedStudent, courses: updatedCourses });
  };

  const handleUpdateProgress = (courseId: string, newProgress: number) => {
    const updatedCourses = selectedStudent.courses.map(c => 
      c.id === courseId ? { ...c, progress: Math.min(100, Math.max(0, newProgress)) } : c
    );
    onUpdateStudent({ ...selectedStudent, courses: updatedCourses });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Admin Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-1">Administrative Terminal</h2>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">Student Data Repository & Curriculum Management</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Student Directory..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowDirectory(true)}
              className="bg-white/80 border border-gray-100 rounded-[20px] py-4 pl-12 pr-6 text-sm font-semibold w-full md:w-[280px] focus:outline-none focus:ring-2 focus:ring-[#FB8500]/10 shadow-sm"
            />
            {showDirectory && filteredStudents.length > 0 && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDirectory(false)} />
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="max-h-64 overflow-y-auto sidebar-scroll">
                    {filteredStudents.map(s => (
                      <button 
                        key={s.id}
                        onClick={() => {
                          setSelectedStudentId(s.id);
                          setShowDirectory(false);
                        }}
                        className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors ${selectedStudentId === s.id ? 'bg-[#FB8500]/5' : ''}`}
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-8 h-8 rounded-lg bg-[#0A2463] text-white flex items-center justify-center text-[10px] font-black">{s.avatar}</div>
                          <div>
                            <p className="text-xs font-black text-[#0A2463] uppercase tracking-tight">{s.name}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">{s.id}</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-gray-300" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <button className="bg-white border border-gray-100 text-[#0A2463] px-6 h-14 rounded-[20px] flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-[0.1em] hover:bg-gray-50 transition-all shadow-sm">
            <Filter size={16} /> Directory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Profile Control Panel */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-white border border-gray-50 rounded-[40px] p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-[32px] bg-[#0A2463] flex items-center justify-center text-3xl font-black text-white mb-6 shadow-xl shadow-[#0A2463]/20 relative">
                {selectedStudent.avatar}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#06A77D] border-4 border-white rounded-full shadow-sm" />
              </div>
              <h3 className="text-2xl font-black text-[#0A2463] uppercase tracking-tight">{selectedStudent.name}</h3>
              <p className="text-sm font-bold text-gray-400 mb-6 truncate w-full">{selectedStudent.email}</p>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-gray-50 rounded-3xl p-4 text-left border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Student ID</p>
                  <p className="text-sm font-black text-[#0A2463]">{selectedStudent.id}</p>
                </div>
                <div className="bg-gray-50 rounded-3xl p-4 text-left border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Last Sync</p>
                  <p className="text-sm font-black text-[#0A2463] truncate">{selectedStudent.loginTime}</p>
                </div>
              </div>

              <div className="mt-8 w-full space-y-3">
                <button 
                  onClick={() => setViewMode('assessment')}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'assessment' ? 'bg-[#0A2463] text-white shadow-lg shadow-[#0A2463]/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  <ClipboardList size={16} /> Raw Assessment Data
                </button>
                <button 
                  onClick={() => setViewMode('curriculum')}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'curriculum' ? 'bg-[#0A2463] text-white shadow-lg shadow-[#0A2463]/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  <BookOpen size={16} /> Manage Curriculum
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#0A2463] rounded-[40px] p-8 text-white shadow-xl shadow-[#0A2463]/20 relative overflow-hidden">
            <h4 className="text-xl font-black uppercase tracking-tight mb-4 relative z-10">Admin Actions</h4>
            <div className="space-y-4 relative z-10">
              <button 
                onClick={() => setActiveChat(`System Alert: ${selectedStudent.name}`)}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
              >
                <MessageSquare size={16} /> Push Notification
              </button>
              <button className="w-full bg-[#FB8500] hover:bg-[#e67a00] text-white rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-[#FB8500]/20 transition-all">
                <Settings size={16} /> Access Privileges
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          </div>
        </div>

        {/* Detailed Management View */}
        <div className="xl:col-span-8 space-y-8">
          {viewMode === 'assessment' ? (
            <div className="bg-white border border-gray-50 rounded-[40px] p-8 md:p-12 shadow-sm animate-in fade-in duration-300">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center text-[#6366F1]">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0A2463] uppercase tracking-tight">Student Assessment Profile</h3>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Data from Initial Enrollment Submission</p>
                </div>
              </div>

              {selectedStudent.applicationData ? (
                <div className="space-y-10">
                  {/* Basic Details Mapping */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2"><User size={12} /> Contact</p>
                      <p className="text-sm font-black text-[#0A2463]">{selectedStudent.applicationData.mobile}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2"><GraduationCap size={12} /> Level</p>
                      <p className="text-sm font-black text-[#0A2463] uppercase">{selectedStudent.applicationData.educationLevel}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2"><Briefcase size={12} /> Institution</p>
                      <p className="text-sm font-black text-[#0A2463] uppercase truncate">{selectedStudent.applicationData.institution}</p>
                    </div>
                  </div>

                  {/* Skills & Goals Mapping */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#0A2463] rounded-[32px] p-8 text-white shadow-xl">
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-lg font-black uppercase tracking-tight">Current Skill Level</h4>
                        <span className="bg-[#FB8500] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                          {selectedStudent.applicationData.skillLevel}
                        </span>
                      </div>
                      <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-3">Project History</p>
                      <p className="text-xs font-bold leading-relaxed text-white/80 italic">
                        "{selectedStudent.applicationData.pastProjects || 'No project data provided.'}"
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100">
                      <h4 className="text-lg font-black text-[#0A2463] uppercase tracking-tight mb-6">Strategic Goals</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedStudent.applicationData.goals.map(goal => (
                          <span key={goal} className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-[9px] font-black text-[#0A2463] uppercase tracking-widest">{goal}</span>
                        ))}
                      </div>
                      <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-2">Primary Objective</p>
                      <p className="text-sm font-bold text-[#0A2463] leading-relaxed">
                        "{selectedStudent.applicationData.mainGoal}"
                      </p>
                    </div>
                  </div>

                  {/* Logistics Table */}
                  <div className="bg-[#F8F9FA] rounded-[32px] p-8 border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                       <div><p className="text-[8px] font-black text-gray-300 uppercase mb-1">Preferred Mode</p><p className="text-xs font-black text-[#0A2463] uppercase">{selectedStudent.applicationData.learningMode}</p></div>
                       <div><p className="text-[8px] font-black text-gray-300 uppercase mb-1">Intensity</p><p className="text-xs font-black text-[#0A2463] uppercase">{selectedStudent.applicationData.intensity}</p></div>
                       <div><p className="text-[8px] font-black text-gray-300 uppercase mb-1">Availability</p><p className="text-xs font-black text-[#0A2463] uppercase">{selectedStudent.applicationData.availability}</p></div>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#FB8500] shadow-sm"><Link2 size={18} /></div>
                         <p className="text-[9px] font-black text-[#FB8500] uppercase tracking-widest truncate cursor-pointer hover:underline">View Portfolio</p>
                       </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Student has not submitted assessment data.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-gray-50 rounded-[40px] p-8 md:p-10 shadow-sm animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black text-[#0A2463] uppercase tracking-tight">Curriculum Tracking</h3>
                <span className="px-3 py-1 bg-[#F8F9FA] rounded-full text-[10px] font-black text-gray-400 border border-gray-100 uppercase">
                  {selectedStudent.courses.length} Assigned Modules
                </span>
              </div>

              <div className="space-y-6">
                {selectedStudent.courses.map((course) => (
                  <div key={course.id} className="group bg-gray-50/50 border border-gray-100 rounded-[32px] p-8 hover:bg-white hover:shadow-xl hover:shadow-[#0A2463]/5 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <select 
                            value={course.status}
                            onChange={(e) => handleStatusChange(course.id, e.target.value as Course['status'])}
                            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider appearance-none cursor-pointer focus:outline-none ${
                              course.status === 'Completed' ? 'bg-[#D1FAE5] text-[#065F46]' :
                              course.status === 'In Progress' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#E0F2FE] text-[#0369A1]'
                            }`}
                          >
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Upcoming">Upcoming</option>
                          </select>
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">REF: {course.id}</span>
                        </div>
                        <h4 className="text-2xl font-black text-[#0A2463] uppercase tracking-tight mb-4">{course.name}</h4>
                        <div className="flex flex-wrap gap-6 text-gray-500">
                          <div className="flex items-center gap-2"><User size={14} /><span className="text-[11px] font-bold uppercase">{course.mentor}</span></div>
                          <div className="flex items-center gap-2"><Clock size={14} /><span className="text-[11px] font-bold uppercase">{course.schedule}</span></div>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-3 min-w-[200px]">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase mb-2">
                          <span>Progress:</span>
                          <input 
                            type="number" 
                            className="w-12 bg-white border border-gray-100 rounded-md px-1 text-center font-black text-[#FB8500]"
                            value={course.progress}
                            onChange={(e) => handleUpdateProgress(course.id, parseInt(e.target.value) || 0)}
                          />%
                        </div>
                        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${course.status === 'Completed' ? 'bg-[#06A77D]' : 'bg-[#FB8500]'}`} 
                            style={{ width: `${course.progress}%` }} 
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-2 text-gray-300 hover:text-[#0A2463] cursor-pointer">
                        <MoreVertical size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-10 py-6 border-2 border-dashed border-gray-100 rounded-[32px] flex items-center justify-center gap-3 text-gray-400 hover:text-[#FB8500] hover:border-[#FB8500]/30 transition-all font-black text-xs uppercase tracking-widest group">
                <Sparkles size={20} className="group-hover:scale-110 transition-transform" />
                Assign New Module to Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Admin Chat Overlay */}
      {activeChat && (
        <div className="fixed bottom-10 right-10 z-[100] w-[400px] bg-white rounded-[40px] shadow-2xl border border-gray-100 animate-in slide-in-from-right-10 duration-300 overflow-hidden">
          <div className="bg-[#0A2463] p-8 flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FB8500] flex items-center justify-center font-black text-xl">S</div>
              <div><p className="text-sm font-black uppercase tracking-widest">SYSTEM TRANSMISSION</p><p className="text-[10px] text-white/40 font-bold uppercase">To: {selectedStudent.name}</p></div>
            </div>
            <button onClick={() => setActiveChat(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
          </div>
          <div className="h-64 p-8 overflow-y-auto space-y-4 bg-gray-50/50 sidebar-scroll">
            <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-bl-none text-xs font-bold text-[#0A2463] shadow-sm leading-relaxed italic">
              "Administrator initialized contact. Awaiting input..."
            </div>
          </div>
          <div className="p-8 border-t border-gray-100">
            <div className="relative group">
              <input type="text" placeholder="Type administrative command..." className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-5 px-8 pr-16 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FB8500]/10 transition-all" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0A2463] text-white rounded-xl flex items-center justify-center hover:bg-[#FB8500] transition-colors shadow-lg"><ArrowUpRight size={20} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningSystem;
