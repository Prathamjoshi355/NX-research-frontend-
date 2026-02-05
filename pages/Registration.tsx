
import React, { useState } from 'react';
import { Step, FormData, INITIAL_FORM_DATA } from '../FCCtypes';
import Sidebar from '../components/Sidebar';
import StepIndicator from '../components/StepIndicator';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GraduationCap,
  Rocket,
  Briefcase,
  Users,
  Layout,
  CreditCard,
  Target,
  Trophy,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Megaphone,
  Info,
  Check
} from 'lucide-react';

// Simulated Backend Data for Marketing Placements
const MARKETING_PLACEMENTS = [
  { id: 'p1', title: 'Main Entrance Premium Standee', price: '₹15,000', desc: 'Primary visibility for all attendees entering the summit hall.' },
  { id: 'p2', title: 'Networking Lounge Digital Rotation', price: '₹10,000', desc: 'Logo loop on all lounge and coffee area screens.' },
  { id: 'p3', title: 'Registration Backdrop Co-Branding', price: '₹12,000', desc: 'Your logo featured on the official check-in wall.' },
  { id: 'p4', title: 'Exclusive Product Demo Slot (15 min)', price: '₹25,000', desc: 'A dedicated slot on the secondary stage for live demo.' },
  { id: 'p5', title: 'Strategic QR Lead Capture Kit', price: '₹5,000', desc: 'Table-top QR codes for instant visitor lead generation.' },
  { id: 'p6', title: 'VIP Networking Dinner Access', price: '₹8,000', desc: 'Brand presence in the exclusive founder-investor dining zone.' },
];

