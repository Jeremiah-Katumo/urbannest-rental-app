
import React from 'react';
import { User, House, Payment, Lease, MaintenanceRequest, Booking } from '../../types';
import { 
  TrendingUp, Users, Home, DollarSign, 
  AlertCircle, CheckCircle2, Clock, ArrowUpRight,
  ArrowDownRight, BarChart3, PieChart, Activity
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface LandlordDashboardProps {
  currentUser: User;
  houses: House[];
  payments: Payment[];
  leases: Lease[];
  maintenance: MaintenanceRequest[];
  bookings: Booking[];
}

const LandlordDashboard: React.FC<LandlordDashboardProps> = ({ 
  currentUser, houses, payments, leases, maintenance, bookings 
}) => {
  const myHouses = houses.filter(h => h.ownerId === currentUser.id);
  const myHouseIds = myHouses.map(h => h.id);
  const myPayments = payments.filter(p => {
    const booking = bookings.find(b => b.id === p.bookingId);
    return booking && myHouseIds.includes(booking.houseId);
  });
  
  const totalRevenue = myPayments.reduce((sum, p) => sum + p.amount, 0);
  const activeLeases = leases.filter(l => myHouseIds.includes(l.houseId) && l.status === 'SIGNED');
  const pendingMaintenance = maintenance.filter(m => myHouseIds.includes(m.houseId) && m.status !== 'RESOLVED');

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+12.5%', icon: DollarSign, color: 'emerald' },
    { label: 'Occupancy', value: `${myHouses.length > 0 ? Math.round((activeLeases.length / myHouses.length) * 100) : 0}%`, change: '+3.1%', icon: Home, color: 'indigo' },
    { label: 'Active Tenants', value: activeLeases.length, change: '+2', icon: Users, color: 'blue' },
    { label: 'Open Issues', value: pendingMaintenance.length, change: '-1', icon: AlertCircle, color: 'amber' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Landlord <span className="text-indigo-600">Console</span></h1>
          <p className="text-slate-400 font-medium">Manage your property portfolio and maximize your rental yields.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all">Export Report</button>
          <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Add Property</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className={cn(
              "p-4 rounded-2xl",
              stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
              stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
              stat.color === 'blue' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
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
        {/* Recent Payments */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Recent Rent Collections</h3>
            <BarChart3 className="w-5 h-5 text-slate-300" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Tenant</th>
                  <th className="p-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Amount</th>
                  <th className="p-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                  <th className="p-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {myPayments.slice(0, 5).map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-[10px]">
                          {p.tenantId.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-slate-700">Tenant #{p.tenantId.slice(-4)}</span>
                      </div>
                    </td>
                    <td className="p-5 text-sm font-black text-slate-900">${p.amount}</td>
                    <td className="p-5">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-5 text-xs font-bold text-slate-400">{new Date(p.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Maintenance Overview */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Maintenance</h3>
            <Activity className="w-5 h-5 text-slate-300" />
          </div>
          <div className="p-8 space-y-6">
            {pendingMaintenance.length === 0 ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-100 mx-auto mb-4" />
                <p className="text-slate-400 font-bold">All clear! No pending issues.</p>
              </div>
            ) : (
              pendingMaintenance.map(m => (
                <div key={m.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-black text-slate-900">{m.title}</h4>
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest",
                      m.priority === 'URGENT' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                    )}>
                      {m.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2">{m.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.status}</span>
                    <button className="text-[10px] font-black text-indigo-600 hover:underline">Manage</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
