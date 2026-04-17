import React, { createContext, useContext, useState, useCallback } from "react";
import { User } from "../types";
import { MOCK_USERS } from "../constants";

type UserContextType = {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;

    editingUser: User | null;
    setEditingUser: React.Dispatch<React.SetStateAction<User | null>>;

    selectedUser: User | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;

    selectedUserDetail?: User | null;
    setSelectedUserDetail?: React.Dispatch<React.SetStateAction<User | null>>;

    handleAddUser: (data: User) => void;
    handleUpdateUser: (id: string, data: Partial<User>) => void;
    handleDeleteUser: (id: string) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedUserDetail, setSelectedUserDetail] = useState<User | null>(null);

    const handleAddUser = useCallback((userData: Partial<User>) => {
        if (editingUser?.id) {
            setUsers(prev =>
                prev.map(u => (u.id === editingUser.id ? { ...u, ...userData } : u))
            );
        } else {
            const newUser: User = {
                id: crypto.randomUUID(),
                name: userData.name || 'New User',
                email: userData.email || '',
                role: userData.role || 'TENANT',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email || 'new'}`,
                joinedDate: new Date().toISOString().split('T')[0],
                status: 'ACTIVE'
            }
            setUsers([newUser, ...users]);
        }
        setEditingUser(null);
    }, [editingUser]);

    const handleUpdateUser = useCallback((id: string, userData: Partial<User>) => {
        setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...userData } : u)));
    }, []);

    const handleDeleteUser = useCallback((id: string) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    }, []);

    return (
        <UserContext.Provider
            value={{
                users,
                setUsers,
                editingUser,
                setEditingUser,
                selectedUser,
                setSelectedUser,
                handleAddUser,
                handleUpdateUser,
                handleDeleteUser,
                selectedUserDetail, setSelectedUserDetail,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUserContext must be used within UserProvider");
    return ctx;
};