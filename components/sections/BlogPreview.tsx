import Link from 'next/link'
import type { BlogPost } from '@/types'
import { Section } from './Section'

interface Props {
  posts: BlogPost[]
}

export function BlogPreview({ posts }: Props) {
  return (
    <Section title="📝 Blog" subtitle="Guias, comparativos e dicas de compra" seeAllHref="/blog" bg="white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all"
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
    </Section>
  )
}
