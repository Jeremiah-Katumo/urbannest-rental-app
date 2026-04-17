import { create } from "zustand";
import { Booking } from "@/src/types";

interface BookingState {
    bookings: Booking[];

    addBooking: (b: Booking) => void;
    updateStatus: (id: string, status: Booking["status"]) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    bookings: [],

    addBooking: (b) =>
        set((state) => ({ bookings: [b, ...state.bookings] })),

    updateStatus: (id, status) =>
        set((state) => ({
            bookings: state.bookings.map((b) =>
                b.id === id ? { ...b, status } : b
            ),
        })),
}));