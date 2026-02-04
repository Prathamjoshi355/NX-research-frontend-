
import React from 'react';

export const HowItWorks: React.FC<{ onApply: () => void }> = ({ onApply }) => {
  const steps = [
    { num: '1️⃣', title: 'Apply for Course', desc: 'Fill out the basic assessment form' },
    { num: '2️⃣', title: 'Mentor Interview', desc: '1-on-1 talk to understand your goals' },
    { num: '3️⃣', title: 'Skill Analysis', desc: 'Deep dive into your current level' },
    { num: '4️⃣', title: 'Recommendation', desc: 'We suggest the best learning duration' },
    { num: '5️⃣', title: 'Start Learning', desc: 'Begin your professional journey' },
  ];

  return (
    <section className="py-20 bg-[#1F2D2B] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-400">Our mentors ensure you follow the path that guarantees results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-20">
          {steps.map((step, idx) => (
            <div key={idx} className="relative text-center group">
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-[2px] bg-[#4A5D5A] -translate-x-1/2 -z-0"></div>
              )}
              <div className="relative z-10 w-20 h-20 bg-[#1F2D2B] rounded-full flex items-center justify-center text-3xl mx-auto mb-6 border-2 border-[#A9E2D2] group-hover:border-[#3FB998] transition-colors">
                {step.num}
              </div>
              <h4 className="font-bold mb-2">{step.title}</h4>
              <p className="text-sm text-[#8FA6A1]">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1F2D2B]/95 p-8 lg:p-12 rounded-3xl border border-[#3FB998]/30">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Not Sure Which Duration Is Right?</h3>
              <p className="text-[#8FA6A1] mb-8 leading-relaxed">
                Don't worry about picking the "wrong" duration. Our mentor team analyzes your current skill set,
                availability, and end goals to recommend the most effective path for you.
              </p>
              <button
                onClick={onApply}
                className="bg-[#3FB998] hover:bg-[#3FB998]/90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-black/40"
              >
                Apply for Skill Assessment
              </button>
            </div>
            <div className="flex-1 w-full lg:max-w-md">
              <div className="bg-black/30 rounded-2xl overflow-hidden border border-[#3FB998]/30">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#3FB998]/20">
                    <tr>
                      <th className="p-4 font-bold">Feature</th>
                      <th className="p-4 font-bold text-[#3FB998]">NX Research</th>
                      <th className="p-4 font-bold text-[#8FA6A1]">Typical</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3FB998]/10">
                    {[
                      ['Mentorship', 'Live 1:1', 'Recorded'],
                      ['Projects', 'Real-world', 'Theory'],
                      ['Path', 'Personalized', 'One-size'],
                      ['Guidance', 'Career Roadmaps', 'None'],
                      ['Exposure', 'Startup Core', 'Not available']
                    ].map(([label, nx, typ], i) => (
                      <tr key={i}>
                        <td className="p-4 text-[#A9E2D2]">{label}</td>
                        <td className="p-4 font-semibold text-white">{nx}</td>
                        <td className="p-4 text-[#8FA6A1]">{typ}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
