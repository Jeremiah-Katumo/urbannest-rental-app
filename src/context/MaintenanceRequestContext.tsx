import React, { createContext, useContext, useState, useCallback } from "react";
import { MaintenanceRequest } from "../types";
import { MOCK_MAINTENANCE_REQUESTS } from "../constants";

type MaintenanceRequestContextType = {
    requests: MaintenanceRequest[];
    setRequests: React.Dispatch<React.SetStateAction<MaintenanceRequest[]>>;

    editingRequest: MaintenanceRequest | null;
    setEditingRequest: React.Dispatch<React.SetStateAction<MaintenanceRequest | null>>;

    handleAddRequest: (data: MaintenanceRequest) => void;
    handleUpdateRequest: (id: string, data: Partial<MaintenanceRequest>) => void;
    handleUpdateStatus: (id: string, status: MaintenanceRequest["status"]) => void;
    handleDeleteRequest: (id: string) => void;
};

const MaintenanceRequestContext = createContext<MaintenanceRequestContextType | null>(null);

export const MaintenanceRequestProvider = ({ children }: { children: React.ReactNode }) => {
    const [requests, setRequests] = useState<MaintenanceRequest[]>(MOCK_MAINTENANCE_REQUESTS);
    const [editingRequest, setEditingRequest] = useState<MaintenanceRequest | null>(null);

    const handleAddRequest = useCallback((data: MaintenanceRequest) => {
        if (editingRequest?.id) {
            setRequests(prev =>
                prev.map(r => (r.id === editingRequest.id ? { ...r, ...data } : r))
            );
        } else {
            setRequests(prev => [data, ...prev]);
        }
        setEditingRequest(null);
    }, [editingRequest]);

    const handleUpdateRequest = useCallback((id: string, data: Partial<MaintenanceRequest>) => {
        setRequests(prev =>
            prev.map(r => (r.id === id ? { ...r, ...data } : r))
        );
    }, []);

    const handleUpdateStatus = useCallback((id: string, status: MaintenanceRequest["status"]) => {
        setRequests(prev =>
            prev.map(r => (r.id === id ? { ...r, status } : r))
        );
    }, []);

    const handleDeleteRequest = useCallback((id: string) => {
        setRequests(prev => prev.filter(r => r.id !== id));
    }, []);

    return (
        <MaintenanceRequestContext.Provider
            value={{
                requests,
                setRequests,
                editingRequest,
                setEditingRequest,
                handleAddRequest,
                handleUpdateRequest,
                handleUpdateStatus,
                handleDeleteRequest,
            }}
        >
            {children}
        </MaintenanceRequestContext.Provider>
    );
};

export const useMaintenanceRequestContext = () => {
    const ctx = useContext(MaintenanceRequestContext);
    if (!ctx) throw new Error("useMaintenanceRequestContext must be used within MaintenanceRequestProvider");
    return ctx;
};