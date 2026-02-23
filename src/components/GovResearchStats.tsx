import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

const Counter = ({ value, label }: { value: string, label: string }) => {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const target = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const hasDecimal = value.includes('.');

  useEffect(() => {
    if (isInView && !isNaN(target)) {
      const duration = 2000;
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const current = easeOutExpo * target;
        
        setCount(hasDecimal ? current.toFixed(1) : Math.floor(current).toString());

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }
  }, [isInView, target, hasDecimal]);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default function GovResearchStats() {
  return (
    <section className="py-20 bg-bg-primary relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Counter value="48" label="Total Projects" />
          <Counter value="12" label="Active Projects" />
          <Counter value="850+" label="Students & Researchers" />
          <Counter value="15" label="Startups Evolved" />
          <Counter value="24" label="Projects Implemented" />
        </div>
      </div>
    </section>
  );
}
