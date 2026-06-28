// app/sitemap.ts — Next.js 13+ automatic sitemap
import type { MetadataRoute } from 'next'
import { PRODUCTS, CATEGORIES, BLOG_POSTS } from '@/lib/data'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://unikaloja.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/achados`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/virais`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/mais-vendidos`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/ofertas`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/sobre`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacidade`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/termos`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/afiliados`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]

  const productPages: MetadataRoute.Sitemap = PRODUCTS.filter(p => p.active).map(p => ({
    url: `${BASE_URL}/produto/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(c => ({
    url: `${BASE_URL}/categoria/${c.slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.75,
  }))

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.filter(p => p.active).map(p => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...productPages, ...categoryPages, ...blogPages]
}
