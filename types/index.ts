export type Platform = 'shopee' | 'amazon' | 'mercadolivre' | 'magalu' | 'aliexpress'

export type ProductBadge =
  | 'achado-semana'
  | 'viral'
  | 'mais-vendido'
  | 'oferta-relampago'
  | 'recomendado'
  | 'novo'

export interface ValePena {
  custoBeneficio: number   // 0-10
  qualidade: number
  praticidade: number
  nota: number
  opiniao: string
  paraQuem: string
  pros: string[]
  atencao: string[]
}

export interface AffiliateLink {
  platform: Platform
  url: string
  price: number
  originalPrice?: number
  freeShipping?: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  images: string[]         // URLs or emoji for demo
  videoUrl?: string
  category: string
  subcategory?: string
  brand?: string
  tags: string[]
  badges: ProductBadge[]
  affiliateLinks: AffiliateLink[]
  mainLink: AffiliateLink
  rating: number           // 0-5
  reviewCount: number
  sold: number
  valePena?: ValePena
  viralPlatform?: 'tiktok' | 'instagram' | 'youtube'
  viralViews?: string
  flashSaleEndsAt?: Date
  createdAt: Date
  updatedAt: Date
  active: boolean
  featured: boolean
}

export interface Category {
  id: string
  slug: string
  name: string
  icon: string
  description?: string
  productCount: number
  order: number
}

export interface Banner {
  id: string
  title: string
  subtitle: string
  ctaText: string
  ctaUrl: string
  image?: string
  bgColor: string
  active: boolean
  order: number
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage?: string
  category: string
  tags: string[]
  metaTitle: string
  metaDescription: string
  publishedAt: Date
  updatedAt: Date
  active: boolean
  featured: boolean
}

export interface NewsletterSubscriber {
  id: string
  email: string
  createdAt: Date
  active: boolean
}

// Admin / UI helpers
export interface FilterState {
  category?: string
  badge?: ProductBadge
  platform?: Platform
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'sold' | 'newest'
  query?: string
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}
