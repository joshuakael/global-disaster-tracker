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
  const [categories, setCategories] = useState([]);
  const [eventType, setEventType] = useState("volcanoes");

  async function getCategories() {
    const res = await fetch(`https://eonet.gsfc.nasa.gov/api/v3/categories`

    );
    const data = await res.json();
    setCategories(data.categories);
  }

  async function getEvents() {
    const res = await fetch(`https://eonet.gsfc.nasa.gov/api/v3/categories/${eventType}?status=open`);
    

    // Returns data in json format
    const data = await res.json();
    setEvents(data.events);
    console.log(data.events);
    console.log(data.events.length)
  }

async function getAllEventsCount() {
  const res = await fetch(`https://eonet.gsfc.nasa.gov/api/v3/categories/${eventType}?status=open`);
  const data = await res.json();
  console.log("Total active events: ", data.events.length);
  return data.events.length;
}

  /* dependency array is used to make sure getEvents() is only ran once.
    depending on what is in the array the first render, if it is different, then
    the function inside useEffect() runs again
  */
  useEffect(() => {
    getCategories();
    getAllEventsCount();
  }, [])

  

  // eventType will change every time we select a new option the user clicks on
  useEffect(() => {
    getEvents();
  },  [eventType])

  // passing events as a prop using client
  return (
  <div>
    <div 
    className="absolute top-3 left-150 z-[1000]">
      <form>
        <select 
        name="eventType" 
        id="eventType" 
        onChange={(e) => setEventType(e.target.value)}
        className="
        text-neutral-800
        bg-neutral-200 
        font-semibold 
        text-sm
        outline-none
        border-none
        focus:ring-2
        focus:ring-neutral-600
        transition
        p-2
        rounded-lg
        shadow">
        {categories.map((category) => (
          <option value={category.id} key={category.id} className="text-neutral-800 text-sm font-semibold"
          
          >
            {category.title}
          </option>
        ))}
          
        </select>
      </form>
    </div>
    <Map events = {events} />
  </div>
  )
}