import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import Hero   from './components/Hero'
import HeroA  from './components/HeroA'
import HeroB  from './components/HeroB'
import HeroC  from './components/HeroC'
import TrustBar from './components/TrustBar'
import Services from './components/Services'
import Cases from './components/Cases'
import Process from './components/Process'
import JourneyBanner from './components/JourneyBanner'
import Partner from './components/Partner'
import About from './components/About'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

const HEROES = {
  current: { label: '現行', component: Hero },
  A: { label: '案A: 3D Neural', component: HeroA },
  B: { label: '案B: GLSL Fluid', component: HeroB },
  C: { label: '案C: Particles', component: HeroC },
}

function App() {
  const [heroKey, setHeroKey] = useState('current')
  const HeroComponent = HEROES[heroKey].component

  return (
    <div className="min-h-screen">
      {/* ── Hero switcher (dev-only floating pill) ── */}
      <div
        style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, display: 'flex', gap: 6, background: 'rgba(10,10,20,0.85)',
          backdropFilter: 'blur(12px)', borderRadius: 999,
          padding: '6px 10px', border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        }}
      >
        {Object.entries(HEROES).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setHeroKey(key)}
            style={{
              padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.15s', border: 'none',
              background: heroKey === key ? '#FF8C42' : 'rgba(255,255,255,0.08)',
              color: heroKey === key ? '#fff' : 'rgba(255,255,255,0.65)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <Header />
      <main>
        <HeroComponent />
        <TrustBar />
        <Services />
        <Cases />
        <Process />
        <JourneyBanner />
        <Partner />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
