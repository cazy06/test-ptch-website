import { ArrowRight, Zap, Users, Cpu } from 'lucide-react'

const personas = [
  {
    icon: <Users size={20} />,
    label: '中小企業の経営者の方',
    desc: '業務デジタル化を検討中',
    href: '#zerosaaS',
    color: 'bg-white/10 hover:bg-white/20',
  },
  {
    icon: <Cpu size={20} />,
    label: 'デジタル推進担当の方',
    desc: 'AI活用・DX推進を担当',
    href: '#ai',
    color: 'bg-white/10 hover:bg-white/20',
  },
  {
    icon: <Zap size={20} />,
    label: 'パートナー企業の方',
    desc: '案件紹介・協業を検討中',
    href: '#partner',
    color: 'bg-white/10 hover:bg-white/20',
  },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden gradient-navy">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, #00C2CB 0%, transparent 50%), radial-gradient(circle at 75% 75%, #3E92CC 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Badge */}
        <div className="flex justify-center md:justify-start mb-6">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            横浜発・戦略的テクノロジーパートナー
          </span>
        </div>

        {/* Main Headline */}
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
            <br className="hidden md:block" />
            丸投げではなく、一緒に考え、一緒に作る。それがポノテクのスタイルです。
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="btn-primary text-lg px-8 py-4">
            今すぐ無料相談
            <ArrowRight size={20} />
          </a>
          <a href="#contact" className="btn-secondary text-lg px-8 py-4">
            資料をダウンロード
          </a>
        </div>

        {/* Stats Row */}
        <div className="mt-14 flex flex-wrap gap-8">
          {[
            { num: '0円', label: '初期費用（ZERO-SaaS）' },
            { num: '2〜6週', label: '最短リリース期間' },
            { num: '100%', label: 'スクラッチ開発' },
          ].map((stat) => (
            <div key={stat.label} className="text-white">
              <p className="text-4xl font-black text-cyan-400">{stat.num}</p>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Persona Cards */}
        <div className="mt-16">
          <p className="text-white/60 text-sm font-medium mb-4 uppercase tracking-widest">
            あなたはどちらですか？
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            {personas.map((p) => (
              <a
                key={p.label}
                href={p.href}
                className={`group flex items-start gap-3 p-4 rounded-xl border border-white/20 backdrop-blur-sm text-white transition-all duration-200 ${p.color}`}
              >
                <div className="p-2 bg-white/10 rounded-lg mt-0.5 text-cyan-400">
                  {p.icon}
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">{p.label}</p>
                  <p className="text-xs text-white/60 mt-0.5">{p.desc}</p>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-auto self-center text-white/40 group-hover:text-white/80 transition-colors"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 60 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
