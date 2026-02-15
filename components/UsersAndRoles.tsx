
import React, { useState, useRef, useEffect } from 'react';
import { Search, UserPlus, MoreVertical, Mail, Shield, Clock, X, Check, Edit2, Trash2, Ban, UserCheck } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: 'Administrator' | 'Lead Researcher' | 'Student' | 'Analyst';
  email: string;
  status: 'Active' | 'Pending' | 'Inactive';
  lastActive: string;
  avatar: string;
  permissions?: string[];
}

const initialUsers: User[] = [
  { id: '1', name: 'Dr. Aris Thorne', role: 'Administrator', email: 'Thorne.a@nx-research.gov', status: 'Active', lastActive: '2 mins ago', avatar: 'AT', permissions: ['read', 'write', 'delete', 'admin'] },
  { id: '2', name: 'Elena Vance', role: 'Lead Researcher', email: 'vance.e@nx-research.gov', status: 'Active', lastActive: '1 hour ago', avatar: 'EV', permissions: ['read', 'write'] },
  { id: '3', name: 'Marcus Wright', role: 'Student', email: 'wright.m@nx-edu.com', status: 'Pending', lastActive: '2 days ago', avatar: 'MW', permissions: ['read'] },
  { id: '4', name: 'Sarah Chen', role: 'Analyst', email: 'chen.s@nx-systems.io', status: 'Active', lastActive: '15 mins ago', avatar: 'SC', permissions: ['read', 'write'] },
  { id: '5', name: 'Julian Marsh', role: 'Lead Researcher', email: 'marsh.j@nx-research.gov', status: 'Inactive', lastActive: '1 week ago', avatar: 'JM', permissions: ['read'] },
  { id: '6', name: 'Lia Rodriguez', role: 'Student', email: 'rodriguez.l@nx-edu.com', status: 'Active', lastActive: '4 hours ago', avatar: 'LR', permissions: ['read'] },
];

const availablePermissions = [
  { id: 'read', label: 'Read Access', desc: 'Can view research data and reports' },
  { id: 'write', label: 'Write Access', desc: 'Can create and edit content' },
  { id: 'delete', label: 'Delete Access', desc: 'Can remove resources and entries' },
  { id: 'admin', label: 'Admin Rights', desc: 'Full control over system settings' },
];

const roleBadgeStyles = {
  'Administrator': 'bg-[#FB8500] text-white',
  'Lead Researcher': 'bg-[#0A2463] text-white',
  'Student': 'bg-[#1E1E1E] text-white',
  'Analyst': 'bg-[#06A77D] text-white',
};

const statusPillStyles = {
  'Active': 'bg-[#D1FAE5] text-[#065F46]',
  'Pending': 'bg-[#FEF3C7] text-[#92400E]',
  'Inactive': 'bg-gray-100 text-gray-500',
};

