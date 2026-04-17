import React from 'react';
import { House, User } from '../../types';
import { Heart, Trash2, ArrowRight, Star, MapPin, BedDouble, Bath } from 'lucide-react';
import { cn } from '../../lib/utils';

interface WishlistProps {
  houses: House[];
  currentUser: User;
  onRemove: (houseId: string) => void;
  onSelect: (house: House) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ houses, currentUser, onRemove, onSelect }) => {
  const favoriteHouses = houses.filter(h => currentUser.favorites?.includes(h.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Your Wishlist</h2>
          <p className="text-slate-400 font-medium">Compare your favorite properties and find the perfect match.</p>
        </div>
      </div>

      {favoriteHouses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteHouses.map((house) => (
            <div key={house.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative h-64">
                <img src={house.images[0]} alt={house.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => onRemove(house.id)}
                    className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg">
                    ${house.price}/mo
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-slate-900 line-clamp-1">{house.title}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-black">{house.rating || '4.5'}</span>
                  </div>
                </div>
                
                <p className="text-slate-400 font-bold text-xs flex items-center gap-1 mb-6">
                  <MapPin className="w-3 h-3" />
                  {house.location}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                      <BedDouble className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-sm font-bold">{house.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                      <Bath className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-sm font-bold">{house.bathrooms} Baths</span>
                  </div>
                </div>

                <button 
                  onClick={() => onSelect(house)}
                  className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all group/btn"
                >
                  View Details
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-[3rem] border border-dashed border-slate-200 text-center">
          <div className="flex flex-col items-center gap-4">
            <Heart className="w-16 h-16 text-slate-100" />
            <p className="text-slate-400 font-bold">Your wishlist is empty.</p>
            <button className="text-indigo-600 font-black uppercase tracking-widest text-xs hover:underline">
              Browse Properties
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
