// store/useAppStore.ts
import { create } from "zustand";
import { House, User, Campaign, Page, SearchFilters } from "../types";
import { MOCK_HOUSES, MOCK_USERS } from "../constants";

interface AppState {
    // UI state
    currentPage: Page;
    setCurrentPage: (page: Page) => void;

    // data
    houses: House[];
    setHouses: (houses: House[]) => void;

    users: User[];
    setUsers: (users: User[]) => void;

    campaigns: Campaign[];
    setCampaigns: (campaigns: Campaign[]) => void;

    // filters
    filters: SearchFilters;
    setFilters: (filters: SearchFilters) => void;

    // derived helper (not state but kept for convenience)
    isManagementMode: (pathname: string, role?: string) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
    // initial state
    currentPage: "MARKETPLACE",

    houses: MOCK_HOUSES,
    users: MOCK_USERS,
    campaigns: [],

    filters: {
        location: "",
        minPrice: "",
        maxPrice: "",
        type: "All",
        bedrooms: "",
        amenities: [],
    },

    // setters
    setCurrentPage: (page) => set({ currentPage: page }),

    setHouses: (houses) => set({ houses }),

    setUsers: (users) => set({ users }),

    setCampaigns: (campaigns) => set({ campaigns }),

    setFilters: (filters) => set({ filters }),

    // derived logic (replaces useMemo in context)
    isManagementMode: (pathname, role) => {
        if (!role) return false;

        const roles = [
            "TENANT",
            "LANDLORD",
            "AGENT",
            "SUPER_ADMIN",
            "ADMIN",
            "SUPPORT",
            "TRANSPORTER",
        ];

        const locations = [
            "/dashboard",
            "/management/homes",
            "/management/tenants",
            "/management/agents",
            "/management/landlords",
            "/management/reports",
            "/management/campaigns",
            "/settings",
            "/payments",
            "/support",
            "/transporters",
            "/communications",
            "/roles-permissions",
            "/custom-fields",
            "/user-management",
            "/delivery-requests",
        ];

        return roles.includes(role) && locations.includes(pathname);
    },
}));