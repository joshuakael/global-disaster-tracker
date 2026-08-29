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

export default function Map({ events }) {
  const position = [51.505, -0.09]

return (
  <MapContainer center={position} zoom={4} scrollWheelZoom={true} style={{
    height: "100vh",
    width: "100vw"
  }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=cb1_2jmz_1_67cf8f0988300fe71e760d43'
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
        {event.title}
      </Popup>
    </Marker>
    ))}
    </MarkerClusterGroup>
  </MapContainer>
)
}