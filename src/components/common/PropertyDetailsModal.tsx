
import React from 'react';
import { House, User } from '../../types';
import { X, MapPin, BedDouble, Bath, Maximize2, ShieldCheck, DollarSign, Star, Calendar, User as UserIcon, Tag } from 'lucide-react';

interface PropertyDetailsModalProps {
  house: House;
  owner?: User;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ house, owner, onClose }) => {
  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl animate-in zoom-in duration-300 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Image Section */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <img src={house.images[0]} alt={house.title} className="w-full h-full object-cover" />
          <div className="absolute top-6 left-6">
            <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg ${house.isAvailable ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
              {house.isAvailable ? 'Available' : 'Reserved'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-10 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{house.title}</h2>
              <p className="text-slate-400 font-bold text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-500" /> {house.location}
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full">
              <X className="w-6 h-6"/>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Rent</p>
              <p className="text-xl font-black text-indigo-600">${house.price.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</p>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-lg font-black">{house.rating || '4.5'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Property Specifications</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 bg-white border border-slate-100 rounded-2xl">
                  <BedDouble className="w-5 h-5 text-indigo-600 mb-2" />
                  <span className="text-sm font-black text-slate-900">{house.bedrooms} Beds</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white border border-slate-100 rounded-2xl">
                  <Bath className="w-5 h-5 text-indigo-600 mb-2" />
                  <span className="text-sm font-black text-slate-900">{house.bathrooms} Baths</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white border border-slate-100 rounded-2xl">
                  <Maximize2 className="w-5 h-5 text-indigo-600 mb-2" />
                  <span className="text-sm font-black text-slate-900">1,200 sqft</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Description</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{house.description}</p>
            </div>

            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Ownership</h3>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-100 overflow-hidden">
                  {owner ? <img src={owner.avatar} className="w-full h-full object-cover" /> : <UserIcon className="w-6 h-6 text-slate-300" />}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{owner?.name || 'Managed by UrbanNest'}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Verified {owner?.role || 'ADMIN'}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-3 text-emerald-600 font-black text-xs uppercase tracking-widest bg-emerald-50 p-4 rounded-2xl">
                <ShieldCheck className="w-5 h-5" />
                UrbanNest Verified Property
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
