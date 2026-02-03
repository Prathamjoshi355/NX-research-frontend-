
import React from 'react';
import { X } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-[9px]";
  
  const variants = {
    primary: "bg-[#FB8500] text-white hover:bg-[#e67a00] shadow-sm",
    secondary: "bg-[#0A2463] text-white hover:bg-[#081d50] shadow-sm",
    outline: "border-2 border-gray-100 text-[#0A2463] hover:border-[#FB8500] hover:text-[#FB8500]",
    ghost: "text-[#1E1E1E] hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm"
  };

  const sizes = {
    sm: "px-3 py-1.5",
    md: "px-4 py-2.5",
    lg: "px-6 py-3.5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Section = React.forwardRef<HTMLElement, { 
  children: React.ReactNode, 
  className?: string, 
  dark?: boolean, 
  gray?: boolean 
} & React.HTMLAttributes<HTMLElement>>(({ 
  children, 
  className = '', 
  dark = false, 
  gray = false,
  ...props 
}, ref) => (
  <section 
    ref={ref}
    className={`py-12 md:py-16 px-4 ${dark ? 'bg-[#0A2463] text-white' : gray ? 'bg-[#F8F9FA]' : 'bg-white'} ${className}`}
    {...props}
  >
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
));

export const Card = ({ 
  children, 
  className = '', 
  ...props 
}: { 
  children: React.ReactNode, 
  className?: string 
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={`bg-white border border-gray-100 rounded-2xl p-6 card-hover shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const Input = ({ label, className = "", ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className={`mb-3 ${className}`}>
    {label && <label className="block text-[9px] font-black uppercase text-gray-400 mb-1 tracking-widest pl-1">{label}</label>}
    <input 
      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FB8500] focus:border-[#FB8500] outline-none transition-all font-bold text-xs bg-gray-50/50"
      {...props}
    />
  </div>
);

export const Select = ({ label, options, ...props }: { label: string, options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="mb-3">
    {label && <label className="block text-[9px] font-black uppercase text-gray-400 mb-1 tracking-widest pl-1">{label}</label>}
    <select 
      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FB8500] focus:border-[#FB8500] outline-none transition-all font-bold text-xs bg-gray-50/50"
      {...props}
    >
      <option value="">Select Option</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export const Textarea = ({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="mb-3">
    {label && <label className="block text-[9px] font-black uppercase text-gray-400 mb-1 tracking-widest pl-1">{label}</label>}
    <textarea 
      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FB8500] focus:border-[#FB8500] outline-none transition-all font-bold text-xs bg-gray-50/50 min-h-[100px]"
      {...props}
    />
  </div>
);

export const Badge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    'Approved': 'bg-green-100 text-green-700',
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Rejected': 'bg-red-100 text-red-700',
    'Completed': 'bg-blue-100 text-blue-700'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${colors[status] || 'bg-gray-100 text-gray-500'}`}>
      {status}
    </span>
  );
};

export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-black text-[#0A2463] uppercase tracking-tighter">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-50 transition-colors text-gray-400"><X size={18} /></button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Switch = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) => (
  <label className="flex items-center justify-between cursor-pointer group py-1.5">
    <span className="text-[10px] font-black uppercase text-[#0A2463] tracking-widest">{label}</span>
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-[#FB8500]' : 'bg-gray-200'}`}></div>
      <div className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
    </div>
  </label>
);
