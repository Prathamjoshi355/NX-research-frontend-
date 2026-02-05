
import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

const JoinModal: React.FC<Props> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2D2B]/80 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-[#A9E2D2]/30 text-[#3FB998] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1F2D2B] mb-2">Application Received!</h2>
          <p className="text-[#4A5D5A] mb-6">Thank you for your interest in joining NX Research. Our team will review your profile and get back to you shortly.</p>
          <button 
            onClick={onClose}
            className="w-full bg-[#3FB998] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2D2B]/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="bg-[#1F2D2B] p-6 flex justify-between items-center text-white">
          <h3 className="text-xl font-bold uppercase tracking-tight">Researcher Application</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-4 bg-[#F7FAF9]">
          <div>
            <label className="block text-sm font-semibold text-[#4A5D5A] mb-1">Full Name</label>
            <input 
              required 
              type="text" 
              className="w-full border border-[#A9E2D2] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3FB998] focus:outline-none bg-white text-[#1F2D2B] placeholder-[#8FA6A1]" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#4A5D5A] mb-1">Email Address</label>
            <input 
              required 
              type="email" 
              className="w-full border border-[#A9E2D2] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3FB998] focus:outline-none bg-white text-[#1F2D2B] placeholder-[#8FA6A1]" 
              placeholder="john@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#4A5D5A] mb-1">Research Interest</label>
            <select className="w-full border border-[#A9E2D2] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3FB998] focus:outline-none bg-white text-[#1F2D2B]">
              <option>Data Science & Applied Math</option>
              <option>Cybersecurity</option>
              <option>Biotechnology</option>
              <option>Financial Research</option>
              <option>Socio-Economic Studies</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#4A5D5A] mb-1">Resume / CV</label>
            <input 
              required 
              type="file" 
              className="w-full text-sm text-[#4A5D5A] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#A9E2D2]/20 file:text-[#3FB998] hover:file:bg-[#A9E2D2]/40 bg-white border border-[#A9E2D2] rounded-lg p-1" 
            />
          </div>
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-[#3FB998] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-colors shadow-lg uppercase tracking-widest text-sm"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinModal;
