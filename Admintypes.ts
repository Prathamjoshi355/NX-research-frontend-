
import React from 'react';

export interface StatItem {
  label: string;
  value: string | number;
  color: string;
}

export interface ResearchItem {
  title: string;
  progress: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  section: 'CORE' | 'SYSTEMS' | 'COMMUNITY';
}

export interface Course {
  id: string;
  name: string;
  mentor: string;
  startDate: string;
  endDate: string;
  schedule: string;
  price: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  progress: number;
}

export interface StudentApplication {
  fullName: string;
  email: string;
  mobile: string;
  institution: string;
  educationLevel: string;
  courseCategory: string;
  skillLevel: 'Beginner' | 'Basic' | 'Intermediate' | 'Advanced';
  pastProjects: string;
  goals: string[];
  mainGoal: string;
  intensity: string;
  availability: string;
  learningMode: string;
  resumeLink: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  loginTime: string;
  totalSpent: string;
  courses: Course[];
  avatar: string;
  applicationData?: StudentApplication;
}

export type EntityType = 'STUDENT' | 'RESEARCHER' | 'MENTOR' | 'PARTNER' | 'TECH_LEAD';

export interface GovEntity {
  id: string;
  type: EntityType;
  name: string;
  email: string;
  status: 'Verified' | 'Pending' | 'Security Cleared' | 'Blocked';
  department: string;
  joinDate: string;
  avatar: string;
  submissionData: Record<string, any>;
  assignedProjects: string[];
}

export interface IndustryEntity {
  id: string;
  type: 'RESEARCHER' | 'PARTNER' | 'TECH_LEAD';
  name: string;
  email: string;
  company: string;
  status: 'Active' | 'Under Review' | 'On Hold' | 'Contracted';
  contractValue: string;
  joinedDate: string;
  avatar: string;
  intelData: Record<string, any>;
}

export interface Challenge {
  id: string;
  title: string;
  status: 'APPROVED' | 'PENDING' | 'CLOSED';
  endsDate: string;
  prize: string;
  theme: 'GOV' | 'INDUSTRY' | 'ALL';
  description: string;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  teamLead: string;
  teamSize: string;
  approach: string;
  status: 'PENDING' | 'REVIEWED' | 'SHORTLISTED' | 'REJECTED';
  submissionDate: string;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  specialty: string;
  status: 'Active' | 'Available' | 'On Leave';
  assignedStudentIds: string[];
  bio: string;
  rating: number;
}

export interface Startup {
  id: string;
  name: string;
  industry: string;
  founder: string;
  teamLeads: string[];
  status: 'Working' | 'Pending' | 'Launched' | 'On Hold';
  launchDate: string;
  description: string;
  funding: string;
  avatar: string;
  progress: number;
}

export interface NXEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  day: string;
  venue: string;
  term: string; // e.g., "One-Day Summit"
  swag: string;
  connectionsMade: number;
  attendees: number;
  status: 'Upcoming' | 'Live' | 'Completed';
  avatar: string;
}

export interface Notification {
  id: string;
  type: 'SYSTEM' | 'SUCCESS' | 'ALERT' | 'INFO';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface OrgSettings {
  orgName: string;
  orgSlogan: string;
  adminEmail: string;
  maintenanceMode: boolean;
  twoFactorAuth: boolean;
  notificationPreferences: {
    systemAlerts: boolean;
    studentActivity: boolean;
    eventRegistrations: boolean;
  };
  syncFrequency: 'Real-time' | 'Hourly' | 'Daily';
}
