
import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import BookingModal from './components/common/BookingModal';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import AuthOverlay from './components/auth/AuthOverlay';
import Settings from './components/pages/Settings';
import PaymentHistory from './components/common/PaymentHistory';
import SupportCenter from './components/common/SupportCenter';
import MapFeature from './components/common/MapFeature';
import TransporterMarket from './components/tenant/TransporterMarket';
import ChatSystem from './components/common/ChatSystem';
import LeaseManager from './components/tenant/LeaseManager';
import Wishlist from './components/tenant/Wishlist';
import UserDetailsModal from './components/admin/UserDetailsModal';
import CommunicationCenter from './components/common/CommunicationCenter';
import SubscriptionPlans from './components/common/SubscriptionPlans';
import RolesPermissions from './components/admin/RolesPermissions';
import CustomFieldsManager from './components/admin/CustomFieldsManager';
import PropertyDetailsModal from './components/common/PropertyDetailsModal';

// Pages
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import MyBookings from './pages/MyBookings';
import Reports from './pages/Reports';
import ManagementPage from './pages/Management';

import { MOCK_HOUSES, MOCK_USERS, MOCK_TRANSPORTERS, MOCK_ISSUES, MOCK_PAYMENTS, MOCK_LEASES, MOCK_ANNOUNCEMENTS, MOCK_SUBSCRIPTION_PLANS, MOCK_PERMISSIONS, MOCK_ROLES, MOCK_CUSTOM_FIELDS } from './constants';
import { House, UserRole, Booking, SearchFilters, User, AuthPage, Campaign, Payment, SupportIssue, Transporter, Lease, Announcement, SubscriptionPlan, RoleDefinition, Permission, CustomField, Lead, MaintenanceRequest } from './types';
import { MessageSquare, X } from 'lucide-react';

