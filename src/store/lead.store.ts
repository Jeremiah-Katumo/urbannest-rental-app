import { create } from "zustand";
import { Lead } from "../types";
import { MOCK_LEADS } from "../constants";

type Store = {
    leads: Lead[];
    addLead: (data: Lead) => void;
    updateLead: (id: string, data: Partial<Lead>) => void;
    deleteLead: (id: string) => void;
};

export const useLeadStore = create<Store>((set) => ({
    leads: MOCK_LEADS,

    addLead: (data) =>
        set((state) => ({ leads: [data, ...state.leads] })),

    updateLead: (id, data) =>
        set((state) => ({
            leads: state.leads.map((l) =>
                l.id === id ? { ...l, ...data } : l
            ),
        })),

    deleteLead: (id) =>
        set((state) => ({
            leads: state.leads.filter((l) => l.id !== id),
        })),
}));