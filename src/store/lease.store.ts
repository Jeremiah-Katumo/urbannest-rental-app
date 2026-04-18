import { create } from "zustand";
import { Lease } from "../types";
import { MOCK_LEASES } from "../constants";

type LeaseState = {
    leases: Lease[];
    editingLease: Lease | null;

    setLeases: (fn: (prev: Lease[]) => Lease[]) => void;
    setEditingLease: (lease: Lease | null) => void;

    addOrUpdateLease: (data: Lease) => void;
    updateLease: (id: string, data: Partial<Lease>) => void;

    updateLeaseStatus: (
        id: string,
        status: Lease["status"]
    ) => void;

    signLease: (id: string) => void;

    deleteLease: (id: string) => void;
};

export const useLeaseStore = create<LeaseState>((set, get) => ({
    leases: MOCK_LEASES,
    editingLease: null,

    // ✅ functional setter
    setLeases: (fn) =>
        set((state) => ({
            leases: fn(state.leases),
        })),

    setEditingLease: (lease) =>
        set({ editingLease: lease }),

    // ✅ ADD / EDIT
    addOrUpdateLease: (data) => {
        const { editingLease } = get();

        if (editingLease?.id) {
            set((state) => ({
                leases: state.leases.map((l) =>
                    l.id === editingLease.id ? { ...l, ...data } : l
                ),
                editingLease: null,
            }));
        } else {
            set((state) => ({
                leases: [data, ...state.leases],
                editingLease: null,
            }));
        }
    },

    // ✅ UPDATE
    updateLease: (id, data) =>
        set((state) => ({
            leases: state.leases.map((l) =>
                l.id === id ? { ...l, ...data } : l
            ),
        })),

    // ✅ UPDATE STATUS
    updateLeaseStatus: (id, status) =>
        set((state) => ({
            leases: state.leases.map((l) =>
                l.id === id
                    ? {
                        ...l,
                        status,
                        signedAt: new Date().toISOString(),
                    }
                    : l
            ),
        })),

    // ✅ SIGN (explicit action)
    signLease: (leaseId) =>
        set((state) => ({
            leases: state.leases.map((l) =>
                l.id === leaseId
                    ? {
                        ...l,
                        status: "SIGNED",
                        signedAt: new Date().toISOString(),
                    }
                    : l
            ),
        })),

    // ✅ DELETE
    deleteLease: (id) =>
        set((state) => ({
            leases: state.leases.filter((l) => l.id !== id),
        })),
}));