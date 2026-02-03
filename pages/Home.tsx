
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
  Rocket,
  CheckCircle
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
      <img 
        src={img} 
        alt={name}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />
      <video 
        ref={videoRef}
        muted 
        loop 
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 z-0 ${isHovered ? 'opacity-100 blur-[8px] scale-105' : 'opacity-0'}`}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 bg-black/50 transition-opacity duration-500 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 z-30 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4">
          {name}
        </h3>
        <p className="text-white/80 font-medium text-xs md:text-sm max-w-xs uppercase tracking-widest leading-tight">
          {desc}
        </p>
        <div className="mt-6 w-12 h-1 bg-[#FB8500] rounded-full"></div>
      </div>
      {!isHovered && (
        <div className="absolute bottom-10 left-10 z-20">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter bg-[#0A2463]/80 px-4 py-1 rounded-lg backdrop-blur-md">
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
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 z-[2]"></div>
        <div className="absolute inset-0 z-[1] opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover grayscale brightness-50"
            alt="Research background"
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl px-6">
          <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-[#FB8500]/20 border border-[#FB8500]/40 text-[#FB8500] text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-sm">
            India's Elite Student Research Org
          </div>
          
          <div className="h-[140px] md:h-[240px] flex items-center justify-center mb-8 overflow-hidden">
            <h1 className="text-4xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter text-shadow-hero">
              <span key={index} className="block animate-heroText whitespace-pre-wrap px-4">
                {texts[index]}
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-14 leading-relaxed font-semibold drop-shadow-md">
            We build independent problem-solvers through student-driven research and real-world implementation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/summit">
              <Button size="lg" className="h-16 px-12 rounded-2xl shadow-2xl shadow-[#FB8500]/30 font-black uppercase tracking-widest text-sm">
                Join Summit
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl text-white border-white/40 hover:bg-white hover:text-[#0A2463] font-black uppercase tracking-widest text-sm backdrop-blur-sm">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: DOMAINS */}
      <Section className="py-24 bg-white overflow-hidden">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-[#0A2463] uppercase tracking-tighter mb-4 leading-none">Our Domains</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Innovation Ecosystem • Hover to Explore</p>
        </div>

        <div className="flex flex-col space-y-10 max-w-7xl mx-auto">
          <div className="flex justify-center">
            <DomainCard 
              name="FCC Summit " 
              desc="Startup & Innovation Summit connecting stakeholders."
              path="/summit"
              img="https://images.unsplash.com/photo-1540575861501-7ad05823c95b?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://assets.mixkit.co/videos/preview/mixkit-business-people-walking-in-a-hallway-4433-large.mp4"
              className="md:max-w-3xl"
            />
          </div>

         <div className="flex flex-col md:flex-row justify-center gap-10 px-4 md:px-0">
            <DomainCard 
              name="Government Research" 
              desc="National infrastructure and public sector challenges."
              path="/government"
              img="https://images.unsplash.com/photo-1521791136064-7986c295944c?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://assets.mixkit.co/videos/preview/mixkit-digital-transformation-of-world-map-business-loop-30386-large.mp4"
            />
            <DomainCard 
              name="Private Research" 
              desc="Industry R&D and technical architecture."
              path="/private"
              img="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://assets.mixkit.co/videos/preview/mixkit-corporate-office-building-with-glass-facade-and-white-clouds-30385-large.mp4"
            />
           
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-10 px-4 md:px-0">
             <DomainCard 
              name="Student Initiative" 
              desc="Student-led problem identification and solving."
              path="/initiative"
              img="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://assets.mixkit.co/videos/preview/mixkit-young-man-working-on-his-laptop-in-an-office-30383-large.mp4"
            />
            <DomainCard 
              name="Power Empowerment" 
              desc="Building technical and research capability."
              path="/power"
              img="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
              videoUrl="https://assets.mixkit.co/videos/preview/mixkit-circuit-board-of-a-server-in-close-up-30384-large.mp4"
            />
            
          </div>
        </div>
      </Section>

      {/* SECTION: KNOWLEDGE TRANSFER FLOW CHART */}
      <Section className="py-32 bg-[#F8F9FA] text-center overflow-hidden">
        <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter mb-20 leading-tight">
          How we transfer Knowledge into capability?
        </h2>

        <div className="relative max-w-5xl mx-auto px-4">
          {/* Connector Lines (Desktop) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none">
              {/* Horizontal line */}
              <path d="M250 150 H750" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="8 4" />
              {/* Vertical lines to nodes */}
              <path d="M250 100 V150" stroke="#E5E7EB" strokeWidth="2" />
              <path d="M750 100 V150" stroke="#E5E7EB" strokeWidth="2" />
              <path d="M500 150 V250" stroke="#E5E7EB" strokeWidth="2" />
              <path d="M500 150 V300" stroke="#E5E7EB" strokeWidth="2" className="opacity-0" />
              {/* Complex flow visual */}
              <path d="M250 150 V300" stroke="#E5E7EB" strokeWidth="2" />
              <path d="M750 150 V300" stroke="#E5E7EB" strokeWidth="2" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-32 gap-x-20 relative z-10">
            {/* Step 1 */}
            <div className="flex justify-center md:justify-start">
              <div className="w-56 h-32 md:w-64 md:h-40 rounded-[100%] border-4 border-[#0A2463] bg-white flex flex-col items-center justify-center p-6 shadow-xl card-hover">
                <span className="text-[#FB8500] font-black text-2xl mb-1">1</span>
                <span className="font-black text-[#0A2463] uppercase text-xs tracking-widest text-center">Foundational Knowledge</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex justify-center md:justify-end">
              <div className="w-56 h-32 md:w-64 md:h-40 rounded-[100%] border-4 border-[#0A2463] bg-white flex flex-col items-center justify-center p-6 shadow-xl card-hover">
                <span className="text-[#FB8500] font-black text-2xl mb-1">3</span>
                <span className="font-black text-[#0A2463] uppercase text-xs tracking-widest text-center">Strategic Research</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex justify-center md:justify-start">
              <div className="w-56 h-32 md:w-64 md:h-40 rounded-[100%] border-4 border-[#FB8500] bg-white flex flex-col items-center justify-center p-6 shadow-xl card-hover">
                <span className="text-[#0A2463] font-black text-2xl mb-1">2</span>
                <span className="font-black text-[#0A2463] uppercase text-xs tracking-widest text-center">Applied Prototype</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex justify-center md:justify-end">
              <div className="w-56 h-32 md:w-64 md:h-40 rounded-[100%] border-4 border-[#FB8500] bg-white flex flex-col items-center justify-center p-6 shadow-xl card-hover">
                <span className="text-[#0A2463] font-black text-2xl mb-1">4</span>
                <span className="font-black text-[#0A2463] uppercase text-xs tracking-widest text-center">Deployed Capability</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION: WHAT WE HAVE? */}
      <Section className="py-32 text-center bg-white">
        <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter mb-20 leading-tight">
          What we have?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {[
            { num: "150+", label: "ongoing researches", icon: Microscope },
            { num: "45+", label: "Startups Registered", icon: Rocket },
            { num: "1,200+", label: "Student Mentored", icon: Users },
            { num: "98%", label: "Successful Members", icon: CheckCircle }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="mb-6 p-4 bg-[#F8F9FA] rounded-3xl group-hover:bg-[#FB8500] group-hover:text-white transition-all duration-300">
                <stat.icon size={28} />
              </div>
              <h4 className="text-5xl font-black text-[#0A2463] mb-3 tracking-tighter">{stat.num}</h4>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#0A2463] transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FOOTER CTA */}
      <Section className="bg-[#0A2463] text-white py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FB8500]/5 pointer-events-none"></div>
        <div className="relative z-10 px-6">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
            Ready to Build <br /> the Future?
          </h2>
          <p className="text-xl text-blue-100/60 max-w-xl mx-auto mb-16 font-medium">
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
