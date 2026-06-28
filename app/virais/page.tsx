import type { Metadata } from 'next'
import { PRODUCTS } from '@/lib/data'
import { ProductCard } from '@/components/product/ProductCard'

export const metadata: Metadata = {
  title: 'Produtos Virais',
  description: 'Os produtos que bombaram no TikTok, Instagram e YouTube Shorts. Análise honesta: vale ou não vale a pena?',
}

const PLATFORM_META: Record<string, { icon: string; label: string; color: string }> = {
  tiktok:    { icon: '🎵', label: 'TikTok',    color: 'bg-black text-white' },
  instagram: { icon: '📸', label: 'Instagram', color: 'bg-pink-600 text-white' },
  youtube:   { icon: '▶️', label: 'YouTube',   color: 'bg-red-600 text-white' },
}

export default function ViraisPage() {
  const produtos = PRODUCTS.filter(p => p.viralPlatform && p.active)

  const byPlatform = {
    tiktok:    produtos.filter(p => p.viralPlatform === 'tiktok'),
    instagram: produtos.filter(p => p.viralPlatform === 'instagram'),
    youtube:   produtos.filter(p => p.viralPlatform === 'youtube'),
  }

  return (
    <div className="container-site py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">🔥 Produtos Virais</h1>
        <p className="text-gray-500">
          Separamos os produtos que viralizaram nas redes e dizemos se realmente valem a pena.
        </p>
      </div>

      {/* All platforms */}
      {Object.entries(byPlatform).map(([platform, prods]) => {
        if (!prods.length) return null
        const meta = PLATFORM_META[platform]
        return (
          <div key={platform} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${meta.color}`}>
                {meta.icon} {meta.label}
              </span>
              <span className="text-gray-400 text-sm">{prods.length} produtos virais</span>
            </div>
            <div className="product-grid">
              {prods.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )
      })}

      {produtos.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🔥</div>
          <p>Nenhum produto viral no momento.</p>
        </div>
      )}
    </div>
  )
}
