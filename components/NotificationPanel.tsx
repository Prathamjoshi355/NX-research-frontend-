
import React from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ShieldAlert, 
  Trash2,
  BellRing,
  Check
} from 'lucide-react';
import { Notification } from '../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  isOpen, 
  onClose, 
  notifications, 
  onMarkRead, 
  onClearAll 
}) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle2 className="text-[#06A77D]" size={20} />;
      case 'ALERT': return <AlertTriangle className="text-[#FB8500]" size={20} />;
      case 'SYSTEM': return <ShieldAlert className="text-[#0A2463]" size={20} />;
      default: return <Info className="text-blue-400" size={20} />;
    }
  };

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'SUCCESS': return 'bg-[#06A77D]/5';
      case 'ALERT': return 'bg-[#FB8500]/5';
      case 'SYSTEM': return 'bg-[#0A2463]/5';
      default: return 'bg-blue-50/50';
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#0A2463]/40 backdrop-blur-md z-[100] transition-all animate-in fade-in"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <aside 
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-white z-[110] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="p-8 md:p-10 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0A2463] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <BellRing size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tighter">Signal Hub</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Real-time terminal updates</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto sidebar-scroll p-8 md:p-10 space-y-6">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`relative group p-6 rounded-[32px] border border-gray-50 transition-all hover:shadow-lg hover:shadow-[#0A2463]/5 ${getBgColor(notif.type)} ${
                  !notif.read ? 'ring-2 ring-[#FB8500]/10' : ''
                }`}
              >
                <div className="flex gap-5">
                  <div className="shrink-0 mt-1">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[11px] font-black text-[#0A2463] uppercase tracking-widest truncate pr-6">{notif.title}</h4>
                      <span className="text-[9px] font-bold text-gray-300 uppercase shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-xs font-bold text-gray-500 leading-relaxed">
                      {notif.message}
                    </p>
                    
                    {!notif.read && (
                      <button 
                        onClick={() => onMarkRead(notif.id)}
                        className="mt-4 flex items-center gap-2 text-[9px] font-black text-[#FB8500] uppercase tracking-widest hover:underline"
                      >
                        <Check size={12} strokeWidth={4} /> Mark as Processed
                      </button>
                    )}
                  </div>
                </div>
                {!notif.read && (
                  <div className="absolute top-6 right-6 w-2 h-2 bg-[#FB8500] rounded-full" />
                )}
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center mb-8">
                <Bell className="text-gray-200" size={40} />
              </div>
              <h4 className="text-lg font-black text-[#0A2463] uppercase tracking-tight mb-2">Silent Terminal</h4>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest max-w-[200px] leading-loose">
                No active signals detected in the current transmission pool.
              </p>
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-8 md:p-10 border-t border-gray-100 bg-gray-50/50 shrink-0">
            <button 
              onClick={onClearAll}
              className="w-full py-5 bg-white border border-red-50 text-red-500 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-sm hover:bg-red-500 hover:text-white transition-all active:scale-95"
            >
              <Trash2 size={16} /> Purge Hub Registry
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default NotificationPanel;
