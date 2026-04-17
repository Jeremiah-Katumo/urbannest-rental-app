import { create } from "zustand";
import { SupportIssue } from "@/src/types";

interface SupportState {
    issues: SupportIssue[];

    addIssue: (i: SupportIssue) => void;
    updateIssue: (id: string, status: SupportIssue["status"]) => void;
}

export const useSupportStore = create<SupportState>((set) => ({
    issues: [],

    addIssue: (i) =>
        set((state) => ({ issues: [i, ...state.issues] })),

    updateIssue: (id, status) =>
        set((state) => ({
            issues: state.issues.map((i) =>
                i.id === id ? { ...i, status } : i
            ),
        })),
}));