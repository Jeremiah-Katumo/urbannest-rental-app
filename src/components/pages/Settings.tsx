
import React, { useState } from 'react';
import { User, Bell, Shield, Eye, Smartphone, LogOut, Save } from 'lucide-react';
import { User as UserType } from '../../types';

interface SettingsProps {
  user: UserType;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onLogout }) => {
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState({ name: user.name, email: user.email });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
        <p className="text-gray-500 mt-2">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-indigo-50" alt="" />
              <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg">
                <Save className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mt-1">{user.role}</p>
            <p className="text-xs text-gray-400 mt-2">Member since {user.joinedDate}</p>
          </div>

          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>

        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name} 
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 border-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={profile.email} 
                  onChange={e => setProfile({...profile, email: e.target.value})}
                  className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 border-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold">Preferences</h2>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-bold text-gray-900">Push Notifications</p>
                <p className="text-xs text-gray-500">Receive alerts about booking status and messages.</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-indigo-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${notifications ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold">Security</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <span className="font-bold text-gray-700">Change Password</span>
                </div>
                <Smartphone className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
