import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole, AuthPage } from "../types";
import { MOCK_USERS } from "../constants";

interface AuthState {
    currentUser: User | null;
    authView: AuthPage;

    setAuthView: (view: AuthPage) => void;

    login: (email: string, role: UserRole) => void;
    logout: () => void;

    setCurrentUser: (user: User | null) => void;

    toggleFavorite: (houseId: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            currentUser: null,
            authView: "LOGIN",

            // UI state
            setAuthView: (view) => set({ authView: view }),

            // manual setter (useful for admin edits / profile updates)
            setCurrentUser: (user) => set({ currentUser: user }),

            // LOGIN LOGIC
            login: (email, role) => {
                const existingUser = MOCK_USERS.find(
                    (u) => u.email === email && u.role === role
                );

                const user: User =
                    existingUser ?? { 
                        id: crypto.randomUUID(),
                        name: email.split("@")[0],
                        email,
                        role,
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                        phone: "",
                        joinedDate: new Date().toISOString().split("T")[0],
                        status: "ACTIVE",
                        favorites: [],
                    };

                set({
                    currentUser: user,
                    authView: "NONE",
                });
            },

            // LOGOUT
            logout: () =>
                set({
                    currentUser: null,
                    authView: "LOGIN",
                }),

            // FAVORITES TOGGLE (business logic moved from context)
            toggleFavorite: (houseId) => {
                const user = get().currentUser;
                if (!user) return;

                const favorites = user.favorites || [];

                const updatedFavorites = favorites.includes(houseId)
                    ? favorites.filter((id) => id !== houseId)
                    : [...favorites, houseId];

                set({
                    currentUser: {
                        ...user,
                        favorites: updatedFavorites,
                    },
                });
            },
        }),
        {
            name: "auth-store", // localStorage key
            partialize: (state) => ({
                currentUser: state.currentUser,
                authView: state.authView,
            }),
        }
    )
);