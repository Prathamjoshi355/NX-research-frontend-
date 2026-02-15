
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
import ConnectModal from '../components/ConnectModal';
import JoinModal from '../components/JoinModal';
import { ModalType, FormType } from '../types';

const PrivateResearch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FormType>(FormType.STUDENT);
  const [isMuted, setIsMuted] = useState(true);
  const [isPip, setIsPip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLElement>(null);

  const [modal, setModal] = useState<ModalType>(null);

  const handleConnect = () => setModal('connect');
  const handleJoin = () => setModal('join');
  const closeModal = () => setModal(null);

  const forCompanies = [
    { icon: <Rocket className="text-[#3FB998]" />, title: "Startups & Growing Businesses" },
    { icon: <Cpu className="text-[#3FB998]" />, title: "Tech & Product Companies" },
    { icon: <Building2 className="text-[#3FB998]" />, title: "Innovation Teams & IT Firms" }
  ];

  const forStudents = [
    { icon: <Users className="text-[#3FB998]" />, title: "Screened & Selected Talent" },
    { icon: <Briefcase className="text-[#3FB998]" />, title: "Real Industry Experience" },
    { icon: <GraduationCap className="text-[#3FB998]" />, title: "Skill-Based Project Roles" }
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
    { icon: <Microscope size={20} className="text-[#3FB998]" />, text: "Live Industry Projects" },
    { icon: <HelpCircle size={20} className="text-[#3FB998]" />, text: "Mentorship & Guidance" },
    { icon: <FileBadge size={20} className="text-[#3FB998]" />, text: "Certification & Portfolio" },
    { icon: <Globe2 size={20} className="text-[#3FB998]" />, text: "Real-World Experience" },
    { icon: <Network size={20} className="text-[#3FB998]" />, text: "Global Research Network" }
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
    <div className="animate-in fade-in duration-900 bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#0A1211]">
         {/* <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0A1211] z-[2]"></div> */}
        <div className="absolute inset-0 z-[1] opacity-50">
          <img
            src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1770321389/Priv._Home_w9tbte.jpg"
            alt="Research Hero"
            className="w-full h-full object-cover grayscale brightness-[0.3]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center px-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#3FB998]/10 border border-[#3FB998]/20 text-[#3FB998] text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Strategic Industrial R&D
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-[#FFF0F0] leading-[0.9] mb-8 tracking-tighter uppercase italic">
            Research That <br /> <span className="text-[#3FB998]">Solves Problems.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-[#FFF0F0] mb-12 leading-relaxed font-medium italic opacity-80">
            NX Research partners with private industries to deliver secure, 
            data-driven solutions through student-led innovation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <button 
              onClick={handleConnect}
              className="w-full sm:w-auto bg-[#1F2D2B] text-white px-10 py-5 rounded-2xl font-black hover:shadow-2xl transition-all transform hover:scale-105 uppercase text-xs tracking-widest min-w-[280px]"
            >
              Connect for Research
            </button>
            <button 
              onClick={handleJoin}
              className="w-full sm:w-auto bg-[#3FB998] text-white px-10 py-5 rounded-2xl font-black hover:shadow-2xl transition-all transform hover:scale-105 uppercase text-xs tracking-widest min-w-[280px]"
            >
              Join as Researcher
            </button>
          </div>
        </div>
      </section>

      {modal === 'connect' && <ConnectModal onClose={closeModal} />}
      {modal === 'join' && <JoinModal onClose={closeModal} />}

      {/* Video Workflow Section */}
      <Section ref={videoSectionRef} className="py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-8 leading-tight italic">
              Applied <br /> Intelligence.
            </h2>
            <div className="space-y-6 mb-12">
              {[
                'Strategic problem identification and mapping',
                'Rapid prototyping and iterative development',
                'Secure R&D pipelines with elite oversight',
                'Deployment-ready architectural benchmarks'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start space-x-5">
                  <div className="bg-[#3FB998]/10 text-[#3FB998] p-2.5 rounded-xl shrink-0">
                    <CheckCircle size={20} strokeWidth={3} />
                  </div>
                  <p className="text-lg md:text-xl text-[#4A5D5A] font-medium leading-relaxed italic opacity-90">
                    {point}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="h-16 px-10 rounded-2xl border-2 border-[#1F2D2B] text-[#1F2D2B] group text-xs font-black uppercase tracking-widest hover:bg-[#1F2D2B] hover:text-white transition-all shadow-lg">
              Explore Our Workflow <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>

          <div className="relative">
            <div className={`${isPip ? 'fixed bottom-6 right-6 w-56 md:w-96 h-32 md:h-56 z-50 shadow-2xl animate-in slide-in-from-bottom-12 rounded-[2rem] overflow-hidden border border-[#3FB998]/40 bg-black' : 'relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-3xl'}`}>
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-business-people-walking-in-a-hallway-4433-large.mp4" type="video/mp4" />
              </video>
              <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 p-3 bg-white/20 text-white rounded-full backdrop-blur-xl hover:bg-[#3FB998] transition-all z-10"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Grid */}
      <Section gray className="py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#A9E2D2]/30"></div>
          
          <div className="space-y-10">
            <h3 className="text-2xl font-black text-[#1F2D2B] uppercase tracking-widest mb-10 flex items-center gap-5 italic">
              <span className="w-12 h-2 bg-[#3FB998] rounded-full"></span>
              For Companies
            </h3>
            <div className="space-y-5">
              {forCompanies.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-[#EEF4F2] hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF4F2] flex items-center justify-center shrink-0 group-hover:bg-[#3FB998] group-hover:text-white transition-all">
                    {/* Fix: Casting to React.ReactElement<any> to allow 'size' prop in cloneElement */}
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
                  </div>
                  <span className="font-black text-[#1F2D2B] text-base uppercase tracking-tight">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h3 className="text-2xl font-black text-[#1F2D2B] uppercase tracking-widest mb-10 flex items-center gap-5 italic">
              <span className="w-12 h-2 bg-[#3FB998] rounded-full"></span>
              For Students
            </h3>
            <div className="space-y-5">
              {forStudents.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-[#EEF4F2] hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF4F2] flex items-center justify-center shrink-0 group-hover:bg-[#3FB998] group-hover:text-white transition-all">
                    {/* Fix: Casting to React.ReactElement<any> to allow 'size' prop in cloneElement */}
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
                  </div>
                  <span className="font-black text-[#1F2D2B] text-base uppercase tracking-tight">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PrivateResearch;
