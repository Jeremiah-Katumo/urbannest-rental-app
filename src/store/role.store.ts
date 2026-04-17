import { create } from "zustand";
import { RoleDefinition } from "../types";
import { MOCK_ROLES } from "../constants";

type Store = {
    roles: RoleDefinition[];
    editingRole: RoleDefinition | null;

    setEditingRole: (r: RoleDefinition | null) => void;

    addOrUpdateRole: (data: RoleDefinition) => void;
    updateRole: (id: string, data: Partial<RoleDefinition>) => void;
    deleteRole: (id: string) => void;
};

export const useRoleStore = create<Store>((set, get) => ({
    roles: MOCK_ROLES,
    editingRole: null,

    setEditingRole: (r) => set({ editingRole: r }),

    addOrUpdateRole: (data) => {
        const editing = get().editingRole;

        if (editing?.id) {
            set((state) => ({
                roles: state.roles.map((r) =>
                    r.id === editing.id ? { ...r, ...data } : r
                ),
            }));
        } else {
            set((state) => ({
                roles: [data, ...state.roles],
            }));
        }

        set({ editingRole: null });
    },

    updateRole: (id, data) =>
        set((state) => ({
            roles: state.roles.map((r) =>
                r.id === id ? { ...r, ...data } : r
            ),
        })),

    deleteRole: (id) =>
        set((state) => ({
            roles: state.roles.filter((r) => r.id !== id),
        })),
}));