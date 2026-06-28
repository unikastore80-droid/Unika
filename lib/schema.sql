-- ============================================================
-- UNIKA STORE — Schema Supabase (PostgreSQL)
-- Execute no SQL Editor do Supabase
-- ============================================================

-- CATEGORIAS
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  icon        TEXT NOT NULL,
  description TEXT,
  order_pos   INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- PRODUTOS
CREATE TABLE products (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT UNIQUE NOT NULL,
  name              TEXT NOT NULL,
  short_description TEXT,
  description       TEXT,
  images            TEXT[] DEFAULT '{}',
  video_url         TEXT,
  category_id       UUID REFERENCES categories(id),
  brand             TEXT,
  tags              TEXT[] DEFAULT '{}',
  rating            DECIMAL(3,2) DEFAULT 0,
  review_count      INT DEFAULT 0,
  sold              INT DEFAULT 0,
  -- Badges (boolean flags)
  badge_semana      BOOL DEFAULT FALSE,
  badge_viral       BOOL DEFAULT FALSE,
  badge_mais_vendido BOOL DEFAULT FALSE,
  badge_oferta      BOOL DEFAULT FALSE,
  badge_recomendado BOOL DEFAULT FALSE,
  -- Viral info
  viral_platform    TEXT,  -- 'tiktok' | 'instagram' | 'youtube'
  viral_views       TEXT,
  flash_sale_ends   TIMESTAMPTZ,
  -- Flags
  active            BOOL DEFAULT TRUE,
  featured          BOOL DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- LINKS DE AFILIADOS
CREATE TABLE affiliate_links (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     UUID REFERENCES products(id) ON DELETE CASCADE,
  platform       TEXT NOT NULL,  -- 'shopee' | 'amazon' | 'mercadolivre' | 'magalu' | 'aliexpress'
  url            TEXT NOT NULL,
  price          DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  free_shipping  BOOL DEFAULT FALSE,
  is_main        BOOL DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- VALE A PENA
CREATE TABLE vale_pena (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id       UUID UNIQUE REFERENCES products(id) ON DELETE CASCADE,
  custo_beneficio  DECIMAL(3,1),
  qualidade        DECIMAL(3,1),
  praticidade      DECIMAL(3,1),
  nota             DECIMAL(3,1),
  opiniao          TEXT,
  para_quem        TEXT,
  pros             TEXT[] DEFAULT '{}',
  atencao          TEXT[] DEFAULT '{}',
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- BLOG
CREATE TABLE blog_posts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  excerpt          TEXT,
  content          TEXT,
  cover_image      TEXT,
  category         TEXT,
  tags             TEXT[] DEFAULT '{}',
  meta_title       TEXT,
  meta_description TEXT,
  active           BOOL DEFAULT TRUE,
  featured         BOOL DEFAULT FALSE,
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- NEWSLETTER
CREATE TABLE newsletter_subscribers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  active     BOOL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BANNERS
CREATE TABLE banners (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title    TEXT NOT NULL,
  subtitle TEXT,
  cta_text TEXT,
  cta_url  TEXT,
  image    TEXT,
  bg_color TEXT,
  active   BOOL DEFAULT TRUE,
  order_pos INT DEFAULT 0
);

-- ADMIN USERS (usa Supabase Auth — apenas referência)
CREATE TABLE admin_users (
  id         UUID PRIMARY KEY REFERENCES auth.users(id),
  name       TEXT,
  role       TEXT DEFAULT 'editor',  -- 'admin' | 'editor'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CLICK TRACKING
CREATE TABLE click_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID REFERENCES products(id),
  platform    TEXT,
  ip_hash     TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE vale_pena ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

-- Leitura pública para produtos ativos
CREATE POLICY "Public read active products" ON products
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (TRUE);

CREATE POLICY "Public read active posts" ON blog_posts
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Public read banners" ON banners
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Public read affiliate links" ON affiliate_links
  FOR SELECT USING (TRUE);

CREATE POLICY "Public read vale pena" ON vale_pena
  FOR SELECT USING (TRUE);

-- Inserção pública para newsletter
CREATE POLICY "Public insert newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (TRUE);

-- Inserção pública para click tracking
CREATE POLICY "Public insert clicks" ON click_events
  FOR INSERT WITH CHECK (TRUE);

-- Admin: acesso total via service role (usar SUPABASE_SERVICE_ROLE_KEY no backend)

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_badges ON products(badge_semana, badge_viral, badge_mais_vendido, badge_oferta);
CREATE INDEX idx_affiliate_links_product ON affiliate_links(product_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_click_events_product ON click_events(product_id, created_at);

-- ============================================================
-- VIEWS ÚTEIS
-- ============================================================

-- Produto completo com link principal
CREATE OR REPLACE VIEW v_products_full AS
SELECT
  p.*,
  c.name AS category_name,
  c.icon AS category_icon,
  al.platform AS main_platform,
  al.url AS main_url,
  al.price AS main_price,
  al.original_price,
  al.free_shipping AS main_free_shipping,
  vp.nota AS vale_nota,
  vp.opiniao AS vale_opiniao
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN affiliate_links al ON al.product_id = p.id AND al.is_main = TRUE
LEFT JOIN vale_pena vp ON vp.product_id = p.id
WHERE p.active = TRUE;

-- Top cliques por produto (últimos 30 dias)
CREATE OR REPLACE VIEW v_top_clicked AS
SELECT
  p.id, p.name, p.slug,
  COUNT(ce.id) AS clicks_30d
FROM click_events ce
JOIN products p ON p.id = ce.product_id
WHERE ce.created_at > NOW() - INTERVAL '30 days'
GROUP BY p.id, p.name, p.slug
ORDER BY clicks_30d DESC;
