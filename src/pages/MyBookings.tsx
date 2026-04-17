
import React from 'react';
import { ShoppingBag, MapPin } from 'lucide-react';
import { Booking, House, User } from '../types';

interface MyBookingsProps {
  bookings: Booking[];
  currentUser: User | null;
  houses: House[];
}

const MyBookings: React.FC<MyBookingsProps> = ({ bookings, currentUser, houses }) => {
  const myBookings = bookings.filter(b => b.tenantId === currentUser?.id);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-12 animate-in fade-in duration-500">
      <h1 className="text-4xl font-black mb-12">My Rental Application Journey</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {myBookings.map(b => (
          <div key={b.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 px-6 py-3 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest ${b.status === 'CONFIRMED' ? 'bg-green-600 text-white' : 'bg-amber-100 text-amber-700'}`}>
              {b.status}
            </div>
            <div className="mb-6">
              <img 
                src={houses.find(h => h.id === b.houseId)?.images[0]} 
                className="w-full h-40 object-cover rounded-2xl group-hover:scale-105 transition-transform" 
              />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{houses.find(h => h.id === b.houseId)?.title}</h3>
            <p className="text-sm text-slate-400 mb-6 flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-indigo-500" /> {houses.find(h => h.id === b.houseId)?.location}
            </p>
            <div className="flex justify-between items-center pt-6 border-t border-slate-50">
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Rent</p>
                <p className="text-xl font-black text-indigo-600">${b.totalPrice}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Applied On</p>
                <p className="font-bold text-slate-600">{new Date(b.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
        {myBookings.length === 0 && (
          <div className="col-span-full py-24 text-center border-4 border-dashed border-slate-100 rounded-[3rem] opacity-50">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-black text-slate-400">Your haven history is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
