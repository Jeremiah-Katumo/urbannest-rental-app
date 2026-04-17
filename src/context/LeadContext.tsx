import React, { createContext, useContext, useState, useCallback } from "react";
import { Lead } from "../types";
import { MOCK_LEADS } from "../constants";

type LeadContextType = {
    leads: Lead[];
    setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;

    handleAddLead: (data: Lead) => void;
    handleUpdateLead: (id: string, data: Partial<Lead>) => void;
    handleDeleteLead: (id: string) => void;
};

const LeadContext = createContext<LeadContextType | null>(null);

export const LeadProvider = ({ children }: { children: React.ReactNode }) => {
    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

    const handleAddLead = useCallback((data: Lead) => {
        setLeads(prev => [data, ...prev]);
    }, []);

    const handleUpdateLead = useCallback((id: string, data: Partial<Lead>) => {
        setLeads(prev =>
            prev.map(l => (l.id === id ? { ...l, ...data } : l))
        );
    }, []);

    const handleDeleteLead = useCallback((id: string) => {
        setLeads(prev => prev.filter(l => l.id !== id));
    }, []);

    return (
        <LeadContext.Provider
            value={{
                leads,
                setLeads,
                handleAddLead,
                handleUpdateLead,
                handleDeleteLead,
            }}
        >
            {children}
        </LeadContext.Provider>
    );
};

export const useLeadContext = () => {
    const ctx = useContext(LeadContext);
    if (!ctx) throw new Error("useLeadContext must be used within LeadProvider");
    return ctx;
};