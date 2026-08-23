"use client";

import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import icon from "@/components/icon";

export default function Map() {
  const position = [51.505, -0.09]

  /* When using useState, the first element is the current state value and
     the second element is the updater function, short hand for the following:

     const stateArray = useState([]);
     const events = stateArray[0];
     const setEvents = stateArray[1];
  */
  const [events, setEvents] = useState([]);
  

  async function getEvents() {
    const res = await fetch(`https://eonet.gsfc.nasa.gov/api/v3/categories/volcanoes`);

    // Returns data in json format
    const data = await res.json();
    setEvents(data.events);
    console.log(data.events);
  }

  /* dependency array is used to make sure getEvents() is only ran once.
    depending on what is in the array the first render, if it is different, then
    the function inside useEffect() runs again
  */
  useEffect(() => {
    getEvents();
  },  [])

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