
import React, { useState, useRef } from 'react';
import { 
  Zap, 
  Terminal, 
  Database, 
  Layout, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  User,
  Book,
  BarChart3,
  Target,
  Clock,
  CheckCircle2,
  ChevronRight,
  Play,
  Lightbulb,
  Code,
  Globe,
  Award
} from 'lucide-react';
import { Section, Button, Card, Input, Select, Textarea } from '../components/Common';
import { Link } from 'react-router-dom';

const coursesData = {
  programming: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'Go', 'Rust', 'SQL', 'Bash', 'R'],
  advancedtech: ['Machine Learning', 'Deep Learning', 'AI Engineering', 'Computer Vision', 'NLP', 'Cloud Computing', 'DevOps', 'IoT', 'Cybersecurity', 'Blockchain'],
  academic: ['Engineering Core Subject', 'Mathematics & Statistics', 'Research Methodology'],
  projectdev: ['Mini Project', 'Major Project', 'Industry Project'],
  careerprep: ['Resume + Mock Interviews', 'Complete Placement Track']
};

const PowerEmpowerment: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('');
  const [selectedEduLevel, setSelectedEduLevel] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50 animate-in zoom-in-95 duration-500">
        <div className="max-w-md w-full bg-white rounded-[2rem] p-10 text-center shadow-3xl border border-green-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-black text-[#0A2463] uppercase tracking-tighter italic mb-3">Application Received</h2>
          <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed italic">
            Your application for the Personalized Learning Path is being reviewed. A mentor will reach out within 24-48 hours.
          </p>
          <Button fullWidth size="md" className="rounded-xl h-12 shadow-lg" onClick={() => setIsSubmitted(false)}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 bg-white overflow-x-hidden">
      {/* HERO SECTION - REFINED */}
      <section className="pt-24 pb-20 px-4 bg-white border-b border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/40 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0A2463] text-[9px] font-black uppercase tracking-[0.3em] mb-8">
             Strategic Capability Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0A2463] mb-6 leading-tight tracking-tighter uppercase italic">
            One Platform for <br />
            <span className="underline decoration-[#FB8500] decoration-4 underline-offset-8">Thinking & Technical Power</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 mb-10 max-w-2xl mx-auto font-medium">
            Bridging the gap between academic knowledge and industrial execution through elite-guided learning and research.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto px-10 py-4 bg-[#0A2463] hover:bg-[#0A2463]/90 text-white font-black rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]" onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Started <ArrowRight size={14} />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 py-4 border-2 border-slate-100 hover:border-[#FB8500] text-[#0A2463] font-black rounded-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]">
              Explore Paths <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </section>

      {/* DISCOVER SECTION - SIDE BY SIDE */}
      <Section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
              alt="Learning Video Preview" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-[#FB8500] ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="w-1/3 h-full bg-[#FB8500]"></div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A2463] mb-6 uppercase tracking-tighter italic border-b-2 border-slate-50 pb-4 inline-block">
              Discover Capability
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
              We don't just teach modules; we architect mental models. Our approach focuses on three core growth paths that transform a student into a deployable asset.
            </p>
            <div className="space-y-4">
              {['Concept Mastery', 'Architectural Thinking', 'Production Deployment'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <CheckCircle size={14} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* GROWTH PATHS - 3 COLUMN GRID */}
      <Section gray className="py-20 px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-[#0A2463] uppercase tracking-tighter italic relative inline-block">
              Three Empowerment Paths
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600/10"></span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="mb-6 bg-blue-50 p-4 rounded-xl text-blue-600">
                <Terminal size={32} />
              </div>
              <h3 className="text-lg font-black text-[#0A2463] mb-4 uppercase">Technical Power</h3>
              <ul className="space-y-3 w-full text-left">
                {['Industry-grade Coding', 'Applied AI & ML Architecture', 'Cloud & DevOps Integration'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-[#FB8500] rounded-full mt-1 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="mb-6 bg-orange-50 p-4 rounded-xl text-[#FB8500]">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-lg font-black text-[#0A2463] mb-4 uppercase">Thinking Power</h3>
              <ul className="space-y-3 w-full text-left">
                {['Problem Decomposition', 'First Principles Thinking', 'Strategic Decision Making'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-[#0A2463] rounded-full mt-1 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="mb-6 bg-green-50 p-4 rounded-xl text-green-600">
                <Database size={32} />
              </div>
              <h3 className="text-lg font-black text-[#0A2463] mb-4 uppercase">Research Power</h3>
              <ul className="space-y-3 w-full text-left">
                {['Applied Research Ops', 'Data-Driven Validation', 'Publication & IP Generation'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* SUPPORT MATRIX */}
      <Section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-[#0A2463] uppercase tracking-tighter italic relative inline-block">
              Support Matrix
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600/10"></span>
            </h2>
          </div>
          <div className="max-w-2xl mx-auto bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            {[
              { text: 'Capability Mapping', color: 'bg-orange-400', icon: <Target size={16} /> },
              { text: 'Technical Mentor Oversight', color: 'bg-blue-500', icon: <Code size={16} /> },
              { text: 'Industry Validation', color: 'bg-yellow-500', icon: <Globe size={16} /> },
              { text: 'Portfolio Accreditation', color: 'bg-teal-500', icon: <Award size={16} /> },
              { text: 'Direct Placement Track', color: 'bg-indigo-500', icon: <ChevronRight size={16} /> }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 py-4 group border-b border-slate-200/50 last:border-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="text-slate-700 font-black uppercase tracking-widest text-[10px]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* APPLICATION FORM - COMPACT */}
      <Section id="apply-form" className="py-20 md:py-32 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-5xl font-black text-[#0A2463] uppercase tracking-tighter leading-none italic mb-4">Skill Assessment.</h2>
             <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[9px]">Elite Selection • 1:1 Mapping • Action Plan</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <Card className="p-8 bg-white rounded-3xl shadow-xl border-none">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <User size={18} className="text-[#0A2463]" />
                <h3 className="text-sm font-black text-[#0A2463] uppercase tracking-widest">Identity Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name *" placeholder="John Doe" required />
                <Input label="Email Address *" type="email" placeholder="john@example.com" required />
                <Input label="Mobile Number *" type="tel" placeholder="+91 00000 00000" required />
                <Input label="Institution *" placeholder="University / College" required />
              </div>
              <div className="mt-6">
                <label className="block text-[8px] font-black uppercase text-gray-400 mb-3 tracking-[0.2em]">Education Level *</label>
                <div className="flex flex-wrap gap-4">
                  {['Diploma', 'B.Tech', 'M.Tech', 'Other'].map(level => (
                    <label key={level} className="flex items-center space-x-2 cursor-pointer group">
                      <input type="radio" name="eduLevel" className="peer sr-only" required onChange={() => setSelectedEduLevel(level)} />
                      <div className="w-4 h-4 rounded-full border-2 border-slate-200 peer-checked:bg-[#FB8500] peer-checked:border-[#FB8500] transition-all"></div>
                      <span className="text-[9px] font-black uppercase text-slate-500 peer-checked:text-[#0A2463]">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white rounded-3xl shadow-xl border-none">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <Book size={18} className="text-[#0A2463]" />
                <h3 className="text-sm font-black text-[#0A2463] uppercase tracking-widest">Target Domain</h3>
              </div>
              <div className="max-w-xs mb-6">
                <Select label="Track Category *" options={['Programming & Languages', 'Advanced Tech Domains', 'Academic Subjects', 'Project Development']} onChange={handleCategoryChange} required />
              </div>
              {category && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Level 1 Intro', 'Intermediate Build', 'Expert Systems'].map(course => (
                    <label key={course} className="flex items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-[#FB8500] transition-all cursor-pointer">
                      <input type="checkbox" className="accent-[#FB8500] mr-2" />
                      <span className="text-[9px] font-black uppercase text-[#0A2463]">{course}</span>
                    </label>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-8 bg-white rounded-3xl shadow-xl border-none">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <BarChart3 size={18} className="text-[#0A2463]" />
                <h3 className="text-sm font-black text-[#0A2463] uppercase tracking-widest">Experience Mapping</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {['Beginner', 'Basic', 'Intermediate', 'Advanced'].map(lvl => (
                  <label key={lvl} className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${selectedSkillLevel === lvl ? 'bg-[#0A2463] border-[#0A2463] text-white shadow-lg' : 'bg-slate-50 border-slate-50 hover:border-slate-200'}`} onClick={() => setSelectedSkillLevel(lvl)}>
                    <input type="radio" name="lvl" className="sr-only" required />
                    <span className="text-[10px] font-black uppercase">{lvl}</span>
                  </label>
                ))}
              </div>
              <Textarea label="Tell us about your biggest project (Optional)" />
            </Card>

            <div className="flex flex-col items-center pt-8">
              <label className="flex items-center gap-3 mb-8 cursor-pointer group">
                <input type="checkbox" className="accent-[#FB8500] w-4 h-4" required />
                <span className="text-[9px] font-black uppercase text-slate-400 italic">I am serious about building real power and ready for interview.</span>
              </label>
              <Button type="submit" size="lg" className="h-16 px-16 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-xl hover:scale-105 transition-all">
                Submit Assessment <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </Section>

      {/* METRICS - REFINED */}
      <Section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: '2000+', l: 'Guided' },
            { v: '120+', l: 'Researches' },
            { v: '45+', l: 'Companies' },
            { v: '20+', l: 'Launches' }
          ].map((m, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border border-slate-50 bg-slate-50/30">
              <div className="text-3xl font-black text-[#0A2463] mb-1 leading-none">{m.v}</div>
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{m.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* REFINED FOOTER CTA */}
      <Section className="bg-[#0A2463] text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FB8500]/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 px-6">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic leading-none">
            Architect Your <br /> Capability.
          </h2>
          <p className="text-sm md:text-lg text-blue-100/60 max-w-2xl mx-auto mb-10 font-medium italic">
            The transition from a student to an independent creator <br className="hidden md:block" /> starts today. Don't just learn, build power.
          </p>
          <div className="text-slate-500 font-black uppercase tracking-[0.4em] text-[8px]">
             NX Research Organization • Elite Empowerment Division
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PowerEmpowerment;
