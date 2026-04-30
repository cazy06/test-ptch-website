/**
 * Hero 案B — WebGL GLSL Fluid Shader
 * GPU上で動くノイズベースの流体グラデーション
 * ネイビー×シアン×オレンジが有機的に溶け合う、Stripeライクなプレミアム表現
 * 依存ゼロ・純粋WebGL
 */
import { useEffect, useRef } from 'react'
import { ArrowRight, Zap, Users, Cpu } from 'lucide-react'

const personas = [
  { icon: <Users size={20} />, label: '中小企業の経営者の方', desc: '業務デジタル化を検討中', href: '#zerosaaS' },
  { icon: <Cpu size={20} />, label: 'デジタル推進担当の方', desc: 'AI活用・DX推進を担当', href: '#ai' },
  { icon: <Zap size={20} />, label: 'パートナー企業の方', desc: '案件紹介・協業を検討中', href: '#partner' },
]

const VERT = /* glsl */`
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = /* glsl */`
  precision highp float;
  uniform float u_time;
  uniform vec2  u_res;

  // 2D simplex-like noise (compact version)
  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                  dot(p, vec2(269.5, 183.3)),
                  dot(p, vec2(419.2, 371.9)));
    return fract(sin(q) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash3(i + vec2(0,0)).xy, f - vec2(0,0)),
                   dot(hash3(i + vec2(1,0)).xy, f - vec2(1,0)), u.x),
               mix(dot(hash3(i + vec2(0,1)).xy, f - vec2(0,1)),
                   dot(hash3(i + vec2(1,1)).xy, f - vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p); p *= 2.1; a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    uv.y = 1.0 - uv.y;

    float t = u_time * 0.18;

    // Multi-layer FBM warping
    vec2 q = vec2(fbm(uv + vec2(0.0, 0.0) + t * 0.3),
                  fbm(uv + vec2(5.2, 1.3) + t * 0.25));
    vec2 r = vec2(fbm(uv + 4.0 * q + vec2(1.7, 9.2) + t * 0.15),
                  fbm(uv + 4.0 * q + vec2(8.3, 2.8) + t * 0.12));
    float f = fbm(uv + 4.0 * r + t * 0.1);

    // Color palette: navy → blue → cyan → orange
    vec3 navy  = vec3(0.039, 0.141, 0.388); // #0A2463
    vec3 blue  = vec3(0.243, 0.573, 0.800); // #3E92CC
    vec3 cyan  = vec3(0.000, 0.761, 0.796); // #00C2CB
    vec3 orange= vec3(1.000, 0.549, 0.259); // #FF8C42
    vec3 dark  = vec3(0.010, 0.030, 0.100);

    vec3 col = mix(dark,  navy,  smoothstep(0.0, 0.4, f));
    col      = mix(col,   blue,  smoothstep(0.3, 0.6, f));
    col      = mix(col,   cyan,  smoothstep(0.55, 0.75, f));
    col      = mix(col,   orange,smoothstep(0.72, 0.88, f));

    // Subtle vignette
    float vign = 1.0 - dot(uv - 0.5, uv - 0.5) * 1.4;
    col *= clamp(vign, 0.0, 1.0);

    // Bottom fade to white
    float fadeY = smoothstep(0.0, 0.14, uv.y);
    col = mix(vec3(1.0), col, fadeY);

    gl_FragColor = vec4(col, 1.0);
  }
`

function initGL(canvas) {
  const gl = canvas.getContext('webgl', { antialias: false })
  if (!gl) return null

  const compile = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const prog = gl.createProgram()
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  gl.useProgram(prog)

  // Full-screen quad
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
    const ctx = initGL(canvas)
    if (!ctx) return
    const { gl, uTime, uRes } = ctx

    const resize = () => {
      const w = canvas.clientWidth * window.devicePixelRatio
      const h = canvas.clientHeight * window.devicePixelRatio
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
    }
    resize()
    window.addEventListener('resize', resize)

    const start = performance.now()
    let frameId
    const render = () => {
      frameId = requestAnimationFrame(render)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    render()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
      {/* WebGL shader canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Frosted glass overlay (optional subtle darkening on text side) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(105deg, rgba(4,13,31,0.62) 0%, rgba(4,13,31,0.25) 55%, transparent 100%)' }}
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
              <p className="text-4xl font-black drop-shadow">{s.num}</p>
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
                className="group flex items-start gap-3 p-4 rounded-xl border border-white/20 backdrop-blur-md text-white transition-all duration-200 bg-white/10 hover:bg-white/20"
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

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
    </section>
  )
}
