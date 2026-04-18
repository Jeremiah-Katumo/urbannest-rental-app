import { create } from "zustand";
import { SupportIssue, User } from "../types";
import { MOCK_ISSUES } from "../constants";

type SupportIssueState = {
    issues: SupportIssue[];
    editingIssue: SupportIssue | null;

    setIssues: (fn: (prev: SupportIssue[]) => SupportIssue[]) => void;
    setEditingIssue: (issue: SupportIssue | null) => void;

    addOrUpdateIssue: (
        data: Partial<SupportIssue>,
        currentUser: User | null
    ) => void;

    updateIssue: (id: string, data: Partial<SupportIssue>) => void;
    updateIssueStatus: (
        id: string,
        status: SupportIssue["status"]
    ) => void;

    deleteIssue: (id: string) => void;
};

export const useSupportIssueStore = create<SupportIssueState>(
    (set, get) => ({
        issues: MOCK_ISSUES,
        editingIssue: null,

        // ✅ functional setter
        setIssues: (fn) =>
            set((state) => ({
                issues: fn(state.issues),
            })),

        setEditingIssue: (issue) =>
            set({ editingIssue: issue }),

        // ✅ ADD / EDIT
        addOrUpdateIssue: (issueData, currentUser) => {
            const { editingIssue } = get();

            if (editingIssue?.id) {
                set((state) => ({
                    issues: state.issues.map((i) =>
                        i.id === editingIssue.id
                            ? { ...i, ...issueData }
                            : i
                    ),
                    editingIssue: null,
                }));
            } else {
                const newIssue: SupportIssue = {
                    id: crypto.randomUUID(),
                    userId: currentUser?.id || "guest",
                    subject: issueData.subject || "New Issue",
                    description: issueData.description || "",
                    status: "OPEN",
                    priority: issueData.priority || "MEDIUM",
                    category: issueData.category || "OTHER",
                    createdAt: new Date().toISOString(),
                };

                set((state) => ({
                    issues: [newIssue, ...state.issues],
                    editingIssue: null,
                }));
            }
        },

        // ✅ UPDATE
        updateIssue: (id, data) =>
            set((state) => ({
                issues: state.issues.map((i) =>
                    i.id === id ? { ...i, ...data } : i
                ),
            })),

        // ✅ UPDATE STATUS
        updateIssueStatus: (id, status) =>
            set((state) => ({
                issues: state.issues.map((i) =>
                    i.id === id ? { ...i, status } : i
                ),
            })),

        // ✅ DELETE
        deleteIssue: (id) =>
            set((state) => ({
                issues: state.issues.filter((i) => i.id !== id),
            })),
    })
);