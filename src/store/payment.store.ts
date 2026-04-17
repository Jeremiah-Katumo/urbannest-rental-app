import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Payment } from "../types";
import { useAuthStore } from "./auth.store";

type PaymentState = {
    payments: Payment[];
    simulatePayment: (bookingId: string, amount: number) => void;
};

export const usePaymentStore = create<PaymentState>()(
    persist(
        (set) => ({
            payments: [],

            simulatePayment: (bookingId, amount) => {
                const user = useAuthStore.getState().currentUser;

                if (!user) return;

                const payment: Payment = {
                    id: crypto.randomUUID(),
                    bookingId,
                    tenantId: user.id,
                    amount,
                    status: "COMPLETED",
                    method: "MPESA",
                    type: "RENT",
                    date: new Date().toISOString(),
                };

                set((state) => ({
                    payments: [payment, ...state.payments],
                }));
            },
        }),
        {
            name: "payment-store",
        }
    )
);