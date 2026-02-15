
import React from 'react';

interface HeroProps {
  onExplore: () => void;
  onApply: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onApply }) => {
  return (
    <section className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-[#0A1211]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2D2B]/90 via-transparent to-[#0A1211] z-[2]"></div>
       <div className="absolute inset-0 z-0 opacity-90">
          <img
            src="https://res.cloudinary.com/dhy9pmo8s/image/upload/v1770321470/Empowerment_Home_g5oxtc.jpg"
            alt="Research Hero"
            className="w-full h-full object-cover brightness-50  "
          />
        </div>
      

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        
        <h1 className="text-2xl md:text-4xl lg:text-7xl font-black text-white leading-[0.8] tracking-tighter italic uppercase">
          Build Skills. Build Research.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FB998] to-[#66C2A5]">Build Your Career.</span>
        </h1>
        <p className="text-base md:text-3xl text-[#EEF4F2]/80 max-w-4xl mx-auto mb-12 md:mb-20 leading-relaxed font-semibold italic">
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
