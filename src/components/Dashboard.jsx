import './Dashboard.css'

function Dashboard({ selectedShark }) {
  if (!selectedShark) {
    return (
      <div className="dashboard">
        <div className="dashboard-empty">
          <p>🗺️ Click on a shark marker to view details</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="shark-details">
        <h2>{selectedShark.name}</h2>
        <div className="detail-item">
          <span className="label">Species:</span>
          <span className="value">{selectedShark.species}</span>
        </div>
        <div className="detail-item">
          <span className="label">Tag ID:</span>
          <span className="value">{selectedShark.tagId}</span>
        </div>
        <div className="detail-item">
          <span className="label">Position:</span>
          <span className="value">{selectedShark.lat.toFixed(4)}°, {selectedShark.lng.toFixed(4)}°</span>
        </div>
        <div className="detail-item">
          <span className="label">Last Update:</span>
          <span className="value">{selectedShark.lastUpdate}</span>
        </div>
      </div>

      <div className="environmental-data">
        <h3>Environmental Conditions</h3>
        <div className="env-grid">
          <div className="env-card">
            <div className="env-label">Sea Surface Temp</div>
            <div className="env-value">{selectedShark.sst}°C</div>
          </div>
          <div className="env-card">
            <div className="env-label">Chlorophyll-a</div>
            <div className="env-value">{selectedShark.chlorophyll} mg/m³</div>
          </div>
          <div className="env-card">
            <div className="env-label">Depth</div>
            <div className="env-value">{selectedShark.depth} m</div>
          </div>
          <div className="env-card">
            <div className="env-label">Foraging Probability</div>
            <div className="env-value">{selectedShark.foragingProb}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
