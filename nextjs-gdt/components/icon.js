import L from "leaflet";

export default L.divIcon(
    {
        className: "",
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <radialGradient id="sphereGradient" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#f04444"/>
      <stop offset="100%" stop-color="#c62828"/>
    </radialGradient>
  </defs>

  <!-- Ripple ring 1 -->
  <circle cx="50" cy="50" r="10" fill="none" stroke="#e53935" stroke-width="3" opacity="0.8">
    <animate attributeName="r" from="10" to="45" dur="2s" begin="0s" repeatCount="indefinite"/>
    <animate attributeName="opacity" from="0.8" to="0" dur="2s" begin="0s" repeatCount="indefinite"/>
  </circle>

  <!-- Ripple ring 2, offset timing for continuous blipping -->
  <circle cx="50" cy="50" r="10" fill="none" stroke="#e53935" stroke-width="3" opacity="0.8">
    <animate attributeName="r" from="10" to="45" dur="2s" begin="1s" repeatCount="indefinite"/>
    <animate attributeName="opacity" from="0.8" to="0" dur="2s" begin="1s" repeatCount="indefinite"/>
  </circle>

  <!-- Solid warning sphere on top -->
  <circle cx="50" cy="50" r="11" fill="url(#sphereGradient)" stroke="#7a1414" stroke-width="1.5"/>
</svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
    }
);