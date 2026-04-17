import { create } from "zustand";
import { Permission } from "../types";
import { MOCK_PERMISSIONS } from "../constants";

type Store = {
    permissions: Permission[];
    add: (p: Permission) => void;
    update: (id: string, data: Partial<Permission>) => void;
    delete: (id: string) => void;
};

export const usePermissionStore = create<Store>((set) => ({
    permissions: MOCK_PERMISSIONS,

    add: (p) =>
        set((s) => ({ permissions: [p, ...s.permissions] })),

    update: (id, data) =>
        set((s) => ({
            permissions: s.permissions.map((p) =>
                p.id === id ? { ...p, ...data } : p
            ),
        })),

    delete: (id) =>
        set((s) => ({
            permissions: s.permissions.filter((p) => p.id !== id),
        })),
}));