
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

const initialMessages: ChatMessage[] = [
  { id: '1', sender: 'mentor', text: 'Hey Aakash! How is the Gradient Descent project coming along?', time: '10:30 AM' },
  { id: '2', sender: 'student', text: 'Hi! It is going well. Just struggling a bit with the learning rate tuning.', time: '10:32 AM' },
  { id: '3', sender: 'mentor', text: 'Try using an adaptive learning rate like Adam. I can review your code at 4 PM.', time: '10:35 AM' },
  { id: '4', sender: 'student', text: 'brbrbrb', time: '02:06 PM' },
  { id: '5', sender: 'student', text: 'teb', time: '02:06 PM' },
];

const MentorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Automatically scroll to the bottom whenever the messages state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'student',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="bg-[#eef1f4] rounded-[2rem] p-4 flex flex-col h-full shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-3 px-2 shrink-0">
        <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">MENTOR CHAT</h3>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">SARAH JENKINS • ONLINE</span>
        </div>
      </div>

      <div className="bg-white rounded-[1.25rem] flex-1 flex flex-col shadow-[0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Messages area with custom scrollbar and auto-scroll target */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar min-h-0">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] px-3.5 py-2 rounded-xl text-[12px] leading-relaxed shadow-sm font-medium ${
                msg.sender === 'student' 
                ? 'bg-[#0a1532] text-white rounded-tr-none' 
                : 'bg-slate-100 text-[#0a1532] rounded-tl-none border border-slate-50'
              }`}>
                {msg.text}
              </div>
              <span className="text-[7px] font-black text-slate-300 mt-1 uppercase tracking-widest">{msg.time}</span>
            </div>
          ))}
          {/* Reference element for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-2.5 border-t border-slate-50 bg-slate-50/50 shrink-0">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all pr-10 text-[#0a1532] font-semibold placeholder:text-slate-400"
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-1.5 p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
