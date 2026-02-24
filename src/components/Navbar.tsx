import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const pillars = [
  { name: "Initiatives", href: "/initiatives" },
  { name: "Empowerment & Transformation", href: "/empowerment" },
  { name: "Government Research", href: "/gov-research" },
  { name: "Private Research", href: "/private-research" },
  { name: "Founder Circle", href: "/founder-circle" },
];

export default function Navbar() {
  const [isPillarOpen, setIsPillarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  const activePillar = pillars.find(p => p.href === location.pathname);
  const displayLabel = activePillar ? activePillar.name : "Pillars";

  useEffect(() => {
    const handleScroll = () => {
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
      } else {
        const path = location.pathname.substring(1);
        setActiveSection(path.toLowerCase());
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-16 bg-bg-primary border-b border-neon-cyan/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="font-display font-black text-xl sm:text-2xl tracking-[3px] sm:tracking-[4px] text-neon-cyan drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
            NX
          </span>
          <span className="font-display font-normal text-xl sm:text-2xl tracking-[3px] sm:tracking-[4px] text-text-primary">
            RESEARCH
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link
            to="/"
            className={`font-heading text-[13px] lg:text-[14px] tracking-[2px] uppercase transition-all duration-300 relative py-2 ${
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
            <Link
              to={activePillar ? activePillar.href : "#"}
              onClick={(e) => { if (!activePillar) e.preventDefault(); }}
              className={`flex items-center gap-1 font-heading text-[13px] lg:text-[14px] tracking-[2px] uppercase transition-all duration-300 cursor-pointer relative py-2 ${
                activePillar || (location.pathname === "/" && pillars.some(p => p.href.includes(activeSection)))
                  ? "text-neon-cyan"
                  : "text-text-secondary hover:text-neon-cyan"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={displayLabel}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {displayLabel}
                </motion.span>
              </AnimatePresence>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isPillarOpen ? "rotate-180" : ""}`} />

              {(activePillar || (location.pathname === "/" && pillars.some(p => p.href.includes(activeSection)))) && (
                <motion.div layoutId="activeNav" className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-cyan shadow-[0_0_10px_#00d4ff]" />
              )}
            </Link>

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
                        pillar.href === location.pathname
                          ? "text-neon-cyan bg-neon-cyan/10"
                          : "text-text-secondary hover:text-neon-cyan hover:bg-neon-cyan/10"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-neon-cyan transition-transform duration-300 ${pillar.href === location.pathname ? "scale-100" : "scale-0 group-hover:scale-100"}`} />
                      {pillar.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/FCC"
            className={`font-heading text-[13px] lg:text-[14px] tracking-[2px] uppercase transition-all duration-300 relative py-2 ${
              activeSection === "fcc" || location.pathname === "/FCC" ? "text-neon-cyan" : "text-text-secondary hover:text-neon-cyan"
            }`}
          >
            FCC
            {(activeSection === "fcc" || location.pathname === "/FCC") && (
              <motion.div layoutId="activeNav" className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-cyan shadow-[0_0_10px_#00d4ff]" />
            )}
          </Link>

          <Link
            to="/join"
            className="font-heading text-[13px] lg:text-[14px] tracking-[2px] uppercase bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan px-5 lg:px-6 py-2 rounded-md font-bold hover:bg-neon-cyan hover:text-bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
          >
            Join us
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 -mr-2 z-[110] relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-16 z-[100] bg-bg-primary md:hidden flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col gap-6 px-6 pt-8 pb-6">
              {/* Home */}
              <Link
                to="/"
                className={`text-2xl font-display font-bold uppercase tracking-tight ${
                  location.pathname === "/" ? "text-neon-cyan" : "text-text-primary/70"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Pillars Section */}
              <div>
                <p className="text-text-dim font-mono text-[10px] uppercase tracking-[4px] mb-4">Our Pillars</p>
                <div className="flex flex-col gap-3">
                  {pillars.map((pillar) => (
                    <Link
                      key={pillar.name}
                      to={pillar.href}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        location.pathname === pillar.href
                          ? "border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan"
                          : "bg-white/5 border-white/5 text-text-primary/80"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-base font-display font-bold uppercase leading-tight pr-2">{pillar.name}</span>
                      <ChevronDown size={16} className="-rotate-90 text-neon-cyan shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* FCC */}
              <Link
                to="/FCC"
                className={`text-2xl font-display font-bold uppercase tracking-tight ${
                  location.pathname === "/FCC" ? "text-neon-cyan" : "text-text-primary/70"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FCC
              </Link>
            </div>

            {/* Join Button */}
            <div className="mt-auto px-6 pb-10 pt-4">
              <Link
                to="/join"
                className="w-full py-4 bg-neon-cyan text-bg-primary font-heading font-bold text-center uppercase tracking-[2px] rounded-xl block shadow-[0_0_30px_rgba(0,212,255,0.3)] text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join the Ecosystem
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}