import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Professional } from "@/lib/mocks";

// Custom elegant SVG pin
function createPinIcon(highlighted: boolean) {
  const color = highlighted ? "#5B8A72" : "#6B9B7D";
  const size = highlighted ? 38 : 30;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${Math.round(size * 1.35)}" viewBox="0 0 30 40" fill="none">
      <path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.716 23.284 0 15 0z" fill="${color}" fill-opacity="${highlighted ? '1' : '0.85'}"/>
      <circle cx="15" cy="14" r="6" fill="white" fill-opacity="0.95"/>
      <circle cx="15" cy="14" r="3" fill="${color}"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "custom-pin",
    iconSize: [size, Math.round(size * 1.35)],
    iconAnchor: [size / 2, Math.round(size * 1.35)],
    popupAnchor: [0, -Math.round(size * 1.2)],
  });
}

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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapBounds professionals={professionals} />
      {professionals.map((pro) => (
        <Marker
          key={pro.id}
          position={[pro.lat, pro.lng]}
          icon={createPinIcon(highlightedId === pro.id)}
          eventHandlers={{ click: () => onPinClick(pro.id) }}
        >
          <Popup>
            <div className="text-center py-1">
              <strong className="text-sm">{pro.name}</strong>
              <br />
              <span className="text-xs text-muted-foreground">{pro.city}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
