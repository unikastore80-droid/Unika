# UNIKA STORE — Plataforma Premium de Recomendações

> A maior plataforma brasileira de recomendações inteligentes de produtos.

---

## Stack tecnológico

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS |
| Banco de dados | Supabase (PostgreSQL) |
| ORM | Supabase SDK (direto) |
| Deploy | Vercel |
| CDN | Cloudflare (opcional) |
| Email | Resend |

---

## Estrutura do projeto

```
unika-store/
├── app/
│   ├── page.tsx               # Home page
│   ├── layout.tsx             # Root layout (Navbar + Footer)
│   ├── sitemap.ts             # Geração automática do sitemap
│   ├── robots.ts              # robots.txt automático
│   ├── produto/
│   │   └── [slug]/page.tsx    # Página do produto
│   ├── categoria/
│   │   └── [slug]/page.tsx    # Página de categoria
│   ├── busca/page.tsx         # Resultados de busca
│   ├── achados/page.tsx       # Achados da Semana
│   ├── virais/page.tsx        # Produtos Virais
│   ├── mais-vendidos/page.tsx # Mais Vendidos
│   ├── ofertas/page.tsx       # Ofertas Relâmpago
│   ├── blog/
│   │   ├── page.tsx           # Listagem do blog
│   │   └── [slug]/page.tsx    # Post individual
│   └── admin/
│       └── page.tsx           # Painel administrativo
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   └── ValePena.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── AchadosSemana.tsx
│   │   ├── ProdutosVirais.tsx
│   │   └── Newsletter.tsx
│   └── ui/
│       └── Countdown.tsx
├── lib/
│   ├── data.ts                # Dados demo / seed
│   ├── supabase.ts            # Cliente Supabase + queries
│   ├── seo.ts                 # Helpers de SEO e JSON-LD
│   └── schema.sql             # Schema completo do banco
├── types/
│   └── index.ts               # Tipos TypeScript
├── .env.example               # Exemplo de variáveis
└── package.json
```

---

## Início rápido

### 1. Clonar e instalar

```bash
git clone https://github.com/seu-usuario/unika-store.git
cd unika-store
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase
```

### 3. Configurar banco de dados

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. Vá em **SQL Editor**
3. Cole e execute o conteúdo de `lib/schema.sql`

### 4. Rodar localmente

```bash
npm run dev
# Acesse http://localhost:3000
```

---

## Deploy na Vercel

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel --prod

# Configure as variáveis de ambiente no painel da Vercel:
# Settings > Environment Variables
# (Copie todas do .env.example)
```

---

## Funcionalidades implementadas

### Frontend (Site público)
- [x] Home page completa com todas as seções
- [x] Navbar responsiva com busca e ribbons de categorias
- [x] Hero com busca inteligente
- [x] Barra de estatísticas (social proof)
- [x] Ofertas Relâmpago com countdown timer em tempo real
- [x] Achados da Semana (seleção manual com selos)
- [x] Grid de categorias navegáveis
- [x] Seção "Vale a Pena?" com scores e análise
- [x] Produtos Virais com plataforma + views
- [x] Mais Vendidos com ranking
- [x] Newsletter com captura de e-mail
- [x] Footer com aviso de afiliados e LGPD
- [x] Página de produto completa (fotos, preços, comparação de lojas, related)
- [x] SEO automático (meta tags, Open Graph, JSON-LD)
- [x] sitemap.xml automático
- [x] robots.txt automático
- [x] URLs amigáveis

### Painel Administrativo
- [x] Dashboard com métricas
- [x] Listagem de produtos com busca
- [x] Modal de edição de produto (nome, preço, link, badges)
- [x] Ações rápidas
- [ ] CRUD completo (requer Supabase conectado)
- [ ] Upload de imagens (Supabase Storage)
- [ ] Editor de blog (MDX ou Tiptap)
- [ ] Autenticação admin (Supabase Auth)

### Backend / Banco
- [x] Schema SQL completo (PostgreSQL)
- [x] Row Level Security configurado
- [x] Views otimizadas
- [x] Índices de performance
- [x] Click tracking
- [x] Helpers de query (Supabase client)

---

## SEO

Cada produto gera automaticamente:
- `<title>` otimizado com preço e desconto
- `<meta description>` com avaliações e nota UNIKA
- Open Graph para compartilhamento em redes sociais
- Schema.org `Product` com preço e avaliações
- Schema.org `BreadcrumbList`
- URL amigável: `/produto/fone-bluetooth-pro-max`

---

## Próximos módulos

- [ ] IA de recomendação (OpenAI embeddings + busca vetorial no Supabase)
- [ ] Comparação automática entre produtos
- [ ] Histórico de preços (job diário de scraping)
- [ ] App mobile (React Native / Expo)
- [ ] Sistema de alertas de preço por e-mail
- [ ] Painel de analytics avançado
- [ ] API pública para parceiros

---

## Licença

Propriedade de UNIKA STORE. Todos os direitos reservados.
