'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) router.push(`/busca?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="bg-[#0A0A0F] sticky top-0 z-50 border-b border-white/5">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <span className="text-white font-black text-lg tracking-tight">UNIKA STORE</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="flex items-center bg-white/8 border border-white/10 rounded-lg px-3 gap-2 h-9 hover:border-indigo-500/50 focus-within:border-indigo-500 transition-colors">
            <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar produtos, marcas..."
              className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none"
            />
          </div>
        </form>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-5 ml-auto">
          <Link href="/achados" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Achados</Link>
          <Link href="/virais" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Virais</Link>
          <Link href="/mais-vendidos" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Mais Vendidos</Link>
          <Link href="/blog" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Blog</Link>
        </nav>

        <Link
          href="/admin"
          className="hidden md:block ml-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          Admin
        </Link>
      </div>

      {/* Category ribbon */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
            {[
              { href: '/categoria/celulares', label: '📱 Celulares' },
              { href: '/categoria/casa', label: '🏠 Casa' },
              { href: '/categoria/beleza', label: '💄 Beleza' },
              { href: '/categoria/fitness', label: '💪 Fitness' },
              { href: '/categoria/eletronicos', label: '🎧 Eletrônicos' },
              { href: '/categoria/cozinha', label: '🍳 Cozinha' },
              { href: '/categoria/games', label: '🎮 Games' },
              { href: '/categoria/moda', label: '👗 Moda' },
              { href: '/categoria/pets', label: '🐾 Pets' },
              { href: '/ofertas', label: '⚡ Ofertas' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex-shrink-0 text-white/50 hover:text-white/90 hover:bg-white/5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
