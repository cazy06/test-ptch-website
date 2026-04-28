import { ArrowRight, Code2, Bot, Layers } from 'lucide-react'

const services = [
  {
    id: 'codev',
    icon: <Code2 size={32} />,
    color: 'from-blue-600 to-blue-800',
    lightColor: 'bg-blue-50',
    accentColor: 'text-blue-700',
    tag: 'Co-Dev Support',
    title: '伴走型システム開発支援',
    tagline: '丸投げではなく、一緒に作る',
    description:
      'デジタルソリューションでビジネス課題を解決します。最新技術による最適なアプローチを、お客様と並走しながら実現。単なるベンダーではなく、事業成長を共に考えるパートナーとして支援します。',
    painPoints: [
      '開発会社に丸投げして失敗した経験がある',
      '社内にエンジニアがいない',
      'システム化したいが何から始めていいかわからない',
    ],
    href: '#contact',
  },
  {
    id: 'ai',
    icon: <Bot size={32} />,
    color: 'from-cyan-500 to-blue-600',
    lightColor: 'bg-cyan-50',
    accentColor: 'text-cyan-700',
    tag: 'AI Consulting',
    title: '生成AIコンサルティング',
    tagline: '最先端AIで競争力を手に入れる',
    description:
      '最先端の生成AI技術（ChatGPT/Claude/ComfyUI等）をビジネスに実装。書籍「ComfyUIマスターガイド」出版レベルの深い専門知識を活かし、具体的なROIを生み出すAI導入を支援します。',
    painPoints: [
      'AIを導入したいが社内知識がない',
      'ChatGPT以上の活用ができていない',
      'AI導入のROIが見えない',
    ],
    href: '#contact',
  },
  {
    id: 'zerosaaS',
    icon: <Layers size={32} />,
    color: 'from-orange-500 to-pink-600',
    lightColor: 'bg-orange-50',
    accentColor: 'text-orange-700',
    tag: 'ZERO-SaaS',
    title: 'ZERO-SaaS',
    tagline: '初期費用0円で本格業務アプリを',
    description:
      '初期費用0円で、企業ごとにカスタマイズした業務アプリをスクラッチ開発。SDK + AIを活用した高速開発で最短2〜6週間でリリース。月額課金モデルで初期投資リスクを排除します。',
    painPoints: [
      'パッケージソフトが業務に合わない',
      'スクラッチ開発は費用が高くて諦めていた',
      'Excelでの管理に限界を感じている',
    ],
    href: '#contact',
    badge: '初期費用 0円',
  },
]

export default function Services() {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-cyan-600 uppercase tracking-widest">
            Services
          </span>
          <h2 className="section-heading mt-3">3つのサービス</h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            「作って終わり」ではなく、「共に育てる」をモットーに、
            <br className="hidden md:block" />
            貴社の課題に最適なサービスを提供します。
          </p>
        </div>

        {/* Service Cards */}
        <div className="space-y-8">
          {services.map((svc, idx) => (
            <div
              key={svc.id}
              id={svc.id}
              className={`card overflow-hidden flex flex-col md:flex-row ${
                idx % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Color Panel */}
              <div
                className={`bg-gradient-to-br ${svc.color} p-8 md:p-12 md:w-2/5 flex flex-col justify-center`}
              >
                <div className="text-white/80 mb-4">{svc.icon}</div>
                {svc.badge && (
                  <span className="inline-block mb-3 bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full w-fit">
                    {svc.badge}
                  </span>
                )}
                <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
                  {svc.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-2 leading-tight">
                  {svc.title}
                </h3>
                <p className="text-white/80 mt-2 font-medium">{svc.tagline}</p>
              </div>

              {/* Content Panel */}
              <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
                <p className="text-gray-700 leading-relaxed text-base">{svc.description}</p>

                <div className={`mt-6 p-5 rounded-xl ${svc.lightColor}`}>
                  <p className={`text-sm font-bold ${svc.accentColor} mb-3`}>
                    こんな課題をお持ちの方へ
                  </p>
                  <ul className="space-y-2">
                    {svc.painPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className={`mt-0.5 font-bold ${svc.accentColor}`}>✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={svc.href}
                  className={`mt-6 inline-flex items-center gap-2 font-bold ${svc.accentColor} hover:underline`}
                >
                  このサービスについて相談する
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Service Comparison */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-black text-blue-900 mb-6 text-center">
            サービス比較一覧
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">項目</th>
                  <th className="text-center py-3 px-4 text-blue-700 font-bold">Co-Dev</th>
                  <th className="text-center py-3 px-4 text-cyan-700 font-bold">AI Consulting</th>
                  <th className="text-center py-3 px-4 text-orange-700 font-bold">ZERO-SaaS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['初期費用', '要相談', '要相談', '0円'],
                  ['料金モデル', 'プロジェクト単位', '月次/プロジェクト', '月額固定'],
                  ['開発期間', 'プロジェクト次第', '1ヶ月〜', '2〜6週間'],
                  ['主な対象', '中〜大企業', '中〜大企業', '中小企業'],
                  ['AI活用', '○', '◎', '○'],
                  ['カスタマイズ度', '◎', '◎', '◎'],
                ].map(([item, codev, ai, zero]) => (
                  <tr key={item} className="border-b border-gray-100 hover:bg-white transition-colors">
                    <td className="py-3 px-4 text-gray-600 font-medium">{item}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{codev}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{ai}</td>
                    <td className="py-3 px-4 text-center text-gray-700 font-medium">
                      {zero === '0円' ? (
                        <span className="bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">
                          {zero}
                        </span>
                      ) : (
                        zero
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
