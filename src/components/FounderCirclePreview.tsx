import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function FounderCirclePreview() {
  const highlights = [
    "Mentorship & Guidance",
    "Founder Collaboration",
    "Scaling Support",
    "Investor Access",
  ];

  // Positions spread across full width & height of container
  const avatars = [
    { color: "bg-neon-cyan",   left: "5%",  top: "10%" },
    { color: "bg-neon-purple", left: "75%", top: "5%"  },
    { color: "bg-neon-blue",   left: "40%", top: "40%" },
    { color: "bg-teal",        left: "10%", top: "65%" },
    { color: "bg-gold",        left: "78%", top: "68%" },
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
          <div className="lg:w-[40%] w-full relative">

            {/* MOBILE: straight line at bottom */}
            <div className="flex lg:hidden justify-center items-center gap-4 py-4">
              {avatars.map((avatar, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-12 h-12 rounded-full border-[3px] border-bg-primary shadow-[0_0_20px_rgba(0,212,255,0.25)] ${avatar.color}`}
                />
              ))}
            </div>

            {/* DESKTOP: spread across area */}
            <div className="hidden lg:block relative h-[340px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-cyan/10 blur-[80px] rounded-full pointer-events-none" />
              {avatars.map((avatar, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute w-16 h-16 rounded-full border-[3px] border-bg-primary shadow-[0_0_20px_rgba(0,212,255,0.25)] ${avatar.color}`}
                  style={{ left: avatar.left, top: avatar.top, zIndex: 5 - i }}
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0], y: [-10, -80], x: Math.random() * 30 - 15 }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
                  className="absolute w-1 h-1 bg-neon-cyan/40 rounded-full"
                  style={{ left: `${Math.random() * 100}%`, bottom: `${10 + Math.random() * 30}%` }}
                />
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}