import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DatingComparisonPage from './app/dating-comparison/page'

// Import other pages if they exist and are compatible with Vite
// For now, we'll focus on the dating comparison as the main presentation

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main presentation - dating comparison */}
        <Route path="/" element={<DatingComparisonPage />} />
        <Route path="/dating-comparison" element={<DatingComparisonPage />} />
        
        {/* Redirect any other routes to main presentation */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
