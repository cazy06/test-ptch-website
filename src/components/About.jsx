import { MapPin, BookOpen, Users } from 'lucide-react'

export default function About() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-cyan-600 uppercase tracking-widest">
            About Us
          </span>
          <h2 className="section-heading mt-3">会社概要</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Company Info */}
          <div>
            <div className="card p-8">
              <h3 className="text-xl font-black text-blue-900 mb-6">ポノテク株式会社</h3>
              <dl className="space-y-4">
                {[
                  { label: '会社名', value: 'ポノテク株式会社' },
                  { label: '代表取締役', value: '早野 康寛' },
                  {
                    label: '所在地',
                    value: '〒220-0004 神奈川県横浜市西区北幸２丁目１０番地２８ むつみビル３F',
                  },
                  { label: '事業内容', value: 'システム開発支援 / 生成AIコンサルティング / ZERO-SaaSサービス' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <dt className="w-28 flex-shrink-0 text-sm font-bold text-gray-500">{label}</dt>
                    <dd className="text-sm text-gray-800 leading-relaxed">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Map placeholder */}
            <div className="mt-6 bg-gray-100 rounded-2xl h-48 flex items-center justify-center gap-3 text-gray-400">
              <MapPin size={20} />
              <span className="text-sm">神奈川県横浜市西区北幸 — JR横浜駅徒歩3分</span>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="space-y-6">
            <div className="card p-8">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-4">
                <Users size={20} />
              </div>
              <h3 className="text-xl font-black text-blue-900">私たちのミッション</h3>
              <p className="text-gray-600 mt-3 leading-relaxed">
                「ともに創り、ともに育てる」—
                テクノロジーを使って、お客様のビジネスの未来を共に描くことが私たちの使命です。
                丸投げ発注ではなく、本当のパートナーとして伴走します。
              </p>
            </div>

            <div className="card p-8">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                <BookOpen size={20} />
              </div>
              <h3 className="text-xl font-black text-blue-900">専門性・実績</h3>
              <div className="mt-3 space-y-3">
                {[
                  {
                    title: 'ComfyUIマスターガイド 出版（2025年5月）',
                    desc: '生成AI分野での深い専門知識を書籍として発信',
                  },
                  {
                    title: 'DYM MESSENGERS スポンサー（2025年7月〜）',
                    desc: 'プロダンスチームのスポンサーとして地域・文化振興にも貢献',
                  },
                  {
                    title: 'note 技術記事 継続発信',
                    desc: 'AI・システム開発に関する実践的な情報を発信中',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="w-1 h-full bg-cyan-400 rounded-full flex-shrink-0 mt-1.5 min-h-[0.5rem]" />
                    <div>
                      <p className="text-sm font-bold text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
