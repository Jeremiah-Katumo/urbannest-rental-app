import { create } from "zustand";
import { Transporter } from "../types";
import { MOCK_TRANSPORTERS } from "../constants";

type Store = {
    transporters: Transporter[];

    addOrUpdate: (data: Partial<Transporter>) => void;
    update: (id: string, data: Partial<Transporter>) => void;
    updateStatus: (id: string, status: Transporter["status"]) => void;
    delete: (id: string) => void;
};

export const useTransporterStore = create<Store>((set) => ({
    transporters: MOCK_TRANSPORTERS,

    addOrUpdate: (data) =>
        set((state) => {
            const exists = state.transporters.find(
                (t) => t.id === (data as any).id
            );

            if (exists) {
                return {
                    transporters: state.transporters.map((t) =>
                        t.id === (data as any).id ? { ...t, ...data } : t
                    ),
                };
            }

            return {
                transporters: [
                    {
                        id: crypto.randomUUID(),
                        name: data.name || "New",
                        email: data.email || "",
                        phone: data.phone || "",
                        vehicleType: data.vehicleType || "",
                        basePrice: data.basePrice || 1000,
                        pricePerKm: data.pricePerKm || 400,
                        rating: 0,
                        status: "AVAILABLE",
                        avatar: "",
                    },
                    ...state.transporters,
                ],
            };
        }),

    update: (id, data) =>
        set((state) => ({
            transporters: state.transporters.map((t) =>
                t.id === id ? { ...t, ...data } : t
            ),
        })),

    updateStatus: (id, status) =>
        set((state) => ({
            transporters: state.transporters.map((t) =>
                t.id === id ? { ...t, status } : t
            ),
        })),

    delete: (id) =>
        set((state) => ({
            transporters: state.transporters.filter((t) => t.id !== id),
        })),
}));