import { useState, useRef } from "react";
import SharkMap from "./components/SharkMap";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";
import { backendAPI } from "./services/api";
import "./App.css";

function App() {
  const [selectedShark, setSelectedShark] = useState(null);
  const [currentView, setCurrentView] = useState("map");
  const zoomToSharkRef = useRef(null);

  const handleRandomSharkZoom = async () => {
    const randomShark = await fetch('./api/sharks');
    if (zoomToSharkRef.current) {
      zoomToSharkRef.current(randomShark);
      setSelectedShark(randomShark);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "map":
        return (
          <>
            <div className="map-container">
              <SharkMap onSharkSelect={setSelectedShark} zoomToSharkRef={zoomToSharkRef} />
            </div>
            <div className="sidebar">
              <Dashboard selectedShark={selectedShark} />
            </div>
          </>
        );
      case "analytics":
        return (
          <div className="view-placeholder">
            <h2>📊 Analytics Dashboard</h2>
            <p>
              Coming soon: Time-series analysis, migration patterns, feeding
              statistics
            </p>
          </div>
        );
      case "predictions":
        return (
          <div className="view-placeholder">
            <h2>🎯 Predictive Models</h2>
            <p>
              Coming soon: ML-based foraging habitat predictions, seasonal
              patterns
            </p>
          </div>
        );
      case "tag-designer":
        return (
          <div className="view-placeholder">
            <h2>🏷️ Smart Tag Designer</h2>
            <p>
              Coming soon: 3D visualization of conceptual tag with diet tracking
              sensors
            </p>
          </div>
        );
      case "data-sources":
        return (
          <div className="view-placeholder">
            <h2>🛰️ NASA Data Sources</h2>
            <ul className="data-source-list">
              <li>
                <strong>MODIS Aqua/Terra</strong> - Ocean Color & SST
              </li>
              <li>
                <strong>VIIRS</strong> - Chlorophyll-a Concentration
              </li>
              <li>
                <strong>OSCAR</strong> - Ocean Surface Currents
              </li>
              <li>
                <strong>GEBCO</strong> - Bathymetry Data
              </li>
              <li>
                <strong>SeaWiFS</strong> - Primary Productivity
              </li>
            </ul>
          </div>
        );
      case "about":
        return (
          <div className="view-placeholder">
            <h2>ℹ️ About This Project</h2>
            <p>NASA Hackathon 2025 - Sharks from Space</p>
            <p>
              The goal of this project is to track and predict the movement of sharks
              using satellite data to predict foraging habitats and understand marine ecosystems.
              <br></br><br></br>
              Team Leader, Merging - Kaitlyn Carbonaro<br></br>
              Front End - Dan Laurin, Jared Johnston<br></br>
              Back End - Chase MaClean, Riley Lozon<br></br>
              API - Liangyue Zhao
            </p>
            <img src = "/static/sh4rk.png"/> 
            <p>
              We do not own any of the art used, <a href = "https://x.com/SH_4RK">credit to @SH4RK on twitter for the art.</a>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Menu
        onViewChange={setCurrentView}
        currentView={currentView}
        onRandomSharkZoom={handleRandomSharkZoom}
      />

      <header className="header">
        <h1>🦈 Shark Foraging Habitat Tracker</h1>
        <p>NASA Satellite Data-Driven Prediction System</p>
      </header>

      <div className="main-content">{renderView()}</div>
    </div>
  );
}

export default App;
