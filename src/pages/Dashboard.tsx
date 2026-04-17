
import React from 'react';
import { DollarSign, TrendingUp, Home, AlertCircle, Activity } from 'lucide-react';
import { User, House, Booking, Payment, Lease, MaintenanceRequest, Campaign, Transporter } from '../types';
import LandlordDashboard from '../components/admin/LandlordDashboard';
import AgentDashboard from '../components/admin/AgentDashboard';
import TransporterDashboard from '../components/admin/TransporterDashboard';

interface DashboardProps {
  currentUser: User | null;
  houses: House[];
  payments: Payment[];
  leases: Lease[];
  maintenance: MaintenanceRequest[];
  bookings: Booking[];
  leads: any[];
  campaigns: Campaign[];
  transporters: Transporter[];
  users: User[];
  navigate: (path: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  houses,
  payments,
  leases,
  maintenance,
  bookings,
  leads,
  campaigns,
  transporters,
  users,
  navigate
}) => {
  if (currentUser?.role === 'LANDLORD') {
    return <LandlordDashboard currentUser={currentUser} houses={houses} payments={payments} leases={leases} maintenance={maintenance} bookings={bookings} />;
  }

  if (currentUser?.role === 'AGENT') {
    return <AgentDashboard currentUser={currentUser} houses={houses} leads={leads} campaigns={campaigns} />;
  }

  if (currentUser?.role === 'TRANSPORTER') {
    return <TransporterDashboard currentUser={currentUser} transporters={transporters} payments={payments} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$128,430', change: '+12.5%', icon: DollarSign, color: 'indigo' },
          { label: 'Occupancy Rate', value: '94.2%', change: '+3.1%', icon: TrendingUp, color: 'green' },
          { label: 'Active Listings', value: houses.length, change: '0%', icon: Home, color: 'slate' },
          { label: 'Support Tickets', value: '14', change: '-4', icon: AlertCircle, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl`}><stat.icon className="w-6 h-6"/></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className={`text-xs font-bold mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : stat.change === '0%' ? 'text-slate-400' : 'text-red-600'}`}>{stat.change} <span className="text-slate-300 font-normal">from last month</span></p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Recent Applications</h3>
            <button onClick={() => navigate('/dashboard')} className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {bookings.length === 0 ? (
              <div className="p-12 text-center text-slate-400"><p className="font-bold">No recent activity</p></div>
            ) : (
              bookings.slice(0, 5).map(b => (
                <div key={b.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={users.find(u => u.id === b.tenantId)?.avatar} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{users.find(u => u.id === b.tenantId)?.name}</p>
                      <p className="text-xs text-slate-400">Request for {houses.find(h => h.id === b.houseId)?.title}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Platform Activity</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Activity className="w-4 h-4"/></div>
          </div>
          <div className="p-6 space-y-6">
            {[
              { label: 'Properties Viewed', val: 12050, color: 'indigo', pct: 85 },
              { label: 'Active Enquiries', val: 420, color: 'amber', pct: 45 },
              { label: 'Successful Matches', val: 89, color: 'green', pct: 60 }
            ].map((act, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">{act.label}</span>
                  <span className="text-slate-900">{act.val.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full bg-${act.color}-500`} style={{ width: `${act.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
