// Generate heat map points based on environmental conditions
// Higher values = higher foraging probability

export const generateForagingHeatmap = () => {
  const points = [];

  // Pacific Coast hotspot (California)
  addHotspot(points, 36.7, -122, 0.9, 15);
  addHotspot(points, 37.5, -123.5, 0.85, 12);

  // Hawaii
  addHotspot(points, 21.3, -157.8, 0.75, 10);
  addHotspot(points, 20.8, -156.5, 0.7, 8);

  // Brazil coast
  addHotspot(points, -23.5, -46.6, 0.95, 18);
  addHotspot(points, -22.9, -43.2, 0.8, 10);

  // North Atlantic
  addHotspot(points, 40.7, -40, 0.6, 12);
  addHotspot(points, 42.3, -38.5, 0.65, 10);

  // South Africa
  addHotspot(points, -34.0, 18.4, 0.88, 15);

  // Australia
  addHotspot(points, -33.9, 151.2, 0.82, 14);
  addHotspot(points, -27.5, 153.0, 0.78, 11);

  // Mediterranean
  addHotspot(points, 36.1, 14.3, 0.55, 8);

  return points;
};

function addHotspot(points, lat, lng, intensity, radius) {
  // Add main point
  points.push([lat, lng, intensity]);

  // Add surrounding points for gradient effect
  const numPoints = Math.floor(radius * 2);
  for (let i = 0; i < numPoints; i++) {
    const angle = (Math.PI * 2 * i) / numPoints;
    const distance = (Math.random() * radius) / 111; // Convert km to degrees roughly
    const newLat = lat + distance * Math.cos(angle);
    const newLng =
      lng + (distance * Math.sin(angle)) / Math.cos((lat * Math.PI) / 180);
    const newIntensity =
      intensity * (1 - distance / (radius / 111)) * (0.5 + Math.random() * 0.5);

    points.push([newLat, newLng, Math.max(0.1, newIntensity)]);
  }
}

// Satellite data overlay points (chlorophyll-a concentration)
export const chlorophyllData = [
  { lat: 36.7, lng: -122, value: 1.2, color: "#00ff00" },
  { lat: 21.3, lng: -157.8, value: 0.3, color: "#ffff00" },
  { lat: -23.5, lng: -46.6, value: 1.5, color: "#00cc00" },
  { lat: 40.7, lng: -40, value: 0.8, color: "#88ff00" },
  { lat: -34.0, lng: 18.4, value: 1.1, color: "#00ff44" },
  { lat: -33.9, lng: 151.2, value: 0.9, color: "#44ff00" },
];

// Sea surface temperature zones
export const sstZones = [
  {
    bounds: [
      [30, -130],
      [40, -115],
    ],
    temp: "16-18°C",
    color: "#4a90e2",
  },
  {
    bounds: [
      [18, -160],
      [24, -154],
    ],
    temp: "24-26°C",
    color: "#e24a4a",
  },
  {
    bounds: [
      [-25, -48],
      [-21, -42],
    ],
    temp: "22-24°C",
    color: "#e2994a",
  },
  {
    bounds: [
      [38, -45],
      [43, -35],
    ],
    temp: "14-16°C",
    color: "#4ae2e2",
  },
  {
    bounds: [
      [-36, 16],
      [-32, 20],
    ],
    temp: "18-20°C",
    color: "#4ac5e2",
  },
  {
    bounds: [
      [-35, 150],
      [-32, 153],
    ],
    temp: "20-22°C",
    color: "#e2b54a",
  },
];
