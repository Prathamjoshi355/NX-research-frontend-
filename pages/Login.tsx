import React from 'react';
import { Section, Button, Input } from '../components/Common';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <Section gray className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-md w-full animate-in zoom-in duration-300">
        
        <div className="bg-white border-2 border-gray-100 rounded-[40px] p-12 shadow-2xl">
          
          <h2 className="text-center font-black text-xl mb-10 uppercase tracking-widest text-[#1F2D2B]">
            Login
          </h2>

          <form onSubmit={handleAuth} className="space-y-6">
            <Input
              label="Email / Phone"
              placeholder="user@example.com"
              type="text"
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              required
            />

            <Button
              fullWidth
              size="lg"
              className="h-16 rounded-2xl font-black uppercase tracking-widest"
            >
              Login
            </Button>

            <div className="text-center">
              <Link
                to="#"
                className="text-xs font-bold text-[#3FB998] hover:underline uppercase tracking-widest"
              >
                Forgot Password?
              </Link>
            </div>
          </form>

        </div>
      </div>
    </Section>
  );
};

export default Login;
