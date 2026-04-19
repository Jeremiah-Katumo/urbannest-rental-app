import React from "react";
import { User } from "@/src/types";
import { X } from "lucide-react";

interface UserModalProps {
    editingUser: User;
    setEditingUser: (user: User | null) => void;
    addOrUpdateUser: (user: Partial<User>) => void;
}

const UserModal: React.FC<UserModalProps> = ({
    editingUser,
    setEditingUser,
    addOrUpdateUser
}) => {

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900">{editingUser.id ? 'Update Member' : `Register ${editingUser.role}`}</h2>
                    <button title='Close' onClick={() => setEditingUser(null)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); addOrUpdateUser(editingUser); }} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input placeholder="Jane Cooper" value={editingUser.name || ''} onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                        <input type="email" placeholder="jane@example.com" value={editingUser.email || ''} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                    </div>
                    <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all text-lg">Save Member Data</button>
                </form>
            </div>
        </div>
    )
}

export default UserModal;