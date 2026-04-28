import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'ZERO-SaaSは本当に初期費用0円ですか？',
    a: 'はい。スクラッチ開発の費用を月額に分散する仕組みです。最低契約期間や解約条件などは個別にご相談の上、明確にお伝えします。',
  },
  {
    q: '小さな会社でも依頼できますか？',
    a: 'もちろんです。ZERO-SaaSは特に中小企業向けに設計されています。従業員10名以下の会社からもご依頼を受けています。',
  },
  {
    q: '開発経験・知識がなくても大丈夫ですか？',
    a: '大丈夫です。「伴走型」とはそういう意味です。システムのことが分からなくても、業務課題だけ教えていただければ、解決策は一緒に考えます。',
  },
  {
    q: '生成AIコンサルティングとは具体的に何をするのですか？',
    a: 'AI活用の現状診断→目標設定→PoC実施→社内展開のサポートまで行います。ChatGPT/Claude/ComfyUI等を業務に組み込む実装まで対応可能です。',
  },
  {
    q: '遠方でも依頼できますか？',
    a: 'はい。オンライン完結での支援が可能です。横浜・東京近郊の場合は対面でのミーティングも対応しています。',
  },
  {
    q: '相談するとすぐ営業されませんか？',
    a: 'ご安心ください。無料相談は本当に相談の場です。無理な提案・営業は行いません。まず課題を整理するところから始めます。',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-blue-900 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-bold text-gray-800 text-sm md:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180 text-blue-700' : ''
          }`}
        />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-24 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-cyan-600 uppercase tracking-widest">FAQ</span>
          <h2 className="section-heading mt-3">よくある質問</h2>
        </div>
        <div className="card p-6 md:p-10">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </div>
      </div>
    </section>
  )
}
