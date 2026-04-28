import { ArrowRight, Handshake, TrendingUp, Shield } from 'lucide-react'

const benefits = [
  {
    icon: <Handshake size={24} />,
    title: '顧客への付加価値向上',
    desc: '自社で対応できなかったシステム開発・AI導入のニーズを、ポノテクが代わりにサポート。顧客満足度を高められます。',
  },
  {
    icon: <TrendingUp size={24} />,
    title: '紹介報酬の獲得',
    desc: 'ご紹介いただいた案件が成約した場合、成果報酬をお支払いします。詳細は個別にご相談ください。',
  },
  {
    icon: <Shield size={24} />,
    title: '信頼できる技術パートナー',
    desc: '伴走型でクライアントのことを第一に考えるポノテクが、あなたのパートナーとして案件を責任を持って対応します。',
  },
]

export default function Partner() {
  return (
    <section className="py-24 bg-gray-50" id="partner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-sm font-bold text-cyan-600 uppercase tracking-widest">
              Partner Program
            </span>
            <h2 className="section-heading mt-3">
              紹介パートナー制度
            </h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              IT系コンサルタント・会計事務所・経営支援機関など、
              顧客からシステム開発やAI導入の相談を受けるパートナー様を募集しています。
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              「自社では対応できないけど、顧客には最高の解決策を届けたい」—
              そんなニーズに応える制度です。
            </p>

            <div className="mt-8 space-y-5">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">{b.title}</h4>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                パートナー登録を申し込む
                <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn-outline">
                制度詳細を聞く
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="gradient-navy rounded-3xl p-8 md:p-10 text-white">
              <h3 className="text-xl font-black mb-6">こんな方が対象です</h3>
              <ul className="space-y-4">
                {[
                  'IT・経営コンサルタント',
                  '会計事務所・税理士事務所',
                  '中小企業診断士',
                  '地域の経営支援機関',
                  'WEB制作会社（開発が苦手）',
                  'その他ビジネスパートナー',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-cyan-400/20 border border-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                    </span>
                    <span className="text-white/90 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-5 bg-white/10 rounded-xl border border-white/20">
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong className="text-cyan-400">初回相談は無料。</strong>
                  まずは制度の説明をオンラインでお聞きいただけます。
                  お気軽にお問い合わせください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
