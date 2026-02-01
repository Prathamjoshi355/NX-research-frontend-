
import React from 'react';
import { Section, Button, Card, Input, Textarea } from '../components/Common';
import { INDUSTRY_PROJECTS } from '../constants';
// Fixed: Added missing Search and CheckCircle imports from lucide-react
import { Building2, Layers, Cpu, LineChart, Search, CheckCircle } from 'lucide-react';

const PrivateResearch = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* SECTION 1: HERO */}
      <Section className="text-center pt-32 pb-44 border-b border-gray-50">
        <h1 className="text-5xl md:text-7xl font-black text-[#0A2463] mb-6 tracking-tighter uppercase">Private & Industry Research</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 font-medium">Applied research and solution development for startups and companies.</p>
        <Button size="lg" className="rounded-full h-16 px-12" onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}>Apply for Private Research</Button>
      </Section>

      {/* SECTION 2: WHAT WE DO */}
      <Section className="py-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-black text-[#0A2463] mb-8 uppercase tracking-tighter">What We Do</h2>
        <p className="text-xl text-gray-600 leading-relaxed font-medium">
          NX Research collaborates with startups and private companies to solve real business and technical problems through applied research and prototype development.
        </p>
      </Section>

      {/* SECTION 3: TYPES OF WORK */}
      <Section gray>
        <div className="text-center mb-16"><h2 className="text-3xl font-black text-[#0A2463] uppercase tracking-tighter">Types of Work</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: 'Product Research', icon: <Search className="w-8 h-8" /> },
            { title: 'Prototype Development', icon: <Cpu className="w-8 h-8" /> },
            { title: 'System Design', icon: <Layers className="w-8 h-8" /> },
            { title: 'Optimization', icon: <LineChart className="w-8 h-8" /> }
          ].map(type => (
            <Card key={type.title} className="text-center p-10 bg-white border-2 border-transparent hover:border-[#FB8500] transition-all">
              <div className="text-[#FB8500] mb-6 flex justify-center">{type.icon}</div>
              <h4 className="font-black text-[#0A2463] uppercase text-xs tracking-widest">{type.title}</h4>
            </Card>
          ))}
        </div>
      </Section>

      {/* SECTION 4: INDUSTRY PROJECTS */}
      <Section>
        <h2 className="text-3xl font-black text-[#0A2463] mb-12 uppercase tracking-tighter">Industry Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRY_PROJECTS.map((proj, i) => (
            <Card key={i} className="p-8 bg-gray-50 border-none flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold text-[#0A2463] mb-2">{proj.title}</h4>
                <div className="flex items-center text-sm font-semibold text-gray-500 mb-4">
                  <Building2 className="w-4 h-4 mr-2" /> {proj.company} | {proj.domain}
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${proj.status === 'Ongoing' ? 'bg-orange-100 text-[#FB8500]' : 'bg-green-100 text-green-600'}`}>
                  {proj.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* SECTION 5: WHO CAN APPLY */}
      <Section gray className="text-center py-20">
        <h3 className="text-2xl font-black text-[#0A2463] mb-8 uppercase">Who Can Apply</h3>
        <div className="flex justify-center space-x-12">
          {['Students', 'Researchers', 'Mentors'].map(role => (
            <div key={role} className="flex items-center space-x-3">
              <CheckCircle className="text-[#FB8500]" />
              <span className="font-bold text-gray-700">{role}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 6: APPLICATION FORM */}
      <Section id="apply">
        <div className="max-w-3xl mx-auto bg-white border-2 border-gray-100 rounded-[60px] p-16 shadow-2xl">
          <h2 className="text-4xl font-black text-[#0A2463] mb-12 uppercase text-center tracking-tighter">Application Form</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Name" placeholder="Full Name" />
              <Input label="Skills" placeholder="e.g. React, Python, ML" />
              <div className="md:col-span-2"><Input label="Experience" placeholder="Years of experience / Projects" /></div>
              <div className="md:col-span-2"><Input label="Portfolio / GitHub" placeholder="https://..." /></div>
              <div className="md:col-span-2"><Textarea label="Area of Interest" placeholder="What kind of projects interest you?" /></div>
            </div>
            <Button fullWidth size="lg" className="rounded-2xl h-16 text-lg font-black uppercase tracking-widest">Submit Application</Button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default PrivateResearch;
