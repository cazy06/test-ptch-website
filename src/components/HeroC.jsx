/**
 * Hero 案C — Canvas 2D インタラクティブパーティクル
 * 5000個の粒子が自律的に浮遊しながら回路基板パターンを形成
 * マウスに反応して粒子が散り、離れると緩やかに戻る物理演算
 * 依存ゼロ・純粋Canvas 2D API
 */
import { useEffect, useRef } from 'react'
import { ArrowRight, Zap, Users, Cpu } from 'lucide-react'

const personas = [
  { icon: <Users size={20} />, label: '中小企業の経営者の方', desc: '業務デジタル化を検討中', href: '#zerosaaS' },
  { icon: <Cpu size={20} />, label: 'デジタル推進担当の方', desc: 'AI活用・DX推進を担当', href: '#ai' },
  { icon: <Zap size={20} />, label: 'パートナー企業の方', desc: '案件紹介・協業を検討中', href: '#partner' },
]

const COLORS = ['#3E92CC', '#00C2CB', '#6fb8e8', '#FF8C42', '#ffffff']
const CONNECT_DIST = 90   // px — 近接ノード間に線を引く距離
const MOUSE_RADIUS = 120  // px — マウス反発範囲
const PARTICLE_COUNT = 180

class Particle {
  constructor(w, h) {
    this.reset(w, h)
  }
  reset(w, h) {
    this.x  = Math.random() * w
    this.y  = Math.random() * h
    this.ox = this.x          // origin (circuit grid snap)
    this.oy = this.y
    this.vx = (Math.random() - 0.5) * 0.4
    this.vy = (Math.random() - 0.5) * 0.4
    this.r  = Math.random() * 2 + 1
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.alpha = 0.5 + Math.random() * 0.5
    // circuit board: snap to grid with offset
    const gx = Math.round(this.x / 60) * 60
    const gy = Math.round(this.y / 60) * 60
    this.ox = gx + (Math.random() - 0.5) * 30
    this.oy = gy + (Math.random() - 0.5) * 30
    this.x  = this.ox
    this.y  = this.oy
  }
}

