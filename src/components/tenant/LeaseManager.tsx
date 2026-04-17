import React from 'react';
import { Lease, User, House } from '../../types';
import { 
  FileText, Download, PenTool, Calendar, 
  CheckCircle2, Clock, AlertCircle, ShieldCheck,
  FileCheck, FileSignature, ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

interface LeaseManagerProps {
  leases: Lease[];
  currentUser: User;
  houses: House[];
  onSignLease: (leaseId: string) => void;
}

const LeaseManager: React.FC<LeaseManagerProps> = ({ leases, currentUser, houses, onSignLease }) => {
  const filteredLeases = leases.filter(l => {
    if (currentUser.role === 'ADMIN') return true;
    if (currentUser.role === 'TENANT') return l.tenantId === currentUser.id;
    if (currentUser.role === 'LANDLORD') return l.landlordId === currentUser.id;
    return false;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Lease Agreements</h2>
          <p className="text-slate-400 font-medium">Manage your digital rental contracts, e-signatures, and renewals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredLeases.map((lease) => {
          const house = houses.find(h => h.id === lease.houseId);
          return (
            <div key={lease.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 overflow-hidden border border-slate-100">
                    <img src={house?.images[0]} alt={house?.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{house?.title}</h3>
                    <p className="text-slate-400 font-bold text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Contract ID: <span className="font-mono">#{lease.id}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                    <p className="text-sm font-black text-slate-700">
                      {format(new Date(lease.startDate), 'MMM yyyy')} - {format(new Date(lease.endDate), 'MMM yyyy')}
                    </p>
                  </div>
                  <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Rent</p>
                    <p className="text-sm font-black text-indigo-600">${lease.rentAmount.toLocaleString()}</p>
                  </div>
                  <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg",
                      lease.status === 'SIGNED' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {lease.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    Legally Binding
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                    <FileCheck className="w-5 h-5 text-emerald-500" />
                    Verified by UrbanNest
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => alert(`Downloading PDF for contract #${lease.id}...`)}
                    className="px-6 py-4 rounded-2xl font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                  {lease.status === 'DRAFT' && currentUser.role === 'TENANT' && (
                    <button 
                      onClick={() => onSignLease(lease.id)}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                    >
                      <FileSignature className="w-5 h-5" />
                      E-Sign Agreement
                    </button>
                  )}
                  {lease.status === 'SIGNED' && (
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-sm px-6 py-4 bg-emerald-50 rounded-2xl">
                      <CheckCircle2 className="w-5 h-5" />
                      Signed on {format(new Date(lease.signedAt!), 'MMM dd, yyyy')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredLeases.length === 0 && (
          <div className="bg-white p-20 rounded-[3rem] border border-dashed border-slate-200 text-center">
            <div className="flex flex-col items-center gap-4">
              <FileText className="w-16 h-16 text-slate-100" />
              <p className="text-slate-400 font-bold">No lease agreements found.</p>
            </div>
          </div>
        )}
      </div>

      {/* Lease Renewal Info */}
      <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-wrap items-center justify-between gap-8">
        <div className="max-w-xl">
          <h3 className="text-2xl font-black mb-2">Lease Renewal Process</h3>
          <p className="text-slate-400 font-medium">UrbanNest automates the renewal process. You'll receive a notification 60 days before your lease expires to discuss terms or renew.</p>
        </div>
        <button 
          onClick={() => alert('Redirecting to lease renewal documentation...')}
          className="bg-white text-slate-900 px-8 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-indigo-400 hover:text-white transition-all"
        >
          Learn More
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LeaseManager;
