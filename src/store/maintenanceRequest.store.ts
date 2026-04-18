import { create } from "zustand";
import { MaintenanceRequest } from "../types";
import { MOCK_MAINTENANCE_REQUESTS } from "../constants";

type MaintenanceRequestState = {
    requests: MaintenanceRequest[];
    editingRequest: MaintenanceRequest | null;

    setRequests: (
        fn: (prev: MaintenanceRequest[]) => MaintenanceRequest[]
    ) => void;

    setEditingRequest: (request: MaintenanceRequest | null) => void;

    addOrUpdateRequest: (data: MaintenanceRequest) => void;
    updateRequest: (
        id: string,
        data: Partial<MaintenanceRequest>
    ) => void;

    updateStatus: (
        id: string,
        status: MaintenanceRequest["status"]
    ) => void;

    deleteRequest: (id: string) => void;
};

export const useMaintenanceRequestStore =
    create<MaintenanceRequestState>((set, get) => ({
        requests: MOCK_MAINTENANCE_REQUESTS,
        editingRequest: null,

        // ✅ functional setter
        setRequests: (fn) =>
            set((state) => ({
                requests: fn(state.requests),
            })),

        setEditingRequest: (request) =>
            set({ editingRequest: request }),

        // ✅ ADD / EDIT
        addOrUpdateRequest: (data) => {
            const { editingRequest } = get();

            if (editingRequest?.id) {
                set((state) => ({
                    requests: state.requests.map((r) =>
                        r.id === editingRequest.id ? { ...r, ...data } : r
                    ),
                    editingRequest: null,
                }));
            } else {
                set((state) => ({
                    requests: [data, ...state.requests],
                    editingRequest: null,
                }));
            }
        },

        // ✅ UPDATE
        updateRequest: (id, data) =>
            set((state) => ({
                requests: state.requests.map((r) =>
                    r.id === id ? { ...r, ...data } : r
                ),
            })),

        // ✅ UPDATE STATUS
        updateStatus: (id, status) =>
            set((state) => ({
                requests: state.requests.map((r) =>
                    r.id === id ? { ...r, status } : r
                ),
            })),

        // ✅ DELETE
        deleteRequest: (id) =>
            set((state) => ({
                requests: state.requests.filter((r) => r.id !== id),
            })),
    }));