export default function HeroC() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = 0, H = 0
    let particles = []

    const init = () => {
      W = canvas.width  = canvas.clientWidth  * window.devicePixelRatio
      H = canvas.height = canvas.clientHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio > 1 ? 1 : 1, 1) // already scaled by canvas size
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(W, H))
    }

    const onResize = () => {
      const dpr = window.devicePixelRatio
      W = canvas.width  = canvas.clientWidth  * dpr
      H = canvas.height = canvas.clientHeight * dpr
      particles.forEach(p => { if (p.x > W || p.y > H) p.reset(W, H) })
    }
    window.addEventListener('resize', onResize)

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      const dpr  = window.devicePixelRatio
      mouseRef.current.x = (e.clientX - rect.left) * dpr
      mouseRef.current.y = (e.clientY - rect.top)  * dpr
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)

    init()

    let frameId
    let tick = 0

    const draw = () => {
      frameId = requestAnimationFrame(draw)
      tick++

      // Background: dark navy, slight trail for motion blur
      ctx.fillStyle = 'rgba(4, 13, 31, 0.82)'
      ctx.fillRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const dpr = window.devicePixelRatio

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS * dpr) {
          const force = (MOUSE_RADIUS * dpr - dist) / (MOUSE_RADIUS * dpr)
          p.vx += (dx / dist) * force * 2.5
          p.vy += (dy / dist) * force * 2.5
        }

        // Spring back to origin (circuit position)
        p.vx += (p.ox - p.x) * 0.012
        p.vy += (p.oy - p.y) * 0.012

        // Damping
        p.vx *= 0.92
        p.vy *= 0.92

        // Slow drift on origin itself
        if (tick % 90 === i % 90) {
          p.ox += (Math.random() - 0.5) * 18
          p.oy += (Math.random() - 0.5) * 18
          p.ox = Math.max(10, Math.min(W - 10, p.ox))
          p.oy = Math.max(10, Math.min(H - 10, p.oy))
        }

        p.x += p.vx
        p.y += p.vy

        // Draw node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Draw connecting lines (circuit board style — only H/V)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = Math.abs(a.x - b.x)
          const dy = Math.abs(a.y - b.y)
          const d2 = dx * dx + dy * dy
          const threshold = CONNECT_DIST * dpr

          if (d2 < threshold * threshold) {
            const alpha = (1 - Math.sqrt(d2) / threshold) * 0.35
            // Circuit: prefer axis-aligned segments
            const isNearAxis = dx < 8 * dpr || dy < 8 * dpr
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            if (isNearAxis) {
              // straight line (circuit trace)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = a.color
              ctx.lineWidth = 0.8 * dpr
            } else {
              // diagonal — softer / dimmer
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = '#3E92CC'
              ctx.lineWidth = 0.3 * dpr
            }
            ctx.globalAlpha = alpha
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      // Scan line effect (subtle)
      const scanY = ((tick * 1.5) % H)
      const grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
      grad.addColorStop(0, 'rgba(0,194,203,0)')
      grad.addColorStop(0.5, 'rgba(0,194,203,0.04)')
      grad.addColorStop(1, 'rgba(0,194,203,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 40, W, 80)

      // Bottom white fade (over canvas, not content)
      const fadeGrad = ctx.createLinearGradient(0, H * 0.82, 0, H)
      fadeGrad.addColorStop(0, 'rgba(255,255,255,0)')
      fadeGrad.addColorStop(1, 'rgba(255,255,255,1)')
      ctx.fillStyle = fadeGrad
      ctx.fillRect(0, H * 0.82, W, H * 0.18)
    }

    draw()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: '#040d1f' }}>
      {/* Canvas – interactive particle field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        style={{ display: 'block' }}
      />

      {/* Left-side vertical gradient to make text more readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(4,13,31,0.80) 0%, rgba(4,13,31,0.45) 50%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 z-10">
        <div className="flex justify-center md:justify-start mb-6">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00C2CB' }} />
            横浜発・戦略的テクノロジーパートナー
          </span>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            ともに創り、
            <br />
            ともに育てる。
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
            テクノロジーで未来を描く、戦略的パートナーシップ
          </p>
          <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
            生成AI・伴走型開発・ZERO-SaaS（初期費用0円）で、あなたのビジネス課題を解決。
            丸投げではなく、一緒に考え、一緒に作る。それがポノテクのスタイルです。
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="btn-primary text-lg px-8 py-4">
            今すぐ無料相談 <ArrowRight size={20} />
          </a>
          <a href="#contact" className="btn-secondary text-lg px-8 py-4">
            資料をダウンロード
          </a>
        </div>

        <div className="mt-14 flex flex-wrap gap-8">
          {[
            { num: '0円', label: '初期費用（ZERO-SaaS）' },
            { num: '2〜6週', label: '最短リリース期間' },
            { num: '100%', label: 'スクラッチ開発' },
          ].map((s) => (
            <div key={s.label} className="text-white">
              <p className="text-4xl font-black">{s.num}</p>
              <p className="text-sm text-white/70 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-white/60 text-sm font-medium mb-4 uppercase tracking-widest">あなたはどちらですか？</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            {personas.map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="group flex items-start gap-3 p-4 rounded-xl border border-white/20 backdrop-blur-sm text-white transition-all duration-200 bg-white/10 hover:bg-white/20"
              >
                <div className="p-2 bg-white/10 rounded-lg mt-0.5">{p.icon}</div>
                <div>
                  <p className="text-sm font-bold leading-tight">{p.label}</p>
                  <p className="text-xs text-white/60 mt-0.5">{p.desc}</p>
                </div>
                <ArrowRight size={16} className="ml-auto self-center text-white/40 group-hover:text-white/80 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
