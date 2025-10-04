import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.heat'

function HeatmapLayer({ points, options }) {
  const map = useMap()

  useEffect(() => {
    if (!points || points.length === 0) return

    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 35,
      maxZoom: 10,
      max: 1.0,
      gradient: {
        0.0: '#0000ff',
        0.3: '#00ffff',
        0.5: '#00ff00',
        0.7: '#ffff00',
        1.0: '#ff0000'
      },
      ...options
    }).addTo(map)

    return () => {
      map.removeLayer(heatLayer)
    }
  }, [map, points, options])

  return null
}

export default HeatmapLayer
