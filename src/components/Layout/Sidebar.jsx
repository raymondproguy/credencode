import React from 'react'

const Sidebar = ({ activePanel, onPanelChange, isOpen, onClose }) => {
  const menuItems = [
    { id: 'explorer', icon: 'fa-folder', label: 'Explorer' },
    { id: 'search', icon: 'fa-search', label: 'Search' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' }
  ]

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-items">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`sidebar-item ${activePanel === item.id ? 'active' : ''}`}
              onClick={() => {
                onPanelChange(item.id)
                onClose()
              }}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar
