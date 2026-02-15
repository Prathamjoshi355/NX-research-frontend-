
import React, { useState } from 'react';
import { User, BookOpen, BarChart3, Target, Truck, ArrowRight, CheckCircle, GraduationCap } from 'lucide-react';
import { StudentApplication } from '../types';

const EnrollmentForm: React.FC<{ onSubmitSuccess: (data: StudentApplication) => void }> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<StudentApplication>({
    fullName: '',
    email: '',
    mobile: '',
    institution: '',
    educationLevel: 'B.Tech',
    courseCategory: '',
    skillLevel: 'Beginner',
    pastProjects: '',
    goals: [],
    mainGoal: '',
    intensity: '',
    availability: '2-4 hrs',
    learningMode: '',
    resumeLink: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const goalOptions = [
    'Skill building', 'College projects', 'Internship/job preparation', 
    'Research work', 'Startup/product idea', 'Exam support'
  ];

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal) 
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess(formData);
      setSubmitted(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center text-center p-10 bg-white border border-gray-100 rounded-[56px] animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[#6366F1]/10 rounded-full flex items-center justify-center mb-8">
          <CheckCircle size={48} className="text-[#6366F1] animate-bounce" />
        </div>
        <h2 className="text-3xl font-[900] text-[#0A2463] uppercase tracking-tight mb-4">Application Received</h2>
        <p className="text-gray-400 font-bold max-w-md mx-auto uppercase text-xs tracking-widest leading-loose">
          Our mentors are analyzing your profile. Your personalized learning path will be generated in the Learning System terminal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-20 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-4">Apply for Personalized Learning Path</h2>
        <p className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-[0.2em]">Submit your details and our mentors will analyze your skills.</p>
      </div>

      {/* Section 1: Basic Details */}
      <div className="bg-white border border-gray-50 rounded-[40px] p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
            <User size={20} />
          </div>
          <h3 className="text-xl font-black text-[#0A2463] uppercase tracking-tight">Basic Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <input required type="text" placeholder="John Doe" className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-100 focus:outline-none" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <input required type="email" placeholder="john@example.com" className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-100 focus:outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
            <input required type="text" placeholder="+91 00000 00000" className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-100 focus:outline-none" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City / College / Institution</label>
            <input required type="text" placeholder="XYZ Institute of Tech" className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-100 focus:outline-none" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} />
          </div>
        </div>

        <div className="mt-10">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block mb-4">Current Education Level</label>
          <div className="flex flex-wrap gap-6">
            {['Diploma', 'B.Tech', 'M.Tech', 'Other'].map(level => (
              <label key={level} className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="edu" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" checked={formData.educationLevel === level} onChange={() => setFormData({...formData, educationLevel: level})} />
                <span className="text-sm font-bold text-[#0A2463] group-hover:text-blue-600 transition-colors">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Course Interest */}
      <div className="bg-white border border-gray-50 rounded-[40px] p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
            <BookOpen size={20} />
          </div>
          <h3 className="text-xl font-black text-[#0A2463] uppercase tracking-tight">Course Interest</h3>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Which category are you applying for?</label>
          <select required className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold appearance-none focus:outline-none cursor-pointer" value={formData.courseCategory} onChange={e => setFormData({...formData, courseCategory: e.target.value})}>
            <option value="">Select a Category</option>
            <option value="quantum">Quantum Computing</option>
            <option value="ai">Artificial Intelligence</option>
            <option value="cyber">Cyber Security</option>
            <option value="bio">Bio-Genetics</option>
          </select>
        </div>
      </div>

      {/* Section 3: Current Skill Level */}
      <div className="bg-white border border-gray-50 rounded-[40px] p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500">
            <BarChart3 size={20} />
          </div>
          <h3 className="text-xl font-black text-[#0A2463] uppercase tracking-tight">Current Skill Level</h3>
        </div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-6">How would you rate your level in this domain?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['Beginner', 'Basic', 'Intermediate', 'Advanced'] as const).map(level => (
            <button key={level} type="button" onClick={() => setFormData({...formData, skillLevel: level})} className={`flex flex-col p-6 rounded-3xl border text-left transition-all ${formData.skillLevel === level ? 'bg-[#0A2463] border-[#0A2463] text-white shadow-xl' : 'bg-[#F8F9FA] border-gray-100 hover:border-gray-300 text-[#0A2463]'}`}>
              <span className="font-black text-sm uppercase mb-1">{level}</span>
              <span className={`text-[9px] font-bold ${formData.skillLevel === level ? 'text-white/60' : 'text-gray-400'}`}>
                {level === 'Beginner' && 'Never learned before'}
                {level === 'Basic' && 'Know some concepts'}
                {level === 'Intermediate' && 'Can build small things'}
                {level === 'Advanced' && 'Already working level'}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-10 space-y-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Have you worked on any projects before?</label>
          <textarea placeholder="Briefly describe your past projects or type 'None'..." className="w-full bg-[#F8F9FA] border border-gray-100 rounded-3xl py-4 px-6 text-sm font-bold h-32 focus:outline-none" value={formData.pastProjects} onChange={e => setFormData({...formData, pastProjects: e.target.value})} />
        </div>
      </div>

      {/* Section 4: Your Goals */}
      <div className="bg-white border border-gray-50 rounded-[40px] p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
            <Target size={20} />
          </div>
          <h3 className="text-xl font-black text-[#0A2463] uppercase tracking-tight">Your Goals</h3>
        </div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-6">Why do you want to take this course? (Select multiple)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goalOptions.map(goal => (
            <label key={goal} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${formData.goals.includes(goal) ? 'bg-[#0A2463] text-white border-[#0A2463]' : 'bg-[#F8F9FA] text-[#0A2463] border-gray-50'}`}>
              <input type="checkbox" className="hidden" checked={formData.goals.includes(goal)} onChange={() => handleGoalToggle(goal)} />
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${formData.goals.includes(goal) ? 'bg-white border-white' : 'border-gray-200 bg-white'}`}>
                {formData.goals.includes(goal) && <ArrowRight size={12} className="text-[#0A2463]" />}
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider">{goal}</span>
            </label>
          ))}
        </div>
        <div className="mt-10 space-y-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your main goal in next 6 months:</label>
          <input type="text" placeholder="e.g. Secure an AI Internship" className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none" value={formData.mainGoal} onChange={e => setFormData({...formData, mainGoal: e.target.value})} />
        </div>
      </div>

      {/* Section 5: Logistics */}
      <div className="bg-white border border-gray-50 rounded-[40px] p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
            <Truck size={20} />
          </div>
          <h3 className="text-xl font-black text-[#0A2463] uppercase tracking-tight">Logistics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Intensity (Mentor decided)</label>
            <select className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold appearance-none cursor-pointer" value={formData.intensity} onChange={e => setFormData({...formData, intensity: e.target.value})}>
              <option value="">Choose your preference</option>
              <option value="light">Light (3-4 hrs/week)</option>
              <option value="moderate">Moderate (8-10 hrs/week)</option>
              <option value="intensive">Intensive (15+ hrs/week)</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Availability (Daily)</label>
            <div className="flex gap-6 mt-2">
              {['1-2 hrs', '2-4 hrs', '4+ hrs'].map(range => (
                <label key={range} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="availability" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" checked={formData.availability === range} onChange={() => setFormData({...formData, availability: range})} />
                  <span className="text-sm font-bold text-[#0A2463]">{range}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Learning Mode</label>
            <select className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold appearance-none cursor-pointer" value={formData.learningMode} onChange={e => setFormData({...formData, learningMode: e.target.value})}>
              <option value="">Select mode</option>
              <option value="online">Online / Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="offline">In-person</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Resume / GitHub / Projects (Optional)</label>
            <input type="text" placeholder="Link to your portfolio" className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none" value={formData.resumeLink} onChange={e => setFormData({...formData, resumeLink: e.target.value})} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-2">
        <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-[#6366F1] focus:ring-[#6366F1]" id="confirm" />
        <label htmlFor="confirm" className="text-xs font-bold text-gray-400 uppercase tracking-widest cursor-pointer select-none">I am serious about learning and willing to attend a mentor interview for final evaluation.</label>
      </div>

      <button type="submit" className="w-full bg-[#6366F1] hover:bg-[#5850EC] text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] py-6 rounded-3xl transition-all shadow-xl shadow-[#6366F1]/20 transform active:scale-[0.98] flex items-center justify-center gap-4">
        Apply for Skill Assessment <ArrowRight size={20} />
      </button>
    </form>
  );
};

export default EnrollmentForm;
