import React, { createContext, useContext, useState, useCallback } from "react";
import { SupportIssue } from "../types";
import { MOCK_ISSUES } from "../constants";
import { useAuthContext } from "./AuthContext";

type SupportIssueContextType = {
    issues: SupportIssue[];
    setIssues: React.Dispatch<React.SetStateAction<SupportIssue[]>>;

    editingIssue: SupportIssue | null;
    setEditingIssue: React.Dispatch<React.SetStateAction<SupportIssue | null>>;

    handleAddIssue: (data: SupportIssue) => void;
    handleUpdateIssue: (id: string, data: Partial<SupportIssue>) => void;
    handleUpdateIssueStatus: (id: string, status: SupportIssue["status"]) => void;
    handleDeleteIssue: (id: string) => void;
};

const SupportIssueContext = createContext<SupportIssueContextType | null>(null);

export const SupportIssueProvider = ({ children }: { children: React.ReactNode }) => {
    const [issues, setIssues] = useState<SupportIssue[]>(MOCK_ISSUES);
    const [editingIssue, setEditingIssue] = useState<SupportIssue | null>(null);

    const { currentUser } = useAuthContext();

    const handleAddIssue = useCallback((issueData: Partial<SupportIssue>) => {
        if (editingIssue?.id) {
            setIssues(prev =>
                prev.map(i => (i.id === editingIssue.id ? { ...i, ...issueData } : i))
            );
        } else {
            const newIssue: SupportIssue = {
                id: crypto.randomUUID(),
                userId: currentUser?.id || 'guest',
                subject: issueData.subject || 'New Issue',
                description: issueData.description || '',
                status: 'OPEN',
                priority: issueData.priority || 'MEDIUM',
                category: issueData.category || 'OTHER',
                createdAt: new Date().toISOString()
            }
            setIssues([newIssue, ...issues]);
        }
        setEditingIssue(null);
    }, [editingIssue]);

    const handleUpdateIssue = useCallback((issueId: string, issueData: Partial<SupportIssue>) => {
        setIssues(prev =>
            prev.map(i => (i.id === issueId ? { ...i, ...issueData } : i))
        );
    }, []);

    const handleUpdateIssueStatus = useCallback((issueId: string, status: SupportIssue["status"]) => {
        setIssues(prev =>
            prev.map(i => (i.id === issueId ? { ...i, status } : i))
        );
    }, []);

    const handleDeleteIssue = useCallback((issueId: string) => {
        setIssues(prev => prev.filter(i => i.id !== issueId));
    }, []);

    return (
        <SupportIssueContext.Provider
            value={{
                issues,
                setIssues,
                editingIssue,
                setEditingIssue,
                handleAddIssue,
                handleUpdateIssue,
                handleUpdateIssueStatus,
                handleDeleteIssue,
            }}
        >
            {children}
        </SupportIssueContext.Provider>
    );
};

export const useSupportIssueContext = () => {
    const ctx = useContext(SupportIssueContext);
    if (!ctx) throw new Error("useSupportIssueContext must be used within SupportIssueProvider");
    return ctx;
};