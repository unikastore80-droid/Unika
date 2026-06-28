import type { Product, Category, Banner, BlogPost } from '@/types'

export const CATEGORIES: Category[] = [
  { id: '1', slug: 'celulares', name: 'Celulares', icon: '📱', productCount: 1240, order: 1 },
  { id: '2', slug: 'casa', name: 'Casa', icon: '🏠', productCount: 3480, order: 2 },
  { id: '3', slug: 'beleza', name: 'Beleza', icon: '💄', productCount: 2150, order: 3 },
  { id: '4', slug: 'fitness', name: 'Fitness', icon: '💪', productCount: 890, order: 4 },
  { id: '5', slug: 'games', name: 'Games', icon: '🎮', productCount: 640, order: 5 },
  { id: '6', slug: 'moda', name: 'Moda', icon: '👗', productCount: 4200, order: 6 },
  { id: '7', slug: 'pets', name: 'Pets', icon: '🐾', productCount: 320, order: 7 },
  { id: '8', slug: 'livros', name: 'Livros', icon: '📚', productCount: 1800, order: 8 },
  { id: '9', slug: 'eletronicos', name: 'Eletrônicos', icon: '🎧', productCount: 2800, order: 9 },
  { id: '10', slug: 'cozinha', name: 'Cozinha', icon: '🍳', productCount: 1560, order: 10 },
]

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'fone-bluetooth-pro-max',
    name: 'Fone Bluetooth Pro Max',
    shortDescription: 'Cancelamento de ruído ativo, 40h de bateria, conexão multi-device',
    description: `
O Fone Bluetooth Pro Max é a escolha perfeita para quem busca qualidade de som excepcional sem gastar fortunas.
Com drivers de 40mm e cancelamento de ruído ativo (ANC), ele bloqueia até 95% dos ruídos externos.

**Por que escolhemos esse produto:**
Testamos mais de 30 fones na faixa de R$100–R$300 e esse foi o que melhor equilibrou qualidade de áudio, conforto e durabilidade.
`,
    images: ['🎧'],
    category: 'eletronicos',
    brand: 'SoundPro',
    tags: ['fone', 'bluetooth', 'cancelamento de ruido', 'home office'],
    badges: ['achado-semana', 'recomendado'],
    affiliateLinks: [
      { platform: 'shopee', url: 'https://shopee.com.br/produto', price: 147, originalPrice: 299, freeShipping: true },
      { platform: 'amazon', url: 'https://amazon.com.br/produto', price: 159, originalPrice: 299 },
      { platform: 'mercadolivre', url: 'https://mercadolivre.com.br/produto', price: 152, originalPrice: 299, freeShipping: true },
    ],
    mainLink: { platform: 'shopee', url: 'https://shopee.com.br/produto', price: 147, originalPrice: 299, freeShipping: true },
    rating: 4.9,
    reviewCount: 2341,
    sold: 8900,
    valePena: {
      custoBeneficio: 9.5,
      qualidade: 9.0,
      praticidade: 9.2,
      nota: 9.2,
      opiniao: 'Recomendamos com confiança. Ótima qualidade de som, cancelamento de ruído eficiente e bateria que dura o dia inteiro. Ideal para quem trabalha em home office ou quer uma experiência premium sem pagar caro.',
      paraQuem: 'Trabalhadores em home office, estudantes e quem usa transporte público.',
      pros: ['Cancelamento de ruído eficiente', 'Bateria 40h de duração', 'Conecta 2 dispositivos', 'Dobrável — cabe na bolsa', 'Microfone HD para chamadas'],
      atencao: ['Caixa de plástico simples', 'App apenas em inglês', 'Sem codecs aptX ou LDAC'],
    },
    createdAt: new Date('2026-06-01'),
    updatedAt: new Date('2026-06-20'),
    active: true,
    featured: true,
  },
  {
    id: '2',
    slug: 'airfryer-digital-5l',
    name: 'Airfryer Digital 5L XXL',
    shortDescription: 'Fritadeira sem óleo, display digital, 12 funções, 5 litros de capacidade',
    description: 'A Airfryer Digital 5L XXL revoluciona sua cozinha com tecnologia de ar quente circulante...',
    images: ['🌬️'],
    category: 'cozinha',
    brand: 'ChefMax',
    tags: ['airfryer', 'fritadeira', 'sem oleo', 'cozinha saudavel'],
    badges: ['mais-vendido'],
    affiliateLinks: [
      { platform: 'shopee', url: '#', price: 219, originalPrice: 459, freeShipping: true },
      { platform: 'mercadolivre', url: '#', price: 228, originalPrice: 459, freeShipping: true },
    ],
    mainLink: { platform: 'shopee', url: '#', price: 219, originalPrice: 459, freeShipping: true },
    rating: 4.8,
    reviewCount: 4892,
    sold: 22000,
    valePena: {
      custoBeneficio: 9.8,
      qualidade: 9.1,
      praticidade: 9.5,
      nota: 9.4,
      opiniao: 'O melhor custo-benefício em airfryers que já analisamos. Capacidade generosa, fácil de limpar e resultados incríveis.',
      paraQuem: 'Famílias e quem quer praticidade na cozinha.',
      pros: ['12 funções pré-programadas', 'Capacidade para 4 pessoas', 'Fácil de limpar', 'Economia de energia vs. forno'],
      atencao: ['Ruído moderado durante operação', 'Tampa plástica na alça'],
    },
    createdAt: new Date('2026-05-15'),
    updatedAt: new Date('2026-06-18'),
    active: true,
    featured: true,
  },
  {
    id: '3',
    slug: 'massageador-eletrico-4d',
    name: 'Massageador Elétrico 4D',
    shortDescription: 'Massageador cervical com calor, 4 cabeças rotativas, recarregável',
    description: 'Alívio profissional para tensões musculares no conforto da sua casa...',
    images: ['🌀'],
    category: 'fitness',
    brand: 'RelaxPro',
    tags: ['massageador', 'cervical', 'tensao', 'relaxamento'],
    badges: ['viral'],
    affiliateLinks: [
      { platform: 'shopee', url: '#', price: 89, originalPrice: 180, freeShipping: true },
    ],
    mainLink: { platform: 'shopee', url: '#', price: 89, originalPrice: 180, freeShipping: true },
    rating: 4.7,
    reviewCount: 6100,
    sold: 31000,
    viralPlatform: 'tiktok',
    viralViews: '4,2M',
    createdAt: new Date('2026-06-10'),
    updatedAt: new Date('2026-06-25'),
    active: true,
    featured: false,
  },
  {
    id: '4',
    slug: 'smartwatch-serie-x-ultra',
    name: 'Smartwatch Série X Ultra',
    shortDescription: 'Monitor cardíaco, GPS, 7 dias de bateria, resistente à água IP68',
    description: 'O Smartwatch Série X Ultra combina design elegante com funcionalidades avançadas...',
    images: ['⌚'],
    category: 'eletronicos',
    brand: 'TechWear',
    tags: ['smartwatch', 'relogio', 'fitness', 'monitor cardiaco'],
    badges: ['achado-semana'],
    affiliateLinks: [
      { platform: 'amazon', url: '#', price: 189, originalPrice: 380 },
      { platform: 'shopee', url: '#', price: 179, originalPrice: 380, freeShipping: true },
    ],
    mainLink: { platform: 'shopee', url: '#', price: 179, originalPrice: 380, freeShipping: true },
    rating: 4.6,
    reviewCount: 1178,
    sold: 4300,
    createdAt: new Date('2026-06-05'),
    updatedAt: new Date('2026-06-22'),
    active: true,
    featured: true,
  },
  {
    id: '5',
    slug: 'secador-cabelo-ion',
    name: 'Secador de Cabelo Íon',
    shortDescription: 'Tecnologia iônica, 2200W, difusor e concentrador inclusos',
    description: 'Seque e modele seus cabelos com muito mais brilho e sem frizz...',
    images: ['🪮'],
    category: 'beleza',
    brand: 'BeautyPro',
    tags: ['secador', 'cabelo', 'ionico', 'beleza'],
    badges: ['viral'],
    affiliateLinks: [
      { platform: 'shopee', url: '#', price: 124, originalPrice: 249, freeShipping: true },
    ],
    mainLink: { platform: 'shopee', url: '#', price: 124, originalPrice: 249, freeShipping: true },
    rating: 4.8,
    reviewCount: 3450,
    sold: 18000,
    viralPlatform: 'instagram',
    viralViews: '2,8M',
    createdAt: new Date('2026-06-08'),
    updatedAt: new Date('2026-06-24'),
    active: true,
    featured: false,
  },
  {
    id: '6',
    slug: 'panela-eletrica-6em1',
    name: 'Panela Elétrica 6 em 1',
    shortDescription: 'Pressão, lenta, vapor, arroz, sopa e refogado — tudo em uma panela',
    description: 'A Panela Elétrica 6 em 1 é a solução definitiva para quem quer praticidade...',
    images: ['🍳'],
    category: 'cozinha',
    brand: 'ChefMax',
    tags: ['panela', 'eletrica', 'pressao', 'multifuncional'],
    badges: ['mais-vendido'],
    affiliateLinks: [
      { platform: 'amazon', url: '#', price: 168, originalPrice: 320 },
      { platform: 'shopee', url: '#', price: 159, originalPrice: 320, freeShipping: true },
    ],
    mainLink: { platform: 'shopee', url: '#', price: 159, originalPrice: 320, freeShipping: true },
    rating: 4.9,
    reviewCount: 8211,
    sold: 45000,
    valePena: {
      custoBeneficio: 9.7,
      qualidade: 9.3,
      praticidade: 9.6,
      nota: 9.5,
      opiniao: 'A panela elétrica mais vendida pelo segundo mês consecutivo. Substitui vários eletrodomésticos e ainda economiza energia.',
      paraQuem: 'Famílias que querem praticidade e economia.',
      pros: ['6 modos de cozimento', 'Antiaderente de alta qualidade', 'Timer programável', 'Fácil de lavar'],
      atencao: ['Tamanho grande — ocupa espaço', 'Manual apenas em português'],
    },
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-06-25'),
    active: true,
    featured: true,
  },
]

