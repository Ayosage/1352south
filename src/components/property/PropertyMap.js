'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default leaflet marker icons
const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Dummy coordinates for Philadelphia, PA (in a real app, you would get these from geocoding the address)
const dummyCoordinates = {
  'Philadelphia': [39.9526, -75.1652],
  'Center City': [39.9508, -75.1578],
  'South Philly': [39.9250, -75.1700],
  'Northern Liberties': [39.9640, -75.1411]
};

export default function PropertyMap({ property }) {
  // In a real application, you would geocode the property address to get lat/long
  // For this demo, we'll use hardcoded coordinates based on the city
  const getCoordinates = () => {
    const city = property.address.city;
    return dummyCoordinates[city] || [39.9526, -75.1652]; // Default to Philadelphia
  };

  const coordinates = getCoordinates();

  useEffect(() => {
    // Need to handle leaflet icon imports for Next.js
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer 
      center={coordinates} 
      zoom={14} 
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={icon}>
        <Popup>
          {property.address.street}<br/>
          {property.address.city}, {property.address.state} {property.address.zipCode}
        </Popup>
      </Marker>
    </MapContainer>
  );
}