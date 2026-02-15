
import React, { useState } from 'react';
// Changed import from '../types' to '../typesEMP' to fix enum mismatch and missing member errors (e.g., Programming)
import { Category } from '../typesEMP';
import { COURSE_CATEGORIES, COURSES } from '../constants';

interface CourseSectionProps {
  onApply: () => void;
}

export const CourseSection: React.FC<CourseSectionProps> = ({ onApply }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.Programming);

  const filteredCourses = COURSES.filter(course => course.category === activeCategory);

  return (
    <section id="courses" className="py-20 bg-[#F7FAF9]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-[#1F2D2B]">Course Categories</h2>
          <p className="text-[#4A5D5A]">Pick a domain that fits your career aspirations</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {COURSE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300 ${activeCategory === cat.id
                  ? 'bg-[#A9E2D2]/30 border-[#3FB998] text-[#1F2D2B] font-bold'
                  : 'bg-white border-transparent text-[#4A5D5A] hover:bg-[#EEF4F2]'
                }`}
            >
              <span>{cat.icon}</span>
              <span className="font-semibold text-sm whitespace-nowrap">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Global Durations Info */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-[#1F2D2B]">Choose Your Learning Duration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-[#A9E2D2]/20 border border-[#A9E2D2]">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-bold text-lg mb-2 text-[#1F2D2B]">10 Days – Fast Track</h4>
              <p className="text-sm text-[#4A5D5A]">Quick skill boost with intensive mentoring</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#3FB998]/10 border border-[#3FB998]">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-bold text-lg mb-2 text-[#1F2D2B]">1 Month – Skill Builder</h4>
              <p className="text-sm text-[#4A5D5A]">Strong foundation with project-based learning</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#A9E2D2]/20 border border-[#A9E2D2]">
              <div className="text-3xl mb-3">🧠</div>
              <h4 className="font-bold text-lg mb-2 text-[#1F2D2B]">3 Months – Mastery Track</h4>
              <p className="text-sm text-[#4A5D5A]">Professional level skills with real-world experience</p>
            </div>
          </div>
          <p className="text-center text-xs text-[#8FA6A1] mt-4 italic">Note: Longer duration = deeper learning at lower total cost per session</p>
        </div>

        {/* Pricing Table/Content */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-4 lg:p-8 border border-[#A9E2D2] shadow-xl shadow-[#A9E2D2]/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#EEF4F2]">
                  <th className="py-4 px-4 font-bold text-[#1F2D2B]">Course</th>
                  {(activeCategory === Category.ProjectDev || activeCategory === Category.CareerPrep) ? (
                    <th className="py-4 px-4 font-bold text-[#1F2D2B]">Full Price</th>
                  ) : (
                    <>
                      <th className="py-4 px-4 font-bold text-[#3FB998]">10 Days</th>
                      <th className="py-4 px-4 font-bold text-[#66C2A5]">1 Month</th>
                      <th className="py-4 px-4 font-bold text-[#3FB998]">3 Months</th>
                    </>
                  )}
                  <th className="py-4 px-4 font-bold text-[#1F2D2B] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF4F2]">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-white/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-[#1F2D2B]">{course.name}</td>
                    {course.pricing.fixed !== undefined ? (
                      <td className="py-4 px-4 text-[#4A5D5A] font-semibold text-lg">₹{course.pricing.fixed.toLocaleString()}</td>
                    ) : (
                      <>
                        <td className="py-4 px-4 text-[#4A5D5A]">₹{course.pricing.tenDays?.toLocaleString()}</td>
                        <td className="py-4 px-4 text-[#4A5D5A]">₹{course.pricing.oneMonth?.toLocaleString()}</td>
                        <td className="py-4 px-4 text-[#4A5D5A]">₹{course.pricing.threeMonths?.toLocaleString()}</td>
                      </>
                    )}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={onApply}
                        className="text-xs lg:text-sm font-bold bg-white text-[#1F2D2B] border border-[#3FB998] px-4 py-2 rounded-lg hover:bg-[#3FB998] hover:text-white transition-all shadow-sm"
                      >
                        {activeCategory === Category.ProjectDev ? 'Apply & Discuss' : 'Apply & Get Recommended'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
