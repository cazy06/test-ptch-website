import { useEffect, useRef, useState } from 'react'

const stats = [
  { num: 10, suffix: '+', label: '開発実績' },
  { num: 0, suffix: '円', label: 'ZERO-SaaS初期費用', prefix: '初期' },
  { num: 2, suffix: '週〜', label: '最短リリース' },
  { num: 100, suffix: '%', label: 'スクラッチ開発' },
]

function Counter({ target, suffix, prefix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1200
          const step = target / (duration / 16)
          let current = 0
          const timer = setInterval(() => {
            current += step
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  )
}

export default function TrustBar() {
  return (
    <section className="py-16 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="text-white">
              <div className="text-4xl md:text-5xl font-black text-cyan-400">
                <Counter target={stat.num} suffix={stat.suffix} prefix={stat.prefix || ''} />
              </div>
              <p className="text-white/70 mt-2 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-10 border-t border-white/20">
          <p className="text-white/50 text-xs text-center uppercase tracking-widest mb-6">
            実績・メディア掲載
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              'ComfyUIマスターガイド 出版',
              'Salesforce 導入実績',
              'DYM MESSENGERS スポンサー',
              'note 技術記事 発信中',
            ].map((badge) => (
              <div
                key={badge}
                className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-white/80 text-sm font-medium"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
