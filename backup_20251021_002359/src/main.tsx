import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

console.log('🚀 main.tsx: Starting CredenCode app...')

const rootElement = document.getElementById('root')
console.log('🔍 main.tsx: Root element:', rootElement)

if (!rootElement) {
  console.error('❌ main.tsx: Failed to find the root element!')
  throw new Error('Failed to find the root element')
}

try {
  console.log('🔄 main.tsx: Creating React root...')
  const root = ReactDOM.createRoot(rootElement)
  console.log('✅ main.tsx: React root created successfully')
  
  console.log('🔄 main.tsx: Rendering App component...')
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.log('✅ main.tsx: App rendered successfully')
} catch (error) {
  console.error('❌ main.tsx: Error rendering app:', error)
  throw error
}
