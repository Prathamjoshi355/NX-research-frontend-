
import React, { useState } from 'react';

const SubmitProblemView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-[#002B5B] tracking-tight uppercase mb-8">Submit Industry Problem</h2>
      
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 max-w-3xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Problem Title</label>
            <input type="text" placeholder="e.g. Inefficient Sorting Algorithm" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium" required />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Detailed Description</label>
            <textarea rows={4} placeholder="Describe the industrial challenge in detail..." className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium resize-none" required></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Urgency</label>
              <select className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-bold text-gray-600">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Department</label>
              <input type="text" placeholder="Engineering, R&D..." className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium" />
            </div>
          </div>

          <button type="submit" className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-3">
            {submitted ? <><i className="fa-solid fa-check"></i> SUBMITTED</> : <><i className="fa-solid fa-paper-plane"></i> SUBMIT PROBLEM</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitProblemView;
