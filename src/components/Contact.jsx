import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

const serviceOptions = [
  '伴走型システム開発支援',
  '生成AIコンサルティング',
  'ZERO-SaaS',
  '紹介パートナー制度',
  'まだ決まっていない',
]

const budgetOptions = [
  '初期費用0円のZERO-SaaSを検討中',
  '〜50万円',
  '50〜200万円',
  '200万円以上',
  '未定',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="py-24 gradient-navy" id="contact">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="card p-12">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-blue-900">お問い合わせありがとうございます</h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              2〜3営業日以内にご連絡差し上げます。
              <br />
              お急ぎの場合はお電話でもお問い合わせください。
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 gradient-navy" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Left Intro */}
          <div className="md:col-span-2 text-white">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 leading-tight">
              まずは
              <br />
              無料相談から。
            </h2>
            <p className="text-white/70 mt-4 leading-relaxed">
              準備は不要です。「こんなことを改善したい」という思いだけを持って、お気軽にご相談ください。
            </p>
            <div className="mt-8 space-y-4">
              {[
                { label: '相談費用', value: '完全無料' },
                { label: '返信目安', value: '2〜3営業日以内' },
                { label: '形式', value: 'オンライン or 対面（横浜近郊）' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className="text-cyan-400 text-sm font-bold w-20 flex-shrink-0">{label}</span>
                  <span className="text-white/80 text-sm">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 bg-white/10 rounded-xl border border-white/20">
              <p className="text-white/80 text-sm leading-relaxed">
                <strong className="text-white">安心してください。</strong>
                無理な営業・強引なクロージングは一切行いません。まずは課題整理のお手伝いをします。
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="md:col-span-3">
            <div className="card p-8">
              <h3 className="text-lg font-black text-blue-900 mb-6">
                無料相談・お問い合わせフォーム
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="山田 太郎"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      会社名
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="株式会社〇〇"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="090-0000-0000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    興味のあるサービス
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700"
                  >
                    <option value="">選択してください</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    ご予算感
                  </label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700"
                  >
                    <option value="">選択してください</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    お問い合わせ内容
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="現在の課題や実現したいことを自由に記載してください。（例：Excelで管理していた受発注をシステム化したい）"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary justify-center text-base py-4"
                >
                  <Send size={18} />
                  無料相談を申し込む
                </button>

                <p className="text-xs text-gray-400 text-center">
                  送信することでプライバシーポリシーに同意したものとみなします。
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
