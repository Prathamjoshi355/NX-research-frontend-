import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function FounderCirclePreview() {
  const highlights = [
    "Mentorship & Guidance",
    "Founder Collaboration",
    "Scaling Support",
    "Investor Access",
  ];

  const avatars = [
    { color: "bg-neon-cyan" },
    { color: "bg-neon-purple" },
    { color: "bg-neon-blue" },
    { color: "bg-teal" },
    { color: "bg-gold" },
  ];

  return (
    <section id="fcc" className="py-24 bg-gradient-to-br from-bg-secondary via-[#0a1020] to-[#06080f] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#00d4ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-[24px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16"
        >
          {/* Left Side */}
          <div className="lg:w-[60%]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-[11px] text-gold tracking-[5px] uppercase">
                Exclusive Program
              </span>
            </div>
            
            <h2 className="text-4xl md:text-[40px] font-display font-bold text-text-primary mb-8 leading-tight">
              Founder Circle — <br />
              <span className="text-neon-cyan">Elite Network for Builders</span>
            </h2>
            
            <p className="font-heading font-normal text-text-secondary text-lg mb-10 leading-[1.8] max-w-2xl">
              A private community for serious founders building real ventures. 
              Collaborate with mentors, innovators, and investors to scale faster.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-4 text-text-primary border-l-2 border-teal/30 pl-4">
                  <CheckCircle2 size={18} className="text-teal" />
                  <span className="font-heading font-medium text-[14px]">{item}</span>
                </div>
              ))}
            </div>

            <button className="group relative px-10 py-4 bg-gradient-to-r from-neon-cyan to-neon-blue text-bg-primary font-heading font-bold text-[14px] rounded-[6px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]">
              Apply to Join
            </button>
          </div>

          {/* Right Side */}
          <div className="lg:w-[40%] relative">
            <div className="relative w-full aspect-square max-w-[320px] mx-auto">
              {/* Radial Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-cyan/10 blur-[80px] rounded-full" />
              
              {/* Avatar Stack */}
              <div className="relative h-full flex items-center justify-center">
                {avatars.map((avatar, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute w-16 h-16 rounded-full border-[3px] border-bg-primary shadow-[0_0_20px_rgba(0,212,255,0.2)] ${avatar.color}`}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + (i % 2) * 30}%`,
                      zIndex: 5 - i
                    }}
                  />
                ))}
              </div>

              {/* Floating Particles */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: [-20, -100],
                    x: Math.random() * 40 - 20
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 2 
                  }}
                  className="absolute w-1 h-1 bg-neon-cyan/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: '20%'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
