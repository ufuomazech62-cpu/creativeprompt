import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import PromptDetail from './pages/PromptDetail.jsx'
import Backgrounds from './pages/Backgrounds.jsx'
import Pricing from './pages/Pricing.jsx'
import { SITE_NAME } from './data/site.js'

export default function App() {
  return (
    <div data-testid="app-root" className="flex min-h-screen flex-col bg-night text-zinc-100">
      <Nav />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prompt/:id" element={<PromptDetail />} />
          <Route path="/backgrounds" element={<Backgrounds />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
