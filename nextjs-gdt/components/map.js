"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css"; 
import L from "leaflet";
import icon from "@/components/icon";

function createClusterIcon(cluster) {
  const count = cluster.getChildCount();
  
  return L.divIcon({
    html: `<div class="cluster-marker">${count}</div>`,
    className: "",
    iconSize: L.point(40, 40, true),
  })
}

const TILE_URLS = {
  voyager: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_2jmz_1_67cf8f0988300fe71e760d43",
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=cb1_2jmz_1_67cf8f0988300fe71e760d43",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=cb1_2jmz_1_67cf8f0988300fe71e760d43",
};

export default function Map({ events, mapStyle }) {
  const position = [51.505, -0.09]

return (
  <MapContainer 
  center={position} 
  zoom={2} 
  minZoom={1.4} 
  maxBounds={[[-90, -180],[90, 180]]} 
  maxBoundsViscosity={0.9} 
  scrollWheelZoom={true} 
  zoomSnap={1} 
  zoomDelta={0.5} 
  wheelPxPerZoomLevel={60} 
  wheelDebounceTime={0}
  fadeAnimation={true}
  zoomAnimation={true}
  preferCanvas={true}
  style={{
    height: "100vh",
    width: "100vw"
  }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url={TILE_URLS[mapStyle]}
      detectRetina={true}
    />
    <MarkerClusterGroup
      iconCreateFunction={createClusterIcon}
      maxClusterRadius={80}
    >
    
    
    {events
    
    .filter((event) => {
      // filters out events that have corrupted/invalid coordinates
      const [lng, lat] = event.geometry[0].coordinates;
      return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    })
    // for every event in the event array, make a marker for it
    .map((event) => (
      // eonet's coordinates are [long, lat] so using coordinates[1] then coordinates[0] results in [lat, long]
      <Marker 
      // key = unique id so markers are tracked across re-renders e.g. when the eventType array changes
      key={event.id}
      icon={icon} 
      position={[
        event.geometry[0].coordinates[1], 
        event.geometry[0].coordinates[0]
        ]}>
      <Popup>
        <p className="font-semibold mb-1">{event.title}</p>
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(event.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Learn more about this event.
        </a>     
      </Popup>
    </Marker>
    ))}
    </MarkerClusterGroup>
  </MapContainer>
)
}