import { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Rectangle,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import { sampleSharks } from "../data/sampleSharks";
import { generateForagingHeatmap, sstZones } from "../data/heatmapData";
import HeatmapLayer from "./HeatmapLayer";
import LayerControls from "./LayerControls";
import "./SharkMap.css";
import { ImageOverlay } from "react-leaflet";
import { LatLngBounds } from "leaflet";

const sharkIcon = new Icon({
  iconUrl: "/shark.webp",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const sharkIconLarge = new Icon({
  iconUrl: "/shark.webp",
    iconSize: [48, 48], 
  iconAnchor: [24, 24],
  popupAnchor: [0, -24],
});

function MapController({ zoomToSharkRef }) {
  const map = useMap();

  zoomToSharkRef.current = (shark) => {
    map.setView([shark.lat, shark.lng], 8, {
      animate: true,
      duration: 1,
    });
  };

  return null;
}

function SharkMap({ onSharkSelect, zoomToSharkRef }) {
  const [layers, setLayers] = useState({
    sharks: { name: "Shark Locations", enabled: true },
    foragingZones: { name: "Foraging Zones", enabled: true },
    heatmap: {
      name: "Foraging Probability Heatmap",
      enabled: false,
      legend: "Blue (low) → Red (high)",
    },
    sst: {
      name: "Sea Surface Temperature",
      enabled: false,
      legend: "Ocean temp zones",
    },
  });
  
  const [selectedSharkId, setSelectedSharkId] = useState(null);

  const toggleLayer = (layerKey) => {
    setLayers((prev) => ({
      ...prev,
      [layerKey]: {
        ...prev[layerKey],
        enabled: !prev[layerKey].enabled,
      },
    }));
  };

  const heatmapPoints = generateForagingHeatmap();

  return (
    <MapContainer
      center={[20, -40]}
      zoom={3}
      className="shark-map"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Phytoplankton Image Overlay */}
      <ImageOverlay
        url="/public/Phytoplankton.png"
        bounds={
          new LatLngBounds([
            [-71, -180],
            [71, 180],
          ])
        }
        opacity={0.5}
      />

      {/* Heatmap Layer */}
      {layers.heatmap.enabled && <HeatmapLayer points={heatmapPoints} />}

<<<<<<< HEAD
    {/* SST Zones */}
    {layers.sst.enabled &&
      sstZones.map((zone, idx) => (
        <Rectangle
          key={idx}
          bounds={zone.bounds}
          pathOptions={{
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.15,
            weight: 1,
          }}
        >
          <Popup>
            <div>
              <strong>SST Zone</strong>
              <br />
              Temperature: {zone.temp}
            </div>
          </Popup>
        </Rectangle>
      ))}

    {/* Shark Markers and Foraging Zones */}
    {sampleSharks.map((shark) => (
      <div key={shark.id}>
        {layers.sharks.enabled && (
          <Marker
            position={[shark.lat, shark.lng]}
            icon={selectedSharkId === shark.id ? sharkIconLarge : sharkIcon}
            eventHandlers={{
              click: () => {
                setSelectedSharkId(shark.id);
                onSharkSelect(shark);
              },
=======
      {/* SST Zones */}
      {layers.sst.enabled &&
        sstZones.map((zone, idx) => (
          <Rectangle
            key={idx}
            bounds={zone.bounds}
            pathOptions={{
              color: zone.color,
              fillColor: zone.color,
              fillOpacity: 0.15,
              weight: 1,
>>>>>>> 5e3f6e4 (photobleh map aligning)
            }}
          >
             <Popup
                eventHandlers={{
                  close: () => setSelectedSharkId(null),
                }}
              >
              <div>
                <strong>SST Zone</strong>
                <br />
                Temperature: {zone.temp}
              </div>
            </Popup>
          </Rectangle>
        ))}

      {/* Shark Markers and Foraging Zones */}
      {sampleSharks.map((shark) => (
        <div key={shark.id}>
          {layers.sharks.enabled && (
            <Marker
              position={[shark.lat, shark.lng]}
              icon={sharkIcon}
              eventHandlers={{
                click: () => onSharkSelect(shark),
              }}
            >
              <Popup>
                <div>
                  <strong>{shark.name}</strong>
                  <br />
                  Species: {shark.species}
                  <br />
                  Tag ID: {shark.tagId}
                  <br />
                  Last Updated: {shark.lastUpdate}
                </div>
              </Popup>
            </Marker>
          )}

          {layers.foragingZones.enabled && (
            <Circle
              center={[shark.lat, shark.lng]}
              radius={shark.foragingRadius * 1000}
              pathOptions={{
                color: "#ffeb3b",
                fillColor: "#ffeb3b",
                fillOpacity: 0.1,
                weight: 2,
                dashArray: "5, 5",
              }}
            />
          )}
        </div>
      ))}

      <MapController zoomToSharkRef={zoomToSharkRef} />
      <LayerControls layers={layers} onToggle={toggleLayer} />
    </MapContainer>
  );
}

export default SharkMap;
