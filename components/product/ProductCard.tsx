'use client'
import Link from 'next/link'
import type { Product } from '@/types'
import { trackClick } from '@/lib/supabase'

interface Props {
  product: Product
  showValePena?: boolean
}

const BADGE_LABELS: Record<string, string> = {
  'achado-semana': '⭐ Escolha da Semana',
  'viral': '🔥 Viral',
  'mais-vendido': '🏆 Mais Vendido',
  'oferta-relampago': '⚡ Oferta Relâmpago',
  'recomendado': '✅ Recomendado',
  'novo': '🆕 Novo',
}

const BADGE_COLORS: Record<string, string> = {
  'achado-semana': 'bg-orange-100 text-orange-700',
  'viral': 'bg-red-100 text-red-700',
  'mais-vendido': 'bg-yellow-100 text-yellow-700',
  'oferta-relampago': 'bg-pink-100 text-pink-700',
  'recomendado': 'bg-green-100 text-green-700',
  'novo': 'bg-blue-100 text-blue-700',
}

function getDiscount(original: number, price: number) {
  return Math.round(((original - price) / original) * 100)
}

export function ProductCard({ product }: Props) {
  const { mainLink } = product
  const discount = mainLink.originalPrice ? getDiscount(mainLink.originalPrice, mainLink.price) : 0
  const primaryBadge = product.badges[0]

  async function handleBuy(e: React.MouseEvent) {
    e.preventDefault()
    await trackClick(product.id, mainLink.platform)
    window.open(mainLink.url, '_blank', 'noopener noreferrer')
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
      {/* Image */}
      <Link href={`/produto/${product.slug}`}>
        <div className="relative aspect-square bg-gray-50 flex items-center justify-center text-5xl">
          <span>{product.images[0]}</span>
          {primaryBadge && (
            <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-md ${BADGE_COLORS[primaryBadge]}`}>
              {BADGE_LABELS[primaryBadge]}
            </span>
          )}
          {discount >= 40 && !primaryBadge && (
            <span className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-md bg-yellow-400 text-yellow-900">
              -{discount}%
            </span>
          )}
          {mainLink.freeShipping && (
            <span className="absolute bottom-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
              Frete grátis
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-snug mb-1.5 line-clamp-2 hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-400 text-xs">{'★'.repeat(Math.round(product.rating))}</span>
          <span className="text-gray-400 text-xs">({product.reviewCount.toLocaleString('pt-BR')})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-2.5">
          {mainLink.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {mainLink.originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          )}
          <span className="text-base font-black text-gray-900">
            {mainLink.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          {discount > 0 && (
            <span className="text-xs font-bold text-green-600">-{discount}%</span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleBuy}
          className="w-full bg-gray-900 hover:bg-indigo-600 text-white text-sm font-bold py-2.5 rounded-lg transition-colors duration-200"
        >
          🛒 Comprar Agora
        </button>
      </div>
    </div>
  )
}

// Compact horizontal variant for lists
export function ProductRow({ product }: { product: Product }) {
  const { mainLink } = product
  const discount = mainLink.originalPrice ? getDiscount(mainLink.originalPrice, mainLink.price) : 0

  return (
    <Link href={`/produto/${product.slug}`} className="flex gap-3 items-center p-3 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
      <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
        {product.images[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{product.name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-xs text-gray-500">{product.rating} ({product.reviewCount.toLocaleString('pt-BR')})</span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-black text-gray-900">
          {mainLink.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        {discount > 0 && <p className="text-xs font-bold text-green-600">-{discount}%</p>}
      </div>
    </Link>
  )
}
