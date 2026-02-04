
import React, { useState } from 'react';
import { Section, Button, Input } from '../components/Common';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'register') {
      setIsRegistered(true);
      setTab('login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <Section gray className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-md w-full animate-in zoom-in duration-300">
        {isRegistered && (
          <div className="mb-6 p-6 bg-[#3FB998]/10 border-2 border-[#3FB998]/20 rounded-[24px] flex items-center space-x-4 animate-in slide-in-from-top">
            <CheckCircle2 className="text-[#3FB998] w-8 h-8" />
            <div>
              <p className="font-black text-[#1F2D2B] text-xs uppercase tracking-widest">Success!</p>
              <p className="text-[#4A5D5A] text-sm font-medium">Account created successfully. Please login to continue.</p>
            </div>
          </div>
        )}

        <div className="bg-white border-2 border-gray-100 rounded-[40px] p-12 shadow-2xl">
          <div className="flex bg-gray-50 p-2 rounded-2xl mb-12">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${tab === 'login' ? 'bg-white text-[#1F2D2B] shadow-md' : 'text-gray-400'}`}
            >
              Login
            </button>
            <button
              onClick={() => { setTab('register'); setIsRegistered(false); }}
              className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${tab === 'register' ? 'bg-white text-[#1F2D2B] shadow-md' : 'text-gray-400'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {tab === 'register' && <Input label="Full Name" placeholder="Aakash Kumar" required />}
            <Input label="Email / Phone" placeholder="user@example.com" type="text" required />
            <Input label="Password" type="password" placeholder="••••••••" required />
            {tab === 'register' && <Input label="Confirm Password" type="password" placeholder="••••••••" required />}

            <Button fullWidth size="lg" className="h-16 rounded-2xl font-black uppercase tracking-widest">
              {tab === 'login' ? 'Login' : 'Create Account'}
            </Button>

            {tab === 'login' && (
              <div className="text-center">
                <Link to="#" className="text-xs font-bold text-[#3FB998] hover:underline uppercase tracking-widest">
                  Forgot Password?
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Login;
