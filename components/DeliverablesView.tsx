
import React, { useState } from 'react';

const DeliverablesView: React.FC = () => {
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);

  const deliverables = [
    { title: 'System Architecture Diagram', date: 'March 15, 2024', status: 'Ready', type: 'PDF' },
    { title: 'Phase 1 Source Code', date: 'March 10, 2024', status: 'In Review', type: 'ZIP' },
    { title: 'Hardware Specifications', date: 'March 05, 2024', status: 'Ready', type: 'DOCX' },
    { title: 'User Manual Draft', date: 'March 01, 2024', status: 'Archived', type: 'PDF' },
  ];

  const handleDownload = (index: number) => {
    if (downloadingIndex !== null) return;
    setDownloadingIndex(index);
    setTimeout(() => {
      setDownloadingIndex(null);
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-[#002B5B] tracking-tight uppercase">Deliverables</h2>
        <p className="text-gray-400 font-medium text-[10px] sm:text-sm mt-1 uppercase tracking-widest">Asset Management & Project Resources</p>
      </div>
      
      <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar custom-scrollbar">
          <table className="w-full text-left min-w-[600px] sm:min-w-full">
            <thead className="bg-slate-50/80 border-b border-gray-100">
              <tr>
                <th className="px-4 sm:px-10 py-4 sm:py-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Item Name</th>
                <th className="px-4 sm:px-10 py-4 sm:py-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date Created</th>
                <th className="px-4 sm:px-10 py-4 sm:py-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-4 sm:px-10 py-4 sm:py-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Format</th>
                <th className="px-4 sm:px-10 py-4 sm:py-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {deliverables.map((item, i) => (
                <tr 
                  key={i} 
                  onClick={() => handleDownload(i)}
                  className="hover:bg-orange-50/30 transition-all cursor-pointer group active:bg-orange-50"
                >
                  <td className="px-4 sm:px-10 py-6 sm:py-8">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-orange-500 transition-all shadow-sm shrink-0">
                        <i className={`fa-solid ${item.type === 'PDF' ? 'fa-file-pdf' : item.type === 'ZIP' ? 'fa-file-zipper' : 'fa-file-lines'} text-base sm:text-lg`}></i>
                      </div>
                      <span className="font-black text-[#002B5B] text-sm sm:text-lg group-hover:text-orange-600 transition-colors line-clamp-1">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-10 py-6 sm:py-8 text-[11px] sm:text-sm text-gray-400 font-black tracking-widest uppercase whitespace-nowrap">{item.date}</td>
                  <td className="px-4 sm:px-10 py-6 sm:py-8 text-sm">
                    <span className={`inline-block whitespace-nowrap px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-sm ${
                      item.status === 'Ready' ? 'bg-emerald-100 text-emerald-600' :
                      item.status === 'In Review' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-10 py-6 sm:py-8 text-[10px] sm:text-xs font-black text-gray-300 group-hover:text-gray-500 tracking-[0.2em]">{item.type}</td>
                  <td className="px-4 sm:px-10 py-6 sm:py-8 text-right">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all ml-auto ${
                      downloadingIndex === i 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                        : 'bg-slate-50 text-slate-300 group-hover:bg-white group-hover:text-orange-500 group-hover:shadow-md'
                    }`}>
                      {downloadingIndex === i ? (
                        <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                      ) : (
                        <i className="fa-solid fa-cloud-arrow-down text-base sm:text-lg"></i>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {downloadingIndex !== null && (
        <div className="fixed bottom-6 sm:bottom-12 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 lg:left-auto lg:right-12 lg:translate-x-0 bg-[#121212] text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl sm:rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 flex items-center gap-4 sm:gap-6 z-[100] border border-white/5 backdrop-blur-md">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce shrink-0">
            <i className="fa-solid fa-check text-xs sm:text-sm"></i>
          </div>
          <div>
            <span className="font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] block">Secure Downloader</span>
            <span className="text-gray-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest truncate max-w-[150px] sm:max-w-none block">Preparing {deliverables[downloadingIndex].title}...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliverablesView;
