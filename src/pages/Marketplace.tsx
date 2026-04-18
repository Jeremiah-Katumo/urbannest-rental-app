
import React from 'react';
import { Search, MapPin, Building2, PlusCircle } from 'lucide-react';
import PropertyCard from '../components/tenant/PropertyCard';
import { House, SearchFilters, User } from '../types';

interface MarketplaceProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  filteredHouses: House[];
  currentUser: User | null;
  handleToggleFavorite: (houseId: string) => void;
  setSelectedHouse: (house: House) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({
  filters,
  setFilters,
  filteredHouses,
  currentUser,
  handleToggleFavorite,
  setSelectedHouse
}) => {

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-12 animate-in fade-in duration-500">
      <div className="mb-12">
        <h1 className="text-5xl font-black text-slate-900 leading-[1.1] mb-4">Find a place <br/> you <span className="text-indigo-600">love to call home</span></h1>
        <p className="text-slate-400 text-xl max-w-2xl font-medium">UrbanNest provides premium residences managed by verified professionals for a seamless living experience.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 p-8 mb-16 border border-indigo-50/50 flex flex-wrap gap-8 items-end">
        <div className="flex-1 min-w-[200px] space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1"><MapPin className="w-3 h-3"/> Location</label>
          <input value={filters.location} onChange={e => setFilters({...filters, location: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700" placeholder="Search City..." />
        </div>
        <div className="flex-1 min-w-[200px] space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1"><Building2 className="w-3 h-3"/> Type</label>
          <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value as any})} className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700 appearance-none">
            <option>All</option><option>Apartment</option><option>House</option><option>Studio</option><option>Villa</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px] space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1"><PlusCircle className="w-3 h-3"/> Bedrooms</label>
          <select value={filters.bedrooms} onChange={e => setFilters({...filters, bedrooms: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700">
            <option value="">Any</option><option value="1">1 Bed</option><option value="2">2 Beds</option><option value="3">3 Beds</option><option value="4">4+ Beds</option>
          </select>
        </div>
        <button className="p-5 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"><Search className="w-6 h-6"/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredHouses.map(house => (
          <PropertyCard 
            key={house.id} 
            house={house} 
            isFavorite={currentUser?.favorites?.includes(house.id)}
            onToggleFavorite={handleToggleFavorite}
            onClick={(h) => h.isAvailable && setSelectedHouse(h)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
