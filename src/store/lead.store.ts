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



// import { leadApi } from "../services/lead.api";

// type LeadState = {
//     leads: Lead[];
//     loading: boolean;
//     error: string | null;

//     fetchLeads: () => Promise<void>;
//     addLead: (data: Partial<Lead>) => Promise<void>;
//     updateLead: (id: string, data: Partial<Lead>) => Promise<void>;
//     deleteLead: (id: string) => Promise<void>;
// };

// export const useLeadStore = create<LeadState>((set) => ({
//     leads: [],
//     loading: false,
//     error: null,

//     // 📥 FETCH
//     fetchLeads: async () => {
//         set({ loading: true, error: null });

//         try {
//             const leads = await leadApi.getAll();
//             set({ leads, loading: false });
//         } catch (err: any) {
//             set({ error: err.message, loading: false });
//         }
//     },

//     // ➕ CREATE
//     addLead: async (data) => {
//         try {
//             const newLead = await leadApi.create(data);

//             set((state) => ({
//                 leads: [newLead, ...state.leads],
//             }));
//         } catch (err) {
//             console.error(err);
//         }
//     },

//     // ✏️ UPDATE
//     updateLead: async (id, data) => {
//         try {
//             const updated = await leadApi.update(id, data);

//             set((state) => ({
//                 leads: state.leads.map((l) =>
//                     l.id === id ? updated : l
//                 ),
//             }));
//         } catch (err) {
//             console.error(err);
//         }
//     },

//     // ❌ DELETE
//     deleteLead: async (id) => {
//         try {
//             await leadApi.delete(id);

//             set((state) => ({
//                 leads: state.leads.filter((l) => l.id !== id),
//             }));
//         } catch (err) {
//             console.error(err);
//         }
//     },
// }));