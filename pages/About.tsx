
import React from 'react';
import { Section, Card } from '../components/Common';
import { Target, Shield, Globe } from 'lucide-react';

const About = () => (
  <div className="animate-in fade-in duration-700">
    <Section className="text-center pt-32 pb-44 bg-[#0A2463] text-white">
      <h1 className="text-7xl font-black tracking-tighter uppercase mb-8">About NX Research</h1>
      <p className="text-2xl text-blue-200/60 max-w-2xl mx-auto font-medium">Reimagining research for the student-led era.</p>
    </Section>
    <Section className="max-w-5xl mx-auto py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter mb-8">Vision & Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6 font-medium">To democratize research by putting students at the helm of real-world problem solving, supported by elite mentorship and industry collaboration.</p>
        </div>
        <Card className="bg-gray-50 border-none p-12 rounded-[3rem]">
          <h3 className="text-2xl font-black text-[#FB8500] mb-6 uppercase">Why Us?</h3>
          <ul className="space-y-4 font-bold text-gray-500 text-sm">
            <li>• Student Ownership</li>
            <li>• No Pseudo Projects</li>
            <li>• Industry Integrated</li>
            <li>• Mastery Focused</li>
          </ul>
        </Card>
      </div>
    </Section>
    <Section gray className="py-32">
      <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter text-center mb-16">Virtual Research Campus</h2>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-2xl font-bold text-gray-400 italic">"A boundaryless ecosystem where intelligence meets opportunity, regardless of geography."</p>
      </div>
    </Section>
  </div>
);

export default About;
