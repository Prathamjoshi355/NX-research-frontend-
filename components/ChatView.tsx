
import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message, Attachment, RequestItem } from '../Companytypes';

interface ChatViewProps {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  requests: RequestItem[];
  setRequests: React.Dispatch<React.SetStateAction<RequestItem[]>>;
  onAcceptRequest: (request: RequestItem) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ conversations, setConversations, requests, setRequests, onAcceptRequest }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [filter, setFilter] = useState<'all' | 'chat' | 'group'>('all');
  const [search, setSearch] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  // Modals & Menus State
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showRequestDropdown, setShowRequestDropdown] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showEditConvModal, setShowEditConvModal] = useState(false);

  // New Group State
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  
  // Edit Conversation State
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  // Settings State
  const [settings, setSettings] = useState({
    onlineStatus: true,
    readReceipts: true,
    notifications: true,
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editConvFileInputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<HTMLDivElement>(null);
  const chatMenuRef = useRef<HTMLDivElement>(null);

  const contacts = conversations.filter(c => c.type === 'chat');
  const pendingRequests = requests.filter(r => r.status === 'PENDING');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (requestRef.current && !requestRef.current.contains(event.target as Node)) {
        setShowRequestDropdown(false);
      }
      if (chatMenuRef.current && !chatMenuRef.current.contains(event.target as Node)) {
        setShowChatMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeConversation = conversations.find(c => c.id === activeId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSendMessage = (text?: string, attachment?: Attachment) => {
    if (!activeId) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      attachment: attachment
    };
    setConversations(prev => prev.map(c => 
      c.id === activeId ? { ...c, messages: [...c.messages, newMessage], lastMessage: attachment ? `Sent a ${attachment.type}` : (text || ''), time: newMessage.time, unread: 0 } : c
    ));
    setMessageText('');
  };

  const handleAction = (id: string, action: 'ACCEPTED' | 'DECLINED') => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: action } : req));
    if (action === 'ACCEPTED') {
      const acceptedReq = requests.find(r => r.id === id);
      if (acceptedReq) onAcceptRequest(acceptedReq);
    }
  };

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => prev.includes(contactId) ? prev.filter(id => id !== contactId) : [...prev, contactId]);
  };

  const handleClearHistory = (id: string | null = activeId) => {
    if (!id) return;
    if (confirm("Are you sure you want to clear chat history?")) {
      setConversations(prev => prev.map(c => 
        c.id === id ? { ...c, messages: [], lastMessage: 'Chat history cleared' } : c
      ));
      setShowChatMenu(false);
      setShowSettingsModal(false);
    }
  };

  const handleDeleteChat = () => {
    if (!activeId) return;
    if (confirm("Are you sure you want to delete this conversation? This cannot be undone.")) {
      setConversations(prev => prev.filter(c => c.id !== activeId));
      setActiveId(null);
      setShowChatMenu(false);
    }
  };

  const handleEditConvSave = () => {
    if (!activeId) return;
    setConversations(prev => prev.map(c => 
      c.id === activeId ? { ...c, name: editName, avatar: editAvatar } : c
    ));
    setShowEditConvModal(false);
  };

  const openEditModal = () => {
    if (!activeConversation) return;
    setEditName(activeConversation.name);
    setEditAvatar(activeConversation.avatar);
    setShowEditConvModal(true);
    setShowChatMenu(false);
  };

  const filteredConversations = conversations.filter(c => {
    const matchesFilter = filter === 'all' || c.type === filter;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const showList = !isMobile || (isMobile && !activeId);
  const showChat = !isMobile || (isMobile && activeId);

  return (
    <div className="h-full flex bg-white overflow-hidden animate-in fade-in duration-500">
      <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          handleSendMessage(undefined, { type: file.type.startsWith('image/') ? 'image' : 'file', url: event.target?.result as string, name: file.name, size: (file.size / 1024).toFixed(1) + ' KB' });
        };
        reader.readAsDataURL(file);
      }} />

      {/* LEFT PANE */}
      <div className={`${showList ? 'flex' : 'hidden'} w-full lg:w-[450px] bg-white border-r border-slate-100 flex-col h-full z-20`}>
        <div className="px-8 pt-8 pb-6 bg-white shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-[#121212] tracking-tight uppercase">Messenger</h2>
            <div className="flex gap-2">
               <div className="relative" ref={requestRef}>
                 <button 
                  onClick={() => setShowRequestDropdown(!showRequestDropdown)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${showRequestDropdown ? 'bg-orange-50 text-orange-500' : 'hover:bg-slate-50 text-slate-400'}`}
                 >
                   <i className="fa-solid fa-bell"></i>
                   {pendingRequests.length > 0 && (
                     <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
                   )}
                 </button>

                 {showRequestDropdown && (
                   <div className="absolute top-12 right-0 w-80 bg-white shadow-2xl rounded-2xl border border-slate-100 z-[100] animate-in zoom-in-95 duration-200 overflow-hidden">
                      <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Notifications</span>
                         <span className="text-[9px] font-bold text-orange-500">{pendingRequests.length} Pending</span>
                      </div>
                      <div className="max-h-96 overflow-y-auto custom-scrollbar">
                         {pendingRequests.length > 0 ? pendingRequests.map(req => (
                           <div key={req.id} className="p-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                              <div className="flex gap-3 mb-3">
                                 <img src={req.senderImage} className="w-10 h-10 rounded-xl object-cover" alt="" />
                                 <div className="flex-1 min-w-0">
                                    <p className="text-xs font-black text-slate-800 leading-tight">
                                       {req.type === 'INVITE' ? `Join ${req.groupName}` : `${req.senderName} wants to connect`}
                                    </p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{req.senderName} • CEO</p>
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                 <button onClick={() => handleAction(req.id, 'ACCEPTED')} className="flex-1 py-2 bg-orange-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 transition-colors">Accept</button>
                                 <button onClick={() => handleAction(req.id, 'DECLINED')} className="flex-1 py-2 bg-slate-100 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">Ignore</button>
                              </div>
                           </div>
                         )) : (
                           <div className="p-8 text-center text-slate-300 font-bold text-[10px] uppercase">No new requests</div>
                         )}
                      </div>
                   </div>
                 )}
               </div>

               <button 
                onClick={() => setShowNewGroupModal(true)}
                className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-400 flex items-center justify-center transition-all"
               >
                 <i className="fa-solid fa-pen-to-square"></i>
               </button>
               
               <button 
                onClick={() => setShowSettingsModal(true)}
                className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-400 flex items-center justify-center transition-all"
               >
                 <i className="fa-solid fa-gear"></i>
               </button>
            </div>
          </div>

          <div className="relative mb-8">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
            <input type="text" placeholder="Search conversations..." className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all font-medium border border-transparent" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="flex gap-3">
            {['all', 'chat', 'group'].map(f => (
              <button key={f} onClick={() => setFilter(f as any)} className={`px-8 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                {f === 'all' ? 'All Chats' : f === 'chat' ? 'Personal' : 'Teams'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredConversations.map((conv) => (
            <div key={conv.id} onClick={() => { setActiveId(conv.id); setConversations(prev => prev.map(c => c.id === conv.id ? {...c, unread: 0} : c)); }} className={`px-8 py-6 flex gap-4 cursor-pointer transition-all relative ${activeId === conv.id ? 'bg-orange-50/30' : 'hover:bg-slate-50/50'}`}>
              <div className="relative shrink-0">
                <img src={conv.avatar} className="w-16 h-16 rounded-[1.5rem] object-cover shadow-sm" alt={conv.name} />
                {conv.online && <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></span>}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-black text-slate-800 text-lg truncate">{conv.name}</h4>
                  <span className={`text-[11px] font-bold ${conv.unread > 0 ? 'text-orange-500' : 'text-slate-400'}`}>{conv.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-[15px] truncate font-medium ${conv.unread > 0 ? 'text-slate-900' : 'text-slate-400'}`}>{conv.lastMessage}</p>
                  {conv.unread > 0 && <span className="bg-orange-500 text-white text-[11px] font-black h-6 min-w-[24px] px-2 flex items-center justify-center rounded-full shadow-lg shadow-orange-500/20">{conv.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANE */}
      <div className={`${showChat ? 'flex' : 'hidden'} flex-1 flex-col relative h-full bg-[#f8f9fa]`}>
        {activeConversation ? (
          <>
            <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between z-30">
              <div className="flex items-center gap-5">
                {isMobile && <button onClick={() => setActiveId(null)} className="p-2 text-slate-400 hover:text-orange-500 transition-colors"><i className="fa-solid fa-chevron-left text-xl"></i></button>}
                <img src={activeConversation.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm ring-4 ring-slate-50" alt="" />
                <div>
                   <h3 className="font-black text-slate-900 text-lg leading-tight">{activeConversation.name}</h3>
                   <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${activeConversation.online ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                      <span className="text-[11px] text-slate-500 font-black uppercase tracking-widest">{activeConversation.type === 'group' ? `${activeConversation.members} Team Members` : (activeConversation.online ? 'Online' : 'Offline')}</span>
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-400 relative" ref={chatMenuRef}>
                 <button 
                  onClick={() => setShowChatMenu(!showChatMenu)}
                  className={`w-12 h-12 rounded-2xl transition-all flex items-center justify-center ${showChatMenu ? 'bg-orange-50 text-orange-500' : 'hover:bg-slate-50 hover:text-orange-500'}`}
                 >
                   <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                 </button>

                 {showChatMenu && (
                   <div className="absolute top-14 right-0 w-56 bg-white shadow-2xl rounded-2xl border border-slate-100 z-50 animate-in zoom-in-95 duration-200 py-2 overflow-hidden">
                      <button onClick={openEditModal} className="w-full px-6 py-3 flex items-center gap-4 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-sm">
                        <i className="fa-solid fa-user-pen w-5 text-slate-400"></i> Edit Profile
                      </button>
                      <button onClick={() => setShowSettingsModal(true)} className="w-full px-6 py-3 flex items-center gap-4 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-sm">
                        <i className="fa-solid fa-sliders w-5 text-slate-400"></i> Chat Settings
                      </button>
                      <button onClick={() => handleClearHistory()} className="w-full px-6 py-3 flex items-center gap-4 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-sm">
                        <i className="fa-solid fa-broom w-5 text-slate-400"></i> Clear History
                      </button>
                      <div className="my-2 border-t border-slate-50"></div>
                      <button onClick={handleDeleteChat} className="w-full px-6 py-3 flex items-center gap-4 text-red-500 hover:bg-red-50 transition-colors font-black text-sm">
                        <i className="fa-solid fa-trash-can w-5"></i> Delete Chat
                      </button>
                   </div>
                 )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar relative z-10 flex flex-col gap-6">
               {activeConversation.messages.map((msg) => {
                 const isMe = msg.sender === 'me';
                 return (
                   <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-${isMe ? 'right' : 'left'}-4 duration-300`}>
                      <div className={`max-w-[85%] lg:max-w-[70%] relative ${isMe ? 'bg-orange-500 text-white rounded-[2rem] rounded-tr-none shadow-xl shadow-orange-500/10' : 'bg-white text-slate-800 rounded-[2rem] rounded-tl-none shadow-sm border border-slate-100'}`}>
                        <div className="px-6 py-4">
                           {msg.attachment && (
                             <div className="mb-4 rounded-2xl overflow-hidden bg-black/5 border border-black/5">
                               {msg.attachment.type === 'image' ? <img src={msg.attachment.url} className="max-w-full rounded-xl" alt="attachment" /> : <div className="flex items-center gap-4 p-5 bg-white/50"><div className="w-14 h-14 bg-orange-500 text-white rounded-2xl shadow-lg flex items-center justify-center text-2xl"><i className="fa-solid fa-file-invoice"></i></div><div className="flex-1 min-w-0"><p className="text-sm font-black truncate">{msg.attachment.name}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{msg.attachment.size}</p></div><button className="text-orange-500 p-3 hover:bg-orange-50 rounded-xl transition-all"><i className="fa-solid fa-cloud-arrow-down text-xl"></i></button></div>}
                             </div>
                           )}
                           {msg.text && <p className="text-[16px] font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
                           <div className={`flex items-center justify-end gap-2 mt-2 ${isMe ? 'opacity-70' : 'opacity-40'}`}>
                              <span className="text-[10px] font-bold">{msg.time}</span>
                              {isMe && <i className={`fa-solid fa-check-double text-[10px] ${msg.status === 'read' ? 'text-blue-200' : ''}`}></i>}
                           </div>
                        </div>
                      </div>
                   </div>
                 );
               })}
               <div ref={chatEndRef} />
            </div>

            <div className="p-6 bg-white border-t border-slate-100 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); if (messageText.trim()) handleSendMessage(messageText); }} className="flex items-center gap-4 max-w-6xl mx-auto">
                <div className="flex gap-2">
                  <button type="button" className="w-12 h-12 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-orange-500 transition-all flex items-center justify-center text-2xl"><i className="fa-regular fa-face-smile"></i></button>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="w-12 h-12 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-orange-500 transition-all flex items-center justify-center text-2xl"><i className="fa-solid fa-paperclip"></i></button>
                </div>
                <div className="flex-1">
                   <textarea rows={1} placeholder="Type a professional message..." className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-orange-500/20 focus:outline-none focus:ring-4 focus:ring-orange-500/5 font-medium text-sm transition-all resize-none max-h-32 custom-scrollbar" value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (messageText.trim()) handleSendMessage(messageText); } }} />
                </div>
                <button type="submit" disabled={!messageText.trim()} className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all ${messageText.trim() ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95' : 'bg-slate-100 text-slate-300'}`}><i className="fa-solid fa-paper-plane"></i></button>
              </form>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white/50 backdrop-blur-sm">
             <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mb-8 text-slate-200 shadow-xl ring-8 ring-slate-50"><i className="fa-solid fa-message text-4xl"></i></div>
             <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-2">Secure Messenger</h3>
             <p className="text-slate-500 font-medium max-w-sm">Select a contact to begin your professional industrial consultation.</p>
          </div>
        )}
      </div>

      {/* Edit Conversation Modal */}
      {showEditConvModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-10 animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-xl font-black text-[#121212] uppercase tracking-tight">Edit Profile</h3>
                 <button onClick={() => setShowEditConvModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-orange-500 transition-all"><i className="fa-solid fa-xmark text-lg"></i></button>
              </div>
              <div className="space-y-8">
                 <div className="flex flex-col items-center">
                    <div className="relative group cursor-pointer" onClick={() => editConvFileInputRef.current?.click()}>
                       <img src={editAvatar} className="w-28 h-28 rounded-[2rem] object-cover ring-4 ring-slate-50 shadow-lg group-hover:opacity-80 transition-opacity" alt="" />
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <i className="fa-solid fa-camera text-white text-2xl"></i>
                       </div>
                       <input 
                        type="file" 
                        ref={editConvFileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => setEditAvatar(event.target?.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                       />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Change Profile Picture</p>
                 </div>

                 <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Display Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter new name..." 
                      className="w-full px-8 py-5 bg-slate-50 rounded-[1.8rem] border border-transparent focus:bg-white focus:border-orange-500/20 focus:outline-none focus:ring-4 focus:ring-orange-500/5 font-bold text-slate-700 transition-all shadow-inner" 
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)} 
                    />
                 </div>

                 <div className="pt-4">
                    <button 
                      onClick={handleEditConvSave}
                      disabled={!editName.trim()}
                      className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-lg transition-all active:scale-95 ${
                        !editName.trim() ? 'bg-slate-100 text-slate-300 shadow-none' : 'bg-orange-500 text-white shadow-orange-500/20 hover:bg-orange-600'
                      }`}
                    >
                      Save Profile
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Global Settings Modal - Matches Screenshot Design */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-10 animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-xl font-black text-[#121212] uppercase tracking-tight">Chat Settings</h3>
                 <button onClick={() => setShowSettingsModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-orange-500 transition-all"><i className="fa-solid fa-xmark text-lg"></i></button>
              </div>
              <div className="space-y-4">
                 {[
                   { id: 'onlineStatus', label: 'Show Online Status', icon: 'fa-circle-dot', color: 'text-emerald-500' },
                   { id: 'readReceipts', label: 'Read Receipts', icon: 'fa-check-double', color: 'text-blue-500' },
                   { id: 'notifications', label: 'Push Notifications', icon: 'fa-bell', color: 'text-orange-500' },
                 ].map(item => (
                   <div key={item.id} className="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-50 rounded-[1.8rem] transition-all hover:bg-slate-50">
                      <div className="flex items-center gap-5">
                         <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-lg ${item.color}`}><i className={`fa-solid ${item.icon}`}></i></div>
                         <span className="text-[15px] font-black text-slate-700 tracking-tight">{item.label}</span>
                      </div>
                      <button 
                        onClick={() => setSettings(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof settings] }))}
                        className={`w-14 h-7 rounded-full transition-all relative ${settings[item.id as keyof typeof settings] ? 'bg-orange-500 shadow-lg shadow-orange-500/20' : 'bg-slate-300'}`}
                      >
                         <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-sm ${settings[item.id as keyof typeof settings] ? 'right-1' : 'left-1'}`}></div>
                      </button>
                   </div>
                 ))}
                 <div className="pt-6">
                    <button 
                      onClick={() => handleClearHistory(activeId)}
                      className="w-full py-5 text-red-500 font-black uppercase tracking-[0.15em] text-[11px] border-2 border-red-50 hover:bg-red-50 rounded-[1.5rem] transition-all active:scale-95"
                    >
                      Clear Chat History
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* New Group Modal */}
      {showNewGroupModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-10 animate-in zoom-in-95 duration-300 max-h-[85vh] flex flex-col">
              <div className="flex justify-between items-center mb-10 shrink-0">
                 <h3 className="text-xl font-black text-[#121212] uppercase tracking-tight">Create New Team</h3>
                 <button onClick={() => setShowNewGroupModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-orange-500 transition-all"><i className="fa-solid fa-xmark text-lg"></i></button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); if (newGroupName.trim()) {
                const newGroup: Conversation = { id: `g-${Date.now()}`, name: newGroupName, type: 'group', lastMessage: `Group created with ${selectedContacts.length} members`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), avatar: 'https://images.unsplash.com/photo-1522071823991-b9671f903f60?auto=format&fit=crop&q=80&w=100&h=100', unread: 0, members: selectedContacts.length + 1, messages: [{ id: 'msg-init', sender: 'other', text: `Welcome to ${newGroupName}! Start collaborating here.`, time: 'Just now' }] };
                setConversations(prev => [newGroup, ...prev]); setNewGroupName(''); setSelectedContacts([]); setShowNewGroupModal(false); setActiveId(newGroup.id);
              }}} className="space-y-8 flex-1 overflow-y-auto custom-scrollbar pr-2 no-scrollbar">
                 <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Team Name</label>
                    <input autoFocus type="text" placeholder="e.g. Q4 Logistics Sync" className="w-full px-8 py-5 bg-slate-50 rounded-[1.8rem] border border-transparent focus:bg-white focus:border-orange-500/20 focus:outline-none focus:ring-4 focus:ring-orange-500/5 font-bold text-slate-700 transition-all shadow-inner" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
                 </div>
                 <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Add Contacts</label>
                    <div className="space-y-3">
                      {contacts.map(contact => (
                        <div key={contact.id} onClick={() => toggleContactSelection(contact.id)} className={`flex items-center justify-between p-4 rounded-[1.5rem] cursor-pointer border-2 transition-all ${selectedContacts.includes(contact.id) ? 'bg-orange-50/50 border-orange-500 text-orange-600' : 'bg-white border-slate-50 hover:border-slate-100 hover:bg-slate-50/30'}`}>
                           <div className="flex items-center gap-4"><img src={contact.avatar} className="w-10 h-10 rounded-xl object-cover shadow-sm" alt="" /><span className="text-sm font-black tracking-tight">{contact.name}</span></div>
                           <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${selectedContacts.includes(contact.id) ? 'bg-orange-500 text-white shadow-md' : 'border-2 border-slate-100'}`}>{selectedContacts.includes(contact.id) && <i className="fa-solid fa-check text-[10px]"></i>}</div>
                        </div>
                      ))}
                    </div>
                 </div>
                 <div className="pt-4 pb-2 sticky bottom-0 bg-white">
                    <button type="submit" disabled={!newGroupName.trim() || selectedContacts.length === 0} className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-lg transition-all active:scale-95 ${!newGroupName.trim() || selectedContacts.length === 0 ? 'bg-slate-100 text-slate-300 shadow-none' : 'bg-orange-500 text-white shadow-orange-500/20 hover:bg-orange-600'}`}>Create Group</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default ChatView;
