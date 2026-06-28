import type { Metadata } from 'next'
import type { Product, BlogPost } from '@/types'

const SITE_NAME = 'UNIKA STORE'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://unikaloja.com.br'
const SITE_DESCRIPTION =
  'A maior plataforma brasileira de recomendações inteligentes de produtos. Selecionamos, analisamos e recomendamos os melhores produtos da internet.'

export function defaultMeta(): Metadata {
  return {
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: SITE_URL,
      siteName: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  }
}

export function productMeta(product: Product): Metadata {
  const price = product.mainLink.price.toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL',
  })
  const discount = product.mainLink.originalPrice
    ? Math.round(((product.mainLink.originalPrice - product.mainLink.price) / product.mainLink.originalPrice) * 100)
    : 0

  const title = `${product.name} — ${discount ? `${discount}% OFF • ` : ''}${price}`
  const description =
    `${product.shortDescription} • Nota UNIKA: ${product.valePena?.nota ?? '—'}/10 • ` +
    `${product.reviewCount.toLocaleString()} avaliações ⭐${product.rating}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/produto/${product.slug}`,
    },
    other: {
      // Schema.org JSON-LD injected via component
    },
  }
}

export function blogMeta(post: BlogPost): Metadata {
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt.toISOString(),
    },
  }
}

// JSON-LD structured data
export function productJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    brand: { '@type': 'Brand', name: product.brand ?? 'Sem marca' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: product.mainLink.price,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/produto/${product.slug}`,
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    sameAs: [
      'https://instagram.com/unikastore',
      'https://tiktok.com/@unikastore',
    ],
  }
}
