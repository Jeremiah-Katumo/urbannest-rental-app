
import React, { useState } from 'react';
import { RoleDefinition, Permission, UserRole } from '../../types';
import { Shield, ShieldCheck, ShieldAlert, Plus, Edit, Trash2, X, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RolesPermissionsProps {
  roles: RoleDefinition[];
  permissions: Permission[];
  onUpdateRole: (role: RoleDefinition) => void;
  onAddRole: (role: Partial<RoleDefinition>) => void;
  onDeleteRole: (roleId: string) => void;
}

const RolesPermissions: React.FC<RolesPermissionsProps> = ({ roles, permissions, onUpdateRole, onAddRole, onDeleteRole }) => {
  const [isEditing, setIsEditing] = useState<RoleDefinition | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newRole, setNewRole] = useState<Partial<RoleDefinition>>({
    name: '',
    role: 'TENANT',
    permissions: []
  });

  const handleTogglePermission = (role: RoleDefinition | Partial<RoleDefinition>, permId: string, setter: any) => {
    const currentPerms = role.permissions || [];
    if (currentPerms.includes(permId)) {
      setter({ ...role, permissions: currentPerms.filter(id => id !== permId) });
    } else {
      setter({ ...role, permissions: [...currentPerms, permId] });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Roles & Permissions</h2>
          <p className="text-slate-400 font-medium">Define access levels and security protocols for different user types.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create New Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roles.map((role) => (
          <div key={role.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-4 rounded-2xl",
                  role.role === 'ADMIN' ? "bg-red-50 text-red-600" :
                  role.role === 'LANDLORD' ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                )}>
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{role.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{role.role}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setIsEditing(role)}
                  className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDeleteRole(role.id)}
                  className="p-2 bg-slate-50 text-slate-400 hover:text-red-600 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Granted Permissions</p>
              {role.permissions.map(permId => {
                const perm = permissions.find(p => p.id === permId);
                return (
                  <div key={permId} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {perm?.name}
                  </div>
                );
              })}
              {role.permissions.length === 0 && (
                <p className="text-xs text-slate-400 italic">No permissions assigned.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Role Editor Modal */}
      {(isEditing || isAdding) && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-slate-900">{isEditing ? 'Edit Role' : 'Create Role'}</h2>
              <button 
                onClick={() => { setIsEditing(null); setIsAdding(false); }} 
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"
              >
                <X className="w-6 h-6"/>
              </button>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Role Name</label>
                  <input 
                    value={isEditing ? isEditing.name : newRole.name} 
                    onChange={e => isEditing ? setIsEditing({...isEditing, name: e.target.value}) : setNewRole({...newRole, name: e.target.value})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" 
                    placeholder="e.g. Regional Manager"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base Type</label>
                  <select 
                    value={isEditing ? isEditing.role : newRole.role}
                    onChange={e => isEditing ? setIsEditing({...isEditing, role: e.target.value as UserRole}) : setNewRole({...newRole, role: e.target.value as UserRole})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold"
                  >
                    {['TENANT', 'LANDLORD', 'AGENT', 'ADMIN', 'SUPPORT', 'TRANSPORTER'].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {permissions.map(perm => (
                    <button
                      key={perm.id}
                      onClick={() => isEditing 
                        ? handleTogglePermission(isEditing, perm.id, setIsEditing)
                        : handleTogglePermission(newRole, perm.id, setNewRole)
                      }
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between",
                        (isEditing ? isEditing.permissions : newRole.permissions)?.includes(perm.id)
                          ? "border-indigo-600 bg-indigo-50/50"
                          : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div>
                        <p className="text-sm font-black text-slate-900">{perm.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{perm.module}</p>
                      </div>
                      {(isEditing ? isEditing.permissions : newRole.permissions)?.includes(perm.id) && (
                        <Check className="w-5 h-5 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  if (isEditing) onUpdateRole(isEditing);
                  else onAddRole(newRole);
                  setIsEditing(null);
                  setIsAdding(false);
                }}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all text-lg"
              >
                {isEditing ? 'Save Changes' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermissions;
