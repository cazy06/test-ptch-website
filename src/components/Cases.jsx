import { ArrowRight, ExternalLink } from 'lucide-react'

const cases = [
  {
    id: 1,
    industry: '小売・EC',
    tag: 'ZERO-SaaS',
    tagColor: 'bg-orange-100 text-orange-700',
    title: 'Twitterスポットガイドアプリ',
    challenge: 'SNS上の口コミスポット情報が散在し、効率的に収集・整理できていなかった',
    solution: 'Twitter APIと地図データを組み合わせたWebアプリを2週間でリリース',
    result: '情報収集工数を80%削減、月間アクティブユーザー獲得',
    period: '開発期間：2週間',
  },
  {
    id: 2,
    industry: '製造業',
    tag: 'Co-Dev Support',
    tagColor: 'bg-blue-100 text-blue-700',
    title: '計量管理用Windowsアプリ',
    challenge: 'Excelによる計量データ管理で入力ミスが多発、属人化が深刻な課題だった',
    solution: '専用Windowsアプリをスクラッチ開発。データベース連携・自動集計機能を実装',
    result: '入力ミスゼロ化、集計作業を週3時間→30分に短縮',
    period: '開発期間：6週間',
  },
  {
    id: 3,
    industry: 'サービス業',
    tag: 'AI Consulting',
    tagColor: 'bg-cyan-100 text-cyan-700',
    title: 'Salesforceコンサルティング',
    challenge: 'SalesforceをCRM導入したが活用率が低く、投資効果が出ていなかった',
    solution: '業務フロー分析→カスタマイズ設計→社員研修まで一貫して支援',
    result: 'Salesforce活用率が40%→90%に向上、商談管理の可視化を実現',
    period: '支援期間：3ヶ月',
  },
]

export default function Cases() {
  return (
    <section className="py-24 bg-gray-50" id="cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-cyan-600 uppercase tracking-widest">
            Case Studies
          </span>
          <h2 className="section-heading mt-3">導入事例</h2>
          <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
            課題・解決策・成果を具体的にご紹介します。
          </p>
        </div>

        {/* Case Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.id} className="card flex flex-col">
              <div className="p-6 flex-1">
                {/* Tags */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`tag text-xs font-bold px-2.5 py-1 rounded-full ${c.tagColor}`}>
                    {c.tag}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{c.industry}</span>
                </div>

                <h3 className="text-lg font-black text-gray-900 mb-4">{c.title}</h3>

                {/* Before/After */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-14 text-xs font-bold text-red-600 bg-red-50 rounded px-2 py-1 h-fit text-center">
                      課題
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.challenge}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-14 text-xs font-bold text-blue-600 bg-blue-50 rounded px-2 py-1 h-fit text-center">
                      解決策
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.solution}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-14 text-xs font-bold text-green-700 bg-green-50 rounded px-2 py-1 h-fit text-center">
                      成果
                    </span>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">{c.result}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">{c.period}</span>
                <button className="text-xs font-bold text-blue-700 flex items-center gap-1 hover:underline">
                  詳しく見る <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a href="#contact" className="btn-outline">
            事例資料をダウンロード
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
