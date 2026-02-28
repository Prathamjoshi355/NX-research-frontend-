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
        const sections = [
          "initiatives",
          "empowerment",
          "gov-research",
          "private-research",
          "fcc",
          "how-it-works",
          "testimonials",
          "vision-mission",
        ];
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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-16 bg-bg-primary border-b border-neon-cyan/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">

        {/* ✅ Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img
            src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1772075032/N-removebg-preview_t7qzbd.png"
            alt="logo"
            className="h-10 w-auto object-contain drop-shadow-[0_0_1px_rgba(0,212,255,0.7)] hover:drop-shadow-[0_0_14px_rgba(0,212,255,1)] transition-all duration-10 animate-logoGlow"
/>

          <span className="font-display text-xl sm:text-2xl tracking-[3px] sm:tracking-[4px] text-text-primary">
            RESEARCH
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">

          <Link
            to="/"
            className={`font-heading text-[14px] tracking-[2px] uppercase py-2 ${
              activeSection === "home" && location.pathname === "/"
                ? "text-neon-cyan"
                : "text-text-secondary hover:text-neon-cyan"
            }`}
          >
            Home
          </Link>

          {/* Pillars Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsPillarOpen(true)}
            onMouseLeave={() => setIsPillarOpen(false)}
          >
            <span className="flex items-center gap-1 font-heading text-[14px] tracking-[2px] uppercase text-text-secondary hover:text-neon-cyan py-2 cursor-pointer">
              {displayLabel}
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  isPillarOpen ? "rotate-180" : ""
                }`}
              />
            </span>

            <AnimatePresence>
              {isPillarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-64 bg-bg-secondary border border-neon-cyan/20 rounded-xl shadow-xl"
                >
                  {pillars.map(pillar => (
                    <Link
                      key={pillar.name}
                      to={pillar.href}
                      className="block px-4 py-3 text-sm uppercase text-text-secondary hover:text-neon-cyan hover:bg-neon-cyan/10"
                    >
                      {pillar.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/FCC"
            className="font-heading text-[14px] tracking-[2px] uppercase text-text-secondary hover:text-neon-cyan py-2"
          >
            FCC
          </Link>

          <Link
            to="/join"
            className="font-heading text-[14px] tracking-[2px] uppercase bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan px-6 py-2 rounded-md font-bold hover:bg-neon-cyan hover:text-bg-primary transition"
          >
            Join us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 top-16 bg-bg-primary md:hidden flex flex-col p-6"
          >
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl mb-6">
              Home
            </Link>

            {pillars.map(p => (
              <Link
                key={p.name}
                to={p.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg mb-4"
              >
                {p.name}
              </Link>
            ))}

            <Link
              to="/FCC"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl mt-4"
            >
              FCC
            </Link>

            <Link
              to="/join"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-auto bg-neon-cyan text-bg-primary py-4 text-center rounded-xl font-bold"
            >
              Join the Ecosystem
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}