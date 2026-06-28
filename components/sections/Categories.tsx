import Link from 'next/link'
import type { Category } from '@/types'
import { Section } from './Section'

interface Props {
  categories: Category[]
}

export function CategoriesSection({ categories }: Props) {
  return (
    <Section title="Explorar Categorias" bg="white">
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-3">
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all text-center"
          >
            <span className="text-2xl sm:text-3xl">{cat.icon}</span>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-indigo-700 leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
