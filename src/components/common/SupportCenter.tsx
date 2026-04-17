import React, { useState } from 'react';
import { SupportIssue, User } from '../../types';
import { 
  LifeBuoy, Plus, Search, Filter, MessageSquare, 
  Clock, CheckCircle2, AlertCircle, ShieldAlert,
  ChevronRight, MoreVertical, User as UserIcon
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

interface SupportCenterProps {
  issues: SupportIssue[];
  currentUser: User;
  onAddIssue: (issue: Partial<SupportIssue>) => void;
  onUpdateStatus: (issueId: string, status: SupportIssue['status']) => void;
}

const SupportCenter: React.FC<SupportCenterProps> = ({ issues, currentUser, onAddIssue, onUpdateStatus }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newIssue, setNewIssue] = useState<Partial<SupportIssue>>({
    subject: '',
    description: '',
    category: 'MAINTENANCE',
    priority: 'MEDIUM'
  });

  const filteredIssues = issues.filter(i => {
    if (currentUser.role === 'ADMIN' || currentUser.role === 'SUPPORT') return true;
    return i.userId === currentUser.id;
  });

  const getPriorityColor = (priority: SupportIssue['priority']) => {
    switch (priority) {
      case 'URGENT': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'MEDIUM': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'LOW': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    }
  };

  const getStatusIcon = (status: SupportIssue['status']) => {
    switch (status) {
      case 'OPEN': return <Clock className="w-4 h-4" />;
      case 'IN_PROGRESS': return <Activity className="w-4 h-4" />;
      case 'RESOLVED': return <CheckCircle2 className="w-4 h-4" />;
      case 'CLOSED': return <ShieldAlert className="w-4 h-4" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddIssue(newIssue);
    setIsAdding(false);
    setNewIssue({ subject: '', description: '', category: 'MAINTENANCE', priority: 'MEDIUM' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Support Center</h2>
          <p className="text-slate-400 font-medium">Report issues, request maintenance, or get help with your account.</p>
        </div>
        
        {currentUser.role === 'TENANT' && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
          >
            <Plus className="w-5 h-5" />
            New Request
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Issue List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredIssues.map((issue) => (
            <div key={issue.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    issue.status === 'RESOLVED' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                  )}>
                    {getStatusIcon(issue.status)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{issue.subject}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      {issue.category} • {format(new Date(issue.createdAt), 'MMM dd, HH:mm')}
                    </p>
                  </div>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-black border",
                  getPriorityColor(issue.priority)
                )}>
                  {issue.priority}
                </span>
              </div>
              
              <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2">{issue.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <UserIcon className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    {issue.assignedTo ? `Assigned to Support` : 'Awaiting Assignment'}
                  </span>
                </div>
                
                {(currentUser.role === 'ADMIN' || currentUser.role === 'SUPPORT') && issue.status !== 'RESOLVED' && (
                  <button 
                    onClick={() => onUpdateStatus(issue.id, 'RESOLVED')}
                    className="text-emerald-600 text-xs font-black uppercase tracking-widest hover:underline"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredIssues.length === 0 && (
            <div className="bg-white p-20 rounded-[3rem] border border-dashed border-slate-200 text-center">
              <div className="flex flex-col items-center gap-4">
                <LifeBuoy className="w-16 h-16 text-slate-100" />
                <p className="text-slate-400 font-bold">No support requests found.</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200">
            <h3 className="text-xl font-black mb-2">Need Immediate Help?</h3>
            <p className="text-indigo-100 text-sm font-medium mb-6">Our support team is available 24/7 for urgent maintenance issues.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Emergency Line</p>
                  <p className="font-bold">+254 700 000 000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-4">Common Topics</h3>
            <div className="space-y-3">
              {['Payment Issues', 'Lease Renewal', 'Maintenance Policy', 'Moving Out'].map((topic) => (
                <button key={topic} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group">
                  <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600">{topic}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Issue Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">New Support Request</h3>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Subject</label>
                <input 
                  required
                  value={newIssue.subject}
                  onChange={e => setNewIssue({...newIssue, subject: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700"
                  placeholder="What's the issue?"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Category</label>
                  <select 
                    value={newIssue.category}
                    onChange={e => setNewIssue({...newIssue, category: e.target.value as any})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700"
                  >
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="PAYMENT">Payment</option>
                    <option value="ACCOUNT">Account</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Priority</label>
                  <select 
                    value={newIssue.priority}
                    onChange={e => setNewIssue({...newIssue, priority: e.target.value as any})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Description</label>
                <textarea 
                  required
                  rows={4}
                  value={newIssue.description}
                  onChange={e => setNewIssue({...newIssue, description: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700 resize-none"
                  placeholder="Describe the problem in detail..."
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Fixed: Added Activity and X to the imports from lucide-react
import { Activity, X } from 'lucide-react';

export default SupportCenter;
