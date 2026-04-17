import React, { createContext, useContext, useState, useCallback } from "react";
import { Campaign } from "../types";
import { MOCK_CAMPAIGNS } from "../constants";

type CampaignContextType = {
    campaigns: Campaign[];
    setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;

    editingCampaign: Campaign | null;
    setEditingCampaign: React.Dispatch<React.SetStateAction<Campaign | null>>;

    handleAddCampaign: (data: Campaign) => void;
    handleUpdateCampaign: (id: string, data: Partial<Campaign>) => void;
    handleDeleteCampaign: (id: string) => void;
};

const CampaignContext = createContext<CampaignContextType | null>(null);

export const CampaignProvider = ({ children }: { children: React.ReactNode }) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

    const handleAddCampaign = useCallback((campaignData: Partial<Campaign>) => {
        if (editingCampaign?.id) {
            setCampaigns(prev =>
                prev.map(c => (c.id === editingCampaign.id ? { ...c, ...campaignData } : c))
            );
        } else {
            const newCampaign: Campaign = {
                id: crypto.randomUUID(),
                name: campaignData.name || 'New Campaign',
                description: campaignData.description || '',
                status: 'ACTIVE',
                budget: campaignData.budget || 0,
                targetAudience: campaignData.targetAudience || 'All',
                startDate: new Date().toISOString().split('T')[0],
            }
            setCampaigns([newCampaign, ...campaigns]);
        }
        setEditingCampaign(null);
    }, [editingCampaign]);

    const handleUpdateCampaign = useCallback((id: string, campaignData: Partial<Campaign>) => {
        setCampaigns(prev =>
            prev.map(c => (c.id === id ? { ...c, ...campaignData } : c))
        );
    }, []);

    const handleDeleteCampaign = useCallback((id: string) => {
        setCampaigns(prev => prev.filter(c => c.id !== id));
    }, []);

    return (
        <CampaignContext.Provider
            value={{
                campaigns,
                setCampaigns,
                editingCampaign,
                setEditingCampaign,
                handleAddCampaign,
                handleUpdateCampaign,
                handleDeleteCampaign,
            }}
        >
            {children}
        </CampaignContext.Provider>
    );
};

export const useCampaignContext = () => {
    const ctx = useContext(CampaignContext);
    if (!ctx) throw new Error("useCampaignContext must be used within CampaignProvider");
    return ctx;
};