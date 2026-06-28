import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import { ProductCard } from '@/components/product/ProductCard'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return CATEGORIES.map(c => ({ slug: c.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = CATEGORIES.find(c => c.slug === params.slug)
  if (!cat) return { title: 'Categoria não encontrada' }
  return {
    title: `${cat.name} — ${cat.productCount.toLocaleString('pt-BR')} produtos`,
    description: `Descubra os melhores produtos de ${cat.name} selecionados pela UNIKA STORE. Custo-benefício, qualidade e recomendações honestas.`,
  }
}

export default function CategoryPage({ params }: Props) {
  const cat = CATEGORIES.find(c => c.slug === params.slug)
  if (!cat) notFound()

  const produtos = PRODUCTS.filter(p => p.category === params.slug && p.active)

  return (
    <div className="container-site py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl">
          {cat.icon}
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">{cat.name}</h1>
          <p className="text-gray-500 text-sm">
            {produtos.length} produtos selecionados pela UNIKA STORE
          </p>
        </div>
      </div>

      {produtos.length > 0 ? (
        <div className="product-grid">
          {produtos.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">{cat.icon}</div>
          <p className="font-semibold">Nenhum produto nesta categoria ainda.</p>
          <p className="text-sm mt-1">Volte em breve!</p>
        </div>
      )}
    </div>
  )
}
