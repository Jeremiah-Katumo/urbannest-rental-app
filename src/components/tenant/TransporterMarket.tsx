import React from 'react';
import { Transporter, User } from '../../types';
import { 
  Truck, Star, Phone, Mail, CheckCircle2, 
  MapPin, Clock, DollarSign, ArrowRight,
  ShieldCheck, Package, Search
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface TransporterMarketProps {
  transporters: Transporter[];
  currentUser: User;
  onHire: (transporterId: string) => void;
}

const TransporterMarket: React.FC<TransporterMarketProps> = ({ transporters, currentUser, onHire }) => {
  const [search, setSearch] = React.useState('');
  const [vehicleFilter, setVehicleFilter] = React.useState('All');

  const filteredTransporters = transporters.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.vehicleType.toLowerCase().includes(search.toLowerCase());
    const matchesVehicle = vehicleFilter === 'All' || t.vehicleType === vehicleFilter;
    return matchesSearch && matchesVehicle;
  });

  const vehicleTypes = ['All', ...new Set(transporters.map(t => t.vehicleType))];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Moving & Logistics</h2>
          <p className="text-slate-400 font-medium">Professional transporters to help you move to your new home seamlessly.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search movers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-64 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
            {vehicleTypes.map(type => (
              <button
                key={type}
                onClick={() => setVehicleFilter(type)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  vehicleFilter === type ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTransporters.map((transporter) => (
          <div key={transporter.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 overflow-hidden border border-slate-100">
                    <img src={transporter.avatar} alt={transporter.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{transporter.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-black">{transporter.rating}</span>
                    </div>
                  </div>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                  transporter.status === 'AVAILABLE' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                )}>
                  {transporter.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vehicle</p>
                  <p className="text-sm font-black text-slate-700 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-indigo-600" />
                    {transporter.vehicleType}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Base Price</p>
                  <p className="text-sm font-black text-slate-700 flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    {transporter.basePrice}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Verified Professional</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Goods in Transit Insurance</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                  <Package className="w-4 h-4 text-emerald-500" />
                  <span>Packing Services Included</span>
                </div>
              </div>

              <button 
                onClick={() => onHire(transporter.id)}
                className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all group/btn"
              >
                Book Moving Service
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Moving Tips */}
      <div className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100 flex flex-wrap items-center justify-between gap-8">
        <div className="max-w-xl">
          <h3 className="text-2xl font-black text-slate-900 mb-2">Moving to a new home?</h3>
          <p className="text-slate-600 font-medium">Get a 10% discount on your first move when you book through UrbanNest. Our partners are vetted for safety and reliability.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Avg. Time</p>
              <p className="text-lg font-black text-slate-900">3-5 Hours</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Insurance</p>
              <p className="text-lg font-black text-slate-900">Full Cover</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransporterMarket;
