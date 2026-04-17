import { create } from "zustand";
import { SubscriptionPlan, User } from "../types";
import { MOCK_SUBSCRIPTION_PLANS } from "../constants";
import { useAuthStore } from "./auth.store";

type Store = {
    plans: SubscriptionPlan[];
    activePlanId: string | null;

    setActivePlanId: (id: string | null) => void;

    subscribe: (plan: SubscriptionPlan) => void;
    updatePlan: (id: string, data: Partial<SubscriptionPlan>) => void;
    deletePlan: (id: string) => void;
};

export const useSubscriptionStore = create<Store>((set) => ({
    plans: MOCK_SUBSCRIPTION_PLANS,
    activePlanId: null,

    setActivePlanId: (id) => set({ activePlanId: id }),

    subscribe: (plan) => {
        const user = useAuthStore.getState().currentUser;
        if (!user) return;

        const updated: User = {
            ...user,
            role: plan.role,
            isSubscribed: true,
            subscriptionPlanId: plan.id,
            subscriptionExpiry: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
        };

        useAuthStore.setState({ currentUser: updated });
    },

    updatePlan: (id, data) =>
        set((state) => ({
            plans: state.plans.map((p) =>
                p.id === id ? { ...p, ...data } : p
            ),
        })),

    deletePlan: (id) =>
        set((state) => ({
            plans: state.plans.filter((p) => p.id !== id),
        })),
}));