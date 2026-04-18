import { create } from "zustand";
import { Transporter } from "../types";
import { MOCK_TRANSPORTERS } from "../constants";
import { useAuthStore } from "./auth.store";

type TransporterState = {
    transporters: Transporter[];
    editingTransporter: Transporter | null;

    setTransporters: (
        fn: (prev: Transporter[]) => Transporter[]
    ) => void;

    setEditingTransporter: (transporter: Transporter | null) => void;

    addOrUpdateTransporter: (data: Partial<Transporter>) => void;
    updateTransporter: (
        id: string,
        data: Partial<Transporter>
    ) => void;

    updateTransporterStatus: (
        id: string,
        status: Transporter["status"]
    ) => void;

    deleteTransporter: (id: string) => void;
};

export const useTransporterStore = create<TransporterState>((set, get) => ({
    transporters: MOCK_TRANSPORTERS,
    editingTransporter: null,

    // ✅ functional setter
    setTransporters: (fn) =>
        set((state) => ({
            transporters: fn(state.transporters),
        })),

    setEditingTransporter: (transporter) =>
        set({ editingTransporter: transporter }),

    // ✅ ADD / EDIT
    addOrUpdateTransporter: (data) => {
        const { editingTransporter } = get();
        const { currentUser } = useAuthStore.getState();

        if (editingTransporter?.id) {
            set((state) => ({
                transporters: state.transporters.map((t) =>
                    t.id === editingTransporter.id
                        ? { ...t, ...data }
                        : t
                ),
                editingTransporter: null,
            }));
        } else {
            const newTransporter: Transporter = {
                id: crypto.randomUUID(),
                name: data.name || "New Transporter",
                email: data.email || "",
                phone: data.phone || "",
                vehicleType: data.vehicleType || "",
                basePrice: data.basePrice || 1000,
                pricePerKm: data.pricePerKm || 450,
                rating: Math.random(),
                status: "AVAILABLE",
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email || "new"
                    }`,
            };

            set((state) => ({
                transporters: [newTransporter, ...state.transporters],
                editingTransporter: null,
            }));
        }

        // ✅ Side effect (kept same as your logic)
        alert(
            `Transporter hired! They will contact you shortly at ${currentUser?.phone || "your registered number"
            }.`
        );
    },

    // ✅ UPDATE
    updateTransporter: (id, data) =>
        set((state) => ({
            transporters: state.transporters.map((t) =>
                t.id === id ? { ...t, ...data } : t
            ),
        })),

    // ✅ UPDATE STATUS
    updateTransporterStatus: (id, status) =>
        set((state) => ({
            transporters: state.transporters.map((t) =>
                t.id === id ? { ...t, status } : t
            ),
        })),

    // ✅ DELETE
    deleteTransporter: (id) =>
        set((state) => ({
            transporters: state.transporters.filter(
                (t) => t.id !== id
            ),
        })),
}));