export const BANNERS: Banner[] = [
  {
    id: '1',
    title: 'Semana do Consumidor',
    subtitle: 'Até 70% OFF nos produtos mais vendidos',
    ctaText: 'Ver Ofertas',
    ctaUrl: '/mais-vendidos',
    bgColor: 'from-purple-600 to-indigo-700',
    active: true,
    order: 1,
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'melhores-fones-bluetooth-2026',
    title: '10 Melhores Fones Bluetooth de 2026: Análise Completa',
    excerpt: 'Testamos os 10 fones bluetooth mais buscados do mercado e revelamos qual realmente vale cada centavo.',
    content: '',
    category: 'Eletrônicos',
    tags: ['fone', 'bluetooth', 'review'],
    metaTitle: '10 Melhores Fones Bluetooth 2026 | UNIKA STORE',
    metaDescription: 'Análise completa dos 10 melhores fones bluetooth de 2026. Preços, qualidade e custo-benefício.',
    publishedAt: new Date('2026-06-15'),
    updatedAt: new Date('2026-06-15'),
    active: true,
    featured: true,
  },
  {
    id: '2',
    slug: 'produtos-virais-tiktok-junho-2026',
    title: 'Os 7 Produtos que Viralizaram no TikTok em Junho',
    excerpt: 'Separamos os produtos que bombaram na semana e vale mesmo a pena comprar.',
    content: '',
    category: 'Tendências',
    tags: ['viral', 'tiktok', 'tendencias'],
    metaTitle: 'Produtos Virais TikTok Junho 2026 | UNIKA STORE',
    metaDescription: 'Veja os produtos que viralizaram no TikTok em junho de 2026 e saiba se realmente valem a pena.',
    publishedAt: new Date('2026-06-20'),
    updatedAt: new Date('2026-06-20'),
    active: true,
    featured: true,
  },
]

// Helpers
export function getProductsByBadge(badge: string) {
  return PRODUCTS.filter(p => p.badges.includes(badge as any) && p.active)
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find(p => p.slug === slug && p.active)
}

export function searchProducts(query: string) {
  const q = query.toLowerCase()
  return PRODUCTS.filter(p =>
    p.active && (
      p.name.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q)
    )
  )
}

export function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function getDiscount(original: number, current: number) {
  return Math.round(((original - current) / original) * 100)
}
