
import React, { useState, useEffect, useRef } from 'react';
import { Section, Card, Button, Input, Select } from '../components/Common';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, X, Users, Rocket, Wallet, HeartHandshake,
  ShieldCheck, Volume2, VolumeX, Calendar, ArrowRight,
  ChevronRight, PlayCircle, Trophy, Target, Sparkles,
  Layers, MapPin, Star
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
    <p className="text-[#4A5D5A] font-medium text-lg md:text-xl max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);

const CornerBrackets = () => (
  <>
    <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#3FB998]/20 rounded-tl-2xl"></div>
    <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#3FB998]/20 rounded-br-2xl"></div>
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
    "Founders's Circle Connect",
    "Where Ideas Meet Capital",
    "The Elite Founder Network",
    "Connect • Pitch • Scale"
  ];

  const summitHistory = [
    {
      id: 'fcc-1',
      title: 'FCC 1.o',
      tagline: 'The Genesis - Setting the foundation for founder-investor synergy.',
      city: 'Bangalore',
      date: 'June 2022',
      status: 'Past',
      details: [
        { label: 'Key Highlight', val: 'Student-to-Venture transformation model introduced.' },
        { label: 'Outcomes', val: '12 Startups funded, 45 Mentorship pairs established.' },
        { label: 'Location', val: 'IISC Incubation Center' }
      ]
    },
    {
      id: 'fcc-2',
      title: 'FCC 2.o',
      tagline: 'Scaling Horizons - Expanding the network to Western India.',
      city: 'Mumbai',
      date: 'Jan 2023',
      status: 'Past',
      details: [
        { label: 'Key Highlight', val: 'Gov-Tech Track launched with Ministry presence.' },
        { label: 'Outcomes', val: '₹4.5Cr Pledged in initial rounds, 100+ Live Prototypes.' },
        { label: 'Location', val: 'The Lalit IT Park' }
      ]
    },
    {
      id: 'fcc-3',
      title: 'FCC 3.o',
      tagline: 'The Expansion - Converging in the National Capital.',
      city: 'Delhi',
      date: 'Upcoming',
      status: 'Upcoming',
      details: [
        { label: 'Key Highlight', val: 'Focus on AI Safety & Sustainable Infrastructure.' },
        { label: 'Outcomes', val: 'Anticipated 500+ attendees, Top VC firms participating.' },
        { label: 'Location', val: 'India Habitat Centre' }
      ]
    },
    {
      id: 'fcc-4',
      title: 'FCC 4.o',
      tagline: 'Future Forward - The Next Evolution of Student Research.',
      city: 'TBD',
      date: 'Late 2024',
      status: 'Upcoming',
      details: [
        { label: 'Key Highlight', val: 'NX Research Proprietary Fund Launch.' },
        { label: 'Outcomes', val: 'Waitlist open for early registrations.' },
        { label: 'Location', val: 'TBD' }
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
    <div className="animate-in fade-in duration-700 bg-white">

      {/* SECTION 1: HERO */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/95 z-[2]"></div>
        <div className="absolute inset-0 z-[1] opacity-70">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover grayscale brightness-50"
            alt="FCC Summit background"
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl px-6">
          <div className="mb-6 md:mb-12 inline-flex items-center px-6 py-2 rounded-full bg-[#3FB998]/20 border border-[#3FB998]/40 text-[#3FB998] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] backdrop-blur-md">
            Founders's Circle Connect (FCC)
          </div>

          <div className="h-[120px] md:h-[280px] flex items-center justify-center mb-8 md:mb-12 overflow-hidden">
            <h1 className="text-3xl md:text-7xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter text-shadow-hero">
              <span key={heroIndex} className="block animate-heroText whitespace-pre-wrap px-4 italic">
                {heroTexts[heroIndex]}
              </span>
            </h1>
          </div>

          <p className="text-base md:text-3xl text-gray-200 max-w-4xl mx-auto mb-12 md:mb-20 leading-relaxed font-semibold drop-shadow-2xl opacity-90">
            A collaborative innovation meet connecting students, startups, investors, and mentors under one roof.
          </p>

          <div className="flex justify-center">
            <Button size="lg" className="h-16 md:h-20 px-12 md:px-20 rounded-[2rem] shadow-2xl shadow-[#3FB998]/30 font-black uppercase tracking-[0.2em] text-sm hover:scale-105 active:scale-95 transition-all" onClick={handleRegisterClick}>
              Register Now
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT IS FCC? */}
      <Section className="py-24 md:py-32" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-7xl font-black text-[#1F2D2B] uppercase tracking-tighter leading-none italic mb-8">
                What is <span className="text-[#3FB998]">FCC</span>?
              </h2>
              <p className="text-xl md:text-2xl text-[#4A5D5A] leading-relaxed font-medium">
                Founders's Circle Connect (FCC) is NX Research's flagship innovation meet. It's more than just a summit; it's an entry-based ecosystem where students, startup founders, mentors, and investors meet on an equal platform.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <div className="bg-[#3FB998]/10 p-3 rounded-2xl text-[#3FB998] shrink-0"><CheckCircle size={24} /></div>
                <p className="text-lg text-[#8FA6A1] leading-relaxed"><span className="font-bold text-[#1F2D2B]">Collaboration First:</span> We remove the barriers between aspiring researchers and industry giants.</p>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-[#3FB998]/10 p-3 rounded-2xl text-[#3FB998] shrink-0"><Layers size={24} /></div>
                <p className="text-lg text-[#8FA6A1] leading-relaxed"><span className="font-bold text-[#1F2D2B]">Zero Hierarchy:</span> Every idea is judged on merit, whether it comes from a first-year student or a veteran founder.</p>
              </div>
            </div>

            <Button size="lg" variant="outline" className="rounded-2xl border-[#1F2D2B]/10 h-16">Download Brochure</Button>
          </div>

          <div className="relative group h-full flex items-center">
            <div className={`${isPip ? 'fixed bottom-8 right-8 w-64 md:w-80 h-36 md:h-48 z-50 shadow-3xl animate-in slide-in-from-bottom-10 rounded-2xl overflow-hidden border-2 border-[#3FB998]/20 bg-black' : 'relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500'}`}>
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
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
              <div className="absolute inset-0 bg-[#1F2D2B]/5 rounded-[3rem] -z-10 translate-x-6 translate-y-6"></div>
            )}
          </div>
        </div>
      </Section>

      {/* SECTION 3: FCC HISTORY MATRIX (Horizontal List + Vertical Card) */}
      <Section gray className="py-32 md:py-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="Matrix"
            title="FCC Evolution."
            subtitle="Explore the journey of our innovation ecosystem across India's tech hubs."
          />

          <div className="flex flex-col gap-12 items-center">
            {/* Horizontal Summit Selection List */}
            <div className="w-full flex overflow-x-auto pb-6 gap-6 no-scrollbar justify-start md:justify-center px-2">
              {summitHistory.map(summit => (
                <button
                  key={summit.id}
                  onClick={() => setActiveSummit(summit.id)}
                  className={`flex-shrink-0 px-8 py-6 rounded-[2rem] border transition-all text-left flex items-center space-x-4 ${activeSummit === summit.id ? 'bg-white border-[#3FB998]/50 shadow-xl scale-105' : 'bg-transparent border-black/5 hover:bg-white/40'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeSummit === summit.id ? 'bg-[#1F2D2B] text-white rotate-6 shadow-md' : 'bg-white/50 text-[#8FA6A1]'}`}>
                    <Calendar size={22} />
                  </div>
                  <div>
                    <span className={`block text-xl font-black uppercase italic tracking-tighter ${activeSummit === summit.id ? 'text-[#1F2D2B]' : 'text-[#8FA6A1]'}`}>
                      {summit.title}
                    </span>
                    <span className="text-[9px] font-black text-[#8FA6A1] uppercase tracking-widest">{summit.city}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Vertical Rectangular Detail Card */}
            <div className="w-full max-w-xl bg-white rounded-[4rem] p-10 md:p-16 border border-black/5 relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 aspect-[3/4] md:aspect-[4/5] flex flex-col">
              <CornerBrackets />
              <div className="space-y-10 relative z-10 flex flex-col h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-5xl font-black text-[#1F2D2B] tracking-tighter uppercase leading-none italic">{activeSummitData?.title}</h3>
                    {activeSummitData?.status === 'Upcoming' && (
                      <span className="bg-[#3FB998] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">Waitlist</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-[#8FA6A1] font-black uppercase tracking-widest text-[11px]">
                    <MapPin size={14} className="text-[#3FB998]" />
                    <span>{activeSummitData?.city}</span>
                    <span>•</span>
                    <span>{activeSummitData?.date}</span>
                  </div>
                  <p className="text-[#4A5D5A] text-lg font-medium italic leading-relaxed pt-2">{activeSummitData?.tagline}</p>
                </div>

                <div className="flex-grow space-y-6">
                  {activeSummitData?.details.map((item, i) => (
                    <div key={i} className="bg-gray-50/80 backdrop-blur-sm border border-black/5 p-6 rounded-3xl group hover:border-[#3FB998]/30 transition-all">
                      <h4 className="text-[9px] font-black text-[#3FB998] uppercase tracking-[0.3em] mb-1">{item.label}</h4>
                      <p className="text-base font-black text-[#1F2D2B] uppercase tracking-tight leading-snug">{item.val}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <Button
                    fullWidth
                    onClick={activeSummitData?.status === 'Upcoming' ? handleRegisterClick : undefined}
                    className={`h-20 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-xl transition-all ${activeSummitData?.status === 'Upcoming' ? 'bg-[#1F2D2B]' : 'bg-[#3FB998]'}`}
                  >
                    {activeSummitData?.status === 'Upcoming' ? 'Secure Your Seat' : 'View Impact Report'}
                  </Button>
                </div>
              </div>
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3FB998]/5 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER CTA */}
      <Section className="bg-[#1F2D2B] text-white py-32 md:py-48 text-center relative overflow-hidden">
        <div className="relative z-10 px-6">
          <h2 className="text-5xl md:text-[10rem] font-black mb-10 tracking-tighter uppercase leading-[0.8] italic">
            Claim Your <br className="hidden md:block" /> Seat.
          </h2>
          <p className="text-xl md:text-3xl text-blue-100/70 max-w-2xl mx-auto mb-16 font-medium italic">
            FCC 3.o is coming soon. Don't miss the opportunity to meet India's most innovative student founders.
          </p>
          <Button size="lg" className="h-20 md:h-28 px-16 md:px-32 rounded-full text-xl md:text-3xl shadow-3xl shadow-black/40 font-black uppercase tracking-[0.2em] bg-[#3FB998] hover:bg-white hover:text-[#1F2D2B]" onClick={handleRegisterClick}>
            Join FCC 3.o Waitlist
          </Button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full animate-pulse"></div>
        </div>
      </Section>
    </div>
  );
};

export default Summit;
