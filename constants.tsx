
import { 
  Users, 
  Rocket, 
  Zap, 
  Lightbulb, 
  Search, 
  Settings, 
  CheckCircle, 
  Globe,
  Briefcase,
  BookOpen,
  Target,
  Trophy,
  History,
  Shield,
  Microscope,
  FileText
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

export const LEARNING_TRACKS = [
  { id: 'research-101', name: 'Research Methodology', modules: 12, credits: 50 },
  { id: 'ai-ml', name: 'AI/ML Engineering', modules: 24, credits: 120 },
  { id: 'product-dev', name: 'Product Architecture', modules: 15, credits: 80 },
  { id: 'gov-tech', name: 'Public Sector Innovation', modules: 10, credits: 60 }
];

export const IMPACT_METRICS = [
  { label: 'Research Reports', value: '150+', Icon: FileText },
  { label: 'Live Prototypes', value: '45', Icon: Rocket },
  { label: 'Mentors Onboard', value: '80+', Icon: Users },
  { label: 'Student Growth', value: '98%', Icon: Trophy }
];

export const CHALLENGES = [
  { id: 'c1', title: 'Urban Waste AI', type: 'Government', prize: '₹50,000', deadline: '25 Mar' },
  { id: 'c2', title: 'Agri-Supply Chain', type: 'Industry', prize: 'Internship', deadline: '05 Apr' },
  { id: 'c3', title: 'FinTech Security', type: 'Private', prize: '₹30,000', deadline: '10 Apr' }
];

// Added missing constants to resolve export errors in pages
export const HOW_IT_WORKS = [
  { step: 1, title: 'Identification', description: 'Find a real-world problem.' },
  { step: 2, title: 'Proposal', description: 'Submit a research proposal.' },
  { step: 3, title: 'Development', description: 'Build and test your solution.' },
  { step: 4, title: 'Presentation', description: 'Showcase your outcomes.' }
];

export const GOV_GRANTS = [
  { name: 'Smart City Innovation Fund', department: 'Urban Dev', status: 'Approved' },
  { name: 'Rural Agri-Tech Support', department: 'Agriculture', status: 'Pending' },
  { name: 'Clean Energy Initiative', department: 'Environment', status: 'Rejected' }
];

export const INDUSTRY_PROJECTS = [
  { title: 'AI Logistics Optimizer', company: 'SwiftLog', domain: 'Logistics', status: 'Ongoing' },
  { title: 'Secure FinTech Gateway', company: 'BankSecure', domain: 'Finance', status: 'Completed' }
];

export const POWER_PROGRAMS = [
  { name: 'Mastering React & TS', duration: '8 Weeks', mode: 'Online' },
  { name: 'Applied AI & ML', duration: '12 Weeks', mode: 'Hybrid' },
  { name: 'Research Methodology', duration: '4 Weeks', mode: 'Self-paced' }
];
