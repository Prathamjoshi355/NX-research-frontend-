
import React, { useState, useRef } from 'react';

interface CompanyData {
  name: string;
  tagline: string;
  description: string;
  hq: string;
  website: string;
  image?: string; // Base64 or URL
}

const CompanyProfileView: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [company, setCompany] = useState<CompanyData>({
    name: 'NX Industry Global',
    tagline: 'Industrial Technology Solutions',
    description: 'Empowering global industrial ecosystems through cutting-edge AI, robust cloud infrastructure, and innovative hardware engineering. We specialize in digital transformation for manufacturing giants.',
    hq: 'Bangalore, India',
    website: 'www.nxindustry.com',
    image: undefined,
  });

  const [tempCompany, setTempCompany] = useState<CompanyData>(company);

  const handleSave = () => {
    setCompany(tempCompany);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempCompany(company);
    setIsEditing(false);
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempCompany({ ...tempCompany, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#002B5B] tracking-tight uppercase">Company Profile</h2>
        {isEditing && (
          <div className="flex gap-4">
            <button 
              onClick={handleCancel}
              className="px-6 py-2 border-2 border-gray-200 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="flex items-center gap-8 mb-8">
              <div 
                onClick={handleImageClick}
                className={`w-24 h-24 bg-[#121212] text-white rounded-3xl flex items-center justify-center text-3xl font-black tracking-tighter shadow-xl shrink-0 overflow-hidden relative group ${isEditing ? 'cursor-pointer hover:ring-4 hover:ring-orange-500/30 transition-all' : ''}`}
              >
                {(isEditing ? tempCompany.image : company.image) ? (
                  <img 
                    src={isEditing ? tempCompany.image : company.image} 
                    alt="Company Logo" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>NX</span>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="fa-solid fa-camera text-white text-xl"></i>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input 
                      className="w-full text-3xl font-black text-[#002B5B] bg-gray-50 border-b-2 border-orange-500 focus:outline-none p-2 rounded-t-lg"
                      value={tempCompany.name}
                      onChange={(e) => setTempCompany({...tempCompany, name: e.target.value})}
                      placeholder="Company Name"
                    />
                    <input 
                      className="w-full text-orange-500 font-bold uppercase text-xs tracking-widest bg-gray-50 border-b border-orange-200 focus:outline-none p-2 rounded-t-lg"
                      value={tempCompany.tagline}
                      onChange={(e) => setTempCompany({...tempCompany, tagline: e.target.value})}
                      placeholder="Tagline"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-3xl font-black text-[#002B5B]">{company.name}</h3>
                    <p className="text-orange-500 font-bold uppercase text-xs tracking-widest">{company.tagline}</p>
                  </>
                )}
              </div>
            </div>
            
            {isEditing ? (
              <textarea 
                rows={4}
                className="w-full text-gray-600 leading-relaxed text-lg bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500/10 resize-none"
                value={tempCompany.description}
                onChange={(e) => setTempCompany({...tempCompany, description: e.target.value})}
                placeholder="Brief description about the company..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed text-lg">
                {company.description}
              </p>
            )}
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Contact Information</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                   <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500"><i className="fa-solid fa-location-dot"></i></div>
                   <div className="flex-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Headquarters</p>
                      {isEditing ? (
                        <input 
                          className="w-full text-[#002B5B] font-bold bg-gray-50 border-b border-gray-200 focus:outline-none p-1"
                          value={tempCompany.hq}
                          onChange={(e) => setTempCompany({...tempCompany, hq: e.target.value})}
                        />
                      ) : (
                        <p className="text-[#002B5B] font-bold">{company.hq}</p>
                      )}
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500"><i className="fa-solid fa-globe"></i></div>
                   <div className="flex-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Website</p>
                      {isEditing ? (
                        <input 
                          className="w-full text-[#002B5B] font-bold bg-gray-50 border-b border-gray-200 focus:outline-none p-1"
                          value={tempCompany.website}
                          onChange={(e) => setTempCompany({...tempCompany, website: e.target.value})}
                        />
                      ) : (
                        <p className="text-[#002B5B] font-bold">{company.website}</p>
                      )}
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-[#121212] rounded-[2.5rem] p-10 text-white shadow-xl shadow-gray-900/20">
           <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">Industry Stats</h4>
           <div className="space-y-8">
              <div>
                 <p className="text-3xl font-black text-white tracking-tight">150+</p>
                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Projects Handled</p>
              </div>
              <div>
                 <p className="text-3xl font-black text-white tracking-tight">45</p>
                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Global Partners</p>
              </div>
              {!isEditing && (
                <div className="pt-8 border-t border-white/10">
                   <button 
                     onClick={() => setIsEditing(true)}
                     className="w-full py-4 bg-white text-[#121212] rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-lg"
                   >
                     EDIT PROFILE
                   </button>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileView;
