
import React from 'react';
import { Section, Card, Button, Input, Badge } from '../components/Common';
import { Trophy, ArrowRight, Target, Zap } from 'lucide-react';
import { CHALLENGES } from '../constants';

const Challenges = () => {
  return (
    <div className="animate-in slide-in-from-right duration-500">
      <Section className="text-center pt-32 pb-44 bg-[#FB8500] text-white">
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter uppercase">Live Challenges</h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-14 leading-relaxed font-semibold">Solve high-impact problems. Win prizes. Build proof-of-work.</p>
        <Button size="lg" variant="secondary" className="h-20 px-12 rounded-[2rem] text-xl shadow-2xl" onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}>Apply to Join</Button>
      </Section>

      <Section gray className="py-24">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter">Current Openings</h2>
          <div className="flex space-x-4">
            <span className="text-[10px] font-black uppercase text-gray-400">Filter:</span>
            <button className="text-[10px] font-black uppercase text-[#FB8500]">All</button>
            <button className="text-[10px] font-black uppercase text-gray-400 hover:text-[#FB8500]">Gov</button>
            <button className="text-[10px] font-black uppercase text-gray-400 hover:text-[#FB8500]">Industry</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CHALLENGES.map((challenge) => (
            <Card key={challenge.id} className="p-10 bg-white border-none shadow-sm rounded-[3rem] group hover:bg-[#0A2463] hover:text-white transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <Badge status={challenge.type === 'Government' ? 'Approved' : 'Pending'} />
                <span className="text-[10px] font-black text-gray-400 group-hover:text-blue-200 uppercase tracking-widest">Ends: {challenge.deadline}</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{challenge.title}</h3>
              <div className="flex items-center space-x-2 text-[#FB8500] font-black text-sm uppercase tracking-widest mb-8">
                <Zap size={16} /> <span>Prize: {challenge.prize}</span>
              </div>
              <Button fullWidth variant="outline" className="group-hover:bg-[#FB8500] group-hover:text-white group-hover:border-[#FB8500]">Participate <ArrowRight size={16} className="ml-2" /></Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="apply">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black text-[#0A2463] uppercase tracking-tighter mb-8">Why Participate?</h2>
              <div className="space-y-8">
                {[
                  { title: 'Mentorship', desc: 'Work directly with industry experts.', icon: Target },
                  { title: 'Network', desc: 'Connect with govt and private leaders.', icon: Trophy },
                  { title: 'Career', desc: 'Direct hiring paths for winners.', icon: Zap }
                ].map(item => (
                  <div key={item.title} className="flex items-start space-x-6">
                    <div className="bg-gray-100 p-4 rounded-2xl text-[#FB8500]"><item.icon size={24} /></div>
                    <div>
                      <h4 className="font-black text-[#0A2463] uppercase text-sm mb-1">{item.title}</h4>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tight leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-[60px] p-16 shadow-2xl">
              <h3 className="text-2xl font-black text-[#0A2463] mb-10 uppercase text-center">Challenge Application</h3>
              <form className="space-y-6">
                <Input label="Name" />
                <Input label="Select Challenge" placeholder="Choose from list..." />
                <Input label="Team Size" placeholder="1-4 members" />
                <Input label="Brief Approach" placeholder="How will you solve this?" />
                <Button fullWidth size="lg" className="rounded-2xl h-16 text-lg font-black uppercase tracking-widest shadow-xl">Register Team</Button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Challenges;
