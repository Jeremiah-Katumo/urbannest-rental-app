import { create } from "zustand";
import { Booking, Lease, House, User } from "../types";

type BookingState = {
    bookings: Booking[];

    setBookings: (bookings: Booking[]) => void;

    addBooking: (
        houseId: string,
        startDate: string,
        endDate: string,
        params: {
            currentUser: User | null;
            houses: House[];
            selectedHouse: House | null;
            setSelectedHouse: (h: House | null) => void;
            navigate: (path: string) => void;
        }
    ) => void;

    updateBookingStatus: (
        id: string,
        status: Booking["status"],
        params: {
            bookings: Booking[];
            setHouses: (fn: (h: House[]) => House[]) => void;
            houses: House[];
            setLeases: (fn: (l: Lease[]) => Lease[]) => void;
            leases: Lease[];
        }
    ) => void;

    deleteBooking: (id: string) => void;
};

export const useBookingStore = create<BookingState>((set, get) => ({
    bookings: [],

    setBookings: (bookings) => set({ bookings }),

    // ✅ ADD BOOKING
    addBooking: (
        houseId: string,
        startDate: string,
        endDate: string,
        params: {
            currentUser: User | null;
            houses: House[];
            selectedHouse: House | null;
            setSelectedHouse: (h: House | null) => void;
            navigate: (path: string) => void;
        }
    ) => {
        const { bookings } = get();

        const {
            currentUser,
            houses,
            selectedHouse,
            setSelectedHouse,
            navigate,
        } = params;

        if (!currentUser || !selectedHouse) return;

        const house = houses.find((h) => h.id === selectedHouse.id);
        if (!house) return;

        const newBooking: Booking = {
            id: crypto.randomUUID(),
            houseId: selectedHouse.id,
            tenantId: currentUser.id,
            status: "PENDING",
            startDate,
            endDate,
            totalPrice: house.price,
            createdAt: new Date().toISOString(),
        };

        set({
            bookings: [newBooking, ...bookings],
        });

        setSelectedHouse(null);
        navigate("/my-bookings");
    },

    // ✅ UPDATE BOOKING STATUS
    updateBookingStatus: (bookingId, status, params) => {
        const { bookings } = get();

        const { setHouses, houses, setLeases, leases } = params;

        const updatedBookings = bookings.map((b) =>
            b.id === bookingId ? { ...b, status } : b
        );

        set({ bookings: updatedBookings });

        if (status !== "CONFIRMED") return;

        const booking = updatedBookings.find((b) => b.id === bookingId);
        if (!booking) return;

        const house = houses.find((h) => h.id === booking.houseId);

        // ❌ mark house unavailable
        setHouses((prev) =>
            prev.map((h) =>
                h.id === booking.houseId ? { ...h, isAvailable: false } : h
            )
        );

        // ✅ create lease
        const newLease: Lease = {
            id: crypto.randomUUID(),
            houseId: booking.houseId,
            tenantId: booking.tenantId,
            landlordId: house?.ownerId || "admin",
            status: "DRAFT",
            startDate: booking.startDate,
            endDate: booking.endDate,
            rentAmount: house?.price || 0,
            depositAmount: house?.price || 0,
            documentUrl: "#",
        };

        setLeases((prev) => [newLease, ...prev]);
    },

    // ✅ DELETE
    deleteBooking: (id) =>
        set((state) => ({
            bookings: state.bookings.filter((b) => b.id !== id),
        })),
}));