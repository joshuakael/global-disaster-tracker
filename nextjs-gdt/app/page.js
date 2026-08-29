"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Map = dynamic(() => import("@/components/map"), {ssr: false}) ;
// page.js loads in the browser first then returns Map.js
export default function Home() {
  /* when using useState, the first element is the current state value and
     the second element is the updater function, short hand for the following:

     const stateArray = useState([]);
     const events = stateArray[0];
     const setEvents = stateArray[1];
  */
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [eventType, setEventType] = useState("volcanoes");

  // controls which carto basemap is currently active
  const [mapStyle, setMapStyle] = useState("voyager");
  // controls when settings open
  const [settingsOpen, setSettingsOpen] = useState(false);

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
    {/* category dropdown */}
    <div className="absolute top-3 left-150 z-[1000]">
      <form>
        <select 
        name="eventType" 
        id="eventType" 
        value={eventType}
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

    {/* settings button */}
    <div className="absolute top-3 right-3 z-[1000]">
      <button
      onClick={() => setSettingsOpen(!settingsOpen)}
      className="bg-neutral-200 p-2 rounded-lg shadow hover:bg-neutral-300 transition"
      aria-label="settings"
      >
        {/* gear-icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>

      </button>
      {/* settings panel */}
      {settingsOpen && (
        <div className="absolute top-full right-0 mt-2 bg-neutral-200 rounded-lg shadow p-3 flex flex-col gap-2 w-40">
          <p className="text-neutral-800 font-semibold text-sm mb-1">Map style</p>
          {["voyager", "light", "dark"].map((style) => (
            <button
              key={style}
              onClick={() => setMapStyle(style)}
              className={`text-left text-sm px-2 py-1 rounded-md capitalize transition ${
                  mapStyle === style 
                    ? "bg-neutral-600 text-white" 
                    : "text-neutral-800 hover:bg-neutral-300"
                }`}
              >
                {style}
            </button>
          ))}
        </div>
      )}
    </div>

    <Map events = {events} mapStyle={mapStyle} />
  </div>
  )
}