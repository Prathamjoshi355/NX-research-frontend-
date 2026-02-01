
import React, { useState } from 'react';
import { Section, Card, Button, Input, Select } from '../components/Common';
import { CheckCircle, X, Users, Rocket, Wallet, HeartHandshake, ShieldCheck } from 'lucide-react';

const Summit = () => {
  const [formType, setFormType] = useState<string | null>(null);

  const roles = [
    { role: 'Students', Icon: Users, desc: 'Showcase projects and find mentors.' },
    { role: 'Startup Founders', Icon: Rocket, desc: 'Pitch ideas and connect with investors.' },
    { role: 'Investors', Icon: Wallet, desc: 'Discover high-potential startups.' },
    { role: 'Sponsors', Icon: HeartHandshake, desc: 'Support innovation and gain visibility.' },
    { role: 'Organizers', Icon: ShieldCheck, desc: 'Manage operations and facilitate growth.' }
  ];

  return (
    <div className="animate-in slide-in-from-right duration-500">
      {/* SECTION 1: HERO */}
      <Section className="text-center pt-32 pb-44 bg-gray-50 border-b border-gray-100">
        <h1 className="text-5xl md:text-7xl font-black text-[#0A2463] mb-6 tracking-tighter uppercase">NX Research Startup & Innovation Summit</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 font-medium">A collaborative innovation get-together connecting students, startups, investors and mentors.</p>
        <Button size="lg" className="rounded-full shadow-2xl h-16 px-12" onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}>Register for Summit</Button>
      </Section>

      {/* SECTION 2: ABOUT */}
      <Section className="max-w-4xl mx-auto text-center py-24">
        <h2 className="text-3xl font-black text-[#0A2463] mb-8 uppercase tracking-tighter">About the Summit</h2>
        <p className="text-xl text-gray-600 leading-relaxed font-medium">
          NX Research Summit is an entry-based innovation get-together where students, startups, mentors and investors meet on an equal platform to share ideas, showcase projects and build collaborations.
        </p>
      </Section>

      {/* SECTION 3: WHO SHOULD ATTEND */}
      <Section gray>
        <div className="text-center mb-16"><h2 className="text-3xl font-black text-[#0A2463] uppercase tracking-tighter">Who Should Attend</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {roles.map(item => (
            <Card key={item.role} className="text-center p-8 bg-white flex flex-col items-center">
              <div className="text-[#FB8500] mb-3"><item.Icon size={16} /></div>
              <h3 className="font-black text-[#0A2463] uppercase text-[10px] tracking-widest mb-2">{item.role}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase leading-tight">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* SECTION 4: WHAT WILL HAPPEN */}
      <Section>
        <h2 className="text-3xl font-black text-[#0A2463] mb-10 uppercase tracking-tighter">What will happen at the Summit?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Project Showcase', 'Startup Pitching', 'Panel Discussions', 'Networking', 'Mentor Talks'].map(item => (
            <div key={item} className="flex items-center space-x-4 bg-[#F8F9FA] p-6 rounded-2xl font-bold border-l-4 border-[#06A77D]">
              <CheckCircle className="text-[#06A77D]" /><span>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* SECTION 5 & 6: PARTICIPATION & FORMS */}
      <Section gray id="register">
        <h2 className="text-3xl font-black text-[#0A2463] mb-12 uppercase tracking-tighter text-center">Registration Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {['Student', 'Startup', 'Investor', 'Sponsor', 'Organizer'].map(type => (
            <Button key={type} variant={formType === type ? 'primary' : 'outline'} onClick={() => setFormType(type)} className="h-16 rounded-xl font-black uppercase tracking-widest text-xs">I am a {type}</Button>
          ))}
        </div>

        {formType && (
          <div className="bg-white border-2 border-gray-100 rounded-[40px] p-12 shadow-2xl max-w-2xl mx-auto relative animate-in zoom-in duration-300">
            <button onClick={() => setFormType(null)} className="absolute top-8 right-8 text-gray-400"><X /></button>
            <h3 className="text-2xl font-black text-[#0A2463] mb-10 uppercase text-center">{formType} Form</h3>
            <form className="space-y-6">
              {formType === 'Student' && <><Input label="Name" /><Input label="College" /><Input label="Year" /></>}
              {formType === 'Startup' && <><Input label="Startup Name" /><Input label="Founder Name" /><Select label="Stage" options={['Ideation', 'MVP', 'Scaling']} /></>}
              {formType === 'Investor' && <><Input label="Name" /><Input label="Organization" /></>}
              {formType === 'Sponsor' && <><Input label="Company Name" /><Input label="Contact Person" /></>}
              {formType === 'Organizer' && <><Input label="Name" /><Input label="Experience" /></>}
              <Input label="Phone" /><Input label="Email" />
              <Button fullWidth size="lg" className="rounded-2xl h-16 text-lg font-black uppercase tracking-widest">Submit Registration</Button>
            </form>
          </div>
        )}
      </Section>

      {/* SECTION 7: NOTES */}
      <Section className="text-center py-20">
        <div className="max-w-xl mx-auto bg-gray-50 p-10 rounded-[40px]">
          <h4 className="font-black text-[#0A2463] mb-6 uppercase tracking-widest text-xs">Important Notes</h4>
          <ul className="text-left space-y-4 font-bold text-gray-500 text-sm">
            <li>• Entry-based event</li>
            <li>• Equal participation for all</li>
            <li>• Online registration mandatory</li>
          </ul>
        </div>
      </Section>
    </div>
  );
};

export default Summit;
