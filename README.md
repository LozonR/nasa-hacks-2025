# 🦈 Shark Foraging Habitat Tracker

NASA Hackathon Project - Tracking sharks and predicting foraging habitats using satellite data.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Features Implemented

- ✅ Interactive map with shark locations
- ✅ **Foraging probability heatmap** (toggle on/off)
- ✅ **Layer controls** - Toggle shark markers, foraging zones, heatmap, SST zones
- ✅ **Navigation menu** - Switch between different views
- ✅ Real-time dashboard with environmental data
- ✅ Predicted foraging zones (visualized as circles)
- ✅ Sea surface temperature zones overlay
- ✅ Sample shark tracking data
- ✅ API integration structure

## NASA Data Sources to Integrate

1. **Ocean Color (Chlorophyll-a)**: https://oceandata.sci.gsfc.nasa.gov
2. **Sea Surface Temperature**: MODIS Aqua/Terra
3. **Ocean Currents**: OSCAR dataset
4. **Bathymetry**: GEBCO
5. **Primary Productivity**: NPP data

Get NASA API key: https://api.nasa.gov/

## Architecture

```
shark-tracker/
├── src/
│   ├── components/
│   │   ├── SharkMap.jsx        # Interactive Leaflet map with layers
│   │   ├── HeatmapLayer.jsx    # Foraging probability heatmap
│   │   ├── LayerControls.jsx   # Toggle map layers
│   │   ├── Menu.jsx            # Navigation sidebar
│   │   └── Dashboard.jsx       # Data display sidebar
│   ├── data/
│   │   ├── sampleSharks.js     # Mock shark data
│   │   └── heatmapData.js      # Heatmap & environmental zones
│   ├── services/
│   │   └── api.js              # NASA & backend API calls
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Next Steps for Hackathon

1. **Backend API**: Build FastAPI/Flask endpoint for predictions
2. **ML Model**: Train model on environmental data → shark presence
3. **Real NASA Data**: Integrate actual satellite data APIs
4. **Smart Tag Design**: Create 3D visualization of conceptual tag
5. **Time-series**: Add historical tracking/prediction charts
6. **Advanced Features**:
   - ✅ Heat maps of foraging probability
   - Migration pattern animation
   - Species-specific habitat preferences
   - Real-time data streaming simulation
   - Analytics dashboard with charts
   - 3D tag designer visualization

## Tag Concept Ideas

- **Diet Sensors**: eDNA sampling, stomach pH monitor
- **Environmental Sensors**: temp, salinity, depth, accelerometer
- **Connectivity**: Satellite uplink when surfacing
- **Power**: Solar + kinetic energy harvesting
- **Size**: <5cm, hydrodynamic design

Good luck at the hackathon! 🚀
