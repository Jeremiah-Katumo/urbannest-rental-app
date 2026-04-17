import React, { createContext, useContext, useState, useMemo } from "react";
import { House, User, Campaign, Page, SearchFilters } from "../types";
import { MOCK_HOUSES, MOCK_USERS } from "../constants";
import { useAuthContext } from "./AuthContext";
import { useLocation } from "react-router-dom";
import { useHouseContext } from "./HouseContext";
import { useUserContext } from "./UserContext";
import { useCampaignContext } from "./CampaignContext";

type AppContextType = {
    currentPage: Page;
    setCurrentPage: React.Dispatch<React.SetStateAction<Page>>;

    houses: House[];
    setHouses: React.Dispatch<React.SetStateAction<House[]>>;

    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;

    campaigns: Campaign[];
    setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;

    filters: SearchFilters;
    setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;

    isManagementMode: boolean;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const { currentUser } = useAuthContext();

    const [currentPage, setCurrentPage] = useState<Page>("MARKETPLACE");
    const [houses, setHouses] = useState<House[]>(MOCK_HOUSES);
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [filters, setFilters] = useState<SearchFilters>({
        location: "",
        minPrice: "",
        maxPrice: "",
        type: "All",
        bedrooms: "",
        amenities: [],
    });

    const isManagementMode = useMemo(() => {
        if (!currentUser) return false;

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
            '/dashboard', '/management/homes', '/management/tenants', 
            '/management/agents', '/management/landlords', '/management/reports', 
            '/management/campaigns', '/settings', '/payments', '/support', 
            '/transporters', '/communications', '/roles-permissions', '/custom-fields', 
            '/user-management', '/delivery-requests'
        ];

        return roles.includes(currentUser.role) && locations.includes(location.pathname);
    }, [currentUser, location.pathname]);

    return (
        <AppContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                houses,
                setHouses,
                users,
                setUsers,
                campaigns,
                setCampaigns,
                filters,
                setFilters,
                isManagementMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
    return ctx;
};


export const useManagementProps = () => {
    const { currentUser } = useAuthContext();
    const { houses, setHouses, setEditingHouse, setSelectedHouse } = useHouseContext();
    const { users, setUsers, setEditingUser, setSelectedUserDetail } = useUserContext();
    const { campaigns, setCampaigns, setEditingCampaign } = useCampaignContext();

    return {
        currentUser,
        houses,
        users,
        campaigns,
        setHouses,
        setUsers,
        setCampaigns,
        setEditingHouse,
        setEditingUser,
        setEditingCampaign,
        setSelectedUserDetail,
        setSelectedHouse
    };
};