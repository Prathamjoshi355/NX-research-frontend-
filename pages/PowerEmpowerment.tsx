
import React from 'react';
import { Section, Button, Card, Input, Select, Textarea } from '../components/Common';
import { POWER_PROGRAMS } from '../constants';
import { Zap, BookOpen, Terminal, Database, Layout } from 'lucide-react';

const PowerEmpowerment = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* SECTION 1: HERO */}
      <Section className="text-center pt-32 pb-44">
        <h1 className="text-5xl md:text-7xl font-black text-[#0A2463] mb-6 tracking-tighter uppercase">Power Empowerment Programs</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 font-medium">Building thinking power, technical power and research power.</p>
        <Button size="lg" className="rounded-full h-16 px-12" onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}>Apply for Programs</Button>
      </Section>

      {/* SECTION 2: WHAT IS POWER EMPOWERMENT */}
      <Section gray className="py-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-black text-[#0A2463] mb-8 uppercase tracking-tighter">What is Power Empowerment</h2>
        <p className="text-xl text-gray-600 leading-relaxed font-medium">
          NX Research power empowerment programs focus on developing students’ internal capabilities — thinking, technical skills, research ability and decision-making — to make them independent creators.
        </p>
      </Section>

      {/* SECTION 3: PROGRAM CATEGORIES */}
      <Section>
        <div className="text-center mb-16"><h2 className="text-3xl font-black text-[#0A2463] uppercase tracking-tighter">Program Categories</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { title: 'Programming', icon: <Terminal /> },
            { title: 'AI / ML', icon: <Zap /> },
            { title: 'Data Science', icon: <Database /> },
            { title: 'Methodology', icon: <BookOpen /> },
            { title: 'System Design', icon: <Layout /> }
          ].map(cat => (
            <Card key={cat.title} className="text-center p-8 bg-white border-2 border-transparent hover:border-[#FB8500] transition-all">
              <div className="text-[#FB8500] mb-4 flex justify-center scale-150">{cat.icon}</div>
              <h4 className="font-black text-[#0A2463] uppercase text-[10px] tracking-widest">{cat.title}</h4>
            </Card>
          ))}
        </div>
      </Section>

      {/* SECTION 4: HOW PROGRAMS WORK */}
      <Section gray>
        <h2 className="text-3xl font-black text-[#0A2463] mb-12 uppercase tracking-tighter text-center">How Programs Work</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto">
          {['Concept foundation', 'Hands-on practice', 'Mini projects', 'Mentorship review', 'Capability assessment'].map((step, i) => (
            <div key={i} className="flex-1 text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="font-black text-[#0A2463] text-xl mb-1">{i+1}</div>
              <p className="text-[10px] font-bold uppercase tracking-tight text-gray-500 leading-tight">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 5: WHAT YOU GAIN */}
      <Section className="py-24">
        <h2 className="text-3xl font-black text-[#0A2463] mb-12 uppercase tracking-tighter">What You Gain</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Strong fundamentals', 'Real implementation experience', 'Confidence', 'Professional Portfolio'].map(gain => (
            <div key={gain} className="flex items-center space-x-4 bg-[#F8F9FA] p-8 rounded-2xl">
              <Zap className="text-[#FB8500]" />
              <span className="font-black text-[#0A2463] uppercase text-sm tracking-widest">{gain}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 6: PROGRAM LISTING */}
      <Section gray id="programs">
        <h2 className="text-3xl font-black text-[#0A2463] mb-12 uppercase tracking-tighter text-center">Program Listing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {POWER_PROGRAMS.map((prog, i) => (
            <Card key={i} className="p-10 bg-white flex flex-col items-start">
              <h4 className="text-2xl font-black text-[#0A2463] mb-2 uppercase tracking-tight">{prog.name}</h4>
              <p className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">{prog.duration} • {prog.mode}</p>
              <Button size="sm" className="rounded-xl px-10">Apply</Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* SECTION 7: APPLICATION FORM */}
      <Section id="apply">
        <div className="max-w-3xl mx-auto bg-white border-2 border-gray-100 rounded-[60px] p-16 shadow-2xl">
          <h2 className="text-4xl font-black text-[#0A2463] mb-12 uppercase text-center tracking-tighter">Program Application</h2>
          <form className="space-y-6">
            <Input label="Name" />
            <Input label="Background" placeholder="e.g. B.Tech CS Student" />
            <Select label="Program Interested In" options={POWER_PROGRAMS.map(p => p.name)} />
            <Textarea label="Goal" placeholder="What do you want to achieve through this program?" />
            <Button fullWidth size="lg" className="rounded-2xl h-16 text-lg font-black uppercase tracking-widest">Submit Application</Button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default PowerEmpowerment;
