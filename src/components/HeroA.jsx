/**
 * Hero 案A — Three.js 3D Neural Network
 * 浮遊するノードが自動で結合・回転する神経回路ビジュアル
 * マウス追従で視点が微妙にシフトする奥行き感を演出
 */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ArrowRight, Zap, Users, Cpu } from 'lucide-react'

const personas = [
  { icon: <Users size={20} />, label: '経営者の方', href: '#zerosaaS' },
  { icon: <Cpu size={20} />, label: 'デジタル推進担当の方', href: '#ai' },
  { icon: <Zap size={20} />, label: 'パートナー企業の方', href: '#partner' },
]

export default function HeroA() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // --- Scene setup ---
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 500)
    camera.position.set(0, 0, 80)

    // --- Nodes (spheres) ---
    const NODE_COUNT = 90
    const RANGE = 55
    const positions = []
    const velocities = []
    const nodeGroup = new THREE.Group()
    scene.add(nodeGroup)

    const sphereGeo = new THREE.SphereGeometry(0.55, 8, 8)
    const colors = [0x3E92CC, 0x00C2CB, 0x6fb8e8, 0xffffff]

    for (let i = 0; i < NODE_COUNT; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.75 + Math.random() * 0.25,
      })
      const mesh = new THREE.Mesh(sphereGeo, mat)
      const x = (Math.random() - 0.5) * RANGE * 2
      const y = (Math.random() - 0.5) * RANGE * 1.2
      const z = (Math.random() - 0.5) * RANGE * 1.5
      mesh.position.set(x, y, z)
      nodeGroup.add(mesh)
      positions.push(new THREE.Vector3(x, y, z))
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.02,
      ))
    }

    // --- Edges (lines between nearby nodes) ---
    const MAX_DIST = 22
    const edgeGroup = new THREE.Group()
    scene.add(edgeGroup)

    const buildEdges = () => {
      edgeGroup.clear()
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const d = positions[i].distanceTo(positions[j])
          if (d < MAX_DIST) {
            const opacity = (1 - d / MAX_DIST) * 0.45
            const geo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]])
            const mat = new THREE.LineBasicMaterial({
              color: 0x3E92CC,
              transparent: true,
              opacity,
            })
            edgeGroup.add(new THREE.Line(geo, mat))
          }
        }
      }
    }
    buildEdges()

    // --- Ambient glow particles (background stars) ---
    const starGeo = new THREE.BufferGeometry()
    const starVerts = []
    for (let i = 0; i < 400; i++) {
      starVerts.push(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 200 - 50,
      )
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, transparent: true, opacity: 0.25 })
    scene.add(new THREE.Points(starGeo, starMat))

    // --- Resize handler ---
    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // --- Mouse ---
    const onMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // --- Animation loop ---
    let frameId
    let tick = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      tick++

      // Move nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        positions[i].add(velocities[i])
        const b = RANGE
        if (Math.abs(positions[i].x) > b) velocities[i].x *= -1
        if (Math.abs(positions[i].y) > b * 0.6) velocities[i].y *= -1
        if (Math.abs(positions[i].z) > b * 0.75) velocities[i].z *= -1
        nodeGroup.children[i].position.copy(positions[i])
      }

      // Rebuild edges every 3 frames (perf balance)
      if (tick % 3 === 0) buildEdges()

      // Slow group rotation
      nodeGroup.rotation.y += 0.0015
      edgeGroup.rotation.y += 0.0015

      // Camera parallax
      camera.position.x += (mouseRef.current.x * 12 - camera.position.x) * 0.04
      camera.position.y += (mouseRef.current.y * 7 - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      renderer.dispose()
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: '#112458' }}>
      {/* Three.js canvas – full bleed background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #112458 100%)' }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 z-10">
        {/* Badge */}
        <div className="flex justify-center md:justify-start mb-6">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            横浜発・戦略的テクノロジーパートナー
          </span>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            ともに創り、
            <br />
            <span className="text-white">ともに育てる。</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
            テクノロジーで未来を描く、戦略的パートナーシップ
          </p>
          <p className="mt-4 text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">
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
              <p className="text-sm text-white/70 mb-1">{s.label}</p>
              <p className="text-4xl font-black">{s.num}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            {personas.map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="group flex items-center gap-3 p-4 rounded-xl border border-white/20 backdrop-blur-sm text-white transition-all duration-200 bg-white/10 hover:bg-white/20"
              >
                <div className="p-2 bg-white/10 rounded-lg">{p.icon}</div>
                <p className="text-sm font-bold leading-tight">{p.label}</p>
                <ArrowRight size={16} className="ml-auto text-white/40 group-hover:text-white/80 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
    </section>
  )
}
