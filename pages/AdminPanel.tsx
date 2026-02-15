
import React, { useState } from 'react';
import { 
  Bell,
  Menu
} from 'lucide-react';
import Sidebar from '../components/AdminSidebar';
import UsersAndRoles from '../components/UsersAndRoles';
import Onboarding from '../components/Onboarding';
import LearningSystem from '../components/LearningSystem';
import GovResearch from '../components/GovResearch';
import IndustryResearch from '../components/IndustryResearch';
import Challenges from '../components/Challenges';
import Mentors from '../components/Mentors';
import Startups from '../components/Startups';
import Events from '../components/Events';
import Impact from '../components/Impact';
import Settings from '../components/Settings';
import NotificationPanel from '../components/NotificationPanel';
import DashboardTerminal from '../components/DashboardTerminal';
import { Student, GovEntity, IndustryEntity, Challenge, ChallengeSubmission, Mentor, Startup, NXEvent, OrgSettings, Notification } from '../Admintypes';

const initialNotifications: Notification[] = [
  { id: '1', type: 'SYSTEM', title: 'Registry Sync', message: 'Core terminal registry synchronized with cloud nodes.', time: '2m ago', read: false },
  { id: '2', type: 'SUCCESS', title: 'Asset Verified', message: 'New Gov Researcher access granted for Dr. Aris Thorne.', time: '14m ago', read: false },
  { id: '3', type: 'ALERT', title: 'Login Attempt', message: 'Unauthorized entry attempt blocked from internal IP.', time: '1h ago', read: true },
];

// Fix: Explicitly type initialActivity to match DashboardTerminal's status union type
const initialActivity: { id: string; type: string; title: string; time: string; status: 'Success' | 'Warning' | 'Info' }[] = [
  { id: 'act-1', type: 'STUDENT REGISTRY', title: 'New Onboarding: STU-9942', time: '4m ago', status: 'Info' },
  { id: 'act-2', type: 'SECURITY PROTOCOL', title: 'Handshake Success: NODE-04', time: '12m ago', status: 'Success' },
  { id: 'act-3', type: 'GOV RESEARCH', title: 'Project Update: Chronos Alpha', time: '1h ago', status: 'Info' },
  { id: 'act-4', type: 'VENTURE ALERT', title: 'Health Drop: Nexus Biolabs', time: '2h ago', status: 'Warning' },
  { id: 'act-5', type: 'SYSTEM CORE', title: 'Daily Backup Completed', time: '4h ago', status: 'Success' },
];

const initialVentureProjects = [
  { name: 'NEXUS BIOLABS', health: 68, team: 'Dr. Seth', type: 'BIO-GENETICS' },
  { name: 'CHRONOS ALPHA', health: 92, team: 'A. Thorne', type: 'QUANTUM' },
  { name: 'URBAN WASTE AI', health: 45, team: 'S. Chen', type: 'GOV-TECH' },
  { name: 'NEURAL LINK', health: 81, team: 'M. Wright', type: 'CYBERNETICS' },
];

const initialStudents: Student[] = [
  {
    id: 'STU-9921',
    name: 'Aaryan Kapoor',
    email: 'aaryan.k@nx-edu.com',
    loginTime: 'Today, 09:15 AM',
    totalSpent: '$1,450',
    avatar: 'AK',
    courses: [
      {
        id: 'C1',
        name: 'Advanced Quantum Computing',
        mentor: 'Dr. Aris Thorne',
        startDate: 'Aug 15, 2023',
        endDate: 'Nov 20, 2023',
        schedule: 'Mon, Wed 10:00 - 12:00',
        price: '$500',
        status: 'Completed',
        progress: 100
      }
    ]
  }
];

const initialGovEntities: GovEntity[] = [
  {
    id: 'GOV-2210',
    type: 'RESEARCHER',
    name: 'Dr. Aris Thorne',
    email: 'thorne.a@nx-labs.io',
    status: 'Security Cleared',
    department: 'NX-QUANTUM',
    joinDate: 'Jan 2023',
    avatar: 'AT',
    submissionData: {
      researchFocus: 'Topological Qubits & Error Correction',
      clearanceLevel: 'Level 6 (Strategic)',
      labAccess: 'Core Omega 4'
    },
    assignedProjects: ['Project Chronos', 'Neural Link Alpha']
  }
];

