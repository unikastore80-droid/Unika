// app/produto/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, PRODUCTS } from '@/lib/data'
import { productMeta, productJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { ValePenaSection } from '@/components/product/ValePena'
import { ProductCard } from '@/components/product/ProductCard'
import { Countdown } from '@/components/ui/Countdown'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Produto não encontrado' }
  return productMeta(product)
}

const PLATFORM_LABELS: Record<string, string> = {
  shopee: '🟠 Shopee',
  amazon: '🟡 Amazon',
  mercadolivre: '🔵 Mercado Livre',
  magalu: '🟣 Magazine Luiza',
  aliexpress: '🔴 AliExpress',
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id && p.active).slice(0, 4)
  const discount = product.mainLink.originalPrice
    ? Math.round(((product.mainLink.originalPrice - product.mainLink.price) / product.mainLink.originalPrice) * 100)
    : 0

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbJsonLd([
          { name: 'Início', url: '/' },
          { name: product.category, url: `/categoria/${product.category}` },
          { name: product.name, url: `/produto/${product.slug}` },
        ]))
      }} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <a href="/" className="hover:text-gray-600">Início</a>
          <span className="mx-2">/</span>
          <a href={`/categoria/${product.category}`} className="hover:text-gray-600 capitalize">{product.category}</a>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Left: Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center text-[120px] border border-gray-100">
              {product.images[0]}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.slice(1).map((img, i) => (
                  <div key={i} className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-2xl border border-gray-100">
                    {img}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.badges.map(b => (
                <span key={b} className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 capitalize">
                  {b.replace('-', ' ')}
                </span>
              ))}
            </div>

            <h1 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.shortDescription}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating))}</span>
              <span className="font-bold text-gray-700">{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.reviewCount.toLocaleString('pt-BR')} avaliações)</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-400 text-sm">{product.sold.toLocaleString('pt-BR')} vendidos</span>
            </div>

            {/* Flash sale countdown */}
            {product.flashSaleEndsAt && (
              <div className="bg-gradient-to-r from-orange-500 to-rose-600 rounded-xl p-3 mb-5 flex items-center gap-3">
                <span className="text-white font-bold text-sm">⚡ Oferta acaba em:</span>
                <Countdown endsAt={product.flashSaleEndsAt} compact />
              </div>
            )}

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <div className="flex items-baseline gap-3 mb-1">
                {product.mainLink.originalPrice && (
                  <span className="text-gray-400 line-through text-lg">
                    {product.mainLink.originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                )}
                <span className="text-3xl font-black text-gray-900">
                  {product.mainLink.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                {discount > 0 && (
                  <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded-lg">-{discount}%</span>
                )}
              </div>
              {product.mainLink.freeShipping && (
                <p className="text-green-600 text-sm font-semibold">✅ Frete grátis</p>
              )}
            </div>

            {/* Main CTA */}
            <a
              href={product.mainLink.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-indigo-600 text-white font-black text-lg py-4 rounded-xl transition-colors mb-3"
            >
              🛒 Comprar Agora na {PLATFORM_LABELS[product.mainLink.platform]?.split(' ')[1] ?? product.mainLink.platform}
            </a>

            {/* Compare links */}
            {product.affiliateLinks.length > 1 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Comparar em outras lojas</p>
                {product.affiliateLinks.filter(l => l.platform !== product.mainLink.platform).map(link => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center justify-between w-full border border-gray-200 hover:border-indigo-300 rounded-xl px-4 py-3 transition-colors group"
                  >
                    <span className="font-semibold text-sm">{PLATFORM_LABELS[link.platform]}</span>
                    <div className="text-right">
                      <span className="font-black text-gray-900">{link.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      {link.freeShipping && <span className="ml-2 text-xs text-green-600">✓ Grátis</span>}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-black text-lg mb-4">Descrição do produto</h2>
              <div className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none">
                {product.description}
              </div>
            </div>

            {/* Vale a Pena */}
            {product.valePena && (
              <ValePenaSection productName={product.name} valePena={product.valePena} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-sm mb-3">📦 Informações</h3>
              <div className="space-y-2 text-sm">
                {product.brand && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Marca</span>
                    <span className="font-semibold">{product.brand}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Categoria</span>
                  <span className="font-semibold capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Avaliação</span>
                  <span className="font-semibold">⭐ {product.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Vendidos</span>
                  <span className="font-semibold">{product.sold.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
              <p className="text-indigo-700 text-sm font-semibold mb-1">🔒 Compra segura</p>
              <p className="text-indigo-600 text-xs leading-relaxed">
                Você será redirecionado para a loja oficial. Não armazenamos dados de pagamento.
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-black mb-5">Produtos relacionados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
