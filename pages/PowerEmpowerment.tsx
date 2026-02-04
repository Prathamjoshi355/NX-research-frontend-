
import React, { useState, useEffect } from 'react';
import { Hero } from '../components/CousesHero';
import { CourseSection } from '../components/CouseSection';
import { HowItWorks } from '../components/HowItWorks';
import { ApplicationForm } from '../components/ApplicationForm';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'apply'>('home');

  // Simple hash-based "routing" or state-based toggle
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#apply') setView('apply');
    else setView('home');

    const handleHashChange = () => {
      if (window.location.hash === '#apply') setView('apply');
      else setView('home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToApply = () => {
    window.location.hash = 'apply';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">


      {view === 'home' ? (
        <>
          <Hero onExplore={scrollToCourses} onApply={navigateToApply} />
          <CourseSection onApply={navigateToApply} />
          <HowItWorks onApply={navigateToApply} />

          {/* Final CTA Section */}
          <section className="py-24 bg-[#3FB998] text-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to start your learning journey?</h2>
              <p className="text-white/95 mb-10 text-lg max-w-xl mx-auto">
                Join hundreds of students already building projects and careers with our expert mentors.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={navigateToApply}
                  className="px-10 py-5 bg-white text-[#1F2D2B] rounded-2xl font-black shadow-2xl hover:scale-105 transition-all w-full sm:w-auto"
                >
                  Apply Now
                </button>
                <button
                  className="px-10 py-5 bg-[#1F2D2B] text-white border border-white/30 rounded-2xl font-black hover:bg-[#1F2D2B]/90 transition-all w-full sm:w-auto"
                >
                  Talk to Mentor
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <ApplicationForm onBack={navigateToHome} />
      )}

    </div>
  );
};

export default App;
