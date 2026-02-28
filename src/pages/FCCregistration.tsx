
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Step, FormData, INITIAL_FORM_DATA } from '../FCCtypes';
import Sidebar from '../components/FCCRegistrationSidebar';
import StepIndicator from '../components/FCCRegistrationStepIndicator';
import { fccAPI } from '../api';
import SEO from '../components/SEO';
import { ChevronDown, ChevronUp, Plus, Trash2, GraduationCap, Rocket, Briefcase, Loader, CheckCircle } from 'lucide-react';

import './Formindex.css';
import { label } from 'motion/react-client';

const FCCRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.AGREEMENTS);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  const submitForm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fccAPI.saveRegistration(formData);
      if (response.success) {
        setRegistrationId(response.registrationId || null);
        setIsSubmitted(true);
        setFormData(INITIAL_FORM_DATA);
      } else {
        setSubmitError(response.message || 'Submission failed');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setSubmitError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (!isCurrentStepComplete()) return;
    setCurrentStep(prev => Math.min(prev + 1, Step.ADDITIONAL_INFO));
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
    // gender must be one of the defined options now that it's a select
    ['Female','Male','Other'].includes(formData.gender) && 
    formData.pronoun && formData.city && formData.state;
  
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
        <div className="p-6 space-y-4 text-nx-gray leading-relaxed">
          <p>We'll send you important updates regarding the event schedule, networking opportunities, and logistics via your registered email and contact number.</p>
        </div>
        <div className="p-6 bg-nx-muted/50 border-t border-nx-steel/30">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={formData.receiveNotifications}
              onChange={(e) => handleInputChange('receiveNotifications', e.target.checked)}
              className="w-5 h-5 rounded border-nx-steel bg-nx-navy text-nx-cyan focus:ring-nx-cyan"
            />
            <span className="text-sm font-medium group-hover:text-nx-cyan transition-colors">I wish to receive notifications</span>
          </label>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Privacy and Terms" defaultOpen>
        <div className="p-6 space-y-4 text-nx-gray leading-relaxed max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-nx-steel">
          <p>By registering for this event, you agree to our standard privacy policy and terms of service. We respect your data and will never sell it to third parties.</p>
          <p>Participants are expected to maintain professional conduct throughout the sessions. Any form of harassment or unprofessional behavior will lead to immediate disqualification without refund.</p>
          <p>Photography and videography will be conducted during the event for promotional purposes. By attending, you grant permission for your likeness to be used in event media.</p>
        </div>
        <div className="p-6 bg-nx-muted/50 border-t border-nx-steel/30">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={formData.agreedToTerms}
              onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
              className="w-5 h-5 rounded border-nx-steel bg-nx-navy text-nx-cyan focus:ring-nx-cyan"
            />
            <span className="text-sm font-medium group-hover:text-nx-cyan transition-colors">I agree and wish to continue</span>
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
              <div className="space-y-2">
                <label className="text-sm font-semibold text-nx-gray">Gender</label>
                <select
                  className="w-full px-4 py-3 bg-nx-navy border border-nx-steel rounded-lg focus:ring-2 focus:ring-nx-cyan outline-none transition-all text-nx-white"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-nx-gray">Pronoun</label>
                <select 
                  className="w-full px-4 py-3 bg-nx-navy border border-nx-steel rounded-lg focus:ring-2 focus:ring-nx-cyan outline-none transition-all text-nx-white"
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
                <label className="text-sm font-semibold text-nx-gray">Select your State</label>
                <select 
                  className="w-full px-4 py-3 bg-nx-navy border border-nx-steel rounded-lg focus:ring-2 focus:ring-nx-cyan outline-none transition-all text-nx-white"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                >
                  <option value="">Select State</option>
                  {/* <option value="Andhra Pradesh">Andhra Pradesh</option>
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
                  <option value="Kerala">Kerala</option> */}
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  {/* <option value="Maharashtra">Maharashtra</option>
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
                  <option value="West Bengal">West Bengal</option> */}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-nx-gray">Select your City</label>
                <select 
                  className="w-full px-4 py-3 bg-nx-navy border border-nx-steel rounded-lg focus:ring-2 focus:ring-nx-cyan outline-none transition-all text-nx-white"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                >
                  <option value="">Select City</option>
                  {/* <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="Chandigarh">Chandigarh</option> */}
                  <option value="Indore">Indore</option>
                  {/* <option value="Surat">Surat</option>
                  <option value="Bhopal">Bhopal</option>
                  <option value="Visakhapatnam">Visakhapatnam</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Guwahati">Guwahati</option>
                  <option value="Cochin">Cochin</option> */}
                </select>
              </div>
            </div>
          </CollapsibleSection>
        );

      case Step.SELECT_CATEGORY:
        const categories = [
          // { id: 'STUDENT', label: 'Student', icon: GraduationCap, fee: '₹299' },
          { id: 'STARTUP', label: 'Start Up', icon: Rocket, fee: '₹1000 for 2 person' },
          { id: 'INVESTOR', label: 'Investor', icon: Briefcase, fee: '₹1500' },
          // { id: 'ORGANIZER', label: 'Organizer', icon: Users, fee: 'Free' },
          // { id: 'TECH_CONTENT_CREATOR', label: 'Tech Content Creator', icon: Layout, fee: 'Free' },
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
                      isSelected ? 'border-nx-cyan bg-nx-cyan/10 text-nx-cyan shadow-lg shadow-nx-cyan/20' : 'border-nx-steel/30 bg-nx-muted/30 hover:border-nx-cyan/50 hover:bg-nx-muted/50 text-nx-blue'
                    }`}
                  >
                    <Icon className={`w-12 h-12 ${isSelected ? 'animate-pulse' : ''}`} />
                    <div className="text-center">
                      <span className="block font-bold uppercase tracking-wider text-sm">{cat.label}</span>
                      <span className={`block text-xs text-nx-blue font-mono mt-1 ${isSelected ? 'text-nx-neon' : 'text-nx-steel'}`}>
                        Entry Fee: {cat.fee}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </CollapsibleSection>
        );
        
        case Step.CATEGORY_DETAILS:
        // if (formData.category === 'STUDENT') {
        //   // ensure studentInfo exists
        //   if (!formData.studentInfo) {
        //     // defensive: initialize if missing
        //     handleInputChange('category', 'STUDENT');
        //     return null;
        //   }
        //   const s = formData.studentInfo;
        //   return (
        //     <div className="animate-in slide-in-from-right-8 duration-300">
        //       <CollapsibleSection title="Student Details" defaultOpen>
        //         <div className="p-8 space-y-8">
        //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        //             <Input label="Academic Institution Name" value={s.institution} onChange={(v) => handleInputChange('studentInfo', { ...s, institution: v })} />
        //             <Input label="Degree Program" value={s.degreeProgram} onChange={(v) => handleInputChange('studentInfo', { ...s, degreeProgram: v })} />
        //             <Input label="Degree Level" value={s.degreeLevel} onChange={(v) => handleInputChange('studentInfo', { ...s, degreeLevel: v })} />
        //             <Input label="Expected Graduation Year" value={s.graduationYear} onChange={(v) => handleInputChange('studentInfo', { ...s, graduationYear: v })} />
        //           </div>
        //           <div className="bg-nx-muted/30 p-6 rounded-2xl border border-nx-steel/30 space-y-6">
        //             <p className="font-semibold text-nx-white">Are you registering solo or group?</p>
        //             <div className="flex gap-8">
        //               <label className="flex items-center gap-2 cursor-pointer">
        //                 <input type="radio" name="registrationType" className="w-4 h-4 text-nx-cyan" checked={!s.isGroup} onChange={() => {
        //                   const full = `${formData.firstName} ${formData.lastName}`.trim();
        //                   handleInputChange('studentInfo', { ...s, isGroup: false, members: [full || ''], memberCount: 1 });
        //                 }} />
        //                 <span className="text-sm font-medium text-nx-white">Solo</span>
        //               </label>
        //               <label className="flex items-center gap-2 cursor-pointer">
        //                 <input type="radio" name="registrationType" className="w-4 h-4 text-nx-cyan" checked={s.isGroup} onChange={() => {
        //                   const full = `${formData.firstName} ${formData.lastName}`.trim();
        //                   const members = [full || '', '', ''];
        //                   handleInputChange('studentInfo', { ...s, isGroup: true, members, memberCount: 3 });
        //                 }} />
        //                 <span className="text-sm font-medium text-nx-white">Group</span>
        //               </label>
        //             </div>
        //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-nx-steel/30">
        //               <div className="space-y-2">
        //                 <label className="text-xs font-bold uppercase text-nx-gray">Number of Members</label>
        //                 <div className="flex items-center gap-2">
        //                   <input
        //                     type="number"
        //                     min={1}
        //                     max={4}
        //                     value={s.isGroup ? (s.memberCount || 1) : 1}
        //                     onChange={s.isGroup ? (e: any) => {
        //                       const newCount = Math.max(1, Math.min(4, Number(e.target.value || 1)));
        //                       const newMembers = [...(s.members || [])];
        //                       while (newMembers.length < newCount) newMembers.push('');
        //                       newMembers.length = newCount;
        //                       handleInputChange('studentInfo', { ...s, memberCount: newCount, members: newMembers });
        //                     } : undefined}
        //                     disabled={!s.isGroup}
        //                     readOnly={!s.isGroup}
        //                     className="w-24 p-3 bg-nx-navy border border-nx-steel rounded-lg outline-none text-nx-white"
        //                   />
        //                 </div>
        //                 <p className="text-xs text-nx-gray">Include yourself as the first member; max 4.</p>
        //               </div>
        //               <Input label="Group Name" value={s.groupName} onChange={(v) => handleInputChange('studentInfo', { ...s, groupName: v })} />
        //             </div>
        //             <div className="space-y-4">
        //               <label className="text-xs font-bold uppercase text-nx-gray">Members Names</label>
        //               {!s.isGroup ? (
        //                 <div className="space-y-3">
        //                   <div className="flex items-center gap-2">
        //                     <input
        //                       value={`${formData.firstName} ${formData.lastName}`.trim()}
        //                       readOnly
        //                       className="w-full p-3 bg-nx-muted/50 border border-nx-steel rounded-lg outline-none text-nx-gray"
        //                     />
        //                   </div>
        //                   <div className="text-xs text-nx-gray">Solo registration — just you (read-only).</div>
        //                 </div>
        //               ) : (
        //                 <div className="space-y-3">
        //                   {Array.from({ length: s.memberCount || 1 }).map((_, idx) => (
        //                     <div key={idx} className="flex items-center gap-2">
        //                       {idx === 0 ? (
        //                         <input
        //                           value={`${formData.firstName} ${formData.lastName}`.trim()}
        //                           readOnly
        //                           className="w-full p-3 bg-nx-muted/50 border border-nx-steel rounded-lg outline-none text-nx-gray"
        //                         />
        //                       ) : (
        //                         <input
        //                           value={(s.members && s.members[idx]) || ''}
        //                           onChange={(e) => {
        //                             const newMembers = [...(s.members || [])];
        //                             while (newMembers.length < (s.memberCount || 1)) newMembers.push('');
        //                             newMembers[idx] = e.target.value;
        //                             handleInputChange('studentInfo', { ...s, members: newMembers });
        //                           }}
        //                           placeholder={`Member ${idx + 1}`}
        //                           className="w-full p-3 bg-nx-navy border border-nx-steel rounded-lg outline-none focus:ring-2 focus:ring-nx-cyan text-nx-white"
        //                         />
        //                       )}
        //                     </div>
        //                   ))}
        //                   <div className="text-xs text-nx-gray">First member is you (read-only).</div>
        //                 </div>
        //               )}
        //             </div>
        //           </div>
        //         </div>
        //       </CollapsibleSection>
        //     </div>
        //   );
        // }
        if (formData.category === 'STARTUP') {
          return (
            <div className="animate-in slide-in-from-right-8 duration-300">
              <CollapsibleSection title="Startup Details" defaultOpen>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input label="Startup Name" />
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-nx-gray">Stage</label>
                      <div className="flex rounded-lg overflow-hidden border border-nx-steel/30">
                        {['IDEA', 'GROWTH-STAGE', 'REVENUE'].map(stage => (
                          <button key={stage} className="flex-1 py-3 text-xs font-bold hover:bg-nx-muted/50 transition-colors border-r border-nx-steel/30 last:border-0 uppercase tracking-tighter text-nx-white">
                            {stage}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Input label="Member Count (Range 2)" type="number" min="1" max="2" />
                    <Input label="Industry (Optional)" />
                  </div>
                  <div className="flex items-center justify-between p-6 bg-nx-cyan/10 rounded-2xl border border-nx-cyan/20">
                  
                    <div className="space-y-1">
                      <p className="font-bold text-nx-white">Promotion Listing</p>
                      <p className="text-xs text-nx-cyan">Get listed in our startup directory</p>
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
                  <div className="flex items-center justify-between p-4 bg-nx-muted/50 rounded-xl border border-nx-steel/30">
                    <span className="text-sm font-semibold text-nx-white">Promotion List</span>
                    <ToggleButton />
                  </div>
                </div>
                <div className="p-6 bg-nx-cyan/5 rounded-2xl border border-nx-cyan/20 space-y-4">
                  <p className="text-sm text-nx-cyan leading-relaxed italic">
                    "If you have your logo or Poster design for standees, send via email. If not, only send logo via email!"
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-nx-white">Our email:</span>
                    <span className="text-nx-cyan font-mono text-sm underline cursor-pointer">logos@event.com</span>
                  </div>
                </div>
                </div>
              </CollapsibleSection>
            </div>
          );
        }
        return <div className="p-12 text-center text-nx-gray italic">No details needed for this category. Click Next.</div>;

      case Step.ADDITIONAL_INFO:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
            <CollapsibleSection title="Additional Information" defaultOpen>
              <div className="p-8 space-y-6">
                <p className="font-semibold text-nx-white">Which of the following you interest?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Networking',
                    'Funding / Investors',
                    'Mentorship',
                    'Collaboration / Team Members',
                    'Learning / Exposure'
                  ].map((interest) => (
                    <label key={interest} className="flex items-center gap-3 p-4 rounded-xl border border-nx-steel/30 hover:bg-nx-muted/50 transition-colors cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-nx-steel bg-nx-navy text-nx-cyan focus:ring-nx-cyan"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => {
                          const newInterests = e.target.checked 
                            ? [...formData.interests, interest]
                            : formData.interests.filter(i => i !== interest);
                          handleInputChange('interests', newInterests);
                        }}
                      />
                      <span className="text-sm font-medium text-nx-gray">{interest}</span>
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
                      <label className="text-xs font-bold uppercase text-nx-gray">Social Network</label>
                      <input 
                        placeholder="e.g. LinkedIn"
                        value={net.platform}
                        onChange={(e) => {
                          const newNets = [...formData.socialNetworks];
                          newNets[idx].platform = e.target.value;
                          handleInputChange('socialNetworks', newNets);
                        }}
                        className="w-full p-4 bg-nx-navy border border-nx-steel rounded-lg outline-none focus:ring-2 focus:ring-nx-cyan text-nx-white"
                      />
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-xs font-bold uppercase text-nx-gray">URL</label>
                      <div className="flex gap-2">
                        <input 
                          placeholder="https://..."
                          value={net.url}
                          onChange={(e) => {
                            const newNets = [...formData.socialNetworks];
                            newNets[idx].url = e.target.value;
                            handleInputChange('socialNetworks', newNets);
                          }}
                          className="flex-1 p-4 bg-nx-navy border border-nx-steel rounded-lg outline-none focus:ring-2 focus:ring-nx-cyan text-nx-white"
                        />
                        {idx > 0 && (
                          <button 
                            onClick={() => {
                              const newNets = formData.socialNetworks.filter((_, i) => i !== idx);
                              handleInputChange('socialNetworks', newNets);
                            }}
                            className="p-4 text-rose-500 bg-rose-500/10 rounded-xl hover:bg-rose-500/20 transition-colors"
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
                  className="flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-dashed border-nx-steel/50 text-nx-gray hover:border-nx-cyan hover:text-nx-cyan transition-all w-full justify-center group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  <span className="font-bold">Add Another Social Platform</span>
                </button>
                <div className="text-xs text-nx-gray mt-2">Add Social Media profile for community</div>
              </div>
            </CollapsibleSection>
          </div>
        );



      default:
        return null;
    }
  };

  const isLastStep = currentStep === Step.ADDITIONAL_INFO;

  return (
    <div className="min-h-screen bg-nx-navy text-nx-white">
      <SEO 
        title="FCC Registration" 
        description="Register for the Founder Circle Community (FCC) and join an elite network of founders and innovators."
      />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="max-w-2xl mx-auto bg-nx-muted border border-nx-cyan/30 rounded-3xl p-8 sm:p-16 text-center shadow-2xl shadow-nx-cyan/10"
              >
                <div className="w-24 h-24 bg-nx-cyan/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-12 h-12 text-nx-cyan" />
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-nx-white mb-6">Registration Successful!</h2>
                <p className="text-nx-gray text-xl mb-10 leading-relaxed">
                  Thank you for registering. We will contact you with further details soon.
                </p>
                {registrationId && (
                  <div className="bg-nx-navy/50 border border-nx-steel rounded-2xl p-6 mb-10">
                    <p className="text-xs uppercase tracking-[0.2em] text-nx-gray mb-2 font-bold">Registration ID</p>
                    <p className="text-2xl sm:text-3xl font-mono text-nx-cyan break-all">{registrationId}</p>
                  </div>
                )}
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(Step.AGREEMENTS);
                  }}
                  className="w-full sm:w-auto px-12 py-5 bg-nx-cyan text-nx-navy font-extrabold rounded-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-nx-cyan/20"
                >
                  Back to Registration
                </button>
              </motion.div>
            ) : (
              <div key="form" className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Sidebar Progress Box */}
                <div className="w-full lg:w-80 flex-shrink-0">
                  <Sidebar currentStep={currentStep} />
                </div>
                
                {/* Main Content */}
                <div className="flex-1">
                  <header className="mb-10">
                    <h1 className="text-4xl sm:text-6xl font-black text-nx-cyan mb-4 tracking-tighter">Registration</h1>
                    <p className="text-nx-gray text-lg">Complete the steps below to join the community.</p>
                  </header>

                  <StepIndicator currentStep={currentStep} />

                  {submitError && (
                    <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-500 font-medium flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      {submitError}
                    </div>
                  )}

                  <div className="min-h-[500px] mb-12">
                    {renderStepContent()}
                  </div>

                  <div className="sticky bottom-6 z-10">
                    <div className="flex flex-col sm:flex-row justify-end items-center gap-4 p-6 bg-nx-navy/80 backdrop-blur-md border border-nx-steel/30 rounded-2xl shadow-xl">
                      <button 
                        onClick={prevStep}
                        disabled={currentStep === Step.AGREEMENTS || isSubmitting}
                        className="px-8 py-4 rounded-xl font-bold text-nx-gray bg-nx-muted border border-nx-steel hover:bg-nx-steel hover:text-nx-white disabled:opacity-0 transition-all w-full sm:w-auto"
                      >
                        Previous Page
                      </button>

                      {isLastStep ? (
                        <button 
                          disabled={isSubmitting || !isCurrentStepComplete()}
                          className="px-12 py-4 bg-nx-cyan text-nx-navy border-2 border-nx-cyan rounded-xl font-black hover:bg-white hover:border-white shadow-lg shadow-nx-cyan/20 transition-all hover:-translate-y-1 disabled:opacity-30 disabled:cursor-not-allowed w-full sm:w-auto flex items-center justify-center gap-2"
                          onClick={submitForm}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader className="w-5 h-5 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            'Submit Registration'
                          )}
                        </button>
                      ) : (
                        <button 
                          onClick={nextStep}
                          disabled={!isCurrentStepComplete()}
                          className="px-12 py-4 bg-nx-cyan text-nx-navy rounded-xl font-black hover:bg-white shadow-lg shadow-nx-cyan/20 disabled:bg-nx-steel disabled:text-nx-gray disabled:shadow-none disabled:cursor-not-allowed transition-all hover:-translate-y-1 w-full sm:w-auto"
                        >
                          Next Page
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const CollapsibleSection: React.FC<{ title: string, children: React.ReactNode, defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="transition-all duration-300 mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-nx-muted border border-nx-steel/50 rounded-xl shadow-lg hover:border-nx-cyan/50 transition-all"
      >
        <span className="text-lg font-bold text-nx-white tracking-tight">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-nx-cyan" /> : <ChevronDown className="w-5 h-5 text-nx-cyan" />}
      </button>
      <div className={`transition-all duration-500 ${isOpen ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="bg-nx-muted/50 border border-nx-steel/30 rounded-xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

const Input: React.FC<{ label: string, type?: string, value?: string, onChange?: (v: string) => void }> = ({ label, type = 'text', value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-nx-gray">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-5 py-4 bg-nx-navy border border-nx-steel rounded-lg focus:ring-2 focus:ring-nx-cyan focus:border-nx-cyan outline-none transition-all font-medium text-nx-white placeholder:text-nx-steel"
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

const ToggleButton: React.FC = () => {
  const [active, setActive] = useState(false);
  return (
    <button 
      onClick={() => setActive(!active)}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 p-1 ${active ? 'bg-nx-cyan' : 'bg-nx-steel'}`}
    >
      <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
};
export default FCCRegistration;
