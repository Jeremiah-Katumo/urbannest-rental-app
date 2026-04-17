
import React from 'react';
import { Plus, Megaphone, UserPlus, Search, Edit, Trash2 } from 'lucide-react';
import { User, House, Campaign } from '../../types';

interface ManagementTableProps {
  type: 'HOMES' | 'TENANTS' | 'LANDLORDS' | 'AGENTS' | 'CAMPAIGNS' | 'TRANSPORTERS' | 'USERS' | 'DELIVERY_REQUESTS';
  data: any[];
  title: string;
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onViewDetails?: (item: any) => void;
  onViewProperty?: (item: any) => void;
}

const ManagementTable: React.FC<ManagementTableProps> = ({
  type,
  data,
  title,
  onAdd,
  onEdit,
  onDelete,
  onViewDetails,
  onViewProperty
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">{title}</h2>
          <p className="text-slate-400 text-sm mt-1">Manage and update your records in real-time.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
        >
          {type === 'HOMES' ? <Plus className="w-5 h-5"/> : (type === 'CAMPAIGNS' ? <Megaphone className="w-5 h-5"/> : <UserPlus className="w-5 h-5"/>)}
          Add {type.slice(0, -1).toLowerCase()}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Details</th>
              {type === 'CAMPAIGNS' ? (
                <>
                  <th className="p-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Budget</th>
                  <th className="p-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Audience</th>
                </>
              ) : (
                <>
                  <th className="p-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">{type === 'HOMES' ? 'Pricing' : 'Contact'}</th>
                  <th className="p-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">{type === 'HOMES' ? 'Location' : 'Status'}</th>
                </>
              )}
              <th className="p-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    {item.images || item.avatar ? (
                      <img src={item.images ? item.images[0] : item.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" />
                    ) : <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Megaphone className="w-5 h-5"/></div>}
                    <div>
                      <p className="text-sm font-black text-slate-900">{item.title || item.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{item.email || item.type || item.description?.substring(0, 30) + "..."}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5 font-bold text-sm text-slate-700">
                  {item.price ? `$${item.price}` : (item.budget ? `$${item.budget}` : (item.phone || item.email))}
                </td>
                <td className="p-5">
                  {item.location || (
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      item.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status || (item.isAvailable ? 'Active' : 'Reserved')}
                    </span>
                  )}
                </td>
                <td className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {type === 'HOMES' && onViewProperty && (
                      <button 
                        onClick={() => onViewProperty(item)}
                        className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
                        title="View Property"
                      >
                        <Search className="w-4 h-4"/>
                      </button>
                    )}
                    {type !== 'HOMES' && type !== 'CAMPAIGNS' && onViewDetails && (
                      <button 
                        onClick={() => onViewDetails(item)}
                        className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                        title="View Details"
                      >
                        <Search className="w-4 h-4"/>
                      </button>
                    )}
                    <button 
                      onClick={() => onEdit(item)} 
                      className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      <Edit className="w-4 h-4"/>
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagementTable;
