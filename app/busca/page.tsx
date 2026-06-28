import type { Metadata } from 'next'
import { searchProducts } from '@/lib/data'
import { ProductCard } from '@/components/product/ProductCard'

interface Props {
  searchParams: { q?: string }
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const q = searchParams.q ?? ''
  return {
    title: q ? `"${q}" — Busca` : 'Busca',
    description: `Resultados de busca para "${q}" na UNIKA STORE.`,
  }
}

export default function SearchPage({ searchParams }: Props) {
  const query = searchParams.q ?? ''
  const results = query ? searchProducts(query) : []

  return (
    <div className="container-site py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">
          {query ? `Resultados para "${query}"` : 'Busca'}
        </h1>
        {query && (
          <p className="text-gray-500 text-sm mt-1">
            {results.length} {results.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </p>
        )}
      </div>

      {!query && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-semibold">Digite algo para buscar</p>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">😕</div>
          <p className="font-black text-gray-900 text-lg mb-2">Nenhum produto encontrado</p>
          <p className="text-gray-500 text-sm">Tente outras palavras-chave ou navegue pelas categorias</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="product-grid">
          {results.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
