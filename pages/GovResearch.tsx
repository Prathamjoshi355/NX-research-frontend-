
import React from 'react';
import { Section, Button, Card, Input, Badge } from '../components/Common';
import { GOV_GRANTS } from '../constants';

const GovResearch = () => {
  return (
    <div className="animate-in slide-in-from-bottom duration-500">
      {/* SECTION 1: HERO */}
      <Section className="text-center pt-32 pb-44 bg-[#0A2463] text-white">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">Government Research & Innovation</h1>
        <p className="text-xl md:text-2xl text-blue-200/60 max-w-3xl mx-auto mb-12 font-medium">Student-powered applied research for national-level problem statements.</p>
        <Button size="lg" className="bg-[#FB8500] text-white h-16 px-12 rounded-full border-none" onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}>Apply for Government Research</Button>
      </Section>

      {/* SECTION 2: WHAT WE DO */}
      <Section className="py-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-black text-[#0A2463] mb-8 uppercase tracking-tighter">What We Do</h2>
        <p className="text-xl text-gray-600 leading-relaxed font-medium">NX Research works on government-focused problem statements through applied research. Students and mentors collaborate to design and develop practical solutions for public sector challenges.</p>
      </Section>

      {/* SECTION 3: FOCUS AREAS */}
      <Section gray>
        <h2 className="text-3xl font-black text-[#0A2463] mb-12 uppercase tracking-tighter text-center">Focus Areas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {['Smart Cities', 'Healthcare', 'Agriculture', 'Education', 'Environment', 'Digital Governance'].map(area => (
            <Card key={area} className="p-8 text-center bg-white border-2 border-transparent hover:border-[#FB8500] transition-all"><p className="font-black text-[#0A2463] uppercase text-xs tracking-widest">{area}</p></Card>
          ))}
        </div>
      </Section>

      {/* SECTION 4: PROJECTS */}
      <Section>
        <h2 className="text-3xl font-black text-[#0A2463] mb-12 uppercase tracking-tighter">Ongoing / Past Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-8 bg-gray-50 border-none">
            <h4 className="font-bold text-[#0A2463]">Urban Waste Management System</h4>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Smart Cities | Ongoing</p>
          </Card>
          <Card className="p-8 bg-gray-50 border-none">
            <h4 className="font-bold text-[#0A2463]">Rural Digital Literacy Dashboard</h4>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Education | Completed</p>
          </Card>
        </div>
      </Section>

      {/* SECTION 5: GRANT PORTALS */}
      <Section gray>
        <h2 className="text-3xl font-black text-[#0A2463] mb-12 uppercase tracking-tighter">Open Government Grant Portals</h2>
        <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-8 py-4">Scheme Name</th>
                <th className="px-8 py-4">Department</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {GOV_GRANTS.map((grant, i) => (
                <tr key={i}>
                  <td className="px-8 py-6 font-bold text-[#0A2463] text-sm uppercase">{grant.name}</td>
                  <td className="px-8 py-6 text-xs font-semibold text-gray-500 uppercase">{grant.department}</td>
                  <td className="px-8 py-6"><Badge status={grant.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* SECTION 6: WHO CAN APPLY */}
      <Section className="text-center py-20">
        <h3 className="text-2xl font-black text-[#0A2463] mb-8 uppercase">Who Can Apply</h3>
        <div className="flex justify-center space-x-12">
          {['Students', 'Researchers', 'Mentors'].map(role => (
            <div key={role} className="flex items-center space-x-2 font-bold text-gray-700"><span>•</span> <span>{role}</span></div>
          ))}
        </div>
      </Section>

      {/* SECTION 7: APPLICATION FORM */}
      <Section id="apply">
        <div className="max-w-3xl mx-auto bg-white border-2 border-gray-100 rounded-[60px] p-16 shadow-2xl">
          <h2 className="text-4xl font-black text-[#0A2463] mb-12 uppercase text-center tracking-tighter">Application Form</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Name" /><Input label="Qualification" />
              <div className="md:col-span-2"><Input label="Skills" /></div>
              <div className="md:col-span-2"><Input label="Research Interest" /></div>
              <div className="md:col-span-2"><Input label="Resume / Portfolio Link" /></div>
            </div>
            <Button fullWidth size="lg" className="rounded-2xl h-16 text-lg font-black uppercase tracking-widest shadow-xl">Submit Application</Button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default GovResearch;
