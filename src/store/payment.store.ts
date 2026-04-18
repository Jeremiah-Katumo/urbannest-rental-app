import { create } from "zustand";
import { Payment } from "../types";
import { MOCK_PAYMENTS } from "../constants";
import { useAuthStore } from "./auth.store";

type PaymentState = {
    payments: Payment[];

    setPayments: (
        fn: (prev: Payment[]) => Payment[]
    ) => void;

    simulatePayment: (bookingId: string, amount: number) => void;
};

export const usePaymentStore = create<PaymentState>((set) => ({
    payments: MOCK_PAYMENTS,

    // ✅ functional setter
    setPayments: (fn) =>
        set((state) => ({
            payments: fn(state.payments),
        })),

    // ✅ SIMULATE PAYMENT
    simulatePayment: (bookingId, amount) => {
        const { currentUser } = useAuthStore.getState();

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

        set((state) => ({
            payments: [newPayment, ...state.payments],
        }));

        // ⚠️ UI side effect (same as your logic)
        alert("M-Pesa Payment Successfully Received!");
    },
}));