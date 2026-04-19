
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserRole } from '../../types';
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  UserRound, 
  Briefcase, 
  BarChart3, 
  Megaphone, 
  Settings, 
  LogOut,
  ChevronRight,
  DollarSign,
  LifeBuoy,
  Truck,
  Crown,
  ShieldCheck,
  Settings2,
  UserCheck,
  Package
} from 'lucide-react';

interface SidebarProps {
  userRole: UserRole;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'DASHBOARD', label: 'Overview', icon: LayoutDashboard, roles: ['ADMIN', 'LANDLORD', 'AGENT', 'SUPPORT', 'TRANSPORTER'], path: '/dashboard' },
    { id: 'MANAGEMENT_HOMES', label: 'Properties', icon: Home, roles: ['ADMIN', 'LANDLORD', 'AGENT'], path: '/management/homes' },
    { id: 'TENANTS', label: 'Tenants', icon: Users, roles: ['ADMIN', 'AGENT', 'LANDLORD'], path: '/management/tenants' },
    { id: 'LANDLORDS', label: 'Landlords', icon: UserRound, roles: ['ADMIN'], path: '/management/landlords' },
    { id: 'AGENTS', label: 'Agents', icon: UserCheck, roles: ['ADMIN'], path: '/management/agents' },
    { id: 'PAYMENTS', label: 'Payments', icon: DollarSign, roles: ['ADMIN', 'LANDLORD', 'AGENT'], path: '/management/payments' },
    { id: 'SUPPORT', label: 'Support', icon: LifeBuoy, roles: ['ADMIN', 'SUPPORT'], path: '/management/support' },
    { id: 'TRANSPORTERS', label: 'Logistics', icon: Truck, roles: ['ADMIN'], path: '/management/transporters' },
    { id: 'DELIVERY_REQUESTS', label: 'Delivery Requests', icon: Package, roles: ['ADMIN', 'TRANSPORTER'], path: '/delivery-requests' },
    { id: 'REPORTS', label: 'Reports', icon: BarChart3, roles: ['ADMIN', 'LANDLORD'], path: '/management/reports' },
    { id: 'CAMPAIGNS', label: 'Campaigns', icon: Megaphone, roles: ['ADMIN', 'AGENT'], path: '/management/campaigns' },
    { id: 'SUBSCRIPTIONS', label: 'Business Plans', icon: Crown, roles: ['ADMIN', 'LANDLORD', 'AGENT', 'TRANSPORTER'], path: '/management/subscriptions' },
    { id: 'ROLES_PERMISSIONS', label: 'Roles & Permissions', icon: ShieldCheck, roles: ['ADMIN'], path: '/roles-permissions' },
    { id: 'USER_MANAGEMENT', label: 'User Management', icon: Users, roles: ['ADMIN'], path: '/user-management' },
    { id: 'CUSTOM_FIELDS', label: 'Custom Fields', icon: Settings2, roles: ['ADMIN'], path: '/custom-fields' },
    { id: 'COMMUNICATIONS', label: 'News', icon: Megaphone, roles: ['ADMIN', 'LANDLORD', 'AGENT', 'SUPPORT'], path: '/communications' },
    { id: 'SETTINGS', label: 'Settings', icon: Settings, roles: ['ADMIN', 'LANDLORD', 'AGENT', 'SUPPORT'], path: 'management/settings' },
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 z-50 flex flex-col">
      <div className="p-8 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-100">
            <Home className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter">
            Urban<span className="text-indigo-600">Nest</span>
          </span>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 ml-1">Management Portal</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1 py-8">
        {visibleItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-4 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm group"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-600" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
