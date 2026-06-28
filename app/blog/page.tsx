import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guias de compra, comparativos e dicas para você comprar melhor. Conteúdo honesto da equipe UNIKA STORE.',
}

export default function BlogPage() {
  const posts = BLOG_POSTS.filter(p => p.active)
  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => !p.featured)

  return (
    <div className="container-site py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">📝 Blog UNIKA STORE</h1>
        <p className="text-gray-500">Guias, comparativos e dicas para você comprar melhor.</p>
      </div>

      {/* Featured post */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 sm:p-8 mb-8 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">{featured.category}</span>
            <span className="text-xs text-white/60">
              {featured.publishedAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mb-2 group-hover:underline leading-tight">
            {featured.title}
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">{featured.excerpt}</p>
          <span className="text-white/90 text-sm font-semibold mt-4 block">Ler artigo →</span>
        </Link>
      )}

      {/* Post grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rest.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group p-5 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-gray-400">
                {post.publishedAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <h3 className="font-black text-sm text-gray-900 group-hover:text-indigo-700 leading-snug mb-2 transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
            <span className="text-xs font-semibold text-indigo-600 mt-3 block group-hover:underline">
              Ler artigo →
            </span>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">✍️</div>
          <p>Nenhum post publicado ainda.</p>
        </div>
      )}
    </div>
  )
}
