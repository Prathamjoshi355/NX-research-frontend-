
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './Common';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Summit', path: '/summit' },
    { name: 'Gov Research', path: '/government' },
    { name: 'Private Research', path: '/private' },
    { name: 'Student Initiative', path: '/initiative' },
    { name: 'Empowerment', path: '/power' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#0A2463] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl">N</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-[#0A2463] uppercase">NX Research</span>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm font-semibold transition-colors hover:text-[#FB8500] ${isActive(link.path) ? 'text-[#FB8500]' : 'text-[#1E1E1E]'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login">
            <Button size="sm">login</Button>
          </Link>
        </div>

        <button className="lg:hidden text-[#0A2463]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="font-bold text-lg text-[#0A2463]">
              {link.name}
            </Link>
          ))}
          <Link to="/login" onClick={() => setIsOpen(false)} className="bg-[#FB8500] text-white p-4 rounded-xl text-center font-bold">
            Login / Apply
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
