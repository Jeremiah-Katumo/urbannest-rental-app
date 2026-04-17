
import React from 'react';
import { User, Transporter, Payment } from '../../types';
import { Truck, DollarSign, Star, Clock, MapPin, CheckCircle2, AlertCircle, TrendingUp, Package } from 'lucide-react';

interface TransporterDashboardProps {
  currentUser: User;
  transporters: Transporter[];
  payments: Payment[];
}

const TransporterDashboard: React.FC<TransporterDashboardProps> = ({ currentUser, transporters, payments }) => {
  const [transporterProfile, setTransporterProfile] = React.useState(
    transporters.find(t => t.email === currentUser.email) || transporters[0]
  );
  const [activeJobs, setActiveJobs] = React.useState([
    { id: 1025, from: 'Downtown', to: 'Suburban Hills', fee: 120, status: 'PENDING' },
    { id: 1026, from: 'University Quarter', to: 'City Center', fee: 85, status: 'PENDING' }
  ]);

  const handleToggleStatus = () => {
    const newStatus = transporterProfile.status === 'AVAILABLE' ? 'BUSY' : 'AVAILABLE';
    setTransporterProfile({ ...transporterProfile, status: newStatus as any });
    alert(`Status updated to ${newStatus}`);
  };

  const handleJobAction = (jobId: number, action: 'ACCEPT' | 'DECLINE') => {
    if (action === 'ACCEPT') {
      setActiveJobs(prev => prev.filter(j => j.id !== jobId));
      alert(`Job #${jobId} accepted! Navigation started.`);
    } else {
      setActiveJobs(prev => prev.filter(j => j.id !== jobId));
      alert(`Job #${jobId} declined.`);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Logistics <span className="text-indigo-600">Dashboard</span></h1>
          <p className="text-slate-400 font-medium mt-2">Manage your fleet, track earnings, and view delivery requests.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${transporterProfile.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {transporterProfile.status}
          </div>
          <button 
            onClick={handleToggleStatus}
            className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all"
          >
            Toggle Status
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Earnings', value: '$3,450', change: '+8.2%', icon: DollarSign, color: 'indigo' },
          { label: 'Completed Jobs', value: '42', change: '+5', icon: CheckCircle2, color: 'green' },
          { label: 'Average Rating', value: transporterProfile.rating, change: 'Top 5%', icon: Star, color: 'amber' },
          { label: 'Pending Requests', value: '3', change: 'Action required', icon: Clock, color: 'slate' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl`}><stat.icon className="w-6 h-6"/></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Jobs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Active Delivery Requests</h3>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Package className="w-5 h-5"/></div>
            </div>
            <div className="divide-y divide-slate-50">
              {activeJobs.map(job => (
                <div key={job.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400"><Truck className="w-6 h-6"/></div>
                    <div>
                      <p className="text-sm font-black text-slate-900">Moving Request #{job.id}</p>
                      <p className="text-xs text-slate-400 font-medium">From: {job.from} • To: {job.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900">${job.fee.toFixed(2)}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Estimated Fee</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleJobAction(job.id, 'ACCEPT')}
                        className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleJobAction(job.id, 'DECLINE')}
                        className="px-4 py-2 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {activeJobs.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-slate-400 font-bold">No active requests at the moment.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <h3 className="text-xl font-black text-slate-900 mb-6">Earnings Trend</h3>
            <div className="h-48 flex items-end gap-3">
              {[30, 50, 40, 70, 90, 60, 80, 100, 85, 95, 75, 110].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-100 rounded-t-lg hover:bg-indigo-600 transition-all group relative" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${h * 5}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Jan</span><span>Jun</span><span>Dec</span>
            </div>
          </div>
        </div>

        {/* Fleet & Profile */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-100">
            <div className="flex items-center gap-4 mb-6">
              <img src={transporterProfile.avatar} className="w-16 h-16 rounded-2xl border-2 border-white/20" alt="" />
              <div>
                <h4 className="text-lg font-black">{transporterProfile.name}</h4>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">{transporterProfile.vehicleType} Operator</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-2xl">
                <span className="text-xs font-bold text-indigo-200">Base Price</span>
                <span className="font-black">${transporterProfile.basePrice}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-2xl">
                <span className="text-xs font-bold text-indigo-200">Price per KM</span>
                <span className="font-black">${transporterProfile.pricePerKm}</span>
              </div>
              <button 
                onClick={() => alert('Fleet details editor opening...')}
                className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all"
              >
                Edit Fleet Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <h3 className="text-lg font-black text-slate-900 mb-6">Recent Reviews</h3>
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${s <= 4 ? 'fill-current' : ''}`} />)}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">2 days ago</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium italic">"Great service, very careful with my furniture. Highly recommended!"</p>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">— Sarah J.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransporterDashboard;
