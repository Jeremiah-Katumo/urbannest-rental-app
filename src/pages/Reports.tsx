
import React from 'react';

const Reports: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
      <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-100">
        <h2 className="text-3xl font-black mb-4">Financial Overview</h2>
        <p className="text-indigo-100 font-medium mb-10">Total lease agreements processed this year.</p>
        <div className="flex items-end gap-2 mb-8">
          <span className="text-5xl font-black">$452,100</span>
          <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full mb-2">+18% YoY</span>
        </div>
        <div className="grid grid-cols-7 gap-2 items-end h-32">
          {[40, 60, 45, 90, 70, 85, 100].map((h, i) => (
            <div key={i} className="bg-white/30 rounded-t-lg transition-all hover:bg-white" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Lead Sources</h2>
          <p className="text-slate-400 font-medium">Where your tenants are coming from.</p>
        </div>
        <div className="space-y-6 my-10">
          {[
            { label: 'Google Search', pct: 65 },
            { label: 'Referrals', pct: 15 },
            { label: 'Direct Listings', pct: 20 }
          ].map((s, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-widest">
                <span>{s.label}</span>
                <span>{s.pct}%</span>
              </div>
              <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600" style={{ width: `${s.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
