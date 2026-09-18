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
        
    }
    
];