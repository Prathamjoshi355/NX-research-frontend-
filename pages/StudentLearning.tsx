
import React from 'react';
import { Section, Card, Button } from '../components/Common';
import { Zap, Users, Target } from 'lucide-react';

const StudentLearning = () => (
  <div className="animate-in slide-in-from-bottom duration-700">
    <Section className="pt-32 pb-44 text-center">
      <h1 className="text-7xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-8">Student Learning Power</h1>
      <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">Learn How to Learn • Independent Thinking • Mastery</p>
    </Section>
    <Section gray className="py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Mentorship 1:1', desc: 'Direct access to research leaders for personalized growth.' },
          { title: 'Many:1 Model', desc: 'Expert panels reviewing singular research initiatives.' },
          { title: 'Time-Based tracks', desc: 'Move through concepts at the speed of your curiosity.' }
        ].map(item => (
          <Card key={item.title} className="bg-white border-none p-12 rounded-[4rem] text-center shadow-sm">
            <h3 className="text-xl font-black text-[#1F2D2B] uppercase mb-4">{item.title}</h3>
            <p className="text-[#8FA6A1] font-medium text-sm">{item.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
    <Section className="py-32 text-center">
      <h2 className="text-4xl font-black text-[#1F2D2B] mb-12 uppercase tracking-tighter">Learning Credits System</h2>
      <Card className="max-w-2xl mx-auto p-16 bg-[#3FB998] text-white rounded-[4rem] border-none">
        <Zap className="mx-auto mb-8 w-16 h-16" />
        <p className="text-2xl font-black mb-4 uppercase">Proof of Work = Currency</p>
        <p className="text-white/90 font-medium">Earn credits by completing research modules, publishing reports, and building prototypes.</p>
      </Card>
    </Section>
  </div>
);

export default StudentLearning;
