import React from "react";
import { House, User } from "@/src/types";
import { X } from "lucide-react";

interface HouseModalProps {
    editingHouse: House;
    setEditingHouse: (house: House | null) => void;
    addOrUpdateHouse: (houseData: Partial<House>, currentUser?: User | null) => void;
}

const HouseModal: React.FC<HouseModalProps> = ({
    editingHouse,
    setEditingHouse,
    addOrUpdateHouse
}) => {

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900">{editingHouse.id ? 'Refine Property' : 'Enlist New Haven'}</h2>
                    <button title='Close' onClick={() => setEditingHouse(null)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); addOrUpdateHouse(editingHouse); }} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                        <input placeholder="Sunset Villa..." value={editingHouse.title || ''} onChange={e => setEditingHouse({ ...editingHouse, title: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rent ($/mo)</label>
                            <input type="number" placeholder="2500" value={editingHouse.price || ''} onChange={e => setEditingHouse({ ...editingHouse, price: Number(e.target.value) })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                            <input placeholder="Manhattan, NY" value={editingHouse.location || ''} onChange={e => setEditingHouse({ ...editingHouse, location: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all text-lg">Commit Records</button>
                </form>
            </div>
        </div>
    )
}

export default HouseModal;