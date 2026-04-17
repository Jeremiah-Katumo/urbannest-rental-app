import React, { createContext, useContext, useState, useCallback } from "react";
import { RoleDefinition } from "../types";
import { MOCK_ROLES } from "../constants";
import { useAuthContext } from "./AuthContext";

type RoleContextType = {
    roles: RoleDefinition[];
    setRoles: React.Dispatch<React.SetStateAction<RoleDefinition[]>>;

    handleAddRole: (role: RoleDefinition) => void;
    handleUpdateRole: (id: string, data: Partial<RoleDefinition>) => void;
    handleDeleteRole: (id: string) => void;
};

const RoleContext = createContext<RoleContextType | null>(null);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [roles, setRoles] = useState<RoleDefinition[]>(MOCK_ROLES);
    const [editingRole, setEditingRole] = useState<RoleDefinition | null>(null);

    const { currentUser } = useAuthContext();

    const handleAddRole = useCallback((roleData: Partial<RoleDefinition>) => {
        if (editingRole?.id && currentUser?.role === 'ADMIN' || 'SUPER_ADMIN') {
            setRoles((prev) =>
                prev.map(r => r.id === editingRole?.id ? { ...r, ...roleData } : r))
        } else {
            const newRole: RoleDefinition = {
                id: crypto.randomUUID(),
                name: roleData.name || 'New Role',
                role: roleData.role || 'TENANT',
                permissions: roleData.permissions || []
            }
            setRoles([newRole, ...roles]);
        }
        setEditingRole(null);
    }, [editingRole, currentUser]);

    const handleUpdateRole = useCallback((roleId: string, roleData: Partial<RoleDefinition>) => {
        setRoles(prev =>
            prev.map(r => (r.id === roleId ? { ...r, ...roleData } : r))
        );
    }, []);

    const handleDeleteRole = useCallback((roleId: string) => {
        if (confirm('Are you sure you want to delete this role?')) {
            setRoles(prev => prev.filter(r => r.id !== roleId));
        }
    }, []);

    return (
        <RoleContext.Provider
            value={{ roles, setRoles, handleAddRole, handleUpdateRole, handleDeleteRole }}
        >
            {children}
        </RoleContext.Provider>
    );
};

export const useRoleContext = () => {
    const ctx = useContext(RoleContext);
    if (!ctx) throw new Error("useRoleContext must be used within RoleProvider");
    return ctx;
};