const Registration = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.AGREEMENTS);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [showPromoList, setShowPromoList] = useState(false);
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, Step.PAYMENT));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, Step.AGREEMENTS));

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePlacement = (id: string) => {
    setSelectedPlacements(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderPromotionDetails = () => (
    <div className="mt-6 space-y-4 animate-in slide-in-from-top-4 duration-500">
      <div className="bg-[#1F2D2B] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Megaphone size={140} />
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#3FB998] rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Trophy size={24} className="text-white" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tighter italic leading-none">Strategic Placement Catalog</h4>
            <p className="text-blue-200/50 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Select your marketing nodes</p>
          </div>
        </div>

        {/* Multiple Choice Placement List */}
        <div className="space-y-3 mb-8 relative z-10">
          {MARKETING_PLACEMENTS.map((pkg) => {
            const isSelected = selectedPlacements.includes(pkg.id);
            return (
              <div
                key={pkg.id}
                onClick={() => togglePlacement(pkg.id)}
                className={`group flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${isSelected
                  ? 'bg-white/10 border-[#3FB998] shadow-lg shadow-black/20'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#3FB998] border-[#3FB998]' : 'border-white/20'
                    }`}>
                    {isSelected && <Check size={14} className="text-white" strokeWidth={4} />}
                  </div>
                  <div>
                    <p className={`text-xs font-black uppercase tracking-tight italic transition-colors ${isSelected ? 'text-[#3FB998]' : 'text-white'}`}>
                      {pkg.title}
                    </p>
                    <p className="text-[9px] text-blue-100/40 font-medium italic mt-0.5">{pkg.desc}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black italic tracking-tighter text-white">{pkg.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 flex items-start gap-4">
          <Info size={18} className="text-[#3FB998] shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-100/60 font-medium italic leading-relaxed">
            Fees listed above are per slot for the entire duration of the summit. Revenue generated scales the <span className="text-white font-bold">NX Innovation Fund</span> to empower young researchers.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-300/40">NX_PROTOCOL_MARKET_v1.0</span>
          </div>
          <p className="text-[10px] font-black uppercase text-[#3FB998] tracking-widest italic">
            Total Selected: {selectedPlacements.length}
          </p>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case Step.AGREEMENTS:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CollapsibleSection title="Registration Notifications" defaultOpen>
              <div className="p-8 space-y-4 text-slate-600 leading-relaxed font-medium italic">
                <p>We'll send you important updates regarding the summit schedule, networking sessions, and logistic Terms & Conditions  via your registered credentials.</p>
                <div className="h-px bg-slate-100 my-6" />
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.receiveNotifications}
                    onChange={(e) => handleInputChange('receiveNotifications', e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-[#3FB998] focus:ring-[#3FB998] accent-[#3FB998]"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1F2D2B] group-hover:text-[#3FB998] transition-colors">I wish to receive research notifications</span>
                </label>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Privacy and Operational Terms" defaultOpen>
              <div className="p-8 space-y-4 text-slate-500 leading-relaxed font-medium italic max-h-60 overflow-y-auto scrollbar-thin">
                <p>1. **Data Security**: By registering for the FCC Summit, you agree to our Research Integrity Terms & Conditions . We protect your R&D data using NX_SECURE end-to-end encryption.</p>
                <p>2. **Code of Conduct**: Participants must maintain professional research standards. Plagiarism or unprofessional conduct leads to immediate revocation of entry.</p>
                <p>3. **Media Release**: You grant NX Research permission to use event media for educational and promotional outreach.</p>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-[#1F2D2B] focus:ring-[#1F2D2B] accent-[#1F2D2B]"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1F2D2B] group-hover:text-[#3FB998] transition-colors">I accept the Research Integrity Protocol</span>
                </label>
              </div>
            </CollapsibleSection>
          </div>
        );

      case Step.PERSONAL_INFO:
        return (
          <CollapsibleSection title="Personal Identity" defaultOpen>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="First Name" value={formData.firstName} onChange={v => handleInputChange('firstName', v)} />
              <Input label="Last Name" value={formData.lastName} onChange={v => handleInputChange('lastName', v)} />
              <Input label="Primary Email" type="email" value={formData.personalEmail} onChange={v => handleInputChange('personalEmail', v)} />
              <Input label="Professional Email" type="email" value={formData.professionalEmail} onChange={v => handleInputChange('professionalEmail', v)} />
              <Input label="Contact" value={formData.personalContact} onChange={v => handleInputChange('personalContact', v)} />
              <Input label="Official Contact" value={formData.professionalContact} onChange={v => handleInputChange('professionalContact', v)} />
              <Input label="Gender" value={formData.gender} onChange={v => handleInputChange('gender', v)} />
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1 block pl-1">Pronoun</label>
                <select
                  className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#3FB998] outline-none transition-all font-bold text-xs"
                  value={formData.pronoun}
                  onChange={(e) => handleInputChange('pronoun', e.target.value)}
                >
                  <option value="">Select Title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                </select>
              </div>
              <Input label="City" value={formData.city} onChange={v => handleInputChange('city', v)} />
              <Input label="State" value={formData.state} onChange={v => handleInputChange('state', v)} />
            </div>
          </CollapsibleSection>
        );

      case Step.SELECT_CATEGORY:
        const categories = [
          { id: 'STUDENT', label: 'STUDENT', icon: GraduationCap },
          { id: 'STARTUP', label: 'Founder', icon: Rocket },
          { id: 'INVESTOR', label: 'Investor', icon: Briefcase },
          { id: 'ORGANIZER', label: 'Organizer', icon: Users },
        ];
        return (
          <CollapsibleSection title="Category" defaultOpen>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = formData.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleInputChange('category', cat.id)}
                    className={`flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${isSelected ? 'border-[#3FB998] bg-[#3FB998]/10 text-[#1F2D2B] shadow-xl' : 'border-slate-50 bg-white hover:border-[#1F2D2B] text-slate-400'
                      }`}
                  >
                    <Icon className={`w-12 h-12 transition-transform ${isSelected ? 'scale-110 text-[#3FB998]' : ''}`} />
                    <span className="font-black uppercase tracking-[0.2em] text-[10px]">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </CollapsibleSection>
        );

      case Step.CATEGORY_DETAILS:
        if (formData.category === 'STUDENT') {
          return (
            <CollapsibleSection title="Professional Info" defaultOpen>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label="Academic Institution Name" />
                  <Input label="Degree Program " />
                  <Input label="Branch " />
                  <Input label="Year of Graduation" />
                </div>
                <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 space-y-6">
                  
                </div>
              </div>
            </CollapsibleSection>
          );
        }
        if (formData.category === 'STARTUP' || formData.category === 'INVESTOR') {
          return (
            <CollapsibleSection title={formData.category === 'STARTUP' ? "Startup" : "Investor Verification"} defaultOpen>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label={formData.category === 'STARTUP' ? "Startup Identity" : "Fund / Company Name"} />
                  {formData.category === 'STARTUP' && (
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1 block pl-1">Stage</label>
                      <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-white">
                        {['IDEA', 'MVP', 'SCALE'].map(stage => (
                          <button key={stage} className="flex-1 py-4 text-[10px] font-black hover:bg-slate-50 transition-colors border-r last:border-0 uppercase italic tracking-tighter text-[#1F2D2B]">
                            {stage}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Promotion Toggle with Dynamic List
                <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-lg overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-1">
                      <p className="font-black text-[#1F2D2B] uppercase text-xs tracking-tight italic">Promotion Listing</p>
                      <p className="text-[9px] text-[#3FB998] font-black uppercase tracking-widest">Reserve your strategic marketing nodes</p>
                    </div>
                    <ToggleButton active={showPromoList} onClick={() => setShowPromoList(!showPromoList)} />
                  </div>
                  {showPromoList && renderPromotionDetails()}
                </div> */}

                {/* <div className="p-8 bg-[#3FB998]/10 rounded-[2.5rem] border border-[#3FB998]/20 flex items-start gap-4">
                  <div className="p-3 bg-white rounded-2xl text-[#3FB998] shadow-sm"><Zap size={20} /></div>
                  <div className="space-y-2">
                    <p className="text-xs text-[#1F2D2B] font-bold italic leading-relaxed">
                      "If you have specific standee designs or brand posters, please dispatch them via secure mail for verification."
                    </p>
                    <p className="text-[9px] font-black uppercase text-[#3FB998] tracking-widest">Registry@nxresearch.org</p>
                  </div>
                </div> */}
              </div>
            </CollapsibleSection>
          );
        }
        return <div className="p-12 text-center text-slate-300 font-black uppercase tracking-widest text-[10px]">Strategic category mapping active. Click Next to continue.</div>;

      case Step.ADDITIONAL_INFO:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <CollapsibleSection title="Strategic Interests" defaultOpen>
              <div className="p-8 space-y-6">
                <p className="font-black text-[#1F2D2B] uppercase text-[10px] tracking-widest">Which are your core objectives?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Elite Networking',
                    'Strategic Funding',
                    'Direct Mentorship',
                    'R&D Collaboration',
                    'Domain Exposure'
                  ].map((interest) => (
                    <label key={interest} className="flex items-center gap-3 p-5 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-[#3FB998] transition-all cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-slate-300 accent-[#3FB998]"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => {
                          const newInterests = e.target.checked
                            ? [...formData.interests, interest]
                            : formData.interests.filter(i => i !== interest);
                          handleInputChange('interests', newInterests);
                        }}
                      />
                      <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-[#1F2D2B] tracking-widest">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Online Influence & Registry" defaultOpen>
              <div className="p-8 space-y-6">
                {formData.socialNetworks.map((net, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end group animate-in slide-in-from-top-2">
                    <Input
                      label="Registry Platform"
                      placeholder="e.g. LinkedIn"
                      value={net.platform}
                      onChange={(v) => {
                        const newNets = [...formData.socialNetworks];
                        newNets[idx].platform = v;
                        handleInputChange('socialNetworks', newNets);
                      }}
                    />
                    <div className="relative">
                      <Input
                        label="Portfolio / URL"
                        placeholder="https://..."
                        value={net.url}
                        onChange={(v) => {
                          const newNets = [...formData.socialNetworks];
                          newNets[idx].url = v;
                          handleInputChange('socialNetworks', newNets);
                        }}
                      />
                      {idx > 0 && (
                        <button
                          onClick={() => {
                            const newNets = formData.socialNetworks.filter((_, i) => i !== idx);
                            handleInputChange('socialNetworks', newNets);
                          }}
                          className="absolute -right-12 top-10 p-4 text-rose-500 hover:scale-110 transition-transform"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => handleInputChange('socialNetworks', [...formData.socialNetworks, { platform: '', url: '' }])}
                  className="flex items-center gap-2 px-6 py-6 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-[#3FB998] hover:text-[#3FB998] transition-all w-full justify-center group"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  <span className="font-black uppercase tracking-[0.2em] text-[9px]">Add Strategic Registry</span>
                </button>
              </div>
            </CollapsibleSection>
          </div>
        );

      case Step.PAYMENT:
        return (
          <CollapsibleSection title="Verification Checkout" defaultOpen>
            <div className="p-12 space-y-8 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-[#3FB998]/10 text-[#3FB998] rounded-full flex items-center justify-center shadow-xl shadow-teal-100 animate-float">
                <CreditCard className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-[#1F2D2B] uppercase tracking-tighter italic">Secure Gateway</h3>
                <p className="text-slate-500 font-medium italic">Process your enrollment verification to finalize your seat.</p>
              </div>
              <div className="w-full max-w-sm space-y-4">
                {['Secure Card Portal', 'Bank Intelligence Transfer', 'Mobile Node Wallet'].map(method => (
                  <button key={method} className="w-full p-6 text-left border-2 border-slate-50 rounded-2xl hover:border-[#3FB998] hover:bg-white bg-slate-50/30 transition-all flex justify-between items-center group">
                    <span className="font-black text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-[#1F2D2B]">{method}</span>
                    <ChevronDown className="w-4 h-4 text-slate-200 group-hover:text-[#3FB998]" />
                  </button>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8F9FA]">
      <Sidebar currentStep={currentStep} />

      <main className="flex-1 overflow-y-auto px-6 md:px-12 py-12 lg:py-10">
        <div className="max-w-4xl mx-auto">
          

          <StepIndicator currentStep={currentStep} />

          <div className="min-h-[200px] mb-12">
            {renderStepContent()}
          </div>

          <div className="bottom-8 z-20">
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-100 shadow-3xl shadow-blue-900/10">
              <button
                onClick={prevStep}
                disabled={currentStep === Step.AGREEMENTS}
                className="px-8 py-4 rounded-xl font-black text-[10px] uppercase text-slate-400 hover:text-[#1F2D2B] disabled:opacity-0 transition-all tracking-widest flex items-center gap-2"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <button
                onClick={currentStep === Step.PAYMENT ? () => alert("Enrollment Provisioned") : nextStep}
                disabled={currentStep === Step.AGREEMENTS && !formData.agreedToTerms}
                className={`px-12 h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 ${currentStep === Step.PAYMENT ? 'bg-[#3FB998] text-white' : 'bg-[#1F2D2B] text-white'
                  }`}
              >
                {currentStep === Step.PAYMENT ? 'Finalize Enrollment' : 'Continue Step'} <ArrowRight size={14} />
              </button>
            </div>
          </div>

         
        </div>
      </main>
    </div>
  );
};

// Internal Helper Components
const CollapsibleSection: React.FC<{ title: string, children: React.ReactNode, defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden transition-all duration-300 mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-8 bg-white hover:bg-slate-50/50 transition-colors border-b border-slate-50"
      >
        <div className="flex items-center gap-4">
          <div className={`w-1.5 h-6 rounded-full transition-colors ${isOpen ? 'bg-[#3FB998]' : 'bg-slate-200'}`} />
          <span className="text-sm font-black text-[#1F2D2B] uppercase tracking-widest italic">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
      </button>
      <div className={`transition-all duration-500 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        {children}
      </div>
    </div>
  );
};

const Input: React.FC<{ label: string, type?: string, value?: string, onChange?: (v: string) => void, placeholder?: string }> = ({ label, type = 'text', value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1 block pl-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#3FB998] focus:bg-white outline-none transition-all font-bold text-xs text-[#1F2D2B] placeholder:text-slate-300"
      placeholder={placeholder || `Specify ${label.toLowerCase()}...`}
    />
  </div>
);

const ToggleButton: React.FC<{ active: boolean, onClick: () => void }> = ({ active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 p-1 ${active ? 'bg-[#3FB998]' : 'bg-slate-200'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
};

export default Registration;
