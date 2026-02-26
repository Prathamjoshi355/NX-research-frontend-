import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, MousePointer2, MessageSquare, ClipboardCheck, Users, Clock, Handshake, ArrowRight, Zap, ShieldCheck } from "lucide-react";

const InitiativesProcess = () => {
  const [activeGuided, setActiveGuided] = useState(0);
  const [mobileTab, setMobileTab] = useState<"direct" | "guided">("direct");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGuided((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-32 bg-bg-primary relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-24">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-text-primary mb-4 md:mb-6 tracking-tight uppercase leading-none"
          >
            How Connections Work <br />
            <span className="text-neon-cyan">Inside NX Research</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-xl text-text-secondary font-light max-w-2xl mx-auto"
          >
            Choose your preferred protocol: Direct engagement or strategic guided matching.
          </motion.p>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden p-1 bg-white/5 rounded-2xl border border-white/10 mb-8">
          <button 
            onClick={() => setMobileTab("direct")}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
              mobileTab === "direct" ? "bg-neon-cyan text-bg-primary shadow-lg shadow-neon-cyan/20" : "text-text-secondary"
            }`}
          >
            Direct
          </button>
          <button 
            onClick={() => setMobileTab("guided")}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
              mobileTab === "guided" ? "bg-neon-purple text-bg-primary shadow-lg shadow-neon-purple/20" : "text-text-secondary"
            }`}
          >
            Guided
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Direct Connect */}
          <AnimatePresence mode="wait">
            {(mobileTab === "direct" || window.innerWidth >= 768) && (
              <motion.div 
                key="direct"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-bg-secondary/80 backdrop-blur-xl p-6 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group h-full"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rotate-45 translate-x-32 -translate-y-32 -z-0" />
                
                <div className="relative z-10">
                  <div className="mb-10 md:mb-16">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/20">
                        <MousePointer2 className="w-6 h-6 text-neon-cyan" />
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tighter uppercase leading-none">
                        Direct Connect
                      </h3>
                    </div>
                    <p className="text-text-secondary text-sm md:text-lg font-light leading-relaxed">
                      For those who know exactly who they want to reach. Instant, self-service engagement.
                    </p>
                  </div>
                  
                  <div className="space-y-4 md:space-y-8 relative">
                    <div className="absolute left-7 md:left-10 top-10 bottom-10 w-px bg-gradient-to-b from-neon-cyan/40 via-neon-cyan/10 to-transparent" />

                    {[
                      { label: "Open Profile", icon: User, desc: "Browse our elite network" },
                      { label: "Click \"Connect\"", icon: MousePointer2, desc: "Trigger instant request" },
                      { label: "Start Conversation", icon: MessageSquare, desc: "Direct encrypted channel" },
                    ].map((step, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center gap-4 md:gap-6 group"
                      >
                        <div className="w-14 h-14 md:w-20 md:h-20 bg-neon-cyan rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-bg-primary shadow-xl z-10 shrink-0 border-b-4 border-black/20 group-hover:scale-105 transition-transform">
                          <step.icon className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl py-3 md:py-5 px-5 md:px-8 border border-white/10 group-hover:bg-white/10 transition-colors">
                          <h4 className="text-sm md:text-xl font-bold text-text-primary uppercase tracking-tight leading-none">{step.label}</h4>
                          <p className="text-[10px] text-text-secondary font-medium mt-1">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Guided Connect */}
          <AnimatePresence mode="wait">
            {(mobileTab === "guided" || window.innerWidth >= 768) && (
              <motion.div 
                key="guided"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-bg-secondary/80 backdrop-blur-xl p-6 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group h-full"
              >
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/5 rotate-45 -translate-x-32 translate-y-32 -z-0" />

                <div className="relative z-10">
                  <div className="mb-10 md:mb-16">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-neon-purple/10 rounded-xl flex items-center justify-center border border-neon-purple/20">
                        <ShieldCheck className="w-6 h-6 text-neon-purple" />
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tighter uppercase leading-none">
                        Guided Connect
                      </h3>
                    </div>
                    <p className="text-text-secondary text-sm md:text-lg font-light leading-relaxed">
                      Unsure who to meet? Our team evaluates your goals and makes strategic introductions.
                    </p>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    {[
                      { label: "Fill Enquiry Form", icon: ClipboardCheck },
                      { label: "NX Team Reviews", icon: Users },
                      { label: "Meetup Within 36 Hours", icon: Clock },
                      { label: "Right Introduction", icon: Handshake },
                    ].map((step, i) => {
                      const isActive = activeGuided === i;
                      return (
                        <motion.div 
                          key={i}
                          className={`flex items-center gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                            isActive 
                              ? `bg-neon-purple/10 border-neon-purple/30 shadow-lg shadow-neon-purple/5` 
                              : "bg-white/5 border-white/5 opacity-40"
                          }`}
                        >
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${
                            isActive ? "bg-bg-primary border border-neon-purple/40" : "bg-bg-primary/50"
                          }`}>
                            <step.icon className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 ${isActive ? `text-neon-purple` : "text-text-secondary"}`} />
                          </div>
                          
                          <span className={`text-xs md:text-lg font-bold transition-colors duration-500 ${isActive ? "text-text-primary" : "text-text-secondary"}`}>
                            {step.label}
                          </span>
                          
                          {isActive && (
                            <motion.div 
                              layoutId="active-indicator"
                              className="ml-auto w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_10px_rgba(188,19,254,0.8)]"
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Horizontal Scroll Cards for Mobile */}
        <div className="mt-24 md:mt-32">
          <div className="text-center mb-10 md:mb-16">
            <h3 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight uppercase leading-none">
              Why Guided Connection Matters
            </h3>
            <div className="h-1 w-12 md:w-20 bg-neon-cyan rounded-full mt-4 mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { title: "Stage Based Matching", desc: "Same or next stage journey matching.", icon: ClipboardCheck },
              { title: "Intent Validation", desc: "Vetted for genuine mutual value.", icon: Users },
              { title: "Right People Shortlist", desc: "Relevant connections, zero noise.", icon: Handshake },
              { title: "Context Driven", desc: "Meaningful context for intros.", icon: MessageSquare },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square p-4 md:p-8 bg-bg-secondary/50 backdrop-blur-md rounded-2xl md:rounded-[2rem] border border-white/5 shadow-sm hover:border-neon-cyan/30 transition-all duration-500 group flex flex-col items-center justify-center text-center"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-neon-cyan/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 border border-neon-cyan/20 group-hover:bg-neon-cyan/20 transition-colors shrink-0">
                  <item.icon className="w-5 h-5 md:w-7 md:h-7 text-neon-cyan" />
                </div>
                <h4 className="text-[10px] md:text-lg font-bold text-text-primary mb-1 md:mb-3 tracking-tight uppercase leading-tight">{item.title}</h4>
                <p className="text-[8px] md:text-sm text-text-secondary leading-tight font-light line-clamp-2 md:line-clamp-none">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-xl md:text-3xl font-bold text-text-primary uppercase tracking-tighter">
              We don’t just connect people — <br className="md:hidden" />
              <span className="text-neon-cyan">we connect purpose.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InitiativesProcess;
