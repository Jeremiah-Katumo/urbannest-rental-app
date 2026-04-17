import { create } from "zustand";
import { Lease } from "../types";
import { MOCK_LEASES } from "../constants";

type Store = {
    leases: Lease[];
    editingLease: Lease | null;

    setEditingLease: (l: Lease | null) => void;

    addOrUpdateLease: (data: Lease) => void;
    updateLease: (id: string, data: Partial<Lease>) => void;
    signLease: (id: string) => void;
    deleteLease: (id: string) => void;
};

export const useLeaseStore = create<Store>((set, get) => ({
    leases: MOCK_LEASES,
    editingLease: null,

    setEditingLease: (l) => set({ editingLease: l }),

    addOrUpdateLease: (data) => {
        const editing = get().editingLease;

        if (editing?.id) {
            set((state) => ({
                leases: state.leases.map((l) =>
                    l.id === editing.id ? { ...l, ...data } : l
                ),
            }));
        } else {
            set((state) => ({ leases: [data, ...state.leases] }));
        }

        set({ editingLease: null });
    },

    updateLease: (id, data) =>
        set((state) => ({
            leases: state.leases.map((l) =>
                l.id === id ? { ...l, ...data } : l
            ),
        })),

    signLease: (id) =>
        set((state) => ({
            leases: state.leases.map((l) =>
                l.id === id
                    ? {
                        ...l,
                        status: "SIGNED",
                        signedAt: new Date().toISOString(),
                    }
                    : l
            ),
        })),

    deleteLease: (id) =>
        set((state) => ({
            leases: state.leases.filter((l) => l.id !== id),
        })),
}));