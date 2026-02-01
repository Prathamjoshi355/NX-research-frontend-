
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-[#0A2463] text-white pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0A2463] font-black text-2xl">N</div>
          <span className="font-black text-2xl tracking-tighter uppercase">NX Research</span>
        </div>
        <p className="text-blue-100/60 leading-relaxed text-sm italic">"From Student to Researcher"</p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-8 text-[#FB8500]">Sections</h4>
        <ul className="space-y-4 text-blue-100/70 font-medium">
          <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
          <li><Link to="/summit" className="hover:text-white transition-colors">Summit</Link></li>
          <li><Link to="/login" className="hover:text-white transition-colors">Apply Now</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-8 text-[#FB8500]">Domains</h4>
        <ul className="space-y-4 text-blue-100/70 font-medium">
          <li><Link to="/government" className="hover:text-white transition-colors">Government Research</Link></li>
          <li><Link to="/private" className="hover:text-white transition-colors">Private Research</Link></li>
          <li><Link to="/initiative" className="hover:text-white transition-colors">Student Initiative</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-8 text-[#FB8500]">User</h4>
        <ul className="space-y-4 text-blue-100/70 font-medium">
          <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
          <li><Link to="/dashboard" className="hover:text-white transition-colors">Member Dashboard</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center text-sm text-blue-200/40 font-medium">
      © {new Date().getFullYear()} NX Research Organization. Building independent creators.
    </div>
  </footer>
);

export default Footer;
