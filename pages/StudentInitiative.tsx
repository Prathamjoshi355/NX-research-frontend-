
import React from 'react';
import { Section, Button, Card, Input, Textarea } from '../components/Common';
import { ArrowRight, CheckCircle } from 'lucide-react';

const StudentInitiative = () => (
  <div className="animate-in slide-in-from-left duration-500">
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#0A1211]">
         {/* <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0A1211] z-[2]"></div> */}
        <div className="absolute inset-0 z-[1] opacity-50">
          <img
            src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1770321403/Student_Initiative_Home_wpysvr.jpg"
            alt="Research Hero"
            className="w-full h-full object-cover grayscale brightness-[0.3]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center px-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#3FB998]/10 border border-[#3FB998]/20 text-[#3FB998] text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Strategic Industrial R&D
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-[#FFF0F0] leading-[0.9] mb-8 tracking-tighter uppercase italic">
            Student Initiative <br /> <span className="text-[#3FB998]">Program</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-[#FFF0F0] mb-12 leading-relaxed font-medium italic opacity-80">
           Students lead. Mentors guide. Research happens.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          </div>
        </div>
      </section>

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
