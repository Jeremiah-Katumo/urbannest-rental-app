import { create } from "zustand";
import { House, SearchFilters, User } from "../types";
import { MOCK_HOUSES } from "../constants";

type HouseState = {
    houses: House[];
    filters: SearchFilters;

    selectedHouse: House | null;
    editingHouse: House | null;

    filteredHouses: () => House[];

    setHouses: (fn: (prev: House[]) => House[]) => void;
    setFilters: (filters: Partial<SearchFilters>) => void;

    setSelectedHouse: (house: House | null) => void;
    setEditingHouse: (house: House | null) => void;

    addOrUpdateHouse: (houseData: Partial<House>, currentUser?: User | null) => void;
    updateHouse: (id: string, data: Partial<House>) => void;
    deleteHouse: (id: string) => void;

    toggleFavorite: (
        houseId: string,
        currentUser: User | null,
        setCurrentUser: (u: User) => void,
        setUsers: (u: User[]) => void,
        users: User[]
    ) => void;
};

export const useHouseStore = create<HouseState>((set, get) => ({
    houses: MOCK_HOUSES,

    filters: {
        location: "",
        minPrice: "",
        maxPrice: "",
        type: "All",
        bedrooms: "",
        amenities: [],
    },

    selectedHouse: null,
    editingHouse: null,

    setHouses: (fn) =>
        set((state) => ({
            houses: fn(state.houses),
        })),

    setFilters: (filters) =>
        set((state) => ({
            filters: { ...state.filters, ...filters },
        })),

    setSelectedHouse: (house) => set({ selectedHouse: house }),
    setEditingHouse: (house) => set({ editingHouse: house }),

    filteredHouses: () => {
        const { houses, filters } = get();

        return houses.filter((h) => {
            const matchLoc = h.location
                .toLowerCase()
                .includes(filters.location.toLowerCase());

            const matchMin =
                filters.minPrice === "" ||
                h.price >= Number(filters.minPrice);

            const matchMax =
                filters.maxPrice === "" ||
                h.price <= Number(filters.maxPrice);

            const matchType =
                filters.type === "All" || h.type === filters.type;

            const matchBeds =
                filters.bedrooms === "" ||
                h.bedrooms === Number(filters.bedrooms);

            return matchLoc && matchMin && matchMax && matchType && matchBeds;
        });
    },

    addOrUpdateHouse: (houseData, currentUser) => {
        const { editingHouse, houses } = get();

        if (editingHouse?.id) {
            set({
                houses: houses.map((h) =>
                    h.id === editingHouse.id ? { ...h, ...houseData } : h
                ),
                editingHouse: null,
            });
        } else {
            const newHouse: House = {
                id: Math.random().toString(36).substr(2, 9),
                title: houseData.title || "New Property",
                description: houseData.description || "",
                price: houseData.price || 0,
                location: houseData.location || "Unknown",
                type: houseData.type || "Apartment",
                bedrooms: houseData.bedrooms || 1,
                bathrooms: houseData.bathrooms || 1,
                images: [
                    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
                ],
                isAvailable: true,
                amenities: [],
                ownerId: currentUser?.id || "admin",
            };

            set({
                houses: [newHouse, ...houses],
                editingHouse: null,
            });
        }
    },

    updateHouse: (id, data) =>
        set((state) => ({
            houses: state.houses.map((h) =>
                h.id === id ? { ...h, ...data } : h
            ),
        })),

    deleteHouse: (id) =>
        set((state) => ({
            houses: state.houses.filter((h) => h.id !== id),
        })),

    toggleFavorite: (
        houseId,
        currentUser,
        setCurrentUser,
        setUsers,
        users
    ) => {
        if (!currentUser) return;

        const favorites = currentUser.favorites || [];

        const newFavorites = favorites.includes(houseId)
            ? favorites.filter((id) => id !== houseId)
            : [...favorites, houseId];

        const updatedUser: User = {
            ...currentUser,
            favorites: newFavorites,
        };

        setCurrentUser(updatedUser);

        setUsers(
            users.map((u) => (u.id === currentUser.id ? updatedUser : u))
        );
    },
}));