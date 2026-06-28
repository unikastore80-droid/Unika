import Link from 'next/link'

interface Props {
  title: string
  subtitle?: string
  seeAllHref?: string
  seeAllLabel?: string
  children: React.ReactNode
  bg?: 'white' | 'gray'
  noPadBottom?: boolean
}

export function Section({
  title,
  subtitle,
  seeAllHref,
  seeAllLabel = 'Ver todos',
  children,
  bg = 'gray',
  noPadBottom,
}: Props) {
  return (
    <section className={`${bg === 'white' ? 'bg-white' : 'bg-gray-50'} ${noPadBottom ? 'pt-10' : 'py-10'}`}>
      <div className="container-site">
        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="section-heading">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {seeAllHref && (
            <Link
              href={seeAllHref}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex-shrink-0 ml-4"
            >
              {seeAllLabel} →
            </Link>
          )}
        </div>

        {children}
      </div>
    </section>
  )
}
