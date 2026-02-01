
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle, Target, BookOpen, Microscope, Globe, Briefcase, Zap, Trophy, Users } from 'lucide-react';
import { Section, Card, Button } from '../components/Common';
import { DOMAINS, HOW_IT_WORKS } from '../constants';

const Home = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* SECTION 1: HERO */}
      <Section className="text-center pt-32 pb-44">
        <h1 className="text-6xl md:text-9xl font-black text-[#0A2463] mb-8 leading-[0.85] tracking-tighter">
          Student-Powered <br /> Applied Research
        </h1>
        <p className="text-xl md:text-2xl text-[#1E1E1E] max-w-3xl mx-auto mb-14 leading-relaxed font-semibold">
          We build independent problem-solvers through student-driven research, innovation and real-world projects.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/summit"><Button size="lg" className="h-20 px-12 rounded-[2rem] text-xl">Join Workshop</Button></Link>
          <Link to="/login"><Button size="lg" variant="outline" className="h-20 px-12 rounded-[2rem] text-xl">Apply Now</Button></Link>
        </div>
      </Section>

      {/* SECTION 2: ABOUT SUMMARY */}
      <Section gray className="py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter mb-8">Our Vision & Mission</h2>
            <p className="text-xl text-gray-600 font-medium mb-8 leading-relaxed">
              NX Research is a student-initiative driven organization where students lead research and projects, while mentors provide guidance to build real-world solutions.
            </p>
            <Link to="/about">
              <Button variant="ghost" className="font-black p-0 group">
                LEARN ABOUT VIRTUAL CAMPUS <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white p-10 text-center border-none shadow-xl rounded-[3rem]">
              <Target className="mx-auto mb-4 text-[#FB8500]" />
              <h4 className="font-black text-xs uppercase tracking-widest">Purpose</h4>
            </Card>
            <Card className="bg-[#0A2463] p-10 text-center text-white border-none shadow-xl rounded-[3rem]">
              <Shield className="mx-auto mb-4 text-[#FB8500]" />
              <h4 className="font-black text-xs uppercase tracking-widest">Integrity</h4>
            </Card>
          </div>
        </div>
      </Section>

      {/* SECTION 3: RESEARCH DOMAINS */}
      <Section>
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter">Applied Research</h2>
          <div className="flex space-x-4">
            <Link to="/government" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#FB8500]">Government</Link>
            <Link to="/private" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#FB8500]">Private</Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card className="p-12 bg-[#F8F9FA] rounded-[4rem] border-none group hover:bg-[#0A2463] transition-colors duration-500">
            <Globe className="text-[#FB8500] w-12 h-12 mb-8" />
            <h3 className="text-3xl font-black text-[#0A2463] group-hover:text-white mb-6 uppercase tracking-tighter">Gov Research</h3>
            <p className="text-gray-500 group-hover:text-blue-100 mb-8 font-medium">Applied research for national-level problem statements with govt collaboration.</p>
            <Link to="/government"><Button variant="outline" className="group-hover:bg-white group-hover:text-[#0A2463]">Explore</Button></Link>
          </Card>
          <Card className="p-12 bg-[#F8F9FA] rounded-[4rem] border-none group hover:bg-[#FB8500] transition-colors duration-500">
            <Briefcase className="text-[#0A2463] w-12 h-12 mb-8 group-hover:text-white" />
            <h3 className="text-3xl font-black text-[#0A2463] group-hover:text-white mb-6 uppercase tracking-tighter">Industry Research</h3>
            <p className="text-gray-500 group-hover:text-orange-50 mb-8 font-medium">Solving real industry problems for startups and enterprises.</p>
            <Link to="/private"><Button variant="outline" className="group-hover:bg-[#0A2463] group-hover:text-white border-white">Explore</Button></Link>
          </Card>
        </div>
      </Section>

      {/* SECTION 4: STUDENT LEARNING POWER */}
      <Section gray>
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter mb-4">Learning Power</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Learn how to learn • Mastery Tracks • Credits System</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Philosophy', desc: 'Thinking patterns over memorization.', icon: BookOpen },
            { title: 'Mentorship', desc: '1:1 and Many:1 guidance models.', icon: Users },
            { title: 'Credits', desc: 'Proof of work based currency.', icon: Zap },
          ].map(item => (
            <Card key={item.title} className="p-10 bg-white border-none shadow-sm rounded-[3rem]">
              <item.icon className="text-[#FB8500] mb-6" />
              <h4 className="text-xl font-black text-[#0A2463] mb-4 uppercase">{item.title}</h4>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/learning-power"><Button variant="secondary" className="rounded-2xl">View Learning Roadmap</Button></Link>
        </div>
      </Section>

      {/* SECTION 5: LIVE CHALLENGES */}
      <Section className="bg-[#0A2463] text-white">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Live Research Challenges</h2>
          <Link to="/challenges"><Button variant="primary">Apply to Join Challenge</Button></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-white/10 p-10 rounded-[3rem]">
            <h4 className="text-[#FB8500] font-black text-xs uppercase tracking-widest mb-4">Government</h4>
            <h3 className="text-2xl font-bold mb-4">Traffic Management AI for Smart Cities</h3>
            <p className="text-blue-100/60 text-sm mb-6">Partner: Dept of Transport</p>
            <div className="flex justify-between items-center border-t border-white/10 pt-6">
              <span className="text-xs font-black uppercase">Deadline: 15 Mar</span>
              <Button size="sm">Participate</Button>
            </div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-10 rounded-[3rem]">
            <h4 className="text-[#FB8500] font-black text-xs uppercase tracking-widest mb-4">Industry</h4>
            <h3 className="text-2xl font-bold mb-4">Low-Cost Drone Delivery Prototypes</h3>
            <p className="text-blue-100/60 text-sm mb-6">Partner: SwiftLogistics Inc.</p>
            <div className="flex justify-between items-center border-t border-white/10 pt-6">
              <span className="text-xs font-black uppercase">Deadline: 20 Mar</span>
              <Button size="sm">Participate</Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* SECTION 6: OUTCOMES & IMPACT */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter mb-8">Outcomes & Impact</h2>
            <div className="space-y-8">
              {[
                { label: 'Prototypes Built', val: '45+' },
                { label: 'Research Reports', val: '120+' },
                { label: 'Student Employment', val: '95%' }
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-end border-b-2 border-gray-50 pb-4">
                  <span className="text-sm font-black text-gray-400 uppercase tracking-widest">{stat.label}</span>
                  <span className="text-3xl font-black text-[#0A2463]">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="bg-gray-50 border-none p-16 rounded-[4rem]">
            <Trophy className="text-[#FB8500] w-16 h-16 mb-8" />
            <h3 className="text-2xl font-black text-[#0A2463] mb-4 uppercase">Success Stories</h3>
            <p className="text-gray-500 font-medium mb-8 italic">"Building the smart grid prototype at NX Research gave me the practical edge no classroom could."</p>
            <Link to="/impact"><Button variant="outline">View All Outcomes</Button></Link>
          </Card>
        </div>
      </Section>

      {/* SECTION 7: JOIN US */}
      <Section gray className="text-center">
        <h2 className="text-5xl font-black text-[#0A2463] mb-16 tracking-tighter uppercase">Join NX Research</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Student', 'Researcher', 'Mentor', 'Startup', 'Company'].map(role => (
            <Link key={role} to="/login" className="bg-white p-8 rounded-[2rem] shadow-sm hover:scale-105 transition-transform group">
              <h4 className="text-xs font-black text-[#0A2463] uppercase tracking-widest group-hover:text-[#FB8500]">{role}</h4>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Home;
