import React, { createContext, useContext, useState, useCallback } from "react";
import { Booking, Lease } from "../types";
import { useAuthContext } from "./AuthContext";
import { useHouseContext } from "./HouseContext";
import { useNavigate } from "react-router-dom";
import { useLeaseContext } from "./LeaseContext";

type BookingContextType = {
    bookings: Booking[];
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;

    handleAddBooking: (houseId: string, startDate: string, endDate: string) => void;
    handleUpdateBookingStatus: (id: string, status: Booking["status"]) => void;
    handleDeleteBooking: (id: string) => void;
};

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const { selectedHouse, setSelectedHouse } = useHouseContext();
    const [bookings, setBookings] = useState<Booking[]>([]);

    const { currentUser } = useAuthContext();
    const { houses, setHouses } = useHouseContext();
    const { leases, setLeases } = useLeaseContext();

    // ✅ Add booking
    const handleAddBooking = useCallback(
        (startDate: string, endDate: string) => {
            if (!currentUser || !selectedHouse) return;

            const house = houses.find(h => h.id === selectedHouse.id);
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

            setBookings([newBooking, ...bookings]);
            setSelectedHouse(null);
            navigate('/my-bookings');
        },
        [currentUser, houses]
    );

    // ✅ Update booking + update house availability (FIXED)
    const handleUpdateBookingStatus = useCallback((bookingId: string, status: Booking["status"]) => {
            setBookings(prev =>
                prev.map(b => (b.id === bookingId ? { ...b, status } : b))
            );

            if (status === "CONFIRMED") {
                const booking = bookings.find(b => b.id === bookingId);

                if (booking) {
                    setHouses(prev =>
                        prev.map(h =>
                            h.id === booking.houseId ? { ...h, isAvailable: false } : h
                        )
                    );

                    const house = houses.find(h => h.id === booking.houseId);
                    const newLease: Lease = {
                        id: Math.random().toString(36).substr(2, 9),
                        houseId: booking.houseId,
                        tenantId: booking.tenantId,
                        landlordId: house?.ownerId || 'admin',
                        status: 'DRAFT',
                        startDate: booking.startDate,
                        endDate: booking.endDate,
                        rentAmount: house?.price || 0,
                        depositAmount: house?.price || 0,
                        documentUrl: '#'
                    };
                    setLeases([newLease, ...leases]);
                }
            }
    }, [bookings, setHouses]);

    // ✅ Delete
    const handleDeleteBooking = useCallback((bookingId: string) => {
        setBookings(prev => prev.filter(b => b.id !== bookingId));
    }, []);

    return (
        <BookingContext.Provider
            value={{
                bookings,
                setBookings,
                handleAddBooking,
                handleUpdateBookingStatus,
                handleDeleteBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBookingContext = () => {
    const ctx = useContext(BookingContext);
    if (!ctx) throw new Error("useBookingContext must be used within BookingProvider");
    return ctx;
};