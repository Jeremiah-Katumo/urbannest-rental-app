import React, { createContext, useContext, useState, useCallback } from "react";
import { Lease } from "../types";
import { MOCK_LEASES } from "../constants";

type LeaseContextType = {
    leases: Lease[];
    setLeases: React.Dispatch<React.SetStateAction<Lease[]>>;

    editingLease: Lease | null;
    setEditingLease: React.Dispatch<React.SetStateAction<Lease | null>>;

    handleAddLease: (data: Lease) => void;
    handleUpdateLease: (id: string, data: Partial<Lease>) => void;
    handleUpdateLeaseStatus: (id: string, status: Lease["status"]) => void;
    handleSignLease: (id: string) => void;
    handleDeleteLease: (id: string) => void;
};

const LeaseContext = createContext<LeaseContextType | null>(null);

export const LeaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [leases, setLeases] = useState<Lease[]>(MOCK_LEASES);
    const [editingLease, setEditingLease] = useState<Lease | null>(null);

    const handleAddLease = useCallback((data: Lease) => {
        if (editingLease?.id) {
            setLeases(prev =>
                prev.map(l => (l.id === editingLease.id ? { ...l, ...data } : l))
            );
        } else {
            setLeases(prev => [data, ...prev]);
        }
        setEditingLease(null);
    }, [editingLease]);

    const handleUpdateLease = useCallback((id: string, data: Partial<Lease>) => {
        setLeases(prev =>
            prev.map(l => (l.id === id ? { ...l, ...data } : l))
        );
    }, []);

    const handleUpdateLeaseStatus = useCallback((id: string, status: Lease["status"]) => {
        setLeases(prev =>
            prev.map(l =>
                l.id === id
                    ? { ...l, status, signedAt: new Date().toISOString() }
                    : l
            )
        );
    }, []);

    const handleSignLease = useCallback((leaseId: string) => {
        setLeases(prev => 
            prev.map(l => 
                l.id === leaseId 
                ? { ...l, status: 'SIGNED', signedAt: new Date().toISOString() } 
                : l)
            )
    }, [])

    const handleDeleteLease = useCallback((id: string) => {
        setLeases(prev => prev.filter(l => l.id !== id));
    }, []);

    return (
        <LeaseContext.Provider
            value={{
                leases,
                setLeases,
                editingLease,
                setEditingLease,
                handleAddLease,
                handleUpdateLease,
                handleSignLease,
                handleUpdateLeaseStatus,
                handleDeleteLease,
            }}
        >
            {children}
        </LeaseContext.Provider>
    );
};

export const useLeaseContext = () => {
    const ctx = useContext(LeaseContext);
    if (!ctx) throw new Error("useLeaseContext must be used within LeaseProvider");
    return ctx;
};