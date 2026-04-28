import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const navItems = [
  {
    label: 'サービス',
    children: [
      { label: '伴走型システム開発支援', href: '#codev' },
      { label: '生成AIコンサルティング', href: '#ai' },
      { label: 'ZERO-SaaS', href: '#zerosaaS' },
    ],
  },
  { label: '導入事例', href: '#cases' },
  { label: '会社概要', href: '#about' },
  { label: 'パートナー制度', href: '#partner' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-navy flex items-center justify-center">
              <span className="text-white font-black text-base">P</span>
            </div>
            <span className={`font-black text-xl tracking-tight transition-colors ${scrolled ? 'text-blue-900' : 'text-white'}`}>
              PonoTech
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    className={`flex items-center gap-1 font-medium text-sm transition-colors hover:text-cyan-400 ${
                      scrolled ? 'text-gray-700' : 'text-white/90'
                    }`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {item.label}
                    <ChevronDown size={14} />
                  </button>
                  {dropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl py-2 min-w-[220px] border border-gray-100"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 font-medium transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-medium text-sm transition-colors hover:text-cyan-400 ${
                    scrolled ? 'text-gray-700' : 'text-white/90'
                  }`}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className={`text-sm font-bold px-4 py-2 rounded-full border-2 transition-all ${
                scrolled
                  ? 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-blue-900'
              }`}
            >
              資料DL
            </a>
            <a href="#contact" className="btn-primary text-sm px-5 py-2.5">
              無料相談
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pt-3 pb-1">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <div className="pt-4 pb-2 flex flex-col gap-3">
              <a href="#contact" className="btn-outline text-center justify-center">
                資料ダウンロード
              </a>
              <a href="#contact" className="btn-primary text-center justify-center">
                無料相談する
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
