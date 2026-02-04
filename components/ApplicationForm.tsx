
import React, { useState } from 'react';
import { Category, ApplicationFormData } from '../types';
import { COURSE_CATEGORIES, COURSES } from '../constants';

interface ApplicationFormProps {
  onBack: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    mobile: '',
    institution: '',
    educationLevel: '',
    category: '',
    specificCourses: [],
    skillLevel: '',
    projectsExperience: '',
    goals: [],
    mainGoal6Months: '',
    preferredIntensity: '',
    availability: '',
    learningMode: '',
    links: '',
    seriousConfirmation: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'goals') {
        const newGoals = checkbox.checked 
          ? [...formData.goals, value]
          : formData.goals.filter(g => g !== value);
        setFormData(prev => ({ ...prev, goals: newGoals }));
      } else if (name === 'seriousConfirmation') {
        setFormData(prev => ({ ...prev, seriousConfirmation: checkbox.checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCourseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const values: string[] = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setFormData(prev => ({ ...prev, specificCourses: values }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-xl border border-emerald-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            ✅
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Application Submitted!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for applying for a Personalized Learning Path at NX Research. 
            Our mentor team will contact you shortly for a skill assessment interview.
          </p>
          <button 
            onClick={onBack}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 font-semibold mb-8 hover:translate-x-[-4px] transition-transform">
          ← Back to Courses
        </button>
        
        <header className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            Apply for Personalized Learning Path
          </h1>
          <p className="text-slate-500">
            Submit your details and our mentors will analyze your skills to recommend the best course duration.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Details */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-sm">👤</span>
              Basic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number</label>
                <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="+91 00000 00000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City / College / Institution</label>
                <input required type="text" name="institution" value={formData.institution} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="XYZ Institute of Tech" />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Current Education Level</label>
              <div className="flex flex-wrap gap-4">
                {['Diploma', 'B.Tech', 'M.Tech', 'Other'].map(level => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="educationLevel" value={level} onChange={handleChange} className="w-4 h-4 text-indigo-600" />
                    <span className="text-slate-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Course Interest */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-sm">📚</span>
              Course Interest
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Which category are you applying for?</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a Category</option>
                  {COURSE_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              {formData.category && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Specific Course(s)</label>
                  <select 
                    multiple 
                    name="specificCourses"
                    onChange={handleCourseSelect}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
                  >
                    {COURSES.filter(c => c.category === formData.category).map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-400 mt-2">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</p>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Skill Level */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-sm">📊</span>
              Current Skill Level
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-4">How would you rate your level in this domain?</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {['Beginner', 'Basic', 'Intermediate', 'Advanced'].map(level => (
                    <label key={level} className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${
                      formData.skillLevel === level ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}>
                      <input type="radio" name="skillLevel" value={level} onChange={handleChange} className="hidden" />
                      <div className="font-bold mb-1">{level}</div>
                      <div className="text-[10px]">
                        {level === 'Beginner' && 'Never learned before'}
                        {level === 'Basic' && 'Know some concepts'}
                        {level === 'Intermediate' && 'Can build small things'}
                        {level === 'Advanced' && 'Already working level'}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Have you worked on any projects before?</label>
                <textarea 
                  name="projectsExperience" 
                  value={formData.projectsExperience} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                  placeholder="Briefly describe your past projects or type 'None'..."
                />
              </div>
            </div>
          </div>

          {/* Section 4: Goals */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-sm">🎯</span>
              Your Goals
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Why do you want to take this course? (Select multiple)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Skill building', 'College projects', 'Internship/job preparation', 'Research work', 'Startup/product idea', 'Exam support'].map(goal => (
                    <label key={goal} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                      <input type="checkbox" name="goals" value={goal} onChange={handleChange} className="w-4 h-4 rounded text-indigo-600" />
                      <span className="text-sm text-slate-700">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your main goal in next 6 months:</label>
                <input type="text" name="mainGoal6Months" value={formData.mainGoal6Months} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Secure an AI Internship" />
              </div>
            </div>
          </div>

          {/* Section 5: Preference & Availability */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-sm">⏳</span>
              Logistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Preferred Intensity (Mentor decided)</label>
                <select name="preferredIntensity" value={formData.preferredIntensity} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
                  <option value="">Choose your preference</option>
                  <option value="10 Days">Fast Track (10 Days)</option>
                  <option value="1 Month">Skill Builder (1 Month)</option>
                  <option value="3 Months">Mastery Track (3 Months)</option>
                  <option value="Unsure">Not sure - Mentor decide</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Availability (Daily)</label>
                <div className="flex gap-4">
                  {['1–2 hrs', '2–4 hrs', '4+ hrs'].map(v => (
                    <label key={v} className="flex items-center gap-2">
                      <input type="radio" name="availability" value={v} onChange={handleChange} className="text-indigo-600" />
                      <span className="text-sm text-slate-700">{v}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Preferred Learning Mode</label>
                <select name="learningMode" value={formData.learningMode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select mode</option>
                  <option value="Online">Online Live</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Resume / GitHub / Projects (Optional)</label>
                <input type="text" name="links" value={formData.links} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="Link to your portfolio" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input required type="checkbox" name="seriousConfirmation" checked={formData.seriousConfirmation} onChange={handleChange} className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                I am serious about learning and willing to attend a mentor interview for final evaluation.
              </span>
            </label>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 group"
            >
              Apply for Skill Assessment
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
