import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Briefcase,
  Users,
  Rocket,
  Microscope,
  CheckCircle,
  GraduationCap,
  Building2,
  ChevronRight
} from "lucide-react";
import { Section, Button } from "../components/Common";
import { PROCESS_STEPS } from '../constants';
import TimelineStep from '../components/TimelineStep';

const RollingNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toLocaleString()}{suffix}</span>;
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

      {/* SECTION 1: HERO (10-Second Clarity Focus) - RESPONSIVE */}
      <section className="relative min-h-screen h-auto sm:h-[100vh] flex items-center justify-center overflow-hidden bg-[#0A1211]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F2D2B]/90 via-transparent to-[#0A1211] z-[2]"></div>
        <div className="absolute inset-0 z-[1] opacity-40">
          <img
            src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1770320921/Summit_Home_fha8t9.jpg"
            className="w-full h-full object-cover grayscale brightness-50"
            alt="Research background"
          />
        </div>

        <div className="relative z-10 text-center w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center py-20 sm:pt-20">
          <div className="mb-4 sm:mb-6 inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#3FB998]/10 border border-[#3FB998]/30 text-[#3FB998] text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] backdrop-blur-md">
            India's Elite Student Research Organization
          </div>

          <div className="h-[80px] sm:h-[100px] md:h-[140px] lg:h-[220px] flex items-center justify-center mb-4 sm:mb-6 overflow-hidden w-full">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
              <span key={index} className="block animate-heroText whitespace-pre-wrap px-2 sm:px-4">
                {texts[index]}
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed font-medium drop-shadow-md px-4">
            We bridge the gap between academic potential and industrial application.
          </p>

          {/* THE THREE PILLARS (10-second Clarity) - RESPONSIVE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-5xl mb-10 sm:mb-16 px-4">
            {[
              { label: 'For Students', desc: 'Build Applied Skills', icon: GraduationCap, path: '/power' },
              { label: 'For Startups', desc: 'Solve Tech Hurdles', icon: Rocket, path: '/private' },
              { label: 'For Govt', desc: 'Deploy National Impact', icon: Globe, path: '/government' }
            ].map((pillar, i) => (
              <Link 
                key={i} 
                to={pillar.path}
                className="bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-[2.5rem] transition-all duration-300 group hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#3FB998]/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#3FB998] mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <pillar.icon size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-white font-black uppercase tracking-widest text-[10px] sm:text-xs mb-1">{pillar.label}</h3>
                <p className="text-gray-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-tight">{pillar.desc}</p>
              </Link>
            ))}
          </div>

          {/* LIVE ECOSYSTEM PULSE - RESPONSIVE */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-12 mb-6 sm:mb-10">
            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="text-left">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#3FB998] animate-pulse"></div>
                   <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-none tracking-tighter italic">
                    <RollingNumber value={1200} suffix="+" />
                   </p>
                </div>
                <p className="text-[8px] sm:text-[9px] font-black text-[#8FA6A1] uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-1 sm:mt-2">Active Students</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="text-left">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 animate-pulse"></div>
                   <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-none tracking-tighter italic">
                    <RollingNumber value={45} suffix="+" />
                   </p>
                </div>
                <p className="text-[8px] sm:text-[9px] font-black text-[#8FA6A1] uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-1 sm:mt-2">Industry Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DOMAINS - RESPONSIVE */}
      <Section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-3 sm:mb-4 leading-none italic">Our Domains</h2>
          <p className="text-[#8FA6A1] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px]">Applied Research • Impact Units • Hover to Explore</p>
        </div>

        <div className="flex flex-col space-y-4 sm:space-y-6 max-w-7xl mx-auto px-4">
          <Link to="/summit" className="relative group overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[3.5rem] aspect-video w-full bg-[#1F2D2B]">
             <img src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1770320921/Summit_Home_fha8t9.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" alt="" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 sm:p-8 lg:p-12 text-center">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase italic tracking-tighter mb-2 sm:mb-4 drop-shadow-2xl">FCC SUMMIT</h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] max-w-lg">The National Convergence of Talent & Capital.</p>
                <div className="mt-4 sm:mt-6 lg:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-[#3FB998] rounded-full font-black uppercase tracking-widest text-[9px] sm:text-[10px] group-hover:bg-white group-hover:text-[#1F2D2B] transition-all">Explore Meetups</div>
             </div>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { name: "Government Research", path: "/government", img: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1770321238/gov._Home_qfzpy3.jpg", color: "bg-blue-600" },
              { name: "Private Research", path: "/private", img: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1770321389/Priv._Home_w9tbte.jpg", color: "bg-emerald-600" },
              { name: "Student Initiative", path: "/initiative", img: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1770321403/Student_Initiative_Home_wpysvr.jpg", color: "bg-orange-600" },
              { name: "Power Empowerment", path: "/power", img: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1770321470/Empowerment_Home_g5oxtc.jpg", color: "bg-[#1F2D2B]" }
            ].map((domain, idx) => (
              <Link key={idx} to={domain.path} className="relative aspect-video rounded-2xl sm:rounded-3xl lg:rounded-[3rem] overflow-hidden group">
                <img src={domain.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75" alt="" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-4 sm:left-6 lg:left-10 text-white">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase italic tracking-tighter mb-1 sm:mb-2">{domain.name}</h3>
                  <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[9px] sm:text-[10px] text-[#3FB998]">
                    <span>Enter Domain</span>
                    <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 3: PROCESS - RESPONSIVE */}
      <Section className="py-16 sm:py-24 lg:py-32 bg-[#F8F9FA] text-center overflow-hidden border-y border-gray-100">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-12 sm:mb-16 lg:mb-20 leading-tight italic px-4">
          Applied <br /> Transformation.
        </h2>

        {/* Desktop/Tablet Timeline */}
        <div className="hidden md:block relative w-full max-w-7xl h-[400px] mx-auto">  
          <div className="absolute left-0 right-0 h-1 top-1/2 -translate-y-1/2">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
               <div className="h-full bg-[#3FB998] animate-draw"></div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center relative h-full px-12">
            {PROCESS_STEPS.map((step, index) => (
              <TimelineStep key={step.id} step={step} index={index} isTop={index % 2 === 0} />
            ))}
          </div>
        </div>

        {/* Mobile Timeline - Improved Visual Cards */}
        <div className="md:hidden flex flex-col space-y-4 max-w-lg mx-auto px-4">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connection Line */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="absolute left-1/2 -bottom-4 w-0.5 h-4 bg-gradient-to-b from-[#3FB998] to-gray-200 -translate-x-1/2 z-0"></div>
              )}
              
              {/* Card */}
              <div className="relative bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:border-[#3FB998]/30 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                {/* Step Number Badge */}
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-[#3FB998] to-[#2D8A6E] text-white flex items-center justify-center font-black text-lg shadow-lg border-4 border-white z-10">
                  {index + 1}
                </div>
                
                {/* Content */}
                <div className="pl-6 text-left">
                  <h4 className="text-lg font-black text-[#1F2D2B] mb-2 uppercase tracking-tight leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#3FB998] to-transparent rounded-b-2xl" 
                     style={{ width: `${((index + 1) / PROCESS_STEPS.length) * 100}%` }}>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* STATS SECTION - RESPONSIVE */}
      <Section className="py-16 sm:py-24 lg:py-32 text-center bg-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-12 sm:mb-16 lg:mb-20 leading-tight italic px-4">
          Ecosystem Assets.
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto px-4">
          {[
            { num: "150+", label: "Studies Managed", icon: Microscope },
            { num: "45+", label: "Active Startups", icon: Rocket },
            { num: "1,200+", label: "Mentored Minds", icon: Users },
            { num: "98%", label: "Placement Power", icon: CheckCircle }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="mb-3 sm:mb-4 lg:mb-6 p-3 sm:p-4 lg:p-5 bg-[#F7FAF9] rounded-xl sm:rounded-2xl lg:rounded-[2rem] group-hover:bg-[#3FB998] group-hover:text-white transition-all duration-300 shadow-sm">
                <stat.icon size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </div>
              <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2D2B] mb-1 sm:mb-2 tracking-tighter italic">{stat.num}</h4>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#8FA6A1]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FOOTER CTA - RESPONSIVE */}
      <Section className="bg-[#1F2D2B] text-white py-32 sm:py-48 lg:py-64 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#000459] pointer-events-none"></div>
        <div className="relative z-10 px-4 sm:px-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 lg:mb-10 tracking-tighter uppercase leading-none italic">
            Architect <br /> the Future.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/60 max-w-xl mx-auto mb-10 sm:mb-12 lg:mb-16 font-medium italic px-4">
            The organization where students don't just learn—they deploy at scale.
          </p>
          <Link to="/registration">
            <Button size="lg" className="h-14 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 rounded-full font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm shadow-7xl">
              Apply to Register
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home;