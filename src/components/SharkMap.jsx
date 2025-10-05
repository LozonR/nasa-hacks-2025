import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Rectangle,
  useMap,
  useMapEvent
} from "react-leaflet";
import { Icon } from "leaflet";
import { backendAPI } from "../services/api";
import { generateForagingHeatmap, sstZones } from "../data/heatmapData";
import HeatmapLayer from "./HeatmapLayer";
import LayerControls from "./LayerControls";
import "./SharkMap.css";
import { ImageOverlay } from "react-leaflet";
import { LatLngBounds } from "leaflet";

const sharkIcon = new Icon({
  iconUrl: "/static/shark.webp",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

function MapMoveListener({ onMove }) {
  const map = useMap();
  // lock the map tops and bottoms so that it doesn't go out of bounds

  useMapEvent("moveend", () => {
    const center = map.getCenter();
    const bounds = map.getBounds().getCenter();
    let wrappedLng = center.lng;
    let wrapped = false;
    if (center.lng > 180) {
      wrappedLng = center.lng - 359;
      wrapped = true;
    } else if (center.lng < -180) {
      wrappedLng = center.lng + 359;
      wrapped = true;
    } 


    if (wrapped) {
      map.setView([bounds.lat, wrappedLng], map.getZoom(), { animate: false});
    } else if (map.getZoom() > 7) {
      map.setView([bounds.lat, center.lng], 7, { animate: false});
    } else {
      map.setView([bounds.lat, center.lng], map.getZoom(), { animate: false});
    }


    

    onMove({ lat: center.lat, lng: wrappedLng });
  });
  return null;
}



const sharkIconLarge = new Icon({
  iconUrl: "/static/shark.webp",
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -24],
});

function MapController({ zoomToSharkRef }) {
  const map = useMap();

  zoomToSharkRef.current = (shark) => {
    map.setView([shark.location[1], shark.location[0]], 7, {
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
    ppo: {
      name: "Photoplankton Overlay",
      enabled: false,
    },
    depth: {
      name: "Depth Overlay",
      enabled: false,
    },
  });

    const [sharks, setSharks] = useState([])

  const [selectedSharkId, setSelectedSharkId] = useState(null);

    useEffect(() => {
        const fun = async () => {
            const data = await backendAPI.getSharks()
            console.log(data)
            setSharks(data)

        }
        
        fun()
    }, [])

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
      {layers.ppo.enabled && (
        <ImageOverlay
          url="/static/Phytoplankton.png"
          bounds={
            new LatLngBounds([
              [-90, -180],
              [90, 180],
            ])
          }
          opacity={0.8}
        />
      )}

      {/* Depth Image Overlay */}
      {layers.depth.enabled && (
        <ImageOverlay
          url="/static/depth.png"
          bounds={
            new LatLngBounds([
              [-180, -180],
              [180, 180],
            ])
          }
          opacity={0.5}
        />
      )}

      {/* Heatmap Layer */}
      {layers.heatmap.enabled && <HeatmapLayer points={heatmapPoints} />}

      {/* Shark Markers and Foraging Zones */}
      {sharks.map((shark) => (
        <div key={shark.id}>
          {layers.sharks.enabled && (
            <Marker
              position={[ shark.location[1], shark.location[0] ]}
              icon={selectedSharkId === shark.id ? sharkIconLarge : sharkIcon}
              eventHandlers={{
                click: () => {
                  setSelectedSharkId(shark.id);
                  onSharkSelect(shark);
                },
              }}
            >
              <Popup
                eventHandlers={{
                  close: () => setSelectedSharkId(null),
                }}
              >
                <div>
                  <strong>{shark.name}</strong>
                  <br />
                  Species: {shark.species}
                </div>
              </Popup>
            </Marker>
          )}

          {false && layers.foragingZones.enabled && (
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

      <MapMoveListener onMove={(center) => {}} />

      <MapController zoomToSharkRef={zoomToSharkRef} />
      <LayerControls layers={layers} onToggle={toggleLayer} />
    </MapContainer>
  );
}

export default SharkMap;
