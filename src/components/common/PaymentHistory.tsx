import React, { useState } from 'react';
import { Payment, User, Booking, House } from '../../types';
import { 
  DollarSign, CreditCard, Smartphone, CheckCircle2, 
  Clock, AlertCircle, Download, ArrowUpRight, ArrowDownLeft,
  Filter, Search, Receipt
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

interface PaymentHistoryProps {
  payments: Payment[];
  currentUser: User;
  bookings: Booking[];
  houses: House[];
  onSimulatePayment?: (bookingId: string, amount: number) => void;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments, currentUser, bookings, houses, onSimulatePayment }) => {
  const [filter, setFilter] = useState<'ALL' | 'RENT' | 'DEPOSIT' | 'COMMISSION'>('ALL');

  const filteredPayments = payments.filter(p => {
    if (filter !== 'ALL' && p.type !== filter) return false;
    // If not admin, only show user's own payments or payments for their houses
    if (currentUser.role === 'ADMIN') return true;
    if (currentUser.role === 'TENANT') return p.tenantId === currentUser.id;
    if (currentUser.role === 'LANDLORD' || currentUser.role === 'AGENT') {
      const booking = bookings.find(b => b.id === p.bookingId);
      const house = houses.find(h => h.id === booking?.houseId);
      return house?.ownerId === currentUser.id || house?.agentId === currentUser.id;
    }
    return false;
  });

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'COMPLETED': return 'text-emerald-600 bg-emerald-50';
      case 'PENDING': return 'text-amber-600 bg-amber-50';
      case 'FAILED': return 'text-rose-600 bg-rose-50';
      case 'REFUNDED': return 'text-slate-600 bg-slate-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getMethodIcon = (method: Payment['method']) => {
    switch (method) {
      case 'MPESA': return <Smartphone className="w-4 h-4" />;
      case 'CARD': return <CreditCard className="w-4 h-4" />;
      case 'BANK': return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Financial Ledger</h2>
          <p className="text-slate-400 font-medium">Track all transactions, rent payments, and commissions.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {(['ALL', 'RENT', 'DEPOSIT', 'COMMISSION'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                filter === t ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue</p>
          <h3 className="text-3xl font-black text-slate-900">
            ${filteredPayments.reduce((acc, p) => p.status === 'COMPLETED' ? acc + p.amount : acc, 0).toLocaleString()}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Successful</p>
          <h3 className="text-3xl font-black text-slate-900">
            {filteredPayments.filter(p => p.status === 'COMPLETED').length}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Pending</p>
          <h3 className="text-3xl font-black text-slate-900">
            {filteredPayments.filter(p => p.status === 'PENDING').length}
          </h3>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-6">
                    <span className="font-mono text-xs font-bold text-slate-400">#{payment.id}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-sm font-bold text-slate-700">{format(new Date(payment.date), 'MMM dd, yyyy')}</span>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                      payment.type === 'RENT' ? "bg-blue-50 text-blue-600" : 
                      payment.type === 'DEPOSIT' ? "bg-purple-50 text-purple-600" : "bg-orange-50 text-orange-600"
                    )}>
                      {payment.type}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                      {getMethodIcon(payment.method)}
                      {payment.method}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-base font-black text-slate-900">${payment.amount.toLocaleString()}</span>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 w-fit",
                      getStatusColor(payment.status)
                    )}>
                      {payment.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3" />}
                      {payment.status === 'PENDING' && <Clock className="w-3 h-3" />}
                      {payment.status === 'FAILED' && <AlertCircle className="w-3 h-3" />}
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <button 
                      onClick={() => alert(`Downloading receipt for transaction #${payment.id}...`)}
                      className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-indigo-600"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Receipt className="w-16 h-16 text-slate-100" />
                      <p className="text-slate-400 font-bold">No transactions found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
