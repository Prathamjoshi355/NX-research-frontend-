import React from "react";

export const Section = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <section className={`py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`} style={style}>
    {children}
  </section>
);
