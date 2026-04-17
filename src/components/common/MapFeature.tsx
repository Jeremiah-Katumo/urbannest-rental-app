import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { House, NearbyAmenity } from '../../types';
import { MapPin, School, Hospital, Bus, ShoppingBag, Star } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapFeatureProps {
  houses: House[];
  selectedHouse?: House | null;
}

const MOCK_AMENITIES: NearbyAmenity[] = [
  { id: 'a1', name: 'City Central Hospital', type: 'HOSPITAL', location: [-1.28, 36.82], rating: 4.5, distance: '1.2km' },
  { id: 'a2', name: 'Greenwood High School', type: 'SCHOOL', location: [-1.29, 36.81], rating: 4.8, distance: '0.8km' },
  { id: 'a3', name: 'Metro Station North', type: 'TRANSPORT', location: [-1.285, 36.815], rating: 4.2, distance: '0.5km' },
  { id: 'a4', name: 'Urban Plaza Mall', type: 'SHOPPING', location: [-1.295, 36.825], rating: 4.6, distance: '1.5km' },
];

const MapFeature: React.FC<MapFeatureProps> = ({ houses, selectedHouse }) => {
  const center: [number, number] = selectedHouse?.coordinates || [-1.286389, 36.817223];

  const getAmenityIcon = (type: NearbyAmenity['type']) => {
    switch (type) {
      case 'HOSPITAL': return <Hospital className="w-4 h-4 text-rose-600" />;
      case 'SCHOOL': return <School className="w-4 h-4 text-indigo-600" />;
      case 'TRANSPORT': return <Bus className="w-4 h-4 text-amber-600" />;
      case 'SHOPPING': return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Neighborhood Explorer</h2>
          <p className="text-slate-400 font-medium">Discover nearby amenities and neighborhood ratings for your potential home.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Map Container */}
        <div className="lg:col-span-3 h-[600px] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl z-0">
          <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {houses.map(house => house.coordinates && (
              <Marker key={house.id} position={house.coordinates}>
                <Popup>
                  <div className="p-2">
                    <img src={house.images[0]} alt={house.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                    <h4 className="font-bold text-slate-900">{house.title}</h4>
                    <p className="text-indigo-600 font-black">${house.price}/mo</p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {MOCK_AMENITIES.map(amenity => (
              <Circle 
                key={amenity.id}
                center={amenity.location}
                radius={200}
                pathOptions={{ 
                  color: amenity.type === 'HOSPITAL' ? '#e11d48' : amenity.type === 'SCHOOL' ? '#4f46e5' : '#d97706',
                  fillOpacity: 0.2 
                }}
              >
                <Popup>
                  <div className="flex items-center gap-2">
                    {getAmenityIcon(amenity.type)}
                    <span className="font-bold">{amenity.name}</span>
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>

        {/* Amenity List */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              Nearby Amenities
            </h3>
            <div className="space-y-4">
              {MOCK_AMENITIES.map((amenity) => (
                <div key={amenity.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      {getAmenityIcon(amenity.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{amenity.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{amenity.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-black">{amenity.rating}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400">{amenity.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <h3 className="text-lg font-black mb-2">Neighborhood Rating</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black text-indigo-400">4.7</div>
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-indigo-400 text-indigo-400" />)}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Highly Rated</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              This area is known for its safety, proximity to top-tier schools, and excellent public transport links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapFeature;
