
import React, { useState } from 'react';
import { House, User } from '../../types';
import { X, Calendar, ShieldCheck, Info } from 'lucide-react';

interface BookingModalProps {
  house: House;
  user: User;
  onClose: () => void;
  onSubmit: (startDate: string, endDate: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ house, user, onClose, onSubmit }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;
    onSubmit(startDate, endDate);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="relative h-48">
          <img src={house.images[0]} className="w-full h-full object-cover" alt={house.title} />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h2 className="text-2xl font-bold text-white">{house.title}</h2>
            <p className="text-gray-200 text-sm">{house.location}</p>
          </div>
        </div>

        <form onSubmit={handleBooking} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Check-In</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Check-Out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  required
                  min={startDate || new Date().toISOString().split('T')[0]}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
            <div className="text-sm text-indigo-700">
              <p className="font-semibold">Booking Policy</p>
              <p className="opacity-80">This is a request. Once confirmed, you will be prompted to simulate an M-Pesa payment for the deposit and first month's rent.</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Monthly Rent</p>
              <p className="text-2xl font-bold text-gray-900">${house.price}</p>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="h-5 w-5" />
              Request Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
