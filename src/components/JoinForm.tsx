import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Lightbulb, 
  Rocket, 
  Search, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2,
  ChevronRight
} from "lucide-react";

type Path = "learn" | "idea" | "startup" | "research" | "dont-know" | null;

interface JoinFormProps {
  initialPath: string | null;
}

export default function JoinForm({ initialPath }: JoinFormProps) {
  const [path, setPath] = useState<Path>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    personal: {},
    academic: {},
    availability: {},
    specialization: {}
  });

  const basicInfoRef = useRef<HTMLDivElement>(null);
  const specializationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPath) {
      const validPaths: Path[] = ["learn", "idea", "startup", "research", "dont-know"];
      if (validPaths.includes(initialPath as Path)) {
        setPath(initialPath as Path);
        setStep(2);
        // Delay scroll slightly to ensure DOM is ready
        setTimeout(() => {
          basicInfoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [initialPath]);

  const handlePathSelect = (selectedPath: Path) => {
    setPath(selectedPath);
    setStep(2);
    setTimeout(() => {
      basicInfoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNextStep = () => {
    if (step === 2) {
      setStep(3);
      setTimeout(() => {
        specializationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <div id="join-form" className="py-20 bg-bg-primary relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* STEP 1: PATH SELECTION */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] text-neon-cyan tracking-[4px] uppercase mb-4 block">Step 01</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary uppercase tracking-tight">Choose Your Path</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Center Option */}
            <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 w-full md:w-auto">
              <PathCard 
                id="dont-know"
                icon={<HelpCircle size={24} />}
                title="I Don't Know"
                desc="Guided discovery"
                active={path === "dont-know"}
                onClick={() => handlePathSelect("dont-know")}
                isCenter
              />
            </div>

            <PathCard 
              id="learn"
              icon={<BookOpen size={24} />}
              title="Learn"
              desc="Research methodology"
              active={path === "learn"}
              onClick={() => handlePathSelect("learn")}
            />
            <PathCard 
              id="idea"
              icon={<Lightbulb size={24} />}
              title="Idea"
              desc="Concept to validation"
              active={path === "idea"}
              onClick={() => handlePathSelect("idea")}
            />
            <PathCard 
              id="startup"
              icon={<Rocket size={24} />}
              title="Startup"
              desc="Venture building"
              active={path === "startup"}
              onClick={() => handlePathSelect("startup")}
            />
            <PathCard 
              id="research"
              icon={<Search size={24} />}
              title="Research"
              desc="Deep tech exploration"
              active={path === "research"}
              onClick={() => handlePathSelect("research")}
            />
          </div>
        </section>

        {/* STEP 2: BASIC INFORMATION */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.section 
              ref={basicInfoRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-32 pt-20 border-t border-neon-cyan/10"
            >
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] text-neon-cyan tracking-[4px] uppercase mb-4 block">Step 02</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary uppercase tracking-tight">Basic Information</h2>
              </div>

              <div className="bg-bg-secondary/50 backdrop-blur-xl border border-neon-cyan/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="space-y-12">
                  {/* Personal Details */}
                  <div>
                    <h3 className="text-neon-cyan font-mono text-[11px] tracking-[3px] uppercase mb-8 flex items-center gap-3">
                      <div className="w-8 h-px bg-neon-cyan/30" /> Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Full Name" placeholder="John Doe" onChange={(v) => handleInputChange("personal", "name", v)} />
                      <InputField label="Email Address" placeholder="john@example.com" type="email" onChange={(v) => handleInputChange("personal", "email", v)} />
                      <InputField label="Mobile Number" placeholder="+1 234 567 890" onChange={(v) => handleInputChange("personal", "phone", v)} />
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="City" placeholder="San Francisco" onChange={(v) => handleInputChange("personal", "city", v)} />
                        <InputField label="Country" placeholder="USA" onChange={(v) => handleInputChange("personal", "country", v)} />
                      </div>
                      <InputField label="Age" placeholder="24" type="number" onChange={(v) => handleInputChange("personal", "age", v)} />
                    </div>
                  </div>

                  {/* Academic / Professional */}
                  <div>
                    <h3 className="text-neon-cyan font-mono text-[11px] tracking-[3px] uppercase mb-8 flex items-center gap-3">
                      <div className="w-8 h-px bg-neon-cyan/30" /> Academic / Professional
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-4">Current Level</label>
                        <div className="flex flex-wrap gap-4">
                          {["UG", "PG", "Masters", "PhD", "Working Professional"].map((level) => (
                            <RadioButton 
                              key={level}
                              label={level}
                              name="level"
                              active={formData.academic.level === level}
                              onClick={() => handleInputChange("academic", "level", level)}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <InputField label="Institution / Company" placeholder="Stanford University" onChange={(v) => handleInputChange("academic", "institution", v)} />
                      
                      <AnimatePresence mode="wait">
                        {formData.academic.level && formData.academic.level !== "Working Professional" ? (
                          <motion.div key="stream" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                            <InputField label="Stream / Major" placeholder="Computer Science" onChange={(v) => handleInputChange("academic", "stream", v)} />
                          </motion.div>
                        ) : formData.academic.level === "Working Professional" ? (
                          <motion.div key="role" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                            <InputField label="Job Role" placeholder="Software Engineer" onChange={(v) => handleInputChange("academic", "role", v)} />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="text-neon-cyan font-mono text-[11px] tracking-[3px] uppercase mb-8 flex items-center gap-3">
                      <div className="w-8 h-px bg-neon-cyan/30" /> Availability & Commitment
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-4">Availability</label>
                        <div className="flex flex-wrap gap-4">
                          {["Full-time", "Part-time", "Remote"].map((type) => (
                            <Checkbox 
                              key={type}
                              label={type}
                              active={formData.availability[type]}
                              onClick={() => handleInputChange("availability", type, !formData.availability[type])}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <YesNoQuestion 
                          label="Comfortable with Deadlines?" 
                          active={formData.availability.deadlines}
                          onClick={(v) => handleInputChange("availability", "deadlines", v)}
                        />
                        <YesNoQuestion 
                          label="Ready for Structured Supervision?" 
                          active={formData.availability.supervision}
                          onClick={(v) => handleInputChange("availability", "supervision", v)}
                        />
                        <YesNoQuestion 
                          label="Open to Team-Based Work?" 
                          active={formData.availability.teamwork}
                          onClick={(v) => handleInputChange("availability", "teamwork", v)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex justify-end">
                  <button 
                    onClick={handleNextStep}
                    className="flex items-center gap-3 px-8 py-4 bg-neon-cyan text-bg-primary font-mono text-[12px] font-bold uppercase tracking-[2px] rounded-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,212,255,0.3)]"
                  >
                    Next Step <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* STEP 3: SPECIALIZATION */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.section 
              ref={specializationRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-32 pt-20 border-t border-neon-cyan/10"
            >
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] text-neon-cyan tracking-[4px] uppercase mb-4 block">Step 03</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary uppercase tracking-tight">Specialization</h2>
              </div>

              <div className="bg-bg-secondary/50 backdrop-blur-xl border border-neon-cyan/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                <SpecializationForm path={path} formData={formData} onChange={handleInputChange} />

                <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <button className="text-text-dim font-mono text-[11px] uppercase tracking-[2px] hover:text-text-primary transition-colors">
                    Save & Continue Later
                  </button>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5 bg-neon-cyan text-bg-primary font-mono text-[14px] font-bold uppercase tracking-[3px] rounded-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(0,212,255,0.4)]">
                    Submit Application
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

function PathCard({ id, icon, title, desc, active, onClick, isCenter }: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`
        cursor-pointer p-8 rounded-2xl border transition-all duration-500 group
        ${active 
          ? "bg-neon-cyan/10 border-neon-cyan shadow-[0_0_40px_rgba(0,212,255,0.15)]" 
          : "bg-bg-secondary/40 border-neon-cyan/10 hover:border-neon-cyan/40 hover:bg-bg-secondary/60"
        }
        ${isCenter ? "md:scale-110 md:shadow-2xl" : ""}
      `}
    >
      <div className={`mb-4 transition-colors duration-500 ${active ? "text-neon-cyan" : "text-text-dim group-hover:text-neon-cyan"}`}>
        {icon}
      </div>
      <h3 className={`text-lg font-display font-bold uppercase tracking-tight mb-1 transition-colors duration-500 ${active ? "text-neon-cyan" : "text-text-primary"}`}>
        {title}
      </h3>
      <p className="text-text-secondary font-mono text-[10px] uppercase tracking-wider">{desc}</p>
      
      {active && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute top-4 right-4 text-neon-cyan"
        >
          <CheckCircle2 size={18} />
        </motion.div>
      )}
    </motion.div>
  );
}

function InputField({ label, placeholder, type = "text", onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg-primary/50 border border-neon-cyan/10 rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-neon-cyan/40 focus:bg-bg-primary transition-all"
      />
    </div>
  );
}

function RadioButton({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`
        px-6 py-2 rounded-full border font-mono text-[10px] uppercase tracking-wider transition-all
        ${active 
          ? "bg-neon-cyan text-bg-primary border-neon-cyan shadow-[0_0_15px_rgba(0,212,255,0.3)]" 
          : "bg-transparent border-neon-cyan/20 text-text-secondary hover:border-neon-cyan/50"
        }
      `}
    >
      {label}
    </button>
  );
}

function Checkbox({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-3 px-6 py-2 rounded-lg border font-mono text-[10px] uppercase tracking-wider transition-all
        ${active 
          ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan shadow-[0_0_15px_rgba(0,212,255,0.1)]" 
          : "bg-transparent border-neon-cyan/20 text-text-secondary hover:border-neon-cyan/50"
        }
      `}
    >
      <div className={`w-3 h-3 rounded-sm border ${active ? "bg-neon-cyan border-neon-cyan" : "border-neon-cyan/30"}`} />
      {label}
    </button>
  );
}

function YesNoQuestion({ label, active, onClick }: any) {
  return (
    <div className="space-y-4">
      <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider">{label}</label>
      <div className="flex gap-4">
        <button 
          onClick={() => onClick(true)}
          className={`flex-1 py-2 rounded-lg border font-mono text-[10px] uppercase tracking-wider transition-all ${active === true ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan" : "border-neon-cyan/10 text-text-dim"}`}
        >
          Yes
        </button>
        <button 
          onClick={() => onClick(false)}
          className={`flex-1 py-2 rounded-lg border font-mono text-[10px] uppercase tracking-wider transition-all ${active === false ? "bg-red-500/10 border-red-500/30 text-red-400" : "border-neon-cyan/10 text-text-dim"}`}
        >
          No
        </button>
      </div>
    </div>
  );
}

function SpecializationForm({ path, formData, onChange }: any) {
  if (path === "startup") {
    return (
      <div className="space-y-12">
        <div>
          <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">I want to join as:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Join Founder Circle (Networking)",
              "Become a Founder",
              "I have a Startup & Need Support",
              "Work with a Startup"
            ].map((role) => (
              <RadioButton 
                key={role}
                label={role}
                active={formData.specialization.role === role}
                onClick={() => onChange("specialization", "role", role)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">Startup Interest Area:</label>
          <div className="flex flex-wrap gap-4">
            {["AI/ML", "Fintech", "Healthtech", "Deeptech", "SaaS", "Web3", "Other"].map((area) => (
              <Checkbox 
                key={area}
                label={area}
                active={formData.specialization.areas?.[area]}
                onClick={() => {
                  const areas = formData.specialization.areas || {};
                  onChange("specialization", "areas", { ...areas, [area]: !areas[area] });
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">Experience Level:</label>
            <div className="space-y-3">
              {["Beginner", "Intermediate", "Experienced", "Already Running Startup"].map((lvl) => (
                <RadioButton 
                  key={lvl}
                  label={lvl}
                  active={formData.specialization.experience === lvl}
                  onClick={() => onChange("specialization", "experience", lvl)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">Support Required:</label>
            <div className="grid grid-cols-1 gap-3">
              {["Mentorship", "Funding", "Networking", "Technical Support", "Hiring"].map((sup) => (
                <Checkbox 
                  key={sup}
                  label={sup}
                  active={formData.specialization.support?.[sup]}
                  onClick={() => {
                    const support = formData.specialization.support || {};
                    onChange("specialization", "support", { ...support, [sup]: !support[sup] });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (path === "idea") {
    return (
      <div className="space-y-12">
        <div>
          <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">Idea Stage:</label>
          <div className="flex flex-wrap gap-4">
            {["Concept Only", "Research Done", "Prototype Stage", "Market Tested"].map((stage) => (
              <RadioButton 
                key={stage}
                label={stage}
                active={formData.specialization.stage === stage}
                onClick={() => onChange("specialization", "stage", stage)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">Problem Category:</label>
          <div className="flex flex-wrap gap-4">
            {["Social", "Technical", "Environmental", "Economic", "Other"].map((cat) => (
              <Checkbox 
                key={cat}
                label={cat}
                active={formData.specialization.category?.[cat]}
                onClick={() => {
                  const category = formData.specialization.category || {};
                  onChange("specialization", "category", { ...category, [cat]: !category[cat] });
                }}
              />
            ))}
          </div>
        </div>

        <InputField label="Briefly describe the problem you're solving" placeholder="The problem is..." onChange={(v: any) => onChange("specialization", "problem", v)} />
        
        <div>
          <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">Type of Support Needed:</label>
          <div className="flex flex-wrap gap-4">
            {["Validation", "Technical", "Market Research", "Team Building"].map((sup) => (
              <Checkbox 
                key={sup}
                label={sup}
                active={formData.specialization.ideaSupport?.[sup]}
                onClick={() => {
                  const support = formData.specialization.ideaSupport || {};
                  onChange("specialization", "ideaSupport", { ...support, [sup]: !support[sup] });
                }}
              />
            ))}
          </div>
        </div>

        <InputField label="Target Sector" placeholder="e.g. Education, Healthcare" onChange={(v: any) => onChange("specialization", "sector", v)} />
      </div>
    );
  }

  if (path === "research") {
    return (
      <div className="space-y-12">
        <div>
          <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">Research Type Preference:</label>
          <div className="flex flex-wrap gap-4">
            {["Academic", "Applied", "Market", "Policy"].map((type) => (
              <Checkbox 
                key={type}
                label={type}
                active={formData.specialization.researchType?.[type]}
                onClick={() => {
                  const types = formData.specialization.researchType || {};
                  onChange("specialization", "researchType", { ...types, [type]: !types[type] });
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">Research Domain:</label>
          <div className="flex flex-wrap gap-4">
            {["AI", "Quantum", "Biotech", "Social Science", "Economics"].map((domain) => (
              <Checkbox 
                key={domain}
                label={domain}
                active={formData.specialization.domain?.[domain]}
                onClick={() => {
                  const domains = formData.specialization.domain || {};
                  onChange("specialization", "domain", { ...domains, [domain]: !domains[domain] });
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">Role in Research Team:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Research Analyst",
              "Developer",
              "Documentation Lead",
              "Data Analyst",
              "UI/UX Designer",
              "Market Researcher"
            ].map((role) => (
              <RadioButton 
                key={role}
                label={role}
                active={formData.specialization.researchRole === role}
                onClick={() => onChange("specialization", "researchRole", role)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (path === "learn") {
    return (
      <div className="space-y-12">
        <div>
          <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-6">Learning Track:</label>
          <div className="flex flex-wrap gap-4">
            {["Research Fundamentals", "Advanced Methodology", "Venture Building", "Data Science"].map((track) => (
              <RadioButton 
                key={track}
                label={track}
                active={formData.specialization.track === track}
                onClick={() => onChange("specialization", "track", track)}
              />
            ))}
          </div>
        </div>
        <InputField label="What specific skills do you want to focus on?" placeholder="e.g. Python, Case Studies" onChange={(v: any) => onChange("specialization", "skills", v)} />
      </div>
    );
  }

  if (path === "dont-know") {
    return (
      <div className="space-y-12">
        <div className="p-8 bg-neon-cyan/5 border border-neon-cyan/20 rounded-2xl">
          <p className="text-text-primary font-heading text-sm mb-6 leading-relaxed">
            Not sure where you fit? Answer these quick questions and we'll recommend a path.
          </p>
          <div className="space-y-8">
            <InputField label="What interests you most?" placeholder="e.g. solving problems, learning new things" onChange={(v: any) => onChange("specialization", "interest", v)} />
            <div>
              <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-4">Do you prefer:</label>
              <div className="flex flex-wrap gap-4">
                {["Learning", "Building", "Exploring Ideas"].map((pref) => (
                  <RadioButton 
                    key={pref}
                    label={pref}
                    active={formData.specialization.preference === pref}
                    onClick={() => onChange("specialization", "preference", pref)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-text-secondary font-mono text-[10px] uppercase tracking-wider mb-4">Are you looking for:</label>
              <div className="flex flex-wrap gap-4">
                {["A Job", "Research Path", "Startup Path"].map((goal) => (
                  <RadioButton 
                    key={goal}
                    label={goal}
                    active={formData.specialization.goal === goal}
                    onClick={() => onChange("specialization", "goal", goal)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
