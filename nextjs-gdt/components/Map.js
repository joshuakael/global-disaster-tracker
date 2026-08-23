"use client";

import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import icon from "@/components/icon";

export default function Map() {
  const position = [51.505, -0.09]

  const eventsState = useState([]);
  const events = eventsState[0];
  const setEvents = eventsState[1];


  async function getEvents() {

  }

return (
  <MapContainer center={position} zoom={4} scrollWheelZoom={true} style={{
    height: "100vh",
    width: "100vw"
  }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker icon={icon} position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
)
}