import { create } from "zustand";
import { Permission } from "../types";
import { MOCK_PERMISSIONS } from "../constants";

type PermissionState = {
    permissions: Permission[];

    setPermissions: (
        fn: (prev: Permission[]) => Permission[]
    ) => void;

    addPermission: (perm: Permission) => void;
    updatePermission: (
        id: string,
        data: Partial<Permission>
    ) => void;

    deletePermission: (id: string) => void;
};

export const usePermissionStore = create<PermissionState>((set) => ({
    permissions: MOCK_PERMISSIONS,

    // ✅ functional setter
    setPermissions: (fn) =>
        set((state) => ({
            permissions: fn(state.permissions),
        })),

    // ✅ ADD
    addPermission: (perm) =>
        set((state) => ({
            permissions: [perm, ...state.permissions],
        })),

    // ✅ UPDATE
    updatePermission: (id, data) =>
        set((state) => ({
            permissions: state.permissions.map((p) =>
                p.id === id ? { ...p, ...data } : p
            ),
        })),

    // ✅ DELETE
    deletePermission: (id) =>
        set((state) => ({
            permissions: state.permissions.filter(
                (p) => p.id !== id
            ),
        })),
}));