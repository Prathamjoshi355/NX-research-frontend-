// ================================
// ICON IMPORTS
// ================================

import {
  Users,
  Rocket,
  Zap,
  Globe,
  Briefcase,
  Trophy,
  FileText
} from 'lucide-react';

// ================================
// TYPE IMPORTS
// ================================

import { Category, Course } from './types';

// ================================
// NX RESEARCH – DOMAINS & ECOSYSTEM
// ================================

export const NX_DOMAINS = [
  {
    id: 'summit',
    title: 'Summit & Meets',
    description: 'Collaborative innovation events connecting stakeholders.',
    Icon: Users,
    path: '/summit'
  },
  {
    id: 'government',
    title: 'Government Research',
    description: 'Applied research for national-level problem statements.',
    Icon: Globe,
    path: '/government'
  },
  {
    id: 'private',
    title: 'Private Research',
    description: 'Solution development for startups and companies.',
    Icon: Briefcase,
    path: '/private'
  },
  {
    id: 'initiative',
    title: 'Student Initiative',
    description: 'Student-led research projects with mentor guidance.',
    Icon: Rocket,
    path: '/initiative'
  },
  {
    id: 'power',
    title: 'Power Empowerment',
    description: 'Building thinking, technical and research power.',
    Icon: Zap,
    path: '/power'
  }
];

// ================================
// LEARNING TRACKS
// ================================

export const LEARNING_TRACKS = [
  { id: 'research-101', name: 'Research Methodology', modules: 12, credits: 50 },
  { id: 'ai-ml', name: 'AI/ML Engineering', modules: 24, credits: 120 },
  { id: 'product-dev', name: 'Product Architecture', modules: 15, credits: 80 },
  { id: 'gov-tech', name: 'Public Sector Innovation', modules: 10, credits: 60 }
];

// ================================
// IMPACT METRICS
// ================================

export const IMPACT_METRICS = [
  { label: 'Research Reports', value: '150+', Icon: FileText },
  { label: 'Live Prototypes', value: '45', Icon: Rocket },
  { label: 'Mentors Onboard', value: '80+', Icon: Users },
  { label: 'Student Growth', value: '98%', Icon: Trophy }
];

// ================================
// CHALLENGES
// ================================

export const CHALLENGES = [
  { id: 'c1', title: 'Urban Waste AI', type: 'Government', prize: '₹50,000', deadline: '25 Mar' },
  { id: 'c2', title: 'Agri-Supply Chain', type: 'Industry', prize: 'Internship', deadline: '05 Apr' },
  { id: 'c3', title: 'FinTech Security', type: 'Private', prize: '₹30,000', deadline: '10 Apr' }
];

// ================================
// HOW NX RESEARCH WORKS
// ================================

export const HOW_IT_WORKS = [
  { step: 1, title: 'Identification', description: 'Find a real-world problem.' },
  { step: 2, title: 'Proposal', description: 'Submit a research proposal.' },
  { step: 3, title: 'Development', description: 'Build and test your solution.' },
  { step: 4, title: 'Presentation', description: 'Showcase your outcomes.' }
];

// ================================
// GOVERNMENT GRANTS
// ================================

export const GOV_GRANTS = [
  { name: 'Smart City Innovation Fund', department: 'Urban Dev', status: 'Approved' },
  { name: 'Rural Agri-Tech Support', department: 'Agriculture', status: 'Pending' },
  { name: 'Clean Energy Initiative', department: 'Environment', status: 'Rejected' }
];

// ================================
// INDUSTRY PROJECTS
// ================================

export const INDUSTRY_PROJECTS = [
  { title: 'AI Logistics Optimizer', company: 'SwiftLog', domain: 'Logistics', status: 'Ongoing' },
  { title: 'Secure FinTech Gateway', company: 'BankSecure', domain: 'Finance', status: 'Completed' }
];

// ================================
// POWER PROGRAMS
// ================================

export const POWER_PROGRAMS = [
  { name: 'Mastering React & TS', duration: '8 Weeks', mode: 'Online' },
  { name: 'Applied AI & ML', duration: '12 Weeks', mode: 'Hybrid' },
  { name: 'Research Methodology', duration: '4 Weeks', mode: 'Self-paced' }
];

// ======================================================
// COURSE PLATFORM – CATEGORIES
// ======================================================

export const COURSE_CATEGORIES = [
  { id: Category.Programming, icon: '💻', label: 'Programming & Languages' },
  { id: Category.AdvancedTech, icon: '🤖', label: 'Advanced Tech Domains' },
  { id: Category.Academic, icon: '🎓', label: 'Academic Subjects' },
  { id: Category.ProjectDev, icon: '🛠', label: 'Project Development' },
  { id: Category.CareerPrep, icon: '🎤', label: 'Career Preparation' }
];

