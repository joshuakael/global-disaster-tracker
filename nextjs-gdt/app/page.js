"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Map = dynamic(() => import("@/components/map"), {ssr: false}) ;
// page.js loads in the browser first then returns Map.js
export default function Home() {
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
  }

  /* dependency array is used to make sure getEvents() is only ran once.
    depending on what is in the array the first render, if it is different, then
    the function inside useEffect() runs again
  */
  useEffect(() => {
    getEvents();
  },  [])

  // passing events as a prop using client
  return (<div>
    <Map events = {events} />
  </div>
  )
}