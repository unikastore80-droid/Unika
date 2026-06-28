'use client'
import { useState, useEffect } from 'react'

interface Props {
  endsAt: Date
  compact?: boolean
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function Countdown({ endsAt, compact = false }: Props) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 })
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    function calc() {
      const diff = Math.max(0, endsAt.getTime() - Date.now())
      if (diff === 0) { setExpired(true); return }
      setTimeLeft({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [endsAt])

  if (expired) return <span className="text-sm text-red-500 font-bold">Encerrada</span>

  if (compact) {
    return (
      <span className="font-mono font-black text-orange-500">
        {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
      </span>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      {[{ val: timeLeft.h, lbl: 'hrs' }, { val: timeLeft.m, lbl: 'min' }, { val: timeLeft.s, lbl: 'seg' }].map(
        ({ val, lbl }, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="bg-black/25 rounded-lg px-2.5 py-1 text-center">
              <div className="text-white font-black text-lg leading-none font-mono">{pad(val)}</div>
              <div className="text-white/60 text-[10px] uppercase">{lbl}</div>
            </div>
            {i < 2 && <span className="text-white font-black text-lg leading-none">:</span>}
          </div>
        )
      )}
    </div>
  )
}

// Full flash sale banner
export function FlashSaleBanner({ products = [], endsAt }: { products?: any[]; endsAt: Date }) {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-rose-600 rounded-2xl p-5 flex items-center gap-4">
      <div className="text-4xl">⚡</div>
      <div>
        <h2 className="text-white font-black text-lg">Ofertas Relâmpago</h2>
        <p className="text-orange-100 text-sm">Promoções por tempo limitado</p>
      </div>
      <div className="ml-auto">
        <Countdown endsAt={endsAt} />
      </div>
    </div>
  )
}
