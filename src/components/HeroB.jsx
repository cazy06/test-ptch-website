/**
 * Hero 案B — WebGL GLSL Fluid Shader (revised)
 * GPU上で動くノイズベースの流体グラデーション
 * value noise で [0,1] 値域を保証し確実に描画
 */
import { useEffect, useRef } from 'react'
import { ArrowRight, Zap, Users, Cpu } from 'lucide-react'

const personas = [
  { icon: <Users size={20} />, label: '経営者の方', href: '#zerosaaS' },
  { icon: <Cpu size={20} />, label: 'デジタル推進担当の方', href: '#ai' },
  { icon: <Zap size={20} />, label: 'パートナー企業の方', href: '#partner' },
]

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

// value noise (確実に [0,1] の値域)
const FRAG = `
  precision highp float;
  uniform float u_time;
  uniform vec2  u_res;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),            hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * vnoise(p); p *= 2.1; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    uv.y = 1.0 - uv.y;

    float t = u_time * 0.12;

    // 2段階のドメインワーピングで有機的な流れを生成
    vec2 q = vec2(fbm(uv * 2.0 + vec2(0.0,  0.0) + t),
                  fbm(uv * 2.0 + vec2(5.2,  1.3) + t * 0.8));
    vec2 r = vec2(fbm(uv * 2.0 + 3.5 * q + vec2(1.7, 9.2) + t * 0.5),
                  fbm(uv * 2.0 + 3.5 * q + vec2(8.3, 2.8) + t * 0.4));
    float f = fbm(uv * 1.8 + 3.0 * r + t * 0.3);

    // カラーパレット: #112458 ベースでネイビー→ブルー→シアン→オレンジ
    vec3 base   = vec3(0.067, 0.141, 0.345); // #112458
    vec3 navy   = vec3(0.039, 0.141, 0.388); // #0A2463
    vec3 blue   = vec3(0.243, 0.573, 0.800); // #3E92CC
    vec3 cyan   = vec3(0.000, 0.761, 0.796); // #00C2CB
    vec3 orange = vec3(1.000, 0.549, 0.259); // #FF8C42

    vec3 col = base;
    col = mix(col,   navy,   smoothstep(0.20, 0.42, f));
    col = mix(col,   blue,   smoothstep(0.40, 0.60, f));
    col = mix(col,   cyan,   smoothstep(0.58, 0.72, f));
    col = mix(col,   orange, smoothstep(0.70, 0.85, f));

    // ビニエット
    vec2 vc = uv - 0.5;
    float vign = 1.0 - dot(vc, vc) * 1.6;
    col *= clamp(vign, 0.2, 1.0);

    // 下端を白にフェード
    float fadeY = smoothstep(0.0, 0.15, uv.y);
    col = mix(vec3(1.0), col, fadeY);

    gl_FragColor = vec4(col, 1.0);
  }
`

function initGL(canvas) {
  const gl = canvas.getContext('webgl')
  if (!gl) return null

  const compile = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(s))
      return null
    }
    return s
  }

  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null

  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Link error:', gl.getProgramInfoLog(prog))
    return null
  }
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  return {
    gl,
    uTime: gl.getUniformLocation(prog, 'u_time'),
    uRes:  gl.getUniformLocation(prog, 'u_res'),
  }
}

export default function HeroB() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let ctx = null
    let frameId = null
    let start = 0

    const render = (now) => {
      if (!ctx) return
      const { gl, uTime, uRes } = ctx
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frameId = requestAnimationFrame(render)
    }

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      // clientWidth が 0 の場合は window を使用
      const w = Math.round((canvas.clientWidth  || window.innerWidth)  * dpr)
      const h = Math.round((canvas.clientHeight || window.innerHeight) * dpr)
      if (w === 0 || h === 0) return false
      canvas.width  = w
      canvas.height = h
      return true
    }

    // rAF 1フレーム待ってレイアウト確定後に初期化
    const boot = () => {
      if (!setSize()) { requestAnimationFrame(boot); return }

      ctx = initGL(canvas)
      if (!ctx) return

      const { gl, uRes } = ctx
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)

      start = performance.now()
      frameId = requestAnimationFrame(render)
    }
    requestAnimationFrame(boot)

    const onResize = () => {
      if (!ctx) return
      const ok = setSize()
      if (!ok) return
      ctx.gl.viewport(0, 0, canvas.width, canvas.height)
      ctx.gl.uniform2f(ctx.uRes, canvas.width, canvas.height)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#112458' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* 左側テキスト可読性オーバーレイ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(105deg, rgba(17,36,88,0.65) 0%, rgba(17,36,88,0.28) 55%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 z-10">
        <div className="flex justify-center md:justify-start mb-6">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            横浜発・戦略的テクノロジーパートナー
          </span>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
            ともに創り、
            <br />
            ともに育てる。
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white/90 leading-relaxed font-medium drop-shadow">
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
              <p className="text-sm text-white/70 mb-1">{s.label}</p>
              <p className="text-4xl font-black drop-shadow">{s.num}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            {personas.map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="group flex items-center gap-3 p-4 rounded-xl border border-white/20 backdrop-blur-md text-white transition-all duration-200 bg-white/10 hover:bg-white/20"
              >
                <div className="p-2 bg-white/10 rounded-lg">{p.icon}</div>
                <p className="text-sm font-bold leading-tight">{p.label}</p>
                <ArrowRight size={16} className="ml-auto text-white/40 group-hover:text-white/80 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
    </section>
  )
}
