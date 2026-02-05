
import React, { useState, useRef, useEffect } from 'react';
import { Activity, Student } from '../types';
import MentorChat from './MentorChat';

const activities: Activity[] = [
  {
    id: '1',
    type: 'assignment',
    title: 'ASSIGNMENT SUBMITTED',
    subtitle: 'URBAN WASTE AI CHALLENGE',
    timestamp: '2H AGO',
  },
  {
    id: '2',
    type: 'mentorship',
    title: 'MENTORSHIP COMPLETED',
    subtitle: '1:1 SESSION WITH SARAH JENKINS',
    timestamp: '5H AGO',
  },
];

interface DashboardProps {
  onMenuClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onMenuClick }) => {
  const [student] = useState<Student>({
    name: 'AAKASH',
    track: 'AI/ML',
    activeProjects: 3,
    nextSession: 'Today, 4:00 PM',
  });

  const [isChatVisible, setIsChatVisible] = useState(false);
  
  // Dragging & Resizing state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 380, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const startRef = useRef({ mouseX: 0, mouseY: 0, initialX: 0, initialY: 0, initialW: 0, initialH: 0 });

  // Adjust size for mobile on mount or when chat opens
  useEffect(() => {
    if (isChatVisible && window.innerWidth < 640) {
      setSize({ 
        width: Math.min(window.innerWidth - 48, 380), 
        height: Math.min(window.innerHeight * 0.6, 500) 
      });
      // Center horizontally on mobile initially
      setPosition({ x: 0, y: 0 });
    }
  }, [isChatVisible]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('input') || target.closest('button') || target.closest('.resize-handle')) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setIsDragging(true);
    startRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      initialX: position.x,
      initialY: position.y,
      initialW: size.width,
      initialH: size.height
    };
  };

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setIsResizing(true);
    startRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      initialX: position.x,
      initialY: position.y,
      initialW: size.width,
      initialH: size.height
    };
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const dx = clientX - startRef.current.mouseX;
        const dy = clientY - startRef.current.mouseY;
        
        // Clamping to keep it within view bounds roughly
        const newX = startRef.current.initialX + dx;
        const newY = startRef.current.initialY + dy;
        
        setPosition({ x: newX, y: newY });
      }

      if (isResizing) {
        const dx = clientX - startRef.current.mouseX;
        const dy = clientY - startRef.current.mouseY;
        setSize({
          width: Math.max(280, startRef.current.initialW + dx),
          height: Math.max(350, startRef.current.initialH + dy)
        });
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, isResizing]);

  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 sm:p-8 md:p-10 custom-scrollbar relative">
      {/* Resizable & Moveable Floating Chat Overlay */}
      {isChatVisible && (
        <div 
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            width: `${size.width}px`,
            height: `${size.height}px`,
            cursor: isDragging ? 'grabbing' : 'auto'
          }}
          className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300 touch-none select-none max-w-[95vw]"
        >
          <div className={`relative h-full flex flex-col ${isDragging ? 'shadow-2xl scale-[1.01]' : 'shadow-2xl border border-slate-100'} bg-[#eef1f4] rounded-[2rem] transition-all duration-200`}>
            {/* Close Button - Larger for touch */}
            <button 
              onClick={() => setIsChatVisible(false)}
              onMouseDown={(e) => e.stopPropagation()} 
              onTouchStart={(e) => e.stopPropagation()}
              className="absolute -top-4 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-8 sm:h-8 bg-[#0a1532] text-white rounded-full flex items-center justify-center shadow-xl z-[110] border-2 border-white hover:scale-110 transition-transform cursor-pointer"
            >
              <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Actual Chat Component Container */}
            <div 
              onMouseDown={(e) => e.stopPropagation()} 
              onTouchStart={(e) => e.stopPropagation()}
              className="h-full flex flex-col min-h-0 pointer-events-auto"
            >
              <MentorChat />
            </div>

            {/* Resize Handle - Bottom Right - Larger for touch */}
            <div 
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
              className="resize-handle absolute bottom-0 right-0 w-10 h-10 cursor-nwse-resize flex items-end justify-end p-2 z-[110] pointer-events-auto"
            >
              <svg className="w-4 h-4 text-slate-400 rotate-90 opacity-60 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
            </div>

            {/* Moveable Handle Area (Top Banner) */}
            <div className="absolute top-0 left-0 right-0 h-16 cursor-grab active:cursor-grabbing z-[90]"></div>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2.5 bg-slate-50 rounded-xl text-[#0a1532] border border-slate-100 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0a1532] font-outfit uppercase tracking-tight">Student Portal</h2>
            <p className="text-slate-400 font-bold text-[10px] md:text-[11px] tracking-[0.15em] uppercase mt-1">
              WELCOME BACK, {student.name} • TRACK: {student.track}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsChatVisible(!isChatVisible)}
            className={`flex items-center justify-center transition-all font-outfit group ${
              isChatVisible 
                ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-inner' 
                : 'bg-[#0a1532] border-transparent text-white hover:bg-blue-900 shadow-lg shadow-blue-900/10 hover:-translate-y-0.5'
            } rounded-2xl border ${
              'w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <svg className="hidden md:block w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <svg className="md:hidden w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 5v.01M12 12v.01M12 19v.01" />
              </svg>
              <span className={`absolute ${isChatVisible ? 'bg-blue-400' : 'bg-green-400'} rounded-full border-2 border-[#0a1532] animate-pulse
                -top-1 -right-1 w-2 h-2 md:-top-1 md:-right-4`}
              ></span>
            </div>
            <span className="hidden md:block text-[11px] font-black tracking-widest uppercase">Mentor Chat</span>
          </button>

          <button className="flex p-3 bg-[#f8fafc] rounded-xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:bg-white transition-all w-12 h-12 items-center justify-center md:w-auto md:h-auto">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <button className="p-1 bg-[#f8fafc] rounded-xl border border-slate-100 hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#eef1f4] rounded-[2rem] p-6 md:p-8 flex flex-col min-h-[340px] shadow-sm">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">ACTIVE PROJECTS</h3>
          <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-8 flex-1 flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] group cursor-pointer hover:shadow-xl transition-all">
             <p className="text-7xl md:text-9xl font-black text-[#0a1532] font-outfit tracking-tighter group-hover:scale-110 transition-transform">
              {student.activeProjects.toString().padStart(2, '0')}
            </p>
            <p className="mt-6 text-[11px] font-black text-green-500 tracking-widest uppercase">+1 NEW THIS WEEK</p>
          </div>
        </div>

        <div className="bg-[#eef1f4] rounded-[2rem] p-6 md:p-8 flex flex-col min-h-[340px] shadow-sm">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">NEXT SESSION</h3>
          <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-8 flex-1 flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center">
            <div className="mb-8">
              <p className="text-slate-400 font-bold text-[10px] tracking-widest uppercase mb-2">SCHEDULED FOR</p>
              <p className="text-3xl md:text-4xl font-black text-[#0a1532] font-outfit leading-tight">
                {student.nextSession.split(',').map((part, i) => (
                  <span key={i} className="block">{part.trim()}</span>
                ))}
              </p>
            </div>
            <button className="w-full max-w-xs py-5 bg-[#0a1532] text-white rounded-2xl text-[11px] font-black tracking-[0.2em] hover:bg-blue-900 transition-all uppercase shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 active:scale-95">
              JOIN SESSION NOW
            </button>
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RECENT ACTIVITY</h3>
          <button className="text-[11px] font-black text-[#3b82f6] hover:text-blue-700 tracking-[0.15em] uppercase transition-colors">VIEW ALL UPDATES</button>
        </div>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-[#f9fafb] rounded-[1.5rem] md:rounded-[2rem] p-6 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-50 group-hover:bg-slate-50 transition-colors">
                  <svg className="w-6 h-6 text-[#0a1532]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-[#0a1532] tracking-wide text-base">{activity.title}</h4>
                  <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1">{activity.subtitle}</p>
                </div>
              </div>
              <div className="text-[11px] font-bold text-slate-300 tracking-widest uppercase hidden sm:block">
                {activity.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
