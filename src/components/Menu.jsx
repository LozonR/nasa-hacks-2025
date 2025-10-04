import { useState } from 'react'
import './Menu.css'

function Menu({ onViewChange, currentView, onRandomSharkZoom }) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: 'map', icon: '🗺️', label: 'Live Map' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'predictions', icon: '🎯', label: 'Predictions' },
    { id: 'tag-designer', icon: '🏷️', label: 'Tag Designer' },
    { id: 'data-sources', icon: '🛰️', label: 'Data Sources' },
    { id: 'about', icon: 'ℹ️', label: 'About' }
  ]

  const handleRandomShark = () => {
    if (currentView !== 'map') {
      onViewChange('map')
    }
    setTimeout(() => {
      onRandomSharkZoom()
    }, currentView !== 'map' ? 100 : 0)
    setIsOpen(false)
  }

  return (
    <>
      <button
        className={`menu-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2>Navigation</h2>
        </div>

        <ul className="menu-list">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={`menu-item ${currentView === item.id ? 'active' : ''}`}
                onClick={() => {
                  onViewChange(item.id)
                  setIsOpen(false)
                }}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="menu-action">
          <button
            className="menu-item random-shark-btn"
            onClick={handleRandomShark}
          >
            <span className="menu-icon">🎲</span>
            <span className="menu-label">Random Shark</span>
          </button>
        </div>

        <div className="menu-footer">
          <div className="menu-stats">
            <div className="stat">
              <span className="stat-value">4</span>
              <span className="stat-label">Active Tags</span>
            </div>
            <div className="stat">
              <span className="stat-value">2.3k</span>
              <span className="stat-label">Data Points</span>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Menu
