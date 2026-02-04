
import React from 'react';
import { Section, Card, Badge, Button } from '../components/Common';
import { Trophy, FileText, Rocket, Users, ArrowRight } from 'lucide-react';
import { IMPACT_METRICS } from '../constants';

const Impact = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <Section className="text-center pt-32 pb-44">
        <h1 className="text-6xl md:text-8xl font-black text-[#1F2D2B] mb-8 leading-[0.85] tracking-tighter uppercase">Outcomes & Impact</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-14 leading-relaxed font-semibold">Measuring real-world solutions and student transformation.</p>
      </Section>

      <Section gray className="py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {IMPACT_METRICS.map((stat, i) => (
            <Card key={i} className="p-10 bg-white border-none shadow-sm rounded-[3rem] text-center">
              <div className="text-[#3FB998] mb-4 flex justify-center"><stat.Icon size={32} /></div>
              <h4 className="text-4xl font-black text-[#1F2D2B] mb-2">{stat.value}</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-8">Research Reports</h2>
            <div className="space-y-4">
              {[
                { title: 'AI in Decentralized Power Grids', date: 'Jan 2024', domain: 'Energy' },
                { title: 'Hydroponics Optimization for Arid Zones', date: 'Dec 2023', domain: 'Agriculture' },
                { title: 'Urban Traffic Flow AI Model', date: 'Nov 2023', domain: 'Gov Research' }
              ].map((report, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 p-6 rounded-3xl group cursor-pointer hover:bg-[#1F2D2B] hover:text-white transition-all">
                  <div>
                    <h4 className="font-bold text-sm uppercase">{report.title}</h4>
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mt-1">{report.domain} • {report.date}</p>
                  </div>
                  <FileText className="text-[#3FB998] group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>
          <Card className="bg-[#3FB998] text-white border-none p-16 rounded-[4rem] flex flex-col justify-center">
            <Trophy className="mb-8 w-16 h-16" />
            <h3 className="text-3xl font-black uppercase mb-6 leading-none">Student Growth Stories</h3>
            <p className="text-white/90 font-medium text-lg leading-relaxed mb-8">"NX Research didn't just teach me tech, it taught me how to solve. I went from being a student to leading a government project in 6 months."</p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full"></div>
              <div>
                <p className="font-black uppercase text-sm">Aakash Kumar</p>
                <p className="text-xs font-bold opacity-60">Lead Researcher, Project UrbanWaste</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section gray className="text-center py-32">
        <h2 className="text-4xl font-black text-[#1F2D2B] uppercase tracking-tighter mb-8">Global Industry Feedback</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl font-bold text-gray-400 italic">"The prototypes coming out of NX are not just POCs; they are architectural benchmarks for solving modern urban problems."</p>
        </div>
      </Section>
    </div>
  );
};

export default Impact;
