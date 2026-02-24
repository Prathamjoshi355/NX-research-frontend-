import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, MousePointer2, MessageSquare, ClipboardCheck, Users, Clock, Handshake, ArrowRight } from "lucide-react";

const InitiativesProcess = () => {
  // Simple loop for animation
  const [activeGuided, setActiveGuided] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGuided((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-text-primary mb-6 tracking-tight uppercase italic"
          >
            How Connections Work <br className="md:hidden" />
            <span className="text-neon-cyan">Inside NX Research</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary font-light"
          >
            You can connect directly or let NX Research guide the process.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Direct Connect - Infographic Style */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-bg-secondary/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group"
          >
            {/* Geometric Background Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rotate-45 translate-x-32 -translate-y-32 -z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-cyan/5 rotate-45 -translate-x-32 translate-y-32 -z-0" />

            <div className="relative z-10">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-black text-text-primary tracking-tighter uppercase italic leading-none mb-2">
                  Direct Connect
                </h3>
                <div className="h-1 w-20 bg-neon-cyan mx-auto rounded-full mb-4" />
                <p className="text-neon-cyan/60 font-black text-xs uppercase tracking-[0.4em]">Self-Service Protocol</p>
              </div>
              
              <div className="space-y-8 relative">
                {/* Flowing Line */}
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "80%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  className="absolute left-10 top-10 w-1 bg-gradient-to-b from-neon-cyan/40 to-transparent -z-0 hidden md:block"
                />

                {[
                  { label: "Open Profile", icon: User },
                  { label: "Click \"Connect\"", icon: MousePointer2 },
                  { label: "Start Conversation", icon: MessageSquare },
                ].map((step, i) => (
                  <div key={i}>
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                      className="flex items-center group"
                    >
                      <div className="w-20 h-20 bg-neon-cyan rounded-l-full flex items-center justify-center text-bg-primary shadow-xl z-10 -mr-4 group-hover:scale-110 transition-transform duration-300 border-r-4 border-black/20">
                        <step.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1 bg-white/5 backdrop-blur-md rounded-r-full py-5 px-10 border-y border-r border-white/10">
                        <h4 className="text-xl font-black text-text-primary uppercase tracking-tight leading-none">{step.label}</h4>
                        <p className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em] mt-1">Protocol Stage 0{i + 1}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 pt-8 border-t border-white/5 text-center">
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-4">Learn More At</p>
                <p className="text-sm font-bold text-neon-cyan tracking-widest">WWW.NXRESEARCH.COM</p>
              </div>
            </div>
          </motion.div>

          {/* Guided Connect */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-bg-secondary/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group"
          >
            <div className="flex items-center gap-5 mb-12">
              <div className="w-16 h-16 bg-neon-purple/10 rounded-2xl flex items-center justify-center border border-neon-purple/20">
                <ClipboardCheck className="w-8 h-8 text-neon-purple" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-text-primary tracking-tight uppercase italic">Guided Connect</h3>
                <p className="text-text-secondary font-bold text-xs uppercase tracking-widest mt-1">Strategic Matching</p>
              </div>
            </div>
            
            <p className="text-text-secondary mb-10 leading-relaxed font-light text-lg">If you're unsure who to connect with, NX Research evaluates your needs and connects you strategically.</p>
            
            <div className="space-y-6 relative">
              {/* Vertical Progress Line */}
              <div className="absolute left-12 top-0 bottom-0 w-px bg-white/5 -z-10 hidden md:block" />

              {[
                { label: "Fill Enquiry Form", icon: ClipboardCheck },
                { label: "NX Team Reviews", icon: Users },
                { label: "Meetup Within 36 Hours", icon: Clock },
                { label: "Right Introduction", icon: Handshake },
              ].map((step, i) => {
                const isActive = activeGuided === i;
                return (
                  <div key={i}>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`flex items-center gap-6 p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                        isActive 
                          ? `bg-neon-purple/10 border-neon-purple/30 shadow-lg shadow-neon-purple/10 scale-[1.02]` 
                          : "bg-white/5 border-white/5 opacity-60"
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId={`glow-neon-purple`}
                          className={`absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-transparent`}
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isActive ? "bg-bg-primary scale-110 rotate-3 border border-neon-purple/40" : "bg-bg-primary/50"
                      }`}>
                        <step.icon className={`w-6 h-6 transition-colors duration-500 ${isActive ? `text-neon-purple` : "text-text-secondary"}`} />
                      </div>
                      
                      <span className={`text-lg font-bold transition-colors duration-500 ${isActive ? "text-text-primary" : "text-text-secondary"}`}>
                        {step.label}
                      </span>
                      
                      <ArrowRight className={`w-5 h-5 ml-auto transition-all duration-500 ${
                        isActive ? `text-neon-purple/60 translate-x-1` : "text-white/10"
                      }`} />
                    </motion.div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5 flex justify-center">
              <span className="text-xs font-black text-neon-purple uppercase tracking-[0.2em] bg-neon-purple/10 px-6 py-2 rounded-full border border-neon-purple/20">Strategic Matching Protocol</span>
            </div>
          </motion.div>
        </div>

        {/* Why Guided Connection Matters */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-black text-text-primary tracking-tight uppercase italic"
            >
              Why Guided Connection Matters
            </motion.h3>
            <div className="h-1 w-20 bg-neon-cyan mx-auto rounded-full mt-4" />
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Arrows (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 hidden md:block pointer-events-none">
              <div className="flex justify-around px-12">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className="w-12 h-12 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ x: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-8 h-8 text-neon-cyan/40" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {[
              { title: "Stage Based Matching", desc: "We match you with people at the same or next stage of your journey.", icon: ClipboardCheck },
              { title: "Intent Validation", desc: "Every connection is vetted for genuine intent and mutual value.", icon: Users },
              { title: "Right People Shortlist", desc: "No noise. Only the most relevant connections for your specific goals.", icon: Handshake },
              { title: "Context Driven Introductions", desc: "We provide the context so you can start meaningful conversations.", icon: MessageSquare },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-bg-secondary/50 backdrop-blur-md rounded-[2rem] border border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 group relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-neon-cyan/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-neon-cyan/20">
                  <item.icon className="w-8 h-8 text-neon-cyan" />
                </div>
                <h4 className="text-xl font-black text-text-primary mb-3 tracking-tight uppercase italic leading-tight">{item.title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <p className="text-2xl font-black text-text-primary uppercase italic tracking-tighter">
              We don’t just connect people — <span className="text-neon-cyan">we connect purpose.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InitiativesProcess;
