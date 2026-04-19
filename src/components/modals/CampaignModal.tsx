import { Campaign } from "@/src/types";
import React from "react";
import { X } from "lucide-react";


interface CampaignModalProps {
    editingCampaign: Campaign;
    setEditingCampaign: (campaign: Campaign | null) => void;
    addOrUpdateCampaign: (campaign: Partial<Campaign>) => void;
}

const CampaignModal: React.FC<CampaignModalProps> = ({
    editingCampaign,
    setEditingCampaign,
    addOrUpdateCampaign
}) => {

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900">{editingCampaign.id ? 'Optimize Campaign' : 'Initiate Outreach'}</h2>
                    <button title='CLose' onClick={() => setEditingCampaign(null)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); addOrUpdateCampaign(editingCampaign); }} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Campaign Title</label>
                        <input placeholder="Q4 Market Boost" value={editingCampaign.name || ''} onChange={e => setEditingCampaign({ ...editingCampaign, name: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Allocated Budget</label>
                            <input type="number" placeholder="5000" value={editingCampaign.budget || ''} onChange={e => setEditingCampaign({ ...editingCampaign, budget: Number(e.target.value) })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Segment</label>
                            <input placeholder="Corporate" value={editingCampaign.targetAudience || ''} onChange={e => setEditingCampaign({ ...editingCampaign, targetAudience: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all text-lg">Launch Campaign</button>
                </form>
            </div>
        </div>
    )
}

export default CampaignModal;