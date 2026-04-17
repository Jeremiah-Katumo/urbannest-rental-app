import React, { createContext, useContext, useState, useCallback } from "react";
import { Announcement } from "../types";
import { MOCK_ANNOUNCEMENTS } from "../constants";
import { useAuthContext } from "./AuthContext";

type AnnouncementContextType = {
    announcements: Announcement[];
    setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;

    handleAddAnnouncement: (data: Announcement) => void;
    handleUpdateAnnouncement: (id: string, data: Partial<Announcement>) => void;
    handleDeleteAnnouncement: (id: string) => void;
};

const AnnouncementContext = createContext<AnnouncementContextType | null>(null);

export const AnnouncementProvider = ({ children }: { children: React.ReactNode }) => {
    const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

    const { currentUser } = useAuthContext();

    const handleAddAnnouncement = useCallback((announcementData: Partial<Announcement>) => {
        if (editingAnnouncement?.id) {
            setAnnouncements(prev =>
                prev.map(a =>
                    a.id === editingAnnouncement.id ? { ...a, ...announcementData } : a
                )
            )
        } else {
            const newAnnouncement: Announcement = {
                id: crypto.randomUUID(),
                senderId: currentUser?.id || 'admin',
                targetRoles: announcementData.targetRoles || ['TENANT'],
                title: announcementData.title || 'New Announcement',
                content: announcementData.content || '',
                timestamp: new Date().toISOString(),
                priority: announcementData.priority || 'NORMAL'
            }
            setAnnouncements([newAnnouncement, ...announcements]);
        }
        setEditingAnnouncement(null);
    }, [editingAnnouncement]);

    const handleUpdateAnnouncement = useCallback((id: string, data: Partial<Announcement>) => {
        setAnnouncements(prev =>
            prev.map(a => (a.id === id ? { ...a, ...data } : a))
        );
    }, []);

    const handleDeleteAnnouncement = useCallback((id: string) => {
        setAnnouncements(prev => prev.filter(a => a.id !== id));
    }, []);

    return (
        <AnnouncementContext.Provider
            value={{
                announcements,
                setAnnouncements,
                handleAddAnnouncement,
                handleUpdateAnnouncement,
                handleDeleteAnnouncement,
            }}
        >
            {children}
        </AnnouncementContext.Provider>
    );
};

export const useAnnouncementContext = () => {
    const ctx = useContext(AnnouncementContext);
    if (!ctx) throw new Error("useAnnouncementContext must be used within AnnouncementProvider");
    return ctx;
};