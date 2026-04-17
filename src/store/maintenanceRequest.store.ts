import { create } from "zustand";
import { MaintenanceRequest } from "../types";
import { MOCK_MAINTENANCE_REQUESTS } from "../constants";

type Store = {
    requests: MaintenanceRequest[];
    add: (data: MaintenanceRequest) => void;
    update: (id: string, data: Partial<MaintenanceRequest>) => void;
    updateStatus: (id: string, status: MaintenanceRequest["status"]) => void;
    delete: (id: string) => void;
};

export const useMaintenanceStore = create<Store>((set) => ({
    requests: MOCK_MAINTENANCE_REQUESTS,

    add: (data) =>
        set((state) => ({ requests: [data, ...state.requests] })),

    update: (id, data) =>
        set((state) => ({
            requests: state.requests.map((r) =>
                r.id === id ? { ...r, ...data } : r
            ),
        })),

    updateStatus: (id, status) =>
        set((state) => ({
            requests: state.requests.map((r) =>
                r.id === id ? { ...r, status } : r
            ),
        })),

    delete: (id) =>
        set((state) => ({
            requests: state.requests.filter((r) => r.id !== id),
        })),
}));