
import React from 'react';
import { User, Payment, House, Lease, Booking } from '../../types';
import { X, Mail, Phone, Calendar, DollarSign, Home, FileText, CheckCircle2, AlertCircle, Truck } from 'lucide-react';

interface UserDetailsModalProps {
  user: User;
  payments: Payment[];
  houses: House[];
  leases: Lease[];
  bookings: Booking[];
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, payments, houses, leases, bookings, onClose }) => {
  const userPayments = payments.filter(p => p.tenantId === user.id);
  const userHouses = houses.filter(h => h.ownerId === user.id || h.agentId === user.id);
  const userLeases = leases.filter(l => l.tenantId === user.id || l.landlordId === user.id);
  const userBookings = bookings.filter(b => b.tenantId === user.id);

  const totalPaid = userPayments.reduce((sum, p) => sum + (p.status === 'COMPLETED' ? p.amount : 0), 0);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-6">
            <img src={user.avatar} className="w-20 h-20 rounded-3xl border-4 border-white shadow-lg" alt={user.name} />
            <div>
              <h2 className="text-3xl font-black text-slate-900">{user.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-slate-400 hover:text-slate-600 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-600 text-white rounded-xl"><DollarSign className="w-4 h-4"/></div>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Total Financials</p>
              </div>
              <p className="text-2xl font-black text-slate-900">${totalPaid.toLocaleString()}</p>
              <p className="text-xs text-indigo-400 font-bold mt-1">Lifetime value</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-600 text-white rounded-xl"><Home className="w-4 h-4"/></div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Properties/Leases</p>
              </div>
              <p className="text-2xl font-black text-slate-900">{user.role === 'TENANT' ? userLeases.length : userHouses.length}</p>
              <p className="text-xs text-slate-400 font-bold mt-1">Active engagements</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-600 text-white rounded-xl"><Calendar className="w-4 h-4"/></div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Member Since</p>
              </div>
              <p className="text-2xl font-black text-slate-900">{new Date(user.joinedDate).toLocaleDateString()}</p>
              <p className="text-xs text-slate-400 font-bold mt-1">Loyalty status</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-600" /> Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</span>
                  <span className="text-sm font-black text-slate-900">{user.email}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</span>
                  <span className="text-sm font-black text-slate-900">{user.phone || 'Not provided'}</span>
                </div>
              </div>

              {user.role === 'TENANT' && (
                <>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 pt-4">
                    <FileText className="w-5 h-5 text-indigo-600" /> Active Leases
                  </h3>
                  <div className="space-y-3">
                    {userLeases.length === 0 ? (
                      <p className="text-sm text-slate-400 font-medium italic">No active leases found.</p>
                    ) : (
                      userLeases.map(l => (
                        <div key={l.id} className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between">
                          <div>
                            <p className="text-sm font-black text-slate-900">{houses.find(h => h.id === l.houseId)?.title}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{l.startDate} to {l.endDate}</p>
                          </div>
                          <span className="px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">{l.status}</span>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {(user.role === 'LANDLORD' || user.role === 'AGENT') && (
                <>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 pt-4">
                    <Home className="w-5 h-5 text-indigo-600" /> Managed Properties
                  </h3>
                  <div className="space-y-3">
                    {userHouses.length === 0 ? (
                      <p className="text-sm text-slate-400 font-medium italic">No properties managed.</p>
                    ) : (
                      userHouses.map(h => (
                        <div key={h.id} className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between">
                          <div>
                            <p className="text-sm font-black text-slate-900">{h.title}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{h.location}</p>
                          </div>
                          <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">${h.price}/mo</span>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {user.role === 'TRANSPORTER' && (
                <>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 pt-4">
                    <Truck className="w-5 h-5 text-indigo-600" /> Logistics Details
                  </h3>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Service Status</span>
                      <span className="text-sm font-black text-emerald-600">Verified Partner</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fleet Capacity</span>
                      <span className="text-sm font-black text-slate-900">Heavy Duty Truck</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Service Area</span>
                      <span className="text-sm font-black text-slate-900">Nationwide</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Payment History */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-indigo-600" /> Payment History
              </h3>
              <div className="space-y-3">
                {userPayments.length === 0 ? (
                  <p className="text-sm text-slate-400 font-medium italic">No payment records found.</p>
                ) : (
                  userPayments.map(p => (
                    <div key={p.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl ${p.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                          {p.status === 'COMPLETED' ? <CheckCircle2 className="w-4 h-4"/> : <AlertCircle className="w-4 h-4"/>}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">${p.amount.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.type} • {new Date(p.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.method}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4">
          <button onClick={onClose} className="px-8 py-4 bg-white text-slate-600 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">Close Details</button>
          <button 
            onClick={() => alert(`Generating comprehensive report for ${user.name}...`)}
            className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