const App: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Auth State
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [authView, setAuthView] = useState<AuthPage>('LOGIN');

    // App State
    const [houses, setHouses] = useState<House[]>(MOCK_HOUSES);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [campaigns, setCampaigns] = useState<Campaign[]>([
        { id: 'c1', name: 'Summer Hot Deals', description: 'Promoting waterfront properties', status: 'ACTIVE', budget: 5000, targetAudience: 'Families', startDate: '2024-06-01' },
        { id: 'c2', name: 'Student Studios', description: 'Low cost housing for university students', status: 'PAUSED', budget: 1200, targetAudience: 'Students', startDate: '2024-08-15' }
    ]);
    const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
    const [issues, setIssues] = useState<SupportIssue[]>(MOCK_ISSUES);
    const [transporters, setTransporters] = useState<Transporter[]>(MOCK_TRANSPORTERS);
    const [leases, setLeases] = useState<Lease[]>(MOCK_LEASES);
    const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
    const [activeChat, setActiveChat] = useState<User | null>(null);
    const [selectedUserDetail, setSelectedUserDetail] = useState<User | null>(null);
    const [subscriptionPlans] = useState<SubscriptionPlan[]>(MOCK_SUBSCRIPTION_PLANS);
    const [roles, setRoles] = useState<RoleDefinition[]>(MOCK_ROLES);
    const [permissions] = useState<Permission[]>(MOCK_PERMISSIONS);
    const [customFields, setCustomFields] = useState<CustomField[]>(MOCK_CUSTOM_FIELDS);
    const [selectedHouseView, setSelectedHouseView] = useState<House | null>(null);
    const [leads] = useState<Lead[]>([
        { id: 'l1', houseId: 'h1', name: 'Alice Smith', email: 'alice@example.com', phone: '123456', message: 'Interested in viewing.', status: 'NEW', createdAt: '2024-04-11T10:00:00Z' },
        { id: 'l2', houseId: 'h2', name: 'Bob Brown', email: 'bob@example.com', phone: '654321', message: 'Is the price negotiable?', status: 'QUALIFIED', createdAt: '2024-04-10T15:00:00Z' }
    ]);
    const [maintenance] = useState<MaintenanceRequest[]>([
        { id: 'm1', houseId: 'h1', tenantId: 'u1', title: 'Leaking Sink', description: 'The kitchen sink is leaking.', priority: 'MEDIUM', status: 'OPEN', createdAt: '2024-04-09T08:00:00Z' }
    ]);

    // Guardrail for Business Subscription
    useEffect(() => {
        const managementPages = ['/dashboard', '/management/homes', '/management/tenants', '/management/agents', '/management/landlords', '/management/reports', '/management/campaigns', '/payments', '/transporters', '/communications'];
        if (currentUser && currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPPORT' && currentUser.role !== 'TENANT') {
            if (!currentUser.isSubscribed && managementPages.includes(location.pathname)) {
                navigate('/subscriptions');
            }
        }
    }, [currentUser, location.pathname, navigate]);

    // Modal/Form States
    const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
    const [isEditingHouse, setIsEditingHouse] = useState<House | null>(null);
    const [isEditingUser, setIsEditingUser] = useState<User | null>(null);
    const [isEditingCampaign, setIsEditingCampaign] = useState<Campaign | null>(null);

    // Filter States //
    const [filters, setFilters] = useState<SearchFilters>({
        location: '',
        minPrice: '',
        maxPrice: '',
        type: 'All',
        bedrooms: '',
        amenities: []
    });
    //
    const isManagementMode = currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'LANDLORD' || currentUser.role === 'AGENT' || currentUser.role === 'SUPPORT' || currentUser.role === 'TRANSPORTER') &&
        ['/dashboard', '/management/homes', '/management/tenants', '/management/agents', '/management/landlords', '/management/reports', '/management/campaigns', '/settings', '/payments', '/support', '/transporters', '/communications', '/roles-permissions', '/custom-fields', '/user-management', '/delivery-requests'].includes(location.pathname);

    // Derived filtered houses //
    const filteredHouses = useMemo(() => {
        return houses.filter(h => {
            const matchLoc = h.location.toLowerCase().includes(filters.location.toLowerCase());
            const matchMin = filters.minPrice === '' || h.price >= (filters.minPrice as number);
            const matchMax = filters.maxPrice === '' || h.price <= (filters.maxPrice as number);
            const matchType = filters.type === 'All' || h.type === filters.type;
            const matchBeds = filters.bedrooms === '' || h.bedrooms === Number(filters.bedrooms);
            return matchLoc && matchMin && matchMax && matchType && matchBeds;
        });
    }, [houses, filters]);

    // Handlers //
    const handleLogin = (email: string, role: UserRole) => {
        const user = users.find(u => u.email === email && u.role === role) || {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email: email,
            role: role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            joinedDate: new Date().toISOString().split('T')[0],
            status: 'ACTIVE'
        };
        setCurrentUser(user as User);
        setAuthView('NONE');
        navigate(role === 'TENANT' ? '/' : '/dashboard');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setAuthView('LOGIN');
        navigate('/');
    };

    // CRUD Houses //
    const saveHouse = (houseData: Partial<House>) => {
        if (isEditingHouse?.id) {
            setHouses(prev => prev.map(h => h.id === isEditingHouse.id ? { ...h, ...houseData } as House : h));
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
        setIsEditingHouse(null);
    };

    // CRUD Users //
    const saveUser = (userData: Partial<User>) => {
        if (isEditingUser?.id) {
            setUsers(prev => prev.map(u => u.id === isEditingUser.id ? { ...u, ...userData } as User : u));
        } else {
            const newUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                name: userData.name || 'New User',
                email: userData.email || '',
                role: userData.role || 'TENANT',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email || 'new'}`,
                joinedDate: new Date().toISOString().split('T')[0],
                status: 'ACTIVE'
            };
            setUsers([...users, newUser]);
        }
        setIsEditingUser(null);
    };

    // CRUD Campaigns //
    const saveCampaign = (campaignData: Partial<Campaign>) => {
        if (isEditingCampaign?.id) {
            setCampaigns(prev => prev.map(c => c.id === isEditingCampaign.id ? { ...c, ...campaignData } as Campaign : c));
        } else {
            const newCampaign: Campaign = {
                id: Math.random().toString(36).substr(2, 9),
                name: campaignData.name || 'New Campaign',
                description: campaignData.description || '',
                status: 'ACTIVE',
                budget: campaignData.budget || 0,
                targetAudience: campaignData.targetAudience || 'All',
                startDate: new Date().toISOString().split('T')[0]
            };
            setCampaigns([...campaigns, newCampaign]);
        }
        setIsEditingCampaign(null);
    };
    //
    const handleBookingSubmit = (startDate: string, endDate: string) => {
        if (!selectedHouse || !currentUser) return;
        const newBooking: Booking = {
            id: Math.random().toString(36).substr(2, 9),
            houseId: selectedHouse.id,
            tenantId: currentUser.id,
            status: 'PENDING',
            startDate,
            endDate,
            totalPrice: selectedHouse.price,
            createdAt: new Date().toISOString()
        };
        setBookings([newBooking, ...bookings]);
        setSelectedHouse(null);
        navigate('/my-bookings');
    };
    //
    const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
        if (status === 'CONFIRMED') {
            const booking = bookings.find(b => b.id === bookingId);
            if (booking) {
                setHouses(prev => prev.map(h => h.id === booking.houseId ? { ...h, isAvailable: false } : h));
                // Create a draft lease automatically
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
    };
    //
    const handleAddIssue = (issueData: Partial<SupportIssue>) => {
        const newIssue: SupportIssue = {
            id: Math.random().toString(36).substr(2, 9),
            userId: currentUser?.id || 'guest',
            subject: issueData.subject || 'New Issue',
            description: issueData.description || '',
            status: 'OPEN',
            priority: issueData.priority || 'MEDIUM',
            category: issueData.category || 'OTHER',
            createdAt: new Date().toISOString()
        };
        setIssues([newIssue, ...issues]);
    };
    //
    const handleUpdateIssueStatus = (issueId: string, status: SupportIssue['status']) => {
        setIssues(prev => prev.map(i => i.id === issueId ? { ...i, status } : i));
    };
    //
    const handleSignLease = (leaseId: string) => {
        setLeases(prev => prev.map(l => l.id === leaseId ? { ...l, status: 'SIGNED', signedAt: new Date().toISOString() } : l));
    };
    //
    const handleHireTransporter = (transporterId: string) => {
        alert(`Transporter hired! They will contact you shortly at ${currentUser?.phone || 'your registered number'}.`);
    };

    const handleSimulatePayment = (bookingId: string, amount: number) => {
        const newPayment: Payment = {
            id: Math.random().toString(36).substr(2, 9),
            bookingId,
            tenantId: currentUser?.id || 'guest',
            amount,
            status: 'COMPLETED',
            method: 'MPESA',
            type: 'RENT',
            date: new Date().toISOString()
        };
        setPayments([newPayment, ...payments]);
        alert("M-Pesa Payment Successful! Receipt generated.");
    };
    //
    const handleToggleFavorite = (houseId: string) => {
        if (!currentUser) return;
        const favorites = currentUser.favorites || [];
        const newFavorites = favorites.includes(houseId)
            ? favorites.filter(id => id !== houseId)
            : [...favorites, houseId];

        const updatedUser = { ...currentUser, favorites: newFavorites };
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    };
    //
    const handleAddAnnouncement = (announcementData: Partial<Announcement>) => {
        const newAnnouncement: Announcement = {
            id: Math.random().toString(36).substr(2, 9),
            senderId: currentUser?.id || 'admin',
            targetRoles: announcementData.targetRoles || ['TENANT'],
            title: announcementData.title || 'New Announcement',
            content: announcementData.content || '',
            timestamp: new Date().toISOString(),
            priority: announcementData.priority || 'NORMAL'
        };
        setAnnouncements([newAnnouncement, ...announcements]);
    };
    //
    const handleSubscribe = (plan: SubscriptionPlan) => {
        if (!currentUser) return;

        const updatedUser: User = {
            ...currentUser,
            role: plan.role,
            isSubscribed: true,
            subscriptionPlanId: plan.id,
            subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };

        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
        navigate('/dashboard');
        alert(`Successfully subscribed to ${plan.name}! You now have access to ${plan.role} features.`);
    };
    //
    const handleUpdateRole = (role: RoleDefinition) => {
        setRoles(prev => prev.map(r => r.id === role.id ? role : r));
    };
    //
    const handleAddRole = (roleData: Partial<RoleDefinition>) => {
        const newRole: RoleDefinition = {
            id: Math.random().toString(36).substr(2, 9),
            name: roleData.name || 'New Role',
            role: roleData.role || 'TENANT',
            permissions: roleData.permissions || []
        };
        setRoles([...roles, newRole]);
    };
    //
    const handleDeleteRole = (roleId: string) => {
        if (confirm('Are you sure you want to delete this role?')) {
            setRoles(prev => prev.filter(r => r.id !== roleId));
        }
    };
    //
    const handleAddCustomField = (fieldData: Partial<CustomField>) => {
        const newField: CustomField = {
            id: Math.random().toString(36).substr(2, 9),
            name: fieldData.name || 'custom_field',
            label: fieldData.label || 'Custom Field',
            type: fieldData.type || 'text',
            entity: fieldData.entity || 'HOUSE',
            options: fieldData.options,
            defaultValue: fieldData.defaultValue
        };
        setCustomFields([...customFields, newField]);
    };

    const handleDeleteCustomField = (fieldId: string) => {
        if (confirm('Are you sure you want to delete this custom field?')) {
            setCustomFields(prev => prev.filter(f => f.id !== fieldId));
        }
    };

    const managementProps = {
        currentUser,
        houses,
        users,
        campaigns,
        setHouses,
        setUsers,
        setCampaigns,
        setIsEditingHouse,
        setIsEditingUser,
        setIsEditingCampaign,
        setSelectedUserDetail,
        setSelectedHouseView
    };

    return (
        <div className={`min-h-screen bg-slate-50/50 ${isManagementMode ? 'pl-72' : ''}`}>
            {!isManagementMode && authView === 'NONE' && (
                <Navbar
                    currentRole={currentUser?.role || 'TENANT'}
                    currentUser={currentUser || { name: 'Guest', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest' } as User}
                    onRoleChange={() => { }}
                />
            )}

            {isManagementMode && (
                <Sidebar
                    userRole={currentUser!.role}
                    onLogout={handleLogout}
                />
            )}

            {authView !== 'NONE' ? (
                <AuthOverlay view={authView} onLogin={handleLogin} onNavigate={setAuthView} onClose={() => { }} />
            ) : (
                <main className={`${isManagementMode ? 'p-12 max-w-[1400px] mx-auto' : ''}`}>
                    <Routes>
                        <Route path="/" element={
                            <Marketplace
                                filters={filters}
                                setFilters={setFilters}
                                filteredHouses={filteredHouses}
                                currentUser={currentUser}
                                handleToggleFavorite={handleToggleFavorite}
                                setSelectedHouse={setSelectedHouse}
                            />
                        } />
                        <Route path="/dashboard" element={
                            <Dashboard
                                currentUser={currentUser}
                                houses={houses}
                                payments={payments}
                                leases={leases}
                                maintenance={maintenance}
                                bookings={bookings}
                                leads={leads}
                                campaigns={campaigns}
                                transporters={transporters}
                                users={users}
                                navigate={navigate}
                            />
                        } />

                        <Route path="/management/homes" element={<ManagementPage type="HOMES" {...managementProps} />} />
                        <Route path="/management/tenants" element={<ManagementPage type="TENANTS" {...managementProps} />} />
                        <Route path="/management/landlords" element={<ManagementPage type="LANDLORDS" {...managementProps} />} />
                        <Route path="/management/agents" element={<ManagementPage type="AGENTS" {...managementProps} />} />
                        <Route path="/management/campaigns" element={<ManagementPage type="CAMPAIGNS" {...managementProps} />} />
                        <Route path="/management/reports" element={<Reports />} />
                        <Route path="/management/transporters" element={<ManagementPage type="TRANSPORTERS" {...managementProps} />} />
                        <Route path="/user-management" element={<ManagementPage type="USERS" {...managementProps} />} />
                        <Route path="/delivery-requests" element={<ManagementPage type="DELIVERY_REQUESTS" {...managementProps} />} />

                        <Route path="/about" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><AboutUs /></div>} />
                        <Route path="/contact" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><ContactUs /></div>} />
                        <Route path="/settings" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><Settings user={currentUser!} onLogout={handleLogout} /></div>} />
                        <Route path="/payments" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><PaymentHistory payments={payments} currentUser={currentUser!} bookings={bookings} houses={houses} onSimulatePayment={handleSimulatePayment} /></div>} />
                        <Route path="/support" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><SupportCenter issues={issues} currentUser={currentUser!} onAddIssue={handleAddIssue} onUpdateStatus={handleUpdateIssueStatus} /></div>} />
                        <Route path="/transporters" element={
                            currentUser?.role === 'ADMIN'
                                ? <ManagementPage type="TRANSPORTERS" {...managementProps} />
                                : <div className="w-full px-4 sm:px-6 lg:px-12 py-12"><TransporterMarket transporters={transporters} currentUser={currentUser!} onHire={handleHireTransporter} /></div>
                        } />
                        <Route path="/wishlist" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><Wishlist houses={houses} currentUser={currentUser!} onRemove={handleToggleFavorite} onSelect={setSelectedHouse} /></div>} />
                        <Route path="/leases" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><LeaseManager leases={leases} currentUser={currentUser!} houses={houses} onSignLease={handleSignLease} /></div>} />
                        <Route path="/communications" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><CommunicationCenter currentUser={currentUser!} announcements={announcements} onAddAnnouncement={handleAddAnnouncement} /></div>} />
                        <Route path="/subscriptions" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><SubscriptionPlans plans={subscriptionPlans} currentUser={currentUser!} onSubscribe={handleSubscribe} /></div>} />
                        <Route path="/roles-permissions" element={<RolesPermissions roles={roles} permissions={permissions} onUpdateRole={handleUpdateRole} onAddRole={handleAddRole} onDeleteRole={handleDeleteRole} />} />
                        <Route path="/custom-fields" element={<CustomFieldsManager fields={customFields} onAddField={handleAddCustomField} onDeleteField={handleDeleteCustomField} />} />
                        <Route path="/map" element={<MapFeature houses={houses} selectedHouse={null} />} />
                        <Route path="/my-bookings" element={<MyBookings bookings={bookings} currentUser={currentUser} houses={houses} />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            )}

            {selectedHouse && currentUser && (
                <BookingModal house={selectedHouse} user={currentUser} onClose={() => setSelectedHouse(null)} onSubmit={handleBookingSubmit} />
            )}

            {selectedUserDetail && (
                <UserDetailsModal
                    user={selectedUserDetail}
                    payments={payments}
                    houses={houses}
                    leases={leases}
                    bookings={bookings}
                    onClose={() => setSelectedUserDetail(null)}
                />
            )}

            {selectedHouseView && (
                <PropertyDetailsModal
                    house={selectedHouseView}
                    owner={users.find(u => u.id === selectedHouseView.ownerId)}
                    onClose={() => setSelectedHouseView(null)}
                />
            )}

            {activeChat && currentUser && (
                <ChatSystem currentUser={currentUser} targetUser={activeChat} onClose={() => setActiveChat(null)} />
            )}

            {currentUser && !activeChat && (
                <button
                    onClick={() => setActiveChat(MOCK_USERS.find(u => u.role === 'SUPPORT') || null)}
                    className="fixed bottom-6 right-6 bg-indigo-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all z-40"
                >
                    <MessageSquare className="w-6 h-6" />
                </button>
            )}

            {/* MODAL FORMS FOR CRUD */}
            {isEditingHouse && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black text-slate-900">{isEditingHouse.id ? 'Refine Property' : 'Enlist New Haven'}</h2>
                            <button onClick={() => setIsEditingHouse(null)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); saveHouse(isEditingHouse); }} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                <input placeholder="Sunset Villa..." value={isEditingHouse.title || ''} onChange={e => setIsEditingHouse({ ...isEditingHouse, title: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rent ($/mo)</label>
                                    <input type="number" placeholder="2500" value={isEditingHouse.price || ''} onChange={e => setIsEditingHouse({ ...isEditingHouse, price: Number(e.target.value) })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                                    <input placeholder="Manhattan, NY" value={isEditingHouse.location || ''} onChange={e => setIsEditingHouse({ ...isEditingHouse, location: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all text-lg">Commit Records</button>
                        </form>
                    </div>
                </div>
            )}

            {isEditingUser && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black text-slate-900">{isEditingUser.id ? 'Update Member' : `Register ${isEditingUser.role}`}</h2>
                            <button onClick={() => setIsEditingUser(null)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); saveUser(isEditingUser); }} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input placeholder="Jane Cooper" value={isEditingUser.name || ''} onChange={e => setIsEditingUser({ ...isEditingUser, name: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                <input type="email" placeholder="jane@example.com" value={isEditingUser.email || ''} onChange={e => setIsEditingUser({ ...isEditingUser, email: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                            </div>
                            <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all text-lg">Save Member Data</button>
                        </form>
                    </div>
                </div>
            )}

            {isEditingCampaign && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black text-slate-900">{isEditingCampaign.id ? 'Optimize Campaign' : 'Initiate Outreach'}</h2>
                            <button onClick={() => setIsEditingCampaign(null)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); saveCampaign(isEditingCampaign); }} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Campaign Title</label>
                                <input placeholder="Q4 Market Boost" value={isEditingCampaign.name || ''} onChange={e => setIsEditingCampaign({ ...isEditingCampaign, name: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Allocated Budget</label>
                                    <input type="number" placeholder="5000" value={isEditingCampaign.budget || ''} onChange={e => setIsEditingCampaign({ ...isEditingCampaign, budget: Number(e.target.value) })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Segment</label>
                                    <input placeholder="Corporate" value={isEditingCampaign.targetAudience || ''} onChange={e => setIsEditingCampaign({ ...isEditingCampaign, targetAudience: e.target.value })} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 font-bold" required />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all text-lg">Launch Campaign</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
