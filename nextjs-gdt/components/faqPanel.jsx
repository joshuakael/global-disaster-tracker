"use client";

import { useState } from "react";

// FAQ content

const faqData = [
    {
        question: "How was this project built?",
        answer:
            "This is a Next.js (App Router) React app styled with Tailwind CSS. It fetches disaster data from NASA's EONET API and plots it on an interactive Leaflet map. Leaflet needs direct access to the browser window, so as of now, the mapo is loaded client side only, using a dynamic import with SSR turned off."
    },
    {
        question: "Why are there no active events in some categories?",
        answer: (
            <>
            This is probably the most asked question I get. This app only shows 'open' events, the ones NASA still considers ongoing. 
            I don't have clear reason for why Droughts, Dust and Haze, Landslides, Manmade, Snow, Temperature Extremes, and Water Color show up via the API,
            but we can assume these categories are manually flagged from satellite imagery rather than fed by a monitoring agency. So for now,
            this is <strong>unverified</strong>. Earthquakes and Landslides rarely stay 'open' because the shaking event is over in seconds with no ongoing phase.
            All of the reasoning stated in this block of text are my own reasoning and therefore also <strong>unverified</strong>. 
            now is reserved for notable snowfall events, not regular snowdays, which is also the same casefor Temperature Extremes.
            
            The following categories are sourced:
            - Volcanoes are directly sourced by SIVolcano, and AVO
            - Severe Storms are directly sourced by JTWC, NOAA_NHC, NASA_HURR and AU_BOM
            - Sea and Lake Ice are directly sourced by BYU_ICE and NATICE
            - Floods are directly sourced by CEMS
            </>
        ),
    },
    {
        question: "What is EONET",
        answer: 
            "Earth Observatory Natural Event Tracker is a NASA API that catalogues natural events worldwide. NASA doesn't generate all of this data, some are combined from trusted sources like the US Geological Survey, into one feed.",
    },

];

export default function FaqPanel({ isOpen, onClose }) {
    // Tracks which open is expanded, null means none are open
    const [openIndex, setOpenIndex] = useState(null);

    function toggleQuestion(index) {
        setOpenIndex(openIndex === index ? null : index)
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* max-h-[80vh] caps the whole panel's height so it can't grow past the screen */}
      <div className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-lg bg-white shadow-xl">
        {/* Header sits outside the scrolling area, so it stays put */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          <button onClick={onClose} aria-label="Close FAQ panel" className="text-gray-500 hover:text-gray-800">
            ✕
          </button>
        </div>

        {/* This is the scrollable part: overflow-y-auto + a bounded parent height (max-h-[80vh] above) */}
        <div className="overflow-y-auto p-4">
          {faqData.map((item, index) => (
            <div key={index} className="mb-2 border-b border-gray-100 pb-2">
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between text-left font-medium"
              >
                {item.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}