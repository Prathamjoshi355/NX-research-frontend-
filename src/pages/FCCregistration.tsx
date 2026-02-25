
import React, { useState } from 'react';
import { Step, FormData, INITIAL_FORM_DATA, Category } from '../FCCtypes';
import Sidebar from '../components/FCCRegistrationSidebar';
import StepIndicator from '../components/FCCRegistrationStepIndicator';
// Added CreditCard to the list of imported icons from lucide-react
import { ChevronDown, ChevronUp, Plus, Trash2, GraduationCap, Rocket, Briefcase, Users, Layout, CreditCard } from 'lucide-react';

const FCCRegistration: React.FC = () => {
   const [currentStep, setCurrentStep] = useState<Step>(Step.AGREEMENTS);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const nextStep = () => {
    if (!isCurrentStepComplete()) return;
    setCurrentStep(prev => Math.min(prev + 1, Step.PAYMENT));
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, Step.AGREEMENTS));

  const handleInputChange = (field: keyof FormData, value: any) => {
    // keep first group member in sync with personal name when group is selected
    if ((field === 'firstName' || field === 'lastName') && formData.category === 'STUDENT' && formData.studentInfo && formData.studentInfo.isGroup) {
      setFormData(prev => {
        const next: FormData = { ...prev, [field]: value } as FormData;
        const full = `${field === 'firstName' ? value : next.firstName} ${field === 'lastName' ? value : next.lastName}`.trim();
        const desired = next.studentInfo?.memberCount || 3;
        const members = next.studentInfo?.members ? [...next.studentInfo.members] : Array.from({ length: desired }).map(()=>'');
        while (members.length < desired) members.push('');
        if (members.length > desired) members.length = desired;
        members[0] = full;
        next.studentInfo = { ...next.studentInfo, members };
        return next;
      });
      return;
    }
    // if selecting category, initialize category-specific data structures
    if (field === 'category') {
      setFormData(prev => {
        const next: FormData = { ...prev, [field]: value } as FormData;
        if (value === 'STUDENT' && !next.studentInfo) {
          const full = `${next.firstName} ${next.lastName}`.trim();
          next.studentInfo = {
            institution: '',
            degreeProgram: '',
            degreeLevel: '',
            graduationYear: '',
            isGroup: true,
            memberCount: 3,
            groupName: '',
            members: [full || '', '', ''],
          };
        }
        return next;
      });
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validation functions for each step
  const isAgreementsComplete = () => formData.agreedToTerms && formData.receiveNotifications;
  
  const isPersonalInfoComplete = () => 
    formData.firstName && formData.lastName && formData.personalEmail && 
    formData.professionalEmail && formData.personalContact && formData.professionalContact && 
    formData.gender && formData.pronoun && formData.city && formData.state;
  
  const isCategoryComplete = () => formData.category !== null;
  
  const isAdditionalInfoComplete = () => 
    formData.interests.length > 0 && formData.socialNetworks.some(net => net.platform && net.url);

  const isCurrentStepComplete = () => {
    switch (currentStep) {
      case Step.AGREEMENTS:
        return isAgreementsComplete();
      case Step.PERSONAL_INFO:
        return isPersonalInfoComplete();
      case Step.SELECT_CATEGORY:
        return isCategoryComplete();
      case Step.CATEGORY_DETAILS:
        // validate category specific details
        if (formData.category === 'STUDENT') {
          const s = formData.studentInfo;
          if (!s) return false;
          // require core student fields
          const coreFilled = (s.institution || '').trim() !== '' && (s.degreeProgram || '').trim() !== '' && (s.degreeLevel || '').trim() !== '' && (s.graduationYear || '').trim() !== '';
          if (!coreFilled) return false;
          if (!s.isGroup) {
            // Solo registration: require 1 member (personal name)
            return Array.isArray(s.members) && s.members.length >= 1 && s.members[0].trim() !== '';
          }
          // Group registration: require `memberCount` members where first is personal name and all are non-empty
          const count = s.memberCount || 1;
          return Array.isArray(s.members) && s.members.length >= count && s.members.slice(0, count).every(m => m.trim() !== '');
        }
        return true;
      case Step.ADDITIONAL_INFO:
        return isAdditionalInfoComplete();
      case Step.PAYMENT:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case Step.AGREEMENTS:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CollapsibleSection title="Registration Notifications" defaultOpen>
              <div className="p-6 space-y-4 text-slate-600 leading-relaxed">
                <p>We'll send you important updates regarding the event schedule, networking opportunities, and logistics via your registered email and contact number.</p>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
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
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
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
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Select your City</label>
                <select 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                >
                  <option value="">Select City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Indore">Indore</option>
                  <option value="Surat">Surat</option>
                  <option value="Bhopal">Bhopal</option>
                  <option value="Visakhapatnam">Visakhapatnam</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Guwahati">Guwahati</option>
                  <option value="Cochin">Cochin</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Select your State</label>
                <select 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
            </div>
          </CollapsibleSection>
        );

      case Step.SELECT_CATEGORY:
        const categories = [
          { id: 'STUDENT', label: 'Student', icon: GraduationCap },
          { id: 'STARTUP', label: 'Start Up', icon: Rocket },
          { id: 'INVESTOR', label: 'Investor', icon: Briefcase },
          // { id: 'ORGANIZER', label: 'Organizer', icon: Users },
          // { id: 'TECH_CONTENT_CREATOR', label: 'Tech Content Creator', icon: Layout },
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
          // ensure studentInfo exists
          if (!formData.studentInfo) {
            // defensive: initialize if missing
            handleInputChange('category', 'STUDENT');
            return null;
          }
          const s = formData.studentInfo;
          return (
            <div className="animate-in slide-in-from-right-8 duration-300">
              <CollapsibleSection title="Student Details" defaultOpen>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input label="Academic Institution Name" value={s.institution} onChange={(v) => handleInputChange('studentInfo', { ...s, institution: v })} />
                    <Input label="Degree Program" value={s.degreeProgram} onChange={(v) => handleInputChange('studentInfo', { ...s, degreeProgram: v })} />
                    <Input label="Degree Level" value={s.degreeLevel} onChange={(v) => handleInputChange('studentInfo', { ...s, degreeLevel: v })} />
                    <Input label="Expected Graduation Year" value={s.graduationYear} onChange={(v) => handleInputChange('studentInfo', { ...s, graduationYear: v })} />
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
                    <p className="font-semibold text-slate-800">Are you registering solo or group?</p>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="registrationType" className="w-4 h-4 text-indigo-600" checked={!s.isGroup} onChange={() => {
                          const full = `${formData.firstName} ${formData.lastName}`.trim();
                          handleInputChange('studentInfo', { ...s, isGroup: false, members: [full || ''], memberCount: 1 });
                        }} />
                        <span className="text-sm font-medium">Solo</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="registrationType" className="w-4 h-4 text-indigo-600" checked={s.isGroup} onChange={() => {
                          const full = `${formData.firstName} ${formData.lastName}`.trim();
                          const members = [full || '', '', ''];
                          handleInputChange('studentInfo', { ...s, isGroup: true, members, memberCount: 3 });
                        }} />
                        <span className="text-sm font-medium">Group</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400">Number of Members</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            max={4}
                            value={s.isGroup ? (s.memberCount || 1) : 1}
                            onChange={s.isGroup ? (e: any) => {
                              const newCount = Math.max(1, Math.min(4, Number(e.target.value || 1)));
                              const newMembers = [...(s.members || [])];
                              while (newMembers.length < newCount) newMembers.push('');
                              newMembers.length = newCount;
                              handleInputChange('studentInfo', { ...s, memberCount: newCount, members: newMembers });
                            } : undefined}
                            disabled={!s.isGroup}
                            readOnly={!s.isGroup}
                            className="w-24 p-3 bg-white border border-slate-200 rounded-none outline-none"
                          />
                        </div>
                        <p className="text-xs text-slate-400">Include yourself as the first member; max 4.</p>
                      </div>
                      <Input label="Group Name" value={s.groupName} onChange={(v) => handleInputChange('studentInfo', { ...s, groupName: v })} />
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase text-slate-400">Members Names</label>
                      {!s.isGroup ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <input
                              value={`${formData.firstName} ${formData.lastName}`.trim()}
                              readOnly
                              className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg outline-none"
                            />
                          </div>
                          <div className="text-xs text-slate-400">Solo registration — just you (read-only).</div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {Array.from({ length: s.memberCount || 1 }).map((_, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              {idx === 0 ? (
                                <input
                                  value={`${formData.firstName} ${formData.lastName}`.trim()}
                                  readOnly
                                  className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg outline-none"
                                />
                              ) : (
                                <input
                                  value={(s.members && s.members[idx]) || ''}
                                  onChange={(e) => {
                                    const newMembers = [...(s.members || [])];
                                    while (newMembers.length < (s.memberCount || 1)) newMembers.push('');
                                    newMembers[idx] = e.target.value;
                                    handleInputChange('studentInfo', { ...s, members: newMembers });
                                  }}
                                  placeholder={`Member ${idx + 1}`}
                                  className="w-full p-3 bg-white border border-slate-200 rounded-none outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                              )}
                            </div>
                          ))}
                          <div className="text-xs text-slate-400">First member is you (read-only).</div>
                        </div>
                      )}
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
                        className="w-full p-4 bg-white border border-slate-200 rounded-none outline-none focus:ring-2 focus:ring-indigo-500"
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
                          className="flex-1 p-4 bg-white border border-slate-200 rounded-none outline-none focus:ring-2 focus:ring-indigo-500"
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
                <div className="text-xs text-slate-400 mt-2">Add Social Media profile for community</div>
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
    <div className="min-h-screen bg-white">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto py-12 px-2 pl-0">
          <div className="flex gap-8 mb-12">
            {/* Sidebar Progress Box */}
            <div className="w-72 flex-shrink-0">
              <Sidebar currentStep={currentStep} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 pr-8">
              <header className="mb-8">
                <h1 className="text-6xl font-extrabold text-blue-600 mb-4">Registration</h1>
              </header>

              <StepIndicator currentStep={currentStep} />

              <div className="min-h-[600px] mb-12">
                {renderStepContent()}
              </div>

              <div className="sticky bottom-8 z-10">
                <div className="flex justify-end items-center gap-4 p-6">
                  <button 
                    onClick={prevStep}
                    disabled={currentStep === Step.AGREEMENTS}
                    className="px-8 py-4 rounded-lg font-bold text-slate-500 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 disabled:opacity-0 transition-all"
                  >
                    Previous Page
                  </button>

                  {isLastStep ? (
                    <button 
                      className="px-12 py-4 bg-emerald-600 text-white border-2 border-emerald-700 rounded-lg font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1"
                      onClick={() => alert("Registration Submitted Successfully!")}
                    >
                      Submit Registration
                    </button>
                  ) : (
                    <button 
                      onClick={nextStep}
                      disabled={!isCurrentStepComplete()}
                      className="px-12 py-4 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed transition-all hover:-translate-y-1"
                    >
                      Next Page
                    </button>
                  )}
                </div>
              </div>
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
    <div className="transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-white rounded-lg border border-slate-400 shadow-sm hover:bg-white transition-colors"
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
      className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-none focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-300"
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
