import { create } from "zustand";
import { User } from "@/src/types";
import { MOCK_USERS } from "@/src/constants";

interface UserState {
    users: User[];

    addUser: (u: User) => void;
    updateUser: (id: string, data: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
    users: MOCK_USERS,

    addUser: (u) =>
        set((state) => ({ users: [...state.users, u] })),

    updateUser: (id, data) =>
        set((state) => ({
            users: state.users.map((u) =>
                u.id === id ? { ...u, ...data } : u
            ),
        })),
}));