// ======================================================
// COURSES
// ======================================================

export const COURSES: Course[] = [

  // Programming
  { id: 'c', name: 'C', category: Category.Programming, pricing: { tenDays: 9000, oneMonth: 7000, threeMonths: 5000 } },
  { id: 'cpp', name: 'C++', category: Category.Programming, pricing: { tenDays: 10500, oneMonth: 8500, threeMonths: 6500 } },
  { id: 'python', name: 'Python', category: Category.Programming, pricing: { tenDays: 12000, oneMonth: 9500, threeMonths: 7000 } },
  { id: 'java', name: 'Java', category: Category.Programming, pricing: { tenDays: 12500, oneMonth: 10000, threeMonths: 7500 } },
  { id: 'js', name: 'JavaScript', category: Category.Programming, pricing: { tenDays: 11000, oneMonth: 8500, threeMonths: 6500 } },
  { id: 'ts', name: 'TypeScript', category: Category.Programming, pricing: { tenDays: 12000, oneMonth: 9500, threeMonths: 7500 } },
  { id: 'go', name: 'Go', category: Category.Programming, pricing: { tenDays: 13500, oneMonth: 11000, threeMonths: 8500 } },
  { id: 'rust', name: 'Rust', category: Category.Programming, pricing: { tenDays: 15000, oneMonth: 12000, threeMonths: 9000 } },
  { id: 'sql', name: 'SQL', category: Category.Programming, pricing: { tenDays: 8000, oneMonth: 6000, threeMonths: 4500 } },
  { id: 'bash', name: 'Bash', category: Category.Programming, pricing: { tenDays: 7000, oneMonth: 5000, threeMonths: 3500 } },
  { id: 'r', name: 'R', category: Category.Programming, pricing: { tenDays: 11500, oneMonth: 9000, threeMonths: 6500 } },

  // Advanced Tech
  { id: 'ml', name: 'Machine Learning', category: Category.AdvancedTech, pricing: { tenDays: 14000, oneMonth: 11000, threeMonths: 8500 } },
  { id: 'dl', name: 'Deep Learning', category: Category.AdvancedTech, pricing: { tenDays: 15000, oneMonth: 12000, threeMonths: 9000 } },
  { id: 'ai-eng', name: 'AI Engineering', category: Category.AdvancedTech, pricing: { tenDays: 16000, oneMonth: 13000, threeMonths: 10000 } },
  { id: 'cv', name: 'Computer Vision', category: Category.AdvancedTech, pricing: { tenDays: 15000, oneMonth: 12000, threeMonths: 9000 } },
  { id: 'nlp', name: 'NLP', category: Category.AdvancedTech, pricing: { tenDays: 14500, oneMonth: 11500, threeMonths: 8500 } },
  { id: 'cloud', name: 'Cloud Computing', category: Category.AdvancedTech, pricing: { tenDays: 13000, oneMonth: 10000, threeMonths: 7500 } },
  { id: 'devops', name: 'DevOps', category: Category.AdvancedTech, pricing: { tenDays: 13500, oneMonth: 10500, threeMonths: 8000 } },
  { id: 'iot', name: 'IoT', category: Category.AdvancedTech, pricing: { tenDays: 12500, oneMonth: 9500, threeMonths: 7000 } },
  { id: 'cyber', name: 'Cybersecurity', category: Category.AdvancedTech, pricing: { tenDays: 14000, oneMonth: 11000, threeMonths: 8500 } },
  { id: 'blockchain', name: 'Blockchain', category: Category.AdvancedTech, pricing: { tenDays: 15500, oneMonth: 12500, threeMonths: 9500 } },

  // Academic
  { id: 'eng-core', name: 'Engineering Core Subject', category: Category.Academic, pricing: { tenDays: 4000, oneMonth: 6000, threeMonths: 9500 } },
  { id: 'math-stat', name: 'Mathematics & Statistics', category: Category.Academic, pricing: { tenDays: 3500, oneMonth: 5500, threeMonths: 9000 } },
  { id: 'research-meth', name: 'Research Methodology', category: Category.Academic, pricing: { tenDays: 4500, oneMonth: 6500, threeMonths: 10000 } },

  // Projects
  { id: 'mini-project', name: 'Mini Project', category: Category.ProjectDev, pricing: { fixed: 9000 } },
  { id: 'major-project', name: 'Major Project', category: Category.ProjectDev, pricing: { fixed: 13000 } },
  { id: 'industry-project', name: 'Industry Project', category: Category.ProjectDev, pricing: { fixed: 25000 } },

  // Career
  { id: 'resume-mock', name: 'Resume + Mock Interviews', category: Category.CareerPrep, pricing: { fixed: 5000 } },
  { id: 'placement-track', name: 'Complete Placement Track', category: Category.CareerPrep, pricing: { fixed: 13000 } }
];

