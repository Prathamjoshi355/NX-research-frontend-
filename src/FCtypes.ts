import React from 'react';

export interface Node {
  id: string;
  label: string;
  icon: React.ReactNode;
  iconColor?: string; // optional tailwind text color class
  description: string;
  color: string;
}
