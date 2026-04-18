import { create } from "zustand";
import { Announcement } from "../types";
import { MOCK_ANNOUNCEMENTS } from "../constants";
import { useAuthStore } from "./auth.store";

type AnnouncementState = {
    announcements: Announcement[];
    editingAnnouncement: Announcement | null;

    setAnnouncements: (
        fn: (prev: Announcement[]) => Announcement[]
    ) => void;

    setEditingAnnouncement: (
        announcement: Announcement | null
    ) => void;

    addOrUpdateAnnouncement: (
        data: Partial<Announcement>
    ) => void;

    updateAnnouncement: (
        id: string,
        data: Partial<Announcement>
    ) => void;

    deleteAnnouncement: (id: string) => void;
};

export const useAnnouncementStore = create<AnnouncementState>(
    (set, get) => ({
        announcements: MOCK_ANNOUNCEMENTS,
        editingAnnouncement: null,

        // ✅ functional setter
        setAnnouncements: (fn) =>
            set((state) => ({
                announcements: fn(state.announcements),
            })),

        setEditingAnnouncement: (announcement) =>
            set({ editingAnnouncement: announcement }),

        // ✅ ADD / EDIT
        addOrUpdateAnnouncement: (data) => {
            const { editingAnnouncement } = get();
            const { currentUser } = useAuthStore.getState();

            if (editingAnnouncement?.id) {
                set((state) => ({
                    announcements: state.announcements.map((a) =>
                        a.id === editingAnnouncement.id
                            ? { ...a, ...data }
                            : a
                    ),
                    editingAnnouncement: null,
                }));
            } else {
                const newAnnouncement: Announcement = {
                    id: crypto.randomUUID(),
                    senderId: currentUser?.id || "admin",
                    targetRoles: data.targetRoles || ["TENANT"],
                    title: data.title || "New Announcement",
                    content: data.content || "",
                    timestamp: new Date().toISOString(),
                    priority: data.priority || "NORMAL",
                };

                set((state) => ({
                    announcements: [
                        newAnnouncement,
                        ...state.announcements,
                    ],
                    editingAnnouncement: null,
                }));
            }
        },

        // ✅ UPDATE
        updateAnnouncement: (id, data) =>
            set((state) => ({
                announcements: state.announcements.map((a) =>
                    a.id === id ? { ...a, ...data } : a
                ),
            })),

        // ✅ DELETE
        deleteAnnouncement: (id) =>
            set((state) => ({
                announcements: state.announcements.filter(
                    (a) => a.id !== id
                ),
            })),
    })
);