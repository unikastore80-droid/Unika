import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with elevated privileges (use only in server actions/API routes)
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

// ─── Products ─────────────────────────────────────────────
export async function fetchProductBySlug(slug: string) {
  const { data } = await supabase
    .from('v_products_full')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

export async function fetchProductsByBadge(
  badge: 'badge_semana' | 'badge_viral' | 'badge_mais_vendido' | 'badge_oferta' | 'badge_recomendado',
  limit = 8
) {
  const { data } = await supabase
    .from('v_products_full')
    .select('*')
    .eq(badge, true)
    .limit(limit)
  return data ?? []
}

export async function fetchFeaturedProducts(limit = 8) {
  const { data } = await supabase
    .from('v_products_full')
    .select('*')
    .eq('featured', true)
    .limit(limit)
  return data ?? []
}

export async function searchProducts(query: string, limit = 20) {
  const { data } = await supabase
    .from('v_products_full')
    .select('*')
    .or(`name.ilike.%${query}%,brand.ilike.%${query}%`)
    .limit(limit)
  return data ?? []
}

export async function fetchAffiliateLinks(productId: string) {
  const { data } = await supabase
    .from('affiliate_links')
    .select('*')
    .eq('product_id', productId)
    .order('price', { ascending: true })
  return data ?? []
}

// ─── Categories ───────────────────────────────────────────
export async function fetchCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('order_pos')
  return data ?? []
}

// ─── Blog ─────────────────────────────────────────────────
export async function fetchBlogPosts(limit = 6) {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, category, tags, published_at, cover_image')
    .eq('active', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  return data ?? []
}

export async function fetchBlogPost(slug: string) {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()
  return data
}

// ─── Newsletter ───────────────────────────────────────────
export async function subscribeNewsletter(email: string) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email }, { onConflict: 'email' })
  return { success: !error, error: error?.message }
}

// ─── Analytics ────────────────────────────────────────────
export async function trackClick(productId: string, platform: string) {
  await supabase.from('click_events').insert({
    product_id: productId,
    platform,
  })
}
