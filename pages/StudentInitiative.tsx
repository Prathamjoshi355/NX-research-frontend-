
import React from 'react';
import { Section, Button, Card, Input, Textarea } from '../components/Common';
import { ArrowRight, CheckCircle } from 'lucide-react';

const StudentInitiative = () => (
  <div className="animate-in slide-in-from-left duration-500">
    <Section className="text-center pt-32 pb-44 bg-[#3FB998] text-white">
      <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">Student Initiative Program</h1>
      <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-medium">Students lead. Mentors guide. Research happens.</p>
      <Button size="lg" variant="secondary" className="h-16 px-12 rounded-full shadow-2xl">Apply as Student Researcher</Button>
    </Section>

    <Section className="py-24 max-w-4xl mx-auto">
      <h2 className="text-3xl font-black text-[#1F2D2B] mb-8 uppercase tracking-tighter">What is Student Initiative</h2>
      <p className="text-xl text-[#4A5D5A] leading-relaxed font-medium">NX Research is a student-initiative driven organization where students take ownership of problem identification, solution design and implementation, while mentors provide direction and review.</p>
    </Section>

    <Section gray>
      <h2 className="text-3xl font-black text-[#1F2D2B] mb-12 uppercase tracking-tighter text-center">How Students Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['Choose a problem', 'Propose solution', 'Design system', 'Build & test', 'Document & present'].map((step, i) => (
          <div key={i} className="text-center bg-white p-6 rounded-2xl shadow-sm"><div className="font-black text-[#3FB998] text-2xl mb-2">{i + 1}</div><h4 className="font-bold text-xs uppercase tracking-tight text-[#1F2D2B]">{step}</h4></div>
        ))}
      </div>
    </Section>

    <Section id="apply">
      <div className="max-w-3xl mx-auto bg-white border-2 border-gray-100 rounded-[60px] p-16 shadow-2xl">
        <h2 className="text-4xl font-black text-[#1F2D2B] mb-12 uppercase text-center tracking-tighter">Application Form</h2>
        <form className="space-y-6">
          <Input label="Name" /><Input label="College" /><Input label="Year" />
          <Input label="Domain Interest" /><Textarea label="Short Problem Idea" />
          <Button fullWidth size="lg" className="rounded-2xl h-16 text-lg font-black uppercase tracking-widest">Submit Application</Button>
        </form>
      </div>
    </Section>
  </div>
);

export default StudentInitiative;
