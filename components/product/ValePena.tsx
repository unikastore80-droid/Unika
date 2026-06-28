import type { ValePena } from '@/types'

interface Props {
  productName: string
  valePena: ValePena
}

function ScoreRing({ value, label }: { value: number; label: string }) {
  const color = value >= 9 ? 'text-green-600' : value >= 7 ? 'text-indigo-600' : 'text-orange-500'
  return (
    <div className="text-center">
      <div className={`text-2xl font-black ${color}`}>{value.toFixed(1)}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  )
}

export function ValePenaSection({ productName, valePena }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-black text-xl">🤔 Vale a Pena?</h2>
            <p className="text-indigo-200 text-sm mt-0.5">Análise honesta da equipe UNIKA STORE</p>
          </div>
          <div className="text-center bg-white/10 border border-white/20 rounded-xl px-4 py-2">
            <div className="text-white font-black text-3xl leading-none">{valePena.nota.toFixed(1)}</div>
            <div className="text-indigo-200 text-xs mt-0.5">Nota UNIKA</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Scores */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <ScoreRing value={valePena.custoBeneficio} label="Custo-benefício" />
          <ScoreRing value={valePena.qualidade} label="Qualidade" />
          <ScoreRing value={valePena.praticidade} label="Praticidade" />
        </div>

        {/* Opinion */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-5">
          <p className="text-sm font-semibold text-indigo-500 mb-1">💬 Nossa opinião</p>
          <p className="text-gray-800 text-sm leading-relaxed">{valePena.opiniao}</p>
        </div>

        {/* Para quem */}
        <div className="mb-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Para quem recomendamos</p>
          <p className="text-sm text-gray-700 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2">
            👤 {valePena.paraQuem}
          </p>
        </div>

        {/* Pros & Atenção */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">✅ Pontos positivos</p>
            <ul className="space-y-1.5">
              {valePena.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">△ Pontos de atenção</p>
            <ul className="space-y-1.5">
              {valePena.atencao.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-orange-400 mt-0.5 flex-shrink-0">△</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
