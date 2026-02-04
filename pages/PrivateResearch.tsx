import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, 
  Cpu, 
  Building2, 
  Users, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  FileText, 
  Database, 
  Heart, 
  CheckCircle,
  BarChart3,
  PackageSearch,
  BrainCircuit,
  TrendingUp,
  Globe,
  Microscope,
  HelpCircle,
  FileBadge,
  Globe2,
  Network,
  Upload,
  ChevronDown,
  Volume2,
  VolumeX,
  X,
  ArrowRight
} from 'lucide-react';
import { Section, Button, Input, Select, Textarea } from '../components/Common';
import { FormType } from '../PrivateResearchtypes';

const PrivateResearch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FormType>(FormType.STUDENT);
  const [isMuted, setIsMuted] = useState(true);
  const [isPip, setIsPip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLElement>(null);

  const forCompanies = [
    { icon: <Rocket className="text-[#ff8c00]" />, title: "Startups & Growing Businesses" },
    { icon: <Cpu className="text-[#ff8c00]" />, title: "Tech & Product Companies" },
    { icon: <Building2 className="text-[#ff8c00]" />, title: "Innovation Teams & IT Firms" }
  ];

  const forStudents = [
    { icon: <Users className="text-[#ff8c00]" />, title: "Screened & Selected Talent" },
    { icon: <Briefcase className="text-[#ff8c00]" />, title: "Real Industry Experience" },
    { icon: <GraduationCap className="text-[#ff8c00]" />, title: "Skill-Based Project Roles" }
  ];

  const excellenceItems = [
    { icon: <ShieldCheck />, label: "NDA on Every Project" },
    { icon: <FileText />, label: "Formal Agreements" },
    { icon: <Database />, label: "Secure Data Handling" },
    { icon: <Heart />, label: "Ethics-Driven" },
    { icon: <CheckCircle />, label: "Quality Assurance" }
  ];

  const researchAreas = [
    {
      title: "Market & Consumer Research",
      description: "Helping you understand and prioritize future customer needs.",
      icon: <BarChart3 className="text-blue-500" />
    },
    {
      title: "Product & Innovation Research",
      description: "Real data to reduce risk converging new ideas and technologies.",
      icon: <PackageSearch className="text-orange-500" />
    },
    {
      title: "AI & Tech Research",
      description: "Advancing innovation with market and technology insights.",
      icon: <BrainCircuit className="text-indigo-500" />
    },
    {
      title: "Business Optimization",
      description: "Get data-driven insights to grow, reduce costs and go global.",
      icon: <TrendingUp className="text-green-500" />
    },
    {
      title: "Branding & Growth Insights",
      description: "Develop customer-focused brand strategies for industry success.",
      icon: <Globe className="text-teal-500" />
    }
  ];

  const programHighlights = [
    { icon: <Microscope size={20} className="text-[#ff8c00]" />, text: "Live Industry Projects" },
    { icon: <HelpCircle size={20} className="text-[#ff8c00]" />, text: "Mentorship & Guidance" },
    { icon: <FileBadge size={20} className="text-[#ff8c00]" />, text: "Certification & Portfolio" },
    { icon: <Globe2 size={20} className="text-[#ff8c00]" />, text: "Real-World Experience" },
    { icon: <Network size={20} className="text-[#ff8c00]" />, text: "Global Research Network" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!videoSectionRef.current) return;
      const rect = videoSectionRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        setIsPip(true);
      } else {
        setIsPip(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-40 overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1920" 
            alt="Research Hero" 
            className="w-full h-full object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-[#001f54] leading-[1.1] mb-6 tracking-tight uppercase">
            Research That Solves <br className="hidden sm:block" />
            <span className="text-[#ff8c00]">Real Business Problems</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-xl text-slate-600 mb-8 md:mb-12 leading-relaxed px-2 font-medium">
            NX Research partners with private industries and selected student researchers 
            to deliver secure, data-driven solutions through applied research and innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            <Button size="lg" className="w-full sm:w-auto px-12 h-16 rounded-xl bg-[#001f54] text-white font-black uppercase tracking-widest text-xs">
              Connect for Research
            </Button>
            <Button size="lg" className="w-full sm:w-auto px-12 h-16 rounded-xl bg-[#ff8c00] text-white font-black uppercase tracking-widest text-xs">
              Join as Researcher
            </Button>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Description + Video (PiP) */}
      <Section ref={videoSectionRef} className="py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="animate-in slide-in-from-left duration-700">
            <h2 className="text-3xl md:text-5xl font-black text-[#001f54] uppercase tracking-tighter mb-8 leading-tight italic">
              Applied <br className="hidden md:block" /> Intelligence.
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium leading-relaxed italic opacity-80">
              Transforming complex industry challenges into scalable technological breakthroughs. We don't just research; we architect outcomes.
            </p>
            <div className="space-y-4 mb-10">
              {[
                'Strategic problem identification and mapping',
                'Rapid prototyping and iterative development',
                'Secure R&D pipelines with elite oversight',
                'Deployment-ready architectural benchmarks'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="bg-[#06A77D]/10 text-[#06A77D] p-2 rounded-lg shrink-0">
                    <CheckCircle size={16} strokeWidth={3} />
                  </div>
                  <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed italic opacity-90">
                    {point}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="h-14 px-8 rounded-xl border-2 border-[#001f54] text-[#001f54] group text-[10px] font-black uppercase tracking-widest hover:bg-[#001f54] hover:text-white transition-all">
              Explore Our Workflow <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div className={`${isPip ? 'fixed bottom-4 right-4 w-48 md:w-80 h-28 md:h-48 z-50 shadow-2xl animate-in slide-in-from-bottom-12 rounded-2xl overflow-hidden border border-[#ff8c00]/40 bg-black' : 'relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out'}`}>
              <video 
                ref={videoRef}
                autoPlay 
                muted={isMuted}
                loop 
                playsInline
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-business-people-walking-in-a-hallway-4433-large.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

              <button 
                onClick={toggleMute}
                className="absolute bottom-4 right-4 p-2.5 bg-white/20 text-white rounded-full backdrop-blur-xl hover:bg-[#ff8c00] transition-all z-10 border border-white/20"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              {isPip && (
                <button 
                  onClick={() => setIsPip(false)}
                  className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-red-500 transition-colors z-10"
                >
                  <X size={12} />
                </button>
              )}

              {!isPip && (
                <div className="absolute bottom-6 left-6 right-6 text-center pointer-events-none">
                  <p className="text-white text-[9px] font-black uppercase tracking-[0.2em] drop-shadow-lg">
                    Private Sector Innovation Cycle
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section gray className="py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200"></div>

          {/* Companies Side */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl font-black text-[#001f54] uppercase tracking-wider mb-8 flex items-center gap-4">
              <span className="w-10 h-1.5 bg-[#ff8c00] block shrink-0 rounded-full"></span>
              For Companies
            </h2>
            <div className="space-y-4">
              {forCompanies.map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
                  </div>
                  <span className="font-black text-[#001f54] text-sm uppercase tracking-tight leading-none">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Students Side */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl font-black text-[#001f54] uppercase tracking-wider mb-8 flex items-center gap-4">
              <span className="w-10 h-1.5 bg-[#ff8c00] block shrink-0 rounded-full"></span>
              For Students
            </h2>
            <div className="space-y-4">
              {forStudents.map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
                  </div>
                  <span className="font-black text-[#001f54] text-sm uppercase tracking-tight leading-none">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 text-center">
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
            Bridging industry challenges with research-driven talent
          </p>
        </div>
      </Section>

      {/* Excellence Banner */}
      <section className="bg-[#001f54] py-16 md:py-24 text-white overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-16 uppercase tracking-tight italic">Research Excellence</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
            {excellenceItems.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 group cursor-default">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#ff8c00] group-hover:bg-[#ff8c00] transition-all duration-500 transform group-hover:-translate-y-2">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28, className: "md:w-10 md:h-10" })}
                </div>
                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
            Your ideas, data, and results remain fully confidential.
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <Section className="py-24 md:py-32">
        <h2 className="text-center text-3xl md:text-5xl font-black text-[#001f54] mb-20 uppercase tracking-tighter italic">Research Areas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {researchAreas.map((area, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-3xl border border-slate-100 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group ${idx === researchAreas.length - 1 && 'sm:col-span-2 lg:col-span-1'}`}
            >
              <div className="mb-8 p-5 rounded-2xl bg-slate-50 group-hover:bg-white transition-colors shadow-inner">
                {React.cloneElement(area.icon as React.ReactElement<any>, { size: 40 })}
              </div>
              <h3 className="font-black text-[#001f54] text-lg uppercase mb-4 leading-tight tracking-tight">{area.title}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed font-medium opacity-80">{area.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Program Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#001f54] mb-16 uppercase tracking-tighter italic">Student Research Program</h2>
          <div className="flex flex-wrap justify-center gap-y-6 gap-x-8 md:gap-x-12">
            {programHighlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-md border border-gray-50 hover:border-[#ff8c00] transition-colors group">
                <div className="group-hover:rotate-12 transition-transform">{item.icon}</div>
                <span className="font-black text-[#001f54] text-xs uppercase tracking-widest">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <Section id="apply" className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black text-[#001f54] mb-6 uppercase tracking-tighter italic">Get Started With NX Research</h2>
             <div className="w-24 h-2 bg-[#ff8c00] mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-[3rem] shadow-3xl border border-slate-100 overflow-hidden animate-in zoom-in-95">
            {/* Tabs */}
            <div className="flex">
              <button 
                onClick={() => setActiveTab(FormType.STUDENT)}
                className={`flex-1 py-8 font-black text-xs md:text-sm uppercase tracking-[0.3em] transition-all ${activeTab === FormType.STUDENT ? 'bg-[#001f54] text-white shadow-inner' : 'bg-slate-100 text-[#001f54] hover:bg-slate-200'}`}
              >
                Join as Student
              </button>
              <button 
                onClick={() => setActiveTab(FormType.COMPANY)}
                className={`flex-1 py-8 font-black text-xs md:text-sm uppercase tracking-[0.3em] transition-all ${activeTab === FormType.COMPANY ? 'bg-[#ff8c00] text-white shadow-inner' : 'bg-slate-100 text-[#001f54] hover:bg-slate-200'}`}
              >
                Connect as Company
              </button>
            </div>

            <div className="p-10 md:p-20">
              {activeTab === FormType.STUDENT ? (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="md:col-span-2">
                    <h3 className="text-[#ff8c00] font-black uppercase text-[11px] tracking-[0.3em] mb-8 border-b border-gray-100 pb-4 italic">Student Enrollment Portal</h3>
                  </div>

                  <Input label="Full Name" placeholder="e.g. John Doe" required />
                  <Input label="City" placeholder="e.g. New York" required />
                  
                  <div className="md:col-span-2">
                    <Input label="College / Background" placeholder="e.g. University of Technology / Computer Science" required />
                  </div>

                  <Select label="Domain of interest" options={['Market Research', 'Data Science', 'AI/Tech Engineering', 'Business Strategy']} required />
                  <Select label="Experience level" options={['Beginner (Student)', 'Intermediate (Active)', 'Advanced (Expert)']} required />

                  <Input label="Skills" placeholder="e.g. Python, SQL, Market Analysis" required />
                  <Input label="Availability (hours/week)" type="number" placeholder="e.g. 15" required />

                  <div className="md:col-span-2 mt-4">
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest pl-1">Upload Resume (PDF)</label>
                    <div className="relative group cursor-pointer">
                      <input 
                        type="file" 
                        accept=".pdf" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        required 
                      />
                      <div className="w-full px-4 py-10 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 group-hover:border-[#ff8c00] transition-all flex flex-col items-center justify-center gap-3">
                        <Upload className="text-slate-400 group-hover:text-[#ff8c00] transition-colors" size={32} />
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Click to upload or drag & drop</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <Textarea label="Why do you want to join NX Research?" placeholder="Tell us about your motivation..." required />
                  </div>

                  <div className="md:col-span-2 mt-10">
                    <Button type="submit" fullWidth size="lg" className="h-20 rounded-2xl text-[13px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
                      Apply Now
                    </Button>
                  </div>
                </form>
              ) : (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="md:col-span-2">
                    <h3 className="text-[#001f54] font-black uppercase text-[11px] tracking-[0.3em] mb-8 border-b border-gray-100 pb-4 italic">🏢 Corporate Solutions Gateway</h3>
                  </div>

                  <Input label="Name" placeholder="Jane Smith" required />
                  <Input label="Company Name" placeholder="TechCorp Inc." required />

                  <Input label="Industry type" placeholder="e.g. FinTech, Healthcare, Retail" required />
                  <Select label="Research need" options={['Market Analysis', 'Product Architecture', 'AI Engineering', 'Operational Growth', 'Other']} required />

                  <Input label="Email" type="email" placeholder="jane@company.com" required />
                  <Input label="Phone" type="tel" placeholder="+1 234 567 890" required />

                  <div className="md:col-span-2 mt-4">
                    <Textarea label="Briefly explain your challenge" placeholder="Describe the research project or problem..." required />
                  </div>
                  
                  <div className="md:col-span-2 mt-10">
                    <Button type="submit" variant="secondary" fullWidth size="lg" className="h-20 rounded-2xl text-[13px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
                      Request Consultation
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
          <p className="text-center mt-12 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
            &copy; {new Date().getFullYear()} NX Research Organization | Data is Confidential & Secure
          </p>
        </div>
      </Section>
    </div>
  );
};

export default PrivateResearch;