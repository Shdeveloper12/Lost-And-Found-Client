import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";


// Fix default icon issues with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const LocationSelector = ({ onChange }) => {
  useMapEvents({
    click(e) {
      onChange(e.latlng);
    },
  });
  return null;
};

const MiniMapPicker = ({ value, onChange }) => {
  return (
    <MapContainer
      center={value || [23.685, 90.3563]} // Default to Bangladesh center
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {value && <Marker position={value} />}
      <LocationSelector onChange={onChange} />
    </MapContainer>
  );
};

export default MiniMapPicker;
