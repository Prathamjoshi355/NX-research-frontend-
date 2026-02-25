import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-neon-cyan/8 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Link to="/" className="flex items-center gap-2">
                <span className="font-display font-black text-xl sm:text-2xl tracking-[2px] sm:tracking-[4px] text-neon-cyan drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
                  NX
                </span>
                <span className="font-display font-normal text-xl sm:text-2xl tracking-[2px] sm:tracking-[4px] text-text-primary">
                  RESEARCH
                </span>
              </Link>
            </div>
            <p className="text-text-secondary font-heading font-normal text-sm max-w-sm mb-10 leading-relaxed">
              Building the next generation of ventures through deep research, elite networking, and strategic innovation.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary hover:bg-neon-cyan hover:text-bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary hover:bg-neon-cyan hover:text-bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary hover:bg-neon-cyan hover:text-bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-text-primary font-heading font-bold text-sm uppercase tracking-[2px] mb-8">Quick Links</h4>
            <ul className="space-y-4 text-text-secondary font-heading text-sm">
              <li><Link to="/" className="hover:text-neon-cyan transition-colors">Home</Link></li>
              <li><Link to="/initiatives" className="hover:text-neon-cyan transition-colors">Initiatives</Link></li>
              <li><Link to="/founder-circle" className="hover:text-neon-cyan transition-colors">Founder Circle</Link></li>
              <li><Link to="/join" className="hover:text-neon-cyan transition-colors">Join Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-heading font-bold text-sm uppercase tracking-[2px] mb-8">Connect</h4>
            <ul className="space-y-6 text-text-secondary font-heading text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-neon-cyan" />
                <span>hello@nxresearch.com</span>
              </li>
              <li className="font-mono text-[12px] leading-relaxed">
                123 Innovation Way,<br />
                Tech City, TC 10101
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-neon-cyan/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-mono text-[12px] text-text-dim">© 2025 NX Research. All rights reserved.</p>
          <div className="flex gap-10 font-mono text-[12px] text-text-dim">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
