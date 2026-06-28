import Link from 'next/link'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export function ValePenaPreview({ product }: Props) {
  const vp = product.valePena
  if (!vp) return null

  return (
    <section className="bg-gray-50 py-10">
      <div className="container-site">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="section-heading">🤔 Vale a Pena?</h2>
            <p className="text-sm text-gray-500 mt-0.5">Nossa análise honesta do produto em destaque</p>
          </div>
          <Link href="/vale-a-pena" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
            Ver todas →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Header strip */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-black text-lg">{product.name}</h3>
              <p className="text-indigo-200 text-sm">Análise completa da equipe UNIKA STORE</p>
            </div>
            <div className="text-center bg-white/10 border border-white/20 rounded-xl px-4 py-2">
              <div className="text-white font-black text-3xl leading-none">{vp.nota.toFixed(1)}</div>
              <div className="text-indigo-200 text-xs mt-0.5">Nota UNIKA</div>
            </div>
          </div>

          <div className="p-6">
            {/* Scores */}
            <div className="grid grid-cols-3 gap-4 mb-5 p-4 bg-gray-50 rounded-xl">
              {[
                { val: vp.custoBeneficio, lbl: 'Custo-benefício' },
                { val: vp.qualidade, lbl: 'Qualidade' },
                { val: vp.praticidade, lbl: 'Praticidade' },
              ].map(s => (
                <div key={s.lbl} className="text-center">
                  <div className={`text-2xl font-black ${s.val >= 9 ? 'text-green-600' : s.val >= 7 ? 'text-indigo-600' : 'text-orange-500'}`}>
                    {s.val.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Opinion */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-5">
              <p className="text-xs font-bold text-indigo-500 mb-1">💬 Nossa opinião</p>
              <p className="text-gray-800 text-sm leading-relaxed">{vp.opiniao}</p>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">✅ Pontos positivos</p>
                <ul className="space-y-1.5">
                  {vp.pros.slice(0, 3).map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">△ Pontos de atenção</p>
                <ul className="space-y-1.5">
                  {vp.atencao.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-orange-400 flex-shrink-0 mt-0.5">△</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/produto/${product.slug}`}
              className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              🛒 Comprar Agora — {product.mainLink.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
