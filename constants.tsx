
import { 
  Users, 
  Rocket, 
  Zap, 
  Lightbulb, 
  Search, 
  Settings, 
  CheckCircle, 
  Globe,
  Briefcase
} from 'lucide-react';

export const DOMAINS = [
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

export const HOW_IT_WORKS = [
  { step: 1, title: 'Student chooses problem', Icon: Search },
  { step: 2, title: 'Research & planning', Icon: Settings },
  { step: 3, title: 'Design & build', Icon: Lightbulb },
  { step: 4, title: 'Testing & review', Icon: CheckCircle },
  { step: 5, title: 'Output / Deployment', Icon: Rocket }
];

export const GOV_GRANTS = [
  { name: 'NIDHI-PRAYAS', department: 'DST', status: 'Open' },
  { name: 'Startup India Seed Fund', department: 'DPIIT', status: 'Open' },
  { name: 'BIRAC BIG', department: 'DBT', status: 'Closed' },
  { name: 'MeitY TIDE 2.0', department: 'MeitY', status: 'Open' }
];

export const INDUSTRY_PROJECTS = [
  { title: 'AI-Based Supply Chain Opt.', company: 'LogiTech Solutions', domain: 'Logistics', status: 'Ongoing' },
  { title: 'IoT Smart Meter Prototype', company: 'EnergyGrid', domain: 'Energy', status: 'Completed' },
  { title: 'FinTech Fraud Detection', company: 'NeoBank', domain: 'Finance', status: 'Ongoing' }
];

export const POWER_PROGRAMS = [
  { name: 'Programming Foundations', duration: '4 Weeks', mode: 'Online' },
  { name: 'AI / ML Mastery', duration: '8 Weeks', mode: 'Offline/Hybrid' },
  { name: 'Research Methodology', duration: '6 Weeks', mode: 'Online' },
  { name: 'System Design 101', duration: '5 Weeks', mode: 'Online' }
];
