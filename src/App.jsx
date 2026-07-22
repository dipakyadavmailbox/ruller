import { Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout.jsx'
import Home from './pages/Home.jsx'
import PasswordCheckerPage from './pages/PasswordCheckerPage.jsx'
import CalorieCalculatorPage from './pages/CalorieCalculatorPage.jsx'
import RulerPage from './pages/RulerPage.jsx'

export default function App() {
  return (
    <Routes>
      {/* Ruler is full-screen and intentionally outside the shared layout —
          see the comment in RulerPage.jsx for why. */}
      <Route path="/ruler" element={<RulerPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/password-checker" element={<PasswordCheckerPage />} />
        <Route path="/calorie-calculator" element={<CalorieCalculatorPage />} />
      </Route>
    </Routes>
  )
}
