/**
 * ジャーニーマップの改善イメージを可視化するセクション
 * AS-IS（現状）→ TOBE（理想）の変化を示す
 */

const journeySteps = [
  {
    phase: '認知',
    asIs: { label: '口コミのみ', pain: '偶然の出会い' },
    tobe: { label: 'SEO検索で発見', gain: '課題キーワードで流入' },
  },
  {
    phase: '理解',
    asIs: { label: '説明が難しい', pain: 'サービスの違いが不明' },
    tobe: { label: '課題別で選べる', gain: '自分事として理解できる' },
  },
  {
    phase: '検討',
    asIs: { label: '実績が少ない', pain: '信頼性・比較が難しい' },
    tobe: { label: '事例・数値が豊富', gain: '稟議にも使える資料あり' },
  },
  {
    phase: '接触',
    asIs: { label: 'フォームのみ', pain: '相談の敷居が高い' },
    tobe: { label: '資料DL・FAQ先行', gain: '段階的に接触できる' },
  },
  {
    phase: '相談',
    asIs: { label: '準備不明', pain: '何を話せばいいか不安' },
    tobe: { label: '事前ヒアリングあり', gain: '安心して相談できる' },
  },
]

export default function JourneyBanner() {
  return (
    <section className="py-20 bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
            UX Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3">
            「見つけてから相談まで」が
            <br />
            スムーズになるサイトへ
          </h2>
          <p className="text-white/60 mt-4 text-base">
            AS-IS（現状）からTOBE（理想）への改善イメージ
          </p>
        </div>

        {/* Journey Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
          {journeySteps.map((step, idx) => (
            <div key={step.phase} className="relative">
              {/* Phase Label */}
              <div className="text-center mb-3">
                <span className="inline-block bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full">
                  {step.phase}
                </span>
              </div>

              {/* AS-IS (top) */}
              <div className="bg-red-900/30 border border-red-700/40 rounded-xl p-4 mb-2">
                <p className="text-xs font-bold text-red-400 mb-1">現状（AS-IS）</p>
                <p className="text-white text-sm font-bold">{step.asIs.label}</p>
                <p className="text-red-300/80 text-xs mt-1">{step.asIs.pain}</p>
              </div>

              {/* Arrow */}
              <div className="text-center text-cyan-400 text-lg font-black mb-2">↓</div>

              {/* TOBE (bottom) */}
              <div className="bg-green-900/30 border border-green-600/40 rounded-xl p-4">
                <p className="text-xs font-bold text-green-400 mb-1">理想（TOBE）</p>
                <p className="text-white text-sm font-bold">{step.tobe.label}</p>
                <p className="text-green-300/80 text-xs mt-1">{step.tobe.gain}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-white/40 text-sm mt-10">
          このサイトリニューアルにより、上記すべてのフェーズでの体験改善を目指しています
        </p>
      </div>
    </section>
  )
}
