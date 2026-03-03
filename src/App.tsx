import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CasesPage from './pages/CasesPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cases" element={<CasesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

