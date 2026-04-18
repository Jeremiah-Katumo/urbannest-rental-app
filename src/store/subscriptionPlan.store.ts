import { create } from "zustand";
import { SubscriptionPlan, User } from "../types";
import { MOCK_SUBSCRIPTION_PLANS } from "../constants";
import { useAuthStore } from "./auth.store";
import { useUserStore } from "./user.store";

type SubscriptionPlanState = {
    plans: SubscriptionPlan[];
    editingPlan: SubscriptionPlan | null;
    activePlanId: string | null;

    setPlans: (
        fn: (prev: SubscriptionPlan[]) => SubscriptionPlan[]
    ) => void;

    setEditingPlan: (plan: SubscriptionPlan | null) => void;
    setActivePlanId: (id: string | null) => void;

    addOrUpdatePlan: (data: SubscriptionPlan) => void;
    subscribePlan: (plan: SubscriptionPlan) => void;

    updatePlan: (
        id: string,
        data: Partial<SubscriptionPlan>
    ) => void;

    deletePlan: (id: string) => void;

    activatePlan: (id: string) => void;

    toggleFeature: (planId: string, feature: string) => void;
};

export const useSubscriptionPlanStore =
    create<SubscriptionPlanState>((set, get) => ({
        plans: MOCK_SUBSCRIPTION_PLANS,
        editingPlan: null,
        activePlanId: null,

        // ✅ functional setter
        setPlans: (fn) =>
            set((state) => ({
                plans: fn(state.plans),
            })),

        setEditingPlan: (plan) =>
            set({ editingPlan: plan }),

        setActivePlanId: (id) =>
            set({ activePlanId: id }),

        // ✅ ADD / EDIT
        addOrUpdatePlan: (data) => {
            const { editingPlan } = get();

            if (editingPlan?.id) {
                set((state) => ({
                    plans: state.plans.map((p) =>
                        p.id === editingPlan.id ? { ...p, ...data } : p
                    ),
                    editingPlan: null,
                }));
            } else {
                set((state) => ({
                    plans: [data, ...state.plans],
                    editingPlan: null,
                }));
            }
        },

        // ✅ SUBSCRIBE (cross-store)
        subscribePlan: (plan) => {
            const { currentUser, setCurrentUser } =
                useAuthStore.getState();
            const { setUsers } = useUserStore.getState();

            if (!currentUser) return;

            const updatedUser: User = {
                ...currentUser,
                role: plan.role,
                isSubscribed: true,
                subscriptionPlanId: plan.id,
                subscriptionExpiry: new Date(
                    Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toISOString(),
            };

            // update auth user
            setCurrentUser(updatedUser);

            // update users list
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === currentUser.id ? updatedUser : u
                )
            );
        },

        // ✅ UPDATE
        updatePlan: (id, data) =>
            set((state) => ({
                plans: state.plans.map((p) =>
                    p.id === id ? { ...p, ...data } : p
                ),
            })),

        // ✅ DELETE
        deletePlan: (id) =>
            set((state) => ({
                plans: state.plans.filter(
                    (p) => p.id !== id
                ),
            })),

        // ✅ ACTIVATE
        activatePlan: (id) =>
            set({ activePlanId: id }),

        // ✅ TOGGLE FEATURE
        toggleFeature: (planId, feature) =>
            set((state) => ({
                plans: state.plans.map((p) => {
                    if (p.id !== planId) return p;

                    const features = p.features || [];
                    const exists = features.includes(feature);

                    return {
                        ...p,
                        features: exists
                            ? features.filter((f) => f !== feature)
                            : [...features, feature],
                    };
                }),
            })),
    }));