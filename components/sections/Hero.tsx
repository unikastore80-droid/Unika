'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const QUICK_SEARCHES = [
  '🎧 Fones bluetooth',
  '🌬️ Airfryer',
  '⌚ Smartwatch',
  '💡 LED Smart',
  '💪 Fitness',
  '🧴 Skincare',
]

export function Hero() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) router.push(`/busca?q=${encodeURIComponent(q)}`)
  }

  return (
    <section className="bg-ink relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(108,99,255,0.18) 0%, transparent 70%)' }}
      />

      <div className="container-site relative z-10 py-16 sm:py-24 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse-slow" />
          <span className="text-xs font-semibold text-indigo-300 tracking-wide uppercase">
            Plataforma inteligente de recomendações
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
          Descubra os melhores<br />
          <span className="gradient-text">produtos da internet</span>
        </h1>

        <p className="text-white/50 text-base sm:text-lg max-w-md mx-auto mb-8 leading-relaxed">
          Selecionamos, testamos e recomendamos. Você economiza tempo, dinheiro e compra melhor.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-6">
          <div
            className="flex bg-white rounded-xl overflow-hidden"
            style={{ boxShadow: '0 0 0 1px rgba(108,99,255,0.3), 0 8px 32px rgba(0,0,0,0.3)' }}
          >
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar produtos, marcas, categorias..."
              className="flex-1 px-5 py-4 text-gray-900 text-sm outline-none placeholder-gray-400 bg-transparent"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 text-sm transition-colors flex-shrink-0"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Quick search tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_SEARCHES.map(tag => (
            <button
              key={tag}
              onClick={() => {
                const text = tag.replace(/^\S+\s/, '')
                router.push(`/busca?q=${encodeURIComponent(text)}`)
              }}
              className="bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-400/40 text-white/50 hover:text-indigo-300 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-indigo-600 border-t border-indigo-500/50">
        <div className="container-site py-3">
          <div className="flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-0">
            {[
              { num: '+12.000', lbl: 'Produtos selecionados' },
              { num: '4.9 ★', lbl: 'Avaliação média' },
              { num: '98%', lbl: 'Clientes satisfeitos' },
              { num: '5 plataformas', lbl: 'Monitoradas' },
            ].map(s => (
              <div key={s.lbl} className="text-center sm:text-left">
                <div className="text-white font-black text-sm sm:text-base">{s.num}</div>
                <div className="text-indigo-200 text-xs">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
