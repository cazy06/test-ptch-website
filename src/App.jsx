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

function App({ defaultHero = 'current' }) {
  const [heroKey, setHeroKey] = useState(defaultHero)
  const HeroComponent = HEROES[heroKey].component

  return (
    <div className="min-h-screen">
      {/* ── Hero switcher (preview floating pill) ── */}
      <div
        style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(10,10,20,0.88)', backdropFilter: 'blur(12px)',
          borderRadius: 999, padding: '6px 10px',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)', whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', padding: '0 4px', letterSpacing: '0.05em' }}>
          HERO PREVIEW
        </span>
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
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)', margin: '0 4px' }} />
        {[
          { href: '/test-ptch-website/hero-a/', label: 'A専用ページ' },
          { href: '/test-ptch-website/hero-b/', label: 'B専用ページ' },
          { href: '/test-ptch-website/hero-c/', label: 'C専用ページ' },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            style={{
              padding: '5px 11px', borderRadius: 999, fontSize: 11, fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.15s',
              background: 'rgba(62,146,204,0.18)', color: '#6fb8e8',
              border: '1px solid rgba(62,146,204,0.3)',
            }}
          >
            ↗ {label}
          </a>
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
