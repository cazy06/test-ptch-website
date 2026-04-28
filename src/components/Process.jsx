const steps = [
  {
    num: '01',
    title: '無料ヒアリング',
    desc: 'オンラインで60分。課題・現状・予算感をお伺いします。準備不要、思ったことを話すだけでOKです。',
    color: 'bg-blue-900',
  },
  {
    num: '02',
    title: '課題整理・提案',
    desc: 'ヒアリング内容をもとに最適なサービスと概算費用をご提案。2〜3営業日以内にお届けします。',
    color: 'bg-blue-700',
  },
  {
    num: '03',
    title: 'プロジェクト開始',
    desc: 'ご納得いただけましたら契約。ZERO-SaaSは最短翌週から開発開始できます。',
    color: 'bg-blue-600',
  },
  {
    num: '04',
    title: '伴走開発・支援',
    desc: '週次の進捗共有・デモを実施。方向性がズレたらすぐ修正。透明性の高いプロセスで進めます。',
    color: 'bg-cyan-600',
  },
  {
    num: '05',
    title: 'リリース・継続改善',
    desc: 'リリース後も伴走し続けます。業務変化に合わせた継続的な改善が私たちの真骨頂です。',
    color: 'bg-cyan-500',
  },
]

export default function Process() {
  return (
    <section className="py-24 bg-white" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-cyan-600 uppercase tracking-widest">
            How We Work
          </span>
          <h2 className="section-heading mt-3">相談から納品までの流れ</h2>
          <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
            何を準備すればいい？何から話せばいい？
            <br />
            そんな不安はありません。一緒に考えるところからスタートします。
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-900 to-cyan-400 transform md:-translate-x-1/2" />

          <div className="space-y-10">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Circle */}
                <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-sm transform -translate-x-1/2 z-10 shadow-lg bg-blue-900">
                  {step.num}
                </div>

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-5/12 card p-6 ${
                    idx % 2 === 0
                      ? 'md:mr-auto md:ml-0 md:pr-16'
                      : 'md:ml-auto md:mr-0 md:pl-16'
                  }`}
                >
                  <h3 className="text-lg font-black text-blue-900">{step.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a href="#contact" className="btn-primary text-lg px-10 py-4">
            まずは無料ヒアリングを申し込む
          </a>
          <p className="text-gray-400 text-sm mt-3">
            ※準備不要。60分のオンラインで結構です。
          </p>
        </div>
      </div>
    </section>
  )
}
