import { create } from "zustand";
import { Lead } from "../types";
import { MOCK_LEADS } from "../constants";

type LeadState = {
    leads: Lead[];

    setLeads: (leads: Lead[]) => void;

    addLead: (data: Partial<Lead>) => void;
    updateLead: (id: string, data: Partial<Lead>) => void;
    deleteLead: (id: string) => void;
};

export const useLeadStore = create<LeadState>((set, get) => ({
    leads: MOCK_LEADS,

    setLeads: (leads) => set({ leads }),

    addLead: (data) => {
        const { leads } = get();

        const newLead: Lead = {
            id: crypto.randomUUID(),
            name: data.name ?? "",
            email: data.email ?? "",
            phone: data.phone ?? "",
            message: data.message ?? "",
            status: data.status ?? "NEW",
            houseId: data.houseId ?? "",
            createdAt: new Date().toISOString(),
        };

        set({
            leads: [newLead, ...leads],
        });
    },

    updateLead: (id, data) => {
        set((state) => ({
            leads: state.leads.map((l) =>
                l.id === id ? { ...l, ...data } : l
            ),
        }));
    },

    deleteLead: (id) => {
        set((state) => ({
            leads: state.leads.filter((l) => l.id !== id),
        }));
    },
}));