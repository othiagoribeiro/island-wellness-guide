import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Professional } from "@/lib/mocks";

// Fix default marker icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Props {
  professionals: Professional[];
  highlightedId: string | null;
  onPinClick: (id: string) => void;
}

function MapBounds({ professionals }: { professionals: Professional[] }) {
  const map = useMap();
  useEffect(() => {
    if (professionals.length > 0) {
      const bounds = L.latLngBounds(professionals.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [professionals, map]);
  return null;
}

export default function DirectoryMap({ professionals, highlightedId, onPinClick }: Props) {
  return (
    <MapContainer
      center={[39.6953, 2.9004]}
      zoom={9}
      className="w-full h-full min-h-[400px] rounded-xl"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapBounds professionals={professionals} />
      {professionals.map((pro) => (
        <Marker
          key={pro.id}
          position={[pro.lat, pro.lng]}
          eventHandlers={{ click: () => onPinClick(pro.id) }}
        >
          <Popup>
            <strong>{pro.name}</strong>
            <br />
            {pro.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
