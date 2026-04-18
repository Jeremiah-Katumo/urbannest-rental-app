import { create } from "zustand";
import { User } from "../types";
import { MOCK_USERS } from "../constants";

type UserState = {
    users: User[];

    editingUser: User | null;
    selectedUser: User | null;
    selectedUserDetail: User | null;

    setUsers: (
        fn: (prev: User[]) => User[]
    ) => void;

    setEditingUser: (user: User | null) => void;
    setSelectedUser: (user: User | null) => void;
    setSelectedUserDetail: (user: User | null) => void;

    addOrUpdateUser: (data: Partial<User>) => void;
    updateUser: (id: string, data: Partial<User>) => void;
    deleteUser: (id: string) => void;
};

export const useUserStore = create<UserState>((set, get) => ({
    users: MOCK_USERS,

    editingUser: null,
    selectedUser: null,
    selectedUserDetail: null,

    // ✅ functional setter
    setUsers: (fn) =>
        set((state) => ({
            users: fn(state.users),
        })),

    setEditingUser: (user) =>
        set({ editingUser: user }),

    setSelectedUser: (user) =>
        set({ selectedUser: user }),

    setSelectedUserDetail: (user) =>
        set({ selectedUserDetail: user }),

    // ✅ ADD / UPDATE
    addOrUpdateUser: (data) => {
        const { editingUser } = get();

        if (editingUser?.id) {
            set((state) => ({
                users: state.users.map((u) =>
                    u.id === editingUser.id
                        ? { ...u, ...data }
                        : u
                ),
                editingUser: null,
            }));
        } else {
            const newUser: User = {
                id: crypto.randomUUID(),
                name: data.name || "New User",
                email: data.email || "",
                role: data.role || "TENANT",
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email || "new"
                    }`,
                joinedDate: new Date()
                    .toISOString()
                    .split("T")[0],
                status: "ACTIVE",
            };

            set((state) => ({
                users: [newUser, ...state.users],
                editingUser: null,
            }));
        }
    },

    // ✅ UPDATE
    updateUser: (id, data) =>
        set((state) => ({
            users: state.users.map((u) =>
                u.id === id ? { ...u, ...data } : u
            ),
        })),

    // ✅ DELETE
    deleteUser: (id) =>
        set((state) => ({
            users: state.users.filter((u) => u.id !== id),
        })),
}));