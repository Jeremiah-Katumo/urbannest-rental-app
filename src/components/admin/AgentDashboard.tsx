
import React from 'react';
import { User, House, Lead, Campaign } from '../../types';
import { 
  Users, Home, Megaphone, Target, 
  ArrowUpRight, ArrowDownRight, MousePointer2, 
  MessageSquare, Calendar, Filter, Search,
  TrendingUp, PieChart
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface AgentDashboardProps {
  currentUser: User;
  houses: House[];
  leads: Lead[];
  campaigns: Campaign[];
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ 
  currentUser, houses, leads, campaigns 
}) => {
  const myHouses = houses.filter(h => h.agentId === currentUser.id);
  const myLeads = leads.filter(l => myHouses.some(h => h.id === l.houseId));
  const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE');

  const stats = [
    { label: 'Active Leads', value: myLeads.length, change: '+18%', icon: Users, color: 'indigo' },
    { label: 'Managed Properties', value: myHouses.length, change: '0%', icon: Home, color: 'emerald' },
    { label: 'Conversion Rate', value: '12.4%', change: '+2.1%', icon: Target, color: 'purple' },
    { label: 'Ad Impressions', value: '45.2k', change: '+5.4%', icon: Megaphone, color: 'blue' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Agent <span className="text-indigo-600">Workspace</span></h1>
          <p className="text-slate-400 font-medium">Track leads, optimize campaigns, and manage your property listings.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all">Lead Reports</button>
          <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">New Campaign</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className={cn(
              "p-4 rounded-2xl",
              stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
              stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
              stat.color === 'purple' ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
            )}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
                <span className={cn("text-xs font-bold", stat.change.startsWith('+') ? "text-emerald-600" : "text-red-600")}>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lead Pipeline */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Lead Pipeline</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-indigo-600 transition-all"><Filter className="w-4 h-4"/></button>
              <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-indigo-600 transition-all"><Search className="w-4 h-4"/></button>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {myLeads.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs">No active leads</p>
              </div>
            ) : (
              myLeads.map(lead => (
                <div key={lead.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{lead.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Interested in {houses.find(h => h.id === lead.houseId)?.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                      lead.status === 'NEW' ? "bg-blue-50 text-blue-600" :
                      lead.status === 'QUALIFIED' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                    )}>
                      {lead.status}
                    </span>
                    <button className="p-3 bg-indigo-50 text-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Campaigns</h3>
            <PieChart className="w-5 h-5 text-slate-300" />
          </div>
          <div className="p-8 space-y-6">
            {activeCampaigns.map(c => (
              <div key={c.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-black text-slate-900">{c.name}</h4>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">${c.budget} Budget</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>65% Reach</span>
                  <span>1.2k Clicks</span>
                </div>
              </div>
            ))}
            <button className="w-full py-4 bg-slate-50 text-slate-600 font-black rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all text-xs uppercase tracking-widest">
              View All Campaigns
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
