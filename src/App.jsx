import { Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout.jsx'
import Home from './pages/Home.jsx'
import PasswordCheckerPage from './pages/PasswordCheckerPage.jsx'
import CalorieCalculatorPage from './pages/CalorieCalculatorPage.jsx'
import RulerPage from './pages/RulerPage.jsx'
import RegexTesterPage from './pages/RegexTesterPage.jsx'
import DataConverterPage from './pages/DataConverterPage.jsx'
import PregnancyCalculatorPage from './pages/PregnancyCalculatorPage.jsx'
import AspectRatioPage from './pages/AspectRatioPage.jsx'
import DpiCalculatorPage from './pages/DpiCalculatorPage.jsx'
import ImageResizerPage from './pages/ImageResizerPage.jsx'
import QrCodeGeneratorPage from './pages/QrCodeGeneratorPage.jsx'

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
        <Route path="/regex-tester" element={<RegexTesterPage />} />
        <Route path="/data-converter" element={<DataConverterPage />} />
        <Route path="/qr-code-generator" element={<QrCodeGeneratorPage />} />
        <Route path="/pregnancy-calculator" element={<PregnancyCalculatorPage />} />
        <Route path="/aspect-ratio-calculator" element={<AspectRatioPage />} />
        <Route path="/dpi-calculator" element={<DpiCalculatorPage />} />
        <Route path="/image-resizer" element={<ImageResizerPage />} />
      </Route>
    </Routes>
  )
}
