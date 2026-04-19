
import React from 'react';
import { Plus, Megaphone, UserPlus, Search, Edit, Trash2 } from 'lucide-react';
import { User, House, Campaign, SubscriptionPlan } from '../../types';


type ManagementTypeMap = {
  HOMES: House;
  TENANTS: User;
  LANDLORDS: User;
  AGENTS: User;
  TRANSPORTERS: User;
  USERS: User;
  CAMPAIGNS: Campaign;
  SUBSCRIPTION_PLANS: SubscriptionPlan;
  DELIVERY_REQUESTS: {
    id: string;
    name: string;
    type: string;
    status: string;
    price: number;
    date: string;
  };
}

interface ManagementTableProps<T extends keyof ManagementTypeMap> {
  type: T;
  data: ManagementTypeMap[T][];
  title: string;

  onAdd: () => void;
  onEdit: (item: ManagementTypeMap[T]) => void;
  onDelete: (id: string) => void;

  onViewDetails?: (item: ManagementTypeMap[T]) => void;
  onViewProperty?: (item: ManagementTypeMap[T]) => void;
}

const ManagementTable = <T extends keyof ManagementTypeMap>({
  type,
  data,
  title,
  onAdd,
  onEdit,
  onDelete,
  onViewDetails,
  onViewProperty
}: ManagementTableProps<T>) => {

  const isHouse = (item: any): item is House =>
    'location' in item && 'price' in item;

  const isUser = (item: any): item is User =>
    'email' in item && 'role' in item;

  const isCampaign = (item: any): item is Campaign =>
    'budget' in item;

  const isSubscriptionPlan = (item: any): item is SubscriptionPlan =>
    'features' in item;

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
          {type === 'HOMES' ? <Plus className="w-5 h-5" /> : (type === 'CAMPAIGNS' ? <Megaphone className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />)}
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
                    {isHouse(item) && item.images ? (
                      <img src={item.images[0]} className="w-12 h-12 rounded-2xl object-cover shadow-sm" title='Item Image' />
                    ) : isUser(item) && item.avatar ? (
                      <img src={item.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" title='Item Image' />
                    ) : <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Megaphone className="w-5 h-5" /></div>}
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {isHouse(item)
                          ? item.title
                          : isUser(item)
                            ? item.name
                            : isCampaign(item)
                              ? item.name
                              : ''}
                      </p>
                      <p className="text-xs text-slate-400 font-medium">
                        {isUser(item)
                          ? item.email
                          : isCampaign(item)
                            ? item.description?.slice(0, 30) + "..."
                            : 'type' in item
                              ? item.type
                              : ''}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-5 font-bold text-sm text-slate-700">
                  {isHouse(item)
                    ? `$${item.price}`
                    : isCampaign(item)
                      ? `$${item.budget}`
                      : isUser(item)
                        ? item.phone || item.email
                        : ''}
                </td>
                <td className="p-5">
                  {isHouse(item) ? (
                    item.location
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${'status' in item && item.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {'status' in item
                        ? item.status
                        : 'isAvailable' in item
                          ? item.isAvailable
                            ? 'Active'
                            : 'Reserved'
                          : ''}
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
                        <Search className="w-4 h-4" />
                      </button>
                    )}
                    {type !== 'HOMES' && type !== 'CAMPAIGNS' && onViewDetails && (
                      <button
                        onClick={() => onViewDetails(item)}
                        className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                        title="View Details"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      title='Edit'
                      onClick={() => onEdit(item)}
                      className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      title='Delete'
                      onClick={() => onDelete(item.id)}
                      className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
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
