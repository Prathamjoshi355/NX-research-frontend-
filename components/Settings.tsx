
import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Cpu, 
  Save, 
  RefreshCw, 
  HardDrive, 
  Globe, 
  User, 
  Mail, 
  Info, 
  CheckCircle2, 
  Database,
  Lock,
  Eye,
  Trash2,
  FileJson,
  Activity,
  Key
} from 'lucide-react';
import { OrgSettings } from '../types';

interface SettingsProps {
  settings: OrgSettings;
  onUpdate: (updated: OrgSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState<OrgSettings>(settings);
  const [activeCategory, setActiveCategory] = useState<'IDENTITY' | 'SECURITY' | 'NOTIFS' | 'SYSTEM'>('IDENTITY');
  const [isSaving, setIsSaving] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  // Sync local state if props change externally
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate network delay for synchronization
    setTimeout(() => {
      onUpdate(localSettings);
      setIsSaving(false);
      setSaveFeedback(true);
      setTimeout(() => setSaveFeedback(false), 3000);
    }, 800);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localSettings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "nx_system_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleFactoryReset = () => {
    if (confirm('CRITICAL: Reset all parameters to factory defaults? This action cannot be undone.')) {
      const defaults: OrgSettings = {
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
      setLocalSettings(defaults);
      onUpdate(defaults);
    }
  };

  const toggle = (key: keyof OrgSettings | string) => {
    if (key === 'maintenanceMode' || key === 'twoFactorAuth') {
      const val = !localSettings[key as 'maintenanceMode' | 'twoFactorAuth'];
      setLocalSettings(prev => ({ ...prev, [key]: val }));
    } else if (key.startsWith('notif_')) {
      const field = key.replace('notif_', '') as keyof OrgSettings['notificationPreferences'];
      setLocalSettings(prev => ({
        ...prev,
        notificationPreferences: {
          ...prev.notificationPreferences,
          [field]: !prev.notificationPreferences[field]
        }
      }));
    }
  };

  const categories = [
    { id: 'IDENTITY', label: 'Org Identity', icon: <User size={18} /> },
    { id: 'SECURITY', label: 'Security Protocols', icon: <Shield size={18} /> },
    { id: 'NOTIFS', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'SYSTEM', label: 'System Engine', icon: <Cpu size={18} /> },
  ];

  const securityLogs = [
    { event: 'Terminal Access', user: 'Admin Alpha', time: '10:14:02', status: 'Success' },
    { event: 'Registry Change', user: 'Admin Alpha', time: '09:45:21', status: 'Authorized' },
    { event: 'Encryption Handshake', user: 'System', time: '08:00:00', status: 'Rotated' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
        <div>
          <h2 className="text-4xl font-[900] text-[#0A2463] tracking-tighter uppercase mb-2">SYSTEM PARAMETERS</h2>
          <p className="text-gray-400 text-[10px] font-black tracking-[0.25em] uppercase">Core Registry Configuration & Logic Gates</p>
        </div>
        
        <div className="flex items-center gap-4">
          {saveFeedback && (
            <div className="flex items-center gap-2 text-[#06A77D] font-black text-[10px] uppercase tracking-widest animate-in slide-in-from-right-4">
              <CheckCircle2 size={16} /> Registry Synchronized
            </div>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#FB8500] text-white px-10 h-14 rounded-[20px] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#FB8500]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
            {isSaving ? 'Processing...' : 'Synchronize Parameters'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-3 space-y-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`w-full flex items-center gap-4 p-6 rounded-[32px] transition-all group ${
                activeCategory === cat.id 
                  ? 'bg-[#0A2463] text-white shadow-xl shadow-[#0A2463]/10' 
                  : 'bg-white border border-gray-50 text-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                activeCategory === cat.id ? 'bg-[#FB8500]' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
              }`}>
                {cat.icon}
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest">{cat.label}</span>
            </button>
          ))}

          <div className="mt-10 p-8 bg-[#0A2463] rounded-[40px] text-white/50 relative overflow-hidden shadow-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-white">Platform Integrity</h4>
            <div className="space-y-4">
              <div className="flex justify-between text-[9px] font-bold">
                <span>Core Version</span>
                <span className="text-white">v2.4.0-Omega</span>
              </div>
              <div className="flex justify-between text-[9px] font-bold">
                <span>Maintenance</span>
                <span className={localSettings.maintenanceMode ? "text-[#FB8500]" : "text-[#06A77D]"}>
                  {localSettings.maintenanceMode ? "ACTIVE" : "STANDBY"}
                </span>
              </div>
              <div className="flex justify-between text-[9px] font-bold">
                <span>Admin Link</span>
                <span className="text-white">ENCRYPTED</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          </div>
        </div>

        <div className="xl:col-span-9 bg-white border border-gray-50 rounded-[56px] p-10 md:p-14 shadow-sm min-h-[600px] relative overflow-hidden">
          {/* Identity Tab */}
          {activeCategory === 'IDENTITY' && (
            <div className="animate-in fade-in duration-500 space-y-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-[#FB8500]/10 rounded-2xl flex items-center justify-center text-[#FB8500]">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight">Organization Profile</h3>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Global Branding & Communication Meta</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Master Brand Name</label>
                  <input 
                    type="text"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm font-black text-[#0A2463] uppercase focus:ring-2 focus:ring-[#FB8500]/20 transition-all outline-none"
                    value={localSettings.orgName}
                    onChange={(e) => setLocalSettings({...localSettings, orgName: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Administrative Email</label>
                  <input 
                    type="email"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm font-bold text-[#0A2463] focus:ring-2 focus:ring-[#FB8500]/20 transition-all outline-none"
                    value={localSettings.adminEmail}
                    onChange={(e) => setLocalSettings({...localSettings, adminEmail: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Organizational Slogan / Vision</label>
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm font-bold text-[#0A2463] italic h-32 focus:ring-2 focus:ring-[#FB8500]/20 transition-all outline-none resize-none"
                    value={localSettings.orgSlogan}
                    onChange={(e) => setLocalSettings({...localSettings, orgSlogan: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeCategory === 'SECURITY' && (
            <div className="animate-in fade-in duration-500 space-y-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight">Access Control & Security</h3>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Authentication Layers & Logic Barriers</p>
                </div>
              </div>

              <div className="space-y-6">
                <div 
                  onClick={() => toggle('twoFactorAuth')}
                  className={`flex items-center justify-between p-8 border rounded-[32px] cursor-pointer transition-all ${
                    localSettings.twoFactorAuth ? 'border-[#06A77D] bg-[#06A77D]/5' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      localSettings.twoFactorAuth ? 'bg-[#06A77D] text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Lock size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#0A2463] uppercase tracking-tight">Two-Factor Authentication (2FA)</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1">Mandatory verification for all administrative accounts.</p>
                    </div>
                  </div>
                  <div className={`w-14 h-8 rounded-full relative transition-colors ${localSettings.twoFactorAuth ? 'bg-[#06A77D]' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${localSettings.twoFactorAuth ? 'left-7' : 'left-1'}`} />
                  </div>
                </div>

                <div 
                  onClick={() => toggle('maintenanceMode')}
                  className={`flex items-center justify-between p-8 border rounded-[32px] cursor-pointer transition-all ${
                    localSettings.maintenanceMode ? 'border-[#FB8500] bg-[#FB8500]/5' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      localSettings.maintenanceMode ? 'bg-[#FB8500] text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Eye size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#0A2463] uppercase tracking-tight">Platform Maintenance Mode</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1">Lock terminal frontend from external student access.</p>
                    </div>
                  </div>
                  <div className={`w-14 h-8 rounded-full relative transition-colors ${localSettings.maintenanceMode ? 'bg-[#FB8500]' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${localSettings.maintenanceMode ? 'left-7' : 'left-1'}`} />
                  </div>
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-[32px] p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Activity size={18} className="text-[#0A2463]" />
                  <h4 className="text-[10px] font-black text-[#0A2463] uppercase tracking-widest">Recent Security Logs</h4>
                </div>
                <div className="space-y-3">
                  {securityLogs.map((log, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-bold text-gray-500 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                      <span className="uppercase">{log.event} by {log.user}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-300">{log.time}</span>
                        <span className="text-[#06A77D]">{log.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeCategory === 'NOTIFS' && (
            <div className="animate-in fade-in duration-500 space-y-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                  <Bell size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight">Transmission Hub</h3>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Alert Matrix & Signal Routing</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { id: 'systemAlerts', label: 'Critical System Alerts', desc: 'Hardware sync & server metrics.' },
                  { id: 'studentActivity', label: 'User Activity Feed', desc: 'Login attempts & course progress.' },
                  { id: 'eventRegistrations', label: 'Summit Registration', desc: 'New connections from Event Hub.' },
                ].map((pref) => (
                  <div 
                    key={pref.id}
                    onClick={() => toggle(`notif_${pref.id}`)}
                    className="p-8 bg-gray-50 border border-gray-100 rounded-[32px] flex flex-col gap-6 cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-[#0A2463]/5 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-[#0A2463] rounded-xl flex items-center justify-center text-white">
                        <Mail size={16} />
                      </div>
                      <div className={`w-10 h-6 rounded-full relative transition-colors ${localSettings.notificationPreferences[pref.id as keyof OrgSettings['notificationPreferences']] ? 'bg-[#06A77D]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${localSettings.notificationPreferences[pref.id as keyof OrgSettings['notificationPreferences']] ? 'left-5' : 'left-1'}`} />
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-[#0A2463] uppercase tracking-widest">{pref.label}</p>
                      <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tight">{pref.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeCategory === 'SYSTEM' && (
            <div className="animate-in fade-in duration-500 space-y-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                  <Cpu size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-[900] text-[#0A2463] uppercase tracking-tight">System Core Engine</h3>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Data Recalibration & Storage Management</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-[#F8F9FA] rounded-[32px] p-8 border border-gray-100">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">Database Synchronization Frequency</p>
                  <div className="flex flex-wrap gap-4">
                    {['Real-time', 'Hourly', 'Daily'].map((freq) => (
                      <button 
                        key={freq}
                        onClick={() => setLocalSettings({...localSettings, syncFrequency: freq as any})}
                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          localSettings.syncFrequency === freq 
                            ? 'bg-[#0A2463] text-white shadow-lg' 
                            : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button 
                    onClick={handleExportData}
                    className="flex items-center gap-6 p-8 border border-gray-100 rounded-[32px] text-left hover:bg-blue-50 hover:border-blue-100 transition-all group"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <FileJson size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#0A2463] uppercase tracking-tight">Export Entire Registry</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Download full system state backup.</p>
                    </div>
                  </button>
                  <button 
                    onClick={handleFactoryReset}
                    className="flex items-center gap-6 p-8 border border-red-50 rounded-[32px] text-left hover:bg-red-50 hover:border-red-100 transition-all group"
                  >
                    <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                      <Trash2 size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-red-600 uppercase tracking-tight">Factory Recalibration</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest text-red-400/50">Wipe current parameters.</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
