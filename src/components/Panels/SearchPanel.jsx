import React, { useState } from 'react'

const SearchPanel = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="search-panel">
      <input
        type="text"
        className="search-input"
        placeholder="Search in files..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
        <div>No results found</div>
        <div style={{ marginTop: '8px' }}>
          <div>index.html</div>
          <div>style.css</div>
          <div>script.js</div>
        </div>
      </div>
    </div>
  )
}

export default SearchPanel
