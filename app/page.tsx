import { Hero } from '@/components/sections/Hero'
import { Section } from '@/components/sections/Section'
import { FlashSaleSection } from '@/components/sections/FlashSale'
import { CategoriesSection } from '@/components/sections/Categories'
import { ViralSection } from '@/components/sections/Viral'
import { ValePenaPreview } from '@/components/sections/ValePenaPreview'
import { BlogPreview } from '@/components/sections/BlogPreview'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { ProductCard } from '@/components/product/ProductCard'
import {
  PRODUCTS,
  CATEGORIES,
  BLOG_POSTS,
  getProductsByBadge,
} from '@/lib/data'
import { organizationJsonLd } from '@/lib/seo'

// Pick featured product with Vale a Pena for the preview section
const featuredValeApena = PRODUCTS.find(p => p.valePena && p.active) ?? PRODUCTS[0]

// Flash sale ends in 4h37m from a fixed reference — in production this comes from DB
function getFlashSaleEnd() {
  const d = new Date()
  d.setHours(d.getHours() + 4, d.getMinutes() + 37, d.getSeconds() + 22)
  return d
}

export default function HomePage() {
  const achadosSemana  = getProductsByBadge('achado-semana')
  const virais         = PRODUCTS.filter(p => p.viralPlatform && p.active).slice(0, 3)
  const maisVendidos   = getProductsByBadge('mais-vendido')
  const ofertasFlash   = getProductsByBadge('oferta-relampago').length
    ? getProductsByBadge('oferta-relampago')
    : PRODUCTS.slice(0, 4)   // fallback when no flash-sale badge set

  return (
    <>
      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <Hero />

      {/* ── Flash Sale ───────────────────────────────────────── */}
      <FlashSaleSection products={ofertasFlash} endsAt={getFlashSaleEnd()} />

      {/* ── Achados da Semana ────────────────────────────────── */}
      <Section
        title="⭐ Achados da Semana"
        subtitle="Selecionados a dedo pela equipe UNIKA"
        seeAllHref="/achados"
        bg="white"
      >
        <div className="product-grid">
          {achadosSemana.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* ── Categories ───────────────────────────────────────── */}
      <CategoriesSection categories={CATEGORIES} />

      {/* ── Vale a Pena preview ──────────────────────────────── */}
      <ValePenaPreview product={featuredValeApena} />

      {/* ── Virais ───────────────────────────────────────────── */}
      <ViralSection products={virais} />

      {/* ── Mais Vendidos ────────────────────────────────────── */}
      <Section
        title="🏆 Mais Vendidos"
        subtitle="Os favoritos dos nossos leitores este mês"
        seeAllHref="/mais-vendidos"
        bg="white"
      >
        <div className="product-grid">
          {maisVendidos.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* ── Blog preview ─────────────────────────────────────── */}
      <BlogPreview posts={BLOG_POSTS.filter(p => p.active)} />

      {/* ── Trust bar ────────────────────────────────────────── */}
      <section className="bg-white py-8 border-y border-gray-100">
        <div className="container-site">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '🔒', title: 'Compra segura', text: 'Direcionamos apenas para lojas oficiais' },
              { icon: '✅', title: 'Testamos tudo', text: 'Cada produto passa pela nossa análise' },
              { icon: '💰', title: 'Melhor preço', text: 'Comparamos em 5 plataformas por você' },
              { icon: '📦', title: 'Sem taxas extras', text: 'Links de afiliado sem custo para você' },
            ].map(item => (
              <div key={item.title} className="text-center p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-black text-gray-900 mb-1">{item.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────── */}
      <NewsletterSection />
    </>
  )
}
