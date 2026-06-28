import Link from 'next/link'
import type { Product } from '@/types'
import { Section } from './Section'

interface Props {
  products: Product[]
}

const PLATFORM_META: Record<string, { label: string; color: string }> = {
  tiktok: { label: 'TikTok', color: 'bg-black text-white' },
  instagram: { label: 'Instagram', color: 'bg-pink-600 text-white' },
  youtube: { label: 'YouTube', color: 'bg-red-600 text-white' },
}

export function ViralSection({ products }: Props) {
  return (
    <Section
      title="🔥 Produtos Virais"
      subtitle="Bombando no TikTok, Instagram e YouTube Shorts"
      seeAllHref="/virais"
      bg="white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map(product => {
          const platform = product.viralPlatform
            ? PLATFORM_META[product.viralPlatform]
            : null
          const discount = product.mainLink.originalPrice
            ? Math.round(((product.mainLink.originalPrice - product.mainLink.price) / product.mainLink.originalPrice) * 100)
            : 0

          return (
            <Link
              key={product.id}
              href={`/produto/${product.slug}`}
              className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              {/* Visual top */}
              <div className="bg-ink aspect-video flex items-center justify-center text-6xl relative overflow-hidden">
                <span className="relative z-10">{product.images[0]}</span>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: 'radial-gradient(circle at center, rgba(108,99,255,0.5) 0%, transparent 70%)' }}
                />
                {platform && (
                  <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${platform.color}`}>
                    {platform.label}
                  </span>
                )}
                {product.viralViews && (
                  <span className="absolute bottom-3 left-3 text-xs text-white/70 font-medium">
                    👁 {product.viralViews} views
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-gray-900">
                      {product.mainLink.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    {discount > 0 && (
                      <span className="ml-2 text-xs font-bold text-green-600">-{discount}%</span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 group-hover:underline">
                    Ver produto →
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}
