import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const pillars = [
  { name: "Initiatives", href: "/initiatives" },
  { name: "Empowerment & Transformation", href: "/empowerment" },
  { name: "Government Research", href: "/gov-research" },
  { name: "Private Research", href: "/private-research" },
  { name: "Founder Circle", href: "/#founder-circle" },
];

export default function Navbar() {
  const [isPillarOpen, setIsPillarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      if (location.pathname === "/") {
        const sections = ["initiatives", "empowerment", "gov-research", "private-research", "fcc", "how-it-works", "testimonials", "vision-mission"];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= -100 && rect.top <= 300) {
              setActiveSection(section);
              return;
            }
          }
        }
        setActiveSection("home");
      } else if (location.pathname === "/initiatives") {
        setActiveSection("initiatives");
      } else if (location.pathname === "/empowerment") {
        setActiveSection("empowerment");
      } else if (location.pathname === "/gov-research") {
        setActiveSection("gov-research");
      } else if (location.pathname === "/private-research") {
        setActiveSection("private-research");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-16 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-bg-primary/85 backdrop-blur-[20px] border-neon-cyan/10" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display font-black text-2xl tracking-[4px] text-neon-cyan drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
            NX
          </span>
          <span className="font-display font-normal text-2xl tracking-[4px] text-text-primary">
            RESEARCH
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <Link 
            to="/" 
            className={`font-heading text-[14px] tracking-[2px] uppercase transition-all duration-300 relative py-2 ${
              activeSection === "home" && location.pathname === "/" ? "text-neon-cyan" : "text-text-secondary hover:text-neon-cyan"
            }`}
          >
            Home
            {activeSection === "home" && location.pathname === "/" && (
              <motion.div layoutId="activeNav" className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-cyan shadow-[0_0_10px_#00d4ff]" />
            )}
          </Link>
          
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsPillarOpen(true)}
            onMouseLeave={() => setIsPillarOpen(false)}
          >
            <button className={`flex items-center gap-1 font-heading text-[14px] tracking-[2px] uppercase transition-all duration-300 cursor-pointer ${location.pathname === "/initiatives" || location.pathname === "/empowerment" || location.pathname === "/gov-research" || location.pathname === "/private-research" || pillars.some(p => p.href.includes(activeSection)) || (activeSection === "fcc") ? "text-neon-cyan" : "text-text-secondary hover:text-neon-cyan"}`}>
              Pillars <ChevronDown size={14} className={`transition-transform duration-300 ${isPillarOpen ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {isPillarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-0 w-64 bg-bg-secondary/95 backdrop-blur-xl border border-neon-cyan/12 rounded-xl overflow-hidden shadow-2xl"
                >
                  {pillars.map((pillar) => (
                    <Link
                      key={pillar.name}
                      to={pillar.href}
                      className={`group flex items-center gap-3 px-4 py-4 text-[13px] font-heading tracking-[1px] uppercase transition-all duration-300 border-b border-white/5 last:border-0 ${
                        (pillar.href === location.pathname) || (pillar.href.includes("#") && location.pathname === "/" && pillar.href.split("#")[1] === activeSection)
                          ? "text-neon-cyan bg-neon-cyan/10" 
                          : "text-text-secondary hover:text-neon-cyan hover:bg-neon-cyan/10"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-neon-cyan transition-transform duration-300 ${(pillar.href === location.pathname) || (pillar.href.includes("#") && location.pathname === "/" && pillar.href.split("#")[1] === activeSection) ? "scale-100" : "scale-0 group-hover:scale-100"}`} />
                      {pillar.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a 
            href="/#fcc" 
            className={`font-heading text-[14px] tracking-[2px] uppercase transition-all duration-300 relative py-2 ${
              activeSection === "fcc" ? "text-neon-cyan" : "text-text-secondary hover:text-neon-cyan"
            }`}
          >
            FCC
            {activeSection === "fcc" && (
              <motion.div layoutId="activeNav" className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-cyan shadow-[0_0_10px_#00d4ff]" />
            )}
          </a>
          <a 
            href="#join" 
            className="font-heading text-[14px] tracking-[2px] uppercase bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan px-6 py-2 rounded-md font-bold hover:bg-neon-cyan hover:text-bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
          >
            Join us
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <Link to="/" className="text-white text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <div className="flex flex-col gap-2">
                <span className="text-white/50 text-sm uppercase tracking-wider font-bold">Pillars</span>
                {pillars.map((pillar) => (
                  <Link 
                    key={pillar.name} 
                    to={pillar.href} 
                    className={`pl-4 py-1 border-l border-white/10 transition-colors ${location.pathname === pillar.href ? 'text-neon-cyan border-neon-cyan' : 'text-white/80'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {pillar.name}
                  </Link>
                ))}
              </div>
              <Link to="/#fcc" className="text-white text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>FCC</Link>
              <a href="#join" className="bg-white text-black text-center py-3 rounded-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>Join us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
