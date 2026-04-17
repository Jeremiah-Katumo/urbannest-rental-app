import React, { createContext, useContext, useState, useCallback } from "react";
import { Permission } from "../types";
import { MOCK_PERMISSIONS } from "../constants";

type PermissionContextType = {
    permissions: Permission[];
    setPermissions: React.Dispatch<React.SetStateAction<Permission[]>>;

    handleAddPermission: (perm: Permission) => void;
    handleUpdatePermission: (id: string, data: Partial<Permission>) => void;
    handleDeletePermission: (id: string) => void;
};

const PermissionContext = createContext<PermissionContextType | null>(null);

export const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
    const [permissions, setPermissions] = useState<Permission[]>(MOCK_PERMISSIONS);

    const handleAddPermission = useCallback((perm: Permission) => {
        setPermissions(prev => [perm, ...prev]);
    }, []);

    const handleUpdatePermission = useCallback((id: string, data: Partial<Permission>) => {
        setPermissions(prev =>
            prev.map(p => (p.id === id ? { ...p, ...data } : p))
        );
    }, []);

    const handleDeletePermission = useCallback((id: string) => {
        setPermissions(prev => prev.filter(p => p.id !== id));
    }, []);

    return (
        <PermissionContext.Provider
            value={{
                permissions,
                setPermissions,
                handleAddPermission,
                handleUpdatePermission,
                handleDeletePermission,
            }}
        >
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermissionContext = () => {
    const ctx = useContext(PermissionContext);
    if (!ctx) throw new Error("usePermissionContext must be used within PermissionProvider");
    return ctx;
};