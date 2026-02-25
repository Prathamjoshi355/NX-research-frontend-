
import React, { useState } from 'react';
import { Step, FormData, INITIAL_FORM_DATA, Category } from '../FCCtypes';
import Sidebar from '../components/FCCRegistrationSidebar';
import StepIndicator from '../components/FCCRegistrationStepIndicator';
// Added CreditCard to the list of imported icons from lucide-react
import { ChevronDown, ChevronUp, Plus, Trash2, GraduationCap, Rocket, Briefcase, Users, Layout, CreditCard } from 'lucide-react';

const FCCRegistration = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.AGREEMENTS);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, Step.PAYMENT));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, Step.AGREEMENTS));

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (category: Category) => {
    setFormData(prev => {
      const newData = { ...prev, category };
      if (category === 'STUDENT' && !prev.studentInfo) {
        newData.studentInfo = {
          institution: '',
          degreeProgram: '',
          degreeLevel: '',
          graduationYear: '',
          isGroup: false,
          memberCount: 1,
          groupName: '',
          members: ['', '', '']
        };
      }
      if (category === 'STARTUP' && !prev.startupInfo) {
        newData.startupInfo = {
          name: '',
          stage: 'IDEA',
          memberCount: 1,
          industry: '',
          wantsPromotion: false
        };
      }
      if (category === 'INVESTOR' && !prev.investorInfo) {
        newData.investorInfo = {
          companyName: '',
          wantsPromotion: false,
          logoEmail: ''
        };
      }
      return newData;
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case Step.AGREEMENTS:
        return (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CollapsibleSection title="Registration Notifications" defaultOpen>
              <div className="p-4 sm:p-6 space-y-4 text-text-secondary leading-relaxed">
                <p className="text-sm sm:text-base">We'll send you important updates regarding the event schedule, networking opportunities, and logistics via your registered email and contact number.</p>
                <div className="h-px bg-white/5 my-4" />
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.receiveNotifications}
                    onChange={(e) => handleInputChange('receiveNotifications', e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-neon-cyan focus:ring-neon-cyan"
                  />
                  <span className="text-sm font-medium group-hover:text-neon-cyan transition-colors">I wish to receive notifications</span>
                </label>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Privacy and Terms" defaultOpen>
              <div className="p-4 sm:p-6 space-y-4 text-text-secondary leading-relaxed max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                <p className="text-sm sm:text-base">By registering for this event, you agree to our standard privacy policy and terms of service. We respect your data and will never sell it to third parties.</p>
                <p className="text-sm sm:text-base">Participants are expected to maintain professional conduct throughout the sessions. Any form of harassment or unprofessional behavior will lead to immediate disqualification without refund.</p>
                <p className="text-sm sm:text-base">Photography and videography will be conducted during the event for promotional purposes. By attending, you grant permission for your likeness to be used in event media.</p>
              </div>
              <div className="p-4 sm:p-6 bg-bg-secondary/50 border-t border-white/5">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.agreedToTerms}
                    onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-neon-cyan focus:ring-neon-cyan"
                  />
                  <span className="text-sm font-medium group-hover:text-neon-cyan transition-colors">I agree and wish to continue</span>
                </label>
              </div>
            </CollapsibleSection>
          </div>
        );

      case Step.PERSONAL_INFO:
        return (
          <CollapsibleSection title="Personal Information" defaultOpen>
            <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <Input label="First Name" value={formData.firstName} onChange={v => handleInputChange('firstName', v)} />
              <Input label="Last Name" value={formData.lastName} onChange={v => handleInputChange('lastName', v)} />
              <Input label="Personal Email" type="email" value={formData.personalEmail} onChange={v => handleInputChange('personalEmail', v)} />
              <Input label="Professional Email" type="email" value={formData.professionalEmail} onChange={v => handleInputChange('professionalEmail', v)} />
              <Input label="Personal Contact" value={formData.personalContact} onChange={v => handleInputChange('personalContact', v)} />
              <Input label="Professional Contact" value={formData.professionalContact} onChange={v => handleInputChange('professionalContact', v)} />
              <Input label="Gender" value={formData.gender} onChange={v => handleInputChange('gender', v)} />
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-text-secondary">Pronoun</label>
                <select 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-neon-cyan outline-none transition-all text-sm sm:text-base text-text-primary"
                  value={formData.pronoun}
                  onChange={(e) => handleInputChange('pronoun', e.target.value)}
                >
                  <option value="" className="bg-panel-bg">Select Pronoun</option>
                  <option value="Mr." className="bg-panel-bg">Mr.</option>
                  <option value="Ms." className="bg-panel-bg">Ms.</option>
                  <option value="Mrs." className="bg-panel-bg">Mrs.</option>
                  <option value="Miss" className="bg-panel-bg">Miss</option>
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
            <div className="p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = formData.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id as Category)}
                    className={`flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan shadow-lg shadow-neon-cyan/20' : 'border-white/5 bg-white/5 hover:border-neon-cyan/30 hover:bg-white/10 text-text-secondary'
                    }`}
                  >
                    <Icon className={`w-10 h-10 sm:w-12 sm:h-12 ${isSelected ? 'animate-bounce' : ''}`} />
                    <span className="font-bold uppercase tracking-wider text-xs sm:text-sm">{cat.label}</span>
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
                <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    <Input 
                      label="Academic Institution Name" 
                      value={formData.studentInfo?.institution || ''} 
                      onChange={v => handleInputChange('studentInfo', { ...formData.studentInfo, institution: v })} 
                    />
                    <Input 
                      label="Degree Program" 
                      value={formData.studentInfo?.degreeProgram || ''} 
                      onChange={v => handleInputChange('studentInfo', { ...formData.studentInfo, degreeProgram: v })} 
                    />
                    <Input 
                      label="Degree Level" 
                      value={formData.studentInfo?.degreeLevel || ''} 
                      onChange={v => handleInputChange('studentInfo', { ...formData.studentInfo, degreeLevel: v })} 
                    />
                    <Input 
                      label="Expected Graduation Year" 
                      value={formData.studentInfo?.graduationYear || ''} 
                      onChange={v => handleInputChange('studentInfo', { ...formData.studentInfo, graduationYear: v })} 
                    />
                  </div>
                  <div className="bg-bg-secondary/50 p-4 sm:p-6 rounded-2xl border border-white/5 space-y-4 sm:space-y-6">
                    <p className="font-semibold text-text-primary text-sm sm:text-base">Are you registering solo or group?</p>
                    <div className="flex gap-6 sm:gap-8">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="registrationType" 
                          className="w-4 h-4 text-neon-cyan bg-white/5 border-white/20" 
                          checked={!formData.studentInfo?.isGroup}
                          onChange={() => handleInputChange('studentInfo', { ...formData.studentInfo, isGroup: false })}
                        />
                        <span className="text-sm font-medium text-text-secondary">Solo</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="registrationType" 
                          className="w-4 h-4 text-neon-cyan bg-white/5 border-white/20" 
                          checked={formData.studentInfo?.isGroup}
                          onChange={() => handleInputChange('studentInfo', { ...formData.studentInfo, isGroup: true })}
                        />
                        <span className="text-sm font-medium text-text-secondary">Group</span>
                      </label>
                    </div>
                    {formData.studentInfo?.isGroup && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-white/5">
                          <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-[10px] sm:text-xs font-bold uppercase text-text-dim">Number of Members (Range)</label>
                            <input 
                              type="number" 
                              value={formData.studentInfo?.memberCount || ''} 
                              onChange={(e) => handleInputChange('studentInfo', { ...formData.studentInfo, memberCount: parseInt(e.target.value) || 0 })}
                              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-neon-cyan text-sm sm:text-base text-text-primary" 
                            />
                          </div>
                          <Input 
                            label="Group Name" 
                            value={formData.studentInfo?.groupName || ''} 
                            onChange={v => handleInputChange('studentInfo', { ...formData.studentInfo, groupName: v })} 
                          />
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          <label className="text-[10px] sm:text-xs font-bold uppercase text-text-dim">Members Names</label>
                          <div className="space-y-2 sm:space-y-3">
                            {(formData.studentInfo?.members || ['', '', '']).map((name, i) => (
                              <input 
                                key={i} 
                                placeholder={`Member ${i + 1}`} 
                                value={name}
                                onChange={(e) => {
                                  const newMembers = [...(formData.studentInfo?.members || ['', '', ''])];
                                  newMembers[i] = e.target.value;
                                  handleInputChange('studentInfo', { ...formData.studentInfo, members: newMembers });
                                }}
                                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-neon-cyan text-sm sm:text-base text-text-primary" 
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
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
                <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    <Input 
                      label="Startup Name" 
                      value={formData.startupInfo?.name || ''} 
                      onChange={v => handleInputChange('startupInfo', { ...formData.startupInfo, name: v })} 
                    />
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-xs sm:text-sm font-semibold text-text-secondary">Stage</label>
                      <div className="flex rounded-lg overflow-hidden border border-white/10">
                        {['IDEA', 'MVP', 'REVENUE'].map(stage => (
                          <button 
                            key={stage} 
                            onClick={() => handleInputChange('startupInfo', { ...formData.startupInfo, stage: stage as any })}
                            className={`flex-1 py-2 sm:py-3 text-[10px] sm:text-xs font-bold hover:bg-white/5 transition-colors border-r border-white/10 last:border-0 uppercase tracking-tighter ${
                              formData.startupInfo?.stage === stage ? 'bg-neon-cyan text-bg-primary' : 'bg-white/5 text-text-secondary'
                            }`}
                          >
                            {stage}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Input 
                      label="Member Count (Range 5)" 
                      type="number" 
                      value={formData.startupInfo?.memberCount?.toString() || ''} 
                      onChange={v => handleInputChange('startupInfo', { ...formData.startupInfo, memberCount: parseInt(v) || 0 })} 
                    />
                    <Input 
                      label="Industry (Optional)" 
                      value={formData.startupInfo?.industry || ''} 
                      onChange={v => handleInputChange('startupInfo', { ...formData.startupInfo, industry: v })} 
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-neon-cyan/5 rounded-2xl border border-neon-cyan/10 gap-4">
                    <div className="space-y-0.5 sm:space-y-1">
                      <p className="font-bold text-text-primary text-sm sm:text-base">Promotion Listing</p>
                      <p className="text-[10px] sm:text-xs text-neon-cyan">Get listed in our startup directory</p>
                    </div>
                    <ToggleButton 
                      active={formData.startupInfo?.wantsPromotion || false} 
                      onChange={v => handleInputChange('startupInfo', { ...formData.startupInfo, wantsPromotion: v })} 
                    />
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
                <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    <Input 
                      label="Company Name (Optional)" 
                      value={formData.investorInfo?.companyName || ''} 
                      onChange={v => handleInputChange('investorInfo', { ...formData.investorInfo, companyName: v })} 
                    />
                    <div className="flex items-center justify-between p-4 bg-bg-secondary/50 rounded-xl border border-white/5">
                      <span className="text-sm font-semibold text-text-primary">Promotion List</span>
                      <ToggleButton 
                        active={formData.investorInfo?.wantsPromotion || false} 
                        onChange={v => handleInputChange('investorInfo', { ...formData.investorInfo, wantsPromotion: v })} 
                      />
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 bg-gold/5 rounded-2xl border border-gold/10 space-y-3 sm:space-y-4">
                    <p className="text-xs sm:text-sm text-gold/80 leading-relaxed italic">
                      "If you have your logo or Poster design for standees, send via email. If not, only send logo via email!"
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm font-bold text-gold">Our email:</span>
                      <span className="text-neon-cyan font-mono text-xs sm:text-sm underline cursor-pointer break-all">logos@event.com</span>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          );
        }
        return <div className="p-12 text-center text-text-dim italic">No details needed for this category. Click Next.</div>;

      case Step.ADDITIONAL_INFO:
        return (
          <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-right-8 duration-300">
            <CollapsibleSection title="Additional Information" defaultOpen>
              <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <p className="font-semibold text-text-primary text-sm sm:text-base">Which of the following you interest?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    'Networking',
                    'Funding / Investors',
                    'Mentorship',
                    'Collaboration / Team Members',
                    'Learning / Exposure'
                  ].map((interest) => (
                    <label key={interest} className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-neon-cyan focus:ring-neon-cyan"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => {
                          const newInterests = e.target.checked 
                            ? [...formData.interests, interest]
                            : formData.interests.filter(i => i !== interest);
                          handleInputChange('interests', newInterests);
                        }}
                      />
                      <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Online Influence & Network" defaultOpen>
              <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                {formData.socialNetworks.map((net, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-end group animate-in slide-in-from-top-2">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold uppercase text-text-dim">Social Network</label>
                      <input 
                        placeholder="e.g. LinkedIn"
                        value={net.platform}
                        onChange={(e) => {
                          const newNets = [...formData.socialNetworks];
                          newNets[idx].platform = e.target.value;
                          handleInputChange('socialNetworks', newNets);
                        }}
                        className="w-full p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-neon-cyan text-sm sm:text-base text-text-primary"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2 relative">
                      <label className="text-[10px] sm:text-xs font-bold uppercase text-text-dim">URL</label>
                      <div className="flex gap-2">
                        <input 
                          placeholder="https://..."
                          value={net.url}
                          onChange={(e) => {
                            const newNets = [...formData.socialNetworks];
                            newNets[idx].url = e.target.value;
                            handleInputChange('socialNetworks', newNets);
                          }}
                          className="flex-1 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-neon-cyan text-sm sm:text-base text-text-primary"
                        />
                        {idx > 0 && (
                          <button 
                            onClick={() => {
                              const newNets = formData.socialNetworks.filter((_, i) => i !== idx);
                              handleInputChange('socialNetworks', newNets);
                            }}
                            className="p-3 sm:p-4 text-rose-500 bg-rose-500/10 rounded-xl hover:bg-rose-500/20 transition-colors"
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
                  className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 border-dashed border-white/10 text-text-dim hover:border-neon-cyan/50 hover:text-neon-cyan transition-all w-full justify-center group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  <span className="font-bold text-sm sm:text-base">Add Another Social Platform</span>
                </button>
              </div>
            </CollapsibleSection>
          </div>
        );

      case Step.PAYMENT:
        return (
          <CollapsibleSection title="Payment" defaultOpen>
            <div className="p-6 sm:p-12 space-y-6 sm:space-y-8 flex flex-col items-center justify-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-neon-cyan/10 rounded-full flex items-center justify-center text-neon-cyan">
                <CreditCard className="w-8 h-8 sm:w-12 sm:h-12" />
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary">Secure Checkout</h3>
                <p className="text-xs sm:text-sm text-text-secondary">Select your preferred payment method to complete registration.</p>
              </div>
              <div className="w-full max-w-md space-y-3 sm:space-y-4">
                {['Credit/Debit Card', 'Bank Transfer', 'Mobile Wallet'].map(method => (
                  <button key={method} className="w-full p-4 sm:p-6 text-left border-2 border-white/5 rounded-xl sm:rounded-2xl hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all flex justify-between items-center group">
                    <span className="font-bold text-text-secondary group-hover:text-neon-cyan text-sm sm:text-base">{method}</span>
                    <ChevronDown className="w-4 h-4 sm:w-5 h-5 text-text-dim group-hover:text-neon-cyan/50" />
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-bg-primary text-text-primary">
      <Sidebar currentStep={currentStep} />
      
      <main className="flex-1 overflow-y-auto bg-bg-primary/50">
        <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <header className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-black text-text-primary mb-2 tracking-tight">Registration</h1>
            <p className="text-sm sm:text-base text-text-secondary font-medium">Please fill in the details as per the provided sketches.</p>
          </header>

          <StepIndicator currentStep={currentStep} />

          <div className="min-h-[400px] sm:min-h-[600px] mb-12">
            {renderStepContent()}
          </div>

          <div className="sticky bottom-4 sm:bottom-8 z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-panel-bg/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl shadow-neon-cyan/10">
              <button 
                onClick={prevStep}
                disabled={currentStep === Step.AGREEMENTS}
                className="w-full sm:w-auto px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-text-secondary hover:bg-white/5 disabled:opacity-0 transition-all text-sm sm:text-base"
              >
                Previous Page
              </button>

              {isLastStep ? (
                <button 
                  className="w-full sm:w-auto px-12 py-3 sm:py-4 bg-teal text-bg-primary rounded-xl sm:rounded-2xl font-bold hover:brightness-110 shadow-lg shadow-teal/20 transition-all hover:-translate-y-1 text-sm sm:text-base"
                  onClick={() => alert("Registration Submitted Successfully!")}
                >
                  Submit Registration
                </button>
              ) : (
                <button 
                  onClick={nextStep}
                  disabled={currentStep === Step.AGREEMENTS && !formData.agreedToTerms}
                  className="w-full sm:w-auto px-12 py-3 sm:py-4 bg-neon-cyan text-bg-primary rounded-xl sm:rounded-2xl font-bold hover:brightness-110 shadow-lg shadow-neon-cyan/20 disabled:bg-white/10 disabled:text-text-dim disabled:shadow-none transition-all hover:-translate-y-1 text-sm sm:text-base"
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
    <div className="bg-panel-bg rounded-2xl sm:rounded-3xl border border-white/10 shadow-sm overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 sm:p-6 bg-panel-bg hover:bg-white/5 transition-colors border-b border-white/5"
      >
        <span className="text-base sm:text-lg font-bold text-text-primary tracking-tight text-left">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-text-dim shrink-0" /> : <ChevronDown className="w-5 h-5 text-text-dim shrink-0" />}
      </button>
      <div className={`transition-all duration-500 ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        {children}
      </div>
    </div>
  );
};

const Input: React.FC<{ label: string, type?: string, value?: string, onChange?: (v: string) => void }> = ({ label, type = 'text', value = '', onChange }) => (
  <div className="space-y-1.5 sm:space-y-2">
    <label className="text-xs sm:text-sm font-semibold text-text-secondary">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-neon-cyan focus:bg-white/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-dim text-sm sm:text-base"
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

const ToggleButton: React.FC<{ active?: boolean, onChange?: (v: boolean) => void }> = ({ active = false, onChange }) => {
  return (
    <button 
      onClick={() => onChange?.(!active)}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 p-1 ${active ? 'bg-neon-cyan' : 'bg-white/10'}`}
    >
      <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
};

export default FCCRegistration;