const initialIndustryEntities: IndustryEntity[] = [
  {
    id: 'IND-8842',
    type: 'PARTNER',
    name: 'Sarah Chen',
    email: 'chen.s@nx-systems.io',
    company: 'Quantum Matrix Corp',
    status: 'Contracted',
    contractValue: '₹2.4 Cr',
    joinedDate: 'Feb 2024',
    avatar: 'SC',
    intelData: {
      primaryStack: 'Q# / Python',
      partnershipTier: 'Platinum',
      ipPortfolio: '12 Patents pending'
    }
  }
];

const initialMentors: Mentor[] = [
  {
    id: 'M-1',
    name: 'Dr. Aris Thorne',
    email: 'thorne.a@nx-research.gov',
    avatar: 'AT',
    specialty: 'Quantum Computing',
    status: 'Active',
    assignedStudentIds: ['STU-9921'],
    bio: 'Lead researcher at NX Labs specializing in topological qubits.',
    rating: 4.9
  }
];

const initialChallenges: Challenge[] = [
  {
    id: 'CH-1',
    title: 'URBAN WASTE AI',
    status: 'APPROVED',
    endsDate: '25 MAR',
    prize: '₹50,000',
    theme: 'GOV',
    description: 'Optimize waste management routes using real-time sensor data.'
  }
];

const initialStartups: Startup[] = [
  {
    id: 'S-1',
    name: 'NEXUS BIOLABS',
    industry: 'BIO-GENETICS',
    founder: 'Dr. Vikram Seth',
    teamLeads: ['Aaryan Kapoor', 'Sarah Chen'],
    status: 'Working',
    launchDate: 'MAY 2024',
    description: 'Developing low-cost synthetic proteins for rapid tissue regeneration.',
    funding: '₹2.5Cr',
    avatar: 'NB',
    progress: 68
  }
];

const initialEvents: NXEvent[] = [
  {
    id: 'EV-401',
    name: 'AI ETHICS SUMMIT',
    date: '22 APR 2024',
    time: '09:00 AM',
    day: 'Monday',
    venue: 'MAIN AUDITORIUM, NX LABS',
    term: 'FULL-DAY INTENSIVE',
    swag: 'PREMIUM HOODIES, TECH PACKS',
    connectionsMade: 450,
    attendees: 320,
    status: 'Upcoming',
    avatar: 'AE'
  }
];

const defaultSettings: OrgSettings = {
  orgName: 'NX ORGANIZATION',
  orgSlogan: 'Accelerating the convergence of quantum intelligence and human synthetic biology.',
  adminEmail: 'admin.alpha@nx-labs.io',
  maintenanceMode: false,
  twoFactorAuth: true,
  notificationPreferences: {
    systemAlerts: true,
    studentActivity: false,
    eventRegistrations: true
  },
  syncFrequency: 'Real-time'
};

