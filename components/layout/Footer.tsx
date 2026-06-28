import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#0A0A0F] border-t border-white/5 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-white font-black text-lg tracking-tight">UNIKA STORE</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              A maior plataforma brasileira de recomendações inteligentes de produtos.
            </p>
            <div className="flex gap-3 mt-4">
              {['instagram', 'tiktok', 'youtube'].map(s => (
                <a key={s} href={`https://${s}.com/unikastore`} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <span className="text-white/50 text-xs font-bold capitalize">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/80 text-xs font-bold uppercase tracking-wider mb-3">Plataforma</h4>
            <ul className="space-y-2">
              {[
                ['Achados da Semana', '/achados'],
                ['Produtos Virais', '/virais'],
                ['Mais Vendidos', '/mais-vendidos'],
                ['Ofertas Relâmpago', '/ofertas'],
                ['Vale a Pena?', '/vale-a-pena'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-white/40 hover:text-white/80 text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 text-xs font-bold uppercase tracking-wider mb-3">Empresa</h4>
            <ul className="space-y-2">
              {[
                ['Sobre nós', '/sobre'],
                ['Blog', '/blog'],
                ['Newsletter', '/newsletter'],
                ['Anuncie conosco', '/anuncie'],
                ['Contato', '/contato'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-white/40 hover:text-white/80 text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 text-xs font-bold uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2">
              {[
                ['Política de Privacidade', '/privacidade'],
                ['Termos de Uso', '/termos'],
                ['Aviso de Afiliados', '/afiliados'],
                ['LGPD', '/lgpd'],
                ['Cookies', '/cookies'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-white/40 hover:text-white/80 text-sm transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-white/25 text-xs">© 2026 UNIKA STORE. Todos os direitos reservados.</p>
          <p className="text-white/20 text-xs max-w-sm text-right leading-relaxed">
            Este site contém links de afiliados. Ao comprar através deles, recebemos uma comissão sem custo adicional para você. Consulte nossa{' '}
            <Link href="/afiliados" className="underline hover:text-white/40">política de afiliados</Link>.
          </p>
        </div>
      </div>
    </footer>
  )
}
