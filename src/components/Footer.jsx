const links = [
  {
    heading: 'サービス',
    items: [
      { label: '伴走型システム開発支援', href: '#codev' },
      { label: '生成AIコンサルティング', href: '#ai' },
      { label: 'ZERO-SaaS', href: '#zerosaaS' },
    ],
  },
  {
    heading: '会社',
    items: [
      { label: '会社概要', href: '#about' },
      { label: '導入事例', href: '#cases' },
      { label: 'パートナー制度', href: '#partner' },
    ],
  },
  {
    heading: 'お役立ち',
    items: [
      { label: 'よくある質問', href: '#faq' },
      { label: 'note（技術記事）', href: 'https://note.com', target: '_blank' },
      { label: 'お問い合わせ', href: '#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-navy flex items-center justify-center">
                <span className="text-white font-black text-base">P</span>
              </div>
              <span className="font-black text-xl text-white tracking-tight">PonoTech</span>
            </div>
            <p className="text-sm leading-relaxed">
              ともに創り、ともに育てる。
              <br />
              テクノロジーで未来を描く、戦略的パートナーシップ。
            </p>
            <div className="mt-4 text-xs text-white/40 space-y-1">
              <p>ポノテク株式会社</p>
              <p>〒220-0004 神奈川県横浜市西区北幸２丁目１０番地２８ むつみビル３F</p>
              <p>代表取締役：早野 康寛</p>
            </div>
          </div>

          {/* Nav Links */}
          {links.map((group) => (
            <div key={group.heading}>
              <h4 className="text-white font-bold text-sm mb-4">{group.heading}</h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.target ? 'noopener noreferrer' : undefined}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} PonoTech Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-white transition-colors">
              特定商取引法に基づく表示
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
