import { Countdown } from '@/components/ui/Countdown'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types'

interface Props {
  products: Product[]
  endsAt: Date
}

export function FlashSaleSection({ products, endsAt }: Props) {
  return (
    <section className="bg-gray-50 py-10">
      <div className="container-site">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="text-4xl">⚡</div>
          <div>
            <h2 className="text-white font-black text-xl leading-tight">Ofertas Relâmpago</h2>
            <p className="text-orange-100 text-sm mt-0.5">Promoções exclusivas por tempo limitado</p>
          </div>
          <div className="sm:ml-auto">
            <p className="text-orange-100 text-xs mb-1.5 font-medium">Termina em:</p>
            <Countdown endsAt={endsAt} />
          </div>
        </div>

        {/* Products */}
        <div className="product-grid">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
