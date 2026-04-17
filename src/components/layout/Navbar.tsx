
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserRole, User } from '../../types';
import { Home, Bell, Menu, LayoutDashboard, ShoppingBag, Info, Mail, BookOpen, Settings, LogOut, Users, Heart, FileText, LifeBuoy, MapPin, Megaphone, Crown, Truck } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentUser: User;
}

const Navbar: React.FC<NavbarProps> = ({ currentRole, currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { id: 'MARKETPLACE', label: 'Explore', icon: ShoppingBag, roles: ['TENANT', 'ADMIN', 'LANDLORD', 'AGENT'], path: '/' },
    { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard, roles: ['LANDLORD', 'AGENT', 'ADMIN', 'SUPPORT', 'TRANSPORTER'], path: '/dashboard' },
    { id: 'WISHLIST', label: 'Wishlist', icon: Heart, roles: ['TENANT'], path: '/wishlist' },
    { id: 'MY_BOOKINGS', label: 'Bookings', icon: BookOpen, roles: ['TENANT'], path: '/my-bookings' },
    { id: 'TRANSPORTERS', label: 'Movers', icon: Truck, roles: ['TENANT'], path: '/transporters' },
    { id: 'LEASES', label: 'Leases', icon: FileText, roles: ['TENANT', 'LANDLORD'], path: '/leases' },
    { id: 'SUPPORT', label: 'Support', icon: LifeBuoy, roles: ['TENANT', 'LANDLORD', 'AGENT'], path: '/support' },
    { id: 'COMMUNICATIONS', label: 'News', icon: Megaphone, roles: ['TENANT', 'LANDLORD', 'AGENT', 'ADMIN', 'SUPPORT'], path: '/communications' },
    { id: 'SUBSCRIPTIONS', label: 'Business Plans', icon: Crown, roles: ['TENANT', 'LANDLORD', 'AGENT', 'TRANSPORTER'], path: '/subscriptions' },
    { id: 'MAP', label: 'Map', icon: MapPin, roles: ['TENANT'], path: '/map' },
    { id: 'SETTINGS', label: 'Settings', icon: Settings, roles: ['TENANT', 'LANDLORD', 'AGENT', 'ADMIN', 'SUPPORT'], path: '/settings' },
  ];

  const visibleLinks = navLinks.filter(link => link.roles.includes(currentRole));

  return (
    <nav className="glass sticky top-0 z-50 border-b border-slate-100 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-8 flex-1 min-w-0">
            <div 
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate(currentRole === 'TENANT' ? '/' : '/dashboard')}
            >
              <div className="bg-indigo-600 p-2.5 rounded-[1rem] shadow-lg shadow-indigo-100 group-hover:scale-110 transition-all duration-300">
                <Home className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-black text-slate-900 hidden lg:block tracking-tighter">
                Urban<span className="text-indigo-600">Nest</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 flex-1 justify-center px-4">
              {visibleLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => navigate(link.path)}
                  className={`flex items-center px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 whitespace-nowrap ${
                    location.pathname === link.path 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0 ml-4">
            <button className="hidden sm:flex p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-3 right-3 block h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white" />
            </button>

            <div className="md:hidden">
              <button 
                onClick={() => alert('Mobile menu coming soon - Use desktop view for full navigation')}
                className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            <div 
              className="flex items-center gap-3 pl-4 border-l border-slate-100 cursor-pointer"
              onClick={() => navigate('/settings')}
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 leading-none">{currentUser.name}</p>
                <p className="text-[10px] font-black text-indigo-500 mt-1 uppercase tracking-widest">{currentRole}</p>
              </div>
              <img
                className="h-10 w-10 rounded-full border-2 border-indigo-50 shadow-sm"
                src={currentUser.avatar}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
