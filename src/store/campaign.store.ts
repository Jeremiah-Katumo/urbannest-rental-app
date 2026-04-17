import { create } from "zustand";
import { Campaign } from "@/src/types";

interface CampaignState {
    campaigns: Campaign[];

    addCampaign: (c: Campaign) => void;
    updateCampaign: (id: string, data: Partial<Campaign>) => void;
}

export const useCampaignStore = create<CampaignState>((set) => ({
    campaigns: [],

    addCampaign: (c) =>
        set((state) => ({ campaigns: [c, ...state.campaigns] })),

    updateCampaign: (id, data) =>
        set((state) => ({
            campaigns: state.campaigns.map((c) =>
                c.id === id ? { ...c, ...data } : c
            ),
        })),
}));