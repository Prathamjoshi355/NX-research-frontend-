
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Gift, 
  Users, 
  Link, 
  Search, 
  Plus, 
  X, 
  MoreVertical, 
  ArrowUpRight, 
  ChevronRight,
  Calculator,
  Trash2,
  CheckCircle2,
  // Added missing Edit3 import
  Edit3
} from 'lucide-react';
import { NXEvent } from '../types';

interface EventsProps {
  events: NXEvent[];
  onAddEvent: (event: NXEvent) => void;
  onUpdateEvent: (event: NXEvent) => void;
  onDeleteEvent: (id: string) => void;
}

const Events: React.FC<EventsProps> = ({ events, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState<Partial<NXEvent>>({
    status: 'Upcoming',
    attendees: 0,
    connectionsMade: 0
  });

  const filteredEvents = events.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedEvent = events.find(e => e.id === selectedEventId);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name || !newForm.date) return;

    const event: NXEvent = {
      id: `EV-${Date.now()}`,
      name: newForm.name || 'Untitled Event',
      date: newForm.date || '',
      time: newForm.time || '10:00 AM',
      day: newForm.day || 'Monday',
      venue: newForm.venue || 'TBD',
      term: newForm.term || 'General',
      swag: newForm.swag || 'Standard Pack',
      connectionsMade: newForm.connectionsMade || 0,
      attendees: newForm.attendees || 0,
      status: newForm.status as NXEvent['status'] || 'Upcoming',
      avatar: newForm.name?.[0].toUpperCase() || 'E'
    };

    onAddEvent(event);
    setIsAdding(false);
    setNewForm({ status: 'Upcoming', attendees: 0, connectionsMade: 0 });
  };

  const statusColors = {
    'Upcoming': 'bg-[#FEF3C7] text-[#92400E] border-[#FB8500]/20',
    'Live': 'bg-[#D1FAE5] text-[#065F46] border-[#06A77D]/20',
    'Completed': 'bg-gray-100 text-gray-500 border-gray-200'
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-1">EVENT COMMAND</h2>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">Summit Logistics & Networking Metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by Event Name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-100 rounded-[20px] py-4 pl-12 pr-6 text-sm font-semibold w-full md:w-[280px] focus:outline-none focus:ring-2 focus:ring-[#FB8500]/10 shadow-sm"
            />
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-[#0A2463] text-white px-8 h-14 rounded-[20px] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[#0A2463]/20 hover:scale-105 transition-all"
          >
            <Plus size={18} />
            Schedule Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Events Grid */}
        <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div 
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className={`bg-white border border-gray-50 rounded-[48px] p-10 flex flex-col shadow-sm transition-all cursor-pointer hover:shadow-xl hover:shadow-[#0A2463]/5 group relative overflow-hidden ${selectedEventId === event.id ? 'ring-2 ring-[#FB8500]/20 border-[#FB8500]/20 bg-[#F8F9FA]' : ''}`}
            >
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-[24px] bg-[#0A2463] text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-[#0A2463]/20">
                  {event.avatar}
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[event.status]}`}>
                  {event.status}
                </span>
              </div>

              <div className="mb-10">
                <h4 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tighter mb-4 leading-none group-hover:text-[#FB8500] transition-colors">{event.name}</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Calendar size={14} className="text-[#FB8500]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{event.day}, {event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin size={14} className="text-[#06A77D]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1">Guests</p>
                    <p className="text-sm font-black text-[#0A2463]">{event.attendees}</p>
                  </div>
                  <div className="w-px h-6 bg-gray-100" />
                  <div className="text-center">
                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1">Links</p>
                    <p className="text-sm font-black text-[#06A77D]">{event.connectionsMade}</p>
                  </div>
                </div>
                <ArrowUpRight size={24} className="text-gray-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Event Insight Panel */}
        <div className="xl:col-span-4 space-y-8">
          {selectedEvent ? (
            <div className="bg-white border border-gray-100 rounded-[56px] p-10 shadow-2xl animate-in slide-in-from-right-10 duration-500 sticky top-10">
              <div className="flex justify-between items-start mb-10">
                <div className="w-20 h-20 rounded-[32px] bg-[#FB8500] text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-[#FB8500]/20">
                  {selectedEvent.avatar}
                </div>
                <button onClick={() => setSelectedEventId(null)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="mb-10">
                <p className="text-[10px] font-black text-[#FB8500] uppercase tracking-[0.2em] mb-2">ID: {selectedEvent.id}</p>
                <h3 className="text-3xl font-[900] text-[#0A2463] uppercase tracking-tight leading-none mb-6">{selectedEvent.name}</h3>
                <div className="bg-[#0A2463] rounded-3xl p-6 text-white shadow-xl shadow-[#0A2463]/10">
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-4">Event Logistics</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white/60 uppercase">Term</span>
                      <span className="text-[10px] font-black uppercase">{selectedEvent.term}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white/60 uppercase">Time Slot</span>
                      <span className="text-[10px] font-black uppercase">{selectedEvent.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Gift size={18} className="text-[#FB8500]" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Swag Inventory</p>
                  </div>
                  <p className="text-sm font-bold text-[#0A2463] leading-relaxed">
                    {selectedEvent.swag || 'No inventory assigned.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-100 p-6 rounded-[32px] text-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mx-auto mb-3">
                      <Users size={20} />
                    </div>
                    <p className="text-[8px] font-black text-gray-300 uppercase mb-1">Attendees</p>
                    <p className="text-lg font-black text-[#0A2463]">{selectedEvent.attendees}</p>
                  </div>
                  <div className="bg-white border border-gray-100 p-6 rounded-[32px] text-center">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500 mx-auto mb-3">
                      <Link size={20} />
                    </div>
                    <p className="text-[8px] font-black text-gray-300 uppercase mb-1">Connections</p>
                    <p className="text-lg font-black text-[#06A77D]">{selectedEvent.connectionsMade}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex flex-col gap-3">
                   <button className="w-full py-5 bg-[#0A2463] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-[#0A2463]/10 hover:scale-105 active:scale-95 transition-all">
                      <Edit3 size={16} /> Update Logistics
                   </button>
                   <button 
                    onClick={() => onDeleteEvent(selectedEvent.id)}
                    className="w-full py-5 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all"
                   >
                      <Trash2 size={16} /> Cancel Summit
                   </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white border border-dashed border-gray-100 rounded-[56px] p-12 text-center h-[400px] flex flex-col items-center justify-center shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Calendar size={32} className="text-gray-200" />
                </div>
                <h4 className="text-lg font-black text-[#0A2463] uppercase mb-2">Summit Inspector</h4>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-loose max-w-[200px]">Select a scheduled event to audit attendee flow and resource allocation.</p>
              </div>

              {/* Attendance Calculator Widget */}
              <div className="bg-[#F8F9FA] border border-gray-100 rounded-[40px] p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#0A2463]">
                    <Calculator size={18} />
                  </div>
                  <h4 className="text-xs font-black uppercase text-[#0A2463]">Registration Tool</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase">
                    <span>Target Goal</span>
                    <span className="text-[#0A2463] font-black">500</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#FB8500] h-full" style={{ width: '64%' }} />
                  </div>
                  <p className="text-[9px] font-bold text-gray-300 italic">"Tracking real-time conversion across all summits."</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Event Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A2463]/40 backdrop-blur-md" onClick={() => setIsAdding(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[48px] shadow-2xl animate-in zoom-in-95 duration-200 p-12">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-3xl font-[900] text-[#0A2463] uppercase tracking-tight">Schedule Summit</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Initialize organizational logistics</p>
              </div>
              <button onClick={() => setIsAdding(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Event Name</label>
                    <input 
                      required 
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold uppercase" 
                      value={newForm.name || ''} 
                      onChange={e => setNewForm({...newForm, name: e.target.value})} 
                      placeholder="e.g. AI CONCLAVE 2024"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Date</label>
                      <input 
                        required 
                        className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold" 
                        value={newForm.date || ''} 
                        onChange={e => setNewForm({...newForm, date: e.target.value})} 
                        placeholder="15 MAY"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Time</label>
                      <input 
                        required 
                        className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold" 
                        value={newForm.time || ''} 
                        onChange={e => setNewForm({...newForm, time: e.target.value})} 
                        placeholder="10:00 AM"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Venue / Location</label>
                    <input 
                      required 
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold uppercase" 
                      value={newForm.venue || ''} 
                      onChange={e => setNewForm({...newForm, venue: e.target.value})} 
                      placeholder="Grand Ballroom, NX Labs"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Term / Type</label>
                    <input 
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold uppercase" 
                      value={newForm.term || ''} 
                      onChange={e => setNewForm({...newForm, term: e.target.value})} 
                      placeholder="Two-Day Intensive"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Swag Package</label>
                    <textarea 
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold h-24 resize-none uppercase" 
                      value={newForm.swag || ''} 
                      onChange={e => setNewForm({...newForm, swag: e.target.value})} 
                      placeholder="Branded Hoodies, Metal Pins, Stickers..."
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#FB8500] text-white font-black text-xs uppercase tracking-[0.2em] py-6 rounded-3xl shadow-xl shadow-[#FB8500]/20 transition-all hover:scale-105 active:scale-95">
                Authorize & Deploy Summit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
