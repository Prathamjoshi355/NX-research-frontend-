
import React, { useState } from 'react';
import { Step, FormData, INITIAL_FORM_DATA, Category } from '../FCCtypes';
import Sidebar from '../components/FCCRegistrationSidebar';
import StepIndicator from '../components/FCCRegistrationStepIndicator';
// Added CreditCard to the list of imported icons from lucide-react
import { ChevronDown, ChevronUp, Plus, Trash2, GraduationCap, Rocket, Briefcase, Users, Layout, CreditCard } from 'lucide-react';

const FCCRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.AGREEMENTS);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, Step.PAYMENT));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, Step.AGREEMENTS));

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case Step.AGREEMENTS:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CollapsibleSection title="Registration Notifications" defaultOpen>
              <div className="p-6 space-y-4 text-slate-600 leading-relaxed">
                <p>We'll send you important updates regarding the event schedule, networking opportunities, and logistics via your registered email and contact number.</p>
                <div className="h-px bg-slate-100 my-4" />
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.receiveNotifications}
                    onChange={(e) => handleInputChange('receiveNotifications', e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium group-hover:text-indigo-600 transition-colors">I wish to receive notifications</span>
                </label>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Privacy and Terms" defaultOpen>
              <div className="p-6 space-y-4 text-slate-600 leading-relaxed max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                <p>By registering for this event, you agree to our standard privacy policy and terms of service. We respect your data and will never sell it to third parties.</p>
                <p>Participants are expected to maintain professional conduct throughout the sessions. Any form of harassment or unprofessional behavior will lead to immediate disqualification without refund.</p>
                <p>Photography and videography will be conducted during the event for promotional purposes. By attending, you grant permission for your likeness to be used in event media.</p>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.agreedToTerms}
                    onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium group-hover:text-indigo-600 transition-colors">I agree and wish to continue</span>
                </label>
              </div>
            </CollapsibleSection>
          </div>
        );

      case Step.PERSONAL_INFO:
        return (
          <CollapsibleSection title="Personal Information" defaultOpen>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="First Name" value={formData.firstName} onChange={v => handleInputChange('firstName', v)} />
              <Input label="Last Name" value={formData.lastName} onChange={v => handleInputChange('lastName', v)} />
              <Input label="Personal Email" type="email" value={formData.personalEmail} onChange={v => handleInputChange('personalEmail', v)} />
              <Input label="Professional Email" type="email" value={formData.professionalEmail} onChange={v => handleInputChange('professionalEmail', v)} />
              <Input label="Personal Contact" value={formData.personalContact} onChange={v => handleInputChange('personalContact', v)} />
              <Input label="Professional Contact" value={formData.professionalContact} onChange={v => handleInputChange('professionalContact', v)} />
              <Input label="Gender" value={formData.gender} onChange={v => handleInputChange('gender', v)} />
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Pronoun</label>
                <select 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.pronoun}
                  onChange={(e) => handleInputChange('pronoun', e.target.value)}
                >
                  <option value="">Select Pronoun</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss">Miss</option>
                </select>
              </div>
              <Input label="Select your City" value={formData.city} onChange={v => handleInputChange('city', v)} />
              <Input label="Select your State" value={formData.state} onChange={v => handleInputChange('state', v)} />
            </div>
          </CollapsibleSection>
        );

      case Step.SELECT_CATEGORY:
        const categories = [
          { id: 'STUDENT', label: 'Student', icon: GraduationCap },
          { id: 'STARTUP', label: 'Start Up', icon: Rocket },
          { id: 'INVESTOR', label: 'Investor', icon: Briefcase },
          { id: 'ORGANIZER', label: 'Organizer', icon: Users },
          { id: 'TECH_CONTENT_CREATOR', label: 'Tech Content Creator', icon: Layout },
        ];
        return (
          <CollapsibleSection title="Select Category" defaultOpen>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = formData.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleInputChange('category', cat.id)}
                    className={`flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md' : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50 text-slate-500'
                    }`}
                  >
                    <Icon className={`w-12 h-12 ${isSelected ? 'animate-bounce' : ''}`} />
                    <span className="font-bold uppercase tracking-wider text-sm">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </CollapsibleSection>
        );

      case Step.CATEGORY_DETAILS:
        if (formData.category === 'STUDENT') {
          return (
            <div className="animate-in slide-in-from-right-8 duration-300">
              <CollapsibleSection title="Student Details" defaultOpen>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input label="Academic Institution Name" />
                    <Input label="Degree Program" />
                    <Input label="Degree Level" />
                    <Input label="Expected Graduation Year" />
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                    <p className="font-semibold text-slate-800">Are you registering solo or group?</p>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="registrationType" className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium">Solo</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="registrationType" className="w-4 h-4 text-indigo-600" defaultChecked />
                        <span className="text-sm font-medium">Group</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400">Number of Members (Range)</label>
                        <input type="number" defaultValue={4} className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                      <Input label="Group Name" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase text-slate-400">Members Names</label>
                      <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                          <input key={i} placeholder={`Member ${i}`} className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          );
        }
        if (formData.category === 'STARTUP') {
          return (
            <div className="animate-in slide-in-from-right-8 duration-300">
              <CollapsibleSection title="Startup Details" defaultOpen>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input label="Startup Name" />
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Stage</label>
                      <div className="flex rounded-lg overflow-hidden border border-slate-200">
                        {['IDEA', 'MVP', 'REVENUE'].map(stage => (
                          <button key={stage} className="flex-1 py-3 text-xs font-bold hover:bg-slate-50 transition-colors border-r last:border-0 uppercase tracking-tighter">
                            {stage}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Input label="Member Count (Range 5)" type="number" />
                    <Input label="Industry (Optional)" />
                  </div>
                  <div className="flex items-center justify-between p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="space-y-1">
                      <p className="font-bold text-indigo-900">Promotion Listing</p>
                      <p className="text-xs text-indigo-600">Get listed in our startup directory</p>
                    </div>
                    <ToggleButton />
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          );
        }
        if (formData.category === 'INVESTOR') {
          return (
            <div className="animate-in slide-in-from-right-8 duration-300">
              <CollapsibleSection title="Investor Details" defaultOpen>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input label="Company Name (Optional)" />
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-sm font-semibold">Promotion List</span>
                      <ToggleButton />
                    </div>
                  </div>
                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 space-y-4">
                    <p className="text-sm text-amber-900 leading-relaxed italic">
                      "If you have your logo or Poster design for standees, send via email. If not, only send logo via email!"
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-amber-700">Our email:</span>
                      <span className="text-indigo-600 font-mono text-sm underline cursor-pointer">logos@event.com</span>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          );
        }
        return <div className="p-12 text-center text-slate-400 italic">No details needed for this category. Click Next.</div>;

      case Step.ADDITIONAL_INFO:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
            <CollapsibleSection title="Additional Information" defaultOpen>
              <div className="p-8 space-y-6">
                <p className="font-semibold text-slate-800">Which of the following you interest?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Networking',
                    'Funding / Investors',
                    'Mentorship',
                    'Collaboration / Team Members',
                    'Learning / Exposure'
                  ].map((interest) => (
                    <label key={interest} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-slate-300 text-indigo-600"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => {
                          const newInterests = e.target.checked 
                            ? [...formData.interests, interest]
                            : formData.interests.filter(i => i !== interest);
                          handleInputChange('interests', newInterests);
                        }}
                      />
                      <span className="text-sm font-medium text-slate-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Online Influence & Network" defaultOpen>
              <div className="p-8 space-y-6">
                {formData.socialNetworks.map((net, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end group animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Social Network</label>
                      <input 
                        placeholder="e.g. LinkedIn"
                        value={net.platform}
                        onChange={(e) => {
                          const newNets = [...formData.socialNetworks];
                          newNets[idx].platform = e.target.value;
                          handleInputChange('socialNetworks', newNets);
                        }}
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-xs font-bold uppercase text-slate-400">URL</label>
                      <div className="flex gap-2">
                        <input 
                          placeholder="https://..."
                          value={net.url}
                          onChange={(e) => {
                            const newNets = [...formData.socialNetworks];
                            newNets[idx].url = e.target.value;
                            handleInputChange('socialNetworks', newNets);
                          }}
                          className="flex-1 p-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {idx > 0 && (
                          <button 
                            onClick={() => {
                              const newNets = formData.socialNetworks.filter((_, i) => i !== idx);
                              handleInputChange('socialNetworks', newNets);
                            }}
                            className="p-4 text-rose-500 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => handleInputChange('socialNetworks', [...formData.socialNetworks, { platform: '', url: '' }])}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all w-full justify-center group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  <span className="font-bold">Add Another Social Platform</span>
                </button>
              </div>
            </CollapsibleSection>
          </div>
        );

      case Step.PAYMENT:
        return (
          <CollapsibleSection title="Payment" defaultOpen>
            <div className="p-12 space-y-8 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <CreditCard className="w-12 h-12" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">Secure Checkout</h3>
                <p className="text-slate-500">Select your preferred payment method to complete registration.</p>
              </div>
              <div className="w-full max-w-md space-y-4">
                {['Credit/Debit Card', 'Bank Transfer', 'Mobile Wallet'].map(method => (
                  <button key={method} className="w-full p-6 text-left border-2 border-slate-100 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all flex justify-between items-center group">
                    <span className="font-bold text-slate-700 group-hover:text-indigo-700">{method}</span>
                    <ChevronDown className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
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

  const isLastStep = currentStep === Step.PAYMENT;

  return (
    <div className="min-h-screen flex">
      <Sidebar currentStep={currentStep} />
      
      <main className="flex-1 overflow-y-auto bg-slate-50/50">
        <div className="max-w-4xl mx-auto py-12 px-6">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Registration</h1>
            <p className="text-slate-500 font-medium">Please fill in the details as per the provided sketches.</p>
          </header>

          <StepIndicator currentStep={currentStep} />

          <div className="min-h-[600px] mb-12">
            {renderStepContent()}
          </div>

          <div className="sticky bottom-8 z-10">
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-2xl shadow-indigo-100/50">
              <button 
                onClick={prevStep}
                disabled={currentStep === Step.AGREEMENTS}
                className="px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-0 transition-all"
              >
                Previous Page
              </button>

              {isLastStep ? (
                <button 
                  className="px-12 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1"
                  onClick={() => alert("Registration Submitted Successfully!")}
                >
                  Submit Registration
                </button>
              ) : (
                <button 
                  onClick={nextStep}
                  disabled={currentStep === Step.AGREEMENTS && !formData.agreedToTerms}
                  className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:bg-slate-300 disabled:shadow-none transition-all hover:-translate-y-1"
                >
                  Next Page
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const CollapsibleSection: React.FC<{ title: string, children: React.ReactNode, defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-white hover:bg-slate-50 transition-colors border-b border-slate-100"
      >
        <span className="text-lg font-bold text-slate-800 tracking-tight">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      <div className={`transition-all duration-500 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        {children}
      </div>
    </div>
  );
};

const Input: React.FC<{ label: string, type?: string, value?: string, onChange?: (v: string) => void }> = ({ label, type = 'text', value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-300"
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

const ToggleButton: React.FC = () => {
  const [active, setActive] = useState(false);
  return (
    <button 
      onClick={() => setActive(!active)}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 p-1 ${active ? 'bg-indigo-600' : 'bg-slate-300'}`}
    >
      <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
};

export default FCCRegistration;
