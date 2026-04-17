
import React, { useState } from 'react';
import { CustomField } from '../../types';
import { Settings2, Plus, Trash2, Edit, X, Database, Layout, UserSquare, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CustomFieldsManagerProps {
  fields: CustomField[];
  onAddField: (field: Partial<CustomField>) => void;
  onDeleteField: (fieldId: string) => void;
}

const CustomFieldsManager: React.FC<CustomFieldsManagerProps> = ({ fields, onAddField, onDeleteField }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newField, setNewField] = useState<Partial<CustomField>>({
    name: '',
    label: '',
    type: 'text',
    entity: 'HOUSE',
    options: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddField(newField);
    setIsAdding(false);
    setNewField({ name: '', label: '', type: 'text', entity: 'HOUSE', options: [] });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Custom Fields</h2>
          <p className="text-slate-400 font-medium">Extend platform entities with your own data structures and values.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Define New Field
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {['HOUSE', 'USER', 'BOOKING'].map((entity) => {
          const entityFields = fields.filter(f => f.entity === entity);
          return (
            <div key={entity} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                  {entity === 'HOUSE' ? <Layout className="w-6 h-6" /> :
                   entity === 'USER' ? <UserSquare className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{entity} Entity</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{entityFields.length} Custom Fields</p>
                </div>
              </div>
              <div className="p-8 space-y-4">
                {entityFields.map(field => (
                  <div key={field.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                    <div>
                      <p className="text-sm font-black text-slate-900">{field.label}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{field.type} • {field.name}</p>
                    </div>
                    <button 
                      onClick={() => onDeleteField(field.id)}
                      className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {entityFields.length === 0 && (
                  <div className="py-8 text-center text-slate-300">
                    <Database className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    <p className="text-xs font-bold uppercase tracking-widest">No custom fields</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Field Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-slate-900">Define Custom Field</h2>
              <button onClick={() => setIsAdding(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"><X className="w-6 h-6"/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Field Label</label>
                  <input 
                    placeholder="e.g. Pet Policy" 
                    value={newField.label} 
                    onChange={e => setNewField({...newField, label: e.target.value})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Name (Slug)</label>
                  <input 
                    placeholder="e.g. pet_policy" 
                    value={newField.name} 
                    onChange={e => setNewField({...newField, name: e.target.value.toLowerCase().replace(/\s+/g, '_')})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Entity</label>
                  <select 
                    value={newField.entity}
                    onChange={e => setNewField({...newField, entity: e.target.value as any})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold"
                  >
                    <option value="HOUSE">Property (House)</option>
                    <option value="USER">User (Member)</option>
                    <option value="BOOKING">Booking (Lease)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data Type</label>
                  <select 
                    value={newField.type}
                    onChange={e => setNewField({...newField, type: e.target.value as any})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold"
                  >
                    <option value="text">Short Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="boolean">Yes/No (Boolean)</option>
                    <option value="select">Dropdown (Select)</option>
                  </select>
                </div>
              </div>

              {newField.type === 'select' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Options (Comma separated)</label>
                  <input 
                    placeholder="Option 1, Option 2, Option 3" 
                    onChange={e => setNewField({...newField, options: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" 
                  />
                </div>
              )}

              <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all text-lg">
                Register Custom Field
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomFieldsManager;
