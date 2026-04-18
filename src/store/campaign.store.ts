import { create } from "zustand";
import { Campaign } from "../types";
import { MOCK_CAMPAIGNS } from "../constants";

type CampaignState = {
    campaigns: Campaign[];
    editingCampaign: Campaign | null;

    setCampaigns: (fn: (prev: Campaign[]) => Campaign[]) => void;
    setEditingCampaign: (campaign: Campaign | null) => void;

    addOrUpdateCampaign: (data: Partial<Campaign>) => void;
    updateCampaign: (id: string, data: Partial<Campaign>) => void;
    deleteCampaign: (id: string) => void;
};

export const useCampaignStore = create<CampaignState>((set, get) => ({
    campaigns: MOCK_CAMPAIGNS,
    editingCampaign: null,

    setCampaigns: (fn) =>
        set((state) => ({
            campaigns: fn(state.campaigns),
        })),

    setEditingCampaign: (campaign) =>
        set({ editingCampaign: campaign }),

    addOrUpdateCampaign: (campaignData) => {
        const { campaigns, editingCampaign } = get();

        if (editingCampaign?.id) {
            set({
                campaigns: campaigns.map((c) =>
                    c.id === editingCampaign.id
                        ? { ...c, ...campaignData }
                        : c
                ),
                editingCampaign: null,
            });
        } else {
            const newCampaign: Campaign = {
                id: crypto.randomUUID(),
                name: campaignData.name || "New Campaign",
                description: campaignData.description || "",
                status: "ACTIVE",
                budget: campaignData.budget || 0,
                targetAudience: campaignData.targetAudience || "All",
                startDate: new Date().toISOString().split("T")[0],
            };

            set({
                campaigns: [newCampaign, ...campaigns],
                editingCampaign: null,
            });
        }
    },

    updateCampaign: (id, data) =>
        set((state) => ({
            campaigns: state.campaigns.map((c) =>
                c.id === id ? { ...c, ...data } : c
            ),
        })),

    deleteCampaign: (id) =>
        set((state) => ({
            campaigns: state.campaigns.filter((c) => c.id !== id),
        })),
}));