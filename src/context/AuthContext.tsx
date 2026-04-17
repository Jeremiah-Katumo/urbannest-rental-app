import React, { createContext, useContext, useState } from "react";
import { useUserContext } from "./UserContext";
import { AuthPage, User, UserRole } from "../types";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
    handleLogin: (email: string, role: UserRole) => void;
    handleLogout: () => void;

    handleToggleFavorite: (houseId: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [authView, setAuthView] = useState<AuthPage>('LOGIN');

    const { users } = useUserContext()

    const handleLogin = (email: string, role: UserRole) => {
        const user: User = users.find(u => u.email === email && u.role === role) || {
            id: crypto.randomUUID(),
            name: email.split("@")[0],
            email: email,
            role: role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            phone: "",
            joinedDate: new Date().toISOString().split('T')[0],
            status: "ACTIVE",
        };

        setCurrentUser(user);
        setAuthView('NONE');
        navigate(role === 'TENANT' ? '/' : '/dashboard');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setAuthView('LOGIN');
        navigate('/')
    }

    const handleToggleFavorite = (houseId: string) => {
        if (!currentUser) return;

        const favorites = currentUser.favorites || [];

        const newFavorites = favorites.includes(houseId)
            ? favorites.filter(id => id !== houseId)
            : [...favorites, houseId];

        const updatedUser = { ...currentUser, favorites: newFavorites };

        setCurrentUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ 
            currentUser, 
            setCurrentUser, 
            handleLogin, 
            handleLogout,
            handleToggleFavorite
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
    return ctx;
};