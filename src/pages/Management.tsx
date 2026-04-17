
import React from 'react';
import ManagementTable from '../components/admin/ManagementTable';
import { User, House, Campaign } from '../types';

interface ManagementPageProps {
  type: 'HOMES' | 'TENANTS' | 'LANDLORDS' | 'AGENTS' | 'CAMPAIGNS' | 'TRANSPORTERS' | 'USERS' | 'DELIVERY_REQUESTS';
  currentUser: User | null;
  houses: House[];
  users: User[];
  campaigns: Campaign[];
  setHouses: (houses: House[] | ((prev: House[]) => House[])) => void;
  setUsers: (users: User[] | ((prev: User[]) => User[])) => void;
  setCampaigns: (campaigns: Campaign[] | ((prev: Campaign[]) => Campaign[])) => void;
  setIsEditingHouse: (house: House | null) => void;
  setIsEditingUser: (user: User | null) => void;
  setIsEditingCampaign: (campaign: Campaign | null) => void;
  setSelectedUserDetail: (user: User | null) => void;
  setSelectedHouseView: (house: House | null) => void;
}

const ManagementPage: React.FC<ManagementPageProps> = ({
  type,
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
}) => {
  let data: any[] = [];
  let title = "";
  let onAdd = () => {};

  if (type === 'HOMES') {
    data = houses.filter(h => currentUser?.role === 'ADMIN' || h.ownerId === currentUser?.id || h.agentId === currentUser?.id);
    title = "Property Inventory";
    onAdd = () => setIsEditingHouse({} as House);
  } else if (type === 'TENANTS') {
    data = users.filter(u => u.role === 'TENANT');
    title = "Verified Tenants";
    onAdd = () => setIsEditingUser({ role: 'TENANT' } as User);
  } else if (type === 'LANDLORDS') {
    data = users.filter(u => u.role === 'LANDLORD');
    title = "Property Owners";
    onAdd = () => setIsEditingUser({ role: 'LANDLORD' } as User);
  } else if (type === 'AGENTS') {
    data = users.filter(u => u.role === 'AGENT');
    title = "Active Agents";
    onAdd = () => setIsEditingUser({ role: 'AGENT' } as User);
  } else if (type === 'CAMPAIGNS') {
    data = campaigns;
    title = "Marketing Campaigns";
    onAdd = () => setIsEditingCampaign({} as Campaign);
  } else if (type === 'TRANSPORTERS') {
    data = users.filter(u => u.role === 'TRANSPORTER');
    title = "Logistics Partners";
    onAdd = () => setIsEditingUser({ role: 'TRANSPORTER' } as User);
  } else if (type === 'USERS') {
    data = users;
    title = "System User Management";
    onAdd = () => setIsEditingUser({ role: 'TENANT' } as User);
  } else if (type === 'DELIVERY_REQUESTS') {
    data = [
      { id: 'dr1', name: 'Moving Request #1025', type: 'Lorry', status: 'PENDING', price: 120, date: '2024-04-15' },
      { id: 'dr2', name: 'Moving Request #1026', type: 'Van', status: 'CONFIRMED', price: 85, date: '2024-04-16' }
    ];
    title = "Logistics Delivery Requests";
    onAdd = () => alert('New request creation coming soon');
  }

  const handleDelete = (id: string) => {
    if (confirm(`Delete this ${type.slice(0, -1)}?`)) {
      if (type === 'HOMES') setHouses(prev => prev.filter(h => h.id !== id));
      else if (type === 'CAMPAIGNS') setCampaigns(prev => prev.filter(c => c.id !== id));
      else setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleEdit = (item: any) => {
    if (type === 'HOMES') setIsEditingHouse(item);
    else if (type === 'CAMPAIGNS') setIsEditingCampaign(item);
    else setIsEditingUser(item);
  };

  return (
    <ManagementTable 
      type={type}
      data={data}
      title={title}
      onAdd={onAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onViewDetails={setSelectedUserDetail}
      onViewProperty={setSelectedHouseView}
    />
  );
};

export default ManagementPage;
