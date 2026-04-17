
import React, { useState } from 'react';
import { User, Announcement, UserRole } from '../../types';
import { Megaphone, Plus, Calendar, ShieldAlert, CheckCircle2, Filter, Send, X } from 'lucide-react';

interface CommunicationCenterProps {
  currentUser: User;
  announcements: Announcement[];
  onAddAnnouncement: (announcement: Partial<Announcement>) => void;
}

const CommunicationCenter: React.FC<CommunicationCenterProps> = ({ currentUser, announcements, onAddAnnouncement }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    targetRoles: [],
    priority: 'NORMAL'
  });

  const canPost = ['ADMIN', 'LANDLORD', 'AGENT'].includes(currentUser.role);
  
  const filteredAnnouncements = announcements.filter(a => 
    a.targetRoles.includes(currentUser.role) || a.senderId === currentUser.id || currentUser.role === 'ADMIN'
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleToggleRole = (role: UserRole) => {
    const current = newAnnouncement.targetRoles || [];
    if (current.includes(role)) {
      setNewAnnouncement({ ...newAnnouncement, targetRoles: current.filter(r => r !== role) });
    } else {
      setNewAnnouncement({ ...newAnnouncement, targetRoles: [...current, role] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAnnouncement(newAnnouncement);
    setIsAdding(false);
    setNewAnnouncement({ title: '', content: '', targetRoles: [], priority: 'NORMAL' });
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Communication <span className="text-indigo-600">Center</span></h1>
          <p className="text-slate-400 font-medium mt-2">Stay updated with the latest news and announcements from UrbanNest.</p>
        </div>
        {canPost && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Post Announcement
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
            <Megaphone className="w-16 h-16 mx-auto mb-4 text-slate-200" />
            <p className="text-xl font-black text-slate-400">No announcements yet.</p>
          </div>
        ) : (
          filteredAnnouncements.map(a => (
            <div key={a.id} className={`bg-white p-8 rounded-[2.5rem] border shadow-sm relative overflow-hidden group transition-all hover:shadow-md ${a.priority === 'URGENT' ? 'border-red-100' : 'border-slate-100'}`}>
              {a.priority === 'URGENT' && (
                <div className="absolute top-0 right-0 px-6 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                  Urgent
                </div>
              )}
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl shrink-0 ${a.priority === 'URGENT' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  <Megaphone className="w-6 h-6" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{a.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {new Date(a.timestamp).toLocaleDateString()}
                      </p>
                      <div className="flex gap-1">
                        {a.targetRoles.map(role => (
                          <span key={role} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[8px] font-black uppercase tracking-widest">{role}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">{a.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-slate-900">Post Announcement</h2>
              <button onClick={() => setIsAdding(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"><X className="w-6 h-6"/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                <input 
                  placeholder="Important Update..." 
                  value={newAnnouncement.title} 
                  onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Content</label>
                <textarea 
                  placeholder="Write your message here..." 
                  value={newAnnouncement.content}
                  onChange={e => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold min-h-[150px]" 
                  required 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Audience</label>
                <div className="flex flex-wrap gap-2">
                  {(['TENANT', 'LANDLORD', 'AGENT', 'TRANSPORTER', 'SUPPORT'] as UserRole[]).map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleToggleRole(role)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        newAnnouncement.targetRoles?.includes(role)
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="urgent" 
                    checked={newAnnouncement.priority === 'URGENT'}
                    onChange={e => setNewAnnouncement({...newAnnouncement, priority: e.target.checked ? 'URGENT' : 'NORMAL'})}
                    className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="urgent" className="text-sm font-bold text-slate-700">Mark as Urgent</label>
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all text-lg flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Publish Announcement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationCenter;