const UsersAndRoles: React.FC = () => {
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [permissionUser, setPermissionUser] = useState<User | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'Student' as User['role'],
    email: '',
    status: 'Active' as User['status']
  });

  const filteredUsers = userList.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const initials = newUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const userToAdd: User = {
      id: Date.now().toString(),
      ...newUser,
      lastActive: 'Just now',
      avatar: initials || 'UN',
      permissions: ['read']
    };

    setUserList([userToAdd, ...userList]);
    setNewUser({ name: '', role: 'Student', email: '', status: 'Active' });
    setIsAddModalOpen(false);
  };

  const togglePermission = (permId: string) => {
    if (!permissionUser) return;
    const currentPerms = permissionUser.permissions || [];
    const newPerms = currentPerms.includes(permId) 
      ? currentPerms.filter(p => p !== permId)
      : [...currentPerms, permId];
    
    const updatedUser = { ...permissionUser, permissions: newPerms };
    setPermissionUser(updatedUser);
    setUserList(userList.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const deleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUserList(userList.filter(u => u.id !== id));
      setActiveMenuId(null);
    }
  };

  const toggleStatus = (user: User) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    setUserList(userList.map(u => u.id === user.id ? { ...u, status: newStatus as User['status'] } : u));
    setActiveMenuId(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-1">Users & Roles</h2>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">Personnel Management & Access Control</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search personnel" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/80 border border-gray-100 rounded-[20px] py-4 pl-12 pr-6 text-sm font-semibold w-full md:w-[320px] focus:outline-none focus:ring-2 focus:ring-[#FB8500]/10 focus:bg-white transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#FB8500] text-white w-14 h-14 rounded-[20px] flex items-center justify-center hover:bg-[#e67a00] transition-all shadow-lg shadow-[#FB8500]/20 active:scale-95"
          >
            <UserPlus size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-10">
        {filteredUsers.map((user, idx) => (
          <div 
            key={user.id} 
            className="group bg-white border border-gray-50 rounded-[40px] p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#0A2463]/5 hover:-translate-y-1 relative"
          >
            <div className="flex gap-6 mb-8">
              <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center text-2xl font-black text-[#0A2463] shrink-0">
                {user.avatar}
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-extrabold text-[#0A2463] text-xl leading-tight truncate">{user.name}</h4>
                  <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 ${statusPillStyles[user.status]}`}>
                    {user.status}
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`inline-block px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${roleBadgeStyles[user.role]}`}>
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-500">
                <Mail size={16} className="shrink-0" />
                <span className="text-xs font-bold truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <Clock size={16} className="shrink-0" />
                <span className="text-xs font-bold">Active {user.lastActive}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50 relative">
              <button 
                onClick={() => setPermissionUser(user)}
                className="flex items-center gap-2.5 text-[11px] font-black text-[#0A2463] uppercase tracking-[0.15em] hover:text-[#FB8500] transition-colors"
              >
                <Shield size={16} strokeWidth={2.5} />
                Manage Permissions
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setActiveMenuId(activeMenuId === user.id ? null : user.id)}
                  className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#0A2463] transition-colors rounded-full hover:bg-gray-50"
                >
                  <MoreVertical size={20} />
                </button>

                {/* Dropdown Menu */}
                {activeMenuId === user.id && (
                  <>
                    <div className="fixed inset-0 z-[60]" onClick={() => setActiveMenuId(null)} />
                    <div className="absolute right-0 bottom-12 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[70] overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-150">
                      <button className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#0A2463] transition-colors">
                        <Edit2 size={14} /> Edit Details
                      </button>
                      <button 
                        onClick={() => toggleStatus(user)}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#0A2463] transition-colors"
                      >
                        {user.status === 'Active' ? <Ban size={14} /> : <UserCheck size={14} />}
                        {user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                      </button>
                      <div className="h-px bg-gray-50 my-1" />
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-[#D62828] hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} /> Remove User
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Permission Modal */}
      {permissionUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A2463]/40 backdrop-blur-md" onClick={() => setPermissionUser(null)} />
          <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-200 p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight">Permissions</h3>
                <p className="text-xs font-bold text-gray-400 uppercase mt-1">Editing access for {permissionUser.name}</p>
              </div>
              <button onClick={() => setPermissionUser(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <div className="space-y-4">
              {availablePermissions.map(perm => {
                const isSelected = permissionUser.permissions?.includes(perm.id);
                return (
                  <button 
                    key={perm.id}
                    onClick={() => togglePermission(perm.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all ${
                      isSelected ? 'border-[#FB8500] bg-[#FB8500]/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="text-left">
                      <p className={`text-sm font-black uppercase tracking-wider ${isSelected ? 'text-[#FB8500]' : 'text-[#0A2463]'}`}>{perm.label}</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1">{perm.desc}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#FB8500] border-[#FB8500] text-white' : 'border-gray-200 text-transparent'
                    }`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => setPermissionUser(null)}
              className="w-full bg-[#0A2463] text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl mt-8 shadow-xl shadow-[#0A2463]/20"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A2463]/40 backdrop-blur-md" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-200 p-10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight">Add Personnel</h3>
                <p className="text-xs font-bold text-gray-400 uppercase">Initialize user credentials</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-[#0A2463] uppercase mb-2 ml-1">Full Name</label>
                  <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#0A2463] uppercase mb-2 ml-1">Email</label>
                  <input required type="email" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-[#0A2463] uppercase mb-2 ml-1">Role</label>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold appearance-none" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value as User['role']})}>
                    <option value="Administrator">Administrator</option>
                    <option value="Lead Researcher">Lead Researcher</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#0A2463] uppercase mb-2 ml-1">Status</label>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold appearance-none" value={newUser.status} onChange={e => setNewUser({...newUser, status: e.target.value as User['status']})}>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#0A2463] text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-[#0A2463]/20">Register Personnel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersAndRoles;
