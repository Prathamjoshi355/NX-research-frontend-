
import React from 'react';

interface HeroProps {
  onExplore: () => void;
  onApply: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onApply }) => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#F7FAF9]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#A9E2D2]/30 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3FB998]/20 rounded-full blur-[100px] opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-[#1F2D2B] mb-6 leading-tight">
          Build Skills. Build Research.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FB998] to-[#66C2A5]">Build Your Career.</span>
        </h1>
        <p className="text-xl text-[#4A5D5A] mb-10 max-w-2xl mx-auto font-light">
          Industry-focused courses with mentorship, real projects & personalized learning paths designed for modern tech excellence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="px-8 py-4 bg-[#3FB998] text-white rounded-xl font-semibold shadow-lg shadow-[#3FB998]/20 hover:bg-[#3FB998]/90 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Explore Courses
          </button>
          <button
            onClick={onApply}
            className="px-8 py-4 bg-white text-[#1F2D2B] border-2 border-[#A9E2D2] rounded-xl font-semibold hover:border-[#3FB998] hover:bg-[#EEF4F2] transition-all duration-300 w-full sm:w-auto"
          >
            Apply for Skill Assessment
          </button>
        </div>
      </div>
    </section>
  );
};