const AdminPanel: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const [students, setStudents] = useState(initialStudents);
  const [mentors, setMentors] = useState(initialMentors);
  const [challenges, setChallenges] = useState(initialChallenges);
  const [startups, setStartups] = useState(initialStartups);
  const [events, setEvents] = useState(initialEvents);
  const [submissions, setSubmissions] = useState([]);
  const [govEntities, setGovEntities] = useState(initialGovEntities);
  const [industryEntities, setIndustryEntities] = useState(initialIndustryEntities);
  const [settings, setSettings] = useState(defaultSettings);
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleAddEvent = (event) => setEvents([...events, event]);
  const handleUpdateEvent = (updated) => setEvents(events.map(e => e.id === updated.id ? updated : e));
  const handleDeleteEvent = (id) => setEvents(events.filter(e => e.id !== id));

  const stats = [
    { label: 'ACTIVE STUDENTS', value: students.length, color: 'text-[#1E1E1E]', trend: '+12%' },
    { label: 'PORTFOLIO STARTUPS', value: startups.length, color: 'text-[#FB8500]', trend: '+4' },
    { label: 'SCHEDULED EVENTS', value: events.length, color: 'text-[#06A77D]', trend: 'Active' },
    { label: 'OPEN CHALLENGES', value: challenges.length, color: 'text-[#0A2463]', trend: 'Approved' },
  ];

  const getPageTitle = () => {
    if (activeTab === 'dashboard') return 'MASTER TERMINAL';
    if (activeTab === 'gov') return 'GOV RESEARCH';
    if (activeTab === 'industry') return 'INDUSTRY HUB';
    return activeTab.replace(/_/g, ' ').toUpperCase();
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1E1E1E] font-['Inter']">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0A2463]/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        isOpen={isSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={(id) => {
          setActiveTab(id);
          setIsSidebarOpen(false);
        }} 
      />

      <NotificationPanel 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onMarkRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
        onClearAll={() => setNotifications([])}
      />

      <main className="flex-1 p-6 md:p-12 lg:p-14 relative overflow-x-hidden">
        <header className="flex justify-between items-start mb-10">
          <div className="flex flex-col">
            <button 
              className="md:hidden mb-4 p-2 bg-white rounded-lg w-fit shadow-sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} className="text-[#0A2463]" />
            </button>
            <h1 className="text-6xl md:text-7xl font-[900] tracking-[-0.04em] text-[#0A2463] leading-none mb-3 uppercase">
              {getPageTitle()}
            </h1>
            <p className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase">
              {settings.orgSlogan.substring(0, 60)}...
            </p>
          </div>
          
          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={() => setIsNotifOpen(true)}
              className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white border border-gray-100 rounded-[28px] relative transition-all hover:scale-105 shadow-sm group active:scale-95"
            >
              <Bell className="text-[#0A2463] group-hover:rotate-12 transition-transform" size={26} fill="currentColor" fillOpacity={0.1} />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-4 right-4 w-5 h-5 bg-[#FB8500] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-sm">
                  {unreadNotifsCount}
                </span>
              )}
            </button>
          </div>
        </header>

        <div className="max-w-[1400px]">
          {activeTab === 'dashboard' ? (
            <DashboardTerminal 
              stats={stats} 
              recentActivity={initialActivity} 
              activeProjects={initialVentureProjects}
            />
          ) : (
            <>
              {activeTab === 'users' && <UsersAndRoles />}
              {activeTab === 'onboarding' && <Onboarding />}
              {activeTab === 'learning' && (
                <LearningSystem 
                  students={students} 
                  onUpdateStudent={(s) => setStudents(prev => prev.map(curr => curr.id === s.id ? s : curr))} 
                  onAddStudent={(s) => setStudents(prev => [s, ...prev])}
                  onDeleteStudent={(id) => setStudents(prev => prev.filter(s => s.id !== id))}
                />
              )}
              {activeTab === 'mentors' && <Mentors mentors={mentors} allStudents={students} onUpdateMentor={(m) => setMentors(prev => prev.map(curr => curr.id === m.id ? m : curr))} />}
              {activeTab === 'startups' && <Startups startups={startups} onAddStartup={(s) => setStartups([...startups, s])} onUpdateStartup={(s) => setStartups(startups.map(curr => curr.id === s.id ? s : curr))} onDeleteStartup={(id) => setStartups(startups.filter(s => s.id !== id))} />}
              {activeTab === 'events' && <Events events={events} onAddEvent={handleAddEvent} onUpdateEvent={handleUpdateEvent} onDeleteEvent={handleDeleteEvent} />}
              {activeTab === 'impact' && <Impact />}
              {activeTab === 'settings' && <Settings settings={settings} onUpdate={setSettings} />}
              {activeTab === 'challenges' && (
                <Challenges 
                  challenges={challenges} 
                  submissions={submissions}
                  onAddChallenge={(c) => setChallenges([...challenges, c])}
                  onUpdateChallenge={(c) => setChallenges(challenges.map(curr => curr.id === c.id ? c : curr))}
                  onDeleteChallenge={(id) => setChallenges(challenges.filter(c => c.id !== id))}
                  onUpdateSubmission={(sub) => setSubmissions(prev => prev.map(curr => curr.id === sub.id ? sub : curr))}
                  onDeleteSubmission={(id) => setSubmissions(prev => prev.filter(s => s.id !== id))}
                />
              )}
              {activeTab === 'gov' && (
                <GovResearch 
                  entities={govEntities} 
                  onUpdateEntity={(e) => setGovEntities(prev => prev.map(curr => curr.id === e.id ? e : curr))} 
                  onAddEntity={(e) => setGovEntities(prev => [e, ...prev])}
                  onDeleteEntity={(id) => setGovEntities(prev => prev.filter(e => e.id !== id))}
                />
              )}
              {activeTab === 'industry' && (
                <IndustryResearch 
                  entities={industryEntities} 
                  onUpdate={(e) => setIndustryEntities(prev => prev.map(curr => curr.id === e.id ? e : curr))}
                  onAdd={(e) => setIndustryEntities(prev => [e, ...prev])}
                  onDelete={(id) => setIndustryEntities(prev => prev.filter(e => e.id !== id))}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
export default AdminPanel;