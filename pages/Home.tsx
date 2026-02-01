
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Section, Card, Button } from '../components/Common';
import { DOMAINS, HOW_IT_WORKS } from '../constants';

const Home = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* SECTION 1: HERO */}
      <Section className="text-center pt-32 pb-44">
        <h1 className="text-5xl md:text-8xl font-black text-[#0A2463] mb-8 leading-[0.9] tracking-tighter">
          Student-Powered <br /> Applied Research Organization
        </h1>
        <p className="text-xl md:text-2xl text-[#1E1E1E] max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
          We build independent problem-solvers through student-driven research, innovation and real-world projects.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/summit"><Button size="lg" className="h-16 px-10 rounded-2xl">Join Workshop</Button></Link>
          <Link to="/initiative"><Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl">Apply Now</Button></Link>
        </div>
      </Section>

      {/* SECTION 2: WHAT IS NX RESEARCH */}
      <Section gray className="text-center py-24 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <Shield className="text-[#FB8500] w-12 h-12" />
          </div>
          <p className="text-2xl font-bold text-[#1E1E1E] leading-relaxed">
            NX Research is a student-initiative driven organization where students lead research and projects, while mentors provide guidance to build real-world solutions.
          </p>
        </div>
      </Section>

      {/* SECTION 3: OUR 5 DOMAINS */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter">Our 5 Domains</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {DOMAINS.map(d => (
            <Card key={d.id} className="text-center flex flex-col p-8 bg-white border-2 border-transparent hover:border-[#FB8500] transition-all">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#FB8500] mx-auto mb-6">
                <d.Icon className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#0A2463] mb-3 uppercase text-xs tracking-widest">{d.title}</h3>
              <p className="text-xs text-gray-500 font-medium mb-8 flex-grow">{d.description}</p>
              <Link to={d.path} className="w-full bg-[#F8F9FA] text-[#0A2463] py-2 rounded-lg font-bold text-xs hover:bg-[#0A2463] hover:text-white transition-colors uppercase">View</Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* SECTION 4: HOW NX RESEARCH WORKS */}
      <Section gray>
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter">How NX Research Works</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 max-w-6xl mx-auto">
          {HOW_IT_WORKS.map((h, i) => (
            <div key={i} className="flex-1 text-center relative w-full group">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-[#FB8500] mx-auto mb-6 group-hover:scale-110 transition-transform">
                <h.Icon className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-[#0A2463] text-sm uppercase tracking-wide">{h.title}</h4>
              {i < HOW_IT_WORKS.length - 1 && <div className="hidden lg:block absolute top-10 left-[70%] w-full text-gray-200"><ArrowRight /></div>}
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 5: WHY DIFFERENT */}
      <Section>
        <div className="max-w-4xl mx-auto bg-[#0A2463] rounded-[40px] p-16 text-white shadow-2xl overflow-hidden relative">
          <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter">Why NX Research is Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {["Students own the work", "No ready-made projects", "Mentor as guide, not builder", "Focus on independence"].map(point => (
              <div key={point} className="flex items-center space-x-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                <CheckCircle className="text-[#FB8500] flex-shrink-0" />
                <span className="text-xl font-bold">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 6: WHO CAN JOIN */}
      <Section gray>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter">Who Can Join</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Students', 'Startups / Companies', 'Mentors / Researchers'].map(role => (
            <Card key={role} className="p-10 text-center bg-white">
              <h3 className="text-2xl font-black text-[#0A2463] mb-8 uppercase tracking-tighter">{role}</h3>
              <Link to="/login"><Button fullWidth className="rounded-xl font-black">Apply Now</Button></Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* SECTION 7: CTA */}
      <Section className="py-32 text-center bg-white border-t border-gray-100">
        <h2 className="text-5xl font-black text-[#0A2463] mb-12 tracking-tighter uppercase">Start Your Journey With NX Research</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/summit"><Button size="lg" className="rounded-2xl h-16 px-12">Join Workshop</Button></Link>
          <Link to="/login"><Button size="lg" variant="secondary" className="rounded-2xl h-16 px-12">Apply Now</Button></Link>
        </div>
      </Section>
    </div>
  );
};

export default Home;
