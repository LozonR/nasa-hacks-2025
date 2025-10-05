import "./Dashboard.css";

function Dashboard({ selectedShark }) {
  if (!selectedShark) {
    return (
      <div className="dashboard">
        <div className="dashboard-empty">
          <p>🗺️ Click on a shark marker to view details</p>
        </div>
      </div>
    );
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
          <span className="value">{selectedShark.id}</span>
        </div>
        <div className="detail-item">
          <span className="label">Position:</span>
          <span className="value">
            {selectedShark.location[1].toFixed(4)}°,{" "}
            {selectedShark.location[0].toFixed(4)}°
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
