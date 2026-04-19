
import React, { useState, useEffect, JSX } from 'react';
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

import { MOCK_USERS } from './constants';
import { House, RoleDefinition, SupportIssue, User, UserRole } from './types';
import { MessageSquare, X } from 'lucide-react';
import { useAuthStore } from './store/auth.store';
import { useHouseStore } from './store/house.store';
import { useAppStore } from './store/app.store';
import { useCampaignStore } from './store/campaign.store';
import { useBookingStore } from './store/booking.store';
import { useSupportIssueStore } from './store/support.store';
import { useLeaseStore } from './store/lease.store';
import { useMaintenanceRequestStore } from './store/maintenanceRequest.store';
import { useUserStore } from './store/user.store';
import { useTransporterStore } from './store/transporter.store';
import { usePaymentStore } from './store/payment.store';
import { usePermissionStore } from './store/permission.store';
import { useAnnouncementStore } from './store/announcement.store';
import { useChatStore } from './store/chat.store';
import { useSubscriptionPlanStore } from './store/subscriptionPlan.store';
import { useRoleStore } from './store/role.store';
import { useCustomFieldStore } from './store/customField.store';
import { useLeadStore } from './store/lead.store';
import CampaignModal from './components/modals/CampaignModal';
import HouseModal from './components/modals/HouseModal';
import UserModal from './components/modals/UserModal';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // AuthStore 
  const currentUser = useAuthStore((s) => s.currentUser);
  const authView = useAuthStore((s) => s.authView);

  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const setAuthView = useAuthStore((s) => s.setAuthView);
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const toggleFavorite = useAuthStore((s) => s.toggleFavorite);

  // AppStore
  const isManagementMode = useAppStore((s) => s.isManagementMode(location.pathname, currentUser?.role));

  const users = useUserStore(s => s.users);
  const isEditingUser = useUserStore(s => s.editingUser);
  const selectedUser = useUserStore(s => s.selectedUser);
  const selectedUserDetail = useUserStore(s => s.selectedUserDetail);
  const setUsers = useUserStore(s => s.setUsers);
  const setIsEditingUser = useUserStore(s => s.setEditingUser);
  const setSelectedUser = useUserStore(s => s.setSelectedUser);
  const setSelectedUserDetail = useUserStore(s => s.setSelectedUserDetail);
  const handleAddOrUpdateUser = useUserStore(s => s.addOrUpdateUser);
  const updateUser = useUserStore(s => s.updateUser);
  const deleteUse = useUserStore(s => s.deleteUser);

  // HouseStore
  const houses = useHouseStore((hs) => hs.houses);
  const filters = useHouseStore((hs) => hs.filters);
  const selectedHouse = useHouseStore((hs) => hs.selectedHouse);
  const isEditingHouse = useHouseStore((hs) => hs.editingHouse);

  const filteredHouses = useHouseStore((hs) => hs.filteredHouses);
  const setHouses = useHouseStore((hs) => hs.setHouses);
  const setFilters = useHouseStore((hs) => hs.setFilters);
  const setSelectedHouse = useHouseStore((hs) => hs.setSelectedHouse);
  const setIsEditingHouse = useHouseStore((hs) => hs.setEditingHouse);
  const handleAddOrUpdateHouse = useHouseStore((hs) => hs.addOrUpdateHouse);
  const updateHouse = useHouseStore((hs) => hs.updateHouse);
  const deleteHouse = useHouseStore((hs) => hs.deleteHouse);
  // const toggleFavorite = useHouseStore((hs) => hs.toggleFavorite);

  // CampaignStore
  const campaigns = useCampaignStore((s) => s.campaigns);
  const isEditingCampaign = useCampaignStore(s => s.editingCampaign);
  const setCampaigns = useCampaignStore((s) => s.setCampaigns);
  const setIsEditingCampaign = useCampaignStore((s) => s.setEditingCampaign);
  const handleAddOrUpdateCampaign = useCampaignStore((s) => s.addOrUpdateCampaign);
  const updateCampaign = useCampaignStore((s) => s.updateCampaign);
  const deleteCampaign = useCampaignStore((s) => s.deleteCampaign);

  // BookingStore
  const bookings = useBookingStore((s) => s.bookings);
  const setBookings = useBookingStore((s) => s.setBookings);
  const handleBookingSubmit = useBookingStore((s) => s.addBooking);
  const updateBookingStatus = useBookingStore((s) => s.updateBookingStatus)
  const deleteBooking = useBookingStore((s) => s.deleteBooking);

  // SUpportIssueStore
  const issues = useSupportIssueStore((s) => s.issues);
  const isEditingIssue = useSupportIssueStore((s) => s.editingIssue);
  const setIssues = useSupportIssueStore((s) => s.setIssues);
  const setIsEditingIssue = useSupportIssueStore((s) => s.setEditingIssue);
  const handleAddOrUpdateIssue = useSupportIssueStore((s) => s.addOrUpdateIssue);
  const updateIssue = useSupportIssueStore((s) => s.updateIssue);
  const updateIssueStatus = useSupportIssueStore((s) => s.updateIssueStatus);
  const deleteIssue = useSupportIssueStore((s) => s.deleteIssue);

  const leases = useLeaseStore((s) => s.leases);
  const isEditingLease = useLeaseStore((s) => s.editingLease);
  const setLeases = useLeaseStore((s) => s.setLeases);
  const setEditingLease = useLeaseStore((s) => s.setEditingLease);
  const handleAddOrUpdateLease = useLeaseStore((s) => s.addOrUpdateLease);
  const updateLease = useLeaseStore((s) => s.updateLease);
  const updateLeaseStatus = useLeaseStore((s) => s.updateLeaseStatus);
  const handleSignLease = useLeaseStore(s => s.signLease);
  const deleteLease = useLeaseStore((s) => s.deleteLease);

  const requests = useMaintenanceRequestStore(s => s.requests);
  const isEditingRequests = useMaintenanceRequestStore(s => s.editingRequest);
  const setRequests = useMaintenanceRequestStore(s => s.setRequests);
  const setIsEditingRequest = useMaintenanceRequestStore(s => s.setEditingRequest);
  const handleAddOrUpdateRequest = useMaintenanceRequestStore(s => s.addOrUpdateRequest);
  const updateRequest = useMaintenanceRequestStore(s => s.updateRequest);
  const handleUpdateRequestStatus = useMaintenanceRequestStore(s => s.updateStatus);
  const deleteRequest = useMaintenanceRequestStore(s => s.deleteRequest);

  const transporters = useTransporterStore(s => s.transporters);
  const isEditingTransporter = useTransporterStore(s => s.editingTransporter);
  const setTransporters = useTransporterStore(s => s.setTransporters);
  const setIsEditingTransporter = useTransporterStore(s => s.setEditingTransporter);
  const handleAddOrUpdateTransporter = useTransporterStore(s => s.addOrUpdateTransporter);
  const updateTransporter = useTransporterStore(s => s.updateTransporter);
  const updateTransporterStatus = useTransporterStore(s => s.updateTransporter);
  const deleteTransporter = useTransporterStore(s => s.deleteTransporter);

  const payments = usePaymentStore(s => s.payments);
  const setPayments = usePaymentStore(s => s.setPayments);
  const handleSimulatePayment = usePaymentStore(s => s.simulatePayment);

  const permissions = usePermissionStore(s => s.permissions);
  const setPermissions = usePermissionStore(s => s.setPermissions);
  const handleAddPermission = usePermissionStore(s => s.addPermission);
  const updatePermission = usePermissionStore(s => s.updatePermission)
  const deletePermission = usePermissionStore(s => s.deletePermission);

  const announcements = useAnnouncementStore(s => s.announcements);
  const isEditingAnnouncement = useAnnouncementStore(s => s.editingAnnouncement);
  const setAnnouncements = useAnnouncementStore(s => s.setAnnouncements);
  const setEditingAnnouncement = useAnnouncementStore(s => s.setEditingAnnouncement);
  const handleAddOrUpdateAnnouncement = useAnnouncementStore(s => s.addOrUpdateAnnouncement);
  const updateAnnouncement = useAnnouncementStore(s => s.updateAnnouncement);
  const deleteAnnouncement = useAnnouncementStore(s => s.deleteAnnouncement);

  const conversations = useChatStore(s => s.conversations);
  const activeConversationId = useChatStore(s => s.activeConversationId);
  const activeChat = useChatStore(s => s.activeChat);
  const setConversations = useChatStore(s => s.setConversations);
  const setActiveChat = useChatStore(s => s.setActiveChat);
  const handleSendMessage = useChatStore(s => s.sendMessage);
  const createConversation = useChatStore(s => s.createConversation);

  const subscriptionPlans = useSubscriptionPlanStore(s => s.plans);
  const isEditingSubscriptionPlan = useSubscriptionPlanStore(s => s.editingPlan);
  const activeSubscriptionPlan = useSubscriptionPlanStore(s => s.activatePlan);
  const setSubscriptionPlans = useSubscriptionPlanStore(s => s.setPlans);
  const handleAddOrUpdateSubscriptionPlan = useSubscriptionPlanStore(s => s.addOrUpdatePlan);
  const setIsEditingSubscriptionPlan = useSubscriptionPlanStore(s => s.setEditingPlan);
  const handleSubscribePlan = useSubscriptionPlanStore(s => s.subscribePlan);
  const updatePlan = useSubscriptionPlanStore(s => s.updatePlan);
  const deletePlan = useSubscriptionPlanStore(s => s.deletePlan);
  const activatePlan = useSubscriptionPlanStore(s => s.activatePlan);
  const toggleFeaturePlan = useSubscriptionPlanStore(s => s.toggleFeature);

  const roles = useRoleStore(s => s.roles);
  const isEditingRole = useRoleStore(s => s.editingRole);
  const setRoles = useRoleStore(s => s.setRoles);
  const handleAddRole = useRoleStore(s => s.addRole);
  const handleUpdateRole = useRoleStore(s => s.updateRole);
  const handleDeleteRole = useRoleStore(s => s.deleteRole)

  const customFields = useCustomFieldStore(s => s.fields);
  const isEditingCUstomField = useCustomFieldStore(s => s.editingField);
  const setCustomFields = useCustomFieldStore(s => s.setFields);
  const handleAddCustomField = useCustomFieldStore(s => s.addField);
  const handleUpdateCustomField = useCustomFieldStore(s => s.updateField);
  const handleDeleteCustomField = useCustomFieldStore(s => s.deleteField)

  const leads = useLeadStore(s => s.leads)
  const setLeads = useLeadStore(s => s.setLeads);
  const handleAddLead = useLeadStore(s => s.addLead);
  const handleUpdateLead = useLeadStore(s => s.updateLead);
  const handleDeleteLead = useLeadStore(s => s.deleteLead);

  const maintenances = useMaintenanceRequestStore(s => s.requests);
  const isEditingMaintenances = useMaintenanceRequestStore(s => s.editingRequest)
  const setMaintenances = useMaintenanceRequestStore(s => s.setRequests);
  const setIsEditingMaintenance = useMaintenanceRequestStore(s => s.setEditingRequest);
  const handleAddOrUpdateMaintenance = useMaintenanceRequestStore(s => s.addOrUpdateRequest);
  const handleUpdateMaintenance = useMaintenanceRequestStore(s => s.updateRequest);
  const handleUpdateMaintenanceStatus = useMaintenanceRequestStore(s => s.updateStatus);
  const handleDeleteMaintenance = useMaintenanceRequestStore(s => s.deleteRequest);

  // App State
  const [selectedHouseView, setSelectedHouseView] = useState<House | null>(null);

  // Guardrail for Business Subscription
  useEffect(() => {
    const managementPages = ['/dashboard', '/management/homes', '/management/tenants', '/management/agents', '/management/landlords', '/management/reports', '/management/campaigns', '/payments', '/management/transporters', '/communications'];
    if (!currentUser) {
      navigate('/')
    } else if (currentUser && currentUser.role !== 'ADMIN' && currentUser.role !== 'SUPPORT' && currentUser.role !== 'TENANT') {
      if (!currentUser.isSubscribed && managementPages.includes(location.pathname)) {
        navigate('/subscriptions');
      }
    }
  }, [currentUser, location.pathname, navigate]);

  // Handlers //
  const handleLogin = (email: string, role: UserRole) => {
    login(email, role);
    navigate(role === "TENANT" ? "/" : "/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const requireAuth = (element: JSX.Element) => {
    if (!currentUser) {
      setAuthView('LOGIN');
      return <Navigate to="/" state={{ from: location.pathname }} replace />;
    }
    return element;
  };

  // CRUD  
  const handleHireTransporter = (transporterId: string) => {
    alert(`Transporter hired! They will contact you shortly at ${currentUser?.phone || 'your registered number'}.`);
  };

  const managementProps = {
    currentUser,
    houses,
    users,
    campaigns,
    subscriptionPlans,
    setHouses,
    setUsers,
    setCampaigns,
    setSubscriptionPlans,
    setIsEditingHouse,
    setIsEditingUser,
    setIsEditingCampaign,
    setIsEditingSubscriptionPlan,
    setSelectedUserDetail,
    setSelectedHouseView
  };

  return (
    <div className={`min-h-screen bg-slate-50/50 ${isManagementMode ? 'pl-72' : ''}`}>
      {!isManagementMode && authView === 'NONE' && (
        <Navbar
          currentRole={currentUser?.role || 'TENANT'}
          currentUser={{ name: 'Guest', avatar: '...' } as User}
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
        <AuthOverlay view={authView} onLogin={handleLogin} onNavigate={setAuthView} onClose={() => setAuthView('NONE')} />
      ) : (
        <main className={`${isManagementMode ? 'p-12 max-w-[1400px] mx-auto' : ''}`}>
          {/* <Navbar
            currentRole={currentUser?.role || 'TENANT'}
            currentUser={currentUser}
            onRoleChange={() => { }}
          /> */}
          <Routes>
            <Route path="/" element={
              <Marketplace
                filters={filters}
                setFilters={setFilters}
                filteredHouses={filteredHouses()}
                currentUser={currentUser}
                handleToggleFavorite={toggleFavorite}
                setSelectedHouse={setSelectedHouse}
              />
            } />
            <Route path="/dashboard" element={
              requireAuth(
                <Dashboard
                  currentUser={currentUser}
                  houses={houses}
                  payments={payments}
                  leases={leases}
                  maintenance={maintenances}
                  bookings={bookings}
                  leads={leads}
                  campaigns={campaigns}
                  transporters={transporters}
                  users={users}
                  navigate={navigate}
                />
              )
            } />

            <Route path="/management/homes" element={requireAuth(<ManagementPage type="HOMES" {...managementProps} />)} />
            <Route path="/management/tenants" element={requireAuth(<ManagementPage type="TENANTS" {...managementProps} />)} />
            <Route path="/management/landlords" element={requireAuth(<ManagementPage type="LANDLORDS" {...managementProps} />)} />
            <Route path="/management/agents" element={requireAuth(<ManagementPage type="AGENTS" {...managementProps} />)} />
            <Route path="/management/campaigns" element={requireAuth(<ManagementPage type="CAMPAIGNS" {...managementProps} />)} />
            <Route path="/management/reports" element={requireAuth(<Reports />)} />
            <Route path="/management/transporters" element={requireAuth(<ManagementPage type="TRANSPORTERS" {...managementProps} />)} />
            <Route path="/management/subscriptions" element={requireAuth(<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><SubscriptionPlans plans={subscriptionPlans} currentUser={currentUser!} onSubscribe={handleSubscribePlan} /></div>)} />
            <Route path='/management/settings' element={requireAuth(<Settings user={currentUser!} onLogout={handleLogout} />)} />
            <Route path="/user-management" element={requireAuth(<ManagementPage type="USERS" {...managementProps} />)} />
            <Route path="/delivery-requests" element={requireAuth(<ManagementPage type="DELIVERY_REQUESTS" {...managementProps} />)} />

            <Route path="/about" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><AboutUs /></div>} />
            <Route path="/contact" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><ContactUs /></div>} />
            <Route path="/settings" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><Settings user={currentUser!} onLogout={handleLogout} /></div>} />
            <Route path="/payments" element={requireAuth(<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><PaymentHistory payments={payments} currentUser={currentUser!} bookings={bookings} houses={houses} onSimulatePayment={handleSimulatePayment} /></div>)} />
            <Route path="/support" element={requireAuth(<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><SupportCenter issues={issues} currentUser={currentUser!} onAddIssue={(data: Partial<SupportIssue>) => handleAddOrUpdateIssue(data, currentUser)} onUpdateStatus={updateIssueStatus} /></div>)} />
            <Route path="/transporters" element={<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><TransporterMarket transporters={transporters} currentUser={currentUser!} onHire={handleHireTransporter} /></div>} />
            <Route path="/wishlist" element={requireAuth(<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><Wishlist houses={houses} currentUser={currentUser!} onRemove={toggleFavorite} onSelect={setSelectedHouse} /></div>)} />
            <Route path="/leases" element={requireAuth(<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><LeaseManager leases={leases} currentUser={currentUser!} houses={houses} onSignLease={handleSignLease} /></div>)} />
            <Route path="/communications" element={requireAuth(<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><CommunicationCenter currentUser={currentUser!} announcements={announcements} onAddAnnouncement={handleAddOrUpdateAnnouncement} /></div>)} />
            <Route path="/subscriptions" element={requireAuth(<div className="w-full px-4 sm:px-6 lg:px-12 py-12"><SubscriptionPlans plans={subscriptionPlans} currentUser={currentUser!} onSubscribe={handleSubscribePlan} /></div>)} />
            <Route path="/roles-permissions" element={requireAuth(<RolesPermissions roles={roles} permissions={permissions} onUpdateRole={(role: RoleDefinition) => handleUpdateRole(role.id, role)} onAddRole={(role: Partial<RoleDefinition>) => handleAddRole(role, currentUser)} onDeleteRole={handleDeleteRole} />)} />
            <Route path="/custom-fields" element={requireAuth(<CustomFieldsManager fields={customFields} onAddField={handleAddCustomField} onDeleteField={handleDeleteCustomField} />)} />
            <Route path="/map" element={<MapFeature houses={houses} selectedHouse={null} />} />
            <Route path="/my-bookings" element={requireAuth(<MyBookings bookings={bookings} currentUser={currentUser} houses={houses} />)} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      )}

      {selectedHouse && currentUser && (
        <BookingModal house={selectedHouse} user={currentUser} onClose={() => setSelectedHouse(null)} onSubmit={(startDate: string, endDate: string) =>
          handleBookingSubmit(
            selectedHouse.id,
            startDate,
            endDate,
            {
              currentUser,
              houses,
              selectedHouse,
              setSelectedHouse,
              navigate
            }
          )
        } />
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
          title='Messages'
          onClick={() => setActiveChat(MOCK_USERS.find(u => u.role === 'SUPPORT') || null)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all z-40"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* MODAL FORMS FOR CRUD */}
      {isEditingHouse && (
        <HouseModal
          editingHouse={isEditingHouse}
          setEditingHouse={setIsEditingHouse}
          addOrUpdateHouse={handleAddOrUpdateHouse}
        />
      )}

      {isEditingUser && (
        <UserModal
          editingUser={isEditingUser}
          setEditingUser={setIsEditingUser}
          addOrUpdateUser={handleAddOrUpdateUser}
        />
      )}

      {isEditingCampaign && (
        <CampaignModal
          editingCampaign={isEditingCampaign}
          setEditingCampaign={setIsEditingCampaign}
          addOrUpdateCampaign={handleAddOrUpdateCampaign}
        />
      )}
    </div>
  );
};

export default App;
