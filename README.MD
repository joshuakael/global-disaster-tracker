# Global Disaster Tracker

| | |
|---|---|
| Document Owner - Product/Engineering |
| Status - Draft v1.0 |
| Tech Stack - react.js (Vite), CSS, leaflet.js, NASA EONET API |
| Development Environment - VSCODE |
---

## Overview
### 1.1 Summary
The Global Disaster Tracker is a project made by me that will be used to plot natural disaster data locations collected by NASA's EONET (Earth's Observatory Natural Event Tracker) API onto a map using leaflet.js.

### 1.2 Problem Statement
The application will be used by those interested in monitoring natural disasters (earthquakes, storms, wildfires, floods, etc.) globally at no cost. NASA's EONET API collects this data but has no user-friendly way to view these events visually on a map.

### 1.3 React Leaflet Plan
1. Fetch EONET data -> cache it
2. User applies filters -> filtered array changes -> react rerenders map
3. Markers for events that got filtered out automatically get removed
4. Markers for events in the filtered set update via mutable props
5. New markers for newly matching events get created fresh