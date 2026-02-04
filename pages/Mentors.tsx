
import React from 'react';
import { Section, Card, Button, Input, Textarea } from '../components/Common';
import { Users, Star, ShieldCheck, Mail } from 'lucide-react';

const Mentors = () => {
  const mentorList = [
    { name: 'Dr. Aristhoth', domain: 'Quantum Computing', experience: '15+ Years', rating: 4.9 },
    { name: 'Prof. J. Miller', domain: 'Biotech & Genomics', experience: '12+ Years', rating: 4.8 },
    { name: 'Sarah Jenkins', domain: 'Product Design', experience: '8+ Years', rating: 4.9 },
    { name: 'Dr. Mike Ross', domain: 'Public Policy', experience: '20+ Years', rating: 5.0 }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <Section className="text-center pt-32 pb-44 bg-[#1F2D2B] text-white">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">Mentors & Research Leaders</h1>
        <p className="text-xl md:text-2xl text-[#8FA6A1] max-w-3xl mx-auto mb-12 font-medium">Expert guidance for student-led innovation.</p>
        <Button size="lg" className="bg-[#3FB998] text-white h-16 px-12 rounded-full border-none" onClick={() => document.getElementById('become-mentor')?.scrollIntoView({ behavior: 'smooth' })}>Become a Mentor</Button>
      </Section>

      <Section gray>
        <h2 className="text-3xl font-black text-[#1F2D2B] mb-12 uppercase tracking-tighter text-center">Elite Research Network</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentorList.map((mentor, i) => (
            <Card key={i} className="p-8 bg-white border-none shadow-sm flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-gray-100 rounded-3xl mb-6 flex items-center justify-center text-[#1F2D2B] group-hover:bg-[#1F2D2B] group-hover:text-white transition-colors">
                <Users size={32} />
              </div>
              <h3 className="font-black text-lg text-[#1F2D2B] uppercase tracking-tight mb-1">{mentor.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#3FB998] mb-4">{mentor.domain}</p>
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 mb-6">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span>{mentor.rating}</span>
                <span>•</span>
                <span>{mentor.experience}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full rounded-xl">View Profile</Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="become-mentor">
        <div className="max-w-3xl mx-auto bg-white border-2 border-gray-100 rounded-[60px] p-16 shadow-2xl">
          <h2 className="text-4xl font-black text-[#1F2D2B] mb-12 uppercase text-center tracking-tighter">Become a Mentor</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" placeholder="e.g. Dr. John Doe" />
              <Input label="Email" placeholder="john@example.com" />
              <Input label="Domain of Expertise" placeholder="e.g. AI, Robotics, Policy" />
              <Input label="LinkedIn Profile" placeholder="https://linkedin.com/in/..." />
            </div>
            <Textarea label="Why do you want to join NX?" placeholder="Share your motivation for mentoring students..." />
            <Button fullWidth size="lg" className="rounded-2xl h-16 text-lg font-black uppercase tracking-widest shadow-xl">Submit Application</Button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default Mentors;
