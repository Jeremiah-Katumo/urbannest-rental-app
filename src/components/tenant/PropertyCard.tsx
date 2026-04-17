
import React from 'react';
import { House } from '../../types';
import { Bed, Bath, MapPin, Heart, Sparkles } from 'lucide-react';

interface PropertyCardProps {
  house: House;
  isFavorite?: boolean;
  onToggleFavorite?: (houseId: string) => void;
  onClick: (house: House) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ house, isFavorite, onToggleFavorite, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(house)}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={house.images[0]}
          alt={house.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
            house.isAvailable ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
          }`}>
            {house.isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(house.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-md text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {house.title}
          </h3>
          <span className="text-xl font-bold text-indigo-600">${house.price}<span className="text-xs text-gray-500 font-normal">/mo</span></span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-3 w-3 mr-1" />
          {house.location}
        </div>

        <div className="flex items-center gap-4 border-t border-gray-100 pt-4 mt-auto">
          <div className="flex items-center text-gray-700">
            <Bed className="h-4 w-4 mr-1.5 text-indigo-500" />
            <span className="text-sm font-medium">{house.bedrooms} Beds</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Bath className="h-4 w-4 mr-1.5 text-indigo-500" />
            <span className="text-sm font-medium">{house.bathrooms} Baths</span>
          </div>
          <div className="ml-auto text-xs text-indigo-500 flex items-center font-semibold uppercase tracking-wider">
            <Sparkles className="h-3 w-3 mr-1" />
            {house.type}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
