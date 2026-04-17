import React, { createContext, useContext, useState, useCallback } from "react";
import { Transporter } from "../types";
import { MOCK_TRANSPORTERS } from "../constants";
import { useAuthContext } from "./AuthContext";

type TransporterContextType = {
    transporters: Transporter[];
    setTransporters: React.Dispatch<React.SetStateAction<Transporter[]>>;

    handleAddTransporter: (data: Transporter) => void;
    handleUpdateTransporter: (id: string, data: Partial<Transporter>) => void;
    handleUpdateTransporterStatus: (id: string, status: Transporter["status"]) => void;
    handleDeleteTransporter: (id: string) => void;
};

const TransporterContext = createContext<TransporterContextType | null>(null);

export const TransporterProvider = ({ children }: { children: React.ReactNode }) => {
    const [transporters, setTransporters] = useState<Transporter[]>(MOCK_TRANSPORTERS);
    const [editingTransporter, setEditingTransporter] = useState<Transporter | null>(null);

    const { currentUser } = useAuthContext();

    const handleAddTransporter = useCallback((transporterData: Partial<Transporter>) => {
        if (editingTransporter?.id) {
            setTransporters(prev =>
                prev.map(t => t.id === editingTransporter.id ? { ...t, ...transporterData} : t)
            )
        } else {
            const newTransporter: Transporter = {
                id: crypto.randomUUID(),
                name: transporterData.name || 'New Transporter',
                email: transporterData.email || '',
                phone: transporterData.phone || '',
                vehicleType: transporterData.vehicleType || '',
                basePrice: transporterData.basePrice || 1000,
                pricePerKm: transporterData.pricePerKm || 450,
                rating: Math.random(),
                status: 'AVAILABLE',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${transporterData.email || 'new'}`
            }
            setTransporters([newTransporter, ...transporters]);
        }
        setEditingTransporter(null);
        alert(`Transporter hired! They will contact you shortly at ${currentUser?.phone || 'your registered number'}.`);
    }, [editingTransporter]);

    const handleUpdateTransporter = useCallback((transporterId: string, transporterData: Partial<Transporter>) => {
        setTransporters(prev =>
            prev.map(t => (t.id === transporterId ? { ...t, ...transporterData } : t))
        );
    }, []);

    const handleUpdateTransporterStatus = useCallback((transporterId: string, status: Transporter["status"]) => {
        setTransporters(prev =>
            prev.map(t => (t.id === transporterId ? { ...t, status: status } : t))
        );
    }, []);

    const handleDeleteTransporter = useCallback((transporterId: string) => {
        setTransporters(prev => prev.filter(t => t.id !== transporterId));
    }, []);

    return (
        <TransporterContext.Provider
            value={{
                transporters,
                setTransporters,
                handleAddTransporter,
                handleUpdateTransporter,
                handleUpdateTransporterStatus,
                handleDeleteTransporter,
            }}
        >
            {children}
        </TransporterContext.Provider>
    );
};

export const useTransporterContext = () => {
    const ctx = useContext(TransporterContext);
    if (!ctx) throw new Error("useTransporterContext must be used within TransporterProvider");
    return ctx;
};