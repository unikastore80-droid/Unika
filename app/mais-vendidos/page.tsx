import type { Metadata } from 'next'
import { PRODUCTS } from '@/lib/data'
import { ProductCard } from '@/components/product/ProductCard'

export const metadata: Metadata = {
  title: 'Mais Vendidos',
  description: 'Os produtos mais vendidos da UNIKA STORE. Ranking atualizado com base nos cliques e vendas dos últimos 30 dias.',
}

export default function MaisVendidosPage() {
  const produtos = PRODUCTS
    .filter(p => p.active)
    .sort((a, b) => b.sold - a.sold)

  return (
    <div className="container-site py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">🏆 Mais Vendidos</h1>
        <p className="text-gray-500">
          Ranking baseado em vendas e cliques dos últimos 30 dias. Atualizado diariamente.
        </p>
      </div>

      {/* Podium — top 3 */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {produtos.slice(0, 3).map((p, i) => (
          <div key={p.id} className={`relative rounded-2xl border overflow-hidden ${i === 0 ? 'border-yellow-300 bg-yellow-50' : 'border-gray-100 bg-white'}`}>
            <div className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-yellow-400 text-yellow-900' : i === 1 ? 'bg-gray-300 text-gray-700' : 'bg-orange-300 text-orange-900'}`}>
              #{i + 1}
            </div>
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Rest of ranking */}
      {produtos.length > 3 && (
        <>
          <h2 className="text-lg font-black text-gray-700 mb-4">Outros produtos populares</h2>
          <div className="product-grid">
            {produtos.slice(3).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </div>
  )
}
