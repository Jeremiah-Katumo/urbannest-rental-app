import React, { createContext, useContext, useState, useCallback } from "react";
import { SubscriptionPlan, User } from "../types";
import { MOCK_SUBSCRIPTION_PLANS } from "../constants";
import { useAuthContext } from "./AuthContext";
import { useUserContext } from "./UserContext";

type SubscriptionPlanContextType = {
    plans: SubscriptionPlan[];
    setPlans: React.Dispatch<React.SetStateAction<SubscriptionPlan[]>>;

    editingPlan: SubscriptionPlan | null;
    setEditingPlan: React.Dispatch<React.SetStateAction<SubscriptionPlan | null>>;

    activePlanId: string | null;
    setActivePlanId: React.Dispatch<React.SetStateAction<string | null>>;

    handleAddPlan: (data: SubscriptionPlan) => void;
    handleSubscribePlan: (plan: SubscriptionPlan) => void;
    handleUpdatePlan: (id: string, data: Partial<SubscriptionPlan>) => void;
    handleDeletePlan: (id: string) => void;

    handleActivatePlan: (id: string) => void;

    handleToggleFeature: (planId: string, feature: string) => void;
};

const SubscriptionPlanContext = createContext<SubscriptionPlanContextType | null>(null);

export const SubscriptionPlanProvider = ({ children }: { children: React.ReactNode }) => {
    const [plans, setPlans] = useState<SubscriptionPlan[]>(MOCK_SUBSCRIPTION_PLANS);
    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
    const [activePlanId, setActivePlanId] = useState<string | null>(null);

    const { currentUser, setCurrentUser } = useAuthContext();
    const { setUsers } = useUserContext();

    // ➕ Add or Update
    const handleAddPlan = useCallback((data: SubscriptionPlan) => {
        if (editingPlan?.id) {
            setPlans(prev =>
                prev.map(p => (p.id === editingPlan.id ? { ...p, ...data } : p))
            );
        } else {
            setPlans(prev => [data, ...prev]);
        }
        setEditingPlan(null);
    }, [editingPlan]);

    const handleSubscribePlan = useCallback((plan: SubscriptionPlan) => {
        if (!currentUser) return;

        const updatedUser: User = {
            ...currentUser,
            role: plan.role,
            isSubscribed: true,
            subscriptionPlanId: plan.id,
            subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }

        setCurrentUser(updatedUser);
        setUsers(prev => 
            prev.map(u => 
                u.id === currentUser.id ? updatedUser : u
            )
        );
    }, [currentUser])

    // ✏️ Update
    const handleUpdatePlan = useCallback((id: string, data: Partial<SubscriptionPlan>) => {
        setPlans(prev =>
            prev.map(p => (p.id === id ? { ...p, ...data } : p))
        );
    }, []);

    // ❌ Delete
    const handleDeletePlan = useCallback((id: string) => {
        setPlans(prev => prev.filter(p => p.id !== id));
    }, []);

    // ⭐ Activate Plan (used for current user/org)
    const handleActivatePlan = useCallback((id: string) => {
        setActivePlanId(id);
    }, []);

    // 🎯 Toggle Features (great for feature gating)
    const handleToggleFeature = useCallback((planId: string, feature: string) => {
        setPlans(prev =>
            prev.map(p => {
                if (p.id !== planId) return p;

                const features = p.features || [];
                const exists = features.includes(feature);

                return {
                    ...p,
                    features: exists
                        ? features.filter(f => f !== feature)
                        : [...features, feature],
                };
            })
        );
    }, []);

    return (
        <SubscriptionPlanContext.Provider
            value={{
                plans,
                setPlans,
                editingPlan,
                setEditingPlan,
                activePlanId,
                setActivePlanId,
                handleSubscribePlan,
                handleAddPlan,
                handleUpdatePlan,
                handleDeletePlan,
                handleActivatePlan,
                handleToggleFeature,
            }}
        >
            {children}
        </SubscriptionPlanContext.Provider>
    );
};

export const useSubscriptionPlanContext = () => {
    const ctx = useContext(SubscriptionPlanContext);
    if (!ctx) {
        throw new Error("useSubscriptionPlanContext must be used within SubscriptionPlanProvider");
    }
    return ctx;
};