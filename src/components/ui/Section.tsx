import React from "react";

export const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);
