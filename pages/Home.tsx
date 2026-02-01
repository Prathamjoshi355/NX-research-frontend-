
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Briefcase, 
  BookOpen, 
  Users, 
  Zap, 
  ArrowRight, 
  Trophy, 
  Microscope,
  Video
} from "lucide-react";
import { Section, Card, Button } from "../components/Common";

interface DomainCardProps {
  name: string;
  desc: string;
  path: string;
  img: string;
  videoUrl: string;
  className?: string;
}

const DomainCard: React.FC<DomainCardProps> = ({ name, desc, path, img, videoUrl, className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video playback blocked"));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link 
      to={path}
      className={`relative group overflow-hidden rounded-[3rem] aspect-square md:aspect-video w-full cursor-pointer transition-all duration-500 shadow-xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static Image */}
      <img 
        src={img} 
        alt={name}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Background Video */}
      <video 
        ref={videoRef}
        muted 
        loop 
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 z-0 ${isHovered ? 'opacity-100 blur-[6px] scale-105' : 'opacity-100'}`}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Overlay for Contrast */}
      <div className={`absolute inset-0 bg-black/60 transition-opacity duration-100 z-20 ${isHovered ? 'opacity-30' : 'opacity-10'}`}></div>

      {/* Content Overlay */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 z-30 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4 text-shadow-lg">
          {name}
        </h3>
        <p className="text-white/80 font-medium text-sm md:text-base max-w-xs uppercase tracking-widest leading-tight">
          {desc}
        </p>
        <div className="mt-6 w-12 h-1 bg-[#FB8500] rounded-full"></div>
      </div>

      {/* Name visible when NOT hovered (Optional, but looks clean) */}
      {!isHovered && (
        <div className="absolute bottom-10 left-10 z-20">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter text-shadow-lg bg-[#0A2463]/80 px-4 py-1 rounded-lg">
            {name}
          </h3>
        </div>
      )}
    </Link>
  );
};

const Home = () => {
  const [index, setIndex] = useState(0);
  const texts = [
    "NX Research",
    "Student-Powered Applied Research",
    "Where Students Become Researchers",
    "Build • Test • Solve • Deploy"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* ================================================= */}
      {/* SECTION 1: HERO */}
      {/* ================================================= */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-[2]"></div>
        <div className="absolute inset-0 z-[1] opacity-50">
        <video src="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1769957661/jige_xz8rn1.mp4" 
        muted 
        loop 
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 z-0 `}></video>
        </div>

        <div className="relative z-10 text-center max-w-6xl px-6">
          <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-[#FB8500]/10 border border-[#FB8500]/30 text-[#FB8500] text-[10px] font-black uppercase tracking-[0.3em]">
            India's Elite Student Research Org
          </div>
          
          <div className="h-[160px] md:h-[240px] flex items-center justify-center mb-8 overflow-hidden">
            <h1 className="text-2xl md:text-6xl lg:text-7xl font-black text-white leading-[0.85] tracking-tighter text-shadow-lg">
              <span key={index} className="block animate-heroText whitespace-pre-wrap px-4">
                {texts[index]}
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
            We build independent problem-solvers through student-driven research and real-world implementation.
          </p>

        </div>
      </section>

      {/* ================================================= */}
      {/* SECTION 2: DOMAINS (Simplified Custom Grid) */}
      {/* ================================================= */}
      <Section className="py-24 bg-white overflow-hidden">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-[#0A2463] uppercase tracking-tighter mb-4 leading-none">Our Domains</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Innovation Ecosystem • Hover to Explore</p>
        </div>

        <div className="flex flex-col space-y-10 max-w-7xl mx-auto">
          {/* Row 1: NX Meet (Centered) */}
          <div className="flex justify-center">
            <DomainCard 
              name="NX Meet" 
              desc="Startup & Innovation Summit connecting students, mentors, and investors."
              path="/summit"
              img="https://images.unsplash.com/photo-1540575861501-7ad05823c95b?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1769957661/jige_xz8rn1.mp4"
              className="md:max-w-3xl"
            />
          </div>

          {/* Row 2: 3 Columns (Gov, Private, Initiative) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
            <DomainCard 
              name="Government Research" 
              desc="Solving national infrastructure and public sector challenges."
              path="/government"
              img="https://images.unsplash.com/photo-1521791136064-7986c295944c?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1769957661/jige_xz8rn1.mp4"
            />
            <DomainCard 
              name="Private Research" 
              desc="Driving Industry R&D and high-stakes technical architecture."
              path="/private"
              img="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1769957661/jige_xz8rn1.mp4"
            />
            <DomainCard 
              name="Student Initiative" 
              desc="Student-led problem identification and solution building."
              path="/initiative"
              img="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1769957661/jige_xz8rn1.mp4"
            />
          </div>

          {/* Row 3: 2 Columns (Power, Startup) */}
          <div className="flex flex-col md:flex-row justify-center gap-10 px-4 md:px-0">
            <DomainCard 
              name="Power Empowerment" 
              desc="Building technical, thinking, and research capability."
              path="/power"
              img="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1769957661/jige_xz8rn1.mp4"
              className="md:w-1/2 md:max-w-xl"
            />
            <DomainCard 
              name="Startup Support" 
              desc="Incubation and technical R&D support for high-potential ventures."
              path="/challenges"
              img="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://res.cloudinary.com/dhy9pmo8s/video/upload/v1769957661/jige_xz8rn1.mp4"
              className="md:w-1/2 md:max-w-xl"
            />
          </div>
        </div>
      </Section>

      {/* ================================================= */}
      {/* SECTION 6: IMPACT SNAPSHOT */}
      {/* ================================================= */}
      <Section className="py-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Research Reports', value: '150+', icon: Microscope },
            { label: 'Live Prototypes', value: '45+', icon: Zap },
            { label: 'Expert Mentors', value: '80+', icon: Users },
            { label: 'Student Growth', value: '98%', icon: Trophy }
          ].map((stat, i) => (
            <div key={i} className="text-center p-10 bg-[#F8F9FA] rounded-[3rem]">
              <stat.icon className="mx-auto mb-4 text-[#FB8500]" size={24} />
              <h4 className="text-4xl font-black text-[#0A2463] mb-2">{stat.value}</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ================================================= */}
      {/* SECTION 7: FOOTER CTA */}
      {/* ================================================= */}
      <Section className="bg-[black] text-white py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[white]/5 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter uppercase leading-none">
            Ready to Build <br /> the Future?
          </h2>
          <p className="text-xl text-blue-100/20 max-w-xl mx-auto mb-16 font-medium">
            Join the organization where students don't just learn—they lead and deploy.
          </p>
          <Link to="/login">
            <Button size="lg" className="h-20 px-20 rounded-3xl text-xl shadow-3xl shadow-black/20 font-black uppercase tracking-[0.2em]">
              Get Started
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home;
