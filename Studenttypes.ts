
// Import React to fix the 'Cannot find namespace React' error for React.ReactNode
import React from 'react';

export interface Activity {
  id: string;
  type: 'assignment' | 'challenge' | 'mentorship' | 'credit';
  title: string;
  subtitle: string;
  timestamp: string;
}

export interface Student {
  name: string;
  track: string;
  activeProjects: number;
  nextSession: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'mentor';
  text: string;
  time: string;
}
