
import React, { useState, useEffect, useRef } from 'react';
import { Section, Card, Button, Input, Badge, Select } from '../components/Common';
import {
  Play,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Globe,
  FileText,
  Zap,
  Users,
  Rocket,
  Target,
  Volume2,
  VolumeX,
  X,
  Building2,
  ShieldCheck,
  Search
} from 'lucide-react';
import { GOV_GRANTS } from '../constants';

const GovResearch = () => {
  const [formType, setFormType] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPip, setIsPip] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const heroTexts = [
    "Applied Research Division",
    "National Impact Hub",
    "Public Sector Innovation",
    "Solve • Build • Deploy"
  ];

  const stats = [
    { number: '20,000+', label: 'Students', icon: Users },
    { number: '1,500+', label: 'Projects', icon: Rocket },
    { number: '300+', label: 'Govt Mentors', icon: ShieldCheck },
    { number: '100+', label: 'Govt Alliances', icon: Globe },
    { number: '₹12Cr+', label: 'Grants', icon: Zap }
  ];

  const researchPoints = [
    'Work on impactful real-world projects',
    'Learn cutting-edge skills through mentorship',
    'Discover your passion for research',
    'Contribute to national infrastructure'
  ];

  const benefits = [
    'Hands-on experience on public issues',
    'Understanding government policies',
    'Data analysis & policy modeling',
    'Access to exclusive national resources'
  ];

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        setIsPip(true);
      } else {
        setIsPip(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(heroTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroTexts.length]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 bg-white overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-[#00000]">
       
        <div className="absolute inset-0 z-0 ">
          <img
            src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1770321238/gov._Home_qfzpy3.jpg"
            alt="Research Hero"
            className="w-full h-full object-cover grayscale brightness-[0.3]"
          />
        </div>
        <div className="relative z-5 text-center max-w-3xl px-6">
          <div className="mb-6 md:mb-8 inline-flex items-center px-4 py-1.5 rounded-full bg-[#1F2D2B]/10 border border-[#1F2D2B]/20 text-[#1fffff] text-[9px] font-black uppercase tracking-[0.3em] animate-in slide-in-from-top-12">
            Independent Applied Research Hub
          </div>

          <div className="h-[60px] md:h-[140px] flex items-center justify-center mb-6 md:mb-8 overflow-hidden">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-[#fff0f0] leading-none tracking-tighter uppercase italic">
              <span key={heroIndex} className="block animate-heroText whitespace-pre-wrap px-4">
                {heroTexts[heroIndex]}
              </span>
            </h1>
          </div>

          <p className="text-base md:text-xl text-[#1fffff] max-w-3xl mx-auto mb-10 font-medium leading-relaxed italic opacity-80">
            Bridging the gap between academic curiosity and national policy challenges.
            Build solutions that matter for millions.
          </p>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="h-14 md:h-16 px-10 md:px-14 rounded-2xl shadow-xl shadow-[#3FB998]/20 font-black uppercase tracking-[0.15em] text-xs transition-all hover:scale-105 active:scale-95 bg-[#3FB998]"
              onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Journey
            </Button>

            
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5">
          <Globe size={500} strokeWidth={0.5} className="mx-auto" />
        </div>
      </section>

      {/* STATS SECTION */}
      <Section className="py-12 border-y border-gray-100 bg-white">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className={`px-4 group ${idx !== stats.length - 1 ? 'lg:border-r border-[#EEF4F2]' : ''}`}>
              <div className="flex justify-center mb-2 text-[#3FB998] group-hover:scale-110 transition-transform">
                <stat.icon size={20} />
              </div>
              <div className="text-2xl md:text-4xl font-black text-[#1F2D2B] mb-1 tracking-tighter uppercase italic">
                {stat.number}
              </div>
              <div className="text-[8px] md:text-[9px] font-black text-[#8FA6A1] uppercase tracking-[0.1em] leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* REAL RESEARCH EXPERIENCE */}
      <Section className="py-16 md:py-24" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="animate-in slide-in-from-left duration-700">
            <h2 className="text-3xl md:text-5xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-8 leading-tight italic">
              Applied <br className="hidden md:block" /> Experience.
            </h2>
            <div className="space-y-4 mb-10">
              {researchPoints.map((point, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="bg-[#3FB998]/10 text-[#3FB998] p-2 rounded-lg shrink-0">
                    <CheckCircle size={16} strokeWidth={3} />
                  </div>
                  <p className="text-base md:text-lg text-[#4A5D5A] font-medium leading-relaxed italic opacity-90">
                    {point}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="h-14 px-8 rounded-xl border-2 border-[#1F2D2B] text-[#1F2D2B] group text-[10px] font-black uppercase tracking-widest hover:bg-[#1F2D2B] hover:text-white transition-all">
              Explore Projects <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div className={`${isPip ? 'fixed bottom-4 right-4 w-48 md:w-64 h-28 md:h-36 z-50 shadow-2xl animate-in slide-in-from-bottom-12 rounded-2xl overflow-hidden border border-[#3FB998]/40 bg-black backdrop-blur-2xl' : 'relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out'}`}>
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-scientists-at-work-in-a-laboratory-41312-large.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 p-2.5 bg-white/20 text-white rounded-full backdrop-blur-xl hover:bg-[#3FB998] transition-all z-10 border border-white/20"
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
                    Live Session: Infrastructure Modelling
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* BENEFITS SECTION */}
      <Section gray className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[#FB8500]/5 -skew-x-12 transform translate-x-20"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
          <div className="order-2 lg:order-1 animate-in slide-in-from-left duration-700">
            <div className="aspect-[4/3] bg-white rounded-3xl shadow-xl overflow-hidden relative p-8 flex items-center justify-center border border-[#EEF4F2] group">
              <div className="w-full h-full bg-[#F7FAF9] rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 group-hover:scale-105 transition-transform duration-700">
                <Building2 size={64} className="text-[#1F2D2B]/10" />
                <div className="flex space-x-2">
                  <div className="w-12 h-1 bg-[#3FB998] rounded-full animate-draw"></div>
                  <div className="w-16 h-1 bg-[#1F2D2B] rounded-full animate-draw" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-8 h-1 bg-[#A9E2D2] rounded-full animate-draw" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="text-[#1F2D2B] font-black uppercase tracking-widest text-[8px]">Registry • Alliance • Deployment</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-8 leading-tight italic">
              Ecosystem <br className="hidden md:block" /> Power.
            </h2>
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="bg-[#3FB998]/10 text-[#3FB998] p-2 rounded-lg shrink-0">
                    <CheckCircle size={18} strokeWidth={3} />
                  </div>
                  <p className="text-base md:text-lg text-[#4A5D5A] font-medium leading-relaxed italic opacity-90">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
            <Button className="h-16 px-10 rounded-2xl shadow-xl shadow-[#1F2D2B]/10 font-black uppercase tracking-[0.1em] group transition-all hover:scale-105 bg-[#1F2D2B] text-white">
              View Charter <ChevronRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </Section>

      {/* GRANT PORTALS REGISTRY VIEW */}
      <Section className="py-16 md:py-24">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F7FAF9] text-[#8FA6A1] text-[8px] font-black uppercase tracking-[0.3em] mb-4">
            National Registry
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1F2D2B] uppercase tracking-tighter leading-none italic mb-4">
            Open Grants.
          </h2>
          <p className="text-[#8FA6A1] font-black uppercase tracking-[0.3em] text-[8px]">Live Status Tracker • Research Funds</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {GOV_GRANTS.map((grant, idx) => (
            <div
              key={idx}
              className="group bg-white border border-[#EEF4F2] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between hover:shadow-xl hover:border-transparent transition-all duration-700 cursor-pointer"
            >
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-[#F7FAF9] rounded-xl flex items-center justify-center text-[#1F2D2B] group-hover:bg-[#1F2D2B] group-hover:text-white transition-all">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-black text-[#1F2D2B] uppercase tracking-tighter italic leading-none mb-1">
                    {grant.name}
                  </h4>
                  <p className="text-[8px] font-black text-[#8FA6A1] uppercase tracking-widest">{grant.department} Division</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <Badge status={grant.status} />
                <button className="p-3 bg-[#F7FAF9] rounded-xl text-[#1F2D2B] group-hover:bg-[#3FB998] group-hover:text-white transition-all">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* APPLICATION SECTION */}
      <Section id="apply" gray className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-7xl font-black text-[#1F2D2B] uppercase tracking-tighter leading-none italic mb-6">Join Hub.</h2>
            <p className="text-lg md:text-2xl text-[#F56FF2] font-medium italic opacity-70">Transform national policy through applied intelligence.</p>
          </div>

          <div className="flex flex-wrap justify-center mb-12 gap-3">
            {['Student', 'Researcher', 'Mentor', 'Partner'].map(role => (
              <button
                key={role}
                onClick={() => setFormType(role)}
                className={`px-8 py-3 rounded-xl font-black uppercase tracking-[0.1em] text-[9px] md:text-xs transition-all duration-500 border-2 ${formType === role ? 'bg-[#1F2D2B] text-white border-[#1F2D2B] shadow-lg' : 'bg-transparent border-[#EEF4F2] text-[#8FA6A1] hover:border-[#1F2D2B] hover:text-[#1F2D2B]'}`}
              >
                I am a {role}
              </button>
            ))}
          </div>

          {formType && (
            <div className="bg-white border-2 border-[#EEF4F2] rounded-3xl md:rounded-[3rem] p-8 md:p-16 shadow-2xl animate-in zoom-in-95 duration-700">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-[#1F2D2B] uppercase tracking-tighter italic leading-none">{formType} Enrollment</h3>
                <button onClick={() => setFormType(null)} className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-red-500 transition-colors"><X size={16} /></button>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Identity Name" placeholder="Aakash Kumar" />
                  <Input label="Strategic Domain Skills" placeholder="AI Modeling" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Associated Institution" />
                  <Select label="Preferred Sector" options={['Smart Cities', 'Policy Modeling', 'Infrastructure']} />
                </div>
                <div className="pt-4">
                  <Button fullWidth size="lg" className="h-16 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl bg-[#1F2D2B] text-white hover:bg-[#3FB998] transition-all">
                    Submit Proposal
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Section>

      {/* FOOTER CALL TO ACTION */}
      <Section className="bg-[#1F2D2B] text-white py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#000459] pointer-events-none "></div>

        <div className="relative z-10 px-6">
          <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.8] italic drop-shadow-xl">
            Build <br className="hidden md:block" /> Impact.
          </h2>
          <p className="text-lg md:text-3xl text-blue-100/70 max-w-4xl mx-auto mb-14 font-medium italic leading-relaxed opacity-90">
            Secure collaborative research opportunities with national organizations.
          </p>
          <Button size="lg" className="h-16 md:h-20 px-12 md:px-24 rounded-full text-base md:text-2xl shadow-2xl shadow-black/40 font-black uppercase tracking-[0.1em] bg-[#3FB998] hover:bg-white hover:text-[#1F2D2B] transition-all duration-500 hover:scale-105 active:scale-95">
            Join NX Gov_Hub
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default GovResearch;
