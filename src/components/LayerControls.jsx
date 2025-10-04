import './LayerControls.css'

function LayerControls({ layers, onToggle }) {
  return (
    <div className="layer-controls">
      <div className="layer-controls-header">
        <h3>Map Layers</h3>
      </div>

      <div className="layer-list">
        {Object.entries(layers).map(([key, layer]) => (
          <div key={key} className="layer-item">
            <label className="layer-label">
              <input
                type="checkbox"
                checked={layer.enabled}
                onChange={() => onToggle(key)}
              />
              <span className="layer-name">{layer.name}</span>
            </label>
            {layer.legend && (
              <div className="layer-legend">
                {layer.legend}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LayerControls
