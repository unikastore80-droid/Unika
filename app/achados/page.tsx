import type { Metadata } from 'next'
import { getProductsByBadge } from '@/lib/data'
import { ProductCard } from '@/components/product/ProductCard'

export const metadata: Metadata = {
  title: 'Achados da Semana',
  description: 'Os melhores produtos selecionados a dedo pela equipe UNIKA STORE esta semana.',
}

export default function AchadosPage() {
  const produtos = getProductsByBadge('achado-semana')

  return (
    <div className="container-site py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-3 py-1 mb-3">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-wide">Atualizado toda segunda-feira</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">⭐ Achados da Semana</h1>
        <p className="text-gray-500">
          Nossa equipe seleciona manualmente os {produtos.length} melhores produtos da semana.
          Todos testados, comparados e aprovados.
        </p>
      </div>

      <div className="product-grid">
        {produtos.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {produtos.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">⭐</div>
          <p>Nenhum achado da semana no momento. Volte em breve!</p>
        </div>
      )}
    </div>
  )
}
