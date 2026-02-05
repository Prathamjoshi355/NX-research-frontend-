
import React, { useState } from 'react';
import { getResearchStrategyResponse } from '../services/researchService';

interface Props {
  onClose: () => void;
}

type Step = 'industry' | 'problem' | 'analysis' | 'contact';

const ConnectModal: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState<Step>('industry');
  const [industry, setIndustry] = useState('');
  const [problem, setProblem] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const industries = [
    { id: 'tech', label: 'Technology & Software', icon: '💻' },
    { id: 'finance', label: 'FinTech & Banking', icon: '🏦' },
    { id: 'health', label: 'Healthcare & BioTech', icon: '🧬' },
    { id: 'manufacturing', label: 'Smart Manufacturing', icon: '🏭' },
    { id: 'gov', label: 'Public Sector', icon: '🏛️' },
    { id: 'other', label: 'Other Industries', icon: '🌐' },
  ];

  const handleIndustrySelect = (label: string) => {
    setIndustry(label);
    setStep('problem');
  };

  const generateAnalysis = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setStep('analysis');
    const result = await getResearchStrategyResponse(industry, problem);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2D2B]/80 backdrop-blur-md p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[600px]">
        
        {/* Sidebar - Progress using Dark Charcoal */}
        <div className="bg-[#1F2D2B] w-full md:w-1/3 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-[#3FB998] rounded flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="font-bold tracking-tight uppercase">NX Consultancy</span>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Partnership Discovery</h2>
            
            <div className="space-y-6">
              {[
                { s: 'industry', l: 'Sector Selection', n: 1 },
                { s: 'problem', l: 'Strategic Need', n: 2 },
                { s: 'analysis', l: 'Strategy Proposal', n: 3 },
                { s: 'contact', l: 'Finalize Request', n: 4 },
              ].map((item) => (
                <div key={item.s} className={`flex items-center space-x-4 ${step === item.s ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${step === item.s ? 'bg-[#3FB998] border-[#3FB998]' : 'border-white'}`}>
                    {item.n}
                  </div>
                  <span className="font-medium">{item.l}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button onClick={onClose} className="text-sm text-[#8FA6A1] hover:text-white transition-colors text-left uppercase tracking-widest font-bold">
            &larr; Exit Discovery
          </button>
        </div>

        {/* Main Content Area using Off-White */}
        <div className="flex-1 bg-[#F7FAF9] p-8 md:p-12 overflow-y-auto">
          {step === 'industry' && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-extrabold text-[#1F2D2B] mb-2">Identify your sector</h3>
              <p className="text-[#4A5D5A] mb-8">Select the primary industry for the research project.</p>
              <div className="grid grid-cols-2 gap-4">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => handleIndustrySelect(ind.label)}
                    className="flex flex-col items-center justify-center p-6 bg-white border border-[#EEF4F2] rounded-2xl hover:border-[#3FB998] hover:shadow-lg transition-all group"
                  >
                    <span className="text-3xl mb-3">{ind.icon}</span>
                    <span className="text-sm font-bold text-[#4A5D5A] group-hover:text-[#3FB998] text-center">{ind.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'problem' && (
            <div className="animate-fadeIn">
              <button onClick={() => setStep('industry')} className="text-[#3FB998] text-sm font-bold mb-4 inline-block">&larr; Back to Sectors</button>
              <h3 className="text-2xl font-extrabold text-[#1F2D2B] mb-2">Define your challenge</h3>
              <p className="text-[#4A5D5A] mb-6">Briefly describe the professional challenge or data set you wish to investigate.</p>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="e.g., Optimizing logistics routing through advanced data modeling..."
                className="w-full h-40 p-4 border border-[#A9E2D2] rounded-2xl focus:ring-2 focus:ring-[#3FB998] focus:outline-none bg-white text-[#1F2D2B] placeholder-[#8FA6A1] shadow-sm"
              />
              <button
                onClick={generateAnalysis}
                disabled={!problem.trim() || loading}
                className="mt-6 w-full bg-[#1F2D2B] text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? 'Compiling Strategy...' : 'View Proposed Framework'}
              </button>
            </div>
          )}

          {step === 'analysis' && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-extrabold text-[#1F2D2B] mb-4">Proposed Research Framework</h3>
              {loading ? (
                <div className="space-y-4 py-8">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-32 bg-gray-200 rounded animate-pulse w-full mt-8"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white p-6 border-l-4 border-[#3FB998] rounded-r-2xl shadow-sm italic text-[#4A5D5A] whitespace-pre-line leading-relaxed">
                    {analysis}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep('problem')}
                      className="flex-1 border-2 border-[#EEF4F2] py-4 rounded-xl font-bold text-[#4A5D5A] hover:bg-white transition-all"
                    >
                      Modify Parameters
                    </button>
                    <button
                      onClick={() => setStep('contact')}
                      className="flex-1 bg-[#3FB998] text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all"
                    >
                      Confirm Framework
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'contact' && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-extrabold text-[#1F2D2B] mb-2">Finalize Request</h3>
              <p className="text-[#4A5D5A] mb-8">Our executive team will review your proposal and contact you via your business credentials.</p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full p-4 border border-[#A9E2D2] rounded-xl focus:ring-2 focus:ring-[#3FB998] focus:outline-none bg-white text-[#1F2D2B] placeholder-[#8FA6A1] shadow-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Business Email"
                  className="w-full p-4 border border-[#A9E2D2] rounded-xl focus:ring-2 focus:ring-[#3FB998] focus:outline-none bg-white text-[#1F2D2B] placeholder-[#8FA6A1] shadow-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full p-4 border border-[#A9E2D2] rounded-xl focus:ring-2 focus:ring-[#3FB998] focus:outline-none bg-white text-[#1F2D2B] placeholder-[#8FA6A1] shadow-sm"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
                <button
                  onClick={onClose}
                  className="w-full bg-[#1F2D2B] text-white py-5 rounded-xl font-bold hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-xl uppercase tracking-widest mt-4"
                >
                  Submit Partnership Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
