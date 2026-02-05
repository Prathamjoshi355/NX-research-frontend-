
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/CompanySidebar';
import RoadmapView from '../components/RoadmapView';
import FoundersView from '../components/FoundersView';
import OverviewView from '../components/OverviewView';
import SubmitProblemView from '../components/SubmitProblemView';
import ActiveProblemsView from '../components/ActiveProblemsView';
import DeliverablesView from '../components/DeliverablesView';
import CompanyProfileView from '../components/CompanyProfileView';
import ChatView from '../components/ChatView';
import { SidebarTab, Conversation, Founder, RequestItem } from '../Companytypes';

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'g1',
    name: 'Project Alpha Team',
    type: 'group',
    lastMessage: 'Ananya: New edge node firmware is ready.',
    time: '11:20 AM',
    avatar: 'https://images.unsplash.com/photo-1522071823991-b9671f903f60?auto=format&fit=crop&q=80&w=100&h=100',
    unread: 5,
    members: 12,
    messages: [
      { id: 'gm1', sender: 'other', text: 'Let’s finalize the site survey report.', time: 'Yesterday' },
      { id: 'gm2', sender: 'other', text: 'Ananya: New edge node firmware is ready.', time: '11:20 AM' },
    ]
  },
  {
    id: 'c1',
    name: 'Vikram Singh',
    type: 'chat',
    lastMessage: 'Let me know when the audit is done.',
    time: '9:45 AM',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100',
    unread: 0,
    online: true,
    messages: [{ id: 'm1', sender: 'other', text: 'Let me know when the audit is done.', time: '9:45 AM' }]
  },
  {
    id: 'c2',
    name: 'Ananya Sharma',
    type: 'chat',
    lastMessage: 'The prototypes look good.',
    time: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100',
    unread: 0,
    online: false,
    messages: [{ id: 'm2', sender: 'other', text: 'The prototypes look good.', time: 'Yesterday' }]
  }
];

const MOCK_REQUESTS: RequestItem[] = [
  {
    id: 'req1',
    senderName: 'Vikram Singh',
    senderRole: 'CEO',
    senderImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100',
    type: 'INVITE',
    groupName: 'Board of Directors Sync',
    time: '2 hours ago',
    status: 'PENDING'
  }
];

const CompanyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>(SidebarTab.OVERVIEW);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [requests, setRequests] = useState<RequestItem[]>(MOCK_REQUESTS);
  const [toast, setToast] = useState<{message: string, icon: string} | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (activeTab === SidebarTab.OUR_FOUNDERS) {
      const timer = setTimeout(() => {
        if (requests.filter(r => r.status === 'PENDING').length === 1) {
          setToast({ message: "New Invitation from Vikram Singh", icon: "fa-bell" });
          setTimeout(() => setToast(null), 5000);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const addFounderToChat = (founder: Founder) => {
    if (conversations.find(c => c.id === founder.id)) return;
    const newConv: Conversation = {
      id: founder.id,
      name: founder.name,
      type: 'chat',
      lastMessage: 'Connection request accepted',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: founder.image,
      unread: 0,
      online: true,
      messages: [{ id: `m-${Date.now()}`, sender: 'other', text: `Hello! This is ${founder.name}. Thanks for reaching out.`, time: 'Just now' }]
    };
    setConversations(prev => [newConv, ...prev]);
  };

  const handleAcceptRequest = (request: RequestItem) => {
    if (request.type === 'INVITE') {
      const newGroup: Conversation = {
        id: `g-acc-${Date.now()}`,
        name: request.groupName || 'New Team',
        type: 'group',
        lastMessage: 'You joined the team',
        time: 'Just now',
        avatar: request.senderImage,
        unread: 0,
        members: 5,
        messages: [{ id: `m-${Date.now()}`, sender: 'other', text: `Welcome to the group!`, time: 'Just now' }]
      };
      setConversations(prev => [newGroup, ...prev]);
    } else {
      addFounderToChat({
        id: `f-${Date.now()}`,
        name: request.senderName,
        role: request.senderRole,
        bio: '',
        email: '',
        image: request.senderImage
      });
    }
  };

  const handleTabChange = (tab: SidebarTab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case SidebarTab.OVERVIEW: return <OverviewView setActiveTab={handleTabChange} />;
      case SidebarTab.SUBMIT_PROBLEM: return <SubmitProblemView />;
      case SidebarTab.ACTIVE_PROBLEMS: return <ActiveProblemsView setActiveTab={handleTabChange} />;
      case SidebarTab.ACTIVE_PROJECTS: return <RoadmapView />;
      case SidebarTab.DELIVERABLES: return <DeliverablesView />;
      case SidebarTab.COMPANY_PROFILE: return <CompanyProfileView />;
      case SidebarTab.OUR_FOUNDERS: return <FoundersView onAddSuccess={addFounderToChat} />;
      case SidebarTab.CHAT_AND_GROUP: return (
        <ChatView 
          conversations={conversations} 
          setConversations={setConversations} 
          requests={requests}
          setRequests={setRequests}
          onAcceptRequest={handleAcceptRequest}
        />
      );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden relative">
      {/* Mobile Header - Visible only on small screens */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-[60] backdrop-blur-md bg-white/80">
        <h1 className="text-xl font-black tracking-tighter text-[#121212]">NX INDUSTRY</h1>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:text-orange-500 transition-colors"
        >
          <i className="fa-solid fa-bars-staggered"></i>
        </button>
      </div>

      {/* Sidebar - Handles its own responsiveness */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#f7f8f9] pt-16 md:pt-0">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-1/2 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none"></div>
        <div className="relative z-10 h-full">{renderContent()}</div>
        
        {toast && (
          <div 
            onClick={() => handleTabChange(SidebarTab.CHAT_AND_GROUP)} 
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] bg-[#121212] text-white p-5 lg:p-6 rounded-3xl lg:rounded-[2rem] shadow-2xl flex items-center gap-4 lg:gap-6 cursor-pointer border border-white/5 animate-in slide-in-from-right-full duration-500 hover:scale-105 transition-all"
          >
             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-lg lg:text-xl shrink-0"><i className={`fa-solid ${toast.icon}`}></i></div>
             <div>
                <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-orange-500 mb-0.5 lg:mb-1">Incoming Request</p>
                <p className="font-bold text-xs lg:text-sm uppercase tracking-tight">{toast.message}</p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanyDashboard;
