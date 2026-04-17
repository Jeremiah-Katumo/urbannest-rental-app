import React, { createContext, useContext, useState, useCallback } from "react";
import { Payment } from "../types";
import { MOCK_PAYMENTS } from "../constants";
import { useAuthContext } from "./AuthContext";

type PaymentContextType = {
    payments: Payment[];
    setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;

    handleSimulatePayment: (bookingId: string, amount: number) => void;
};

const PaymentContext = createContext<PaymentContextType | null>(null);

export const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
    const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);

    const { currentUser } = useAuthContext();

    const handleSimulatePayment = useCallback((bookingId: string, amount: number) => {
            if (!currentUser) return;

            const newPayment: Payment = {
                id: crypto.randomUUID(),
                bookingId,
                tenantId: currentUser.id,
                amount,
                status: "COMPLETED",
                method: "MPESA",
                type: "RENT",
                date: new Date().toISOString(),
            };

            setPayments(prev => [newPayment, ...prev]);

            alert("M-Pesa Payment Successfully Received!");
        },
        [currentUser]
    );

    return (
        <PaymentContext.Provider
            value={{
                payments,
                setPayments,
                handleSimulatePayment,
            }}
        >
            {children}
        </PaymentContext.Provider>
    );
};

export const usePaymentContext = () => {
    const ctx = useContext(PaymentContext);
    if (!ctx) throw new Error("usePaymentContext must be used within PaymentProvider");
    return ctx;
};