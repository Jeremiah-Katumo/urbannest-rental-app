import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { House, SearchFilters } from "../types";
import { MOCK_HOUSES } from "../constants";
import { useAuthContext } from "./AuthContext";
import { useUserContext } from "./UserContext";

type HouseContextType = {
    houses: House[];
    setHouses: React.Dispatch<React.SetStateAction<House[]>>;

    filters: SearchFilters;
    setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;

    selectedHouse: House | null;
    setSelectedHouse: React.Dispatch<React.SetStateAction<House | null>>;

    editingHouse: House | null;
    setEditingHouse: React.Dispatch<React.SetStateAction<House | null>>;

    filteredHouses: House[];

    handleAddHouse: (houseData: House) => void;
    handleUpdateHouse: (houseId: string, data: Partial<House>) => void;
    handleDeleteHouse: (houseId: string) => void;
    handleToggleFavorite: (houseId: string) => void;
};

const HouseContext = createContext<HouseContextType | null>(null);

export const HouseProvider = ({ children }: { children: React.ReactNode }) => {
    const { currentUser, setCurrentUser } = useAuthContext();
    const { users, setUsers } = useUserContext();
    const [houses, setHouses] = useState<House[]>(MOCK_HOUSES);

    const [filters, setFilters] = useState<SearchFilters>({
        location: "",
        minPrice: "",
        maxPrice: "",
        type: "All",
        bedrooms: "",
        amenities: [],
    });
    
    const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
    const [editingHouse, setEditingHouse] = useState<House | null>(null);

    // ✅ Filtering logic (fixed)
    const filteredHouses = useMemo(() => {
        return houses.filter((h) => {
            const matchLoc = h.location.toLowerCase().includes(filters.location.toLowerCase());
            const matchMin = filters.minPrice === '' || h.price >= (filters.minPrice as number);
            const matchMax = filters.maxPrice === '' || h.price <= (filters.maxPrice as number);
            const matchType = filters.type === 'All' || h.type === filters.type;
            const matchBeds = filters.bedrooms === '' || h.bedrooms === Number(filters.bedrooms);
            return matchLoc && matchMin && matchMax && matchType && matchBeds;
        });
    }, [houses, filters]);

    // ✅ Add / Edit house
    const handleAddHouse = useCallback((houseData: Partial<House>) => {
        if (editingHouse?.id) {
            setHouses((prev) =>
                prev.map((h) =>
                    h.id === editingHouse.id ? { ...h, ...houseData } as House : h
                )
            );
        } else {
            const newHouse: House = {
                id: Math.random().toString(36).substr(2, 9),
                title: houseData.title || 'New Property',
                description: houseData.description || '',
                price: houseData.price || 0,
                location: houseData.location || 'Unknown',
                type: houseData.type || 'Apartment',
                bedrooms: houseData.bedrooms || 1,
                bathrooms: houseData.bathrooms || 1,
                images: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80'],
                isAvailable: true,
                amenities: [],
                ownerId: currentUser?.id || 'admin'
            };
            setHouses([newHouse, ...houses]);
        }

        setEditingHouse(null);
    }, [editingHouse]);

    // ✅ Update
    const handleUpdateHouse = useCallback((id: string, campaignData: Partial<House>) => {
        setHouses((prev) =>
            prev.map((h) => (h.id === id ? { ...h, ...campaignData } : h))
        );
    }, []);

    const handleToggleFavorite = useCallback((houseId: string) => {
        if (!currentUser) return;

        const favorites = currentUser.favorites || [];
        const newFavorites = favorites.includes(houseId)
            ? favorites.filter(id => id !== houseId)
            : [...favorites, houseId];

        const updatedUser = { ...currentUser, favorites: newFavorites };
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => 
            u.id === currentUser.id ? updatedUser : u
        ));
    }, [currentUser])

    // ✅ Delete
    const handleDeleteHouse = useCallback((id: string) => {
        setHouses((prev) => prev.filter((h) => h.id !== id));
    }, []);

    return (
        <HouseContext.Provider
            value={{
                houses,
                setHouses,
                filters,
                setFilters,
                selectedHouse,
                setSelectedHouse,
                editingHouse,
                setEditingHouse,
                filteredHouses,
                handleAddHouse,
                handleUpdateHouse,
                handleDeleteHouse,
                handleToggleFavorite
            }}
        >
            {children}
        </HouseContext.Provider>
    );
};

// ✅ Custom hook (clean access)
export const useHouseContext = () => {
    const ctx = useContext(HouseContext);
    if (!ctx) throw new Error("useHouseContext must be used within HouseProvider");
    return ctx;
};