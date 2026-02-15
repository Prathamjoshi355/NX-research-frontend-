
import React, { useState, useEffect, useRef } from 'react';
import { Section, Card, Button } from '../components/Common';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, X, Users, Rocket, 
  Volume2, VolumeX, Calendar, ArrowRight,
  Layers, MapPin, Info, Image as ImageIcon
} from 'lucide-react';

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

const PhotoCollage = ({ images, title }: { images: string[], title: string }) => (
  <div className="relative w-full h-[600px] flex items-center justify-center animate-in fade-in zoom-in duration-1000">
    {/* Staggered "Polaroid" style grid */}
    <div className="relative w-full h-full max-w-2xl">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-8 border-white -rotate-6 hover:rotate-0 transition-transform duration-500 z-10">
        <img src={images[0]} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="absolute top-10 right-0 w-72 h-80 rounded-3xl overflow-hidden shadow-2xl border-8 border-white rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
        <img src={images[1]} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="absolute bottom-10 left-10 w-80 h-72 rounded-3xl overflow-hidden shadow-2xl border-8 border-white rotate-6 hover:rotate-0 transition-transform duration-500 z-30">
        <img src={images[2]} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="absolute bottom-0 right-10 w-60 h-60 rounded-3xl overflow-hidden shadow-2xl border-8 border-white -rotate-3 hover:rotate-0 transition-transform duration-500 z-0 opacity-80">
        <img src={images[3]} className="w-full h-full object-cover" alt="" />
      </div>
      
      {/* Decorative label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-xl text-white px-8 py-3 rounded-full border border-white/10 shadow-2xl z-40">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap">Gallery Proof • {title}</span>
      </div>
    </div>
  </div>
);

const Summit = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [isPip, setIsPip] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
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
      images: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800'
      ],
      details: [
        { label: 'KEY HIGHLIGHT', val: 'STUDENT-TO-VENTURE TRANSFORMATION MODEL INTRODUCED.' },
        { label: 'OUTCOMES', val: '12 STARTUPS FUNDED, 45 MENTORSHIP PAIRS ESTABLISHED.' },
        { label: 'LOCATION', val: 'IISC INCUBATION CENTER' }
      ]
    },
    {
      id: 'fcc-2',
      title: 'FCC 2.o',
      tagline: 'Scaling Horizons - Western India Expansion.',
      city: 'MUMBAI',
      date: 'JAN 2023',
      status: 'Past',
      images: [
        'https://images.unsplash.com/photo-1591115765373-520b7a0572e3?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1505373630562-402923ad99b1?auto=format&fit=crop&q=80&w=800'
      ],
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
      images: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=800'
      ],
      details: [
        { label: 'KEY HIGHLIGHT', val: 'FOCUS ON AI SAFETY & SUSTAINABLE INFRASTRUCTURE.' },
        { label: 'OUTCOMES', val: '500+ ATTENDEES, TOP VC FIRMS PARTICIPATING.' },
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
      images: [
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
      ],
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
      setIsPip(rect.bottom < 0);
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

  return (
    <div className="animate-in fade-in duration-700 bg-[#F7FAF9]">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-[#0A1211]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F2D2B]/90 via-transparent to-[#0A1211] z-[2]"></div>
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
          
          <div className="h-[124px] md:h-[280px] flex items-center justify-center mb-8 md:mb-12 overflow-hidden">
            <h1 className="text-2xl md:text-4xl lg:text-7xl font-black text-white leading-[0.8] tracking-tighter italic uppercase">
              <span key={heroIndex} className="block animate-heroText whitespace-pre-wrap px-4">
                {heroTexts[heroIndex]}
              </span>
            </h1>
          </div>

          <p className="text-base md:text-3xl text-[#EEF4F2]/80 max-w-4xl mx-auto mb-12 md:mb-20 leading-relaxed font-semibold italic">
            Connecting students, startups, investors, and mentors under one high-octane platform.
          </p>

          <div className="flex justify-center">
            <Button size="lg" className="h-16 md:h-20 px-12 md:px-24 rounded-full shadow-2xl shadow-[#3FB998]/20 font-black uppercase tracking-[0.25em] text-xs md:text-sm hover:scale-105 active:scale-95 transition-all" onClick={() => navigate('/registration')}>
              Register Now
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTENT */}
      <Section className="py-32 bg-white" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-7xl font-black text-[#1F2D2B] uppercase tracking-tighter leading-none italic">
              What is <span className="text-[#3FB998]">FCC</span>?
            </h2>
            <p className="text-xl md:text-2xl text-[#4A5D5A] leading-relaxed font-medium italic">
              Entry-based ecosystem where ideas are judged on architectural merit, not seniority.
            </p>
            <div className="space-y-8">
              {[
                { title: 'Global Registry', desc: 'Direct mapping to international venture pools.', icon: Users },
                { title: 'Rapid Prototyping', desc: 'From conversation to code in 48 hours.', icon: Rocket }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-6">
                  <div className="bg-[#3FB998]/10 p-4 rounded-2xl text-[#3FB998] shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#1F2D2B] uppercase tracking-widest text-xs mb-1">{item.title}</h4>
                    <p className="text-[#4A5D5A] italic">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video rounded-[3.5rem] overflow-hidden shadow-3xl bg-black">
             <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-70">
               <source src="https://assets.mixkit.co/videos/preview/mixkit-business-people-walking-in-a-hallway-4433-large.mp4" type="video/mp4" />
             </video>
             <button onClick={toggleMute} className="absolute bottom-6 right-6 p-3 bg-white/20 text-white rounded-full backdrop-blur-xl hover:bg-[#3FB998] transition-all">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
             </button>
          </div>
        </div>
      </Section>

      {/* SECTION 3: MATRIX */}
      <Section gray className="py-40">
        <SectionHeader 
          badge="Innovation Tracker" 
          title="FCC Matrix." 
          subtitle="Explore the legacy of India's most intensive innovation convergence." 
        />
        <div className="flex flex-col gap-16 items-center">
            {/* Summit Selection Bar */}
            <div className="w-full flex overflow-x-auto pb-8 gap-6 no-scrollbar justify-center">
              {summitHistory.map(summit => (
                <button 
                  key={summit.id} 
                  onClick={() => setActiveSummit(summit.id)} 
                  className={`flex-shrink-0 w-64 p-6 rounded-[2.5rem] border-2 transition-all duration-500 text-center relative group ${activeSummit === summit.id ? 'bg-[#1F2D2B] border-[#3FB998] shadow-2xl scale-105' : 'bg-white border-transparent hover:border-[#EEF4F2]'}`}
                >
                  <div className={`absolute top-4 right-6 w-2 h-2 rounded-full ${activeSummit === summit.id ? 'bg-[#3FB998] animate-pulse' : 'bg-transparent'}`}></div>
                  <Calendar size={24} className={`mx-auto mb-4 ${activeSummit === summit.id ? 'text-[#3FB998]' : 'text-[#8FA6A1]'}`} />
                  <span className={`block text-xl font-black uppercase italic tracking-tighter ${activeSummit === summit.id ? 'text-white' : 'text-[#8FA6A1]'}`}>{summit.title}</span>
                  <span className={`block text-[8px] font-black uppercase tracking-widest mt-1 ${activeSummit === summit.id ? 'text-[#3FB998]' : 'text-slate-300'}`}>{summit.status} Event</span>
                </button>
              ))}
            </div>

            {/* Split Screen Matrix */}
            <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Details Column */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-[#EEF4F2] relative shadow-3xl flex flex-col min-h-[650px] animate-in fade-in slide-in-from-left-8 duration-700">
                        <CornerBrackets />
                        <div className="relative z-10 space-y-10">
                            <div className="flex justify-between items-center">
                                <h3 className="text-6xl font-black text-[#1F2D2B] tracking-tighter uppercase italic">{activeSummitData?.title}</h3>
                                {activeSummitData?.status === 'Upcoming' && (
                                    <span className="bg-[#3FB998] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest animate-pulse flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                                        LIVE SOON
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4 text-[#8FA6A1] font-black uppercase text-xs tracking-widest">
                                <MapPin size={16} className="text-[#3FB998]" /> {activeSummitData?.city} • {activeSummitData?.date}
                            </div>
                            <p className="text-[#4A5D5A] font-bold italic text-lg leading-relaxed border-l-4 border-[#3FB998] pl-6">
                                "{activeSummitData?.tagline}"
                            </p>
                            <div className="space-y-6">
                                {activeSummitData?.details.map((item, i) => (
                                    <div key={i} className="bg-[#F7FAF9] p-8 rounded-[2rem] border border-[#EEF4F2] hover:bg-[#3FB998]/5 transition-colors group">
                                        <h4 className="text-[10px] font-black text-[#3FB998] uppercase tracking-[0.3em] mb-2">{item.label}</h4>
                                        <p className="text-lg font-black text-[#1F2D2B] uppercase tracking-tight leading-tight group-hover:text-[#3FB998] transition-colors">{item.val}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-6">
                                <Button fullWidth onClick={() => navigate('/registration')} className="h-20 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] transition-transform">
                                    {activeSummitData?.status === 'Upcoming' ? 'Secure Strategic Seat' : 'Review Outcome Report'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Collage Column */}
                <div className="lg:col-span-7 order-1 lg:order-2" key={activeSummitData?.id}>
                    {activeSummitData && (
                        <PhotoCollage images={activeSummitData.images} title={activeSummitData.title} />
                    )}
                </div>
            </div>
        </div>
      </Section>

      {/* SECTION 4: CTA */}
      <Section className="bg-[#1F2D2B] text-white py-48 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#000459] pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-[10rem] font-black mb-12 tracking-tighter uppercase leading-[0.8] italic drop-shadow-2xl">
            Join the <br /> Circle.
          </h2>
          <p className="text-2xl md:text-3xl font-bold italic mb-20 max-w-2xl mx-auto opacity-90">
            FCC 4.o is the next evolution of student research. Secure your strategic seat now.
          </p>
          <Button size="lg" className="h-20 px-16 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-7xl " onClick={() => navigate('/registration')}>
            Join Waitlist
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default Summit;
