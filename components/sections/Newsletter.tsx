'use client'
import { useState } from 'react'
import { subscribeNewsletter } from '@/lib/supabase'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    const { success } = await subscribeNewsletter(email.trim())
    setStatus(success ? 'success' : 'error')
    if (success) setEmail('')
  }

  return (
    <section className="py-10 bg-gray-50">
      <div className="container-site">
        <div className="bg-ink rounded-2xl px-6 sm:px-10 py-10 sm:py-12 text-center relative overflow-hidden">
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(108,99,255,0.15) 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-indigo-400 text-xs font-semibold">📧 Newsletter gratuita</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
              Receba os melhores achados toda semana
            </h2>
            <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">
              Mais de 80.000 compradores inteligentes já recebem nossas recomendações. Sem spam.
            </p>

            {status === 'success' ? (
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-5 py-3">
                <span className="text-green-400 font-semibold text-sm">✅ Inscrição confirmada! Obrigado.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="flex-1 bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-indigo-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors flex-shrink-0"
                >
                  {status === 'loading' ? 'Aguarde...' : 'Quero receber!'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="text-red-400 text-xs mt-2">Algo deu errado. Tente novamente.</p>
            )}

            <p className="text-white/25 text-xs mt-4">
              Sem spam. Cancele quando quiser. Seus dados são protegidos pela LGPD.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
