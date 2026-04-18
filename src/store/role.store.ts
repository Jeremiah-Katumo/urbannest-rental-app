import { create } from "zustand";
import { RoleDefinition, User } from "../types";
import { MOCK_ROLES } from "../constants";

type RoleState = {
    roles: RoleDefinition[];
    editingRole: RoleDefinition | null;

    setRoles: (roles: RoleDefinition[]) => void;
    setEditingRole: (role: RoleDefinition | null) => void;

    addRole: (data: Partial<RoleDefinition>, currentUser: User | null) => void;
    updateRole: (id: string, data: Partial<RoleDefinition>) => void;
    deleteRole: (id: string) => void;
};

export const useRoleStore = create<RoleState>((set, get) => ({
    roles: MOCK_ROLES,
    editingRole: null,

    setRoles: (roles) => set({ roles }),

    setEditingRole: (role) => set({ editingRole: role }),

    addRole: (data, currentUser) => {
        const { roles, editingRole } = get();

        const isAdmin =
            currentUser?.role === "ADMIN" ||
            currentUser?.role === "SUPER_ADMIN";

        // UPDATE MODE
        if (editingRole?.id && isAdmin) {
            const updatedRoles = roles.map((r) =>
                r.id === editingRole.id
                    ? { ...r, ...data }
                    : r
            );

            set({
                roles: updatedRoles,
                editingRole: null,
            });

            return;
        }

        // CREATE MODE
        const newRole: RoleDefinition = {
            id: crypto.randomUUID(),
            name: data.name ?? "New Role",
            role: data.role ?? "TENANT",
            permissions: data.permissions ?? [],
        };

        set({
            roles: [newRole, ...roles],
            editingRole: null,
        });
    },

    updateRole: (id, data) => {
        set((state) => ({
            roles: state.roles.map((r) =>
                r.id === id ? { ...r, ...data } : r
            ),
        }));
    },

    deleteRole: (id) => {
        set((state) => ({
            roles: state.roles.filter((r) => r.id !== id),
        }));
    },
}));