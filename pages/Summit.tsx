
import React, { useState, useEffect, useRef } from 'react';
import { Section, Card, Button } from '../components/Common';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, X, Users, Rocket, 
  Volume2, VolumeX, Calendar, ArrowRight,
  Layers, MapPin, Info
} from 'lucide-react';

// Internal helper components for the Matrix design
const SectionHeader = ({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) => (
  <div className="mb-12 md:mb-20 text-center">
    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#3FB998]/10 border border-[#3FB998]/20 text-[#3FB998] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
      {badge}
    </div>
    <h2 className="text-4xl md:text-7xl font-black text-[#1F2D2B] uppercase tracking-tighter leading-none italic mb-6">
      {title}
    </h2>
    <p className="text-[#4A5D5A] font-medium text-lg md:text-xl max-w-2xl mx-auto italic">
      {subtitle}
    </p>
  </div>
);

const CornerBrackets = () => (
  <>
    <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#3FB998]/30 rounded-tl-[2rem]"></div>
    <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#3FB998]/30 rounded-br-[2rem]"></div>
  </>
);

const Summit = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [isPip, setIsPip] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Summit Matrix State
  const [activeSummit, setActiveSummit] = useState('fcc-1');

  const heroTexts = [
    "Founder Circle Connect",
    "Where Ideas Meet Capital",
    "The Elite Founder Network",
    "Connect • Pitch • Scale"
  ];

  const summitHistory = [
    {
      id: 'fcc-1',
      title: 'FCC 1.o',
      tagline: 'The Genesis - Setting the foundation for founder-investor synergy.',
      city: 'BANGALORE',
      date: 'JUNE 2022',
      status: 'Past',
      details: [
        { label: 'KEY HIGHLIGHT', val: 'STUDENT-TO-VENTURE TRANSFORMATION MODEL INTRODUCED.' },
        { label: 'OUTCOMES', val: '12 STARTUPS FUNDED, 45 MENTORSHIP PAIRS ESTABLISHED.' },
        { label: 'LOCATION', val: 'IISC INCUBATION CENTER' }
      ]
    },
    {
      id: 'fcc-2',
      title: 'FCC 2.o',
      tagline: 'Scaling Horizons - Expanding the network to Western India.',
      city: 'MUMBAI',
      date: 'JAN 2023',
      status: 'Past',
      details: [
        { label: 'KEY HIGHLIGHT', val: 'GOV-TECH TRACK LAUNCHED WITH MINISTRY PRESENCE.' },
        { label: 'OUTCOMES', val: '₹4.5CR PLEDGED IN INITIAL ROUNDS, 100+ LIVE PROTOTYPES.' },
        { label: 'LOCATION', val: 'THE LALIT IT PARK' }
      ]
    },
    {
      id: 'fcc-3',
      title: 'FCC 3.o',
      tagline: 'The Expansion - Converging in the National Capital.',
      city: 'DELHI',
      date: 'OCT 2023',
      status: 'Past',
      details: [
        { label: 'KEY HIGHLIGHT', val: 'FOCUS ON AI SAFETY & SUSTAINABLE INFRASTRUCTURE.' },
        { label: 'OUTCOMES', val: 'ANTICIPATED 500+ ATTENDEES, TOP VC FIRMS PARTICIPATING.' },
        { label: 'LOCATION', val: 'INDIA HABITAT CENTRE' }
      ]
    },
    {
      id: 'fcc-4',
      title: 'FCC 4.o',
      tagline: 'Future Forward - The Next Evolution of Student Research.',
      city: 'TBD',
      date: 'LATE 2024',
      status: 'Upcoming',
      details: [
        { label: 'KEY HIGHLIGHT', val: 'NX RESEARCH PROPRIETARY FUND LAUNCH.' },
        { label: 'OUTCOMES', val: 'WAITLIST OPEN FOR EARLY REGISTRATIONS.' },
        { label: 'LOCATION', val: 'NATIONAL VENUE PENDING' }
      ]
    }
  ];

  const activeSummitData = summitHistory.find(s => s.id === activeSummit);

  useEffect(() => {
    const timer = setInterval(() => {
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
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroTexts.length]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  return (
    <div className="animate-in fade-in duration-700 bg-[#F7FAF9]">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-[#1F2D2B]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F2D2B]/90 via-transparent to-[#1F2D2B] z-[2]"></div>
        <div className="absolute inset-0 z-[1] opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover grayscale brightness-50"
            alt="FCC Summit background"
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl px-6">
          <div className="mb-6 md:mb-12 inline-flex items-center px-6 py-2 rounded-full bg-[#3FB998]/10 border border-[#3FB998]/30 text-[#3FB998] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] backdrop-blur-md">
            Founder Circle Connect (FCC)
          </div>
          
          <div className="h-[120px] md:h-[280px] flex items-center justify-center mb-8 md:mb-12 overflow-hidden">
            <h1 className="text-3xl md:text-7xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter italic">
              <span key={heroIndex} className="block animate-heroText whitespace-pre-wrap px-4">
                {heroTexts[heroIndex]}
              </span>
            </h1>
          </div>

          <p className="text-base md:text-3xl text-[#EEF4F2]/80 max-w-4xl mx-auto mb-12 md:mb-20 leading-relaxed font-semibold italic">
            A collaborative innovation meet connecting students, startups, investors, and mentors under one roof.
          </p>

          <div className="flex justify-center">
            <Button size="lg" className="h-16 md:h-20 px-12 md:px-20 rounded-full shadow-2xl shadow-[#3FB998]/20 font-black uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95 transition-all" onClick={handleRegisterClick}>
              Register Now
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT IS FCC? */}
      <Section className="py-24 md:py-32 bg-white" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-7xl font-black text-[#1F2D2B] uppercase tracking-tighter leading-none italic mb-8">
                What is <span className="text-[#3FB998]">FCC</span>?
              </h2>
              <p className="text-xl md:text-2xl text-[#4A5D5A] leading-relaxed font-medium">
                Founder Circle Connect (FCC) is NX Research's flagship innovation meet. It's an entry-based ecosystem where students, startup founders, mentors, and investors meet on an equal platform.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <div className="bg-[#3FB998]/10 p-3 rounded-2xl text-[#3FB998] shrink-0"><CheckCircle size={24} /></div>
                <p className="text-lg text-[#4A5D5A] leading-relaxed italic"><span className="font-bold text-[#1F2D2B]">Collaboration First:</span> We remove the barriers between aspiring researchers and industry giants.</p>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-[#3FB998]/10 p-3 rounded-2xl text-[#3FB998] shrink-0"><Layers size={24} /></div>
                <p className="text-lg text-[#4A5D5A] leading-relaxed italic"><span className="font-bold text-[#1F2D2B]">Zero Hierarchy:</span> Every idea is judged on merit, whether it comes from a student or a veteran founder.</p>
              </div>
            </div>

            <Button size="lg" variant="outline" className="rounded-2xl border-[#1F2D2B]/10 h-16 px-10">Download Brochure</Button>
          </div>

          <div className="relative group h-full flex items-center">
            <div className={`${isPip ? 'fixed bottom-8 right-8 w-64 md:w-80 h-36 md:h-48 z-50 shadow-3xl animate-in slide-in-from-bottom-10 rounded-2xl overflow-hidden border-2 border-[#3FB998]/20 bg-[#1F2D2B]' : 'relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500'}`}>
              <video 
                ref={videoRef}
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-500"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-business-people-walking-in-a-hallway-4433-large.mp4" type="video/mp4" />
              </video>
              <button 
                onClick={toggleMute}
                className="absolute bottom-4 right-4 p-2 bg-black/50 text-white rounded-full backdrop-blur-md hover:bg-[#3FB998] transition-colors"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              {isPip && (
                 <button 
                  onClick={() => setIsPip(false)}
                  className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {!isPip && (
              <div className="absolute inset-0 bg-[#3FB998]/5 rounded-[3rem] -z-10 translate-x-6 translate-y-6"></div>
            )}
          </div>
        </div>
      </Section>

      {/* SECTION 3: FCC HISTORY MATRIX (Updated to match design) */}
      <Section gray className="py-24 md:py-40 relative overflow-hidden bg-[#F7FAF9]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            badge="Innovation Matrix" 
            title="FCC Evolution." 
            subtitle="Explore the journey of our innovation ecosystem across India's premier tech hubs." 
          />
          
          <div className="flex flex-col gap-12 items-center">
            {/* Horizontal Summit Selection Cards */}
            <div className="w-full flex overflow-x-auto pb-8 gap-6 no-scrollbar snap-x snap-mandatory px-4 justify-start md:justify-center">
              {summitHistory.map(summit => {
                const isSelected = activeSummit === summit.id;
                return (
                  <button 
                    key={summit.id} 
                    onClick={() => setActiveSummit(summit.id)} 
                    className={`flex-shrink-0 w-64 snap-center p-6 rounded-[2.5rem] border-2 transition-all duration-500 text-left flex flex-col items-center justify-center space-y-3 ${isSelected ? 'bg-white border-[#3FB998] shadow-2xl scale-105' : 'bg-white/40 border-transparent hover:border-[#EEF4F2]'}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-[#1F2D2B] text-white shadow-xl rotate-3' : 'bg-[#EEF4F2] text-[#8FA6A1]'}`}>
                      <Calendar size={24} />
                    </div>
                    <div className="text-center">
                      <span className={`block text-xl font-black uppercase italic tracking-tighter leading-none mb-1 ${isSelected ? 'text-[#1F2D2B]' : 'text-[#8FA6A1]'}`}>
                        {summit.title}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isSelected ? 'text-[#3FB998]' : 'text-[#8FA6A1]/60'}`}>
                        {summit.city}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Vertical Detail Card (The "Main" UI focus) */}
            <div className="w-full max-w-2xl bg-white rounded-[3.5rem] p-10 md:p-16 border border-[#EEF4F2] relative overflow-hidden shadow-3xl animate-in zoom-in-95 duration-700 min-h-[700px] flex flex-col">
              <CornerBrackets />
              
              <div className="space-y-12 relative z-10 flex flex-col h-full">
                {/* Header Section of Card */}
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-6xl md:text-7xl font-black text-[#1F2D2B] tracking-tighter uppercase italic leading-none">{activeSummitData?.title}</h3>
                    {activeSummitData?.status === 'Upcoming' && (
                       <span className="bg-[#3FB998] text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest animate-pulse shadow-lg shadow-[#3FB998]/20">Waitlist Open</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-[#8FA6A1] font-black uppercase tracking-widest text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#3FB998]" />
                      <span>{activeSummitData?.city}</span>
                    </div>
                    <span className="text-[#EEF4F2]">•</span>
                    <span>{activeSummitData?.date}</span>
                  </div>
                  
                  <p className="text-[#4A5D5A] text-lg md:text-xl font-medium italic leading-relaxed pt-2 border-l-4 border-[#EEF4F2] pl-6">
                    {activeSummitData?.tagline}
                  </p>
                </div>

                {/* Content Boxes */}
                <div className="flex-grow space-y-5">
                  {activeSummitData?.details.map((item, i) => (
                    <div key={i} className="bg-[#F7FAF9]/80 backdrop-blur-md border border-[#EEF4F2] p-8 rounded-[2rem] group hover:border-[#3FB998]/40 transition-all duration-300">
                      <h4 className="text-[10px] font-black text-[#3FB998] uppercase tracking-[0.4em] mb-2">{item.label}</h4>
                      <p className="text-base md:text-lg font-black text-[#1F2D2B] uppercase tracking-tight leading-tight">{item.val}</p>
                    </div>
                  ))}
                </div>
                
                {/* Call to Action on Card */}
                <div className="pt-10">
                  <Button 
                    fullWidth
                    onClick={activeSummitData?.status === 'Upcoming' ? handleRegisterClick : undefined}
                    className={`h-20 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-xl transition-all hover:-translate-y-1 ${activeSummitData?.status === 'Upcoming' ? 'bg-[#1F2D2B] text-white' : 'bg-[#3FB998] text-white'}`}
                  >
                    {activeSummitData?.status === 'Upcoming' ? 'Secure Strategic Seat' : 'Review Outcome Report'}
                  </Button>
                </div>
              </div>

              {/* Subtle Decorative Gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3FB998]/5 rounded-full blur-[100px] -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-full h-4 bg-[#3FB998]"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER CTA */}
      <Section className="bg-[Green] text-White py-32 md:py-48 text-center relative overflow-hidden">
        <div className="relative z-10 px-6">
          <h2 className="text-5xl md:text-[10rem] font-black mb-10 tracking-tighter uppercase leading-[0.8] italic">
            Claim Your <br className="hidden md:block" /> Seat.
          </h2>
          <p className="text-xl md:text-3xl text-[#8FA6A1] max-w-2xl mx-auto mb-16 font-medium italic leading-relaxed">
            FCC 4.o is architecting the next era of applied research. Secure your connection with the nation's elite innovators.
          </p>
          <Button size="lg" className="h-20 md:h-28 px-16 md:px-32 rounded-full text-xl md:text-3xl shadow-3xl shadow-black/40 font-black uppercase tracking-[0.2em] bg-[#3FB998] hover:bg-white hover:text-[#1F2D2B]" onClick={handleRegisterClick}>
            Join Waitlist Now
          </Button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </Section>
    </div>
  );
};

export default Summit;
