
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#FB8500] text-white hover:bg-[#e67a00] shadow-sm",
    secondary: "bg-[#0A2463] text-white hover:bg-[#081d50] shadow-sm",
    outline: "border-2 border-[#FB8500] text-[#FB8500] hover:bg-[#FB8500] hover:text-white",
    ghost: "text-[#1E1E1E] hover:bg-gray-100"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
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

// Updated Section to spread props like 'id' to the underlying section element
export const Section = ({ 
  children, 
  className = '', 
  dark = false, 
  gray = false,
  ...props 
}: { 
  children: React.ReactNode, 
  className?: string, 
  dark?: boolean, 
  gray?: boolean 
} & React.HTMLAttributes<HTMLElement>) => (
  <section 
    className={`py-16 md:py-24 px-6 ${dark ? 'bg-[#0A2463] text-white' : gray ? 'bg-[#F8F9FA]' : 'bg-white'} ${className}`}
    {...props}
  >
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

// Updated Card to accept and spread HTML attributes, allowing props like onClick to work correctly
export const Card = ({ 
  children, 
  className = '', 
  ...props 
}: { 
  children: React.ReactNode, 
  className?: string 
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={`bg-white border border-gray-100 rounded-xl p-6 card-hover ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-[#1E1E1E] mb-1.5">{label}</label>
    <input 
      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FB8500] focus:border-[#FB8500] outline-none transition-all"
      {...props}
    />
  </div>
);

export const Select = ({ label, options, ...props }: { label: string, options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-[#1E1E1E] mb-1.5">{label}</label>
    <select 
      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FB8500] focus:border-[#FB8500] outline-none transition-all bg-white"
      {...props}
    >
      <option value="">Select an option</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export const Textarea = ({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-[#1E1E1E] mb-1.5">{label}</label>
    <textarea 
      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FB8500] focus:border-[#FB8500] outline-none transition-all min-h-[100px]"
      {...props}
    />
  </div>
);

export const Badge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    'Approved': 'bg-[#06A77D] text-white',
    'Pending': 'bg-[#FFB703] text-black',
    'Rejected': 'bg-[#D62828] text-white'
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${colors[status] || 'bg-gray-200 text-gray-700'}`}>
      {status}
    </span>
  );
};
