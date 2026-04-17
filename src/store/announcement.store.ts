import { create } from "zustand";
import { Announcement } from "../types";
import { MOCK_ANNOUNCEMENTS } from "../constants";
import { useAuthStore } from "./auth.store";

type AnnouncementStore = {
    announcements: Announcement[];
    setAnnouncements: (data: Announcement[]) => void;

    addAnnouncement: (data: Partial<Announcement>) => void;
    updateAnnouncement: (id: string, data: Partial<Announcement>) => void;
    deleteAnnouncement: (id: string) => void;
};

export const useAnnouncementStore = create<AnnouncementStore>((set, get) => ({
    announcements: MOCK_ANNOUNCEMENTS,

    setAnnouncements: (data) => set({ announcements: data }),

    addAnnouncement: (data) => {
        const user = useAuthStore.getState().currentUser;

        const newAnnouncement: Announcement = {
            id: crypto.randomUUID(),
            senderId: user?.id || "admin",
            targetRoles: data.targetRoles || ["TENANT"],
            title: data.title || "New Announcement",
            content: data.content || "",
            timestamp: new Date().toISOString(),
            priority: data.priority || "NORMAL",
        };

        set((state) => ({
            announcements: [newAnnouncement, ...state.announcements],
        }));
    },

    updateAnnouncement: (id, data) =>
        set((state) => ({
            announcements: state.announcements.map((a) =>
                a.id === id ? { ...a, ...data } : a
            ),
        })),

    deleteAnnouncement: (id) =>
        set((state) => ({
            announcements: state.announcements.filter((a) => a.id !== id),
        })),
}));